// miComet 編年史 - 三語言版本 (日本語 / English / 中文)
// 時間軸按時間順序整理，分左右兩條軸線
// 
// 資料來源:
// - miComet Moments Compendium Google 試算表: https://disp.cc/b/ACG/gu7D
// - PTT SakuraMiko版: https://www.ptt.cc/bbs/SakuraMiko/M.1709694215.A.D46.html
// - PTT SakuraMiko版: https://www.pttweb.cc/bbs/SakuraMiko/M.1711378184.A.D13
// 
const miCometDataMultilang = {
  // 語言配置
  languages: ["ja", "en", "zh"],
  defaultLanguage: "zh",
  
  // 資料來源
  sources: [
    {
      title: "micomet歷史本文",
      url: "https://disp.cc/b/ACG/gu7D"
    },
    {
      title: "miComet編年史 1 -真.商業階段",
      url: "https://www.ptt.cc/bbs/SakuraMiko/M.1709694215.A.D46.html"
    },
    {
      title: "micomet編年史 2-寵溺畏縮階段",
      url: "https://www.pttweb.cc/bbs/SakuraMiko/M.1711378184.A.D13"
    },
    {
      title: "miComet編年史-3 過謹慎階段(上)",
      url: "https://pttweb.tw/SakuraMiko/M.1732335955.A.864"
    },
    {
      title: "miComet編年史-3 商業梗階段(下)",
      url: "https://pttweb.tw/SakuraMiko/M.1711378199.A.B8A"
    },
    {
      title: "/vt/miComet — 4chan社群",
      url: "https://boards..org/vt/thread/111676275/micomet"
    },
    {
      title: "miComet in Love",
      url: "https://www.facebook.com/groups/830223165184192/announcements"
    }
  ],
  modalPov: {
      miko: { zh: '🌸 櫻巫女視角', ja: '🌸 さくらみこ視点', en: '🌸 Sakura Miko\'s POV' },
      suisei: { zh: '⭐ 星街彗星視角', ja: '⭐ 星街すいせい視点', en: '⭐ Hoshimachi Suisei\'s POV' },
      shared: { zh: '💕 miComet 共同', ja: '💕 miComet 共有', en: '💕 miComet Shared' }
  },
  phases: [
    { "id": 1, "title": { "zh": "真・商業夥伴階段" } },
    { "id": 2, "title": { "zh": "星街寵溺，咪口畏縮階段" } },
    { "id": 3, "title": { "zh": "咪口刻意演出想貼貼，星街假裝冷淡的商業梗階段" } },
    { "id": 4, "title": { "zh": "咪口開始想東想西過謹慎，星街表態想跟咪口親近階段" } },
    { "id": "X", "title": { "zh": "澄清兩人不百合營業(轉折點)" } },
    { "id": 5, "title": { "zh": "咪口開始敢表達親近階段" } },
    { "id": 6, "title": { "zh": "雙方開始每日任務階段" } },
    { "id": 7, "title": { "zh": "小秘密謎語人階段" } },
    { "id": 8, "title": { "zh": "假借商業之名大曬特曬，周圍可以戳了階段" } },
    { "id": 9, "title": { "zh": "控糖大方供給階段" } }
  ],
  
  // 時間軸資料
  timeline: [
    {
      id: "start",
      date: "2018-08-01",
      phase: 0,
      side: "miko",
      emoji: "🌸",
      title: {
        ja: "さくらみこデビュー",
        en: "Sakura Miko Debut",
        zh: "櫻巫女出道"
      },
      ctx: {
        ja: "さくらみこがホロライブのソロデビュー組として活動開始。",
        en: "Sakura Miko started her activities as a solo debut member of Hololive.",
        zh: "櫻巫女作為Hololive的單人出道組成員開始活動。"
      },
      type: "Debut",
      link: "https://www.youtube.com/watch?v=A22y7RjN15k",
      platform: "youtube"
    },
  ]
};