import timelineData from './timeline.json';
import timeline2020CleanData from './timeline-2020-clean.json';
import timeline2021CleanData from './timeline-2021-clean.json';
import timeline2022CleanData from './timeline-2022-clean.json';
import timeline2023CleanData from './timeline-2023-clean.json';
import timeline2024CleanData from './timeline-2024-clean.json';
import timeline2025CleanData from './timeline-2025-compendium';
import timeline2026CleanData from './timeline-2026-compendium';

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
  source?: string;
}

type Side = MiCometStory['side'];

function rawText(story: MiCometStory) {
  return `${story.title} ${story.titleZh ?? ''} ${story.ctx} ${story.ctxZh ?? ''} ${story.link ?? ''}`;
}

function normalizeMemberNames(value: string) {
  return value
    .replace(/星街彗星|星街すいせい|星町|小水|すいちゃん|スイセイ|彗醬|彗星|\bSuisei\b|\bsuisei\b/gi, '星街')
    .replace(/櫻巫女|さくらみこ|みこち|咪口|美子|米子|巫女|\bMikochi\b/gi, 'Miko')
    .replace(/みこめっと|ミコメット|MiComet/g, 'miComet')
    .replace(/白上フブキ|Shirakami Fubuki|\bFubuki\b/g, '白上吹雪')
    .replace(/大空スバル|Oozora Subaru|\bSubaru\b/gi, '大空昴')
    .replace(/大神ミオ|Ookami Mio|\bMio\b/gi, '大神澪')
    .replace(/不知火フレア|Shiranui Flare|\bFlare\b|耀斑/gi, '阿火')
    .replace(/鷹嶺ルイ|Takane Lui|\bLui\b/gi, '鷹嶺琉依')
    .replace(/角巻わため|Tsunomaki Watame|\bWatame\b/gi, '角卷綿芽');
}

function stripEditorialNotes(value: string) {
  return value
    .replace(/User-provided source list:.*$/gi, '')
    .replace(/Sources?:.*$/gi, '')
    .replace(/YouTube[:：]?|YT[:：]?|Twitter[:：]?|X[:：]?/gi, '')
    .replace(/PTT\s*編年史來源[。:：]?/g, '')
    .replace(/PTT chronology source\.?/gi, '')
    .replace(/編年史來源[。:：]?/g, '')
    .replace(/來源[:：][^。]*。?/g, '')
    .replace(/來源待補。?/g, '')
    .replace(/補充資料[^。]*。?/g, '')
    .replace(/保留[^。]*來源脈絡[^。]*。?/g, '')
    .replace(/不再使用機翻標題。?/g, '')
    .replace(/舊資料中的英文剪輯標題與殘缺連結已整理為正常繁中描述[；;]?/g, '')
    .replace(/(?:留下|成為|作為)[^。]*(?:紀錄|記錄)[^。]*。?/g, '')
    .replace(/成為[^。]*之一。?/g, '')
    .replace(/(?:早期推文互動|早期互動|推文互動之一)[^。]*。?/g, '')
    .replace(/(?:相關片段|當天多支剪輯|多支剪輯)[^。]*(?:整理|合併整理)[^。]*。?/g, '')
    .replace(/這筆[^。]*(?:補充|來源脈絡|機翻)[^。]*。?/g, '')
    .replace(/文本待修。?/g, '')
    .trim();
}

function cleanText(value?: string) {
  if (!value) return '';
  return stripEditorialNotes(normalizeMemberNames(value))
    .replace(/[ぁ-ゖァ-ヺー]+/g, '')
    .replace(/\b(?:Japanese|English|source|summary|moment|hilarious|funny|original|compilation|with|from|and|the|too|very|before|after|together|during|behind|scenes|remote|interaction|makes|about|merch|unhinged)\b/gi, '')
    .replace(/视频|視頻/g, '影片')
    .replace(/链接|連結/g, '連結')
    .replace(/回复|回復/g, '回覆')
    .replace(/转发|轉發/g, '轉推')
    .replace(/发布/g, '發布')
    .replace(/联动|聯動/g, '連動')
    .replace(/\s*[|｜]\s*/g, '、')
    .replace(/\s*[•·]\s*/g, '、')
    .replace(/\s{2,}/g, ' ')
    .replace(/、{2,}/g, '、')
    .replace(/，{2,}/g, '，')
    .replace(/[、，]\s*。/g, '。')
    .replace(/^[：:｜|、，。\s]+|[：:｜|、，。\s]+$/g, '')
    .trim();
}

function ensureSentence(value: string) {
  const text = value.replace(/。{2,}/g, '。').trim();
  if (!text) return '';
  return text.endsWith('。') ? text : `${text}。`;
}

function titleHasSubject(value: string) {
  return /(Miko|星街|miComet|INNK|白上吹雪|大空昴|大神澪|寶鐘瑪琳|天音彼方|赤井心|兔田佩克拉|湊阿庫婭|白銀諾艾爾|時乃空|蘿蔔子|阿火|尾丸波爾卡|雪花菈米|姬森璐娜|角卷綿芽|Hololive|火建|不知火建設|VILLS|VARK|EXPO)/.test(value);
}

function subjectForSide(side: Side) {
  if (side === 'miko') return 'Miko';
  if (side === 'suisei') return '星街';
  if (side === 'shared') return 'Miko與星街';
  return '其他Hololive成員';
}

function isChronologyStory(story: MiCometStory) {
  return story.date >= '2019-01-01' && story.date <= '2020-08-31';
}

function isTwoPersonLiveCollab(story: MiCometStory) {
  const text = rawText(story);
  if (story.side !== 'shared') return false;
  if (/轉推|推文|宣布|截圖|花籃|圖|剪輯補充|談到|提到|抱怨|回覆|觀看|看Miko|看星街|看.*直播|去.*家|到.*家|Source/.test(text)) return false;
  return /(Miko與星街|星街與Miko|miComet).*(連動|同時|合唱|周年|活動|商業連動|VARK|VILLS|MIMESIS|Raft|GTA|醫療模擬|瓦利歐|USJ|五子棋|麥塊連動)|(?:連動|同時|合唱|周年|活動|商業連動).*(Miko與星街|星街與Miko|miComet)/i.test(text);
}

function splitNonCollabShared(story: MiCometStory): Side {
  if (story.side !== 'shared') return story.side;
  if (isTwoPersonLiveCollab(story)) return 'shared';
  const text = rawText(story);
  if (/^星街|星街/.test(text) && !/^Miko/.test(text)) return 'suisei';
  if (/^Miko|Miko/.test(text)) return 'miko';
  return 'others';
}

function emojiForSide(side: Side) {
  if (side === 'miko') return '🌸';
  if (side === 'suisei') return '☄️';
  if (side === 'shared') return '💛';
  return '⭐';
}

function normalizeStory(story: MiCometStory): MiCometStory {
  const side = splitNonCollabShared(story);
  let titleZh = cleanText(story.titleZh || story.title);
  if (!titleHasSubject(titleZh)) titleZh = `${subjectForSide(side)}${titleZh}`;
  let ctxZh = cleanText(story.ctxZh || story.ctx || titleZh);
  if (!ctxZh || ctxZh.length < 8) ctxZh = titleZh;
  ctxZh = ensureSentence(ctxZh);
  return {
    ...story,
    source: story.source || (isChronologyStory(story) ? '編年史' : undefined),
    side,
    emoji: emojiForSide(side),
    title: titleZh,
    titleZh,
    ctx: ctxZh,
    ctxZh,
  };
}

function mergeText(a = '', b = '') {
  const parts = [a, b]
    .map((part) => cleanText(part).replace(/。+$/g, '').trim())
    .filter(Boolean);
  return Array.from(new Set(parts)).join('。');
}

function mergeStory(base: MiCometStory, extra: MiCometStory): MiCometStory {
  const mergedCtx = ensureSentence(mergeText(base.ctxZh || base.ctx, extra.ctxZh || extra.ctx));
  const links = Array.from(new Set([base.link, extra.link].filter(Boolean))).join(' ');
  const sources = Array.from(new Set([base.source, extra.source].filter(Boolean))).join('、');
  return {
    ...base,
    id: base.id,
    displayId: base.displayId || extra.displayId,
    phase: Math.min(base.phase, extra.phase),
    type: base.type === extra.type ? base.type : 'News',
    link: links,
    source: sources || undefined,
    ctx: mergedCtx,
    ctxZh: mergedCtx,
  };
}

function duplicateKey(story: MiCometStory) {
  return `${story.date}:${story.titleZh || story.title}`;
}

function normalizeStories(stories: MiCometStory[]) {
  const byKey = new Map<string, MiCometStory>();
  stories.map(normalizeStory).forEach((story) => {
    const key = duplicateKey(story);
    const existing = byKey.get(key);
    byKey.set(key, existing ? mergeStory(existing, story) : story);
  });
  return Array.from(byKey.values());
}

export const MICOMET_TIMELINE: MiCometStory[] = normalizeStories([
  ...(timelineData as MiCometStory[]),
  ...(timeline2020CleanData as MiCometStory[]),
  ...(timeline2021CleanData as MiCometStory[]),
  ...(timeline2022CleanData as MiCometStory[]),
  ...(timeline2023CleanData as MiCometStory[]),
  ...(timeline2024CleanData as MiCometStory[]),
  ...(timeline2025CleanData as MiCometStory[]),
  ...(timeline2026CleanData as MiCometStory[]),
]).sort((a, b) => {
  const dateCompare = a.date.localeCompare(b.date);
  if (dateCompare !== 0) return dateCompare;
  return a.id.localeCompare(b.id, undefined, { numeric: true });
});