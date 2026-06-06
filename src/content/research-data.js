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
    "明日賽事以追蹤卡直接呈現，重點放在時間、球場、人員、傷兵、整季表現與臨場狀態。超過更新間隔後，前端會重新讀取追蹤資料。",
  updateEverySeconds: 75,
  games: [
    {
      name: "MLB",
      scope: "美國職棒大聯盟",
      match: "明日全場次",
      time: "賽前滾動追蹤",
      venue: "球場、天氣、風向、溫度",
      personnel: "先發投手、打線、牛棚用量",
      injuries: "IL 名單、每日觀察名單",
      season: "勝敗、OPS、ERA、WHIP、近 10 場",
      live: "賽前 90 分鐘確認"
    },
    {
      name: "NPB",
      scope: "日本職棒",
      match: "明日全場次",
      time: "日間更新",
      venue: "球場、屋頂狀態、天候",
      personnel: "預告先發、登錄名單、牛棚狀態",
      injuries: "抹消、復歸、休養名單",
      season: "打擊率、OPS、防禦率、近期先發局數",
      live: "賽前名單確認"
    },
    {
      name: "KBO",
      scope: "韓國職棒",
      match: "明日全場次",
      time: "賽程日更新",
      venue: "球場、降雨、延賽風險",
      personnel: "先發投手、中心打線、後援輪替",
      injuries: "登錄異動、傷兵、休養",
      season: "團隊得分、先發局數、牛棚負荷",
      live: "賽前狀態確認"
    },
    {
      name: "CPBL",
      scope: "中華職棒",
      match: "明日全場次",
      time: "台灣時間更新",
      venue: "球場、天候、場地狀態",
      personnel: "先發投手、先發打線、登錄異動",
      injuries: "傷兵、休養、二軍調整",
      season: "團隊攻守、近況、主客場表現",
      live: "開賽前確認"
    },
    {
      name: "足球",
      scope: "主要聯賽與小型賽事",
      match: "明日賽事列表",
      time: "依時區排序",
      venue: "主客場、草皮、天候",
      personnel: "預計先發、輪換、停賽",
      injuries: "傷停、復出、禁賽",
      season: "xG、攻守效率、近 5 場",
      live: "賽前名單確認"
    },
    {
      name: "籃球",
      scope: "NBA、WNBA、國際與小型聯賽",
      match: "明日賽事列表",
      time: "開賽前更新",
      venue: "主客場、旅程、背靠背",
      personnel: "先發預估、輪替、上場時間",
      injuries: "出賽狀態、輪休、每日觀察",
      season: "pace、usage、效率值、近況",
      live: "賽前 injury report"
    },
    {
      name: "冰球",
      scope: "NHL 與其他冰球賽事",
      match: "明日賽事列表",
      time: "賽前滾動追蹤",
      venue: "主客場、旅程、連戰狀態",
      personnel: "先發守門員、攻防組合",
      injuries: "傷兵、每日觀察、復出",
      season: "得失球、PP/PK、守門員近況",
      live: "賽前守門員確認"
    },
    {
      name: "小型賽事",
      scope: "次級聯賽、盃賽與區域賽",
      match: "明日補充列表",
      time: "分批更新",
      venue: "場地、旅程、開賽時區",
      personnel: "公布名單、輪替、缺席",
      injuries: "傷停、賽前公告",
      season: "近期戰績、攻守表現、賽程密度",
      live: "開賽前二次確認"
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
      title: "追蹤更新",
      text: "超過更新間隔後重新讀取追蹤資料，時間、狀態與卡片內容會同步刷新。"
    },
    {
      title: "研究重點",
      text: "以球場、人員、傷兵、整季表現與即時狀態排序，不用單一指標判斷。"
    }
  ]
};
