/**
 * miComet Chronicles Data Set
 * Structure compatible with sync-data-mate
 */

export type StorySide = 'shared' | 'miko' | 'suisei' | 'others';
export type StoryType = 'Clip' | 'Stream' | 'Text' | 'Mixed';

export interface miCometStory {
  id: string;        // 原始序號
  date: string;      // YYYY-MM-DD
  phase: number;     // 1-5 階段
  side: StorySide;   // 所屬方
  emoji: string;     // 圖示
  title: string;     // 格式: YY-N 中文 | 日文 | 英文
  ctx: string;       // 內容簡介
  type: StoryType;   // 媒介類型
  link?: string;     // 參考連結
}

export const MICOMET_TIMELINE: miCometStory[] = [
  // --- Phase 1: The Beginning (2019) ---
  { 
    id: 's1', date: '2019-07-23', phase: 1, side: 'shared', emoji: '📍',
    title: '19-1 初次邂逅：冬日計畫的血腥開端 | miCometの初対面：雪山人狼の血塗られた始まり | First Encounter: The Bloody Start',
    ctx: 'miComet 傳說的起點。Miko 在 Project Winter 中被星街背叛並殺害。 [cite: 1]',
    type: 'Clip', link: 'https://youtu.be/u-RuvdaQU-Q'
  },

  // ... (中間 s2-s732 依此類推進行三語化與編號，此處展示整合後的新增重點) ...

  // --- Phase 5: 2024 關鍵轉折 (整合 PTT 討論) ---
  { 
    id: 's733', date: '2024-03-06', phase: 5, side: 'shared', emoji: '📍',
    title: '24-18 1122 紀念日：廣播談論「那個人」 | 1122の日：ラジオで「あの人」について語る | 1122 Day: Talking about "That Person"',
    ctx: '星街在廣播中語氣嬌羞地提到與 Miko 的互動，引發 PTT 熱烈討論。 [cite: 1]',
    type: 'Text', link: 'https://www.pttweb.cc/bbs/C_Chat/M.1709694032.A.C3B'
  },
  { 
    id: 's734', date: '2024-11-23', phase: 5, side: 'shared', emoji: '📍',
    title: '24-65 演唱會 0 距離接觸：超越商業的默契 | ライブでのゼロ距離接触 | Zero-Distance Contact at Live',
    ctx: '11/23 活動中兩人的站位與頻繁視線交會，被粉絲視為真情流露。 [cite: 1]',
    type: 'Text', link: 'https://ptt.org.tw/C_Chat/M.1732326259.A.A8F' 
  },

  // --- Phase 5: 2025 新星目錄時期 (整合 mc2325.txt) ---
  { 
    id: 's732', date: '2025-01-26', phase: 5, side: 'shared', emoji: '📍',
    title: '25-4 Billboard 訪談：邁出網路圈的一步 | Billboardインタビュー：ネットの外へ踏み出す一歩 | Billboard Interview: A Step Beyond',
    ctx: '星街談論《AWAKE》作為專輯核心，嘗試將虛擬與現實融合的概念。 [cite: 1]',
    type: 'Mixed'
  },
  { 
    id: 's735', date: '2025-02-04', phase: 5, side: 'miko', emoji: '🌸',
    title: '25-5 Miko 的心聲：追隨星街的腳步 | みこの本音：すいせいの背中を追って | Miko\'s Reflection: Following Suisei\'s Lead',
    ctx: 'Miko 在看完星街演唱會後提到，雖然不想成為星街，但想成為像她那樣活躍的人，走自己的賽道。 ',
    type: 'Stream'
  },
  { 
    id: 's736', date: '2025-02-09', phase: 5, side: 'shared', emoji: '📻',
    title: '25-6 Daoko 廣播：偶像的典範 | Daokoのラジオ：アイドルの模範 | Daoko Radio: The Model Idol',
    ctx: '嘉賓 Daoko 表示自己是 35P，在星街面前大讚 Miko，星街笑稱 Miko 是她的「商業夥伴」。 ',
    type: 'Stream'
  },
  { 
    id: 's737', date: '2025-02-19', phase: 5, side: 'shared', emoji: '🏘️',
    title: '25-7 麥塊別莊事件：彗醬的點頭認可 | マイクラ別荘事件：すいちゃんの承認 | Minecraft Villa Incident',
    ctx: 'Miko 在星街蓋的房子掛門牌，星街引導她掛在正確的位置並點頭認可。 ',
    type: 'Stream'
  },
  { 
    id: 's738', date: '2025-02-20', phase: 5, side: 'shared', emoji: '🤝',
    title: '25-8 永遠的最強商業標語 | 永遠の最強ビジネス | Forever Strongest Business',
    ctx: '面對同居傳聞，Miko 強調「最強商業」是兩人的標語，這點永遠不會改變。 ',
    type: 'Stream'
  },
  { 
    id: 's739', date: '2025-02-23', phase: 5, side: 'suisei', emoji: '☄️',
    title: '25-9 星街雜談：身心極限與春假 | すいせい雑談：限界と春休み | Suisei Chat: Limits and Spring Break',
    ctx: '星街提到武道館後已達負荷極限，今年會減少工作量並爭取休假。 ',
    type: 'Stream'
  },

  // --- Phase 5: 2026 未來展望 ---
  { 
    id: 's740', date: '2026-01-01', phase: 5, side: 'shared', emoji: '📍',
    title: '26-1 2026 新年展望：邁向更遠的未來 | 2026年への展望：さらなる未来へ | 2026 Vision: Toward a Greater Future',
    ctx: 'miComet 邁入第七年的預留章節，紀錄兩人邁向新高度的過程。',
    type: 'Text'
  }
];

// 匯出工具函數，方便在 sync-data-mate 中調用
export const getStoryById = (id: string) => MICOMET_TIMELINE.find(s => s.id === id);
export const getStoriesByYear = (year: string) => MICOMET_TIMELINE.filter(s => s.date.startsWith(year));
