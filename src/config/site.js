export const siteConfig = {
  siteName: "賽號研究所",
  siteDescription:
    "整理 539 開獎觀察、簡易碰數工具、百家樂指南、電子攻略與體育賽事追蹤的繁體中文研究入口。",
  publicBaseUrl: "https://dgsa8116-crypto.github.io/seo-sql/",
  registerRedirectUrl: "https://becgame88168.com/",
  ctaText: "前往註冊",
  seoTitle: "賽號研究所｜539 冷熱號、百家樂指南、電子攻略與賽事研究",
  seoDescription:
    "都市極簡風格的研究入口，提供 539 最新號碼、百家樂指南、電子遊戲 RTP 與波動觀察、賽事追蹤與責任娛樂提醒。",
  contactEmail: "support@example.com",
  responsibleNotice:
    "僅提供統計觀察、規則教育與學術研究討論，不保證任何結果或收益。請遵守所在地法律並量力而為。",
  ageNotice: "內容僅供達法定年齡的成年人閱讀。",
  regionalNotice:
    "各地法規與平台可用性不同，使用任何娛樂服務前請先確認所在地規範。",
  organizationName: "賽號研究所內容團隊",
  language: "zh-Hant-TW",
  locale: "zh_TW",
  themeColor: "#b91c1c"
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
