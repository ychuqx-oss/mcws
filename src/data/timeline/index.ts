import timelineData from './timeline.json';
import timeline2020CleanData from './timeline-2020-clean.json';
import timeline2021CleanData from './timeline-2021-clean.json';
import timeline2022CleanData from './timeline-2022-clean.json';
import timeline2023CleanData from './timeline-2023-clean.json';
import timeline2024CleanData from './timeline-2024-clean.json';
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

type Side = MiCometStory['side'];

function storyYear(story: MiCometStory) {
  return Number(story.date.slice(0, 4));
}

function rawText(story: MiCometStory) {
  return `${story.title} ${story.titleZh ?? ''} ${story.ctx} ${story.ctxZh ?? ''} ${story.link ?? ''}`;
}

function extractUrls(value: string) {
  return Array.from(new Set(value.match(/https?:\/\/\S+/g) ?? []));
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
    .replace(/Holomem|holomem/gi, 'Hololive成員')
    .replace(/Tweet/gi, '推文')
    .replace(/Video/gi, '影片')
    .replace(/Shorts?/gi, '短片')
    .replace(/original stream/gi, '原直播')
    .replace(/stream/gi, '直播')
    .replace(/clip/gi, '剪輯')
    .replace(/English-subtitled/gi, '')
    .replace(/Japanese/gi, '')
    .replace(/hand-drawn|手描き/gi, '手繪')
    .replace(/mocopi/gi, '動作捕捉')
    .replace(/Hololive|hololive/g, 'Hololive');
}

function stripSourceNotes(value: string) {
  return value
    .replace(/https?:\/\/\S+/g, '')
    .replace(/User-provided source list:.*$/gi, '')
    .replace(/Sources?:.*$/gi, '')
    .replace(/YouTube[:：]?|YT[:：]?|Twitter[:：]?|X[:：]?/gi, '')
    .replace(/PTT\s*編年史來源[。:：]?/g, '')
    .replace(/PTT chronology source\.?/gi, '')
    .replace(/編年史來源[。:：]?/g, '')
    .replace(/外部來源已保留，?重複故事已合併。?/g, '')
    .replace(/補充來源已合併。?/g, '')
    .replace(/文本待修。?/g, '')
    .trim();
}

function cleanText(value?: string) {
  if (!value) return '';
  return stripSourceNotes(normalizeTaiwanUsage(translateCommonTerms(normalizeMemberNames(value))))
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
  return /(Miko|星街|miComet|iNNK|INNK|白上吹雪|大空昴|大神澪|寶鐘瑪琳|天音彼方|赤井心|兔田佩克拉|湊阿庫婭|白銀諾艾爾|時乃空|蘿蔔子|阿火|尾丸波爾卡|雪花菈米|姬森璐娜|角卷綿芽|Hololive|火建|不知火建設|VILLS|VARK|EXPO)/.test(value);
}

function subjectForSide(side: Side) {
  if (side === 'miko') return 'Miko';
  if (side === 'suisei') return '星街';
  if (side === 'shared') return 'Miko與星街';
  return '其他Hololive成員';
}

function normalizeStory(story: MiCometStory): MiCometStory {
  let titleZh = cleanText(story.titleZh || story.title);
  if (!titleHasSubject(titleZh)) titleZh = `${subjectForSide(story.side)}${titleZh}`;
  let ctxZh = cleanText(story.ctxZh || story.ctx || titleZh);
  if (!ctxZh || ctxZh.length < 8) ctxZh = titleZh;
  ctxZh = ensureSentence(ctxZh);
  return {
    ...story,
    title: titleZh,
    titleZh,
    ctx: ctxZh,
    ctxZh,
  };
}

function duplicateKey(story: MiCometStory) {
  const year = storyYear(story);
  if (year >= 2019 && year <= 2026) return `${story.date}:${story.side}`;
  const firstUrl = story.link || extractUrls(rawText(story))[0];
  return firstUrl ? `url:${firstUrl}` : `id:${story.id}`;
}

function mergeDuplicateStory(base: MiCometStory, extra: MiCometStory): MiCometStory {
  const baseUrls = extractUrls(rawText(base));
  const extraUrls = [extra.link, ...extractUrls(rawText(extra))].filter((url): url is string => Boolean(url));
  const mergedUrls = Array.from(new Set([...baseUrls, ...extraUrls])).slice(0, 12);
  const baseCtx = cleanText(base.ctxZh || base.ctx);
  const extraCtx = cleanText(extra.ctxZh || extra.ctx);
  const ctxParts = [baseCtx, extraCtx].filter(Boolean);
  const uniqueParts = Array.from(new Set(ctxParts.map((part) => part.replace(/。+$/g, ''))));
  const ctxZh = ensureSentence(uniqueParts.join('。'));
  return {
    ...base,
    ctx: mergedUrls.length ? `${ctxZh} 補充來源：${mergedUrls.join(' / ')}` : ctxZh,
    ctxZh,
    link: base.link || extra.link,
  };
}

function normalizeAndMergeStories(stories: MiCometStory[]) {
  const map = new Map<string, MiCometStory>();
  stories
    .map(normalizeStory)
    .forEach((story) => {
      const key = duplicateKey(story);
      const current = map.get(key);
      map.set(key, current ? mergeDuplicateStory(current, story) : story);
    });
  return [...map.values()];
}

export const MICOMET_TIMELINE: MiCometStory[] = normalizeAndMergeStories([
  ...(timelineData as MiCometStory[]),
  ...(timeline2020CleanData as MiCometStory[]),
  ...(timeline2021CleanData as MiCometStory[]),
  ...(timeline2022CleanData as MiCometStory[]),
  ...(timeline2023CleanData as MiCometStory[]),
  ...(timeline2024CleanData as MiCometStory[]),
  ...(timeline2026EarlySummerBbqData as MiCometStory[]),
]).sort((a, b) => {
  const dateCompare = a.date.localeCompare(b.date);
  if (dateCompare !== 0) return dateCompare;
  return a.id.localeCompare(b.id, undefined, { numeric: true });
});
