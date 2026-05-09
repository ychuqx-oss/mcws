import { TIMELINE_DATA } from './miCometTimeline';

export interface InternationalizedString {
  zh: string;
  ja: string;
  en: string;
}

export interface Phase {
  id: number | string;
  label: InternationalizedString;
  period: string;
  color: string;
  bg: string;
  desc: InternationalizedString;
}

export interface TimelineItem {
  id: string;
  date: string;
  phase: number | string;
  side: 'miko' | 'suisei' | 'shared';
  emoji: string;
  title: InternationalizedString;
  ctx: InternationalizedString;
  type: string;
  link: string;
  platform?: string;
  pov?: string;
  directLink?: string;
}

export const PHASES: Phase[] = [
  {
    id: 1, label: { zh: '真‧商業夥伴', ja: '真のビジネスパートナー', en: 'True Business Partners' },
    period: '2019 — 2020',
    color: '#FFB0CC',
    bg: 'rgba(255,176,204,0.10)',
    desc: { 
      zh: '從卡片戰士工商開始，組合名「miComet」正式確立。兩人從工作關係出發，私下的超市購物、通宵聊天，悄悄累積著不只是商業的溫度。',
      ja: 'カードファイト!! ヴァンガードのコラボから、ユニット名「miComet」が正式に確立。二人は仕事関係から始まり、プライベートでのスーパーマーケットの買い物や徹夜のおしゃべりを通じて、ビジネスだけではない温かさを静かに育んでいきました。',
      en: 'Starting with the Cardfight!! Vanguard collaboration, the unit name "miComet" was officially established. The two started from a professional relationship, but through private supermarket shopping trips and all-night chats, they quietly built a warmth that went beyond just business.'
    }
  },
  {
    id: 2, label: { zh: '星街寵溺，咪口畏縮', ja: '星街の甘やかし、みこの戸惑い', en: 'Suisei\'s Doting, Miko\'s Shrinking' },
    period: '2021 上半年',
    color: '#D9679A',
    bg: 'rgba(217,103,154,0.10)',
    desc: {
      zh: '星街開始積極展現對咪口的溫柔，頂著沙啞的喉嚨來凸待，用棉花糖企劃在問卷裡寫下咪口的名字。咪口則受寵若驚、有點畏縮。',
      ja: '星街はみこへの優しさを積極的に示し始め、嗄れた喉で凸待ちに参加したり、マシュマロ企画のアンケートにみこの名前を書いたりしました。一方、みこは甘やかされて戸惑い、少し縮こまっていました。',
      en: 'Suisei began to actively show her affection for Miko, joining her "totsumachi" (call-in stream) with a hoarse voice and writing Miko\'s name in a questionnaire for a Marshmallow (Q&A) project. Miko, in turn, was overwhelmed by the affection and somewhat timid.'
    }
  },
  {
    id: 3, label: { zh: '商業梗街段', ja: 'ビジネスネタの時代', en: 'The "Business" Joke Era' },
    period: '2021 夏',
    color: '#C08030',
    bg: 'rgba(192,128,48,0.08)',
    desc: {
      zh: '夏祭鬼屋約定、後夜祭 OX 問答、冰船約會 ——「商業朋友」這個詞，開始成為兩人之間甜蜜的默契暗號。',
      ja: '夏祭りのホーンテッドハウスの約束、後夜祭のOXクイズ、氷のボートデート——「ビジネスフレンド」という言葉が、二人の間の甘い合言葉になり始めました。',
      en: 'The Summer Festival haunted house promise, the post-festival OX quiz, the ice boat date—the term "business friends" started to become a sweet, secret code between them.'
    }
  },
  {
    id: 4, label: { zh: '咪口謹慎，星街表態', ja: 'みこの慎重、星街の表明', en: 'Miko\'s Caution, Suisei\'s Declaration' },
    period: '2021 下半年',
    color: '#8855CC',
    bg: 'rgba(136,85,204,0.08)',
    desc: {
      zh: '整夜通話、Mario Kart 守護、Sololive 前的 Twitter 互動——星街越來越坦率，咪口則小心翼翼地確認著這份關係。',
      ja: '徹夜通話、マリオカートでの守護、ソロライブ前のTwitterでのやり取り——星街はますます率直になり、みこは慎重にこの関係を確認していました。',
      en: 'All-night calls, protecting each other in Mario Kart, Twitter interactions before Suisei\'s solo live—Suisei became more and more frank, while Miko cautiously tried to confirm the nature of their relationship.'
    }
  },
  {
    id: 5, label: { zh: '咪口開始敢表達', ja: 'みこ、表現し始める', en: 'Miko Starts to Express Herself' },
    period: '2022 初',
    color: '#4A90C8',
    bg: 'rgba(74,144,200,0.08)',
    desc: {
      zh: 'Animal 封面 MV、Raft 馬拉松、公寓鄰居計畫 ——「Business Teetee」的外殼下，是兩人都開始主動靠近的心。',
      ja: '「Animal」のカバーMV、Raftのマラソン配信、アパートの隣人計画——「ビジネてぇてぇ」の仮面の下で、二人とも積極的に近づき始めていました。',
      en: 'The "Animal" cover MV, the Raft marathon stream, the apartment neighbor plan—under the guise of "Business Teetee," both were starting to proactively get closer.'
    }
  },
  {
    id: 6, label: { zh: '每日任務階段', ja: 'デイリーミッションの段階', en: 'The Daily Mission Phase' },
    period: '2022 春夏',
    color: '#3A883A',
    bg: 'rgba(58,136,58,0.07)',
    desc: {
      zh: '幾乎每天出現在彼此的直播、推特和聊天室。「偶然」的同時上線越來越難說是巧合。',
      ja: 'ほぼ毎日お互いの配信、ツイッター、チャットルームに登場。「偶然」の同時ログインが、もはや偶然とは言えないほどになってきました。',
      en: 'Appearing in each other\'s streams, Twitter feeds, and chat rooms almost daily. The "coincidental" simultaneous logins became too frequent to be called a coincidence.'
    }
  },
  {
    id: 7, label: { zh: '小秘密謎語人', ja: '小さな秘密の謎かけ', en: 'Riddles of Little Secrets' },
    period: '2022 夏秋',
    color: '#B06020',
    bg: 'rgba(176,96,32,0.07)',
    desc: {
      zh: 'USJ 旅行、露營計畫、兩人之間的小秘密逐漸增多，笑點只有彼此懂，圍觀者只能微笑旁觀。',
      ja: 'USJ旅行、キャンプ計画、二人の間の小さな秘密が次第に増え、笑いのツボはお互いだけが分かり、周りはただ微笑んで見守るしかありませんでした。',
      en: 'The USJ trip, camping plans, the little secrets between them grew more numerous. They shared inside jokes that only they understood, while onlookers could only smile and watch.'
    }
  },
  {
    id: 8, label: { zh: '假借商業之名大曬', ja: 'ビジネスを名目に大放閃', en: 'Blatant Affection Under the Guise of Business' },
    period: '2022 秋冬',
    color: '#D9679A',
    bg: 'rgba(217,103,154,0.08)',
    desc: {
      zh: '周圍的人終於可以公開戳了——兩人照樣掛著「商業」的名牌，卻毫不掩飾地秀恩愛。',
      ja: '周りの人々もついに公然と指摘できるようになりました——二人は相変わらず「ビジネス」の名札を掲げながらも、隠すことなく愛情を振りまいていました。',
      en: 'People around them could finally openly point it out—the two continued to wear the "business" label while shamelessly displaying their affection.'
    }
  },
  {
    id: 9, label: { zh: '控糖大方供給', ja: '甘々の供給', en: 'Generous Supply of Sweetness' },
    period: '2023 至今',
    color: '#C8A8F0',
    bg: 'rgba(200,168,240,0.10)',
    desc: {
      zh: '不再需要藉口，也不需要解釋，miComet 就是 miComet。「彗醬想去哪裡呢？沒有想去的地方，也不知道有什麼地方，只是來看妳的。」',
      ja: 'もはや言い訳も説明も不要、miCometはmiCometです。「すいちゃんはどこに行きたいの？行きたい場所なんてないよ。どこに何があるかも知らない。ただ、君に会いに来ただけ。」',
      en: 'No longer needing excuses or explanations, miComet is just miComet. "Where does Suichan want to go? I don\'t have a place in mind, and I don\'t know what\'s out there. I just came to see you."'
    }
  },
];

export const TIMELINE: TimelineItem[] = TIMELINE_DATA;

export const fetchTimeline = async () => {
  return TIMELINE;
}

export const TYPE_NAMES: { [key: string]: InternationalizedString } = {
  'Stream': { zh: '直播', ja: '配信', en: 'Stream' },
  'Clip': { zh: '切片', ja: '切り抜き', en: 'Clip' },
  'Text': { zh: '推文', ja: 'ツイート', en: 'Tweet' },
  'Audio': { zh: '音頻', ja: '音声', en: 'Audio' }
};