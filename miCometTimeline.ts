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
  { 
    id: 's741', date: '2019-06-11', phase: 1, side: 'shared', emoji: '📌',
    title: '19-2 早期線索：咪口與星街的初見互動 | 初期の接点 | Early Clues of miComet',
    ctx: '補入最早期的互動線索，對應 2019/6/11 的相關紀錄。',
    type: 'Text', link: 'https://www.youtube.com/watch?v=u-RuvdaQU-Q'
  },
  { 
    id: 's742', date: '2019-12-21', phase: 1, side: 'shared', emoji: '📌',
    title: '19-3 第一個工商：先導者合作 | 最初の商業案件 | First Business Collab',
    ctx: 'miComet 共同接下的第一個工商節點，關係從工作合作正式展開。',
    type: 'Clip', link: 'https://youtu.be/PAj_4vs2m-o'
  },
  { 
    id: 's743', date: '2020-06-26', phase: 2, side: 'shared', emoji: '📌',
    title: '20-1 miComet 名稱誕生 | miCometの命名 | miComet Named',
    ctx: '聊天室與直播中正式確立 miComet 組合名稱，是兩人關係的重要里程碑。',
    type: 'Text', link: 'https://www.youtube.com/live/lwszUzu_ARc'
  },
  { 
    id: 's744', date: '2021-06-14', phase: 3, side: 'shared', emoji: '📌',
    title: '21-1 鬼屋約定：夏祭前的奇蹟聯動 | お化け屋敷の約束 | Haunted House Promise',
    ctx: '星街在麥塊中找到咪口並突發連動，成為 2021 夏季關係轉折點。',
    type: 'Stream', link: 'https://www.youtube.com/watch?v=Fuq9__yqZxw'
  },
  { 
    id: 's745', date: '2021-06-27', phase: 3, side: 'shared', emoji: '📌',
    title: '21-2 夏祭鬼屋與約會 | 夏祭りのお化け屋敷デート | Summer Festival Date',
    ctx: '兩人一起蓋鬼屋、逛夏祭、後夜祭約會，是入坑經典章節。',
    type: 'Stream', link: 'https://www.youtube.com/live/GcRZmj1OnjY'
  },
  { 
    id: 's746', date: '2021-07-09', phase: 3, side: 'shared', emoji: '📌',
    title: '21-3 大空警察：商業夥伴的罪與罰 | 大空警察 | Oozora Police',
    ctx: '咪口與星街一起受審，商業梗與互相吐槽的經典代表。',
    type: 'Stream', link: 'https://www.youtube.com/watch?v=N16A2XNu0L4'
  },
  { 
    id: 's747', date: '2021-11-27', phase: 4, side: 'shared', emoji: '📌',
    title: '21-4 火建迪士尼：約會模式全開 | 火建ディズニー | Disney with Hekikens',
    ctx: '火建迪士尼事件，miComet 在園區中大量同框與私下互動。',
    type: 'Stream', link: 'https://www.youtube.com/watch?v=Ups1nPbRDS4'
  },
  { 
    id: 's748', date: '2021-12-19', phase: 4, side: 'shared', emoji: '📌',
    title: '21-5 VILLS DAY2：商業標語外的默契 | VILLS DAY2 | Beyond Business',
    ctx: 'VILLS 訪談中再次談到「商業關係」與實際越來越深的合作默契。',
    type: 'Text', link: 'https://v-clan.spwn.jp/events/21032114-vills'
  }
];

// 匯出工具函數，方便在 sync-data-mate 中調用
export const getStoryById = (id: string) => MICOMET_TIMELINE.find(s => s.id === id);
export const getStoriesByYear = (year: string) => MICOMET_TIMELINE.filter(s => s.date.startsWith(year));
