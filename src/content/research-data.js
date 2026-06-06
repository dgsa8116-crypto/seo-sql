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
    "次日賽事以追蹤卡直接呈現。2026/06/08 已確認賽程會列出對戰、時間與研究重點；未排定的聯盟會明確標示休兵與下一輪追蹤點。",
  updateEverySeconds: 75,
  games: [
    {
      name: "MLB",
      scope: "美國職棒大聯盟",
      status: "已排定",
      match: "8 場：2026/06/08 美東賽程",
      time: "美東 18:35 起；台灣 06/09 06:35 起",
      venue: "8 個主隊場館；室外球場需賽前確認天氣、風向與溫度",
      personnel: "先發投手、打線與牛棚連用需以賽前公告二次確認",
      injuries: "IL 名單與每日觀察名單賽前重查",
      season: "先看先發局數、團隊 OPS、ERA、WHIP、近 10 場與牛棚負荷",
      live: "開賽前 90 分鐘確認天候、打線、先發投手與牛棚用量",
      sourceNote: "賽程依 MLB.com 2026/06/08 公開賽程整理。",
      events: [
        {
          time: "06/08 18:35 ET｜台灣 06/09 06:35",
          matchup: "Seattle Mariners @ Baltimore Orioles",
          venue: "Oriole Park at Camden Yards",
          personnel: "先發投手、打線與捕手搭配需賽前確認。",
          injuries: "查看 IL 與每日觀察名單，不用舊名單判斷。",
          season: "比較兩隊近 10 場攻擊效率、牛棚連投與先發投手局數。",
          live: "室外球場，賽前確認風向與溫度。"
        },
        {
          time: "06/08 18:40 ET｜台灣 06/09 06:40",
          matchup: "Boston Red Sox @ Tampa Bay Rays",
          venue: "Tampa Bay 主場",
          personnel: "打線左右打配置與先發投手型態是主要觀察點。",
          injuries: "每日觀察名單與牛棚可用性需賽前更新。",
          season: "比較上壘率、長打率、先發投手 WHIP 與近期牛棚負荷。",
          live: "主場環境與屋頂/場地狀態以官方資訊為準。"
        },
        {
          time: "06/08 18:40 ET｜台灣 06/09 06:40",
          matchup: "New York Yankees @ Cleveland Guardians",
          venue: "Progressive Field",
          personnel: "先發投手對中心打線與後段牛棚安排要分開看。",
          injuries: "長期 IL 與每日觀察球員會影響守備與代打深度。",
          season: "比較團隊 OPS、三振率、ERA、WHIP 與近況。",
          live: "克里夫蘭室外場，溫度與風向會影響飛球判讀。"
        },
        {
          time: "06/08 19:07 ET｜台灣 06/09 07:07",
          matchup: "Philadelphia Phillies @ Toronto Blue Jays",
          venue: "Rogers Centre",
          personnel: "先發投手與左右打輪值會影響前半場節奏。",
          injuries: "賽前看捕手、內野與牛棚可用名單。",
          season: "比較主客場攻擊效率、長打率與先發投手近期局數。",
          live: "多倫多場館環境較穩定，重點放在打線與投手名單。"
        },
        {
          time: "06/08 21:38 ET｜台灣 06/09 09:38",
          matchup: "Houston Astros @ Los Angeles Angels",
          venue: "Angel Stadium",
          personnel: "客隊旅行與主隊打線完整度需賽前確認。",
          injuries: "每日觀察名單、休養與牛棚連用是風險點。",
          season: "比較先發投手局數、團隊長打率與牛棚近 3 日使用量。",
          live: "晚場室外環境，確認風向與溫度變化。"
        },
        {
          time: "06/08 21:40 ET｜台灣 06/09 09:40",
          matchup: "Cincinnati Reds @ San Diego Padres",
          venue: "Petco Park",
          personnel: "先發投手控球、捕手搭配與牛棚順位要同步看。",
          injuries: "確認主力野手是否休養或限制出賽。",
          season: "比較兩隊近期得分、盜壘企圖與先發投手 WHIP。",
          live: "Petco Park 夜場需看海風、溫度與打線公布。"
        },
        {
          time: "06/08 21:45 ET｜台灣 06/09 09:45",
          matchup: "Washington Nationals @ San Francisco Giants",
          venue: "Oracle Park",
          personnel: "外野守備、左投右投對位與牛棚可用性是重點。",
          injuries: "賽前看每日觀察名單與主力輪休。",
          season: "比較主客場 OPS、先發投手 ERA/WHIP 與守備失誤。",
          live: "海灣球場風向明顯，開賽前需確認現場風速。"
        },
        {
          time: "06/08 22:05 ET｜台灣 06/09 10:05",
          matchup: "Milwaukee Brewers @ Athletics",
          venue: "Athletics 主場",
          personnel: "先發投手與後援投手連用狀態需賽前查核。",
          injuries: "觀察主力打者是否休養、是否有臨時傷停。",
          season: "比較客隊旅行、團隊 OPS、ERA 與牛棚負荷。",
          live: "晚場需確認主場氣溫、風向與打線。"
        }
      ]
    },
    {
      name: "NPB",
      scope: "日本職棒",
      status: "預備日",
      match: "1 場預備日：DeNA vs 福岡軟銀",
      time: "2026/06/08 18:00 日本時間；台灣 17:00",
      venue: "橫濱；預備日是否啟用需賽前確認",
      personnel: "預告先發、登錄名單、牛棚狀態需以 NPB 或球團公告為準",
      injuries: "抹消、復歸、休養與登錄異動需賽前確認",
      season: "打擊率、OPS、防禦率、近期先發局數與交流戰近況",
      live: "預備日場次若未啟用，卡片會保留狀態提醒",
      sourceNote: "賽程依 NPB 2026/06/08 公開賽程整理。",
      events: [
        {
          time: "06/08 18:00 JST｜台灣 17:00",
          matchup: "福岡軟銀 Hawks @ DeNA BayStars（預備日）",
          venue: "橫濱",
          personnel: "預告先發與登錄名單需賽前確認。",
          injuries: "抹消、復歸與主力休養名單會影響打線深度。",
          season: "比較交流戰近況、先發投手局數與牛棚連投。",
          live: "先確認預備日是否啟用，再更新投手與打線。"
        }
      ]
    },
    {
      name: "KBO",
      scope: "韓國職棒",
      status: "06/08 休兵",
      match: "2026/06/08 無排定例行賽",
      time: "下一輪 06/09 18:30 KST；台灣 17:30",
      venue: "06/09 場地包含大田、高尺、社稷、蠶室、水原",
      personnel: "06/09 先發投手與登錄異動需當日確認",
      injuries: "傷兵、休養與外援登錄狀態需賽前更新",
      season: "團隊得分、先發局數、牛棚負荷與近況",
      live: "06/08 無賽事；下一輪賽前更新五場資訊",
      sourceNote: "KBO 06/08 未排定；下一輪依 MyKBO Stats 06/09 公開賽程整理。",
      events: [
        {
          time: "下一輪 06/09 18:30 KST｜台灣 17:30",
          matchup: "Kia Tigers @ Hanwha Eagles",
          venue: "Daejeon",
          personnel: "06/09 先發投手與中心打線確認。",
          injuries: "登錄異動與休養名單賽前更新。",
          season: "比較得分效率、先發局數與牛棚負荷。",
          live: "06/08 休兵，06/09 賽前二次確認。"
        },
        {
          time: "下一輪 06/09 18:30 KST｜台灣 17:30",
          matchup: "NC Dinos @ Kiwoom Heroes",
          venue: "Seoul-Gocheok",
          personnel: "高尺室內場，重點看先發投手與打線。",
          injuries: "登錄異動與替補輪換需確認。",
          season: "比較近況、牛棚連用與團隊上壘率。",
          live: "室內場降低天候變數。"
        },
        {
          time: "下一輪 06/09 18:30 KST｜台灣 17:30",
          matchup: "Doosan Bears @ Lotte Giants",
          venue: "Busan-Sajik",
          personnel: "先發投手、捕手與牛棚順位是重點。",
          injuries: "主力傷停與休養名單需賽前確認。",
          season: "比較先發投手局數、團隊得分與主客場表現。",
          live: "釜山場地與天候賽前確認。"
        },
        {
          time: "下一輪 06/09 18:30 KST｜台灣 17:30",
          matchup: "SSG Landers @ LG Twins",
          venue: "Seoul-Jamsil",
          personnel: "中心打線與牛棚可用性需確認。",
          injuries: "登錄異動、休養與外援狀態賽前更新。",
          season: "比較蠶室場地特性、得分效率與投手近況。",
          live: "蠶室室外場，降雨與風向需確認。"
        },
        {
          time: "下一輪 06/09 18:30 KST｜台灣 17:30",
          matchup: "Samsung Lions @ KT Wiz",
          venue: "Suwon",
          personnel: "先發投手與後援輪替需要當日確認。",
          injuries: "傷兵、休養與登錄變動賽前重查。",
          season: "比較團隊得分、牛棚負荷與近 5 場內容。",
          live: "水原場地與天候賽前確認。"
        }
      ]
    },
    {
      name: "CPBL",
      scope: "中華職棒",
      status: "06/08 休兵",
      match: "2026/06/08 無排定例行賽",
      time: "下一輪 06/09 18:35 台灣時間",
      venue: "06/09 新莊、洲際",
      personnel: "先發投手、先發打線與登錄異動需賽前確認",
      injuries: "傷兵、休養、二軍調整與登錄異動",
      season: "團隊攻守、近況、主客場表現與牛棚使用",
      live: "06/08 無賽事；06/09 賽前確認先發與天候",
      sourceNote: "CPBL 06/08 未排定；下一輪依 2026 中職公開賽程整理。",
      events: [
        {
          time: "下一輪 06/09 18:35 台灣時間",
          matchup: "味全龍 @ 富邦悍將",
          venue: "新莊",
          personnel: "先發投手、先發打線與捕手搭配需確認。",
          injuries: "傷兵、休養與二軍調整會影響先發名單。",
          season: "比較主客場攻守、牛棚連用與近期得分。",
          live: "新莊天候與場地狀態賽前確認。"
        },
        {
          time: "下一輪 06/09 18:35 台灣時間",
          matchup: "台鋼雄鷹 @ 中信兄弟",
          venue: "洲際",
          personnel: "先發投手、中心打線與後援安排需賽前確認。",
          injuries: "主力休養、傷兵與登錄異動賽前更新。",
          season: "比較近況、主場表現與牛棚用量。",
          live: "洲際天候、風向與場地狀態需確認。"
        }
      ]
    },
    {
      name: "足球",
      scope: "FIFA 世界盃與主要賽事",
      status: "開幕前",
      match: "2026/06/08 無世界盃正賽；06/11 開幕",
      time: "世界盃 06/11 起；台灣需依時區換算",
      venue: "開幕後依主辦城市、草皮、氣候與旅程追蹤",
      personnel: "國家隊名單、停賽、傷停與輪換需賽前確認",
      injuries: "傷停、復出、禁賽與體能狀態",
      season: "國家隊近況、xG、攻守效率、定位球與旅行距離",
      live: "06/08 為開幕前觀察；06/11 後改列逐場卡片",
      sourceNote: "世界盃公開賽程顯示正賽自 06/11 起。",
      events: [
        {
          time: "06/08 狀態",
          matchup: "FIFA World Cup 開幕前觀察",
          venue: "主辦城市與球場自 06/11 起逐場追蹤",
          personnel: "國家隊傷停與最終名單是主要觀察點。",
          injuries: "傷停、停賽與體能負荷賽前更新。",
          season: "比較近期國家隊表現、xG、定位球與防線穩定度。",
          live: "06/11 開幕後再列對戰、場館與先發。"
        }
      ]
    },
    {
      name: "籃球",
      scope: "NBA、WNBA、國際與小型聯賽",
      status: "NBA 已排定",
      match: "NBA Finals Game 3：Spurs @ Knicks",
      time: "06/08 20:30 ET；台灣 06/09 08:30",
      venue: "Madison Square Garden；主客場、旅程與休息日需同步看",
      personnel: "先發預估、輪替、上場時間與犯規風險",
      injuries: "出賽狀態、輪休、每日觀察與賽前報告",
      season: "pace、usage、效率值、系列賽對位與近況",
      live: "賽前 injury report 與先發名單確認",
      sourceNote: "NBA Finals Game 3 依 NBA.com 公開賽程整理；WNBA 場次只採用官方可確認資料。",
      events: [
        {
          time: "06/08 20:30 ET｜台灣 06/09 08:30",
          matchup: "San Antonio Spurs @ New York Knicks｜NBA Finals Game 3",
          venue: "Madison Square Garden",
          personnel: "先發、主要輪替與第四節使用率是研究重點。",
          injuries: "賽前 injury report 會影響輪替與防守對位。",
          season: "Knicks 系列賽 2-0 領先；比較 pace、usage、失誤率與籃板。",
          live: "開賽前確認先發五人、傷兵與臨場節奏。"
        }
      ]
    },
    {
      name: "冰球",
      scope: "NHL 與其他冰球賽事",
      status: "06/08 休兵",
      match: "Stanley Cup Final 下一場 06/09",
      time: "Game 4：06/09 20:00 ET；台灣 06/10 08:00",
      venue: "Vegas 主場；旅程、連戰狀態與主場對位需追蹤",
      personnel: "先發守門員、攻防組合與特別組",
      injuries: "傷兵、每日觀察、復出與受限上場",
      season: "得失球、PP/PK、守門員近況與系列賽調整",
      live: "06/08 無賽事；06/09 賽前確認守門員與傷兵",
      sourceNote: "NHL 公開賽程顯示 Game 4 為 06/09 Carolina at Vegas。",
      events: [
        {
          time: "下一場 06/09 20:00 ET｜台灣 06/10 08:00",
          matchup: "Carolina Hurricanes @ Vegas Golden Knights｜Stanley Cup Final Game 4",
          venue: "Vegas 主場",
          personnel: "先發守門員、攻防組合與 PP/PK 是核心觀察點。",
          injuries: "每日觀察與受限上場球員會影響輪替深度。",
          season: "系列賽 1-1 後進入 Vegas 主場段，需看守門員近況。",
          live: "賽前確認守門員、傷兵與特別組配置。"
        }
      ]
    },
    {
      name: "小型賽事",
      scope: "次級聯賽、盃賽與區域賽",
      status: "補充追蹤",
      match: "06/08 補充賽事以公開賽程與名單為準",
      time: "分批更新；先列可確認賽事，不用不明來源硬補",
      venue: "場地、旅程、開賽時區與天候",
      personnel: "公布名單、輪替、缺席與臨時改期",
      injuries: "傷停、賽前公告與名單異動",
      season: "近期戰績、攻守表現、賽程密度與旅程",
      live: "資料不足時標示待確認，不產生假對戰",
      sourceNote: "補充賽事需要公開賽程與名單同時確認。",
      events: [
        {
          time: "06/08 補充狀態",
          matchup: "小型賽事待公開賽程確認",
          venue: "需確認場地與時區",
          personnel: "只採用可確認名單與官方賽程。",
          injuries: "未確認傷停不寫成既定狀態。",
          season: "先看賽程密度、主客場與近期攻守表現。",
          live: "若資料不足，卡片保留待確認。"
        }
      ]
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
