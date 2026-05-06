export interface Phase {
  id: number;
  label: string;
  period: string;
  color: string;
  bg: string;
  desc: string;
}

import mcFullData from './mc-full-timeline.json';

export interface TimelineItem {
  id: string;
  date: string;
  phase: number;
  side: 'miko' | 'suisei' | 'shared';
  emoji: string;
  title: string;
  ctx: string;
  type: string;
  link: string;
  platform?: string;
  pov?: string;
  directLink?: string;
}

export const PHASES: Phase[] = [
  {
    id: 1, label: '真‧商業夥伴',
    period: '2019 — 2020',
    color: '#FFB0CC',
    bg: 'rgba(255,176,204,0.10)',
    desc: '從卡片戰士工商開始，組合名「miComet」正式確立。兩人從工作關係出發，私下的超市購物、通宵聊天，悄悄累積著不只是商業的溫度。'
  },
  {
    id: 2, label: '星街寵溺，咪口畏縮',
    period: '2021 上半年',
    color: '#D9679A',
    bg: 'rgba(217,103,154,0.10)',
    desc: '星街開始積極展現對咪口的溫柔，頂著沙啞的喉嚨來凸待，用棉花糖企劃在問卷裡寫下咪口的名字。咪口則受寵若驚、有點畏縮。'
  },
  {
    id: 3, label: '商業梗街段',
    period: '2021 夏',
    color: '#C08030',
    bg: 'rgba(192,128,48,0.08)',
    desc: '夏祭鬼屋約定、後夜祭 OX 問答、冰船約會 ——「商業朋友」這個詞，開始成為兩人之間甜蜜的默契暗號。'
  },
  {
    id: 4, label: '咪口謹慎，星街表態',
    period: '2021 下半年',
    color: '#8855CC',
    bg: 'rgba(136,85,204,0.08)',
    desc: '整夜通話、Mario Kart 守護、Sololive 前的 Twitter 互動——星街越來越坦率，咪口則小心翼翼地確認著這份關係。'
  },
  {
    id: 5, label: '咪口開始敢表達',
    period: '2022 初',
    color: '#4A90C8',
    bg: 'rgba(74,144,200,0.08)',
    desc: 'Animal 封面 MV、Raft 馬拉松、公寓鄰居計畫 ——「Business Teetee」的外殼下，是兩人都開始主動靠近的心。'
  },
  {
    id: 6, label: '每日任務階段',
    period: '2022 春夏',
    color: '#3A883A',
    bg: 'rgba(58,136,58,0.07)',
    desc: '幾乎每天出現在彼此的直播、推特和聊天室。「偶然」的同時上線越來越難說是巧合。'
  },
  {
    id: 7, label: '小秘密謎語人',
    period: '2022 夏秋',
    color: '#B06020',
    bg: 'rgba(176,96,32,0.07)',
    desc: 'USJ 旅行、露營計畫、兩人之間的小秘密逐漸增多，笑點只有彼此懂，圍觀者只能微笑旁觀。'
  },
  {
    id: 8, label: '假借商業之名大曬',
    period: '2022 秋冬',
    color: '#D9679A',
    bg: 'rgba(217,103,154,0.08)',
    desc: '周圍的人終於可以公開戳了——兩人照樣掛著「商業」的名牌，卻毫不掩飾地秀恩愛。'
  },
  {
    id: 9, label: '控糖大方供給',
    period: '2023 至今',
    color: '#C8A8F0',
    bg: 'rgba(200,168,240,0.10)',
    desc: '不再需要藉口，也不需要解釋，miComet 就是 miComet。「彗醬想去哪裡呢？沒有想去的地方，也不知道有什麼地方，只是來看妳的。」'
  },
];

const CURATED_TIMELINE: TimelineItem[] = [
  // === 第一階段 ===
  { id: 'a1', date: '2019-06-11', phase: 1, side: 'suisei', emoji: '👁️',
    title: '最早的線索 — 星街在看咪口直播',
    ctx: '目前考古找到最早的記錄。星街在自己的直播中，悄悄打開了咪口的泳裝揭露直播來看，原本的直播早已私人，但老星詠們留下了歷史本文。',
    type: 'Stream', link: '' },
  { id: 'a1b', date: '2020-02-02', phase: 1, side: 'shared', emoji: '🎮',
    title: '初次相遇 — Project Winter',
    ctx: '在 Project Winter 的遊戲中初次相遇。這是一個簡短但意義重大的互動，成為了 miComet 故事的開始。當時星街用更正式的「Miko-san」來稱呼咪口，顯示兩人還沒有很親近。',
    type: 'Stream', link: '' },
  { id: 'a2', date: '2019-12-21', phase: 1, side: 'shared', emoji: '🃏',
    title: 'miComet 第一個工商 — 卡片戰士先導者',
    ctx: '星街與咪口一起接到第一個工商「卡片戰士先導者」，這是 miComet 組合名稱徵集的正式起點。半年後兩人又進行了復仇戰，並在 Raft 雜談中說到這次工商之後關係才開始變好。',
    type: 'Stream', link: 'https://youtu.be/PAj_4vs2m-o' },
  { id: 'a3', date: '2019-12-31', phase: 1, side: 'suisei', emoji: '🎆',
    title: '同時視聽 Holo 跨年',
    ctx: '星街與咪口同時視聽 Hololive 的跨年節目。星街提到：遇到咪口，會被她瘋狂介紹各種遊戲。',
    type: 'Stream', link: '' },
  { id: 'a4', date: '2020-02-14', phase: 1, side: 'shared', emoji: '💝',
    title: '工商影片上傳 — 暫定組合名 SuiMiko',
    ctx: '卡片戰士工商影片正式上傳。暫定的組合名還是「SuiMiko」，「miComet」這個名字要再過一段時間才確定下來。順帶一提，跟情人節真的沒有關係。',
    type: 'Clip', link: 'https://www.youtube.com/watch?v=Hu8qRjZMmHU' },
  { id: 'a5', date: '2020-06-19', phase: 1, side: 'suisei', emoji: '💬',
    title: '棉花糖雜談 — 私下其實聊得很多',
    ctx: '星街在雜談中承認：跟咪口檯面上是工商和 VILLS，不過私下其實聊得很多，組合名還沒決定。',
    type: 'Stream', link: '' },
  { id: 'a6', date: '2020-07-05', phase: 1, side: 'suisei', emoji: '🛒',
    title: '一起去超市買東西',
    ctx: '星街在直播中說：「今天跟咪口去逛超市，送奶奶中元節禮物。」咪口出現在聊天室幫她打氣。這是兩人私下現實生活中的早期互動。',
    type: 'Stream', link: 'https://www.youtube.com/watch?v=lp1DnxdKfIA' },
  { id: 'a7', date: '2020-07-19', phase: 1, side: 'shared', emoji: '🎤',
    title: 'VILLS Vol.1 — 演出結束後的擁抱',
    ctx: 'miComet 在 VILLS Vol.1 同台演出，分別演唱各自單曲後合唱「夢見る空へ」。演出結束後，兩人擁抱了。咪口反應慢了，星街以為她不抱要收手，結果咪口抱了又抱回去。後來星街說，咪口練習時笑個不停，排演很開心。這段時期星街一直在咪口的練習和身體恢復中給予支持和鼓勵。',
    type: 'Stream', link: '' },
  { id: 'a8', date: '2020-07-20', phase: 1, side: 'suisei', emoji: '🎵',
    title: '一起向經紀人要求合唱版',
    ctx: '星街說，她跟咪口一起向經紀人說想出兩人合唱版的「夢見る空へ」——被敷衍了。',
    type: 'Stream', link: '' },
  { id: 'a9', date: '2020-07-27', phase: 1, side: 'suisei', emoji: '😂',
    title: '排演時笑到無法繼續',
    ctx: '星街在雜談中說：「跟咪口工作的時候，真的笑聲不停。有時候笑到呼吸困難，甚至讓排演進行不下去，真的很抱歉工作人員。」這是兩人早期關係的重要證明。',
    type: 'Clip', link: 'https://youtu.be/xIClSsOuHM0' },

  // === 第二階段 ===
  { id: 'b1', date: '2021-01-25', phase: 2, side: 'shared', emoji: '🚗',
    title: 'miComet GTA — 商業朋友開公司',
    ctx: '兩人在 GTA 中聯動開公司，「商業朋友」這個玩笑梗從這裡開始變成兩人之間的經典默契。星街的開台預告第一次誤貼到咪口的待機間——因為兩個人都有開台。',
    type: 'Stream', link: 'https://youtu.be/jvGi0hIcfpo' },
  { id: 'b2', date: '2021-02-21', phase: 2, side: 'suisei', emoji: '📋',
    title: '船長個人檔案企劃 — 合得來的成員：咪口',
    ctx: 'Marine 的個人檔案企劃中，星街在「合得來的成員」欄寫下了咪口的名字，並在家族關係圖裡把咪口列為寵物。咪口後來多次提到，這是她跟星街關係變好的最重要契機。',
    type: 'Clip', link: 'https://www.youtube.com/watch?v=jaaWr4RlKCo' },
  { id: 'b3', date: '2021-03-05', phase: 2, side: 'suisei', emoji: '💌',
    title: '咪口生日凸待 — 頂著沙啞喉嚨的祝福',
    ctx: '星街喉嚨從 3/3 就開始不舒服，連續取消直播。但咪口 3/5 生日凸待，她還是頂著沙啞的喉嚨來了。兩人互相說了對彼此的尊敬與欣賞。咪口說「我真的很尊敬 Suichan」，星街回應「她是真實的」。咪口說帥到覺得會不小心愛上星街，星街說「愛上也沒關係，這樣就是勝利路線了。」這是一個關鍵時刻，標誌著她們從工作夥伴進化為真正親密的朋友。最後的小劇場：咪口讓星街對垂死的她說「永遠在一起」，星街直接叫咪口到天堂保重，掛電話，又是失敗路線。',
    type: 'Stream', link: 'https://youtu.be/V4K6i8mpop0' },
  { id: 'b4', date: '2021-03-22', phase: 2, side: 'shared', emoji: '🎂',
    title: '星街生日凸待 — 咪口第一個打進來',
    ctx: '星街生日，咪口是第一個打進凸待的人。星街承認擔心萬一沒人來，「但現在咪口來了就沒問題了。」她們談論了 miComet 這個組合是如何形成的，以及她們之間的關係如何從純粹的商業合作演變成真實的友誼。星街說起咪口曾邀她去咖啡歐蕾店，她因為不喝甜的拒絕了，但其實真的很想去。最後星街要求咪口做愛的告白，咪口：「彗醬今天也很可愛喔，miComet 最強！噗啾啾啾。」',
    type: 'Clip', link: 'https://youtu.be/XBcW7rUCq5c' },
  { id: 'b5', date: '2021-03-26', phase: 2, side: 'shared', emoji: '🚁',
    title: 'miComet（火建）GTA — 直升機事件',
    ctx: '三人 GTA 聯動。咪口問：「日本文化裡講月色真美是告白，那講星光真美呢？」阿火：「大概是命數已盡。」星街：「大概是很景仰的感覺。」咪口偷了飛機載兩人，結果星街默默接管了駕駛，還裝傻，最後大家一起墜機。',
    type: 'Stream', link: 'https://youtu.be/R9YYtpl8gmc' },

  // === 第三階段 ===
  { id: 'c1', date: '2021-06-14', phase: 3, side: 'suisei', emoji: '🏚️',
    title: '鬼屋約定 — 差點改變 miComet 歷史的一刻',
    ctx: '咪口蓋鬼屋，星街投票後決定玩麥塊，就在全頻道找咪口帶。洞窟探險時星街不小心把咪口推進岩漿，裝備全部燒毀，星街安慰：「下次再一起做翅膀、蓋鬼屋。」——這個約定，她們陪了三年。',
    type: 'Stream', link: 'https://www.youtube.com/watch?v=gQBxC8FiKzU' },
  { id: 'c2', date: '2021-06-27', phase: 3, side: 'shared', emoji: '🎪',
    title: '夏祭 — miComet 冰船約會',
    ctx: '夏祭當天，星街在官台節目下播 10 分鐘後就趕來幫咪口蓋鬼屋（沒開台）。兩人一起逛夏祭，坐 Moona 的愛之船時星街開船，兩人一起唱「小小世界」。出來後說是最棒的約會景點。咪口最後感謝星街：「如果彗醬不在真的什麼都做不好，還好有彗醬。」',
    type: 'Stream', link: 'https://www.youtube.com/live/GcRZmj1OnjY' },
  { id: 'c3', date: '2021-06-28', phase: 3, side: 'shared', emoji: '🎮',
    title: '後夜祭 OX 問答 — 我們是商業朋友嗎？',
    ctx: '星街問咪口：「我們是不是已經從商業朋友畢業了？」咪口猶豫後選了 X（否）。星街：「繼續維持商業朋友是嗎？答對了，我們永遠都是商業朋友。」——但還是按機關讓咪口摔進岩漿。',
    type: 'Stream', link: 'https://www.youtube.com/watch?v=ZEyLVFw3z1Y' },
  { id: 'c4', date: '2021-06-30', phase: 3, side: 'shared', emoji: '🐰',
    title: 'miComet 超級兔子人',
    ctx: '經典互坑貼貼遊戲。無法用文字完整形容這場直播的甜度，被認為是第一波將 miComet 視為 CP 的重要入坑期之一。',
    type: 'Stream', link: 'https://www.youtube.com/live/X_TGEG8efoc' },

  // === 第四階段 ===
  { id: 'd1', date: '2021-08-19', phase: 4, side: 'miko', emoji: '🏎️',
    title: 'Mario Kart 耐力賽 — Suisei 出現在聊天室',
    ctx: '咪口進行長達 6 小時 10 分鐘的馬里奧賽車耐力直播，目標是 5 小時內第一。當她快要成功時，星街在聊天室中出現提供支持（第 36 場和第 71 場都有）。最後咪口成功達成目標，將勝利獻給星街，當場播起「Kakero」。',
    type: 'Stream', link: 'https://youtu.be/ZkdvMlbFFNY' },
  { id: 'd2', date: '2021-10-19', phase: 4, side: 'miko', emoji: '🎵',
    title: '播 Kakero 慶祝賽車第一',
    ctx: '咪口在 Assetto Corsa 直播中，用「Kakero」（星街的歌）當作賽車勝利的儀式曲。0:29:30 在回放時播，最後在 1:00:25 時間剛好趕上星街的服裝揭露直播。',
    type: 'Stream', link: 'https://youtu.be/sqdelg5ZyGE' },
  { id: 'd3', date: '2021-10-21', phase: 4, side: 'shared', emoji: '⭐',
    title: 'Sololive 前的 Twitter 互動',
    ctx: '在星街的 Sololive 開始前，兩人在 Twitter 上進行了甜蜜的互動。咪口主動發推文「我正在看著你，Sui-chan」，星街看到後按了讚。這種即時互動顯示了她們的親密度。晚上 7 點咪口再發推：「它來了！（星街的 Sololive）」',
    type: 'Text', link: 'https://twitter.com/sakuramiko35/status/1451084721434214400' },
  { id: 'd4', date: '2021-11-25', phase: 4, side: 'miko', emoji: '🎮',
    title: 'Pokemon — 咪口打電話約星街對戰',
    ctx: '咪口在 1:28:55 打電話給星街，邀請她進行 Pokemon 對戰。星街在同一天也正在掙扎要不要主動邀咪口一起玩，結果咪口先開口了。',
    type: 'Stream', link: 'https://youtu.be/hDJUmPwxgDI' },
  { id: 'd5', date: '2021-11-27', phase: 4, side: 'shared', emoji: '🏰',
    title: 'Minecraft Disneyland — 粉藍配色',
    ctx: '在 Minecraft Disneyland 的紀念品商店中，星街選擇了所有藍色物品，唯獨把藍色襯衫換成了粉紅色的。這顯示了她對咪口顏色偏好的細心注意。',
    type: 'Clip', link: 'https://youtu.be/TgFYdZLz50A' },
  { id: 'd6', date: '2021-12-01', phase: 4, side: 'shared', emoji: '🌙',
    title: '整夜語音通話',
    ctx: '早上 8:58，咪口發推：「我整個晚上都在和其他 Hololive 成員語音聊天，玩得很開心...」同一天，星街在直播中提到她也整夜在通話中，聲音沙啞。根據時間推測，她們可能一整晚都在聊天。',
    type: 'Text', link: 'https://twitter.com/sakuramiko35/status/1465832526107209729' },

  // === 第五階段 ===
  { id: 'e1', date: '2022-01-27', phase: 5, side: 'shared', emoji: '🎵',
    title: 'Animal 封面 MV 發布',
    ctx: '星街邀請咪口一起為「Animal」這首歌製作封面。星街用令人難以置信的速度組織錄製、編輯和發布，這是 miComet 第一部正式發布的音樂視頻，展示了她們完美的合作默契。',
    type: 'Clip', link: 'https://youtu.be/o5qkX3ioHfI' },
  { id: 'e2', date: '2022-04-25', phase: 5, side: 'shared', emoji: '⛵',
    title: 'Raft 直播 — 直播後繼續玩 5 小時',
    ctx: '一場長達 5 小時的 Raft 直播後，兩人又繼續玩了另外 5 小時（下播狀態）。她們整夜一起玩，甚至在遊戲中迎接日出。期間兩人討論了計劃去露營和環球影城旅遊的事。',
    type: 'Stream', link: 'https://www.youtube.com/watch?v=wKB_kzqURws' },
  { id: 'e3', date: '2022-06-28', phase: 7, side: 'shared', emoji: '🎢',
    title: 'Shiraken × USJ 旅行',
    ctx: 'Shiraken 四人組（星街、咪口、阿火、波波）一起去環球影城旅遊。咪口爬到星街身上把她叫醒，兩人在哈利波特園區購買配套服裝（都選了 Slytherin 服裝），展現出無比的親密和默契。星街說去了咪口家裡，兩人互相理髮。',
    type: 'Stream', link: '' },
  { id: 'e4', date: '2022-08-17', phase: 6, side: 'shared', emoji: '⛏️',
    title: 'miComet 強化週間',
    ctx: '「miComet 強化週間」。星街本來要開 RUST，卻還是上麥塊跟咪口玩。正式直播中 miComet 濃度驚人，被整理成懶人包廣泛流傳。',
    type: 'Stream', link: '' },

  // === 第九階段 ===
  { id: 'i1', date: '2023-02-21', phase: 9, side: 'suisei', emoji: '🌠',
    title: '「只是來看妳的」',
    ctx: '星街說過一句話，後來被廣泛引用：\n\n「彗醬想去哪裡呢？\n沒有想去的地方，\n也不知道有什麼地方，\n只是來看妳的。」\n\n——星街彗星 2023.2.21',
    type: 'Stream', link: '' },
  { id: 'i2', date: '2023-07-23', phase: 9, side: 'shared', emoji: '🎂',
    title: 'miComet 相遇 4 週年',
    ctx: '2023 年，miComet 相遇滿 4 週年。兩人繼續在對方的直播、推特和日常生活中出現，故事還在繼續書寫。',
    type: 'Text', link: '' },
];

// Merge: curated items take priority (by directLink or date+title match), then add remaining from full dataset
const curatedLinks = new Set(CURATED_TIMELINE.map(e => e.link).filter(Boolean));
const curatedDateKeys = new Set(CURATED_TIMELINE.map(e => e.date));

const fullItems: TimelineItem[] = (mcFullData as any[]).map(item => ({
  id: item.id,
  date: item.date,
  phase: item.phase,
  side: item.side as 'miko' | 'suisei' | 'shared',
  emoji: item.emoji,
  title: item.title,
  ctx: item.ctx,
  type: item.type,
  link: item.link,
  platform: item.platform,
  directLink: item.directLink,
}));

const extraItems = fullItems.filter(item => {
  if (item.link && curatedLinks.has(item.link)) return false;
  // Skip if same date AND very similar title exists in curated
  if (curatedDateKeys.has(item.date)) {
    const match = CURATED_TIMELINE.find(c => c.date === item.date);
    if (match) return false;
  }
  return true;
});

export const TIMELINE: TimelineItem[] = [...CURATED_TIMELINE, ...extraItems];

export const TYPE_ZH: Record<string, string> = {
  'Stream': '直播', 'Clip': '切片', 'Text': '推文', 'Audio': '音頻'
};