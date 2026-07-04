import timelineData from './timeline.json';
import timeline2020PttBbqData from './timeline-2020-ptt-bbq.json';
import timeline2022PttBbqData from './timeline-2022-ptt-bbq.json';
import timeline2022OctoberBbqData from './timeline-2022-october-bbq.json';
import timeline2020AutumnBbqData from './timeline-2020-autumn-bbq.json';
import timeline2022BbqData from './timeline-2022-bbq.json';
import timeline2023EarlyBbqData from './timeline-2023-early-bbq.json';
import timeline2023SpringBbqData from './timeline-2023-spring-bbq.json';
import timeline2023EarlySummerBbqData from './timeline-2023-early-summer-bbq.json';
import timeline2023LateSummerBbqData from './timeline-2023-late-summer-bbq.json';
import timeline2023AutumnBbqData from './timeline-2023-autumn-bbq.json';
import timeline2023OctoberBbqData from './timeline-2023-october-bbq.json';
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

const SOURCE_RE = /(youtube\.com|youtu\.be|x\.com|twitter\.com|holodex\.net|ptt\.cc|pttweb\.cc|disp\.cc|moptt\.tw|fandom\.com|imgur\.com|meee\.com|note\.com|4gamers\.com|hololive|cover-corp|bushiroad|weiss|ws-tcg)/i;

function rawText(story: MiCometStory) {
  return `${story.title} ${story.titleZh ?? ''} ${story.titleJa ?? ''} ${story.ctx} ${story.ctxZh ?? ''} ${story.ctxJa ?? ''} ${story.link ?? ''}`;
}

function extractUrls(value: string) {
  return Array.from(new Set(value.match(/https?:\/\/\S+/g) ?? []));
}

function hasExternalSource(story: MiCometStory) {
  const sourceText = [story.link, ...extractUrls(rawText(story))].filter(Boolean).join(' ');
  return SOURCE_RE.test(sourceText);
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
    .replace(/Ranch Simulator/gi, '牧場模擬器')
    .replace(/Nintendo Switch Sports/gi, '運動遊戲')
    .replace(/Super Bunny Man|スーパーバニーマン/gi, '超級兔人')
    .replace(/Surgeon Simulator 2?/gi, '醫療模擬')
    .replace(/Grand Theft Auto|GTA/gi, '俠盜獵車手')
    .replace(/AmongUs|Among Us/gi, '太空狼人殺')
    .replace(/Animal|アニマル/g, '動物')
    .replace(/Business/gi, '商業')
    .replace(/original stream/gi, '原直播')
    .replace(/stream/gi, '直播')
    .replace(/clip/gi, '剪輯')
    .replace(/shorts?/gi, '短片')
    .replace(/English-subtitled/gi, '')
    .replace(/Japanese/gi, '')
    .replace(/hand-drawn|手描き/gi, '手繪')
    .replace(/mocopi/gi, '動作捕捉')
    .replace(/Hololive|hololive/g, 'Hololive');
}

function stripForeignNoise(value: string) {
  return value
    .replace(/https?:\/\/\S+/g, '')
    .replace(/YouTube[:：]?|YT[:：]?|Twitter[:：]?|X[:：]?/gi, '')
    .replace(/[ぁ-ゖァ-ヺー]+/g, '')
    .replace(/\b(?:Japanese|English|clip|stream|shorts|summary|moment|hilarious|funny|original|source|compilation|with|from|and|the|too|very)\b/gi, '')
    .replace(/\s{2,}/g, ' ')
    .replace(/^[：:｜|、，。\s]+|[：:｜|、，。\s]+$/g, '')
    .trim();
}

function cleanUiText(value?: string) {
  return stripForeignNoise(translateCommonTerms(normalizeNames(value))).trim();
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

function isBadTitle(value: string) {
  return !value || value.length <= 3 || /[ぁ-ゖァ-ヺー]/.test(value) || /\b(?:Japanese|English|clip|stream|shorts|source)\b/i.test(value);
}

function resolveTitle(story: MiCometStory) {
  const preferred = cleanUiText(story.titleZh || story.title || story.ctxZh || story.ctx);
  const title = isBadTitle(preferred) ? genericTitle(story) : preferred;
  if (/^(看到|聽到|發現|玩|唱|跳|談|提到|表示)/.test(title)) {
    if (story.side === 'miko') return `Miko ${title}`;
    if (story.side === 'suisei') return `星街 ${title}`;
    return `miComet ${title}`;
  }
  return title;
}

function resolveContext(story: MiCometStory, titleZh: string) {
  const cleaned = cleanUiText(story.ctxZh || story.ctx || '')
    .replace(/^來源[為是]?[：:]?/g, '')
    .replace(/^剪輯[：:]?/g, '')
    .replace(/^直播[：:]?/g, '')
    .replace(/。?補充來源.*$/g, '')
    .trim();
  if (!cleaned || cleaned.length < 8) return `${titleZh}。外部來源已保留，重複故事已合併。`;
  return cleaned.endsWith('。') ? cleaned : `${cleaned}。`;
}

function normalizeStory(story: MiCometStory): MiCometStory {
  const titleZh = resolveTitle(story);
  const ctxZh = resolveContext(story, titleZh);
  return { ...story, titleZh, ctxZh };
}

function duplicateKey(story: MiCometStory) {
  const year = Number(story.date.slice(0, 4));
  if (year >= 2019 && year <= 2026) return `${story.date}:${story.side}`;
  const firstUrl = story.link || extractUrls(rawText(story))[0];
  return firstUrl ? `url:${firstUrl}` : `id:${story.id}`;
}

function mergeDuplicateStory(base: MiCometStory, extra: MiCometStory): MiCometStory {
  const baseRaw = rawText(base);
  const extraUrls = [extra.link, ...extractUrls(rawText(extra))]
    .filter((url): url is string => Boolean(url))
    .filter((url) => !baseRaw.includes(url));
  const uniqueUrls = Array.from(new Set(extraUrls)).slice(0, 12);
  if (!uniqueUrls.length) return base;
  return {
    ...base,
    ctx: `${base.ctx} 補充來源：${uniqueUrls.join(' / ')}`,
    ctxZh: `${base.ctxZh ?? base.ctx}補充來源已合併。`,
  };
}

function normalizeAndMergeStories(stories: MiCometStory[]) {
  const map = new Map<string, MiCometStory>();
  stories
    .filter(hasExternalSource)
    .map(normalizeStory)
    .forEach((story) => {
      const key = duplicateKey(story);
      const current = map.get(key);
      map.set(key, current ? mergeDuplicateStory(current, story) : story);
    });
  return [...map.values()];
}

export const MICOMET_TIMELINE: MiCometStory[] = normalizeAndMergeStories([
  ...(timeline2020PttBbqData as MiCometStory[]),
  ...(timeline2022PttBbqData as MiCometStory[]),
  ...(timeline2022OctoberBbqData as MiCometStory[]),
  ...(timelineData as MiCometStory[]),
  ...(timeline2020AutumnBbqData as MiCometStory[]),
  ...(timeline2022BbqData as MiCometStory[]),
  ...(timeline2023EarlyBbqData as MiCometStory[]),
  ...(timeline2023SpringBbqData as MiCometStory[]),
  ...(timeline2023EarlySummerBbqData as MiCometStory[]),
  ...(timeline2023LateSummerBbqData as MiCometStory[]),
  ...(timeline2023AutumnBbqData as MiCometStory[]),
  ...(timeline2023OctoberBbqData as MiCometStory[]),
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
