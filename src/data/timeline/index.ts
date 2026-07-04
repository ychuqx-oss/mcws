import timelineData from './timeline.json';
import timeline2022BbqData from './timeline-2022-bbq.json';

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

export const MICOMET_TIMELINE: MiCometStory[] = [
  ...(timelineData as MiCometStory[]),
  ...(timeline2022BbqData as MiCometStory[]),
].sort((a, b) => {
  const dateCompare = a.date.localeCompare(b.date);
  if (dateCompare !== 0) return dateCompare;
  return a.id.localeCompare(b.id, undefined, { numeric: true });
});
