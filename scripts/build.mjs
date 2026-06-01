import { copyFile, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pages } from "../src/content/pages.js";
import { keywordSeeds, safeSensitivityLevels } from "../src/content/keywords.js";
import { resolveSiteConfig } from "../src/config/site.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");
const publicDir = path.join(root, "public");
const site = resolveSiteConfig();
const buildDate = new Date();
const heroAsset = "assets/images/urban-minimal-hero.png";

await rm(distDir, { recursive: true, force: true });
await mkdir(path.join(distDir, "assets", "images"), { recursive: true });
await mkdir(publicDir, { recursive: true });

await copyFile(path.join(root, "src", "assets", "styles.css"), path.join(distDir, "assets", "styles.css"));
await copyFile(path.join(root, "src", "assets", "app.js"), path.join(distDir, "assets", "app.js"));
await copyFile(
  path.join(root, "src", "static", "images", "urban-minimal-hero.png"),
  path.join(distDir, heroAsset)
);

await writeFile(
  path.join(distDir, "assets", "config.js"),
  `window.SiteConfig = ${JSON.stringify(
    {
      siteName: site.siteName,
      registerRedirectUrl: site.registerRedirectUrl,
      ctaText: site.ctaText,
      responsibleNotice: site.responsibleNotice
    },
    null,
    2
  )};\n`,
  "utf8"
);

for (const page of pages) {
  await writeOutput(page.route, renderPage(page));
}

await writeOutput("404.html", renderPage(createNotFoundPage()));

const sitemap = renderSitemap();
const robots = renderRobots();
const keywordData = buildKeywordRecommendations();

await writeGenerated("sitemap.xml", sitemap);
await writeGenerated("robots.txt", robots);
await writeGenerated("keyword-recommendations.json", `${JSON.stringify(keywordData, null, 2)}\n`);
await writeGenerated("keyword-recommendations.md", renderKeywordMarkdown(keywordData));
await writeGenerated("seo-report.md", renderSeoReport(keywordData));
await writeFile(path.join(distDir, ".nojekyll"), "", "utf8");

console.log(`Built ${pages.length} pages into ${distDir}`);
console.log(`Generated ${keywordData.recommended.length} safe keyword recommendations`);

async function writeOutput(route, content) {
  const outPath = path.join(distDir, route);
  await mkdir(path.dirname(outPath), { recursive: true });
  await writeFile(outPath, content, "utf8");
}

async function writeGenerated(filename, content) {
  await writeFile(path.join(publicDir, filename), content, "utf8");
  await writeFile(path.join(distDir, filename), content, "utf8");
}

function renderPage(page) {
  const prefix = relativePrefix(page.route);
  const cleanRoute = page.route === "index.html" ? "" : page.route.replace(/index\.html$/, "");
  const canonical = absoluteUrl(cleanRoute);
  const pageTitle = page.title || site.seoTitle;
  const description = page.description || site.seoDescription;
  const imagePath = `${prefix}${heroAsset}`;
  const ogImage = absoluteUrl(heroAsset);
  const structuredData = renderStructuredData(page, canonical);

  return `<!doctype html>
<html lang="${escapeAttr(site.language)}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(pageTitle)}</title>
  <meta name="description" content="${escapeAttr(description)}">
  <meta name="theme-color" content="${escapeAttr(site.themeColor)}">
  <link rel="canonical" href="${escapeAttr(canonical)}">
  <meta property="og:type" content="${page.article ? "article" : "website"}">
  <meta property="og:locale" content="${escapeAttr(site.locale)}">
  <meta property="og:site_name" content="${escapeAttr(site.siteName)}">
  <meta property="og:title" content="${escapeAttr(pageTitle)}">
  <meta property="og:description" content="${escapeAttr(description)}">
  <meta property="og:url" content="${escapeAttr(canonical)}">
  <meta property="og:image" content="${escapeAttr(ogImage)}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeAttr(pageTitle)}">
  <meta name="twitter:description" content="${escapeAttr(description)}">
  <meta name="twitter:image" content="${escapeAttr(ogImage)}">
  ${page.id === "home" ? `<link rel="preload" as="image" href="${escapeAttr(imagePath)}">` : ""}
  <link rel="stylesheet" href="${prefix}assets/styles.css">
  <script src="${prefix}assets/config.js" defer></script>
  <script src="${prefix}assets/app.js" defer></script>
  <script type="application/ld+json">${JSON.stringify(structuredData)}</script>
</head>
<body class="page-${escapeAttr(page.id)}">
  <a class="skip-link" href="#content">跳到主要內容</a>
  ${renderHeader(page, prefix)}
  ${renderBreadcrumb(page, prefix)}
  <main id="content">
    ${renderHero(page, imagePath, prefix)}
    <div class="notice-strip"><div class="inner">${escapeHtml(site.ageNotice)} ${escapeHtml(site.responsibleNotice)}</div></div>
    ${page.article ? renderArticle(page, prefix) : renderLanding(page, prefix)}
    ${renderFaqs(page)}
    ${renderRelatedLinks(page, prefix)}
    ${renderCtaBand()}
  </main>
  ${renderFooter(prefix)}
  <div class="mobile-cta"><a class="button button-primary" data-register-cta href="${escapeAttr(site.registerRedirectUrl)}">${escapeHtml(site.ctaText)}</a></div>
</body>
</html>
`;
}

function renderHeader(page, prefix) {
  const links = pages.filter((item) => ["home", "rules", "betting", "beginner", "terminology", "responsible", "faq"].includes(item.id));
  return `<header class="site-header">
  <nav class="nav" aria-label="主要導覽">
    <a class="brand" href="${prefix}index.html" aria-label="${escapeAttr(site.siteName)}首頁">
      <span class="brand-mark" aria-hidden="true">前</span>
      <span>${escapeHtml(site.siteName)}</span>
    </a>
    <div class="nav-links">
      ${links
        .map((item) => {
          const href = item.route === "index.html" ? `${prefix}index.html` : `${prefix}${item.route.replace(/index\.html$/, "")}`;
          const current = item.id === page.id ? ` aria-current="page"` : "";
          return `<a href="${href}"${current}>${escapeHtml(item.navTitle)}</a>`;
        })
        .join("")}
      <a class="button button-primary header-cta" data-register-cta href="${escapeAttr(site.registerRedirectUrl)}">${escapeHtml(site.ctaText)}</a>
    </div>
  </nav>
</header>`;
}

function renderBreadcrumb(page, prefix) {
  if (page.id === "home") return "";
  return `<nav class="breadcrumb" aria-label="Breadcrumb">
  <a href="${prefix}index.html">首頁</a>
  <span aria-hidden="true">/</span>
  <span>${escapeHtml(page.navTitle || page.heroTitle)}</span>
</nav>`;
}

function renderHero(page, imagePath, prefix) {
  const secondaryHref = page.id === "home" ? "beginner/" : `${prefix}responsible/`;
  const heroAlt = "都市極簡資訊平台桌面示意，包含規則筆記、卡片與城市工作空間";
  return `<section class="hero" aria-labelledby="page-title">
  <div class="hero-media">
    <img src="${escapeAttr(imagePath)}" alt="${escapeAttr(heroAlt)}" width="1600" height="900" fetchpriority="high">
  </div>
  <div class="hero-overlay" aria-hidden="true"></div>
  <div class="hero-content">
    <p class="eyebrow">${escapeHtml(page.eyebrow || site.siteName)}</p>
    <h1 id="page-title">${escapeHtml(page.heroTitle || page.title)}</h1>
    <p class="hero-lead">${escapeHtml(page.heroLead || page.description)}</p>
    <div class="hero-actions">
      <a class="button button-primary" data-register-cta href="${escapeAttr(site.registerRedirectUrl)}">${escapeHtml(site.ctaText)}</a>
      <a class="button button-secondary" href="${escapeAttr(secondaryHref)}">查看責任娛樂</a>
    </div>
  </div>
</section>`;
}

function renderLanding(page, prefix) {
  return `<div class="landing-layout">
  ${renderSections(page, prefix)}
</div>`;
}

function renderArticle(page, prefix) {
  return `<div class="article-layout">
  <aside class="toc-panel" aria-labelledby="toc-title">
    <p id="toc-title" class="toc-label">本頁導覽</p>
    <ol>
      ${page.sections.map((section, index) => `<li><a href="#section-${index + 1}">${escapeHtml(section.title)}</a></li>`).join("")}
      ${page.faqs?.length ? `<li><a href="#faq-title">常見問題</a></li>` : ""}
    </ol>
  </aside>
  <article class="article-body">
    ${renderArticleIntro(page)}
    ${renderSections(page, prefix, true)}
  </article>
</div>`;
}

function renderArticleIntro(page) {
  const keywords = (page.keywords || []).slice(0, 3);
  return `<section class="article-intro" aria-label="文章摘要">
  <p>${escapeHtml(page.description)}</p>
  <div class="article-highlights">
    <div class="mini-card">
      <span>閱讀重點</span>
      <strong>${escapeHtml(keywords.join("、") || "規則與責任娛樂")}</strong>
    </div>
    <div class="mini-card">
      <span>內容定位</span>
      <strong>教育資訊，不提供保證結果</strong>
    </div>
    <div class="mini-card">
      <span>CTA 設定</span>
      <strong>集中於 src/config/site.js</strong>
    </div>
  </div>
</section>`;
}

function renderSections(page, prefix, articleMode = false) {
  return page.sections
    .map((section, index) => {
      const body = (section.body || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
      const lead = section.lead ? `<p class="section-lead">${escapeHtml(section.lead)}</p>` : "";
      const cards = section.cards?.length ? renderCards(section.cards, prefix) : "";
      const id = articleMode ? ` id="section-${index + 1}"` : "";
      const articleClass = articleMode ? " article-section" : "";
      return `<section${id} class="section${articleClass}">
  <div class="section-header">
    <h2>${escapeHtml(section.title)}</h2>
    <div class="content-flow">
      ${lead}
      ${body}
      ${cards}
    </div>
  </div>
</section>`;
    })
    .join("");
}

function renderCards(cards, prefix) {
  return `<div class="card-grid">
  ${cards
    .map((card) => {
      const href = normalizeHref(card.href, prefix);
      return `<article class="card">
    <h3>${escapeHtml(card.title)}</h3>
    <p>${escapeHtml(card.text)}</p>
    <a href="${escapeAttr(href)}">閱讀更多</a>
  </article>`;
    })
    .join("")}
</div>`;
}

function renderFaqs(page) {
  if (!page.faqs?.length) return "";
  return `<section class="section faq-section" aria-labelledby="faq-title">
  <div class="section-header">
    <h2 id="faq-title">常見問題</h2>
    <div class="faq-list">
      ${page.faqs
        .map(
          (faq, index) => `<details class="faq-item"${index === 0 ? " open" : ""}>
        <summary><span>${escapeHtml(faq.question)}</span></summary>
        <p>${escapeHtml(faq.answer)}</p>
      </details>`
        )
        .join("")}
    </div>
  </div>
</section>`;
}

function renderRelatedLinks(page, prefix) {
  const related = pages
    .filter((item) => item.id !== page.id && ["rules", "betting", "beginner", "terminology", "responsible", "faq"].includes(item.id))
    .slice(0, 3);

  if (!related.length || page.id === "home") return "";

  return `<section class="section related-section" aria-labelledby="related-title">
  <div class="section-header">
    <h2 id="related-title">延伸閱讀</h2>
    <div class="card-grid compact-grid">
      ${related
        .map(
          (item) => `<article class="card">
        <h3>${escapeHtml(item.navTitle)}</h3>
        <p>${escapeHtml(item.description)}</p>
        <a href="${prefix}${item.route.replace(/index\.html$/, "")}">查看文章</a>
      </article>`
        )
        .join("")}
    </div>
  </div>
</section>`;
}

function renderCtaBand() {
  return `<section class="cta-band">
  <div class="section">
    <div>
      <p class="eyebrow">Clear CTA</p>
      <h2>以清楚資訊做出成年人自己的娛樂判斷</h2>
      <p>${escapeHtml(site.responsibleNotice)} ${escapeHtml(site.regionalNotice)}</p>
    </div>
    <a class="button button-primary" data-register-cta href="${escapeAttr(site.registerRedirectUrl)}">${escapeHtml(site.ctaText)}</a>
  </div>
</section>`;
}

function renderFooter(prefix) {
  const footerPages = pages.filter((item) => ["about", "contact", "terms", "privacy", "responsible", "faq"].includes(item.id));
  return `<footer class="site-footer">
  <div class="footer-inner">
    <div>
      <strong>${escapeHtml(site.siteName)}</strong>
      <p>${escapeHtml(site.siteDescription)}</p>
      <p>${escapeHtml(site.ageNotice)} ${escapeHtml(site.regionalNotice)}</p>
      <p>&copy; <span data-current-year>${buildDate.getFullYear()}</span> ${escapeHtml(site.organizationName)}</p>
    </div>
    <div class="footer-links">
      ${footerPages
        .map((item) => `<a href="${prefix}${item.route.replace(/index\.html$/, "")}">${escapeHtml(item.navTitle)}</a>`)
        .join("")}
      <a data-register-cta href="${escapeAttr(site.registerRedirectUrl)}">${escapeHtml(site.ctaText)}</a>
    </div>
  </div>
</footer>`;
}

function renderStructuredData(page, canonical) {
  const graph = [
    {
      "@type": "Organization",
      "@id": absoluteUrl("#organization"),
      name: site.organizationName,
      url: absoluteUrl(""),
      contactPoint: {
        "@type": "ContactPoint",
        email: site.contactEmail,
        contactType: "customer support",
        availableLanguage: ["zh-Hant"]
      }
    },
    {
      "@type": "WebSite",
      "@id": absoluteUrl("#website"),
      name: site.siteName,
      url: absoluteUrl(""),
      inLanguage: site.language,
      publisher: { "@id": absoluteUrl("#organization") }
    },
    {
      "@type": page.article ? "Article" : "WebPage",
      "@id": `${canonical}#webpage`,
      url: canonical,
      name: page.title,
      description: page.description,
      inLanguage: site.language,
      isPartOf: { "@id": absoluteUrl("#website") },
      publisher: { "@id": absoluteUrl("#organization") },
      dateModified: buildDate.toISOString()
    }
  ];

  if (page.id !== "home") {
    graph.push({
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "首頁", item: absoluteUrl("") },
        { "@type": "ListItem", position: 2, name: page.navTitle || page.heroTitle, item: canonical }
      ]
    });
  }

  if (page.faqs?.length) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: page.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer }
      }))
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}

function createNotFoundPage() {
  return {
    id: "not-found",
    route: "404.html",
    navTitle: "404",
    title: "找不到頁面｜前導頁",
    description: "找不到你要查看的頁面，請回到首頁或使用導覽選單。",
    heroTitle: "找不到頁面",
    heroLead: "這個連結可能已移動或不存在。你可以回到首頁查看百家樂規則與責任娛樂資訊。",
    eyebrow: "404",
    image: heroAsset,
    imageAlt: "都市極簡資訊平台桌面示意",
    sections: [
      {
        title: "回到主要內容",
        body: ["請使用上方導覽回到首頁、規則指南、下注流程、新手指南或 FAQ。"]
      }
    ]
  };
}

function buildKeywordRecommendations() {
  const pageKeywords = pages.flatMap((page) =>
    (page.keywords || []).map((keyword) => ({
      keyword,
      category: page.id,
      searchIntent: "頁面內容關聯查詢",
      suggestedPageType: page.article ? "指南文章" : "資訊頁",
      sensitivityLevel: keyword.includes("下注") || keyword.includes("莊閒") ? "Medium" : "Low",
      complianceRisk: "由站內教育內容擷取；需維持資訊語氣",
      recommendedUsage: "可作為內部連結、FAQ 或段落小標，不可堆疊。",
      relatedLongTailKeywords: [`${keyword}教學`, `${keyword}說明`, `${keyword}常見問題`]
    }))
  );

  const merged = new Map();
  for (const item of [...keywordSeeds, ...pageKeywords]) {
    const normalized = item.keyword.trim();
    if (!normalized || merged.has(normalized)) continue;
    const allowed = safeSensitivityLevels.has(item.sensitivityLevel);
    merged.set(normalized, {
      keyword: normalized,
      language: "zh-Hant",
      category: item.category,
      searchIntent: item.searchIntent,
      suggestedPageType: item.suggestedPageType,
      sensitivityLevel: item.sensitivityLevel,
      complianceRisk: item.complianceRisk,
      recommendedUsage: item.recommendedUsage,
      autoUseAllowed: allowed,
      relatedLongTailKeywords: item.relatedLongTailKeywords
    });
  }

  const all = [...merged.values()].sort((a, b) => {
    const order = { Low: 0, Medium: 1, High: 2, Restricted: 3 };
    return order[a.sensitivityLevel] - order[b.sensitivityLevel] || a.keyword.localeCompare(b.keyword, "zh-Hant");
  });

  return {
    generatedAt: buildDate.toISOString(),
    policy:
      "Only Low and Medium keywords are recommended for normal SEO usage. High and Restricted keywords are flagged and excluded from automatic title, description, and heading generation.",
    recommended: all.filter((item) => item.autoUseAllowed),
    excluded: all.filter((item) => !item.autoUseAllowed)
  };
}

function renderKeywordMarkdown(data) {
  const rows = data.recommended
    .map(
      (item) =>
        `| ${escapeMarkdown(item.keyword)} | ${item.sensitivityLevel} | ${escapeMarkdown(item.category)} | ${escapeMarkdown(item.searchIntent)} | ${escapeMarkdown(item.recommendedUsage)} |`
    )
    .join("\n");
  const excluded = data.excluded
    .map((item) => `- ${item.keyword}：${item.sensitivityLevel}，${item.complianceRisk}`)
    .join("\n");

  return `# Keyword Recommendations

Generated at: ${data.generatedAt}

${data.policy}

## Recommended Keywords

| Keyword | Sensitivity | Category | Search intent | Recommended usage |
| --- | --- | --- | --- | --- |
${rows}

## Excluded High-Risk Keywords

${excluded}
`;
}

function renderSeoReport(keywordData) {
  const duplicateTitles = findDuplicates(pages.map((page) => page.title));
  const duplicateDescriptions = findDuplicates(pages.map((page) => page.description));
  const missingTitles = pages.filter((page) => !page.title);
  const missingDescriptions = pages.filter((page) => !page.description);
  const missingAlt = pages.filter((page) => !page.imageAlt);

  return `# SEO Report

Generated at: ${buildDate.toISOString()}

## Summary

- Pages generated: ${pages.length}
- Missing titles: ${missingTitles.length}
- Missing meta descriptions: ${missingDescriptions.length}
- Duplicate titles: ${duplicateTitles.length}
- Duplicate descriptions: ${duplicateDescriptions.length}
- Missing image alt text: ${missingAlt.length}
- Safe keyword recommendations: ${keywordData.recommended.length}
- Excluded high-risk keywords: ${keywordData.excluded.length}

## Technical SEO

- Canonical URL: generated for every page.
- Open Graph metadata: generated for every page.
- Twitter Card metadata: generated for every page.
- JSON-LD: WebSite, Organization, WebPage or Article, BreadcrumbList, and FAQPage where applicable.
- Sitemap: generated at /sitemap.xml.
- Robots: generated at /robots.txt.

## Responsive UI Notes

- Urban minimalist CSS uses a neutral palette, one teal accent, responsive grid layouts, mobile bottom CTA, and collapsible FAQ blocks.
- Article pages include a table of contents, explanation cards, section anchors, related links, and visible responsible entertainment reminders.

## Compliance Notes

- CTA URL is read from a central config or REGISTER_REDIRECT_URL environment variable.
- High and Restricted keyword groups are excluded from automatic title, meta description, and heading generation.
- Content avoids guaranteed profit, risk-free claims, platform exploit language, and underage targeting.
`;
}

function renderSitemap() {
  const urls = pages
    .map((page) => {
      const loc = absoluteUrl(page.route === "index.html" ? "" : page.route.replace(/index\.html$/, ""));
      return `  <url>
    <loc>${escapeHtml(loc)}</loc>
    <lastmod>${buildDate.toISOString().slice(0, 10)}</lastmod>
    <changefreq>${page.id === "home" ? "weekly" : "monthly"}</changefreq>
    <priority>${page.id === "home" ? "1.0" : "0.8"}</priority>
  </url>`;
    })
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}

function renderRobots() {
  return `User-agent: *
Allow: /

Sitemap: ${absoluteUrl("sitemap.xml")}
`;
}

function relativePrefix(route) {
  const depth = route.split("/").length - 1;
  return depth <= 0 ? "" : "../".repeat(depth);
}

function normalizeHref(href, prefix) {
  if (/^(https?:|mailto:|tel:|#)/.test(href)) return href;
  if (href.endsWith(".md")) return `${prefix}${href}`;
  if (href === "index.html") return `${prefix}index.html`;
  return `${prefix}${href}`;
}

function absoluteUrl(route) {
  const base = site.publicBaseUrl.endsWith("/") ? site.publicBaseUrl : `${site.publicBaseUrl}/`;
  return new URL(route, base).toString();
}

function findDuplicates(values) {
  const seen = new Set();
  const duplicates = new Set();
  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }
  return [...duplicates];
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}

function escapeMarkdown(value) {
  return String(value).replace(/\|/g, "\\|").replace(/\n/g, " ");
}
