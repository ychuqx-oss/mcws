import timelineData from './timeline.json';
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

function normalizeZhText(value?: string) {
  if (!value) return value;
  return value
    .replace(/咪口/g, 'Miko')
    .replace(/35/g, 'Miko')
    .replace(/米子/g, 'Miko')
    .replace(/巫女/g, 'Miko')
    .replace(/彗醬/g, '星街')
    .replace(/星街彗星/g, '星街')
    .replace(/櫻巫女/g, 'Miko')
    .replace(/さくらみこ/g, 'Miko')
    .replace(/みこち/g, 'Miko')
    .replace(/すいちゃん/g, '星街')
    .replace(/星街すいせい/g, '星街')
    .replace(/スイセイ/g, '星街')
    .replace(/\bsuisei\b/gi, '星街')
    .replace(/Suisei/g, '星街')
    .replace(/Mikochi/g, 'Miko')
    .replace(/英文熟肉：/g, '')
    .replace(/日文切り抜き：/g, '')
    .replace(/日文手描き：/g, '手描き：')
    .replace(/原直播：/g, '直播：')
    .replace(/剪輯 \| YT：/g, '')
    .replace(/直播 \| YT：/g, '')
    .replace(/，YT：/g, '。YT：')
    .replace(/！！！！！/g, '！')
    .replace(/www/g, '')
    .replace(/ｗ/g, '')
    .replace(/  +/g, ' ')
    .trim();
}

function cleanup2021Title(story: MiCometStory, currentTitle?: string) {
  if (!story.date.startsWith('2021-')) return currentTitle;
  const raw = `${story.title} ${story.titleZh ?? ''} ${story.ctx} ${story.ctxZh ?? ''}`;

  if (/First Elytra/i.test(raw)) return 'Miko 送給星街第一副鞘翅';
  if (/Kanata and Rushia|カナタとルシア/i.test(raw)) return 'Kanata 與 Rushia 在聊天欄放閃，miComet 也跟著互動';
  if (/Jump Scares|jump scare|ジャンプ/i.test(raw)) return 'Miko 被星街的驚嚇演出逗到大笑';
  if (/Minecraft Usaken Festival/i.test(raw) && /Day 1|第一天/.test(raw)) return '兔建夏祭第一天：miComet 經營鬼屋並約會';
  if (/Minecraft Usaken Festival/i.test(raw) && /Day 2|第二天/.test(raw)) return '兔建夏祭第二天：miComet 再次經營鬼屋並約會';
  if (/14-minute Clip|Summer Festival First Night/i.test(raw)) return '兔建夏祭第一夜 miComet 精華';
  if (/miComet Summer|Afterdate|アフターデート/i.test(raw)) return '夏祭約會：miComet 逛遍各個攤位';
  if (/Sui-chan.*Sora-chan|そらちゃん|星街猜測是否/i.test(raw)) return '星街猜 Miko 說的是「すいちゃん」還是「そらちゃん」';
  if (/Super Bunny Man/i.test(raw)) return 'miComet《Super Bunny Man》聯動';
  if (/Chitchat/i.test(raw) && /Miko|Miko|miComet/i.test(raw)) return '星街雜談：聊到 Miko 與 miComet 的關係';
  if (!currentTitle || currentTitle === 'Miko' || currentTitle === '星街' || currentTitle.length <= 3) {
    const fallback = normalizeZhText(story.ctxZh || story.ctx || story.title);
    return fallback?.split(/[。\n]/)[0]?.slice(0, 42) || currentTitle;
  }

  return currentTitle;
}

function normalizeStory(story: MiCometStory): MiCometStory {
  const titleZh = cleanup2021Title(story, normalizeZhText(story.titleZh || story.title));
  const ctxZh = normalizeZhText(story.ctxZh || story.ctx);

  return {
    ...story,
    titleZh,
    ctxZh,
  };
}

function duplicateKey(story: MiCometStory) {
  const linkKey = story.link || `${story.ctx} ${story.ctxZh ?? ''}`.match(/https?:\/\/\S+/)?.[0];
  if (linkKey) return `link:${linkKey}`;

  const text = `${story.title} ${story.titleZh ?? ''} ${story.ctx} ${story.ctxZh ?? ''}`;
  if (story.date.startsWith('2021-')) {
    if (/Kanata and Rushia|カナタとルシア/i.test(text)) return `${story.date}:kanata-rushia-micomet-chat`;
    if (/Jump Scares|jump scare|ジャンプ/i.test(text)) return `${story.date}:suisei-jump-scare-miko`;
    if (/Minecraft Usaken Festival|Summer Festival|兔建夏祭/i.test(text)) return `${story.date}:usaken-summer-festival:${story.type}`;
  }

  return `id:${story.id}`;
}

function normalizeAndMergeStories(stories: MiCometStory[]) {
  const seen = new Set<string>();
  return stories.map(normalizeStory).filter((story) => {
    const key = duplicateKey(story);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export const MICOMET_TIMELINE: MiCometStory[] = normalizeAndMergeStories([
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
