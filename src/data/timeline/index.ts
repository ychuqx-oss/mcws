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
const HOLO_MEMBER_RE = /(白上吹雪|大空昴|大神澪|寶鐘瑪琳|天音彼方|赤井心|兔田佩克拉|湊阿庫婭|白銀諾艾爾|時乃空|蘿蔔子|亞綺·羅森塔爾|常闇永遠|不知火芙蕾雅|尾丸波爾卡|鷹嶺琉依|火威青|音乃瀨奏|一條莉莉華|儒烏風亭螺鈿|轟一|輪堂千速|角卷綿芽|姬森璐娜|雪花菈米|桃鈴音音|獅白牡丹|拉普拉斯·暗黑|博衣小夜璃|沙花叉克蘿耶|風真伊呂波|AZKi|Aqua|Subaru|Fubuki|Mio|Marine|Kanata|Haachama|Haato|Pekora|Noel|Sora|Roboco|Aki|Towa|Flare|Polka|Lui|Ao|Kanade|Ririka|Raden|Hajime|Chihaya)/i;

function rawText(story: MiCometStory) {
  return `${story.title} ${story.titleZh ?? ''} ${story.titleJa ?? ''} ${story.ctx} ${story.ctxZh ?? ''} ${story.ctxJa ?? ''} ${story.link ?? ''}`;
}

function storyYear(story: MiCometStory) {
  return Number(story.date.slice(0, 4));
}

function extractUrls(value: string) {
  return Array.from(new Set(value.match(/https?:\/\/\S+/g) ?? []));
}

function hasExternalSource(story: MiCometStory) {
  const sourceText = [story.link, ...extractUrls(rawText(story))].filter(Boolean).join(' ');
  return SOURCE_RE.test(sourceText);
}

function shouldShowStory() {
  return true;
}

function normalizeMemberNames(value?: string) {
  if (!value) return '';
  return value
    .replace(/星街彗星|星街すいせい|すいちゃん|スイセイ|彗醬|彗星|\bSuisei\b|\bsuisei\b/gi, '星街')
    .replace(/櫻巫女|さくらみこ|みこち|咪口|美子|米子|巫女|\bMikochi\b/gi, 'Miko')
    .replace(/\b35\b/g, 'Miko')
    .replace(/みこめっと|ミコメット/gi, 'miComet')
    .replace(/MiComet/g, 'miComet')
    .replace(/白上フブキ|Shirakami Fubuki|\bFubuki\b/gi, '白上吹雪')
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
    .replace(/アキ・ローゼンタール|Aki Rosenthal|\bAki\b/gi, '亞綺·羅森塔爾')
    .replace(/常闇トワ|Tokoyami Towa|\bTowa\b/gi, '常闇永遠')
    .replace(/不知火フレア|Shiranui Flare|\bFlare\b/gi, '不知火芙蕾雅')
    .replace(/尾丸ポルカ|Omaru Polka|\bPolka\b/gi, '尾丸波爾卡')
    .replace(/鷹嶺ルイ|Takane Lui|\bLui\b/gi, '鷹嶺琉依')
    .replace(/火威青|Hiodoshi Ao|\bAo\b/gi, '火威青')
    .replace(/音乃瀬奏|Otonose Kanade|\bKanade\b/gi, '音乃瀨奏')
    .replace(/一条莉々華|Ichijou Ririka|\bRirika\b/gi, '一條莉莉華')
    .replace(/儒烏風亭らでん|Juufuutei Raden|\bRaden\b/gi, '儒烏風亭螺鈿')
    .replace(/轟はじめ|Todoroki Hajime|\bHajime\b/gi, '轟一')
    .replace(/輪堂千速|Rindo Chihaya|\bChihaya\b/gi, '輪堂千速');
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
  return stripForeignNoise(translateCommonTerms(normalizeMemberNames(value))).trim();
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
  if (/^(看到|聽到|發現|玩|唱|跳|談|提到|表示|幫忙|稱讚|吐槽)/.test(title)) {
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

  if (!hasExternalSource(story)) {
    const body = cleaned.length >= 8 ? cleaned : titleZh;
    return `${body}。來源待補。`;
  }

  if (!cleaned || cleaned.length < 8) return `${titleZh}。外部來源已保留，重複故事已合併。`;
  return cleaned.endsWith('。') ? cleaned : `${cleaned}。`;
}

function hasMiko(text: string) {
  return /Miko|櫻巫女|さくらみこ|みこち|咪口|美子|米子|巫女|\b35\b/i.test(text);
}

function hasSuisei(text: string) {
  return /星街|星街彗星|星街すいせい|すいちゃん|彗星|彗醬|Suisei/i.test(text);
}

function isJointStory(text: string) {
  return /miComet|Miko.*星街|星街.*Miko|雙人|一起|一同|共同|同時|連動|合作|合唱|同場|同接|凸待|fubumiComet|火建|不知火建設|Shiraken|VILLS|大運動會|運動會|ReGLOSS.*視聽/i.test(text);
}

function activeBySubject(text: string): MiCometStory['side'] | null {
  if (/^(Miko|櫻巫女|さくらみこ|みこち|咪口|美子|米子|巫女)/i.test(text)) return 'miko';
  if (/^(星街|星街彗星|星街すいせい|すいちゃん|彗星|彗醬|Suisei)/i.test(text)) return 'suisei';
  if (/Miko.{0,12}(送|問|說|談|聊|唱|邀|幫|吐槽|回覆|感謝|稱讚|發|宣布|介紹|準備|開台|直播)/i.test(text)) return 'miko';
  if (/星街.{0,12}(送|問|說|談|聊|唱|邀|幫|吐槽|回覆|感謝|稱讚|發|宣布|介紹|準備|開台|直播)/i.test(text)) return 'suisei';
  return null;
}

function resolveSide(story: MiCometStory, titleZh: string, ctxZh: string): MiCometStory['side'] {
  const text = `${titleZh} ${ctxZh} ${rawText(story)}`;
  const miko = hasMiko(text);
  const suisei = hasSuisei(text);
  const otherMember = HOLO_MEMBER_RE.test(text);
  const active = activeBySubject(text);

  if (miko && suisei && isJointStory(text)) return 'shared';
  if (active) return active;
  if (!miko && !suisei && otherMember) return 'others';
  if (story.side === 'others' && (miko || suisei)) return active ?? (miko && !suisei ? 'miko' : suisei && !miko ? 'suisei' : story.side);
  if (miko && !suisei) return 'miko';
  if (suisei && !miko) return 'suisei';
  if (miko && suisei) return 'shared';
  return story.side;
}

function normalizeStory(story: MiCometStory): MiCometStory {
  const titleZh = resolveTitle(story);
  const ctxZh = resolveContext(story, titleZh);
  const side = resolveSide(story, titleZh, ctxZh);
  return { ...story, side, titleZh, ctxZh };
}

function duplicateKey(story: MiCometStory) {
  const year = storyYear(story);
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
    .filter(shouldShowStory)
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
