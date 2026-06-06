import { copyFile, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pages } from "../src/content/pages.js";
import { keywordSeeds, safeSensitivityLevels } from "../src/content/keywords.js";
import { resolveSiteConfig } from "../src/config/site.js";
import {
  fallbackLotto539Draws,
  lotto539Config,
  sportsResearchBoard
} from "../src/content/research-data.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");
const publicDir = path.join(root, "public");
const site = resolveSiteConfig();
const buildDate = new Date();
const heroAsset = "assets/images/urban-minimal-hero.png";
const lotto539Data = await loadLotto539Data();
const lotto539Analysis = buildLotto539Analysis(lotto539Data.draws);

await rm(distDir, { recursive: true, force: true });
await mkdir(path.join(distDir, "assets", "images"), { recursive: true });
await mkdir(path.join(distDir, "assets", "data"), { recursive: true });
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
      responsibleNotice: site.responsibleNotice,
      lotto539Latest: lotto539Analysis.latest
    },
    null,
    2
  )};\n`,
  "utf8"
);

await writeFile(
  path.join(distDir, "assets", "data", "lotto539.json"),
  `${JSON.stringify({ ...lotto539Data, analysis: lotto539Analysis }, null, 2)}\n`,
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
console.log(`539 source status: ${lotto539Data.sourceStatus}`);
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
  const content = page.article ? renderArticle(page, prefix) : renderLanding(page, prefix);

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
  <div class="site-shell">
    ${renderSideRail(page, prefix)}
    <div class="page-column">
      ${renderBreadcrumb(page, prefix)}
      <main id="content">
        ${renderHero(page, imagePath, prefix)}
        <div class="notice-strip"><div class="inner">${escapeHtml(site.ageNotice)} ${escapeHtml(site.responsibleNotice)}</div></div>
        ${content}
        ${renderFaqs(page)}
        ${renderRelatedLinks(page, prefix)}
        ${renderCtaBand()}
      </main>
      ${renderFooter(prefix)}
    </div>
  </div>
  <div class="mobile-cta"><a class="button button-primary" data-register-cta href="${escapeAttr(site.registerRedirectUrl)}">${escapeHtml(site.ctaText)}</a></div>
</body>
</html>
`;
}

function renderHeader(page, prefix) {
  const links = pages.filter((item) =>
    ["home", "lotto539", "lotto539-calculator", "sports", "rules", "faq"].includes(item.id)
  );

  return `<header class="site-header">
  <nav class="nav" aria-label="主要導覽">
    <a class="brand" href="${prefix}index.html" aria-label="${escapeAttr(site.siteName)}首頁">
      ${renderLogoMark()}
      <span>${escapeHtml(site.siteName)}</span>
    </a>
    <div class="nav-links">
      ${links
        .map((item) => {
          const current = item.id === page.id ? ` aria-current="page"` : "";
          return `<a href="${pageHref(item, prefix)}"${current}>${escapeHtml(item.navTitle)}</a>`;
        })
        .join("")}
      <a class="button button-primary header-cta" data-register-cta href="${escapeAttr(site.registerRedirectUrl)}">${escapeHtml(site.ctaText)}</a>
    </div>
  </nav>
</header>`;
}

function renderSideRail(page, prefix) {
  const groups = [
    { label: "研究儀表板", ids: ["home", "lotto539", "lotto539-calculator", "sports"] },
    { label: "百家樂指南", ids: ["rules", "betting", "beginner", "terminology"] },
    { label: "合規與支援", ids: ["responsible", "faq", "about", "contact", "terms", "privacy"] }
  ];

  return `<aside class="side-rail" aria-label="左側細項欄位">
  <div class="side-brand">
    ${renderLogoMark("side")}
    <div>
      <strong>${escapeHtml(site.siteName)}</strong>
      <span>研究型資訊平台</span>
    </div>
  </div>
  <div class="side-latest">
    <span>539 最近一期</span>
    <strong>${escapeHtml(formatDisplayDate(lotto539Analysis.latest.date))}</strong>
    <div class="mini-balls">${renderBalls(lotto539Analysis.latest.numbers, "mini")}</div>
  </div>
  <nav class="side-nav">
    ${groups
      .map(
        (group) => `<div class="side-group">
      <p>${escapeHtml(group.label)}</p>
      ${group.ids
        .map((id) => pages.find((item) => item.id === id))
        .filter(Boolean)
        .map((item) => {
          const current = item.id === page.id ? ` aria-current="page"` : "";
          return `<a href="${pageHref(item, prefix)}"${current}>${escapeHtml(item.navTitle)}</a>`;
        })
        .join("")}
    </div>`
      )
      .join("")}
  </nav>
  <a class="side-cta" data-register-cta href="${escapeAttr(site.registerRedirectUrl)}">${escapeHtml(site.ctaText)}</a>
</aside>`;
}

function renderLogoMark(variant = "header") {
  return `<span class="brand-mark brand-mark-${escapeAttr(variant)}" aria-hidden="true">
  <svg viewBox="0 0 64 64" focusable="false">
    <circle cx="32" cy="32" r="27"></circle>
    <path d="M20 20h24v8H31v8h11v8H31v10h-9V28h-2z"></path>
    <path d="M17 47c7-4 23-4 30 0" class="seal-line"></path>
  </svg>
</span>`;
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
  const defaultSecondary =
    page.id === "home"
      ? "lotto539/"
      : page.id === "lotto539"
        ? "lotto539/calculator/"
        : page.id === "lotto539-calculator"
          ? "lotto539/"
          : page.id === "sports"
            ? "responsible/"
            : "responsible/";
  const secondaryHref = normalizeHref(page.secondaryHref || defaultSecondary, prefix);
  const secondaryText = page.secondaryCta || (page.id === "sports" ? "查看責任聲明" : "了解更多");

  return `<section class="hero" aria-labelledby="page-title">
  <div class="hero-media">
    <img src="${escapeAttr(imagePath)}" alt="${escapeAttr(page.imageAlt || "都市極簡資訊平台示意圖")}" width="1600" height="900" fetchpriority="high">
  </div>
  <div class="hero-overlay" aria-hidden="true"></div>
  <div class="hero-content">
    <p class="eyebrow">${escapeHtml(page.eyebrow || site.siteName)}</p>
    <h1 id="page-title">${escapeHtml(page.heroTitle || page.title)}</h1>
    <p class="hero-lead">${escapeHtml(page.heroLead || page.description)}</p>
    <div class="hero-actions">
      <a class="button button-primary" data-register-cta href="${escapeAttr(site.registerRedirectUrl)}">${escapeHtml(site.ctaText)}</a>
      <a class="button button-secondary" href="${escapeAttr(secondaryHref)}">${escapeHtml(secondaryText)}</a>
    </div>
  </div>
</section>`;
}

function renderLanding(page, prefix) {
  return `<div class="landing-layout">
  ${renderSections(page, prefix)}
  ${renderPageModules(page, prefix)}
</div>`;
}

function renderArticle(page, prefix) {
  return `<div class="article-layout">
  <aside class="toc-panel" aria-labelledby="toc-title">
    <p id="toc-title" class="toc-label">頁面段落</p>
    <ol>
      ${page.sections.map((section, index) => `<li><a href="#section-${index + 1}">${escapeHtml(section.title)}</a></li>`).join("")}
      ${page.modules?.length ? `<li><a href="#module-${escapeAttr(page.id)}">研究模組</a></li>` : ""}
      ${page.faqs?.length ? `<li><a href="#faq-title">常見問題</a></li>` : ""}
    </ol>
  </aside>
  <article class="article-body">
    ${renderArticleIntro(page)}
    ${renderSections(page, prefix, true)}
    ${renderPageModules(page, prefix)}
  </article>
</div>`;
}

function renderArticleIntro(page) {
  const keywords = (page.keywords || []).slice(0, 3);
  return `<section class="article-intro" aria-label="頁面摘要">
  <p>${escapeHtml(page.description)}</p>
  <div class="article-highlights">
    <div class="mini-card">
      <span>主題</span>
      <strong>${escapeHtml(keywords.join("、") || page.navTitle || site.siteName)}</strong>
    </div>
    <div class="mini-card">
      <span>內容定位</span>
      <strong>統計觀察、規則教育與研究討論</strong>
    </div>
    <div class="mini-card">
      <span>CTA 設定</span>
      <strong>集中管理，不使用誇大文案</strong>
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
    <a href="${escapeAttr(href)}">查看細節</a>
  </article>`;
    })
    .join("")}
</div>`;
}

function renderPageModules(page, prefix) {
  if (!page.modules?.length) return "";
  return page.modules
    .map((module) => {
      if (module === "home-research-preview") return renderHomeResearchPreview(prefix);
      if (module === "lotto539-dashboard") return renderLotto539Dashboard();
      if (module === "lotto539-calculator") return renderLotto539Calculator();
      if (module === "sports-research") return renderSportsResearch();
      return "";
    })
    .join("");
}

function renderHomeResearchPreview(prefix) {
  const latest = lotto539Analysis.latest;
  return `<section class="module-section home-board" id="module-home">
  <div class="module-head">
    <p class="eyebrow">Live Research Preview</p>
    <h2>今日先看這三個重點</h2>
    <p>示範頁把 539、碰數工具與賽事研究放在首頁前段，讓使用者不用搜尋就能進入核心功能。</p>
  </div>
  <div class="feature-grid">
    <article class="feature-panel strong">
      <span>539 最近一期</span>
      <h3>${escapeHtml(formatDisplayDate(latest.date))}</h3>
      <div class="ball-list">${renderBalls(latest.numbers)}</div>
      <a href="${prefix}lotto539/">查看冷熱號</a>
    </article>
    <article class="feature-panel">
      <span>快速工具</span>
      <h3>輸入 5 個號碼算碰</h3>
      <p>比對近期開獎，直接顯示每一期碰數與最高碰數。</p>
      <a href="${prefix}lotto539/calculator/">開啟計算機</a>
    </article>
    <article class="feature-panel">
      <span>賽事研究</span>
      <h3>${escapeHtml(getSportsTargetDateLabel())} 看板欄位</h3>
      <p>球場、人員、傷兵、整季表現與資料完整度一次整理。</p>
      <a href="${prefix}sports/">查看賽事研究</a>
    </article>
  </div>
</section>`;
}

function renderLotto539Dashboard() {
  const latest = lotto539Analysis.latest;
  const sourceStatus = lotto539Data.sourceStatus === "live" ? "已嘗試同步公開資料" : "使用備援資料";

  return `<section class="module-section data-section" id="module-lotto539">
  <div class="module-head">
    <p class="eyebrow">539 Data Board</p>
    <h2>最新號碼、冷熱號與近期紀錄</h2>
    <p>資料來源：<a href="${escapeAttr(lotto539Config.sourceUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(lotto539Config.sourceName)}</a>。狀態：${escapeHtml(sourceStatus)}。統計期間：最近 ${lotto539Analysis.drawCount} 期。</p>
  </div>
  <div class="lotto-layout">
    <article class="draw-card latest-draw">
      <span>最近一期</span>
      <h3>${escapeHtml(formatDisplayDate(latest.date))}（${escapeHtml(latest.weekday || "")}）</h3>
      <div class="ball-list large">${renderBalls(latest.numbers)}</div>
      <p>本區只顯示開獎資訊與統計觀察，不代表推薦或保證。</p>
    </article>
    <article class="draw-card">
      <span>資料狀態</span>
      <h3>${escapeHtml(sourceStatus)}</h3>
      <p>建置時間：${escapeHtml(formatDateTime(lotto539Data.fetchedAt || buildDate))}</p>
      <p>若公開頁短暫無法讀取，系統會使用備援資料讓網站正常部署。</p>
    </article>
  </div>
  <div class="heat-grid">
    <article class="heat-card">
      <h3>熱門號觀察</h3>
      <div class="rank-list">${renderRankItems(lotto539Analysis.hotNumbers, "hot")}</div>
    </article>
    <article class="heat-card">
      <h3>冷門號觀察</h3>
      <div class="rank-list">${renderRankItems(lotto539Analysis.coldNumbers, "cold")}</div>
    </article>
    <article class="heat-card">
      <h3>常見配對</h3>
      <div class="rank-list">${lotto539Analysis.topPairs
        .map((pair) => `<div class="rank-item"><strong>${escapeHtml(pair.numbers.map(formatBallNumber).join("、"))}</strong><span>${pair.count} 次</span></div>`)
        .join("")}</div>
    </article>
  </div>
  <div class="table-card">
    <div class="table-head">
      <h3>近期開獎紀錄</h3>
      <a href="${escapeAttr(lotto539Config.sourceUrl)}" target="_blank" rel="noopener noreferrer">查看來源</a>
    </div>
    <div class="responsive-table">
      <table class="data-table">
        <thead><tr><th>日期</th><th>星期</th><th>開獎號碼</th><th>和值</th></tr></thead>
        <tbody>
          ${lotto539Analysis.recentDraws
            .map(
              (draw) => `<tr>
            <td>${escapeHtml(formatDisplayDate(draw.date))}</td>
            <td>${escapeHtml(draw.weekday || "-")}</td>
            <td><div class="ball-list table-balls">${renderBalls(draw.numbers, "small")}</div></td>
            <td>${draw.numbers.reduce((sum, number) => sum + number, 0)}</td>
          </tr>`
            )
            .join("")}
        </tbody>
      </table>
    </div>
  </div>
  <div class="rule-strip">
    ${lotto539Config.ruleNotes.map((note) => `<p>${escapeHtml(note)}</p>`).join("")}
  </div>
</section>`;
}

function renderLotto539Calculator() {
  const drawsJson = JSON.stringify(lotto539Data.draws.slice(0, 60));
  return `<section class="module-section calculator-section" id="module-lotto539-calculator">
  <div class="module-head">
    <p class="eyebrow">539 Calculator</p>
    <h2>算碰計算機</h2>
    <p>輸入 5 個 01 到 39 的號碼，按下計算後就會和近期開獎比對。介面刻意簡化，讓第一次使用的人也看得懂。</p>
  </div>
  <div class="calculator-panel" data-lotto-calculator data-draws="${escapeAttr(drawsJson)}">
    <label for="lotto-input">輸入 5 個號碼</label>
    <div class="calculator-row">
      <input id="lotto-input" data-lotto-input inputmode="numeric" autocomplete="off" placeholder="例如：02 08 13 27 38">
      <button class="button button-primary" type="button" data-lotto-run>計算碰數</button>
      <button class="button button-secondary" type="button" data-lotto-example>套用範例</button>
    </div>
    <p class="helper-text">可使用空格、逗號、頓號或斜線分隔。號碼必須介於 01 到 39，且不能重複。</p>
    <div class="calculator-result" data-lotto-result aria-live="polite">
      <strong>等待輸入</strong>
      <p>輸入號碼後，這裡會顯示最高碰數、碰數分布與最近比對明細。</p>
    </div>
  </div>
  <div class="explain-grid">
    <article class="explain-card">
      <h3>碰 0 到碰 5</h3>
      <p>碰數就是你輸入的號碼與某一期開獎號碼相同的數量。</p>
    </article>
    <article class="explain-card">
      <h3>只做比對</h3>
      <p>工具只比對歷史資料，不會預測下一期，也不會保證結果。</p>
    </article>
    <article class="explain-card">
      <h3>手機可用</h3>
      <p>輸入框與按鈕都保留足夠高度，方便手機直接操作。</p>
    </article>
  </div>
</section>`;
}

function renderSportsResearch() {
  return `<section class="module-section sports-section" id="module-sports">
  <div class="module-head">
    <p class="eyebrow">Sports Research Board</p>
    <h2>${escapeHtml(getSportsTargetDateLabel())} 次日賽事研究架構</h2>
    <p>${escapeHtml(sportsResearchBoard.intro)}</p>
  </div>
  <div class="sports-grid">
    ${sportsResearchBoard.factors
      .map(
        (factor) => `<article class="sports-card">
      <h3>${escapeHtml(factor.title)}</h3>
      <p>${escapeHtml(factor.text)}</p>
    </article>`
      )
      .join("")}
  </div>
  <div class="table-card">
    <div class="table-head">
      <h3>全量賽事資料源規劃</h3>
      <span>示範頁先完成欄位，不假裝已串接所有賽程</span>
    </div>
    <div class="responsive-table">
      <table class="data-table source-table">
        <thead><tr><th>聯盟</th><th>範圍</th><th>資料源</th><th>必要欄位</th><th>狀態</th></tr></thead>
        <tbody>
          ${sportsResearchBoard.leagues
            .map(
              (league) => `<tr>
            <td><strong>${escapeHtml(league.name)}</strong></td>
            <td>${escapeHtml(league.scope)}</td>
            <td>${escapeHtml(league.sourcePlan)}</td>
            <td>${escapeHtml(league.requiredFields)}</td>
            <td><span class="status-pill">${escapeHtml(league.status)}</span></td>
          </tr>`
            )
            .join("")}
        </tbody>
      </table>
    </div>
  </div>
  <div class="research-template">
    <div>
      <p class="eyebrow">Recommendation Template</p>
      <h3>正式版推薦卡應包含的內容</h3>
      <p>資料不完整時顯示「資料不足」，資料完整時才產出研究觀點。</p>
    </div>
    <ol>
      ${sportsResearchBoard.recommendationTemplate.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
    </ol>
  </div>
</section>`;
}

function renderRankItems(items, type) {
  return items
    .map(
      (item) => `<div class="rank-item ${escapeAttr(type)}">
    <strong>${escapeHtml(formatBallNumber(item.number))}</strong>
    <span>${item.count} 次${type === "cold" ? `，距今 ${item.missing} 期` : ""}</span>
  </div>`
    )
    .join("");
}

function renderBalls(numbers, size = "") {
  const className = size ? ` lotto-ball-${size}` : "";
  return numbers
    .map((number) => `<span class="lotto-ball${className}">${escapeHtml(formatBallNumber(number))}</span>`)
    .join("");
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
  const related = (page.relatedIds || ["lotto539", "lotto539-calculator", "sports", "responsible", "faq"])
    .map((id) => pages.find((item) => item.id === id))
    .filter((item) => item && item.id !== page.id)
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
        <a href="${pageHref(item, prefix)}">繼續閱讀</a>
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
      <h2>想查看活動或註冊入口，請從官方按鈕前往</h2>
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
      ${footerPages.map((item) => `<a href="${pageHref(item, prefix)}">${escapeHtml(item.navTitle)}</a>`).join("")}
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
    title: "找不到頁面｜賽號研究所",
    description: "找不到指定頁面，請回到首頁或使用左側細項欄位。",
    heroTitle: "找不到頁面",
    heroLead: "這個連結可能已移動或不存在。你可以回到首頁、539、賽事研究或 FAQ。",
    eyebrow: "404",
    imageAlt: "找不到頁面的資訊平台示意圖",
    sections: [
      {
        title: "回到主要功能",
        body: ["請使用導覽列或左側細項欄位切換到 539、算碰計算機、賽事研究、規則或 FAQ。"]
      }
    ],
    relatedIds: ["home", "lotto539", "sports"]
  };
}

function buildKeywordRecommendations() {
  const pageKeywords = pages.flatMap((page) =>
    (page.keywords || []).map((keyword) => ({
      keyword,
      category: page.id,
      searchIntent: "頁面主題相關資訊查詢",
      suggestedPageType: page.article ? "文章型頁面" : "研究入口頁",
      sensitivityLevel: keyword.includes("下注") || keyword.includes("賽事分析") ? "Medium" : "Low",
      complianceRisk: "需保持中性語氣，不使用保證結果或誇大收益文案。",
      recommendedUsage: "可用於內文、FAQ、標題或內部連結，並搭配責任提醒。",
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
    .map((item) => `- ${item.keyword}: ${item.sensitivityLevel}; ${item.complianceRisk}`)
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
- 539 data source status: ${lotto539Data.sourceStatus}
- 539 latest draw: ${lotto539Analysis.latest.date} ${lotto539Analysis.latest.numbers.map(formatBallNumber).join(", ")}

## Technical SEO

- Canonical URL: generated for every page.
- Open Graph metadata: generated for every page.
- Twitter Card metadata: generated for every page.
- JSON-LD: WebSite, Organization, WebPage or Article, BreadcrumbList, and FAQPage where applicable.
- Sitemap: generated at /sitemap.xml.
- Robots: generated at /robots.txt.
- 539 JSON data: generated at /assets/data/lotto539.json.

## Responsive UI Notes

- Urban minimalist CSS uses a neutral palette, one red accent, responsive cards, left-side detail rail, mobile bottom CTA, and collapsible FAQ blocks.
- Article pages include a table of contents, explanation cards, section anchors, related links, and visible responsible entertainment reminders.
- 539 and sports modules use responsive grids and mobile-friendly tables.

## Compliance Notes

- CTA URL is read from a central config or REGISTER_REDIRECT_URL environment variable.
- High and Restricted keyword groups are excluded from automatic title, meta description, and heading generation.
- Content avoids guaranteed profit, risk-free claims, platform exploit language, and underage targeting.
- Sports research is marked as academic discussion and requires official data feeds for full accuracy.
`;
}

function renderSitemap() {
  const urls = pages
    .map((page) => {
      const loc = absoluteUrl(page.route === "index.html" ? "" : page.route.replace(/index\.html$/, ""));
      return `  <url>
    <loc>${escapeHtml(loc)}</loc>
    <lastmod>${buildDate.toISOString().slice(0, 10)}</lastmod>
    <changefreq>${["home", "lotto539", "sports"].includes(page.id) ? "daily" : "monthly"}</changefreq>
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

async function loadLotto539Data() {
  const fallback = {
    sourceName: lotto539Config.sourceName,
    sourceUrl: lotto539Config.sourceUrl,
    sourceStatus: "fallback",
    fetchedAt: buildDate.toISOString(),
    draws: fallbackLotto539Draws
  };

  if (process.env.SKIP_LIVE_DATA === "1" || typeof fetch !== "function") return fallback;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const response = await fetch(lotto539Config.sourceUrl, {
      signal: controller.signal,
      headers: {
        "user-agent": "Mozilla/5.0 (compatible; SaigoResearchBot/1.0; +https://github.com/dgsa8116-crypto/seo-sql)"
      }
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const buffer = Buffer.from(await response.arrayBuffer());
    const html = buffer.toString("utf8");
    const draws = parsePilio539(html);
    if (draws.length < 5) throw new Error("not enough 539 rows parsed");
    return {
      sourceName: lotto539Config.sourceName,
      sourceUrl: lotto539Config.sourceUrl,
      sourceStatus: "live",
      fetchedAt: buildDate.toISOString(),
      draws: draws.slice(0, 80)
    };
  } catch (error) {
    console.warn(`539 live update failed, using fallback data: ${error.message}`);
    return fallback;
  } finally {
    clearTimeout(timer);
  }
}

function parsePilio539(html) {
  const normalized = html
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ");
  const regex = /(\d{2})\/(\d{2})\s*(\d{2})\([^)]*\)\s*((?:\d{1,2}\s*,\s*){4}\d{1,2})/g;
  const draws = [];
  const seen = new Set();
  let match;
  while ((match = regex.exec(normalized))) {
    const [, month, day, yearSuffix, rawNumbers] = match;
    const numbers = rawNumbers.split(",").map((value) => Number(value.trim()));
    if (!isValid539Numbers(numbers)) continue;
    const date = `${2000 + Number(yearSuffix)}-${month}-${day}`;
    if (seen.has(date)) continue;
    seen.add(date);
    draws.push({
      date,
      weekday: "",
      numbers
    });
  }
  return draws;
}

function buildLotto539Analysis(draws) {
  const cleanDraws = draws
    .filter((draw) => draw?.date && isValid539Numbers(draw.numbers))
    .map((draw) => ({
      ...draw,
      numbers: [...draw.numbers].sort((a, b) => a - b)
    }));

  const stats = Array.from({ length: 39 }, (_, index) => ({
    number: index + 1,
    count: 0,
    missing: cleanDraws.length
  }));

  for (const [drawIndex, draw] of cleanDraws.entries()) {
    for (const number of draw.numbers) {
      const item = stats[number - 1];
      item.count += 1;
      if (item.missing === cleanDraws.length) item.missing = drawIndex;
    }
  }

  const hotNumbers = [...stats]
    .sort((a, b) => b.count - a.count || a.missing - b.missing || a.number - b.number)
    .slice(0, 10);
  const coldNumbers = [...stats]
    .sort((a, b) => a.count - b.count || b.missing - a.missing || a.number - b.number)
    .slice(0, 10);
  const pairCounts = new Map();

  for (const draw of cleanDraws) {
    for (let i = 0; i < draw.numbers.length; i += 1) {
      for (let j = i + 1; j < draw.numbers.length; j += 1) {
        const pair = `${draw.numbers[i]}-${draw.numbers[j]}`;
        pairCounts.set(pair, (pairCounts.get(pair) || 0) + 1);
      }
    }
  }

  const topPairs = [...pairCounts.entries()]
    .map(([key, count]) => ({
      numbers: key.split("-").map(Number),
      count
    }))
    .sort((a, b) => b.count - a.count || a.numbers[0] - b.numbers[0] || a.numbers[1] - b.numbers[1])
    .slice(0, 8);

  return {
    latest: cleanDraws[0],
    drawCount: cleanDraws.length,
    recentDraws: cleanDraws.slice(0, 16),
    hotNumbers,
    coldNumbers,
    topPairs
  };
}

function isValid539Numbers(numbers) {
  return (
    Array.isArray(numbers) &&
    numbers.length === 5 &&
    new Set(numbers).size === 5 &&
    numbers.every((number) => Number.isInteger(number) && number >= 1 && number <= 39)
  );
}

function getSportsTargetDateLabel() {
  const [year, month, day] = lotto539Analysis.latest.date.split("-").map(Number);
  const targetDate = new Date(Date.UTC(year, month - 1, day + 1, 12, 0, 0));
  return new Intl.DateTimeFormat("zh-Hant-TW", {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    weekday: "short"
  }).format(targetDate);
}

function pageHref(page, prefix) {
  return page.route === "index.html" ? `${prefix}index.html` : `${prefix}${page.route.replace(/index\.html$/, "")}`;
}

function relativePrefix(route) {
  const depth = route.split("/").length - 1;
  return depth <= 0 ? "" : "../".repeat(depth);
}

function normalizeHref(href, prefix) {
  if (/^(https?:|mailto:|tel:|#)/.test(href)) return href;
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

function formatBallNumber(number) {
  return String(number).padStart(2, "0");
}

function formatDisplayDate(date) {
  return String(date).replace(/-/g, "/");
}

function formatDateTime(value) {
  return new Intl.DateTimeFormat("zh-Hant-TW", {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  }).format(new Date(value));
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
