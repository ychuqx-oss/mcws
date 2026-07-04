import timelineData from './timeline.json';
import timeline2022BbqData from './timeline-2022-bbq.json';
import timeline2023EarlyBbqData from './timeline-2023-early-bbq.json';
import timeline2023SpringBbqData from './timeline-2023-spring-bbq.json';
import timeline2023EarlySummerBbqData from './timeline-2023-early-summer-bbq.json';
import timeline2023LateSummerBbqData from './timeline-2023-late-summer-bbq.json';
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
    .replace(/彗醬/g, '星街')
    .replace(/星街彗星/g, '星街')
    .replace(/櫻巫女/g, 'Miko')
    .replace(/さくらみこ/g, 'Miko')
    .replace(/みこち/g, 'Miko')
    .replace(/すいちゃん/g, '星街')
    .replace(/星街すいせい/g, '星街')
    .replace(/\bsuisei\b/gi, '星街')
    .replace(/Suisei/g, '星街')
    .replace(/英文熟肉：/g, '')
    .replace(/日文切り抜き：/g, '')
    .replace(/日文手描き：/g, '手描き：')
    .replace(/原直播：/g, '直播：')
    .replace(/，YT：/g, '。YT：')
    .replace(/！！！！！/g, '！')
    .replace(/www/g, '')
    .replace(/ｗ/g, '')
    .replace(/  +/g, ' ')
    .trim();
}

function normalizeStory(story: MiCometStory): MiCometStory {
  return {
    ...story,
    titleZh: normalizeZhText(story.titleZh),
    ctxZh: normalizeZhText(story.ctxZh),
  };
}

export const MICOMET_TIMELINE: MiCometStory[] = [
  ...(timelineData as MiCometStory[]),
  ...(timeline2022BbqData as MiCometStory[]),
  ...(timeline2023EarlyBbqData as MiCometStory[]),
  ...(timeline2023SpringBbqData as MiCometStory[]),
  ...(timeline2023EarlySummerBbqData as MiCometStory[]),
  ...(timeline2023LateSummerBbqData as MiCometStory[]),
  ...(timeline2023WinterBbqData as MiCometStory[]),
  ...(timeline2024BbqData as MiCometStory[]),
  ...(timeline2024SpringBbqData as MiCometStory[]),
  ...(timeline2024EarlySummerBbqData as MiCometStory[]),
  ...(timeline2024LateSummerBbqData as MiCometStory[]),
  ...(timeline2024AutumnBbqData as MiCometStory[]),
  ...(timeline2024WinterBbqData as MiCometStory[]),
  ...(timeline2026EarlySummerBbqData as MiCometStory[]),
]
  .map(normalizeStory)
  .sort((a, b) => {
    const dateCompare = a.date.localeCompare(b.date);
    if (dateCompare !== 0) return dateCompare;
    return a.id.localeCompare(b.id, undefined, { numeric: true });
  });
