import timelineData from './timeline.json';
import timeline2020PttBbqData from './timeline-2020-ptt-bbq.json';
import timeline2022PttBbqData from './timeline-2022-ptt-bbq.json';
import timeline2022Q1ClipsData from './timeline-2022-q1-clips.json';
import timeline2022Q2ClipsData from './timeline-2022-q2-clips.json';
import timeline2022Q3ClipsData from './timeline-2022-q3-clips.json';
import timeline2022Q4ClipsData from './timeline-2022-q4-clips.json';
import timeline2022OctoberBbqData from './timeline-2022-october-bbq.json';
import timeline2020AutumnBbqData from './timeline-2020-autumn-bbq.json';
import timeline2021EarlyBbqData from './timeline-2021-early-bbq.json';
import timeline2021SpringBbqData from './timeline-2021-spring-bbq.json';
import timeline2021MidBbqData from './timeline-2021-mid-bbq.json';
import timeline2021LateSummerBbqData from './timeline-2021-late-summer-bbq.json';
import timeline2021WinterBbqData from './timeline-2021-winter-bbq.json';
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
const HOLO_MEMBER_RE = /(白上吹雪|大空昴|大神澪|寶鐘瑪琳|天音彼方|赤井心|兔田佩克拉|湊阿庫婭|白銀諾艾爾|時乃空|蘿蔔子|亞綺·羅森塔爾|常闇永遠|阿火|尾丸波爾卡|鷹嶺琉依|火威青|音乃瀨奏|一條莉莉華|儒烏風亭螺鈿|轟一|輪堂千速|角卷綿芽|姬森璐娜|雪花菈米|桃鈴音音|獅白牡丹|拉普拉斯·暗黑|博衣小夜璃|沙花叉克蘿耶|風真伊呂波|AZKi|Aqua|Subaru|Fubuki|Mio|Marine|Kanata|Haachama|Haato|Pekora|Noel|Sora|Roboco|Aki|Towa|Flare|Polka|Lui|Ao|Kanade|Ririka|Raden|Hajime|Chihaya)/i;

type Side = MiCometStory['side'];

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
    .replace(/星街彗星|星街すいせい|星町|小水|すいちゃん|スイセイ|彗醬|彗星|\bSuisei\b|\bsuisei\b/gi, '星街')
    .replace(/櫻巫女|さくらみこ|みこち|咪口|美子|米子|巫女|\bMikochi\b/gi, 'Miko')
    .replace(/\b35\b/g, 'Miko')
    .replace(/みこめっと|ミコメット/gi, 'miComet')
    .replace(/MiComet/g, 'miComet')
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
    .replace(/アキ・ローゼンタール|Aki Rosenthal|\bAki\b/gi, '亞綺·羅森塔爾')
    .replace(/常闇トワ|Tokoyami Towa|\bTowa\b/gi, '常闇永遠')
    .replace(/不知火フレア|Shiranui Flare|\bFlare\b|耀斑/gi, '阿火')
    .replace(/尾丸ポルカ|Omaru Polka|\bPolka\b/gi, '尾丸波爾卡')
    .replace(/鷹嶺ルイ|Takane Lui|\bLui\b/gi, '鷹嶺琉依')
    .replace(/火威青|Hiodoshi Ao|\bAo\b/gi, '火威青')
    .replace(/音乃瀬奏|Otonose Kanade|\bKanade\b/gi, '音乃瀨奏')
    .replace(/一条莉々華|Ichijou Ririka|\bRirika\b/gi, '一條莉莉華')
    .replace(/儒烏風亭らでん|Juufuutei Raden|\bRaden\b/gi, '儒烏風亭螺鈿')
    .replace(/轟はじめ|Todoroki Hajime|\bHajime\b/gi, '轟一')
    .replace(/輪堂千速|Rindo Chihaya|\bChihaya\b/gi, '輪堂千速');
}

function normalizeTaiwanUsage(value: string) {
  return value
    .replace(/全息/g, 'Hololive')
    .replace(/视频|視頻/g, '影片')
    .replace(/信息|资讯|資訊/g, '資訊')
    .replace(/链接|連結/g, '連結')
    .replace(/质量|品質/g, '品質')
    .replace(/粉丝/g, '粉絲')
    .replace(/后台/g, '後台')
    .replace(/账号/g, '帳號')
    .replace(/点击/g, '點擊')
    .replace(/发布/g, '發布')
    .replace(/通过/g, '透過')
    .replace(/以后/g, '之後')
    .replace(/里面/g, '裡面')
    .replace(/转发|轉發/g, '轉推')
    .replace(/回复|回復/g, '回覆')
    .replace(/实现|實裝/g, '上線')
    .replace(/联动|聯動/g, '連動')
    .replace(/游戏|遊戲/g, '遊戲')
    .replace(/直播间/g, '聊天室');
}

function translateCommonTerms(value: string) {
  return value
    .replace(/Mario Party|マリオパーティ|馬派/g, '瑪利歐派對')
    .replace(/Minecraft|マインクラフト|麥塊/gi, '麥塊')
    .replace(/Mario Kart|マリオカート/gi, '瑪利歐賽車')
    .replace(/WarioWare|メイドインワリオ|ワリオ/gi, '瓦利歐製造')
    .replace(/Ranch Simulator/gi, '牧場模擬器')
    .replace(/Nintendo Switch Sports/gi, '運動遊戲')
    .replace(/Super Bunny Man|スーパーバニーマン/gi, '超級兔人')
    .replace(/7 Days to Die|7 days to die|七日殺/gi, '七日殺')
    .replace(/Monster Hunter|モンハン|魔物獵人/gi, '魔物獵人')
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
    .replace(/\b(?:Japanese|English|clip|stream|shorts|summary|moment|hilarious|funny|original|source|compilation|with|from|and|the|too|very|before|after|together|during|behind|scenes|remote|interaction)\b/gi, '')
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

function cleanUiText(value?: string) {
  return stripForeignNoise(normalizeTaiwanUsage(translateCommonTerms(normalizeMemberNames(value)))).trim();
}

function compactTitle(value: string) {
  return value
    .replace(/[|｜]/g, '')
    .replace(/\s+/g, '')
    .replace(/、{2,}/g, '、')
    .replace(/，{2,}/g, '，')
    .replace(/^[、，。]+|[、，。]+$/g, '')
    .trim();
}

function stripSourceNotes(value: string) {
  return value
    .replace(/PTT\s*編年史來源[。:：]?/g, '')
    .replace(/PTT chronology source\.?/gi, '')
    .replace(/編年史來源[。:：]?/g, '')
    .replace(/來源：編年史。?/g, '')
    .replace(/來源待補。?/g, '')
    .replace(/外部來源已保留，?重複故事已合併。?/g, '')
    .replace(/補充來源已合併。?/g, '')
    .replace(/。?補充來源.*$/g, '')
    .replace(/。{2,}/g, '。')
    .replace(/^。+|。+$/g, '')
    .trim();
}

function firstUsefulSentence(value?: string) {
  const cleaned = stripSourceNotes(cleanUiText(value));
  return cleaned.split(/[。\n]/).map((item) => item.trim()).find((item) => item.length >= 8 && !isBadTitle(item));
}

function genericTitle(story: MiCometStory) {
  if (story.side === 'miko') return 'Miko與星街的互動故事';
  if (story.side === 'suisei') return '星街與Miko的互動故事';
  if (story.side === 'others') return '其他Hololive成員提及或助攻miComet';
  if (story.type === 'Music') return 'miComet音樂相關故事';
  if (story.type === 'Stream') return 'miComet連動直播故事';
  if (story.type === 'Clip') return 'miComet互動剪輯故事';
  return 'miComet共同故事';
}

function isBadTitle(value: string) {
  if (!value || value.length <= 3) return true;
  if (/[ぁ-ゖァ-ヺー]/.test(value)) return true;
  if (/\b(?:Japanese|English|clip|stream|shorts|source|summary|moment|hilarious|funny|original)\b/i.test(value)) return true;
  const latinChars = value.match(/[A-Za-z]/g)?.length ?? 0;
  const chineseChars = value.match(/[\u4e00-\u9fff]/g)?.length ?? 0;
  return latinChars > chineseChars && chineseChars < 4;
}

function titleHasSubject(value: string) {
  return /(Miko|星街|miComet|iNNK|INNK|白上吹雪|大空昴|大神澪|寶鐘瑪琳|天音彼方|赤井心|兔田佩克拉|湊阿庫婭|白銀諾艾爾|時乃空|蘿蔔子|阿火|尾丸波爾卡|雪花菈米|姬森璐娜|角卷綿芽|Hololive|火建|不知火建設|VILLS|VARK|EXPO)/.test(value);
}

function subjectForSide(side: Side) {
  if (side === 'miko') return 'Miko';
  if (side === 'suisei') return '星街';
  if (side === 'shared') return 'Miko與星街';
  return '其他Hololive成員';
}

function fixSelfWatchingTitle(value: string) {
  return value
    .replace(/星街看(了)?星街/g, '星街看了Miko相關內容')
    .replace(/Miko看(了)?Miko/g, 'Miko看了星街相關內容')
    .replace(/星街玩(了)?星街/g, '星街玩了Miko相關內容')
    .replace(/Miko玩(了)?Miko/g, 'Miko玩了星街相關內容')
    .replace(/星街稱讚星街/g, '星街稱讚Miko')
    .replace(/Miko稱讚Miko/g, 'Miko稱讚星街');
}

function needsSubject(value: string) {
  if (titleHasSubject(value)) return false;
  return /^(玩|看|唱|聊|談|說|問|送|拿|做|幫|救|追|開|參加|加入|回覆|轉推|稱讚|吐槽|發現|聽到|準備|介紹|挑戰|搶劫|約會|破產|成立|祝賀|回顧|告知|練習|模仿|提到|演唱|展示|邀請|說明|進行)/.test(value);
}

function removeClipWordsFromTitle(value: string) {
  return value
    .replace(/^(中文|繁中|日文|英文)?(剪輯|烤肉|精華|短片)[：:、，-]*/g, '')
    .replace(/[【\[][^\]】]*(剪輯|烤肉|精華|中文字幕|中文翻譯)[^\]】]*[\]】]/g, '')
    .replace(/(中文|繁中|日文|英文)?(剪輯|烤肉|精華|短片)$/g, '')
    .trim();
}

function resolveTitle(story: MiCometStory) {
  const preferred = fixSelfWatchingTitle(removeClipWordsFromTitle(cleanUiText(story.titleZh || story.title)));
  const fallback = firstUsefulSentence(story.ctxZh || story.ctx);
  let title = isBadTitle(preferred) ? fallback ?? genericTitle(story) : preferred;
  title = fixSelfWatchingTitle(removeClipWordsFromTitle(title));

  if (needsSubject(title)) {
    title = `${subjectForSide(story.side)}${title}`;
  }

  return compactTitle(title);
}

function chronologySourceText(story: MiCometStory) {
  return /(PTT\s*編年史來源|PTT chronology source|編年史來源|來源：編年史)/i.test(rawText(story));
}

function appendChronologySource(value: string, useChronologySource: boolean) {
  const text = stripSourceNotes(value);
  const base = text ? `${text}。` : '';
  return useChronologySource ? `${base}來源：編年史。` : base;
}

function resolveContext(story: MiCometStory, titleZh: string) {
  const useChronologySource = chronologySourceText(story);
  const cleaned = stripSourceNotes(cleanUiText(story.ctxZh || story.ctx || ''))
    .replace(/^來源[為是]?[：:]?/g, '')
    .replace(/^剪輯[：:]?/g, '')
    .replace(/^直播[：:]?/g, '')
    .replace(/這是[^。]*(分類歸|歸)(Miko|星街|miComet|共同|其他Hololive成員)[^。]*。?/g, '')
    .replace(/此筆[^。]*(分類歸|歸)(Miko|星街|miComet|共同|其他Hololive成員)[^。]*。?/g, '')
    .trim();

  if (!hasExternalSource(story)) {
    const body = cleaned.length >= 8 ? cleaned : titleZh;
    return appendChronologySource(`${body}。來源待補。`, useChronologySource);
  }

  if (!cleaned || cleaned.length < 8) return appendChronologySource(`${titleZh}。外部來源已保留，重複故事已合併。`, useChronologySource);
  return appendChronologySource(cleaned, useChronologySource);
}

function hasMiko(text: string) {
  return /Miko|櫻巫女|さくらみこ|みこち|咪口|美子|米子|巫女|\b35\b/i.test(text);
}

function hasSuisei(text: string) {
  return /星街|星街彗星|星街すいせい|星町|小水|すいちゃん|彗星|彗醬|Suisei/i.test(text);
}

function oneWayReplySide(text: string): Side | null {
  if (/星街.{0,40}(回覆|回覆吐槽|留言|轉推|轉貼|反應|吐槽|分享).{0,40}Miko/i.test(text)) return 'suisei';
  if (/Miko.{0,40}(推文|貼文|發文).{0,80}星街.{0,30}(回覆|留言|吐槽|轉推|反應)/i.test(text)) return 'suisei';
  if (/Miko.{0,40}(回覆|留言|轉推|轉貼|反應|吐槽|分享).{0,40}星街/i.test(text)) return 'miko';
  if (/星街.{0,40}(推文|貼文|發文).{0,80}Miko.{0,30}(回覆|留言|吐槽|轉推|反應)/i.test(text)) return 'miko';
  if (/(對方沒有回覆|沒有再回覆|單方面回覆|隔空互動)/.test(text)) {
    if (/星街.{0,40}(回覆|吐槽|轉推|留言)/.test(text)) return 'suisei';
    if (/Miko.{0,40}(回覆|吐槽|轉推|留言)/.test(text)) return 'miko';
  }
  return null;
}

function isJointStory(text: string) {
  if (oneWayReplySide(text)) return false;
  return /(miComet|雙人|兩人|一起|一同|共同|互相|彼此|同時|連動直播|雙視點|合作|合唱|同場|同接|凸待|fubumiComet|火建|不知火建設|Shiraken|VILLS|大運動會|運動會|ReGLOSS.*視聽)/i.test(text);
}

function activeBySubject(text: string): Side | null {
  if (/^(Miko|櫻巫女|さくらみこ|みこち|咪口|美子|米子|巫女)/i.test(text)) return 'miko';
  if (/^(星街|星街彗星|星街すいせい|星町|小水|すいちゃん|彗星|彗醬|Suisei)/i.test(text)) return 'suisei';
  if (/Miko.{0,16}(送|問|說|談|聊|唱|邀|幫|吐槽|回覆|感謝|稱讚|發|宣布|介紹|準備|開台|直播|轉推|分享|參加|加入|祝賀)/i.test(text)) return 'miko';
  if (/星街.{0,16}(送|問|說|談|聊|唱|邀|幫|吐槽|回覆|感謝|稱讚|發|宣布|介紹|準備|開台|直播|轉推|分享|參加|加入|祝賀)/i.test(text)) return 'suisei';
  return null;
}

function resolveSide(story: MiCometStory, titleZh: string, ctxZh: string): Side {
  const text = `${titleZh} ${ctxZh} ${rawText(story)}`;
  const miko = hasMiko(text);
  const suisei = hasSuisei(text);
  const otherMember = HOLO_MEMBER_RE.test(normalizeMemberNames(text));
  const oneWay = oneWayReplySide(text);
  const active = activeBySubject(text);

  if (oneWay) return oneWay;
  if (miko && suisei && isJointStory(text)) return 'shared';
  if (active) return active;
  if (!miko && !suisei && otherMember) return 'others';
  if (story.side === 'others' && (miko || suisei)) return miko && !suisei ? 'miko' : suisei && !miko ? 'suisei' : story.side;
  if (miko && !suisei) return 'miko';
  if (suisei && !miko) return 'suisei';
  if (miko && suisei) return 'shared';
  return story.side;
}

function normalizeStory(story: MiCometStory): MiCometStory {
  const draftTitle = resolveTitle(story);
  const draftCtx = resolveContext(story, draftTitle);
  const side = resolveSide(story, draftTitle, draftCtx);
  const storyWithSide = { ...story, side };
  const titleZh = resolveTitle(storyWithSide);
  const ctxZh = resolveContext(storyWithSide, titleZh);
  return { ...story, side, titleZh, ctxZh };
}

function duplicateKey(story: MiCometStory) {
  const year = storyYear(story);
  if (year >= 2019 && year <= 2026) return `${story.date}:${story.side}`;
  const firstUrl = story.link || extractUrls(rawText(story))[0];
  return firstUrl ? `url:${firstUrl}` : `id:${story.id}`;
}

function titleScore(value?: string) {
  const title = removeClipWordsFromTitle(value ?? '');
  const chineseChars = title.match(/[\u4e00-\u9fff]/g)?.length ?? 0;
  const latinChars = title.match(/[A-Za-z]/g)?.length ?? 0;
  const subjectScore = titleHasSubject(title) ? 12 : 0;
  const genericPenalty = /互動故事|相關故事|故事$|剪輯|烤肉|精華/.test(title) ? 20 : 0;
  const englishPenalty = latinChars > chineseChars ? 10 : 0;
  return chineseChars + Math.min(title.length, 36) * 0.2 + subjectScore - genericPenalty - englishPenalty;
}

function pickBetterTitle(base: MiCometStory, extra: MiCometStory) {
  const baseTitle = removeClipWordsFromTitle(base.titleZh ?? base.title);
  const extraTitle = removeClipWordsFromTitle(extra.titleZh ?? extra.title);
  if (isBadTitle(baseTitle) && !isBadTitle(extraTitle)) return extraTitle;
  return titleScore(extraTitle) > titleScore(baseTitle) + 6 ? extraTitle : baseTitle;
}

function splitCleanContext(value?: string) {
  const cleaned = stripSourceNotes(cleanUiText(value || ''));
  return cleaned
    .split(/[。\n]/)
    .map((item) => item.trim())
    .filter((item) => item.length >= 8 && !/^(來源|YT|補充來源)/.test(item));
}

function mergeContextText(base: MiCometStory, extra: MiCometStory) {
  const parts = [...splitCleanContext(base.ctxZh ?? base.ctx), ...splitCleanContext(extra.ctxZh ?? extra.ctx)];
  const seen = new Set<string>();
  const unique = parts.filter((part) => {
    const key = part.replace(/[，、。「」《》〈〉]/g, '').slice(0, 36);
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
  const merged = unique.join('。');
  const useChronologySource = chronologySourceText(base) || chronologySourceText(extra);
  const hasPending = /來源待補/.test(`${base.ctxZh ?? ''}${extra.ctxZh ?? ''}`) || !hasExternalSource(base) || !hasExternalSource(extra);
  return appendChronologySource(`${merged || base.titleZh || base.title}${hasPending ? '。來源待補' : ''}`, useChronologySource);
}

function mergeDuplicateStory(base: MiCometStory, extra: MiCometStory): MiCometStory {
  const baseRaw = rawText(base);
  const extraUrls = [extra.link, ...extractUrls(rawText(extra))]
    .filter((url): url is string => Boolean(url))
    .filter((url) => !baseRaw.includes(url));
  const uniqueUrls = Array.from(new Set(extraUrls)).slice(0, 12);
  const titleZh = compactTitle(removeClipWordsFromTitle(pickBetterTitle(base, extra)));
  return {
    ...base,
    titleZh,
    ctx: uniqueUrls.length ? `${base.ctx} 補充來源：${uniqueUrls.join(' / ')}` : base.ctx,
    ctxZh: mergeContextText(base, extra),
    link: base.link || extra.link,
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
  ...(timelineData as MiCometStory[]),
  ...(timeline2020AutumnBbqData as MiCometStory[]),
  ...(timeline2021EarlyBbqData as MiCometStory[]),
  ...(timeline2021SpringBbqData as MiCometStory[]),
  ...(timeline2021MidBbqData as MiCometStory[]),
  ...(timeline2021LateSummerBbqData as MiCometStory[]),
  ...(timeline2021WinterBbqData as MiCometStory[]),
  ...(timeline2022PttBbqData as MiCometStory[]),
  ...(timeline2022Q1ClipsData as MiCometStory[]),
  ...(timeline2022Q2ClipsData as MiCometStory[]),
  ...(timeline2022Q3ClipsData as MiCometStory[]),
  ...(timeline2022Q4ClipsData as MiCometStory[]),
  ...(timeline2022OctoberBbqData as MiCometStory[]),
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
