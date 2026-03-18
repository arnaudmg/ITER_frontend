#!/usr/bin/env python3
"""
Fix translation inconsistencies in Strapi CMS for Iter Advisors.
Run this script when Strapi is back online.

Issues to fix:
1. Team members FR locale have EN roles (Benjamin, Deisy, Florent, Guillaume, etc.)
2. Homepage FR locale has EN stat labels ("Companies supported", "Fundraising raised")
3. Homepage EN locale has FR whyChoose description for feature 01
4. Service page "gestion-financiere-externalisee" FR locale has EN SEO metaTitle
5. Service page "controle-de-gestion-externalise" FR locale has ES SEO metaTitle
"""

import os
import sys
import json
import time
import subprocess

STRAPI_URL = os.environ.get("STRAPI_API_URL", "https://iter-strapi.onrender.com")
STRAPI_TOKEN = os.environ.get("STRAPI_API_TOKEN", "8e7577d8418e046ddec12879f2f0d3559642565a1ff50c1d030f7fd7c0b7f1622ad0ce12131a1a029c5d8bfa069340f7c57ff88e59df7e70826a7e36afa0f7a9f339b1c15f7269f312a739014794f237982edd6e9347d7551f1071ee6e9445e112e6e6e44859746fa571442515b06452de5125c0f73bc7f2180bfc96b8a38e7d")

HEADERS = {
    "Authorization": f"Bearer {STRAPI_TOKEN}",
    "Content-Type": "application/json",
}

# ─── Team member role translations ───
TEAM_ROLE_FIXES = {
    "fr-FR": {
        "Co-founder & CFO": "Co-fondateur et CFO",
        "Fractional CFO": "DAF externalisé",
        "Founding Partner & CMO": "Associé fondateur et CMO",
        "Finance Analyst": "Analyste financier(e)",
        "Chief Data Officer": "Chief Data Officer",  # same
    },
    "es": {
        "Co-founder & CFO": "Cofundador y CFO",
        "Fractional CFO": "CFO externalizado",
        "Founding Partner & CMO": "Socio fundador y CMO",
        "Finance Analyst": "Analista financiero/a",
        "Co-fondateur et CFO": "Cofundador y CFO",
        "Analyste financière": "Analista financiera",
        "Analyste financier": "Analista financiero",
    },
}

# ─── Homepage stat label translations ───
HOMEPAGE_STAT_FIXES = {
    "fr-FR": {
        "Companies supported by Iter Advisors": "Entreprises accompagnées par Iter Advisors",
        "Fundraising raised by our clients since 2021": "Levées de fonds par nos clients depuis 2021",
        "Funds raised by our customers since 2021": "Levées de fonds par nos clients depuis 2021",
        "Employees Finance experts at the service of our customers": "Collaborateurs experts de la fonction Finance au service de nos clients",
        "Technology partners for financial performance": "Partenaires technologiques au service de la performance financière",
    },
    "es": {
        "Companies supported by Iter Advisors": "Empresas acompañadas por Iter Advisors",
        "Fundraising raised by our clients since 2021": "Fondos recaudados por nuestros clientes desde 2021",
        "Funds raised by our customers since 2021": "Fondos recaudados por nuestros clientes desde 2021",
        "Employees Finance experts at the service of our customers": "Colaboradores expertos en finanzas al servicio de nuestros clientes",
        "Technology partners for financial performance": "Socios tecnológicos para el rendimiento financiero",
    },
}

# ─── Homepage whyChoose feature 01 fix ───
HOMEPAGE_WHYCHOOSE_FIXES = {
    "en": {
        "Une expertise financière d\u2019exception pour guider votre entreprise au quotidien.":
            "Exceptional financial expertise to guide your company on a daily basis.",
    },
}


def curl_get(endpoint, params=None):
    """GET request to Strapi API."""
    url = f"{STRAPI_URL}/api/{endpoint}"
    if params:
        qs = "&".join(f"{k}={v}" for k, v in params.items())
        url += f"?{qs}"
    result = subprocess.run(
        ["curl", "-s", "--max-time", "30", "-g",
         "-H", f"Authorization: Bearer {STRAPI_TOKEN}",
         url],
        capture_output=True, text=True
    )
    try:
        return json.loads(result.stdout)
    except json.JSONDecodeError:
        print(f"  ERROR: Could not parse response from {url}: {result.stdout[:200]}")
        return None


def curl_put(endpoint, data):
    """PUT request to Strapi API."""
    url = f"{STRAPI_URL}/api/{endpoint}"
    result = subprocess.run(
        ["curl", "-s", "--max-time", "30", "-g",
         "-X", "PUT",
         "-H", f"Authorization: Bearer {STRAPI_TOKEN}",
         "-H", "Content-Type: application/json",
         "-d", json.dumps({"data": data}),
         url],
        capture_output=True, text=True
    )
    try:
        return json.loads(result.stdout)
    except json.JSONDecodeError:
        print(f"  ERROR: Could not parse response from PUT {url}: {result.stdout[:200]}")
        return None


def fix_team_roles():
    """Fix team member roles for FR and ES locales."""
    print("\n=== Fixing team member roles ===")
    for locale, fixes in TEAM_ROLE_FIXES.items():
        print(f"\n[{locale}]")
        resp = curl_get("team-members", {
            "locale": locale,
            "pagination[pageSize]": "50",
        })
        if not resp or "data" not in resp:
            print(f"  Could not fetch team members for locale {locale}")
            continue

        for member in resp["data"]:
            name = f"{member.get('firstName', '')} {member.get('lastName', '')}".strip()
            current_role = member.get("role", "")
            doc_id = member.get("documentId", "")

            if current_role in fixes:
                new_role = fixes[current_role]
                print(f"  {name}: '{current_role}' -> '{new_role}'")
                result = curl_put(f"team-members/{doc_id}?locale={locale}", {"role": new_role})
                if result and "data" in result:
                    print(f"    OK")
                else:
                    print(f"    FAILED: {result}")
                time.sleep(0.5)
            else:
                print(f"  {name}: '{current_role}' (OK)")


def fix_homepage_stats():
    """Fix homepage stat labels for FR and ES locales."""
    print("\n=== Fixing homepage stat labels ===")
    for locale, fixes in HOMEPAGE_STAT_FIXES.items():
        print(f"\n[{locale}]")
        resp = curl_get("homepage", {
            "locale": locale,
            "populate[statistics]": "*",
        })
        if not resp or "data" not in resp:
            print(f"  Could not fetch homepage for locale {locale}")
            continue

        stats = resp["data"].get("statistics", [])
        updated_stats = []
        changed = False
        for stat in stats:
            label = stat.get("label", "")
            if label in fixes:
                print(f"  Stat: '{label}' -> '{fixes[label]}'")
                stat["label"] = fixes[label]
                changed = True
            updated_stats.append(stat)

        if changed:
            doc_id = resp["data"].get("documentId", "")
            result = curl_put(f"homepage/{doc_id}?locale={locale}", {"statistics": updated_stats})
            if result and "data" in result:
                print(f"  Updated homepage stats for {locale}")
            else:
                print(f"  FAILED to update homepage stats: {result}")
        else:
            print(f"  No stat fixes needed for {locale}")


def fix_homepage_whychoose():
    """Fix homepage whyChoose descriptions."""
    print("\n=== Fixing homepage whyChoose descriptions ===")
    for locale, fixes in HOMEPAGE_WHYCHOOSE_FIXES.items():
        print(f"\n[{locale}]")
        resp = curl_get("homepage", {
            "locale": locale,
            "populate[whyChooseItems]": "*",
        })
        if not resp or "data" not in resp:
            print(f"  Could not fetch homepage for locale {locale}")
            continue

        items = resp["data"].get("whyChooseItems", [])
        changed = False
        for item in items:
            desc = item.get("description", "")
            if desc in fixes:
                print(f"  Feature '{item.get('title', '')}': description fixed")
                item["description"] = fixes[desc]
                changed = True

        if changed:
            doc_id = resp["data"].get("documentId", "")
            result = curl_put(f"homepage/{doc_id}?locale={locale}", {"whyChooseItems": items})
            if result and "data" in result:
                print(f"  Updated homepage whyChoose for {locale}")
            else:
                print(f"  FAILED: {result}")
        else:
            print(f"  No whyChoose fixes needed for {locale}")


def fix_service_seo():
    """Fix service page SEO metaTitles."""
    print("\n=== Fixing service page SEO metaTitles ===")
    seo_fixes = [
        {
            "endpoint": "gestion-financiere-externalisee-page",
            "locale": "fr-FR",
            "expected_title": "Gestion financière externalisée | Iter Advisors",
        },
        {
            "endpoint": "controle-de-gestion-externalise-page",
            "locale": "fr-FR",
            "expected_title": "Contrôle de gestion externalisé | Iter Advisors",
        },
    ]
    for fix in seo_fixes:
        print(f"\n  [{fix['locale']}] {fix['endpoint']}")
        resp = curl_get(fix["endpoint"], {
            "locale": fix["locale"],
            "populate[seo]": "*",
        })
        if not resp or "data" not in resp:
            print(f"    Could not fetch {fix['endpoint']}")
            continue

        seo = resp["data"].get("seo", {})
        current_title = seo.get("metaTitle", "")
        if current_title != fix["expected_title"]:
            print(f"    Current: '{current_title}'")
            print(f"    Expected: '{fix['expected_title']}'")
            doc_id = resp["data"].get("documentId", "")
            seo["metaTitle"] = fix["expected_title"]
            result = curl_put(f"{fix['endpoint']}/{doc_id}?locale={fix['locale']}", {"seo": seo})
            if result and "data" in result:
                print(f"    Fixed!")
            else:
                print(f"    FAILED: {result}")
        else:
            print(f"    Title already correct: '{current_title}'")


def main():
    print("=" * 60)
    print("Iter Advisors - Strapi Translation Fix Script")
    print("=" * 60)

    # Test connection
    resp = curl_get("team-members", {"pagination[pageSize]": "1"})
    if not resp or "data" not in resp:
        print("\nERROR: Cannot connect to Strapi. Is it running?")
        print(f"URL: {STRAPI_URL}")
        sys.exit(1)

    print(f"\nConnected to Strapi at {STRAPI_URL}")

    fix_team_roles()
    fix_homepage_stats()
    fix_homepage_whychoose()
    fix_service_seo()

    print("\n" + "=" * 60)
    print("Done! All translation fixes applied.")
    print("=" * 60)


if __name__ == "__main__":
    main()
