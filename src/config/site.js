export const siteConfig = {
  siteName: "前導頁",
  siteDescription:
    "以百家樂規則、下注流程、常見術語與責任娛樂為核心的教育型前導頁。",
  publicBaseUrl: "https://dgsa8116-crypto.github.io/seo-sql/",
  registerRedirectUrl: "https://becgame88168.com/",
  ctaText: "前往註冊",
  seoTitle: "前導頁｜百家樂規則、玩法流程與責任娛樂指南",
  seoDescription:
    "完整整理百家樂規則、牌值計算、下注流程、新手觀念、常見術語與責任娛樂提醒，適合公開部署到 GitHub Pages。",
  contactEmail: "support@example.com",
  responsibleNotice:
    "本網站僅提供教育與娛樂資訊，不保證任何遊戲結果或收益。請遵守所在地法律並量力而為。",
  ageNotice: "本網站內容僅供達法定年齡的成年人閱讀。",
  regionalNotice:
    "各地法規與平台可用性不同，使用任何娛樂服務前請先確認所在地規範。",
  organizationName: "前導頁內容團隊",
  language: "zh-Hant-TW",
  locale: "zh_TW",
  themeColor: "#0f766e"
};

export function resolveSiteConfig(env = process.env) {
  const publicBaseUrl = cleanUrl(env.PUBLIC_BASE_URL) || siteConfig.publicBaseUrl;
  const registerRedirectUrl =
    cleanUrl(env.REGISTER_REDIRECT_URL) || siteConfig.registerRedirectUrl;
  const contactEmail = cleanEmail(env.CONTACT_EMAIL) || siteConfig.contactEmail;

  return {
    ...siteConfig,
    publicBaseUrl,
    registerRedirectUrl,
    contactEmail
  };
}

function cleanUrl(value) {
  if (!value || typeof value !== "string") return "";
  const trimmed = value.trim();
  if (!trimmed) return "";
  try {
    return new URL(trimmed).toString();
  } catch {
    return "";
  }
}

function cleanEmail(value) {
  if (!value || typeof value !== "string") return "";
  const trimmed = value.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed) ? trimmed : "";
}
