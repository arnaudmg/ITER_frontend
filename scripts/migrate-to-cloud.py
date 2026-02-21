#!/usr/bin/env python3
"""
Strapi Local → Cloud Migration Script
Transfers all content from local Strapi to Strapi Cloud via REST API.

Handles: media uploads, components, relations, multi-locale content.
"""

import urllib.request
import urllib.parse
import json
import os
import sys
import time
import tempfile
import mimetypes
import uuid

# ──────────────── Configuration ────────────────
LOCAL_URL = "http://localhost:1337"
CLOUD_URL = "https://majestic-sparkle-f20d290f16.strapiapp.com"

LOCAL_TOKEN = "1b8c1f46ba862cdb1118afb95724722bb8677075bdaf21b76d296957a45fdb14c84447d30f112c5b3e6e9df828f53af88f8ef2d6da9386cc6224a5ae04104353bf08e69a1887b392d28586150a5ce8fa6b2cd04c111178420b2a8126228210f89224ad82584023ea13dc3aa0841965eb666242291314134b438e69b549f85936"
CLOUD_TOKEN = "6fb6e03e03a5154744921f9dcb95385794efc2217aeb554a7e593df9e5f92eb8fda95464751ec9092c3a05f887b3f22a7969f2042aec89f47271e09eb998f57b89915beb065c97d8fc9625a6fe9aa831109872f3c4ecca5e69c4bb17b67e202414fc9763df239e1c9fad1040e7f29c6f7f87559eb75b8cc9c27079afbf8aac09"

DEFAULT_LOCALE = "fr"
LOCALES = ["fr", "en", "es"]

# Map of local media ID → cloud media ID
media_map = {}
# Map of (content_type, local_documentId) → cloud_documentId
doc_map = {}


# ──────────────── HTTP Helpers ────────────────

def api_get(base_url, path, token, params=None):
    """GET request to Strapi API."""
    url = f"{base_url}/api/{path}"
    if params:
        url += "?" + urllib.parse.urlencode(params, doseq=True)
    req = urllib.request.Request(url, headers={"Authorization": f"Bearer {token}"})
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        print(f"  ⚠ GET {path} → {e.code}: {body[:200]}")
        return None


def api_post(base_url, path, token, payload):
    """POST JSON to Strapi API."""
    url = f"{base_url}/api/{path}"
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=data,
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        print(f"  ⚠ POST {path} → {e.code}: {body[:300]}")
        return None


def api_put(base_url, path, token, payload):
    """PUT JSON to Strapi API."""
    url = f"{base_url}/api/{path}"
    data = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(
        url,
        data=data,
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": "application/json",
        },
        method="PUT",
    )
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        body = e.read().decode()
        print(f"  ⚠ PUT {path} → {e.code}: {body[:300]}")
        return None


def multipart_upload(base_url, token, file_path, file_name, mime_type, ref_data=None):
    """Upload a file to Strapi using multipart form data."""
    boundary = uuid.uuid4().hex

    body = b""

    # Add ref data fields if provided
    if ref_data:
        for key, val in ref_data.items():
            body += f"--{boundary}\r\n".encode()
            body += f'Content-Disposition: form-data; name="{key}"\r\n\r\n'.encode()
            body += f"{val}\r\n".encode()

    # Add file
    body += f"--{boundary}\r\n".encode()
    body += f'Content-Disposition: form-data; name="files"; filename="{file_name}"\r\n'.encode()
    body += f"Content-Type: {mime_type}\r\n\r\n".encode()

    with open(file_path, "rb") as f:
        body += f.read()

    body += f"\r\n--{boundary}--\r\n".encode()

    url = f"{base_url}/api/upload"
    req = urllib.request.Request(
        url,
        data=body,
        headers={
            "Authorization": f"Bearer {token}",
            "Content-Type": f"multipart/form-data; boundary={boundary}",
        },
        method="POST",
    )
    try:
        with urllib.request.urlopen(req) as resp:
            return json.loads(resp.read())
    except urllib.error.HTTPError as e:
        err_body = e.read().decode()
        print(f"  ⚠ UPLOAD {file_name} → {e.code}: {err_body[:200]}")
        return None


# ──────────────── Media Migration ────────────────

def download_file(url):
    """Download a file from URL to a temp file."""
    try:
        req = urllib.request.Request(url)
        with urllib.request.urlopen(req) as resp:
            suffix = os.path.splitext(urllib.parse.urlparse(url).path)[1] or ".bin"
            tmp = tempfile.NamedTemporaryFile(delete=False, suffix=suffix)
            tmp.write(resp.read())
            tmp.close()
            return tmp.name
    except Exception as e:
        print(f"  ⚠ Download failed for {url}: {e}")
        return None


def migrate_media(media_obj):
    """Migrate a single media file. Returns the cloud media ID."""
    if media_obj is None:
        return None

    local_id = media_obj.get("id")
    if local_id in media_map:
        return media_map[local_id]

    # Get the file URL
    file_url = media_obj.get("url", "")
    if not file_url:
        return None

    # Make absolute URL
    if file_url.startswith("/"):
        file_url = f"{LOCAL_URL}{file_url}"

    file_name = media_obj.get("name", "file")
    mime_type = media_obj.get("mime", "application/octet-stream")

    print(f"    📁 Uploading media: {file_name}")

    # Download the file
    tmp_path = download_file(file_url)
    if not tmp_path:
        return None

    try:
        # Upload to cloud
        result = multipart_upload(CLOUD_URL, CLOUD_TOKEN, tmp_path, file_name, mime_type)
        if result and isinstance(result, list) and len(result) > 0:
            cloud_id = result[0].get("id")
            media_map[local_id] = cloud_id
            print(f"    ✅ Media uploaded: {file_name} (local:{local_id} → cloud:{cloud_id})")
            return cloud_id
        else:
            print(f"    ⚠ Media upload returned unexpected result for {file_name}")
            return None
    finally:
        os.unlink(tmp_path)


def process_blocks_media(blocks):
    """Process blocks content to migrate embedded images."""
    if not blocks or not isinstance(blocks, list):
        return blocks

    processed = []
    for block in blocks:
        if block.get("type") == "image":
            img = block.get("image", {})
            if img:
                cloud_id = migrate_media(img)
                if cloud_id:
                    block = dict(block)
                    block["image"] = {"id": cloud_id}
            processed.append(block)
        else:
            # Recurse into children if they exist
            processed.append(block)
    return processed


# ──────────────── Data Cleaning ────────────────

def clean_component(comp):
    """Remove Strapi metadata from a component before sending."""
    if comp is None:
        return None
    if isinstance(comp, list):
        return [clean_component(c) for c in comp]
    if isinstance(comp, dict):
        cleaned = {}
        skip_keys = {"id", "documentId", "createdAt", "updatedAt", "publishedAt"}
        for k, v in comp.items():
            if k in skip_keys:
                continue
            if isinstance(v, dict) and "url" in v and "mime" in v:
                # This is a media field
                cloud_id = migrate_media(v)
                cleaned[k] = cloud_id
            elif isinstance(v, list) and len(v) > 0 and isinstance(v[0], dict):
                if v[0].get("type") in ("paragraph", "heading", "list", "quote", "image", "code"):
                    # This is blocks content
                    cleaned[k] = process_blocks_media(v)
                else:
                    cleaned[k] = clean_component(v)
            elif isinstance(v, dict):
                cleaned[k] = clean_component(v)
            else:
                cleaned[k] = v
        return cleaned
    return comp


def prepare_entry_data(entry, fields_config):
    """Prepare entry data for creation, handling fields by type."""
    data = {}
    skip_keys = {"id", "documentId", "createdAt", "updatedAt", "publishedAt", "locale", "localizations"}

    for k, v in entry.items():
        if k in skip_keys:
            continue

        field_type = fields_config.get(k, "unknown")

        if field_type == "media":
            if v is not None:
                cloud_id = migrate_media(v)
                data[k] = cloud_id
        elif field_type == "relation":
            # Skip relations for now - will reconnect later
            continue
        elif field_type == "component" or field_type == "component_repeatable":
            data[k] = clean_component(v)
        elif field_type == "blocks":
            data[k] = process_blocks_media(v)
        else:
            data[k] = v

    return data


# ──────────────── Content Type Schemas ────────────────

# Map field names → type for each content type
SCHEMAS = {
    "homepage": {
        "heroTitle": "string", "heroSubtitle": "text",
        "heroCta": "component", "valuePropositions": "component_repeatable",
        "statistics": "component_repeatable", "whyChooseItems": "component_repeatable",
        "featuredArticles": "relation", "seo": "component",
    },
    "about-page": {
        "heroTitle": "string", "whoWeAre": "blocks", "vision": "blocks",
        "whenToCallUs": "blocks", "faq": "component_repeatable", "seo": "component",
    },
    "contact-page": {
        "heroTitle": "string", "introduction": "text",
        "offices": "component_repeatable", "seo": "component",
    },
    "daf-externalise-page": {
        "heroTitle": "string", "heroSubtitle": "text", "content": "blocks",
        "subPages": "component_repeatable", "faq": "component_repeatable", "seo": "component",
    },
    "daf-metier-page": {
        "heroTitle": "string", "content": "blocks",
        "faq": "component_repeatable", "seo": "component",
    },
    "daf-temps-partage-page": {
        "heroTitle": "string", "content": "blocks",
        "faq": "component_repeatable", "seo": "component",
    },
    "daf-transition-page": {
        "heroTitle": "string", "content": "blocks",
        "faq": "component_repeatable", "seo": "component",
    },
    "services-page": {
        "heroTitle": "string", "introduction": "text",
        "serviceCards": "relation", "seo": "component",
    },
    "legal-page": {
        "title": "string", "content": "blocks", "seo": "component",
    },
    "privacy-page": {
        "title": "string", "content": "blocks", "seo": "component",
    },
    "global": {
        "siteName": "string", "logo": "media", "defaultSeo": "component",
        "navigation": "component_repeatable", "footer": "component",
        "socialLinks": "component_repeatable", "aggregateRating": "component",
    },
    "blog-article": {
        "title": "string", "slug": "uid", "content": "blocks", "excerpt": "text",
        "featuredImage": "media", "publishedDate": "date", "tableOfContents": "boolean",
        "relatedArticles": "relation", "seo": "component", "category": "enumeration",
    },
    "client-logo": {
        "name": "string", "slug": "uid", "logo": "media", "url": "string", "order": "integer",
    },
    "glossary-term": {
        "title": "string", "slug": "uid", "definition": "text", "content": "blocks",
        "relatedTerms": "relation", "seo": "component",
    },
    "job-metier": {
        "title": "string", "slug": "uid", "featuredImage": "media", "content": "blocks",
        "faq": "component_repeatable", "seo": "component",
    },
    "job-offer": {
        "title": "string", "slug": "uid", "location": "string",
        "contractType": "enumeration", "department": "string",
        "description": "blocks", "requirements": "blocks",
        "isActive": "boolean", "seo": "component",
    },
    "service-detail": {
        "title": "string", "slug": "uid", "content": "blocks", "icon": "media",
        "faq": "component_repeatable", "seo": "component",
    },
    "team-member": {
        "slug": "uid", "firstName": "string", "lastName": "string",
        "role": "string", "photo": "media", "linkedIn": "string", "order": "integer",
    },
    "testimonial": {
        "title": "string", "slug": "uid", "clientLogo": "media",
        "industry": "string", "initialRevenue": "string", "teamSize": "string",
        "missionStart": "string", "engagementType": "string",
        "challenge": "blocks", "solution": "blocks",
        "results": "component_repeatable",
        "relatedTestimonials": "relation", "seo": "component",
    },
}


# ──────────────── Collection Migration ────────────────

def fetch_all_collection(endpoint, locale="fr"):
    """Fetch all items from a collection type, handling pagination."""
    items = []
    page = 1
    page_size = 25

    while True:
        params = {
            "locale": locale,
            "populate": "*",
            "pagination[page]": str(page),
            "pagination[pageSize]": str(page_size),
        }
        result = api_get(LOCAL_URL, endpoint, LOCAL_TOKEN, params)
        if not result or not result.get("data"):
            break

        data = result["data"]
        if isinstance(data, list):
            items.extend(data)
        else:
            items.append(data)

        pagination = result.get("meta", {}).get("pagination", {})
        total_pages = pagination.get("pageCount", 1)
        if page >= total_pages:
            break
        page += 1

    return items


def migrate_collection(content_type, endpoint, locales=None):
    """Migrate a collection type with all locales."""
    if locales is None:
        locales = [DEFAULT_LOCALE]

    schema = SCHEMAS.get(content_type, {})
    print(f"\n{'='*60}")
    print(f"📦 Migrating collection: {content_type}")
    print(f"{'='*60}")

    # First, migrate the default locale
    items = fetch_all_collection(endpoint, DEFAULT_LOCALE)
    print(f"  Found {len(items)} items in {DEFAULT_LOCALE}")

    for item in items:
        local_doc_id = item.get("documentId")
        entry_label = item.get("title") or item.get("name") or item.get("firstName", "") + " " + item.get("lastName", "") or item.get("slug", local_doc_id)
        print(f"\n  → {entry_label}")

        # Prepare data
        data = prepare_entry_data(item, schema)

        # Create on cloud
        result = api_post(CLOUD_URL, endpoint, CLOUD_TOKEN, {"data": data, "locale": DEFAULT_LOCALE})
        if result and result.get("data"):
            cloud_doc_id = result["data"].get("documentId")
            doc_map[(content_type, local_doc_id)] = cloud_doc_id
            print(f"    ✅ Created: {cloud_doc_id}")

            # Now create other locale versions
            for locale in locales:
                if locale == DEFAULT_LOCALE:
                    continue

                locale_items = fetch_all_collection(endpoint, locale)
                # Find matching item by documentId
                locale_item = None
                for li in locale_items:
                    if li.get("documentId") == local_doc_id:
                        locale_item = li
                        break

                if locale_item:
                    locale_data = prepare_entry_data(locale_item, schema)
                    locale_result = api_put(
                        CLOUD_URL,
                        f"{endpoint}/{cloud_doc_id}",
                        CLOUD_TOKEN,
                        {"data": locale_data, "locale": locale}
                    )
                    if locale_result:
                        print(f"    ✅ Locale {locale} added")
                    else:
                        print(f"    ⚠ Failed to add locale {locale}")
        else:
            print(f"    ❌ Failed to create")

        time.sleep(0.2)  # Rate limiting


def migrate_single_type(content_type, endpoint, locales=None):
    """Migrate a single type with all locales."""
    if locales is None:
        locales = LOCALES

    schema = SCHEMAS.get(content_type, {})
    print(f"\n{'='*60}")
    print(f"📄 Migrating single type: {content_type}")
    print(f"{'='*60}")

    for locale in locales:
        print(f"\n  Locale: {locale}")
        result = api_get(LOCAL_URL, endpoint, LOCAL_TOKEN, {"locale": locale, "populate": "*"})
        if not result or not result.get("data"):
            print(f"    ⚠ No data for locale {locale}")
            continue

        entry = result["data"]
        data = prepare_entry_data(entry, schema)

        # For single types, use PUT
        cloud_result = api_put(
            CLOUD_URL,
            endpoint,
            CLOUD_TOKEN,
            {"data": data, "locale": locale}
        )

        if cloud_result and cloud_result.get("data"):
            cloud_doc_id = cloud_result["data"].get("documentId")
            local_doc_id = entry.get("documentId")
            doc_map[(content_type, local_doc_id)] = cloud_doc_id
            print(f"    ✅ Saved: {cloud_doc_id}")
        else:
            print(f"    ❌ Failed")

        time.sleep(0.2)


# ──────────────── Relations Reconnection ────────────────

def reconnect_relations():
    """Reconnect relations after all content has been migrated."""
    print(f"\n{'='*60}")
    print("🔗 Reconnecting relations...")
    print(f"{'='*60}")

    relation_map = {
        # (content_type, endpoint, relation_field, target_content_type)
        ("blog-article", "blog-articles", "relatedArticles", "blog-article"),
        ("glossary-term", "glossary-terms", "relatedTerms", "glossary-term"),
        ("testimonial", "testimonials", "relatedTestimonials", "testimonial"),
    }

    for ct, ep, field, target_ct in relation_map:
        print(f"\n  Reconnecting {ct}.{field}")
        # Get local items with relations
        items = fetch_all_collection(ep, DEFAULT_LOCALE)
        for item in items:
            local_doc_id = item.get("documentId")
            cloud_doc_id = doc_map.get((ct, local_doc_id))
            if not cloud_doc_id:
                continue

            related_items = item.get(field, [])
            if not related_items:
                continue

            # Map related documentIds to cloud documentIds
            cloud_related = []
            for rel in related_items:
                rel_doc_id = rel.get("documentId")
                cloud_rel_id = doc_map.get((target_ct, rel_doc_id))
                if cloud_rel_id:
                    cloud_related.append({"documentId": cloud_rel_id})

            if cloud_related:
                label = item.get("title") or item.get("slug", local_doc_id)
                result = api_put(
                    CLOUD_URL,
                    f"{ep}/{cloud_doc_id}",
                    CLOUD_TOKEN,
                    {"data": {field: [{"documentId": cr["documentId"]} for cr in cloud_related]}}
                )
                if result:
                    print(f"    ✅ {label}: {len(cloud_related)} relations")
                else:
                    print(f"    ⚠ {label}: failed")

    # Handle single-type relations
    # Homepage → featuredArticles
    print(f"\n  Reconnecting homepage.featuredArticles")
    hp_local = api_get(LOCAL_URL, "homepage", LOCAL_TOKEN, {"locale": DEFAULT_LOCALE, "populate": "featuredArticles"})
    if hp_local and hp_local.get("data"):
        featured = hp_local["data"].get("featuredArticles", [])
        if featured:
            cloud_featured = []
            for art in featured:
                art_doc_id = art.get("documentId")
                cloud_art_id = doc_map.get(("blog-article", art_doc_id))
                if cloud_art_id:
                    cloud_featured.append({"documentId": cloud_art_id})
            if cloud_featured:
                hp_cloud_id = doc_map.get(("homepage", hp_local["data"].get("documentId")))
                if hp_cloud_id:
                    result = api_put(
                        CLOUD_URL,
                        "homepage",
                        CLOUD_TOKEN,
                        {"data": {"featuredArticles": [{"documentId": cf["documentId"]} for cf in cloud_featured]}, "locale": DEFAULT_LOCALE}
                    )
                    if result:
                        print(f"    ✅ homepage: {len(cloud_featured)} featured articles")

    # Services page → serviceCards
    print(f"\n  Reconnecting services-page.serviceCards")
    sp_local = api_get(LOCAL_URL, "services-page", LOCAL_TOKEN, {"locale": DEFAULT_LOCALE, "populate": "serviceCards"})
    if sp_local and sp_local.get("data"):
        cards = sp_local["data"].get("serviceCards", [])
        if cards:
            cloud_cards = []
            for card in cards:
                card_doc_id = card.get("documentId")
                cloud_card_id = doc_map.get(("service-detail", card_doc_id))
                if cloud_card_id:
                    cloud_cards.append({"documentId": cloud_card_id})
            if cloud_cards:
                result = api_put(
                    CLOUD_URL,
                    "services-page",
                    CLOUD_TOKEN,
                    {"data": {"serviceCards": [{"documentId": cc["documentId"]} for cc in cloud_cards]}, "locale": DEFAULT_LOCALE}
                )
                if result:
                    print(f"    ✅ services-page: {len(cloud_cards)} service cards")


# ──────────────── Main Migration ────────────────

def main():
    print("🚀 Starting Strapi Migration: Local → Cloud")
    print(f"   From: {LOCAL_URL}")
    print(f"   To:   {CLOUD_URL}")
    print()

    # Step 1: Migrate collection types (no relations yet)
    # Order matters: independent types first, then those with relations

    # Independent collections first
    migrate_collection("team-member", "team-members", [DEFAULT_LOCALE])  # No localization
    migrate_collection("client-logo", "client-logos", [DEFAULT_LOCALE])  # No localization
    migrate_collection("service-detail", "service-details", LOCALES)
    migrate_collection("job-metier", "job-metiers", LOCALES)
    migrate_collection("job-offer", "job-offers", [DEFAULT_LOCALE])

    # Collections with self-relations
    migrate_collection("blog-article", "blog-articles", LOCALES)
    migrate_collection("glossary-term", "glossary-terms", LOCALES)
    migrate_collection("testimonial", "testimonials", LOCALES)

    # Step 2: Migrate single types
    migrate_single_type("global", "global")
    migrate_single_type("homepage", "homepage")
    migrate_single_type("about-page", "about-page")
    migrate_single_type("contact-page", "contact-page")
    migrate_single_type("daf-externalise-page", "daf-externalise-page")
    migrate_single_type("daf-metier-page", "daf-metier-page")
    migrate_single_type("daf-temps-partage-page", "daf-temps-partage-page")
    migrate_single_type("daf-transition-page", "daf-transition-page")
    migrate_single_type("services-page", "services-page")
    migrate_single_type("legal-page", "legal-page")
    migrate_single_type("privacy-page", "privacy-page")

    # Step 3: Reconnect relations
    reconnect_relations()

    # Summary
    print(f"\n{'='*60}")
    print("📊 Migration Summary")
    print(f"{'='*60}")
    print(f"  Media files migrated: {len(media_map)}")
    print(f"  Documents created:    {len(doc_map)}")
    print(f"\n✅ Migration complete!")


if __name__ == "__main__":
    main()
