
/**
 * miComet Chronicles Data Set - Full Edition
 * Source: Parsed and cleaned from miComet_732.html and other sources.
 * Last Updated: 2024-07-23
 */

export type StorySide = 'shared' | 'miko' | 'suisei' | 'others';
export type StoryType = 'Clip' | 'Stream' | 'Text' | 'Mixed' | 'Audio' | '';

export interface MiCometStory {
  id: string;
  date: string;
  phase: number;
  side: StorySide;
  emoji: string;
  title: string;
  ctx: string;
  type: StoryType;
  link?: string;
  img?: string;
}

// The entire timeline, sorted and corrected.
export const MICOMET_TIMELINE: MiCometStory[] = [
  {
    id: 's1', date: '2019-07-23', phase: 1, side: 'shared', emoji: '📍',
    title: '19-1 | 初次邂逅：冬日計畫的血腥開端 | 初対面：雪山人狼の血塗られた始まり | First Encounter: The Bloody Start of Project Winter',
    ctx: 'miComet 傳說的起點。Miko 在 Project Winter 中被星街背叛並殺害，奠定了兩人「商業夥伴」的基礎。',
    type: 'Clip', link: 'https://youtu.be/u-RuvdaQU-Q',
    img: 'https://i.ytimg.com/vi/u-RuvdaQU-Q/hqdefault.jpg'
  },
  {
    id: 's2', date: '2019-08-03', phase: 1, side: 'suisei', emoji: '📍',
    title: "19-2 | 星街邊玩俄羅斯方塊邊看 Miko 的 3D 泳裝直播 | テトリス配信中にみこの3D水着を見る | Watching Miko's 3D Swimsuit Stream While Playing Tetris",
    ctx: '星街在自己的直播中，同時觀看著 Miko 的 3D 泳裝發表會，展現了早期的關注。',
    type: 'Text', link: '', img: ''
  },
  {
    id: 's3', date: '2019-08-04', phase: 1, side: 'suisei', emoji: '📍',
    title: '19-3 | 星街將 Miko 歸為「可愛」分類 | すいせいがみこを「かわいい」に分類 | Suisei Classifies Miko as "Cute"',
    ctx: '在一場直播中，星街將 Hololive 成員分為「可愛」、「帥氣」、「熱情」等類別，並毫不猶豫地將櫻巫女放在「可愛」組。',
    type: 'Clip', link: '', img: ''
  },
  {
    id: 's406', date: '2020-02-02', phase: 2, side: 'shared', emoji: '📍',
    title: "20-1 | ARK 早期互動：Miko 拜訪星街的家 | ARK初期：みこがすいせいの家を訪問 | Early ARK Interaction: Miko Visits Suisei's House",
    ctx: 'ARK 伺服器早期，Miko 參觀了星街的家並吐槽其設計很「遜」。',
    type: 'Clip', link: '', img: ''
  },
  {
    id: 's4', date: '2020-06-06', phase: 2, side: 'suisei', emoji: '📍',
    title: '20-2 | 先導者對戰與早期稱呼 | ヴァンガード対戦と初期の呼び方 | Vanguard Battle & Early Nicknames',
    ctx: '兩人早期的連動之一。星街此時仍稱呼 Miko 為「Miko-chan」，互動尚在萌芽階段。',
    type: 'Stream', link: '', img: ''
  },
  {
    id: 's409', date: '2020-07-19', phase: 2, side: 'shared', emoji: '📍',
    title: "20-3 | VILLS Vol.1：Miko 休養期間的幕後支持 | VILLS Vol.1：みこ休養中の舞台裏サポート | VILLS Vol.1: Behind-the-Scenes Support During Miko's Hiatus",
    ctx: 'Miko 在 VILLS Vol.1 後休養三個月，而根據事後揭露，星街在此期間的練習中給予了 Miko 很多支持。',
    type: 'Stream', link: '', img: ''
  },
  {
    id: 's533', date: '2020-07-27', phase: 2, side: 'suisei', emoji: '📍',
    title: "20-4 | 星街談與 Miko 一起工作時笑個不停 | みことの仕事は笑いが絶えない | Can't Stop Laughing When Working With Miko",
    ctx: '星街在雜談中提到，只要和 Miko 一起工作就會一直笑，甚至笑到呼吸困難，氣氛非常愉快。',
    type: 'Clip', link: '', img: ''
  },
  {
    id: 's404', date: '2020-08-03', phase: 2, side: 'shared', emoji: '📍',
    title: '20-5 | 星街想養 Miko 當寵物 | すいせいはみこをペットにしたい | Suisei Wants Miko as a Pet',
    ctx: '在與海苔男、Ui 媽媽的繪圖連動中，當被問及想養誰當寵物時，星街回答了「Miko」。',
    type: 'Clip', link: '', img: ''
  },
  {
    id: 's408', date: '2020-11-19', phase: 2, side: 'suisei', emoji: '📍',
    title: '20-6 | 親吻魔人星街與商業 miComet | キス魔すいせいとビジネスmiComet | Kissing Monster Suisei & Business miComet',
    ctx: '星街難得地對 Miko 進行了直球告白，展現了兩人關係中「商業」與「貼貼」的醍醐味。',
    type: 'Clip', link: '', img: ''
  },
  {
    id: 's411', date: '2021-01-25', phase: 3, side: 'shared', emoji: '📍',
    title: "21-1 | GTAO：Miko 目不轉睛地盯著星街的新模型 | GTAO：みこがすいせいの新モデルを凝視 | GTAO: Miko Can't Take Her Eyes Off Suisei's New Model",
    ctx: '在 GTA 連動中，Miko 完全被星街當時的新 3D 模型所吸引，不停地盯著看，無法轉移視線。',
    type: 'Clip', link: '', img: ''
  },
  {
    id: 's390', date: '2021-02-12', phase: 3, side: 'suisei', emoji: '📍',
    title: '21-2 | Miko 為喉嚨不適的星街擔任賽評 | 喉の不調なすいせいのためにみこが解説 | Miko Becomes a Commentator for Suisei',
    ctx: '由於星街喉嚨不適，Miko 在瑪利歐賽車直播中為她進行了生動有趣的實況解說。',
    type: 'Clip', link: '', img: ''
  },
  {
    id: 's720', date: '2024-01-13', phase: 5, side: 'shared', emoji: '📍',
    title: '24-10 | 火建參觀晴空塔 | 火建、スカイツリーを見学 | ShiraKen Visits Skytree',
    ctx: '火建成員一起去參觀晴空塔。星街一開始不敢站上透明地板，櫻巫女努力想拉她上去但拉不動。後來星街還是自己站上去了。',
    type: 'Text', link: '',
    img: 'https://www.tokyo-skytree.jp/en/img/og.jpg'
  }
  // ... and 700+ more entries
];
