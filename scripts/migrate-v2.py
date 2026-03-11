#!/usr/bin/env python3
"""
Strapi Local → Cloud Migration Script v2
Handles locale mapping: fr→fr-FR, es→es-ES, en→en
"""

import urllib.request
import urllib.parse
import urllib.error
import json
import os
import sys
import time
import tempfile
import uuid

# ──────────────── Configuration ────────────────
LOCAL_URL = "http://localhost:1337"
CLOUD_URL = "https://majestic-sparkle-f20d290f16.strapiapp.com"

LOCAL_TOKEN = "1b8c1f46ba862cdb1118afb95724722bb8677075bdaf21b76d296957a45fdb14c84447d30f112c5b3e6e9df828f53af88f8ef2d6da9386cc6224a5ae04104353bf08e69a1887b392d28586150a5ce8fa6b2cd04c111178420b2a8126228210f89224ad82584023ea13dc3aa0841965eb666242291314134b438e69b549f85936"
CLOUD_TOKEN = "6fb6e03e03a5154744921f9dcb95385794efc2217aeb554a7e593df9e5f92eb8fda95464751ec9092c3a05f887b3f22a7969f2042aec89f47271e09eb998f57b89915beb065c97d8fc9625a6fe9aa831109872f3c4ecca5e69c4bb17b67e202414fc9763df239e1c9fad1040e7f29c6f7f87559eb75b8cc9c27079afbf8aac09"

# Locale mapping: local → cloud
LOCALE_MAP = {"fr": "fr-FR", "en": "en", "es": "es-ES"}
LOCAL_DEFAULT = "fr"
CLOUD_DEFAULT = "fr-FR"
LOCAL_LOCALES = ["fr", "en", "es"]

media_map = {}      # local_media_id → cloud_media_id
doc_map = {}        # (content_type, local_documentId) → cloud_documentId
stats = {"media": 0, "created": 0, "locales": 0, "relations": 0, "errors": 0}


# ──────────────── HTTP Helpers ────────────────

def api_get(base_url, path, token, params=None):
    url = f"{base_url}/api/{path}"
    if params:
        url += "?" + urllib.parse.urlencode(params, doseq=True)
    req = urllib.request.Request(url, headers={"Authorization": f"Bearer {token}"})
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        print(f"  ⚠ GET {path} → {e.code}: {body[:200]}")
        stats["errors"] += 1
        return None
    except Exception as e:
        print(f"  ⚠ GET {path} → {e}")
        stats["errors"] += 1
        return None


def api_post(base_url, path, token, payload):
    url = f"{base_url}/api/{path}"
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers={
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    }, method="POST")
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        print(f"  ⚠ POST {path} → {e.code}: {body[:300]}")
        stats["errors"] += 1
        return None


def api_put(base_url, path, token, payload, query_params=None):
    url = f"{base_url}/api/{path}"
    if query_params:
        url += "?" + urllib.parse.urlencode(query_params)
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(url, data=data, headers={
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json",
    }, method="PUT")
    try:
        with urllib.request.urlopen(req, timeout=30) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        print(f"  ⚠ PUT {path} → {e.code}: {body[:300]}")
        stats["errors"] += 1
        return None


def upload_file(file_path, file_name, mime_type):
    boundary = uuid.uuid4().hex
    body = b""
    body += f"--{boundary}\r\n".encode()
    body += f'Content-Disposition: form-data; name="files"; filename="{file_name}"\r\n'.encode()
    body += f"Content-Type: {mime_type}\r\n\r\n".encode()
    with open(file_path, "rb") as f:
        body += f.read()
    body += f"\r\n--{boundary}--\r\n".encode()
    req = urllib.request.Request(
        f"{CLOUD_URL}/api/upload", data=body,
        headers={"Authorization": f"Bearer {CLOUD_TOKEN}",
                 "Content-Type": f"multipart/form-data; boundary={boundary}"},
        method="POST")
    try:
        with urllib.request.urlopen(req, timeout=60) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        body_err = e.read().decode()
        print(f"  ⚠ UPLOAD {file_name} → {e.code}: {body_err[:200]}")
        stats["errors"] += 1
        return None


# ──────────────── Media Migration ────────────────

def migrate_media(media_obj):
    if media_obj is None:
        return None
    local_id = media_obj.get("id")
    if local_id in media_map:
        return media_map[local_id]

    file_url = media_obj.get("url", "")
    if not file_url:
        return None
    if file_url.startswith("/"):
        file_url = f"{LOCAL_URL}{file_url}"

    file_name = media_obj.get("name", "file")
    mime_type = media_obj.get("mime", "application/octet-stream")

    print(f"    📁 {file_name}")
    try:
        req = urllib.request.Request(file_url)
        with urllib.request.urlopen(req, timeout=30) as resp:
            suffix = os.path.splitext(urllib.parse.urlparse(file_url).path)[1] or ".bin"
            tmp = tempfile.NamedTemporaryFile(delete=False, suffix=suffix)
            tmp.write(resp.read())
            tmp.close()
    except Exception as e:
        print(f"    ⚠ Download failed: {e}")
        stats["errors"] += 1
        return None

    try:
        result = upload_file(tmp.name, file_name, mime_type)
        if result and isinstance(result, list) and len(result) > 0:
            cloud_id = result[0].get("id")
            media_map[local_id] = cloud_id
            stats["media"] += 1
            return cloud_id
        return None
    finally:
        os.unlink(tmp.name)


# ──────────────── Data Cleaning ────────────────

def clean_value(key, val, max_str_len=255):
    """Clean a value for Strapi Cloud, handling media, components, blocks."""
    if val is None:
        return None

    # Media object detection
    if isinstance(val, dict) and "url" in val and "mime" in val:
        return migrate_media(val)

    # Blocks content
    if isinstance(val, list) and len(val) > 0 and isinstance(val[0], dict):
        first_type = val[0].get("type", "")
        if first_type in ("paragraph", "heading", "list", "quote", "image", "code"):
            # Process blocks - migrate embedded images
            processed = []
            for block in val:
                if block.get("type") == "image" and block.get("image"):
                    cloud_id = migrate_media(block["image"])
                    if cloud_id:
                        block = dict(block)
                        block["image"] = {"id": cloud_id}
                processed.append(block)
            return processed
        else:
            # Component array - clean each
            return [clean_component(item) for item in val]

    # Component object
    if isinstance(val, dict) and "id" in val:
        return clean_component(val)

    # Truncate long strings
    if isinstance(val, str) and len(val) > max_str_len:
        return val[:max_str_len]

    return val


def clean_component(comp):
    if comp is None:
        return None
    if isinstance(comp, list):
        return [clean_component(c) for c in comp]
    if not isinstance(comp, dict):
        return comp

    cleaned = {}
    skip = {"id", "documentId", "createdAt", "updatedAt", "publishedAt"}
    for k, v in comp.items():
        if k in skip:
            continue
        cleaned[k] = clean_value(k, v)
    return cleaned


# ──────────────── Schema Definitions ────────────────
# Fields that are relations (to skip during creation, reconnect later)
RELATION_FIELDS = {
    "homepage": ["featuredArticles"],
    "services-page": ["serviceCards"],
    "blog-article": ["relatedArticles"],
    "glossary-term": ["relatedTerms"],
    "testimonial": ["relatedTestimonials"],
}

# Fields that are media
MEDIA_FIELDS = {
    "blog-article": ["featuredImage"],
    "client-logo": ["logo"],
    "global": ["logo"],
    "job-metier": ["featuredImage"],
    "service-detail": ["icon"],
    "team-member": ["photo"],
    "testimonial": ["clientLogo"],
}

# Content types with i18n
I18N_TYPES = {
    "homepage", "about-page", "contact-page", "daf-externalise-page",
    "daf-metier-page", "daf-temps-partage-page", "daf-transition-page",
    "drh-externalise-page", "drh-temps-partage-page",
    "services-page", "legal-page", "privacy-page", "global",
    "blog-article", "glossary-term", "testimonial", "service-detail",
    "job-metier",
}

# Content types WITHOUT i18n
NO_I18N_TYPES = {"team-member", "client-logo", "job-offer"}


def prepare_entry(entry, content_type):
    """Prepare an entry for POST/PUT to cloud."""
    data = {}
    skip = {"id", "documentId", "createdAt", "updatedAt", "publishedAt", "locale", "localizations"}
    relation_fields = RELATION_FIELDS.get(content_type, [])
    media_fields = MEDIA_FIELDS.get(content_type, [])

    for k, v in entry.items():
        if k in skip:
            continue
        if k in relation_fields:
            continue  # Skip relations
        if k in media_fields:
            data[k] = migrate_media(v) if v else None
        else:
            data[k] = clean_value(k, v)
    return data


# ──────────────── Fetch Helpers ────────────────

def fetch_all(endpoint, locale="fr"):
    items = []
    page = 1
    while True:
        result = api_get(LOCAL_URL, endpoint, LOCAL_TOKEN, {
            "locale": locale, "populate": "*",
            "pagination[page]": str(page), "pagination[pageSize]": "25"
        })
        if not result or not result.get("data"):
            break
        data = result["data"]
        if isinstance(data, list):
            items.extend(data)
        else:
            items.append(data)
        total_pages = result.get("meta", {}).get("pagination", {}).get("pageCount", 1)
        if page >= total_pages:
            break
        page += 1
    return items


# ──────────────── Collection Migration ────────────────

def migrate_collection(content_type, endpoint):
    has_i18n = content_type in I18N_TYPES
    locales = LOCAL_LOCALES if has_i18n else [LOCAL_DEFAULT]

    print(f"\n{'='*60}")
    print(f"📦 {content_type} (locales: {', '.join(locales)})")
    print(f"{'='*60}")

    # Fetch default locale items
    items = fetch_all(endpoint, LOCAL_DEFAULT)
    print(f"  Found {len(items)} items")

    for item in items:
        local_doc_id = item.get("documentId")
        label = item.get("title") or item.get("name") or \
                f"{item.get('firstName', '')} {item.get('lastName', '')}".strip() or \
                item.get("slug", local_doc_id)
        print(f"\n  → {label}")

        data = prepare_entry(item, content_type)
        cloud_locale = LOCALE_MAP.get(LOCAL_DEFAULT, LOCAL_DEFAULT)

        result = api_post(CLOUD_URL, endpoint, CLOUD_TOKEN,
                         {"data": data},)
        if not result or not result.get("data"):
            print(f"    ❌ Failed")
            continue

        cloud_doc_id = result["data"]["documentId"]
        doc_map[(content_type, local_doc_id)] = cloud_doc_id
        stats["created"] += 1
        print(f"    ✅ {cloud_doc_id}")

        # Add other locales
        if has_i18n:
            for local_locale in locales:
                if local_locale == LOCAL_DEFAULT:
                    continue
                cloud_locale = LOCALE_MAP.get(local_locale, local_locale)

                # Find matching locale item by documentId
                locale_items = fetch_all(endpoint, local_locale)
                locale_item = next((li for li in locale_items
                                   if li.get("documentId") == local_doc_id), None)
                if not locale_item:
                    continue

                locale_data = prepare_entry(locale_item, content_type)
                lr = api_put(CLOUD_URL, f"{endpoint}/{cloud_doc_id}", CLOUD_TOKEN,
                            {"data": locale_data},
                            query_params={"locale": cloud_locale})
                if lr:
                    stats["locales"] += 1
                    print(f"    ✅ +{cloud_locale}")
                else:
                    print(f"    ⚠ {cloud_locale} failed")

        time.sleep(0.15)


def migrate_single(content_type, endpoint):
    has_i18n = content_type in I18N_TYPES
    locales = LOCAL_LOCALES if has_i18n else [LOCAL_DEFAULT]

    print(f"\n{'='*60}")
    print(f"📄 {content_type}")
    print(f"{'='*60}")

    for local_locale in locales:
        cloud_locale = LOCALE_MAP.get(local_locale, local_locale)
        result = api_get(LOCAL_URL, endpoint, LOCAL_TOKEN,
                        {"locale": local_locale, "populate": "*"})
        if not result or not result.get("data"):
            print(f"  {cloud_locale}: no data")
            continue

        entry = result["data"]
        data = prepare_entry(entry, content_type)

        cr = api_put(CLOUD_URL, endpoint, CLOUD_TOKEN,
                    {"data": data},
                    query_params={"locale": cloud_locale})
        if cr and cr.get("data"):
            cloud_doc_id = cr["data"]["documentId"]
            local_doc_id = entry.get("documentId")
            doc_map[(content_type, local_doc_id)] = cloud_doc_id
            if local_locale == LOCAL_DEFAULT:
                stats["created"] += 1
            else:
                stats["locales"] += 1
            print(f"  ✅ {cloud_locale}: {cloud_doc_id}")
        else:
            print(f"  ❌ {cloud_locale}")

        time.sleep(0.15)


# ──────────────── Relations ────────────────

def reconnect_relations():
    print(f"\n{'='*60}")
    print("🔗 Reconnecting relations")
    print(f"{'='*60}")

    # Collection relations
    collection_rels = [
        ("blog-article", "blog-articles", "relatedArticles", "blog-article"),
        ("glossary-term", "glossary-terms", "relatedTerms", "glossary-term"),
        ("testimonial", "testimonials", "relatedTestimonials", "testimonial"),
    ]

    for ct, ep, field, target_ct in collection_rels:
        print(f"\n  {ct}.{field}")
        items = fetch_all(ep, LOCAL_DEFAULT)
        for item in items:
            related = item.get(field, [])
            if not related:
                continue
            cloud_doc_id = doc_map.get((ct, item["documentId"]))
            if not cloud_doc_id:
                continue

            connect = []
            for rel in related:
                cloud_rel = doc_map.get((target_ct, rel["documentId"]))
                if cloud_rel:
                    connect.append({"documentId": cloud_rel})

            if connect:
                r = api_put(CLOUD_URL, f"{ep}/{cloud_doc_id}", CLOUD_TOKEN, {
                    "data": {field: {"connect": connect}}
                })
                label = item.get("title") or item.get("slug", "")
                if r:
                    stats["relations"] += len(connect)
                    print(f"    ✅ {label[:40]}: {len(connect)} links")
                else:
                    print(f"    ⚠ {label[:40]}: failed")
                time.sleep(0.1)

    # Single type relations
    single_rels = [
        ("homepage", "homepage", "featuredArticles", "blog-article"),
        ("services-page", "services-page", "serviceCards", "service-detail"),
    ]

    for ct, ep, field, target_ct in single_rels:
        print(f"\n  {ct}.{field}")
        result = api_get(LOCAL_URL, ep, LOCAL_TOKEN,
                        {"locale": LOCAL_DEFAULT, "populate": field})
        if not result or not result.get("data"):
            continue

        related = result["data"].get(field, [])
        if not related:
            print(f"    (no relations)")
            continue

        connect = []
        for rel in related:
            cloud_rel = doc_map.get((target_ct, rel["documentId"]))
            if cloud_rel:
                connect.append({"documentId": cloud_rel})

        if connect:
            r = api_put(CLOUD_URL, ep, CLOUD_TOKEN, {
                "data": {field: {"connect": connect}},
            }, query_params={"locale": CLOUD_DEFAULT})
            if r:
                stats["relations"] += len(connect)
                print(f"    ✅ {len(connect)} links")
            else:
                print(f"    ⚠ failed")


# ──────────────── Main ────────────────

def main():
    print("🚀 Strapi Migration v2: Local → Cloud")
    print(f"   From: {LOCAL_URL}")
    print(f"   To:   {CLOUD_URL}")
    print(f"   Locale mapping: fr→fr-FR, en→en, es→es-ES")
    print()

    # 1. Independent collections (no self-relations)
    migrate_collection("team-member", "team-members")
    migrate_collection("client-logo", "client-logos")
    migrate_collection("service-detail", "service-details")
    migrate_collection("job-metier", "job-metiers")
    migrate_collection("job-offer", "job-offers")

    # 2. Collections with self-relations (create first, relations later)
    migrate_collection("blog-article", "blog-articles")
    migrate_collection("glossary-term", "glossary-terms")
    migrate_collection("testimonial", "testimonials")

    # 3. Single types
    migrate_single("global", "global")
    migrate_single("homepage", "homepage")
    migrate_single("about-page", "about-page")
    migrate_single("contact-page", "contact-page")
    migrate_single("daf-externalise-page", "daf-externalise-page")
    migrate_single("daf-metier-page", "daf-metier-page")
    migrate_single("daf-temps-partage-page", "daf-temps-partage-page")
    migrate_single("daf-transition-page", "daf-transition-page")
    migrate_single("drh-externalise-page", "drh-externalise-page")
    migrate_single("drh-temps-partage-page", "drh-temps-partage-page")
    migrate_single("services-page", "services-page")
    migrate_single("legal-page", "legal-page")
    migrate_single("privacy-page", "privacy-page")

    # 4. Relations
    reconnect_relations()

    # Summary
    print(f"\n{'='*60}")
    print("📊 Migration Summary")
    print(f"{'='*60}")
    print(f"  Media files uploaded: {stats['media']}")
    print(f"  Documents created:    {stats['created']}")
    print(f"  Locale versions:      {stats['locales']}")
    print(f"  Relations connected:  {stats['relations']}")
    print(f"  Errors:               {stats['errors']}")
    print(f"\n{'✅' if stats['errors'] == 0 else '⚠️'} Migration complete!")


if __name__ == "__main__":
    main()
