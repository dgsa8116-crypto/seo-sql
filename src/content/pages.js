export const pages = [
  {
    id: "home",
    route: "index.html",
    navTitle: "首頁",
    title: "前導頁｜百家樂規則、玩法流程與責任娛樂指南",
    description:
      "用清楚、克制且合規的方式整理百家樂規則、下注流程、新手觀念、常見術語、FAQ 與責任娛樂提醒。",
    heroTitle: "百家樂規則與責任娛樂入門",
    heroLead:
      "從牌值計算、莊閒和、補牌規則到常見問題，建立理解遊戲流程所需的基本概念，不承諾勝率、不誇大收益。",
    eyebrow: "教育導向前導頁",
    image: "assets/images/baccarat-guide-hero.png",
    imageAlt: "百家樂規則教學桌面示意圖，包含牌面、籌碼與規則筆記",
    keywords: ["百家樂規則", "百家樂新手教學", "責任娛樂"],
    sections: [
      {
        title: "以資訊為主的娛樂入口",
        lead:
          "這個網站的內容定位是規則說明、入門教育與風險提醒，而不是暗示保證獲利的推廣頁。",
        body: [
          "百家樂的流程看似簡單，但新手常會混淆牌值、補牌、莊閒和與不同投注選項。首頁先整理最常查詢的主題，讓使用者能快速進入對應指南。",
          "每個頁面都維持清楚的責任娛樂提醒：結果具有不確定性，任何娛樂支出都應事先設定預算，並遵守所在地法律與年齡限制。"
        ],
        cards: [
          {
            title: "規則指南",
            text: "理解牌值計算、莊閒和判定與第三張牌規則。",
            href: "rules/"
          },
          {
            title: "下注流程",
            text: "用中性語氣說明常見選項、流程與風險提醒。",
            href: "betting/"
          },
          {
            title: "新手觀念",
            text: "避免把短期結果誤認成技巧，建立合理預期。",
            href: "beginner/"
          }
        ]
      },
      {
        title: "重點功能",
        lead: "內容、SEO 與合規提醒都集中管理，適合直接部署到 GitHub Pages。",
        body: [
          "站內頁面包含首頁、規則、下注流程、新手指南、術語、責任娛樂、FAQ、關於、聯絡、服務條款與隱私政策。",
          "CTA 連結由單一設定檔管理；SEO metadata、sitemap、robots、關鍵字推薦與 SEO 報告可在建置時自動更新。"
        ],
        cards: [
          {
            title: "集中設定 CTA",
            text: "註冊連結、按鈕文字、站名與聯絡信箱集中於 src/config/site.js。",
            href: "contact/"
          },
          {
            title: "自動關鍵字建議",
            text: "只讓 Low 與 Medium 敏感度關鍵字進入正常推薦，High 與 Restricted 會被排除。",
            href: "keyword-recommendations.md"
          },
          {
            title: "完整技術 SEO",
            text: "每頁輸出 title、description、canonical、Open Graph、Twitter Card 與 JSON-LD。",
            href: "seo-report.md"
          }
        ]
      }
    ],
    faqs: [
      {
        question: "這個網站會提供保證獲利或必勝方法嗎？",
        answer:
          "不會。本網站只提供規則、流程與責任娛樂資訊，不提供保證獲利、漏洞利用或任何誤導性承諾。"
      },
      {
        question: "關鍵字會自動更新嗎？",
        answer:
          "會。建置腳本會依照內容資料與安全關鍵字清單產生 keyword-recommendations.json 與 keyword-recommendations.md。"
      },
      {
        question: "註冊按鈕的目標網址在哪裡修改？",
        answer:
          "請修改 src/config/site.js 的 registerRedirectUrl，或在 GitHub Actions 設定 REGISTER_REDIRECT_URL repository variable。"
      }
    ]
  },
  {
    id: "rules",
    route: "rules/index.html",
    navTitle: "規則",
    title: "百家樂規則指南｜牌值計算、莊閒和與補牌流程",
    description:
      "用新手能理解的方式說明百家樂基本規則、牌值計算、莊閒和判定與第三張牌補牌流程。",
    heroTitle: "百家樂規則指南",
    heroLead:
      "先看懂點數、莊閒和與補牌流程，再理解每一局為什麼會產生不同結果。",
    eyebrow: "Baccarat Rules",
    image: "assets/images/baccarat-guide-hero.png",
    imageAlt: "百家樂桌面上的牌值與補牌規則筆記",
    keywords: ["百家樂規則", "百家樂牌值計算", "百家樂第三張牌規則"],
    article: true,
    sections: [
      {
        title: "基本目標",
        body: [
          "百家樂通常比較兩方牌面：莊家與閒家。每方最終點數接近 9 的一方勝出；若點數相同，結果為和局。",
          "這裡的莊家與閒家只是牌局位置名稱，不代表玩家一定扮演其中一方。使用者在理解流程時，應把它視為遊戲規則中的兩個結果方向。"
        ]
      },
      {
        title: "牌值計算",
        body: [
          "A 計為 1 點，2 到 9 依牌面數字計算，10、J、Q、K 計為 0 點。若總點數超過 9，只取個位數，例如 7 加 8 等於 15，實際點數為 5。",
          "這個取個位數的規則是百家樂最重要的基本概念。理解後再看補牌流程，會比直接背表格更直覺。"
        ]
      },
      {
        title: "第三張牌與自然牌",
        body: [
          "若起手兩張牌已經是 8 或 9，通常稱為自然牌，牌局多半直接結算。其他情況會依固定補牌規則決定是否抽第三張牌。",
          "新手不需要把所有補牌表一次背完；先理解補牌是由規則自動決定，而不是由玩家臨場選擇，就能避免誤解遊戲流程。"
        ]
      }
    ],
    faqs: [
      {
        question: "百家樂一定要背補牌表嗎？",
        answer:
          "不一定。入門階段先理解補牌由固定規則決定即可；需要深入研究時再查看完整補牌表。"
      },
      {
        question: "莊家與閒家代表真實玩家嗎？",
        answer:
          "不代表。它們是牌局中的兩個結果位置，並不等同於實際參與者身份。"
      }
    ]
  },
  {
    id: "betting",
    route: "betting/index.html",
    navTitle: "下注流程",
    title: "百家樂下注流程指南｜莊、閒、和與風險提醒",
    description:
      "中性說明百家樂常見投注選項、下注流程、局後結算與責任娛樂注意事項，不宣稱任何保證結果。",
    heroTitle: "百家樂下注流程指南",
    heroLead:
      "了解常見投注選項與局前局後流程，同時記住每一局結果都有不確定性。",
    eyebrow: "Betting Flow",
    image: "assets/images/baccarat-guide-hero.png",
    imageAlt: "百家樂下注區域與流程說明示意",
    keywords: ["百家樂下注流程", "莊閒和說明", "責任娛樂"],
    article: true,
    sections: [
      {
        title: "常見選項",
        body: [
          "百家樂常見主要選項包含莊、閒與和。不同平台可能還有其他附加選項，但新手應先理解主要結果，不應把附加選項視為降低風險的方法。",
          "任何選項都不能保證結果。若頁面或平台宣稱穩賺、包贏或保證收益，應保持警覺並避免採信。"
        ]
      },
      {
        title: "一般流程",
        body: [
          "通常流程包含選擇局次、確認選項、等待停止下注、發牌、依規則補牌、結算結果。不同平台的介面可能不同，但核心順序相近。",
          "若選擇參與，應先設定可承受的娛樂預算與時間限制。超出預算後不應以追加支出追逐短期結果。"
        ]
      },
      {
        title: "風險觀念",
        body: [
          "短期連續結果不代表下一局會被補償，也不代表某種走勢具有必然性。把隨機結果解讀成確定訊號，是常見的風險來源。",
          "本網站只提供流程教育，不提供下注建議、獲利承諾或平台漏洞資訊。"
        ]
      }
    ],
    faqs: [
      {
        question: "下注流程是否能提高勝率？",
        answer:
          "流程理解只能幫助看懂牌局，不會改變結果的不確定性，也不代表能提高勝率。"
      },
      {
        question: "可以使用追注方式追回損失嗎？",
        answer:
          "不建議。追逐損失會提高財務與情緒風險，責任娛樂應以預算與時間限制為優先。"
      }
    ]
  },
  {
    id: "beginner",
    route: "beginner/index.html",
    navTitle: "新手指南",
    title: "百家樂新手教學｜入門觀念、常見錯誤與責任娛樂",
    description:
      "提供百家樂新手需要先理解的規則觀念、常見誤解、學習順序與責任娛樂原則。",
    heroTitle: "百家樂新手教學",
    heroLead:
      "用正確順序建立基礎：先理解規則，再理解流程，最後才看平台介面與常見問題。",
    eyebrow: "Beginner Guide",
    image: "assets/images/baccarat-guide-hero.png",
    imageAlt: "百家樂新手指南與規則筆記示意",
    keywords: ["百家樂新手教學", "百家樂規則", "責任娛樂"],
    article: true,
    sections: [
      {
        title: "建議學習順序",
        body: [
          "第一步先看牌值計算，第二步理解莊、閒、和代表的結果方向，第三步再看補牌規則與常見術語。",
          "若一開始就研究複雜走勢或短期紀錄，容易忽略遊戲結果的不確定性，並把偶然結果誤認成可複製方法。"
        ]
      },
      {
        title: "常見錯誤",
        body: [
          "常見錯誤包括把莊家與真實玩家混為一談、以為補牌可以手動決定、認為連續結果代表下一局必定反轉，以及忽略平台規則差異。",
          "入門內容應以理解流程為主，不應把任何資訊包裝成保證獲利的技巧。"
        ]
      },
      {
        title: "責任娛樂原則",
        body: [
          "只使用可承受的娛樂預算，不借貸、不追損、不把娛樂支出視為收入來源。若感到焦慮或難以停止，應停止使用並尋求專業協助。",
          "未達法定年齡者不應接觸相關娛樂服務。不同地區規範不同，使用前請確認所在地法律。"
        ]
      }
    ],
    faqs: [
      {
        question: "新手最先該看哪一頁？",
        answer:
          "建議先看規則指南，再看下注流程與術語頁，最後閱讀 FAQ 與責任娛樂頁。"
      },
      {
        question: "網站會推薦特定下注方式嗎？",
        answer:
          "不會。內容只說明規則與風險，不提供投注建議或保證結果。"
      }
    ]
  },
  {
    id: "terminology",
    route: "terminology/index.html",
    navTitle: "術語",
    title: "百家樂術語指南｜莊、閒、和、自然牌與補牌",
    description:
      "整理百家樂常見術語，包含莊、閒、和、自然牌、補牌、牌值與局次流程，協助新手理解內容。",
    heroTitle: "百家樂術語指南",
    heroLead:
      "把常見名詞先看懂，閱讀規則、FAQ 與平台說明時會更容易辨識重點。",
    eyebrow: "Terminology",
    image: "assets/images/baccarat-guide-hero.png",
    imageAlt: "百家樂常見術語與牌面示意",
    keywords: ["百家樂術語", "莊閒和說明", "百家樂牌值計算"],
    article: true,
    sections: [
      {
        title: "核心名詞",
        body: [
          "莊與閒是牌局中的兩個結果位置；和代表兩方最終點數相同。自然牌通常指起手兩張牌為 8 或 9 的情況。",
          "補牌是依固定規則決定是否抽第三張牌，並不是玩家自由選擇。牌值則以個位數為準，10 與人頭牌計為 0。"
        ]
      },
      {
        title: "流程名詞",
        body: [
          "停止下注、發牌、補牌、結算是常見流程字眼。不同平台介面可能使用不同翻譯，但實際意義通常相近。",
          "理解術語的目的，是降低閱讀規則時的門檻；不應把術語或紀錄解讀成保證下一局結果的訊號。"
        ]
      }
    ],
    faqs: [
      {
        question: "自然牌代表一定獲勝嗎？",
        answer:
          "不一定。自然牌是牌面狀態，仍需比較莊閒雙方點數後才知道結果。"
      },
      {
        question: "術語會因平台不同而不同嗎？",
        answer:
          "可能會。閱讀平台說明時仍應以該平台公開規則為準。"
      }
    ]
  },
  {
    id: "responsible",
    route: "responsible/index.html",
    navTitle: "責任娛樂",
    title: "責任娛樂指南｜年齡限制、風險意識與自我控管",
    description:
      "整理責任娛樂原則，包含年齡限制、地區法規、風險意識、預算設定與不保證結果聲明。",
    heroTitle: "責任娛樂指南",
    heroLead:
      "娛樂應建立在合法、成年、自願、量力而為與清楚風險認知之上。",
    eyebrow: "Responsible Entertainment",
    image: "assets/images/baccarat-guide-hero.png",
    imageAlt: "責任娛樂提醒卡片與遊戲規則筆記示意",
    keywords: ["責任娛樂", "百家樂新手教學"],
    article: true,
    sections: [
      {
        title: "基本原則",
        body: [
          "未達法定年齡者不應接觸相關娛樂服務。不同地區對線上娛樂與遊戲服務有不同規範，使用前必須自行確認所在地法律。",
          "任何遊戲結果都具有不確定性，不應把娛樂支出視為收入來源，也不應相信保證獲利、必勝技巧或漏洞說法。"
        ]
      },
      {
        title: "自我控管",
        body: [
          "在開始前先設定可承受的預算與時間，並在達到限制時停止。若因結果產生焦慮、衝動或追逐損失，應立即暫停。",
          "若你或身邊的人感到難以控制娛樂支出，應尋求所在地專業協助資源。"
        ]
      }
    ],
    faqs: [
      {
        question: "網站是否適合未成年人？",
        answer:
          "不適合。本網站內容僅供達法定年齡的成年人閱讀。"
      },
      {
        question: "如何避免過度投入？",
        answer:
          "先設定預算與時間限制，不借貸、不追損，並在感到壓力時停止使用。"
      }
    ]
  },
  {
    id: "faq",
    route: "faq/index.html",
    navTitle: "FAQ",
    title: "百家樂 FAQ｜規則、流程、SEO 與責任娛樂常見問題",
    description:
      "回答百家樂規則、下注流程、新手學習、CTA 設定、SEO 自動更新與責任娛樂相關常見問題。",
    heroTitle: "常見問題",
    heroLead:
      "快速回答新手最常遇到的規則、流程、內容安全與網站設定問題。",
    eyebrow: "FAQ",
    image: "assets/images/baccarat-guide-hero.png",
    imageAlt: "百家樂 FAQ 與規則問答示意",
    keywords: ["百家樂規則", "百家樂新手教學", "責任娛樂"],
    sections: [
      {
        title: "FAQ 重點",
        body: [
          "本頁整合遊戲規則、內容合規、CTA 設定與 SEO 自動化問題。回答以資訊與風險提醒為主，不提供下注建議。",
          "若你要部署到 GitHub Pages，請先更新中央設定檔與 GitHub repository variables，再執行建置。"
        ]
      }
    ],
    faqs: [
      {
        question: "百家樂的牌值怎麼計算？",
        answer:
          "A 計 1 點，2 到 9 依牌面計算，10、J、Q、K 計 0 點；總點數只取個位數。"
      },
      {
        question: "這個網站是否宣稱可以保證獲利？",
        answer:
          "不會。本網站明確避免保證獲利、必勝法、漏洞利用與其他高風險說法。"
      },
      {
        question: "關鍵字推薦如何避免高風險字？",
        answer:
          "建置腳本只把 Low 與 Medium 敏感度項目列入正常推薦，High 與 Restricted 會被標記並排除。"
      },
      {
        question: "如何修改 CTA 註冊連結？",
        answer:
          "修改 src/config/site.js 的 registerRedirectUrl，或在 GitHub Actions 設定 REGISTER_REDIRECT_URL repository variable。"
      }
    ]
  },
  {
    id: "about",
    route: "about/index.html",
    navTitle: "關於",
    title: "關於前導頁｜教育型百家樂資訊與合規內容原則",
    description:
      "說明前導頁的內容定位、合規原則、SEO 自動化方式與責任娛樂立場。",
    heroTitle: "關於前導頁",
    heroLead:
      "我們把前導頁設計成規則教育與風險提醒入口，而不是刺激下注或誇大結果的導流頁。",
    eyebrow: "About",
    image: "assets/images/baccarat-guide-hero.png",
    imageAlt: "教育型百家樂資訊網站視覺示意",
    keywords: ["責任娛樂", "百家樂規則"],
    sections: [
      {
        title: "內容定位",
        body: [
          "前導頁提供百家樂規則、流程、術語、FAQ 與責任娛樂資訊。內容以繁體中文撰寫，並避免誤導、誇張或高風險的博弈文案。",
          "網站不使用隱藏導流、偽裝內容、關鍵字堆疊或不透明跳轉。CTA 連結以清楚、可辨識的方式呈現。"
        ]
      },
      {
        title: "維護方式",
        body: [
          "站名、描述、公開網址、CTA 文字、註冊網址、聯絡信箱與責任娛樂聲明都集中在 src/config/site.js。",
          "SEO 與關鍵字推薦由建置腳本產生，並可透過 GitHub Actions 在 push 或排程時自動更新。"
        ]
      }
    ]
  },
  {
    id: "contact",
    route: "contact/index.html",
    navTitle: "聯絡",
    title: "聯絡我們｜前導頁內容與合規問題",
    description:
      "提供前導頁內容修正、合規問題、SEO 更新與合作聯絡方式。",
    heroTitle: "聯絡我們",
    heroLead:
      "若需要更新內容、調整註冊連結或回報合規疑慮，可以透過信箱聯絡維護者。",
    eyebrow: "Contact",
    image: "assets/images/baccarat-guide-hero.png",
    imageAlt: "聯絡與內容維護示意",
    keywords: ["責任娛樂"],
    sections: [
      {
        title: "聯絡範圍",
        body: [
          "可聯絡事項包含內容修正、SEO metadata 調整、關鍵字風險分級、註冊連結設定與責任娛樂提醒補充。",
          "請勿透過本網站詢問保證獲利、平台漏洞、未成年使用或任何違反所在地法律的內容。"
        ]
      }
    ]
  },
  {
    id: "terms",
    route: "terms/index.html",
    navTitle: "服務條款",
    title: "服務條款｜前導頁使用規範與責任聲明",
    description:
      "前導頁服務條款，包含資訊用途、責任限制、外部連結、法規遵循與禁止使用方式。",
    heroTitle: "服務條款",
    heroLead:
      "使用本網站代表你理解本站只提供教育與資訊內容，且不保證任何遊戲結果。",
    eyebrow: "Terms",
    image: "assets/images/baccarat-guide-hero.png",
    imageAlt: "服務條款與責任聲明文件示意",
    keywords: ["責任娛樂"],
    sections: [
      {
        title: "資訊用途",
        body: [
          "本網站內容僅供一般教育與資訊參考，不構成法律、財務、投資或投注建議。",
          "任何娛樂服務的使用都應遵守所在地法律、平台條款與年齡限制。使用者需自行承擔決策責任。"
        ]
      },
      {
        title: "禁止行為",
        body: [
          "不得將本站內容用於未成年推廣、誤導性宣傳、保證獲利聲稱、非法規避、平台漏洞利用或其他不當用途。",
          "外部連結可能導向第三方網站；使用者應自行閱讀第三方條款與隱私政策。"
        ]
      }
    ]
  },
  {
    id: "privacy",
    route: "privacy/index.html",
    navTitle: "隱私政策",
    title: "隱私政策｜前導頁資料處理與外部連結說明",
    description:
      "說明前導頁的隱私政策、靜態網站資料處理方式、外部連結與聯絡資訊。",
    heroTitle: "隱私政策",
    heroLead:
      "本網站以靜態頁面為主，不需要登入帳號，也不在前端保存敏感憑證。",
    eyebrow: "Privacy",
    image: "assets/images/baccarat-guide-hero.png",
    imageAlt: "隱私政策與靜態網站資料處理示意",
    keywords: ["責任娛樂"],
    sections: [
      {
        title: "資料處理",
        body: [
          "本網站為靜態 GitHub Pages 網站，不要求使用者註冊本站帳號，也不在程式碼中保存 API key、資料庫密碼或管理員憑證。",
          "若你點擊外部註冊或資訊連結，第三方網站可能依其政策處理資料；請先閱讀該網站的隱私條款。"
        ]
      },
      {
        title: "聯絡與修正",
        body: [
          "若你認為內容需要修正，或希望了解網站資料處理方式，可透過聯絡頁提供的信箱與維護者聯繫。"
        ]
      }
    ]
  }
];
