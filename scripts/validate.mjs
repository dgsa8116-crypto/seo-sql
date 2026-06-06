import { existsSync, statSync } from "node:fs";
import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { pages } from "../src/content/pages.js";
import { keywordSeeds } from "../src/content/keywords.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(root, "dist");
const requiredFiles = [
  "index.html",
  "lotto539/index.html",
  "lotto539/calculator/index.html",
  "sports/index.html",
  "egames/index.html",
  "rules/index.html",
  "betting/index.html",
  "beginner/index.html",
  "terminology/index.html",
  "responsible/index.html",
  "faq/index.html",
  "about/index.html",
  "contact/index.html",
  "terms/index.html",
  "privacy/index.html",
  "404.html",
  "sitemap.xml",
  "robots.txt",
  "keyword-recommendations.json",
  "keyword-recommendations.md",
  "seo-report.md",
  "assets/styles.css",
  "assets/app.js",
  "assets/config.js",
  "assets/data/lotto539.json",
  "assets/data/sports-tracking.json",
  "assets/images/urban-minimal-hero.png"
];

const failures = [];

for (const file of requiredFiles) {
  await mustExist(path.join(distDir, file), `Missing required output: ${file}`);
}

const htmlFiles = await listFiles(distDir, ".html");
for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const relative = path.relative(distDir, file).replace(/\\/g, "/");
  checkHtml(relative, html);
}

const keywordData = JSON.parse(await readFile(path.join(distDir, "keyword-recommendations.json"), "utf8"));
const disallowed = new Set((keywordData.excluded || []).map((item) => item.keyword));
for (const item of keywordData.recommended) {
  if (disallowed.has(item.keyword)) {
    failures.push(`Excluded keyword appears in recommended list: ${item.keyword}`);
  }
  if (!["Low", "Medium"].includes(item.sensitivityLevel)) {
    failures.push(`Unsafe sensitivity recommended: ${item.keyword}`);
  }
}

const highRiskWords = keywordSeeds
  .filter((item) => ["High", "Restricted"].includes(item.sensitivityLevel))
  .map((item) => item.keyword);
for (const page of pages) {
  const joined = `${page.title} ${page.description} ${page.heroTitle}`;
  for (const word of highRiskWords) {
    if (joined.includes(word)) {
      failures.push(`High-risk keyword used in page SEO text: ${word} on ${page.route}`);
    }
  }
}

const allTextFiles = await listFiles(root, ".js", ".mjs", ".json", ".md", ".html", ".css");
for (const file of allTextFiles) {
  if (file.includes(`${path.sep}node_modules${path.sep}`) || file.includes(`${path.sep}.git${path.sep}`)) continue;
  const text = await readFile(file, "utf8");
  if (/sk-[A-Za-z0-9_-]{20,}/.test(text)) failures.push(`Possible API secret found in ${file}`);
  if (/AKIA[0-9A-Z]{16}/.test(text)) failures.push(`Possible AWS key found in ${file}`);
}

if (failures.length) {
  console.error("Validation failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Validation passed for ${htmlFiles.length} HTML files`);

async function mustExist(file, message) {
  try {
    await access(file);
  } catch {
    failures.push(message);
  }
}

function checkHtml(relative, html) {
  if (!/<title>[^<]{8,}<\/title>/.test(html)) failures.push(`${relative}: missing title`);
  if (!/<meta name="description" content="[^"]{20,}">/.test(html)) failures.push(`${relative}: missing meta description`);
  if (!/<link rel="canonical" href="https?:\/\/[^"]+">/.test(html)) failures.push(`${relative}: missing canonical`);
  if (!/<meta property="og:title" content="[^"]+">/.test(html)) failures.push(`${relative}: missing OG title`);
  if (!/<meta name="twitter:card" content="summary_large_image">/.test(html)) failures.push(`${relative}: missing Twitter card`);
  if (!/<script type="application\/ld\+json">/.test(html)) failures.push(`${relative}: missing JSON-LD`);
  if (!/data-register-cta/.test(html)) failures.push(`${relative}: missing CTA`);
  if (relative !== "index.html" && !/class="toc-panel"/.test(html) && /page-(rules|betting|beginner|terminology|egames|responsible)/.test(html)) {
    failures.push(`${relative}: missing article table of contents`);
  }
  if (/class="faq-item"/.test(html) && !/<details class="faq-item"/.test(html)) {
    failures.push(`${relative}: FAQ is not collapsible details markup`);
  }
  if (/Lorem ipsum|TODO|Coming soon|Sample title|Default template copy/i.test(html)) {
    failures.push(`${relative}: placeholder copy remains`);
  }

  const imageTags = html.match(/<img\b[^>]*>/g) || [];
  for (const tag of imageTags) {
    if (!/\salt="[^"]{4,}"/.test(tag)) failures.push(`${relative}: image missing useful alt text`);
  }

  const internalLinks = [...html.matchAll(/\shref="([^"]+)"/g)]
    .map((match) => match[1])
    .filter((href) => !/^(https?:|mailto:|tel:|#)/.test(href) && !href.endsWith(".css"));
  for (const href of internalLinks) {
    const target = resolveInternalLink(relative, href);
    if (!target) failures.push(`${relative}: broken internal link ${href}`);
  }
}

function resolveInternalLink(relativeFile, href) {
  const withoutHash = href.split("#")[0];
  const baseDir = path.dirname(path.join(distDir, relativeFile));
  const absolute = path.resolve(baseDir, withoutHash);
  const candidates = [];

  if (withoutHash.endsWith("/")) {
    candidates.push(path.join(absolute, "index.html"));
  } else if (path.extname(withoutHash)) {
    candidates.push(absolute);
  } else {
    candidates.push(absolute, `${absolute}.html`, path.join(absolute, "index.html"));
  }

  return candidates.some((candidate) => {
    try {
      return statSyncSafe(candidate);
    } catch {
      return false;
    }
  });
}

function statSyncSafe(file) {
  return existsSync(file) && statSync(file).isFile();
}

async function listFiles(dir, ...extensions) {
  const entries = await readdir(dir, { withFileTypes: true });
  const results = [];
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === "node_modules" || entry.name === ".git") continue;
      results.push(...(await listFiles(fullPath, ...extensions)));
    } else if (!extensions.length || extensions.includes(path.extname(entry.name))) {
      results.push(fullPath);
    }
  }
  return results;
}
