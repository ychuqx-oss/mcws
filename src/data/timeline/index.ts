import timelineData from './timeline.json';
import timeline2020PttBbqData from './timeline-2020-ptt-bbq.json';
import timeline2022PttBbqData from './timeline-2022-ptt-bbq.json';
import timeline2020AutumnBbqData from './timeline-2020-autumn-bbq.json';
import timeline2022BbqData from './timeline-2022-bbq.json';
import timeline2023EarlyBbqData from './timeline-2023-early-bbq.json';
import timeline2023SpringBbqData from './timeline-2023-spring-bbq.json';
import timeline2023EarlySummerBbqData from './timeline-2023-early-summer-bbq.json';
import timeline2023LateSummerBbqData from './timeline-2023-late-summer-bbq.json';
import timeline2023AutumnBbqData from './timeline-2023-autumn-bbq.json';
import timeline2023WinterBbqData from './timeline-2023-winter-bbq.json';
import timeline2024BbqData from './timeline-2024-bbq.json';
import timeline2024SpringBbqData from './timeline-2024-spring-bbq.json';
import timeline2024EarlySummerBbqData from './timeline-2024-early-summer-bbq.json';
import timeline2024LateSummerBbqData from './timeline-2024-late-summer-bbq.json';
import timeline2024AutumnBbqData from './timeline-2024-autumn-bbq.json';
import timeline2024WinterBbqData from './timeline-2024-winter-bbq.json';
import timeline2026EarlySummerBbqData from './timeline-2026-early-summer-bbq.json';

export interface MiCometStory {
  id: string;
  displayId?: string;
  date: string;
  phase: number;
  side: 'miko' | 'suisei' | 'shared' | 'others';
  emoji: string;
  title: string;
  titleZh?: string;
  titleJa?: string;
  ctx: string;
  ctxZh?: string;
  ctxJa?: string;
  type: string;
  link?: string;
}

type TitleRule = {
  test: RegExp;
  title: string;
  ctx?: string;
};

const TITLE_RULES: TitleRule[] = [
  { test: /1130085765029826560|串門子/, title: '星街早期串門子推文，成為 miComet 早期互動線索' },
  { test: /kYsY8ZTcotc|雪山人狼|金斧/, title: '星街提到與 Miko 練習雪山人狼' },
  { test: /Vanguard ZERO|先導者|工商|PAj_4vs2m-o|KPo5vaoe1Vo/, title: 'Vanguard ZERO 工商與復仇戰，逐漸形成 miComet 名稱脈絡' },
  { test: /AsaCoco|早安 Holo|生日快樂/, title: '早安 Holo 由星街播出，祝 Miko 生日快樂' },
  { test: /サクラカゼ|Sakura Kaze|第二張單曲/, title: '星街幫忙宣傳 Miko 第二張單曲' },
  { test: /VILLS|笑.*停不下來|lp1DnxdKfIA|CEiN9AAkR6Y/, title: '星街雜談：與 Miko 練習 VILLS 時笑到停不下來' },
  { test: /miComet.*C|C 要大寫|lwszUzu_ARc|怨靈|怨霊/, title: '星街宣布與 Miko 的組合名稱決定為 miComet，C 要大寫' },
  { test: /rW32DH_rH-E|nbQNvhr19nU|寵物|繪師聯動/, title: '繪師聯動畫 Miko：星街說想養 Miko 當寵物' },
  { test: /HX7vTcI|長休|宣布回歸/, title: 'Miko 宣布結束長休，星街送上祝福' },
  { test: /15IpFst|回歸 Live|繼續.*miComet/, title: 'Miko 回歸 Live：之後還要繼續 miComet' },
  { test: /QiQtiNK7jWw|m9K167jBLJo|大運動會|運動會前|Sports Festival/, title: 'Hololive 麥塊大運動會前練習，留下早期 miComet 互動來源' },
  { test: /Minecraft|マインクラフト|麥塊|ホロ鯖/, title: 'Miko 與星街的麥塊互動故事' },
  { test: /GTA|Grand Theft Auto|俠盜/, title: 'miComet 的 GTA 聯動與互動故事' },
  { test: /Monster Hunter|魔物獵人|モンハン/, title: 'Miko 與星街的魔物獵人聯動故事' },
  { test: /Fire Construction|Shiraken|火建|不知火建設/, title: '火建活動中的 Miko 與星街互動' },
  { test: /First Elytra|鞘翅|エリトラ/, title: 'Miko 送給星街第一副鞘翅' },
  { test: /鬼屋|お化け屋敷|haunted house/, title: 'Miko 蓋鬼屋，星街加入互動' },
  { test: /大空警察|Officer Subaru|Interrogation/, title: '大空警察審問 miComet 的商業夥伴罪行' },
  { test: /Mario Kart|マリオカート|馬車杯|0UIcSapvl9M/, title: 'miComet 的瑪利歐賽車練習與比賽互動' },
  { test: /Super Bunny Man|スーパーバニーマン|超級兔人/, title: 'miComet 的超級兔人聯動' },
  { test: /VARK/, title: 'miComet VARK 共演與後續回顧' },
  { test: /Stellar Stellar|GHOST|駆けろ|レイニー|mTRv4YApXh8/, title: 'Miko 談自己喜歡星街的歌，並唱星街的歌曲' },
  { test: /9yBLZKFKXyg|アニマル|Animal/, title: 'miComet 合唱曲《動物》公開，成為兩人第一首合唱曲' },
  { test: /Raft|IJFb5BqQUTg/, title: 'miComet 木筏求生聯動，只有星街視點並充滿商業互動' },
  { test: /Us1KDp3w8IM|誕生日|生日 Live|約束|UrOvtpGoW5s/, title: 'Miko 生日 Live 與星街來賓回顧，延伸到 miComet 合唱與商業梗' },
  { test: /EXPO|裁判所|ElDVor7UmSE/, title: 'Hololive EXPO 法庭節目，延伸 miComet 商業貼貼梗' },
  { test: /灼熱|Shakunetsu|UQ8oyDu08-0/, title: '星街擔心新曲又被 Miko 搶走變成 Miko 的歌' },
  { test: /Surgeon Simulator|Dr\.miComet|ZmIY2kP/, title: 'Dr.miComet 醫療模擬聯動直播' },
  { test: /壁ドン|kabedon|3vXDA4bprI0/, title: '星街想壁咚 Miko 卻失敗，還被嫌棄' },
  { test: /HoloCure|ホロキュア|MiComet Collab/, title: 'HoloCure 裡的 miComet 聯動反應' },
  { test: /年末ホロライブ|ゆくホロくるホロ|8ysl5INNWjE|6C8cH9114dI/, title: '年末 Hololive 節目中的 miComet 相關片段' },
  { test: /mocopi|Nintendo Switch Sports|lQojdq6KdsE/, title: 'miComet 使用動作捕捉遊玩運動遊戲' },
  { test: /1ブロ|One Block|K5XLFq8XTX4/, title: '1 Block miComet：兩人靠商業力量一起生存' },
  { test: /ReGLOSS|l1GxSWH5glk|Bv09uCbDimQ|896inFcI2yg|2YZ4XzJF0xA|_baN-3CnuUw|Nh-L-TrCkk0/, title: 'miComet 同時視聽 ReGLOSS 初配信' },
  { test: /Wario|ワリオ|メイドインワリオ|QVjy6dkw4HE|Ez9Z4KxXEBg|NUAKC74CCRM|hmhrDdEO2Ow|YzA7hVN1As0|1E5Ot69zKI0|qS1jL5N-N7M|AaLSN-RHvWg|ytiYjpmdah4|qBpOop6-hsA/, title: 'miComet 玩瓦利歐製造，動作捕捉變成爆笑回' },
  { test: /すいせい列車|星街列車|dpPNQOrS5Dk|WHG5XxJz75k/, title: '手繪短片：星街列車咻咻咻' },
  { test: /JOYSOUND|卡拉OK/, title: 'miComet 卡拉 OK 聯名活動' },
  { test: /旅行|trip|海外|international/, title: 'miComet 相關旅行與線下互動話題' },
];

function rawText(story: MiCometStory) {
  return `${story.title} ${story.titleZh ?? ''} ${story.titleJa ?? ''} ${story.ctx} ${story.ctxZh ?? ''} ${story.ctxJa ?? ''} ${story.link ?? ''}`;
}

function extractUrls(value: string) {
  return Array.from(new Set(value.match(/https?:\/\/\S+/g) ?? []));
}

function normalizeNames(value?: string) {
  if (!value) return '';
  return value
    .replace(/星街彗星|星街すいせい|すいちゃん|スイセイ|彗醬|彗星|\bSuisei\b|\bsuisei\b/gi, '星街')
    .replace(/櫻巫女|さくらみこ|みこち|咪口|美子|米子|巫女|\bMikochi\b/gi, 'Miko')
    .replace(/\b35\b/g, 'Miko')
    .replace(/みこめっと|ミコメット/gi, 'miComet')
    .replace(/MiComet/g, 'miComet');
}

function translateCommonTerms(value: string) {
  return value
    .replace(/Minecraft|マインクラフト|麥塊/gi, '麥塊')
    .replace(/Mario Kart|マリオカート/gi, '瑪利歐賽車')
    .replace(/WarioWare|メイドインワリオ|ワリオ/gi, '瓦利歐製造')
    .replace(/Nintendo Switch Sports/gi, '運動遊戲')
    .replace(/Super Bunny Man|スーパーバニーマン/gi, '超級兔人')
    .replace(/Surgeon Simulator 2?/gi, '醫療模擬')
    .replace(/Grand Theft Auto|GTA/gi, '俠盜獵車手')
    .replace(/AmongUs|Among Us/gi, '太空狼人殺')
    .replace(/HoloCure|ホロキュア/gi, 'HoloCure')
    .replace(/Animal|アニマル/g, '動物')
    .replace(/Stellar Stellar/g, '星街代表曲')
    .replace(/Business/gi, '商業')
    .replace(/original stream/gi, '原直播')
    .replace(/stream/gi, '直播')
    .replace(/clip/gi, '剪輯')
    .replace(/shorts?/gi, '短片')
    .replace(/English-subtitled/gi, '')
    .replace(/Japanese/gi, '')
    .replace(/ENsub/gi, '')
    .replace(/hand-drawn|手描き/gi, '手繪')
    .replace(/mocopi/gi, '動作捕捉')
    .replace(/ReGLOSS/g, 'ReGLOSS')
    .replace(/Hololive|hololive/g, 'Hololive');
}

function removeForeignNoise(value: string) {
  return value
    .replace(/https?:\/\/\S+/g, '')
    .replace(/YouTube[:：]?|YT[:：]?|Twitter[:：]?|X[:：]?/gi, '')
    .replace(/[^\S\r\n]+/g, ' ')
    .replace(/[ぁ-ゖァ-ヺー]+/g, '')
    .replace(/\b[A-Za-z]{4,}\b/g, (word) => {
      if (/^(Miko|miComet|Hololive|HoloCure|ReGLOSS|VILLS|ARK|Aqua|Subaru|Marine|Kanata|Fubuki|Haachama|Roboco|Noel|Sora|Mio|Aki|Towa|Flare|Polka|Lui|Chihaya|JOYSOUND)$/.test(word)) return word;
      return '';
    })
    .replace(/[「」『』【】\[\]()（）]+$/g, '')
    .replace(/^[：:｜|、，。\s]+|[：:｜|、，。\s]+$/g, '')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

function normalizeUiText(value?: string) {
  return removeForeignNoise(translateCommonTerms(normalizeNames(value))).replace(/！！+/g, '！');
}

function isBadChineseTitle(value: string) {
  if (!value) return true;
  if (/[ぁ-ゖァ-ヺー]/.test(value)) return true;
  if (/\b(?:Japanese|English|clip|stream|shorts|summary|moment|hilarious|funny|original|source|compilation)\b/i.test(value)) return true;
  if (value.length <= 3) return true;
  return false;
}

function genericTitle(story: MiCometStory) {
  if (story.side === 'miko') return 'Miko 與星街的互動故事';
  if (story.side === 'suisei') return '星街與 Miko 的互動故事';
  if (story.side === 'others') return '其他成員提及或助攻 miComet';
  if (story.type === 'Music') return 'miComet 音樂相關故事';
  if (story.type === 'Stream') return 'miComet 聯動直播故事';
  if (story.type === 'Clip') return 'miComet 互動剪輯故事';
  return 'miComet 共同故事';
}

function resolveTitle(story: MiCometStory) {
  const raw = rawText(story);
  const rule = TITLE_RULES.find((item) => item.test.test(raw));
  if (rule) return rule.title;

  const preferred = normalizeUiText(story.titleZh || story.title || story.ctxZh || story.ctx);
  const titled = isBadChineseTitle(preferred) ? genericTitle(story) : preferred;

  if (/^(看到|聽到|發現|玩|唱|跳|談|提到|表示)/.test(titled)) {
    if (story.side === 'miko') return `Miko ${titled}`;
    if (story.side === 'suisei') return `星街 ${titled}`;
    if (story.side === 'shared') return `miComet ${titled}`;
  }

  return titled;
}

function resolveContext(story: MiCometStory, titleZh: string) {
  const raw = rawText(story);
  const rule = TITLE_RULES.find((item) => item.test.test(raw));
  if (rule?.ctx) return rule.ctx;

  const sourceText = normalizeUiText(story.ctxZh || story.ctx || '');
  const cleaned = sourceText
    .replace(/^來源[為是]?[：:]?/g, '')
    .replace(/^剪輯[：:]?/g, '')
    .replace(/^直播[：:]?/g, '')
    .replace(/。?補充來源.*$/g, '')
    .trim();

  if (!cleaned || /^(來源|剪輯|直播|文字)$/.test(cleaned) || cleaned.length < 8) {
    return `${titleZh}。來源連結已保留，重複故事已合併。`;
  }

  return cleaned.endsWith('。') ? cleaned : `${cleaned}。`;
}

function normalizeStory(story: MiCometStory): MiCometStory {
  const titleZh = resolveTitle(story);
  const ctxZh = resolveContext(story, titleZh);

  return {
    ...story,
    titleZh,
    ctxZh,
    title: story.title || titleZh,
    ctx: story.ctx || ctxZh,
  };
}

function duplicateKey(story: MiCometStory) {
  const year = Number(story.date.slice(0, 4));
  if (year >= 2019 && year <= 2026) {
    return `${story.date}:${story.side}`;
  }

  const firstUrl = story.link || extractUrls(rawText(story))[0];
  return firstUrl ? `url:${firstUrl}` : `id:${story.id}`;
}

function mergeDuplicateStory(base: MiCometStory, extra: MiCometStory): MiCometStory {
  const baseRaw = rawText(base);
  const extraUrls = [extra.link, ...extractUrls(rawText(extra))]
    .filter((url): url is string => Boolean(url))
    .filter((url) => !baseRaw.includes(url));
  const uniqueUrls = Array.from(new Set(extraUrls)).slice(0, 12);
  const sourceAppend = uniqueUrls.length ? ` 補充來源：${uniqueUrls.join(' / ')}` : '';

  return {
    ...base,
    ctx: `${base.ctx}${sourceAppend}`,
    ctxZh: sourceAppend ? `${base.ctxZh ?? base.ctx}補充來源已合併。` : base.ctxZh,
  };
}

function normalizeAndMergeStories(stories: MiCometStory[]) {
  const map = new Map<string, MiCometStory>();

  stories.map(normalizeStory).forEach((story) => {
    const key = duplicateKey(story);
    const current = map.get(key);
    map.set(key, current ? mergeDuplicateStory(current, story) : story);
  });

  return [...map.values()];
}

export const MICOMET_TIMELINE: MiCometStory[] = normalizeAndMergeStories([
  ...(timeline2020PttBbqData as MiCometStory[]),
  ...(timeline2022PttBbqData as MiCometStory[]),
  ...(timelineData as MiCometStory[]),
  ...(timeline2020AutumnBbqData as MiCometStory[]),
  ...(timeline2022BbqData as MiCometStory[]),
  ...(timeline2023EarlyBbqData as MiCometStory[]),
  ...(timeline2023SpringBbqData as MiCometStory[]),
  ...(timeline2023EarlySummerBbqData as MiCometStory[]),
  ...(timeline2023LateSummerBbqData as MiCometStory[]),
  ...(timeline2023AutumnBbqData as MiCometStory[]),
  ...(timeline2023WinterBbqData as MiCometStory[]),
  ...(timeline2024BbqData as MiCometStory[]),
  ...(timeline2024SpringBbqData as MiCometStory[]),
  ...(timeline2024EarlySummerBbqData as MiCometStory[]),
  ...(timeline2024LateSummerBbqData as MiCometStory[]),
  ...(timeline2024AutumnBbqData as MiCometStory[]),
  ...(timeline2024WinterBbqData as MiCometStory[]),
  ...(timeline2026EarlySummerBbqData as MiCometStory[]),
]).sort((a, b) => {
  const dateCompare = a.date.localeCompare(b.date);
  if (dateCompare !== 0) return dateCompare;
  return a.id.localeCompare(b.id, undefined, { numeric: true });
});
