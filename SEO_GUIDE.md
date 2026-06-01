# SEO Guide

## Metadata

Every page is generated from `src/content/pages.js`. The build script writes unique:

- `<title>`
- meta description
- canonical URL
- Open Graph title, description, URL, and image
- Twitter Card metadata
- JSON-LD structured data

## Sitemap and Robots

`scripts/build.mjs` generates `sitemap.xml` and `robots.txt` during every build. Sitemap `lastmod` values use the build date.

## Structured Data

Generated schema includes:

- Organization
- WebSite
- WebPage or Article
- BreadcrumbList on inner pages
- FAQPage where real FAQ content exists

## Keyword Recommendations

`src/content/keywords.js` defines keyword sensitivity. During build, Low and Medium sensitivity terms are written to the recommended list. High and Restricted terms are kept in the excluded list and are not used for automatic title, meta description, or heading generation.

## SEO Report

`seo-report.md` summarizes page count, missing metadata, duplicate metadata, image alt coverage, safe keyword count, and compliance notes.

## Content Rules

Do not create duplicate keyword pages, hidden keyword blocks, cloaking, deceptive redirects, or pages that exist only to capture search traffic. Use keywords only where they support useful educational content.
