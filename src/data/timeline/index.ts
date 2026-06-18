import timelineData from './timeline.json';

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

export const MICOMET_TIMELINE: MiCometStory[] = timelineData as MiCometStory[];
