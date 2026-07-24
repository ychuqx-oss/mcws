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
}

type Side = MiCometStory['side'];

function rawText(story: MiCometStory) {
  return `${story.title} ${story.titleZh ?? ''} ${story.ctx} ${story.ctxZh ?? ''} ${story.link ?? ''}`;
}

function normalizeMemberNames(value: string) {
  return value
    .replace(/星街彗星|星街すいせい|星町|小水|すいちゃん|スイセイ|彗醬|彗星|\bSuisei\b|\bsuisei\b/gi, '星街')
    .replace(/櫻巫女|さくらみこ|みこち|咪口|美子|米子|巫女|\bMikochi\b/gi, 'Miko')
    .replace(/\b35\b/g, 'Miko')
    .replace(/みこめっと|ミコメット|MiComet/g, 'miComet')
    .replace(/白上フブキ|Shirakami Fubuki|\bFubuki\b|狐/g, '白上吹雪')
    .replace(/大空スバル|Oozora Subaru|\bSubaru\b/gi, '大空昴')
    .replace(/大神ミオ|Ookami Mio|\bMio\b/gi, '大神澪')
    .replace(/宝鐘マリン|寶鐘マリン|Houshou Marine|\bMarine\b/gi, '寶鐘瑪琳')
    .replace(/天音かなた|Amane Kanata|\bKanata\b/gi, '天音彼方')
    .replace(/赤井はあと|Haachama|Akai Haato|\bHaato\b/gi, '赤井心')
    .replace(/兎田ぺこら|兔田佩可拉|Usada Pekora|\bPekora\b/gi, '兔田佩克拉')
    .replace(/湊あくあ|Minato Aqua|\bAqua\b/gi, '湊阿庫婭')
    .replace(/白銀ノエル|Shirogane Noel|\bNoel\b/gi, '白銀諾艾爾')
    .replace(/ときのそら|Tokino Sora|\bSora\b/gi, '時乃空')
    .replace(/ロボ子さん|Roboco-san|\bRoboco\b/gi, '蘿蔔子')
    .replace(/常闇トワ|Tokoyami Towa|\bTowa\b/gi, '常闇永遠')
    .replace(/不知火フレア|Shiranui Flare|\bFlare\b|耀斑/gi, '阿火')
    .replace(/尾丸ポルカ|Omaru Polka|\bPolka\b/gi, '尾丸波爾卡')
    .replace(/鷹嶺ルイ|Takane Lui|\bLui\b/gi, '鷹嶺琉依')
    .replace(/博衣こより|Hakui Koyori|\bKoyori\b/gi, '博衣小夜璃')
    .replace(/角巻わため|Tsunomaki Watame|\bWatame\b/gi, '角卷綿芽')
    .replace(/獅白ぼたん|Shishiro Botan|\bBotan\b/gi, '獅白牡丹')
    .replace(/輪堂千速|Rindo Chihaya|\bChihaya\b/gi, '輪堂千速');
}

function normalizeTaiwanUsage(value: string) {
  return value
    .replace(/全息/g, 'Hololive')
    .replace(/视频|視頻/g, '影片')
    .replace(/链接|連結/g, '連結')
    .replace(/发布/g, '發布')
    .replace(/转发|轉發/g, '轉推')
    .replace(/回复|回復/g, '回覆')
    .replace(/联动|聯動/g, '連動')
    .replace(/直播间/g, '聊天室');
}

function stripSourceNotes(value: string) {
  return value
    .replace(/User-provided source list:.*$/gi, '')
    .replace(/Sources?:.*$/gi, '')
    .replace(/YouTube[:：]?|YT[:：]?|Twitter[:：]?|X[:：]?/gi, '')
    .replace(/PTT\s*編年史來源[。:：]?/g, '')
    .replace(/PTT chronology source\.?/gi, '')
    .replace(/編年史來源[。:：]?/g, '')
    .replace(/文本待修。?/g, '')
    .trim();
}

function cleanText(value?: string) {
  if (!value) return '';
  return stripSourceNotes(normalizeTaiwanUsage(normalizeMemberNames(value)))
    .replace(/[ぁ-ゖァ-ヺー]+/g, '')
    .replace(/\b(?:Japanese|English|source|summary|moment|hilarious|funny|original|compilation|with|from|and|the|too|very|before|after|together|during|behind|scenes|remote|interaction)\b/gi, '')
    .replace(/\s*[|｜]\s*/g, '、')
    .replace(/\s*[•·]\s*/g, '、')
    .replace(/\s*--+\s*/g, '，')
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

function normalizeSourceNote(story: MiCometStory, value: string) {
  if (!isChronologyStory(story)) return value;
  if (value.includes('來源：編年史。')) return value.replace(/來源待補。?/g, '');
  return value.replace(/來源待補。?/g, '來源：編年史。');
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
  ctxZh = ensureSentence(normalizeSourceNote(story, ctxZh));
  return {
    ...story,
    side,
    emoji: emojiForSide(side),
    title: titleZh,
    titleZh,
    ctx: ctxZh,
    ctxZh,
  };
}

function normalizeStories(stories: MiCometStory[]) {
  const seen = new Set<string>();
  return stories.map(normalizeStory).filter((story) => {
    const key = story.id;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
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