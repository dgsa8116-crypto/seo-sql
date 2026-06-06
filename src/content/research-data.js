export const lotto539Config = {
  sourceName: "樂透彩幸運發財網",
  sourceUrl: "https://www.pilio.idv.tw/lto539/list.asp",
  officialRuleUrl: "https://www.taiwanlottery.com/",
  rangeLabel: "01 到 39",
  pickLabel: "任選 5 個號碼",
  ruleNotes: [
    "今彩 539 每期自 01 到 39 中開出 5 個號碼，沒有特別號。",
    "一般對獎以選號與開獎號碼的相同數量判斷，實際獎項與派彩以台灣彩券公告為準。",
    "冷熱號只代表近期香港次數統計，不代表下一期更容易或更不容易開出。"
  ]
};

export const fallbackLotto539Draws = [
  { date: "2026-06-06", weekday: "六", numbers: [13, 27, 30, 37, 38] },
  { date: "2026-06-05", weekday: "五", numbers: [7, 21, 26, 27, 31] },
  { date: "2026-06-04", weekday: "四", numbers: [2, 8, 24, 29, 35] },
  { date: "2026-06-03", weekday: "三", numbers: [2, 8, 17, 25, 38] },
  { date: "2026-06-02", weekday: "二", numbers: [7, 12, 22, 26, 30] },
  { date: "2026-06-01", weekday: "一", numbers: [5, 14, 19, 20, 28] },
  { date: "2026-05-30", weekday: "六", numbers: [2, 3, 4, 13, 39] },
  { date: "2026-05-29", weekday: "五", numbers: [12, 15, 20, 34, 35] },
  { date: "2026-05-28", weekday: "四", numbers: [6, 9, 12, 19, 31] },
  { date: "2026-05-27", weekday: "三", numbers: [2, 3, 18, 19, 21] },
  { date: "2026-05-26", weekday: "二", numbers: [2, 7, 11, 14, 37] },
  { date: "2026-05-25", weekday: "一", numbers: [5, 6, 12, 36, 37] },
  { date: "2026-05-23", weekday: "六", numbers: [6, 15, 16, 24, 38] },
  { date: "2026-05-22", weekday: "五", numbers: [4, 8, 15, 16, 37] },
  { date: "2026-05-21", weekday: "四", numbers: [9, 25, 28, 34, 36] },
  { date: "2026-05-20", weekday: "三", numbers: [1, 20, 21, 23, 35] },
  { date: "2026-05-19", weekday: "二", numbers: [4, 6, 24, 31, 32] },
  { date: "2026-05-18", weekday: "一", numbers: [8, 15, 20, 32, 33] },
  { date: "2026-05-16", weekday: "六", numbers: [2, 11, 28, 32, 33] },
  { date: "2026-05-15", weekday: "五", numbers: [1, 13, 23, 25, 36] },
  { date: "2026-05-14", weekday: "四", numbers: [8, 18, 28, 35, 39] },
  { date: "2026-05-13", weekday: "三", numbers: [2, 6, 7, 9, 23] },
  { date: "2026-05-12", weekday: "二", numbers: [1, 4, 12, 22, 26] }
];

export const sportsResearchBoard = {
  intro:
    "體育賽事頁定位為學術研究討論：整理賽程、球場、名單、傷兵、整季表現與即時場況欄位；正式上線若要全量準確，必須串接穩定賽程與傷兵資料源。",
  leagues: [
    {
      name: "MLB",
      scope: "美國職棒大聯盟",
      sourcePlan: "MLB 官方賽程與 Stats API",
      requiredFields: "先發投手、牛棚用量、打線、球場、天氣、傷兵名單",
      status: "可 API 化"
    },
    {
      name: "NPB",
      scope: "日本職棒",
      sourcePlan: "NPB 官方賽程、球團公告、日媒傷兵資訊",
      requiredFields: "先發投手、登錄名單、球場、近期打擊與投手數據",
      status: "需來源整合"
    },
    {
      name: "KBO",
      scope: "韓國職棒",
      sourcePlan: "KBO 官方賽程、球團公告、韓媒傷兵資訊",
      requiredFields: "先發投手、打線預估、球場、近期戰績",
      status: "需來源整合"
    },
    {
      name: "CPBL",
      scope: "中華職棒",
      sourcePlan: "中職官方賽程、球團公告、球場天候資訊",
      requiredFields: "先發投手、登錄名單、球場、近況與傷兵",
      status: "需來源整合"
    },
    {
      name: "足球",
      scope: "歐洲、美洲、亞洲主要與小型賽事",
      sourcePlan: "各聯盟官方賽程、FIFA/UEFA/AFC 賽事資料、傷兵公告",
      requiredFields: "預計先發、賽地、賽程密度、傷停、近期 xG 與攻守數據",
      status: "需分聯盟串接"
    },
    {
      name: "籃球",
      scope: "NBA、WNBA、國際與小型聯賽",
      sourcePlan: "官方賽程、球隊 injury report、球員 tracking/stat feed",
      requiredFields: "出賽狀態、輪休、pace、usage、主客場與背靠背",
      status: "需 API 權限"
    },
    {
      name: "冰球",
      scope: "NHL 與其他冰球賽事",
      sourcePlan: "官方賽程、守門員資訊、傷兵與球隊公告",
      requiredFields: "先發守門員、special teams、傷兵、客場旅程",
      status: "需 API 權限"
    }
  ],
  factors: [
    {
      title: "球場與現場情況",
      text: "記錄場地、天候、風向、草皮或室內條件，避免只看隊名做判斷。"
    },
    {
      title: "上場人員與輪替",
      text: "整理先發、替補、投手或守門員資訊，標示是否已由官方確認。"
    },
    {
      title: "傷員狀態",
      text: "區分確定缺陣、賽前決定、限制上場與已復出，並保留來源時間。"
    },
    {
      title: "整季表現",
      text: "觀察長期數據、近況、主客場差異與對戰型態，不用單一場結果推論。"
    },
    {
      title: "資料完整度",
      text: "若賽程、名單或傷兵資料缺漏，頁面應顯示資料不足，而不是硬給推薦。"
    },
    {
      title: "研究結論分級",
      text: "用 A/B/C 或資料不足標示研究信心，不使用保證、穩賺、必勝等字眼。"
    }
  ],
  recommendationTemplate: [
    "比賽：聯盟 / 客隊 @ 主隊 / 開賽時間",
    "場地：球場、城市、天氣或室內條件",
    "人員：預計先發、輪替、傷兵、賽前確認時間",
    "數據：整季攻守、近 10 場、主客場、旅途與休息天數",
    "研究觀點：資料支持的討論重點與不確定因素",
    "聲明：僅供研究討論，不保證結果"
  ]
};
