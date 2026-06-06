export const pages = [
  {
    id: "home",
    route: "index.html",
    navTitle: "首頁",
    title: "賽號研究所｜539 冷熱號、碰數計算與賽事研究看板",
    description:
      "整合 539 最新開獎觀察、簡易碰數計算、體育賽事研究欄位與責任娛樂提醒的都市極簡資訊平台。",
    heroTitle: "539 與賽事資料，一眼看懂的研究入口",
    heroLead:
      "用乾淨的資訊架構整理最新 539 開獎、冷熱號、碰數工具與次日賽事研究欄位，內容只做統計觀察與學術討論，不保證任何結果。",
    eyebrow: "Urban Research Platform",
    imageAlt: "都市極簡資訊平台桌面示意，包含號碼研究、賽事資料與分析卡片",
    keywords: ["539 冷熱號", "539 碰數計算", "賽事研究"],
    modules: ["home-research-preview"],
    sections: [
      {
        title: "左側細項，快速切換主題",
        lead:
          "網站改為資訊平台式版面，桌面左側提供研究儀表板、539、賽事、百家樂規則與責任娛樂等細項入口。",
        body: [
          "首頁先把使用者最常找的功能集中呈現：最新號碼、冷熱號、算碰計算機、次日賽事研究欄位、FAQ 與註冊 CTA。",
          "所有 CTA 連結仍由單一設定檔管理，按鈕文字保持中性，不使用保證獲利、必勝、穩賺等高風險文案。"
        ],
        cards: [
          {
            title: "539 最新號碼",
            text: "顯示最近一期、近期開獎列表、冷熱號與常見配對觀察。",
            href: "lotto539/"
          },
          {
            title: "539 算碰計算機",
            text: "輸入 5 個號碼，立即和近期開獎比對碰 0 到碰 5。",
            href: "lotto539/calculator/"
          },
          {
            title: "賽事研究看板",
            text: "整理球場、上場人員、傷兵、整季表現與資料完整度欄位。",
            href: "sports/"
          }
        ]
      },
      {
        title: "示範頁也保留可擴充性",
        lead:
          "目前是快速示範版；539 會在建置時嘗試更新，賽事頁先提供全量資料源欄位與研究模板。",
        body: [
          "539 模組會先抓公開開獎頁，抓取失敗時使用備援資料，避免 GitHub Pages 部署因外部網站短暫失敗而中斷。",
          "體育賽事若要做到全聯盟、全場次、準確名單與傷兵狀態，需要串接官方賽程、傷兵、球員數據與天候資料源；示範頁會清楚標示資料狀態。"
        ],
        cards: [
          {
            title: "SEO 自動輸出",
            text: "建置時產生 sitemap、robots、SEO report 與關鍵字推薦檔。",
            href: "seo-report.md"
          },
          {
            title: "責任娛樂提醒",
            text: "站內每頁保留年齡、法規與不保證結果的提醒。",
            href: "responsible/"
          },
          {
            title: "FAQ 快速閱讀",
            text: "用 collapsible FAQ 呈現常見問題，手機閱讀不擁擠。",
            href: "faq/"
          }
        ]
      }
    ],
    faqs: [
      {
        question: "這個網站會保證 539 或賽事結果嗎？",
        answer:
          "不會。網站只提供統計觀察、規則教育與研究討論，不保證任何結果或收益。"
      },
      {
        question: "539 最新資料怎麼更新？",
        answer:
          "GitHub Pages 建置時會嘗試抓取公開開獎頁；若抓取失敗，會使用內建備援資料並標示資料狀態。"
      },
      {
        question: "註冊按鈕導向哪裡？",
        answer:
          "註冊 CTA 由 src/config/site.js 的 registerRedirectUrl 集中設定，目前導向 https://becgame88168.com/。"
      }
    ]
  },
  {
    id: "lotto539",
    route: "lotto539/index.html",
    navTitle: "539 冷熱號",
    title: "539 冷熱號｜最新開獎、近期號碼與統計觀察",
    description:
      "整理 539 最新一期號碼、近期開獎紀錄、熱門號、冷門號、常見配對與規則提醒，僅供統計研究參考。",
    heroTitle: "539 最新開獎與冷熱號觀察",
    heroLead:
      "把近期開獎整理成清楚卡片，讓使用者快速看到最新一期、熱門號、冷門號與近期配對，不把統計結果包裝成預測保證。",
    eyebrow: "539 Research",
    imageAlt: "539 號碼研究儀表板示意圖",
    keywords: ["539 最新開獎", "539 冷熱號", "今彩539 統計"],
    article: true,
    modules: ["lotto539-dashboard"],
    relatedIds: ["lotto539-calculator", "sports", "responsible"],
    sections: [
      {
        title: "怎麼看冷熱號",
        body: [
          "熱門號代表在觀察期間內出現次數較多，冷門號代表出現次數較少或較久未出現。這些數字只描述過去資料，不代表下一期機率會改變。",
          "示範頁以最近多期資料建立頻率表，並保留來源與更新狀態，方便後續改成 API 或排程更新。"
        ]
      },
      {
        title: "539 規則簡述",
        body: [
          "今彩 539 從 01 到 39 中開出 5 個號碼，沒有特別號。選號與開獎號碼相同的數量越多，對應的獎項越高；實際派彩與獎項以台灣彩券公告為準。",
          "任何號碼組合都不應被說成保證命中。本站只呈現資料整理、碰數比對與風險提醒。"
        ]
      }
    ],
    faqs: [
      {
        question: "冷號是不是比較快開？",
        answer:
          "不能這樣解讀。冷號只表示近期較少出現，不代表下一期一定更容易開出。"
      },
      {
        question: "熱門號能拿來預測嗎？",
        answer:
          "熱門號只反映過去資料。它可以作為觀察素材，但不能被當作保證預測。"
      }
    ]
  },
  {
    id: "lotto539-calculator",
    route: "lotto539/calculator/index.html",
    navTitle: "539 算碰",
    title: "539 算碰計算機｜輸入 5 個號碼立即比對近期開獎",
    description:
      "簡單易懂的 539 算碰工具，輸入 5 個 01 到 39 的號碼，即可比對最近開獎紀錄與碰數分布。",
    heroTitle: "539 算碰計算機",
    heroLead:
      "輸入 5 個號碼，系統會直接比對近期開獎紀錄，顯示每期碰幾個、最高碰數與分布，手機上也能快速使用。",
    eyebrow: "Simple Calculator",
    imageAlt: "539 算碰計算機介面示意圖",
    keywords: ["539 算碰", "539 對獎", "539 碰數計算"],
    article: true,
    modules: ["lotto539-calculator"],
    relatedIds: ["lotto539", "faq", "responsible"],
    sections: [
      {
        title: "使用方式",
        body: [
          "輸入 5 個不重複號碼，可以用空格、逗號或頓號分隔。例如 02 08 13 27 38。",
          "計算結果會列出最近每一期碰到的號碼與碰數，讓使用者一眼看懂，不需要理解複雜公式。"
        ]
      },
      {
        title: "碰數怎麼判斷",
        body: [
          "碰數就是你輸入的號碼與該期開獎號碼相同的數量。碰 0 代表沒有相同號碼，碰 5 代表 5 個號碼都相同。",
          "工具只做比對，不代表推薦選號，也不代表後續結果。"
        ]
      }
    ],
    faqs: [
      {
        question: "可以輸入超過 5 個號碼嗎？",
        answer:
          "這個簡化工具固定使用 5 個號碼，方便與 539 一般選號情境比對。"
      },
      {
        question: "計算結果會自動對未來開獎嗎？",
        answer:
          "目前是示範頁，會比對建置時整理的近期資料；正式版可串接每日資料更新。"
      }
    ]
  },
  {
    id: "sports",
    route: "sports/index.html",
    navTitle: "賽事研究",
    title: "體育賽事研究看板｜次日賽程、球場、人員與傷兵欄位",
    description:
      "以學術研究討論角度規劃次日體育賽事看板，包含 MLB、NPB、KBO、CPBL、足球、籃球與冰球的資料源欄位。",
    heroTitle: "次日賽事研究，不做誇大推薦",
    heroLead:
      "賽事分析需要賽程、球場、上場人員、傷兵、整季表現與即時現場資訊。示範頁先完成欄位與資料源架構，正式版再串接 API 取得全量資料。",
    eyebrow: "Sports Research",
    imageAlt: "體育賽事研究看板示意圖，包含賽程、球場與球員狀態卡片",
    keywords: ["次日賽事分析", "體育賽事研究", "球員傷兵狀態"],
    article: true,
    modules: ["sports-research"],
    relatedIds: ["lotto539", "responsible", "faq"],
    sections: [
      {
        title: "為什麼不能只放假資料",
        body: [
          "使用者要求的全量賽事包含韓棒、日棒、台棒、美棒、足球、冰球、籃球與小型賽事。這需要官方賽程、傷兵、名單、球員數據與天候來源共同支撐。",
          "示範頁不假裝已經掌握全世界所有次日賽事；頁面會先呈現正式版需要的欄位、資料源與資料完整度標示。"
        ]
      },
      {
        title: "研究推薦的合規寫法",
        body: [
          "賽事討論可以呈現資料觀點，例如球場條件、休息天數、先發狀態與整季表現；不應使用保證、穩賺、必勝等誤導字眼。",
          "若資料不足，正確做法是標示資料不足，而不是硬產生推薦。"
        ]
      }
    ],
    faqs: [
      {
        question: "正式版可以做到全部賽事準確嗎？",
        answer:
          "可以往這個方向設計，但需要串接穩定資料源或付費 API，並建立每日排程、資料校驗與缺漏標示。"
      },
      {
        question: "這裡的賽事研究是投注建議嗎？",
        answer:
          "不是。頁面定位是學術研究討論與資料欄位展示，不保證任何結果。"
      }
    ]
  },
  {
    id: "rules",
    route: "rules/index.html",
    navTitle: "百家樂規則",
    title: "百家樂規則｜牌值、莊閒和與補牌流程",
    description:
      "用中性語氣整理百家樂牌值、莊閒和判定、補牌流程與常見誤解，搭配責任娛樂提醒。",
    heroTitle: "百家樂規則快速理解",
    heroLead:
      "從牌值、自然牌、莊閒和到第三張牌規則，建立基本理解，不把規則說明包裝成勝負保證。",
    eyebrow: "Baccarat Rules",
    imageAlt: "百家樂規則筆記與牌面示意圖",
    keywords: ["百家樂規則", "百家樂牌值計算", "百家樂第三張牌規則"],
    article: true,
    relatedIds: ["beginner", "betting", "responsible"],
    sections: [
      {
        title: "牌值怎麼算",
        body: [
          "A 算 1 點，2 到 9 依牌面計算，10、J、Q、K 算 0 點。總點數只看個位數，例如 15 點視為 5 點。",
          "玩家不需要自行決定是否補牌，補牌流程由固定規則處理。"
        ]
      },
      {
        title: "莊、閒、和",
        body: [
          "百家樂主要比較莊家與閒家的點數，接近 9 點者勝出，點數相同則為和局。",
          "任何單一局結果都具有不確定性，短期連續結果不應被解讀成必然趨勢。"
        ]
      }
    ],
    faqs: [
      {
        question: "百家樂需要技巧操作嗎？",
        answer:
          "一般規則下玩家主要是在理解流程與風險，不能把短期結果誤認成可控制的技巧。"
      }
    ]
  },
  {
    id: "betting",
    route: "betting/index.html",
    navTitle: "流程說明",
    title: "百家樂流程說明｜常見選項與風險提醒",
    description:
      "說明百家樂常見流程、選項與風險提醒，避免鼓勵加碼或誇大結果。",
    heroTitle: "看懂流程，再談娛樂風險",
    heroLead:
      "以教育角度整理常見流程與術語，讓新手知道每一步在做什麼，同時保留量力而為的提醒。",
    eyebrow: "Flow Guide",
    imageAlt: "流程卡片與風險提醒示意圖",
    keywords: ["百家樂下注流程", "莊閒和說明", "責任娛樂"],
    article: true,
    relatedIds: ["rules", "beginner", "responsible"],
    sections: [
      {
        title: "先理解選項",
        body: [
          "常見選項包含莊、閒、和與部分附加選項。不同選項規則不同，風險也不同。",
          "本站只做流程說明，不鼓勵追注、加碼或把任何選項描述成固定優勢。"
        ]
      },
      {
        title: "設定界線",
        body: [
          "娛樂前應先設定時間與預算，達到界線後停止，不因短期輸贏調整原本界線。",
          "若所在地不允許相關娛樂服務，應遵守當地規範。"
        ]
      }
    ],
    faqs: [
      {
        question: "流程頁會提供獲利建議嗎？",
        answer:
          "不會。流程頁只說明規則、名詞與風險。"
      }
    ]
  },
  {
    id: "beginner",
    route: "beginner/index.html",
    navTitle: "新手指南",
    title: "新手指南｜先建立風險觀念再閱讀規則",
    description:
      "給新手的規則閱讀順序、常見誤解與責任娛樂提醒。",
    heroTitle: "新手先看這裡",
    heroLead:
      "用簡短順序建立基本觀念：先懂規則，再懂風險，不把偶然結果當作方法。",
    eyebrow: "Beginner Guide",
    imageAlt: "新手指南清單與規則筆記示意圖",
    keywords: ["百家樂新手教學", "百家樂入門指南", "責任娛樂"],
    article: true,
    relatedIds: ["rules", "faq", "responsible"],
    sections: [
      {
        title: "閱讀順序",
        body: [
          "先看牌值與莊閒和，再看補牌流程，最後閱讀常見問題與責任娛樂提醒。",
          "不要先找所謂捷徑。娛樂結果存在隨機性，任何保證說法都應保持警覺。"
        ]
      },
      {
        title: "常見誤解",
        body: [
          "連續出現某個結果不代表下一局必然反向，也不代表同向會持續。",
          "把短期樣本當成規律，容易造成錯誤期待。"
        ]
      }
    ],
    faqs: [
      {
        question: "新手最該先懂什麼？",
        answer:
          "先懂規則、點數與風險界線，再閱讀其他內容。"
      }
    ]
  },
  {
    id: "terminology",
    route: "terminology/index.html",
    navTitle: "術語",
    title: "百家樂術語｜常見名詞與中性說明",
    description:
      "整理百家樂常見術語，包含莊、閒、和、自然牌、補牌與風險相關用語。",
    heroTitle: "常見術語速查",
    heroLead:
      "把常見名詞整理成容易閱讀的說明，避免讓新手因名詞混淆而誤解風險。",
    eyebrow: "Terminology",
    imageAlt: "術語索引與說明卡片示意圖",
    keywords: ["百家樂術語", "莊閒和說明", "百家樂常見名詞"],
    article: true,
    relatedIds: ["rules", "beginner", "faq"],
    sections: [
      {
        title: "規則名詞",
        body: [
          "自然牌通常指前兩張牌達到 8 或 9 點的情況。補牌則是依固定規則處理第三張牌。",
          "莊、閒只是遊戲位置名稱，不代表使用者一定站在某一方。"
        ]
      },
      {
        title: "風險名詞",
        body: [
          "娛樂支出、預算界線、停止條件與法定年齡，是閱讀任何相關內容時都需要同時理解的名詞。",
          "資訊平台應把這些提醒放在明顯位置，而不是藏在頁尾。"
        ]
      }
    ],
    faqs: [
      {
        question: "術語頁適合新手看嗎？",
        answer:
          "適合。它用中性說明整理名詞，方便回到規則頁理解流程。"
      }
    ]
  },
  {
    id: "responsible",
    route: "responsible/index.html",
    navTitle: "責任提醒",
    title: "責任娛樂提醒｜年齡、法規、預算與停止界線",
    description:
      "整理責任娛樂原則，包含法定年齡、所在地法規、預算界線、不保證結果與求助提醒。",
    heroTitle: "責任娛樂與研究聲明",
    heroLead:
      "所有內容都應先以合法、成年、量力而為與不保證結果為前提。",
    eyebrow: "Responsible Notice",
    imageAlt: "責任娛樂提醒與資訊卡片示意圖",
    keywords: ["責任娛樂", "娛樂風險提醒", "法定年齡提醒"],
    article: true,
    relatedIds: ["home", "faq", "terms"],
    sections: [
      {
        title: "基本原則",
        body: [
          "未達法定年齡者不應使用相關娛樂服務。不同地區法規不同，使用前應自行確認所在地規範。",
          "本網站不保證任何結果或收益，所有統計、規則與賽事內容都只供研究與教育參考。"
        ]
      },
      {
        title: "預算與停止界線",
        body: [
          "任何娛樂支出都應事前設定上限，且不因短期結果改變上限。",
          "若娛樂行為造成壓力、借貸或生活影響，應停止並尋求專業協助。"
        ]
      }
    ],
    faqs: [
      {
        question: "網站內容是收益承諾嗎？",
        answer:
          "不是。網站只提供資訊整理與研究討論。"
      }
    ]
  },
  {
    id: "faq",
    route: "faq/index.html",
    navTitle: "FAQ",
    title: "FAQ｜539、賽事研究、CTA 與責任娛樂常見問題",
    description:
      "回答 539 冷熱號、碰數計算、賽事研究欄位、註冊 CTA 與責任娛樂的常見問題。",
    heroTitle: "常見問題快速查",
    heroLead:
      "把使用者最容易疑惑的 539、賽事資料、CTA 與合規問題整理成可展開閱讀的 FAQ。",
    eyebrow: "FAQ",
    imageAlt: "FAQ 問答卡片示意圖",
    keywords: ["539 FAQ", "賽事研究 FAQ", "責任娛樂"],
    relatedIds: ["lotto539", "sports", "responsible"],
    sections: [
      {
        title: "FAQ 重點",
        body: [
          "FAQ 使用可展開區塊呈現，讓手機閱讀保持乾淨，不用一次塞滿長段文字。",
          "每一個回答都避免保證語氣，並保留資料來源與資料不足時的說明。"
        ]
      }
    ],
    faqs: [
      {
        question: "539 冷熱號是不是推薦號碼？",
        answer:
          "不是。冷熱號只描述近期出現頻率，不能代表下一期結果。"
      },
      {
        question: "賽事頁為什麼沒有硬列所有比賽？",
        answer:
          "因為全量準確需要正式資料源。示範頁先完成欄位與架構，避免用假資料誤導使用者。"
      },
      {
        question: "註冊按鈕可以改嗎？",
        answer:
          "可以。修改 src/config/site.js 的 registerRedirectUrl，或在 GitHub Actions 設定 REGISTER_REDIRECT_URL repository variable。"
      }
    ]
  },
  {
    id: "about",
    route: "about/index.html",
    navTitle: "關於",
    title: "關於賽號研究所｜都市極簡研究型資訊平台",
    description:
      "說明賽號研究所的內容定位、資料更新方式、SEO 自動化與責任娛樂立場。",
    heroTitle: "關於賽號研究所",
    heroLead:
      "我們把前導頁改成研究型資訊平台，讓使用者先看到清楚資料、規則與風險提醒。",
    eyebrow: "About",
    imageAlt: "研究平台品牌與內容架構示意圖",
    keywords: ["賽號研究所", "SEO 前導網站", "責任娛樂"],
    sections: [
      {
        title: "內容定位",
        body: [
          "本站整合 539、賽事研究與規則教育內容，適合部署到 GitHub Pages 作為示範型前導網站。",
          "頁面設計採都市極簡風格，重視可讀性、響應式體驗與清楚的 CTA 管理。"
        ]
      },
      {
        title: "資料與限制",
        body: [
          "539 會嘗試在 build 時更新；賽事全量準確需要正式資料源。資料不足時，頁面應清楚標示。",
          "網站不提供保證結果、收益承諾或規避法規的內容。"
        ]
      }
    ]
  },
  {
    id: "contact",
    route: "contact/index.html",
    navTitle: "聯絡",
    title: "聯絡我們｜內容修正、資料源與合作討論",
    description:
      "提供內容修正、資料源串接、SEO 更新與合作聯絡方式。",
    heroTitle: "聯絡與資料源討論",
    heroLead:
      "若需要串接正式賽程 API、傷兵資料、539 自動資料源或調整 CTA，可由此頁確認聯絡方式。",
    eyebrow: "Contact",
    imageAlt: "聯絡資訊與資料源串接示意圖",
    keywords: ["資料源串接", "SEO 更新", "內容修正"],
    sections: [
      {
        title: "聯絡方向",
        body: [
          "可討論內容修正、資料源接入、SEO 報告、GitHub Pages 部署與註冊 CTA 設定。",
          "請勿提供未授權資料、誤導性收益文案或違反所在地法規的內容需求。"
        ]
      }
    ]
  },
  {
    id: "terms",
    route: "terms/index.html",
    navTitle: "條款",
    title: "服務條款｜資訊用途、外部連結與責任限制",
    description:
      "賽號研究所服務條款，包含資訊用途、外部連結、責任限制、法規遵循與禁止使用方式。",
    heroTitle: "服務條款",
    heroLead:
      "使用本站代表理解內容僅供資訊、教育與研究討論，外部連結服務由各服務方自行負責。",
    eyebrow: "Terms",
    imageAlt: "服務條款文件與責任聲明示意圖",
    keywords: ["服務條款", "責任限制", "外部連結"],
    sections: [
      {
        title: "資訊用途",
        body: [
          "本站內容僅供一般資訊、規則教育與研究討論，不構成任何收益承諾或個別建議。",
          "外部連結可能導向第三方服務，使用前應自行確認法規、年齡與平台條款。"
        ]
      },
      {
        title: "禁止使用",
        body: [
          "不得將本站內容改寫成保證結果、誘導未成年人、規避法規或誤導性宣傳。",
          "不得利用本站資料進行未授權爬取、轉售或侵犯第三方權利的行為。"
        ]
      }
    ]
  },
  {
    id: "privacy",
    route: "privacy/index.html",
    navTitle: "隱私",
    title: "隱私政策｜靜態網站資料處理與外部連結說明",
    description:
      "說明賽號研究所作為 GitHub Pages 靜態網站的資料處理方式、外部連結與聯絡資訊。",
    heroTitle: "隱私政策",
    heroLead:
      "本站為靜態頁面，主要提供公開資訊展示；外部 CTA 服務的資料處理由該服務方負責。",
    eyebrow: "Privacy",
    imageAlt: "隱私政策與靜態網站資料流程示意圖",
    keywords: ["隱私政策", "GitHub Pages", "外部連結"],
    sections: [
      {
        title: "資料處理",
        body: [
          "本站本身不要求使用者建立帳號，也不在前端儲存敏感個資。",
          "GitHub Pages、瀏覽器或外部服務可能依其自身政策處理基本存取資料。"
        ]
      },
      {
        title: "外部 CTA",
        body: [
          "註冊 CTA 會導向第三方網站；進入後的資料處理、條款與責任由第三方服務方負責。",
          "使用外部服務前，請自行確認所在地法規與平台規範。"
        ]
      }
    ]
  }
];
