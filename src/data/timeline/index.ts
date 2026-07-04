import timelineData from './timeline.json';
import timeline2020PttBbqData from './timeline-2020-ptt-bbq.json';
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
    .replace(/美子/g, 'Miko')
    .replace(/巫女/g, 'Miko')
    .replace(/彗醬/g, '星街')
    .replace(/星街彗星/g, '星街')
    .replace(/櫻巫女/g, 'Miko')
    .replace(/彗星/g, '星街')
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
    .replace(/文字 \| Twitter：/g, '')
    .replace(/，YT：/g, '。YT：')
    .replace(/！！！！！/g, '！')
    .replace(/www/g, '')
    .replace(/ｗ/g, '')
    .replace(/  +/g, ' ')
    .trim();
}

function cleanup2020Title(story: MiCometStory, currentTitle?: string) {
  if (!story.date.startsWith('2020-')) return currentTitle;
  const raw = `${story.title} ${story.titleZh ?? ''} ${story.ctx} ${story.ctxZh ?? ''}`;

  if (/AsaCoco|早安 Holo|生日快樂/i.test(raw) && story.date === '2020-03-05') {
    return '早安 Holo 由星街播出，祝 Miko 生日快樂';
  }
  if (/ARK|洞窟探險/i.test(raw) && story.date === '2020-03-07') {
    return 'Miko、Fubuki、Haachama 與星街一起去 ARK 洞窟探險';
  }
  if (/サクラカゼ|Sakura Kaze|第二張單曲/i.test(raw)) {
    return '星街幫忙宣傳 Miko 第二張單曲《サクラカゼ》';
  }
  if (/Vanguard ZERO|復仇戰|unit-name|組合名稱/i.test(raw) && story.date === '2020-06-06') {
    return 'Vanguard ZERO 復仇戰：星街勝利，開始徵求組合名稱';
  }
  if (/天彗龍|同居守則|QDJrYiuQoZc/i.test(raw)) {
    return '天彗龍同居守則：聊天室喊貼貼，Miko 也在聊天室喊貼貼';
  }
  if (/個人私物|私物|zs47h3uXbYg/i.test(raw)) {
    return 'Subaru 台猜個人私物企劃，收錄 Miko 與星街相關脈絡';
  }
  if (/表では案件|私下其實聊很多|組合名還沒決定|Roboco|蘿蔔子/i.test(raw)) {
    return '星街談與 Miko 的關係：台面上是工商與 VILLS，私下其實聊很多';
  }
  if (/怨靈|怨霊|miComet.*C|C 要大寫|lwszUzu_ARc/i.test(raw)) {
    return '星街宣布與 Miko 的組合名稱決定為 miComet，C 要大寫';
  }
  if (/Hololiver|主張企劃|n5gjfie8sQY|3xYfZp5CTqo/i.test(raw)) {
    return 'Subaru 的 Hololiver 主張企劃，精靈是 Subaru、Miko、Mio';
  }
  if (/H game|5000|Aki|30 萬/i.test(raw)) {
    return '星街說 Aki 模仿 Miko 啟動 H game 太好笑，自己看了 5000 次';
  }
  if (/Chitchat|VILLS|笑.*停不下來|laugh|lp1DnxdKfIA|CEiN9AAkR6Y/i.test(raw)) {
    return '星街雜談：與 Miko 練習 VILLS 時笑到停不下來';
  }
  if (/Drawing Live|Suisei Wants Miko as a Pet|寵物|繪師聯動|rW32DH_rH-E|nbQNvhr19nU/i.test(raw)) {
    return '繪師聯動畫 Miko：星街說想養 Miko 當寵物';
  }
  if (/先導者|抽自己|神抽|KPo5vaoe1Vo/i.test(raw)) {
    return '星街開台抽自己的 Vanguard 卡，Miko 在聊天室稱讚神抽';
  }
  if (/長休|宣布回歸/i.test(raw)) {
    return 'Miko 宣布結束長休，星街送上祝福';
  }
  if (/回歸LIVE|回歸 Live|繼續miComet|15IpFst/i.test(raw)) {
    return 'Miko 回歸 Live：之後還要繼續 miComet';
  }
  if (/運動會前調整|m9K167jBLJo/i.test(raw)) {
    return 'Miko 進行 2020 年 Hololive 麥塊大運動會前調整與練習';
  }
  if (/Kissing Monster|Business miComet|confess|坦白/i.test(raw)) {
    return '星街在 Minecraft 中對 Miko 說出少見告白';
  }
  if (/鉱石争奪|礦石爭奪|Ore scramble|PvP/i.test(raw)) {
    return 'Minecraft 礦石爭奪 PvP：Miko 與星街同場互動';
  }
  if (/QiQtiNK7jWw|hololive Minecraft server|ホロ鯖|運動会までもう少し|Sports Festival practice/i.test(raw)) {
    return '星街的麥塊運動會前練習，成為多個早期 miComet 剪輯來源';
  }
  if (/Epic Fail Impostor|AmongUs/i.test(raw)) {
    return 'Miko 在 Among Us 的經典失誤場面';
  }
  if (/セクハラ|close to Miko and Aqua|靠太近/i.test(raw)) {
    return '星街在 Minecraft 中對 Miko 與 Aqua 稍微靠太近的精華';
  }

  if (!currentTitle || currentTitle === 'Miko' || currentTitle === '星街' || currentTitle.length <= 3) {
    const fallback = normalizeZhText(story.ctxZh || story.ctx || story.title);
    return fallback?.split(/[。\n]/)[0]?.slice(0, 44) || currentTitle;
  }

  return currentTitle;
}

function cleanup2020Context(story: MiCometStory, currentContext?: string) {
  if (!story.date.startsWith('2020-')) return currentContext;
  const raw = `${story.title} ${story.titleZh ?? ''} ${story.ctx} ${story.ctxZh ?? ''}`;

  if (/AsaCoco|早安 Holo|生日快樂/i.test(raw) && story.date === '2020-03-05') {
    return '2020/03/05 是 Miko 生日，當天早安 Holo 由星街播出並祝 Miko 生日快樂。';
  }
  if (/ARK|洞窟探險/i.test(raw) && story.date === '2020-03-07') {
    return 'Miko、Fubuki、Haachama 與星街一起去 ARK 洞窟探險，是早期多人互動脈絡之一。';
  }
  if (/サクラカゼ|Sakura Kaze|第二張單曲/i.test(raw)) {
    return '星街幫忙宣傳 Miko 第二張單曲《サクラカゼ》，屬於 2020 年早期互動紀錄。';
  }
  if (/Vanguard ZERO|復仇戰|unit-name|組合名稱/i.test(raw) && story.date === '2020-06-06') {
    return '距離第一次 Vanguard ZERO 工商半年後進行復仇戰；星街勝利，並開始徵求兩人的組合名稱。';
  }
  if (/天彗龍|同居守則|QDJrYiuQoZc/i.test(raw)) {
    return '天音彼方台的天彗龍同居守則中，聊天室喊貼貼，Miko 也在聊天室加入貼貼氣氛。';
  }
  if (/個人私物|私物|zs47h3uXbYg/i.test(raw)) {
    return 'Subaru 台猜哪個不是成員個人私物的企劃，屬於 2020 年 Miko／星街互動脈絡補充。';
  }
  if (/表では案件|私下其實聊很多|組合名還沒決定|Roboco|蘿蔔子/i.test(raw)) {
    return '星街與 Roboco 的棉花糖雜談中，被問到 0 期生關係；她提到與 Miko 檯面上是工商與 VILLS，私下其實聊很多，當時組合名還沒決定。';
  }
  if (/怨靈|怨霊|miComet.*C|C 要大寫|lwszUzu_ARc/i.test(raw)) {
    return '星街在《怨靈》最終回中宣布，與 Miko 的組合名稱決定為 miComet，C 要大寫；VILLS 官推也在同日公布組合名稱。';
  }
  if (/Hololiver|主張企劃|n5gjfie8sQY|3xYfZp5CTqo/i.test(raw)) {
    return '星街參加 Subaru 的 Hololiver 主張企劃，企劃中精靈角色包含 Subaru、Miko、Mio。';
  }
  if (/H game|5000|Aki|30 萬/i.test(raw)) {
    return '星街發推說 Aki 模仿 Miko 啟動 H game 很好笑，自己看了 5000 次；此事與 Miko 30 萬人紀念凸待內容相關。';
  }
  if (/Chitchat|VILLS|笑.*停不下來|laugh|lp1DnxdKfIA|CEiN9AAkR6Y/i.test(raw)) {
    return '星街雜談提到，與 Miko 一起練習 VILLS 時笑到停不下來；最近也常與 Miko 見面，排練過程很開心。';
  }
  if (/Drawing Live|Suisei Wants Miko as a Pet|寵物|繪師聯動|rW32DH_rH-E|nbQNvhr19nU/i.test(raw)) {
    return '船長台繪師聯動畫 Miko，船長、星街、羽衣、犬山一起畫 Miko；星街提到想養 Miko 當寵物。此題材已有多筆重複紀錄，已合併顯示。';
  }
  if (/先導者|抽自己|神抽|KPo5vaoe1Vo/i.test(raw)) {
    return '星街開台抽 Vanguard 卡，因卡池中全是星街而中獎率 100%；Miko 在聊天室出現並稱讚神抽。';
  }
  if (/長休|宣布回歸/i.test(raw)) {
    return 'Miko 宣布即將結束長休回歸，星街送上祝福；Miko 也恭喜星街達成 50 萬訂閱。';
  }
  if (/回歸LIVE|回歸 Live|繼續miComet|15IpFst/i.test(raw)) {
    return 'Miko 回歸 Live 後提到之後還要繼續 miComet，成為兩人關係延續的重要節點。';
  }
  if (/運動會前調整|m9K167jBLJo/i.test(raw)) {
    return '2020 年 Hololive 麥塊大運動會前調整與練習，Miko 視點留下早期 miComet 相關脈絡。';
  }
  if (/Kissing Monster|Business miComet|confess|坦白/i.test(raw)) {
    return 'Minecraft 互動剪輯。星街少見地對 Miko 表達好感，形成早期 Business miComet 代表片段之一。';
  }
  if (/鉱石争奪|礦石爭奪|Ore scramble|PvP/i.test(raw)) {
    return '2020 年 Hololive 麥塊運動會前練習的合作剪輯，Aqua、Subaru、Miko、星街、Noel 參與礦石爭奪 PvP。';
  }
  if (/QiQtiNK7jWw|hololive Minecraft server|ホロ鯖|運動会までもう少し|Sports Festival practice/i.test(raw)) {
    return '2020 年 Hololive 麥塊大運動會前練習，星街視點；這場成為後續多個早期 miComet 互動剪輯的來源。';
  }
  if (/Epic Fail Impostor|AmongUs/i.test(raw)) {
    return 'Holodex 收錄的 Among Us 補充剪輯，作為 Miko／星街互動脈絡的一部分保留。';
  }
  if (/セクハラ|close to Miko and Aqua|靠太近/i.test(raw)) {
    return '後續剪輯引用 2020 年星街 Minecraft 原直播，內容是星街在 Minecraft 中對 Miko 與 Aqua 的距離感玩笑。';
  }

  return currentContext;
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
  let titleZh = normalizeZhText(story.titleZh || story.title);
  let ctxZh = normalizeZhText(story.ctxZh || story.ctx);

  titleZh = cleanup2020Title(story, titleZh);
  ctxZh = cleanup2020Context(story, ctxZh);
  titleZh = cleanup2021Title(story, titleZh);

  return {
    ...story,
    titleZh,
    ctxZh,
  };
}

function duplicateKey(story: MiCometStory) {
  const text = `${story.title} ${story.titleZh ?? ''} ${story.ctx} ${story.ctxZh ?? ''}`;

  if (story.date.startsWith('2020-')) {
    if (/AsaCoco|早安 Holo|生日快樂/i.test(text) && story.date === '2020-03-05') return '2020-03-05:miko-birthday';
    if (/ARK|洞窟探險/i.test(text) && story.date === '2020-03-07') return '2020-03-07:ark-cave';
    if (/サクラカゼ|Sakura Kaze|第二張單曲/i.test(text)) return '2020-03-28:sakura-kaze-promo';
    if (/Vanguard ZERO|復仇戰|unit-name|組合名稱/i.test(text) && story.date === '2020-06-06') return '2020-06-06:vanguard-rematch-name';
    if (/天彗龍|同居守則|QDJrYiuQoZc/i.test(text)) return '2020-06-10:kanata-suisei-house-rules-miko-chat';
    if (/個人私物|私物|zs47h3uXbYg/i.test(text)) return '2020-06-12:subaru-private-items';
    if (/表では案件|私下其實聊很多|組合名還沒決定|Roboco|蘿蔔子/i.test(text)) return '2020-06-19:roboco-marshmallow-relationship';
    if (/怨靈|怨霊|miComet.*C|C 要大寫|lwszUzu_ARc/i.test(text)) return '2020-06-26:micomet-name-decided';
    if (/Hololiver|主張企劃|n5gjfie8sQY|3xYfZp5CTqo/i.test(text)) return '2020-06-27:subaru-hololiver-claim';
    if (/H game|5000|Aki|30 萬/i.test(text)) return '2020-06-29:aki-miko-h-game';
    if (/Chitchat|VILLS|Couldn.t Stop|笑.*停不下來|laugh|lp1DnxdKfIA|CEiN9AAkR6Y/i.test(text)) return '2020-07:vills-laughing';
    if (/Drawing Live|Suisei Wants Miko as a Pet|寵物|繪師聯動|Others|rW32DH_rH-E|nbQNvhr19nU/i.test(text) && story.date === '2020-08-03') return '2020-08-03:suisei-wants-miko-as-pet';
    if (/先導者|抽自己|神抽|KPo5vaoe1Vo/i.test(text)) return '2020-09-19:vanguard-card-pull';
    if (/長休|宣布回歸/i.test(text)) return '2020-10-17:miko-return-announcement';
    if (/回歸LIVE|回歸 Live|繼續miComet|15IpFst/i.test(text)) return '2020-10-21:miko-return-live';
    if (/Epic Fail Impostor|AmongUs/i.test(text)) return '2020-10-21:among-us-clip';
    if (/運動會前調整|m9K167jBLJo/i.test(text)) return '2020-11-18:sports-festival-prep-miko';
    if (/QiQtiNK7jWw|Kissing Monster|Business miComet|confess|坦白|hololive Minecraft server|ホロ鯖|運動会までもう少し|Sports Festival practice/i.test(text)) return '2020-11-19:sports-festival-prep-suisei';
    if (/鉱石争奪|礦石爭奪|Ore scramble|PvP/i.test(text)) return '2020-11-19:ore-pvp';
  }

  if (story.date.startsWith('2021-')) {
    if (/Kanata and Rushia|カナタとルシア/i.test(text)) return `${story.date}:kanata-rushia-micomet-chat`;
    if (/Jump Scares|jump scare|ジャンプ/i.test(text)) return `${story.date}:suisei-jump-scare-miko`;
    if (/Minecraft Usaken Festival|Summer Festival|兔建夏祭/i.test(text)) return `${story.date}:usaken-summer-festival:${story.type}`;
  }

  const linkKey = story.link || `${story.ctx} ${story.ctxZh ?? ''}`.match(/https?:\/\/\S+/)?.[0];
  if (linkKey) return `link:${linkKey}`;

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
  ...(timeline2020PttBbqData as MiCometStory[]),
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
