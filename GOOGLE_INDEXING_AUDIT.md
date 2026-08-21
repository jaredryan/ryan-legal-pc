# URL / Indexing Consistency Audit — ryan-legal-pc

Date: 2026-08-21
Scope: URL normalization and indexing signals only (no content/design/copy changes).

Production host confirmed from repo config (`astro.config.mjs` `site`, matches request): `https://ryanlegalpc.com`

## Summary

Same root cause as `personal-portfolio`, and slightly worse here: the site's canonical
tags used the **no-slash** form while the sitemap and Netlify's actual served URLs used
the **trailing-slash** form — so canonical didn't even match the sitemap, on top of every
internal `<a href>` triggering an unnecessary 301 redirect. Fixed by standardizing the
whole site (config, canonical/JSON-LD, sitemap, and every internal link) on the
trailing-slash form, which is what Netlify was already serving as the 200 OK target.

## Findings (before fix)

| Check                                                                              | Result                                                                                                                                                               |
| ---------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `astro.config.mjs` `trailingSlash`                                                 | Not set (Astro default `'ignore'`)                                                                                                                                   |
| Sitemap (`/sitemap-0.xml`)                                                         | Trailing-slash: `https://ryanlegalpc.com/about/`, `/contact/`, `/expertise/`, `/payment/`, `/privacy/`                                                               |
| `<link rel="canonical">`                                                           | **No-slash**: `https://ryanlegalpc.com/about` — mismatched the sitemap                                                                                               |
| `og:url`                                                                           | Same no-slash value as canonical                                                                                                                                     |
| JSON-LD `WebPage.url` / breadcrumb `item`                                          | No-slash (built from the same `path` prop)                                                                                                                           |
| JSON-LD Person `url` / `@id` (Russ, Crystal)                                       | `${siteUrl}/about` (no slash)                                                                                                                                        |
| Internal `<a href>` (nav, footer, CTAs, in-page links, practice-area anchor links) | All no-slash: `/about`, `/contact`, `/expertise`, `/payment`, `/privacy`, `/about#training`, etc.                                                                    |
| Live behavior: `GET /about`                                                        | `301 → /about/`                                                                                                                                                      |
| Live behavior: `GET /about/`                                                       | `200 OK`                                                                                                                                                             |
| (same pattern confirmed for `/contact`, `/expertise`, `/payment`, `/privacy`)      |                                                                                                                                                                      |
| `netlify.toml` `/contact-us` redirect                                              | `301 → /contact` (no slash) — chained into the site's own 301 to `/contact/`                                                                                         |
| `robots.txt`                                                                       | `Allow: /about` etc. — redundant given the blanket `Allow: /` (no `Disallow` exists), but harmless; not a correctness issue                                          |
| `X-Robots-Tag` header                                                              | Not set anywhere (no header rule in `netlify.toml`); page-level `<meta name="robots">` used instead (`noindex, nofollow` on 404 only) — consistent, no change needed |
| 404 handling                                                                       | Real HTTP 404 + `noindex, nofollow` meta on `/404.astro`; correct, left untouched                                                                                    |

**Net effect:** every internal navigation and every crawled internal link took one
unnecessary 301 hop, and the canonical tag actively disagreed with the sitemap — the
opposite of an indexing signal you want to be consistent.

## Fix applied

1. **`astro.config.mjs`** — added `trailingSlash: 'always'`, matching the site's actual
   served/canonical form and Astro's directory-format build output.
2. **`src/data/site.ts`** — `navLinks` hrefs now trailing-slash (`/about/`, `/expertise/`,
   `/contact/`, `/payment/`; `/` unchanged).
3. **Page `path` props** (`about.astro`, `contact.astro`, `expertise.astro`,
   `payment.astro`, `privacy.astro`) — now trailing-slash, so
   `BaseLayout`'s `canonicalUrl`/`og:url` match the sitemap. (`index.astro`'s `path: '/'`
   was already correct.)
4. **JSON-LD** (`src/lib/json-ld.ts`, and the `path`/`breadcrumbs` passed from each page)
   — `webPageJsonLd` URLs, breadcrumb `item` URLs, and the About page's `Person.url`
   fields now trailing-slash. `russRyanId`/`crystalBrightwellId` `@id`s changed from
   `${siteUrl}/about#...` to `${siteUrl}/about/#...` for consistency (internal-only
   identifiers, not referenced outside this JSON-LD graph).
5. **`src/data/practice-areas.ts`** — anchor `linkHref` values now `/about/#training`,
   `/about/#litigation-record`, `/about/#positions` (previously `/about#...`).
6. **Internal `<a href>` links** updated to trailing-slash across `Header.astro`,
   `Footer.astro`, `ExpertiseSection.astro`, `ContactForm.astro`, `index.astro`,
   `about.astro`, `expertise.astro`, `privacy.astro` (includes the
   `/expertise#${slug}` practice-grid links, now `/expertise/#${slug}`).
7. **`netlify.toml`** — `/contact-us` redirect target changed from `/contact` to
   `/contact/`, removing the double-redirect (`/contact-us` → `/contact` → `/contact/`).
8. **Playwright specs** (`tests/smoke.spec.ts`, `tests/seo-structured-data.spec.ts`,
   `tests/polish-pass.spec.ts`) — route path constants, `page.goto()` targets, and
   `href`/URL assertions updated to trailing-slash form so the suite matches the new
   link convention. Not run (per instructions).

## Not changed

- `robots.txt` — the per-path `Allow` lines are redundant (nothing is disallowed) but
  not incorrect; left as-is since it's not a canonical/redirect inconsistency.
- No `X-Robots-Tag` header exists or was needed; `netlify.toml`'s existing security
  headers block was left untouched.
- No page content, copy, metadata wording, or unrelated routing (e.g. `/api/contact`,
  rate-limit config) was touched.

## Verification performed

- Live `curl`/`curl -I` checks against `https://ryanlegalpc.com` for sitemap, canonical
  tags, and slash/no-slash redirect behavior on every route (see table above).
- Full repo grep sweep confirming no remaining slashless internal `href`, `path`, or
  JSON-LD URL literals for `/about`, `/contact`, `/expertise`, `/payment`, `/privacy`.

## Owner verification recommended

- Not run per policy: `astro build`, `astro check`, lint, or the Playwright suite. Please
  run these locally to confirm:
  - `npm run build` produces `about/index.html` etc. as before (directory format is
    unaffected by `trailingSlash`) and the sitemap still emits trailing-slash URLs.
  - `astro check` / typecheck passes (no type-level changes were needed, but worth
    confirming).
  - The three edited Playwright spec files pass against a live/preview deploy once
    `trailingSlash: 'always'` is actually built and served (dev server + Netlify).
- After deploying: re-check `curl -I https://ryanlegalpc.com/about` — it should still
  301 to `/about/` (Netlify's own behavior, unrelated to this fix) but every internal
  link now goes straight to `/about/`, so real users/crawlers following on-site links
  no longer take that hop.
