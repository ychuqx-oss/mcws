import timelineData from './timeline.json';
import timeline2020PttBbqData from './timeline-2020-ptt-bbq.json';
import timeline2022PttBbqData from './timeline-2022-ptt-bbq.json';
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
    .replace(/櫻巫女/g, 'Miko')
    .replace(/巫女/g, 'Miko')
    .replace(/さくらみこ/g, 'Miko')
    .replace(/みこち/g, 'Miko')
    .replace(/Mikochi/g, 'Miko')
    .replace(/星街彗星/g, '星街')
    .replace(/彗醬/g, '星街')
    .replace(/彗星/g, '星街')
    .replace(/星街すいせい/g, '星街')
    .replace(/すいちゃん/g, '星街')
    .replace(/スイセイ/g, '星街')
    .replace(/suisei/gi, '星街')
    .replace(/みこめっと/g, 'miComet')
    .replace(/ミコメット/g, 'miComet')
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

function rawText(story: MiCometStory) {
  return `${story.title} ${story.titleZh ?? ''} ${story.titleJa ?? ''} ${story.ctx} ${story.ctxZh ?? ''} ${story.ctxJa ?? ''} ${story.link ?? ''}`;
}

function fallbackTitle(story: MiCometStory, currentTitle?: string) {
  if (!currentTitle || currentTitle === 'Miko' || currentTitle === '星街' || currentTitle.length <= 3) {
    const fallback = normalizeZhText(story.ctxZh || story.ctx || story.title);
    return fallback?.split(/[。\n]/)[0]?.slice(0, 44) || currentTitle;
  }
  return currentTitle;
}

function cleanup2020Title(story: MiCometStory, currentTitle?: string) {
  if (!story.date.startsWith('2020-')) return currentTitle;
  const raw = rawText(story);
  if (/AsaCoco|早安 Holo|生日快樂/i.test(raw) && story.date === '2020-03-05') return '早安 Holo 由星街播出，祝 Miko 生日快樂';
  if (/ARK|洞窟探險/i.test(raw) && story.date === '2020-03-07') return 'Miko、Fubuki、Haachama 與星街一起去 ARK 洞窟探險';
  if (/サクラカゼ|Sakura Kaze|第二張單曲/i.test(raw)) return '星街幫忙宣傳 Miko 第二張單曲《サクラカゼ》';
  if (/Vanguard ZERO|復仇戰|unit-name|組合名稱/i.test(raw) && story.date === '2020-06-06') return 'Vanguard ZERO 復仇戰：星街勝利，開始徵求組合名稱';
  if (/天彗龍|同居守則|QDJrYiuQoZc/i.test(raw)) return '天彗龍同居守則：聊天室喊貼貼，Miko 也在聊天室喊貼貼';
  if (/個人私物|私物|zs47h3uXbYg/i.test(raw)) return 'Subaru 台猜個人私物企劃，收錄 Miko 與星街相關脈絡';
  if (/表では案件|私下其實聊很多|組合名還沒決定|Roboco|蘿蔔子/i.test(raw)) return '星街談與 Miko 的關係：台面上是工商與 VILLS，私下其實聊很多';
  if (/怨靈|怨霊|miComet.*C|C 要大寫|lwszUzu_ARc/i.test(raw)) return '星街宣布與 Miko 的組合名稱決定為 miComet，C 要大寫';
  if (/Hololiver|主張企劃|n5gjfie8sQY|3xYfZp5CTqo/i.test(raw)) return 'Subaru 的 Hololiver 主張企劃，精靈是 Subaru、Miko、Mio';
  if (/H game|5000|Aki|30 萬/i.test(raw)) return '星街說 Aki 模仿 Miko 啟動 H game 太好笑，自己看了 5000 次';
  if (/Chitchat|VILLS|笑.*停不下來|laugh|lp1DnxdKfIA|CEiN9AAkR6Y/i.test(raw)) return '星街雜談：與 Miko 練習 VILLS 時笑到停不下來';
  if (/Drawing Live|Suisei Wants Miko as a Pet|寵物|繪師聯動|rW32DH_rH-E|nbQNvhr19nU/i.test(raw)) return '繪師聯動畫 Miko：星街說想養 Miko 當寵物';
  if (/先導者|抽自己|神抽|KPo5vaoe1Vo/i.test(raw)) return '星街開台抽自己的 Vanguard 卡，Miko 在聊天室稱讚神抽';
  if (/長休|宣布回歸/i.test(raw)) return 'Miko 宣布結束長休，星街送上祝福';
  if (/回歸LIVE|回歸 Live|繼續miComet|15IpFst/i.test(raw)) return 'Miko 回歸 Live：之後還要繼續 miComet';
  if (/運動會前調整|m9K167jBLJo/i.test(raw)) return 'Miko 進行 2020 年 Hololive 麥塊大運動會前調整與練習';
  if (/Kissing Monster|Business miComet|confess|坦白/i.test(raw)) return '星街在 Minecraft 中對 Miko 說出少見告白';
  if (/鉱石争奪|礦石爭奪|Ore scramble|PvP/i.test(raw)) return 'Minecraft 礦石爭奪 PvP：Miko 與星街同場互動';
  if (/QiQtiNK7jWw|hololive Minecraft server|ホロ鯖|運動会までもう少し|Sports Festival practice/i.test(raw)) return '星街的麥塊運動會前練習，成為多個早期 miComet 剪輯來源';
  if (/Epic Fail Impostor|AmongUs/i.test(raw)) return 'Miko 在 Among Us 的經典失誤場面';
  if (/セクハラ|close to Miko and Aqua|靠太近/i.test(raw)) return '星街在 Minecraft 中對 Miko 與 Aqua 稍微靠太近的精華';
  return fallbackTitle(story, currentTitle);
}

function cleanup2020Context(story: MiCometStory, currentContext?: string) {
  if (!story.date.startsWith('2020-')) return currentContext;
  const raw = rawText(story);
  if (/AsaCoco|早安 Holo|生日快樂/i.test(raw) && story.date === '2020-03-05') return '2020/03/05 是 Miko 生日，當天早安 Holo 由星街播出並祝 Miko 生日快樂。';
  if (/ARK|洞窟探險/i.test(raw) && story.date === '2020-03-07') return 'Miko、Fubuki、Haachama 與星街一起去 ARK 洞窟探險，是早期多人互動脈絡之一。';
  if (/サクラカゼ|Sakura Kaze|第二張單曲/i.test(raw)) return '星街幫忙宣傳 Miko 第二張單曲《サクラカゼ》，屬於 2020 年早期互動紀錄。';
  if (/Vanguard ZERO|復仇戰|unit-name|組合名稱/i.test(raw) && story.date === '2020-06-06') return '距離第一次 Vanguard ZERO 工商半年後進行復仇戰；星街勝利，並開始徵求兩人的組合名稱。';
  if (/天彗龍|同居守則|QDJrYiuQoZc/i.test(raw)) return '天音彼方台的天彗龍同居守則中，聊天室喊貼貼，Miko 也在聊天室加入貼貼氣氛。';
  if (/個人私物|私物|zs47h3uXbYg/i.test(raw)) return 'Subaru 台猜哪個不是成員個人私物的企劃，屬於 2020 年 Miko／星街互動脈絡補充。';
  if (/表では案件|私下其實聊很多|組合名還沒決定|Roboco|蘿蔔子/i.test(raw)) return '星街與 Roboco 的棉花糖雜談中，被問到 0 期生關係；她提到與 Miko 檯面上是工商與 VILLS，私下其實聊很多，當時組合名還沒決定。';
  if (/怨靈|怨霊|miComet.*C|C 要大寫|lwszUzu_ARc/i.test(raw)) return '星街在《怨靈》最終回中宣布，與 Miko 的組合名稱決定為 miComet，C 要大寫；VILLS 官推也在同日公布組合名稱。';
  if (/Hololiver|主張企劃|n5gjfie8sQY|3xYfZp5CTqo/i.test(raw)) return '星街參加 Subaru 的 Hololiver 主張企劃，企劃中精靈角色包含 Subaru、Miko、Mio。';
  if (/H game|5000|Aki|30 萬/i.test(raw)) return '星街發推說 Aki 模仿 Miko 啟動 H game 很好笑，自己看了 5000 次；此事與 Miko 30 萬人紀念凸待內容相關。';
  if (/Chitchat|VILLS|笑.*停不下來|laugh|lp1DnxdKfIA|CEiN9AAkR6Y/i.test(raw)) return '星街雜談提到，與 Miko 一起練習 VILLS 時笑到停不下來；最近也常與 Miko 見面，排練過程很開心。';
  if (/Drawing Live|Suisei Wants Miko as a Pet|寵物|繪師聯動|rW32DH_rH-E|nbQNvhr19nU/i.test(raw)) return '船長台繪師聯動畫 Miko，船長、星街、羽衣、犬山一起畫 Miko；星街提到想養 Miko 當寵物。此題材已有多筆重複紀錄，已合併顯示。';
  if (/先導者|抽自己|神抽|KPo5vaoe1Vo/i.test(raw)) return '星街開台抽 Vanguard 卡，因卡池中全是星街而中獎率 100%；Miko 在聊天室出現並稱讚神抽。';
  if (/長休|宣布回歸/i.test(raw)) return 'Miko 宣布即將結束長休回歸，星街送上祝福；Miko 也恭喜星街達成 50 萬訂閱。';
  if (/回歸LIVE|回歸 Live|繼續miComet|15IpFst/i.test(raw)) return 'Miko 回歸 Live 後提到之後還要繼續 miComet，成為兩人關係延續的重要節點。';
  if (/運動會前調整|m9K167jBLJo/i.test(raw)) return '2020 年 Hololive 麥塊大運動會前調整與練習，Miko 視點留下早期 miComet 相關脈絡。';
  if (/Kissing Monster|Business miComet|confess|坦白/i.test(raw)) return 'Minecraft 互動剪輯。星街少見地對 Miko 表達好感，形成早期 Business miComet 代表片段之一。';
  if (/鉱石争奪|礦石爭奪|Ore scramble|PvP/i.test(raw)) return '2020 年 Hololive 麥塊運動會前練習的合作剪輯，Aqua、Subaru、Miko、星街、Noel 參與礦石爭奪 PvP。';
  if (/QiQtiNK7jWw|hololive Minecraft server|ホロ鯖|運動会までもう少し|Sports Festival practice/i.test(raw)) return '2020 年 Hololive 麥塊大運動會前練習，星街視點；這場成為後續多個早期 miComet 互動剪輯的來源。';
  if (/Epic Fail Impostor|AmongUs/i.test(raw)) return 'Holodex 收錄的 Among Us 補充剪輯，作為 Miko／星街互動脈絡的一部分保留。';
  if (/セクハラ|close to Miko and Aqua|靠太近/i.test(raw)) return '後續剪輯引用 2020 年星街 Minecraft 原直播，內容是星街在 Minecraft 中對 Miko 與 Aqua 的距離感玩笑。';
  return currentContext;
}

function cleanup2021Title(story: MiCometStory, currentTitle?: string) {
  if (!story.date.startsWith('2021-')) return currentTitle;
  const raw = rawText(story);
  if (/First Elytra/i.test(raw)) return 'Miko 送給星街第一副鞘翅';
  if (/Kanata and Rushia|カナタとルシア/i.test(raw)) return 'Kanata 與 Rushia 在聊天欄放閃，miComet 也跟著互動';
  if (/Jump Scares|jump scare|ジャンプ/i.test(raw)) return 'Miko 被星街的驚嚇演出逗到大笑';
  if (/Minecraft Usaken Festival/i.test(raw) && /Day 1|第一天/.test(raw)) return '兔建夏祭第一天：miComet 經營鬼屋並約會';
  if (/Minecraft Usaken Festival/i.test(raw) && /Day 2|第二天/.test(raw)) return '兔建夏祭第二天：miComet 再次經營鬼屋並約會';
  if (/14-minute Clip|Summer Festival First Night/i.test(raw)) return '兔建夏祭第一夜 miComet 精華';
  if (/miComet Summer|Afterdate|アフターデート/i.test(raw)) return '夏祭約會：miComet 逛遍各個攤位';
  if (/Sui-chan.*Sora-chan|そらちゃん|星街猜測是否/i.test(raw)) return '星街猜 Miko 說的是「すいちゃん」還是「そらちゃん」';
  if (/Super Bunny Man/i.test(raw)) return 'miComet《Super Bunny Man》聯動';
  if (/Chitchat/i.test(raw) && /Miko|miComet/i.test(raw)) return '星街雜談：聊到 Miko 與 miComet 的關係';
  return fallbackTitle(story, currentTitle);
}

function cleanup2022Title(story: MiCometStory, currentTitle?: string) {
  if (!story.date.startsWith('2022-')) return currentTitle;
  const raw = rawText(story);
  if (/mikorone24|BGM/i.test(raw)) return '星街看了 mikorone24，並表示喜歡 BGM';
  if (/馬車杯|Mario Kart|マリカ杯|zOKiTb5HBGE|v5HFfJZpBkc/i.test(raw)) return '2022 馬車杯前後，Miko 與星街互相鼓勵並回顧同場比賽';
  if (/互寵|pamper|k_IcMoolnj4/i.test(raw)) return 'Miko 與星街互寵片段';
  if (/Stellar Stellar|GHOST|駆けろ|レイニー|mTRv4YApXh8/i.test(raw) && story.date <= '2022-01-26') return 'Miko 談自己喜歡星街的歌，並唱《Stellar Stellar》等曲子';
  if (/アニマル|Animal|9yBLZKFKXyg/i.test(raw) && story.date === '2022-01-27') return 'miComet《アニマル》Cover 公開，成為兩人第一首合唱曲';
  if (/アニマル|Animal|u1pEUH5UevU/i.test(raw) && story.date === '2022-02-04') return '星街提到《アニマル》是在 2021 年底突然想做，於是邀 Miko 一起唱';
  if (/Space|螢幕不亮|monitor|1496086674811809792|0f5In8M8k3M/i.test(raw)) return '星街 Space：原本約好隔天與 Miko 聯動，但電腦螢幕不亮';
  if (/Raft|IJFb5BqQUTg/i.test(raw)) return 'miComet《Raft》聯動只有星街視點，包含合唱與大量 Business 互動';
  if (/全家|FamilyMart|ファミマ|2kc9kCQ|w3txfIENA9M/i.test(raw)) return '全家聯動：Miko、星街、Sora 同時拿著櫻花與星星主題商品';
  if (/學.*捏|「捏」|E2D6DQVPkSY/i.test(raw)) return '星街學 Miko 的「捏」語尾';
  if (/生日倒數|favorite collab|YNwLq-sX4l0/i.test(raw)) return 'Miko 生日倒數投票中，觀眾最喜歡的聯動組合是 miComet';
  if (/生日.*最後來賓|VILLS 的日子|Us1KDp3w8IM/i.test(raw)) return 'Miko 生日 Live 當天公布最後來賓是星街，星街也宣傳 Miko Live';
  if (/約束|Yakusoku|UrOvtpGoW5s|zzh53BQB7v8/i.test(raw)) return 'Miko 回顧與星街合唱《約束之絆》，並談為何 miComet 常強調商業';
  if (/EXPO|裁判所|ElDVor7UmSE/i.test(raw)) return 'Hololive EXPO《ホロライブ裁判所》：與《アニマル》頭像與商業貼貼失敗梗相關';
  if (/灼熱|UQ8oyDu08-0/i.test(raw)) return '星街擔心新曲《灼熱にて純情》又要變成 Miko 的歌';
  if (/Surgeon Simulator|Dr\.miComet|ZmIY2kP/i.test(raw)) return 'Dr.miComet《Surgeon Simulator 2》原直播';
  if (/壁ドン|3vXDA4bprI0/i.test(raw)) return '星街想壁咚 Miko 卻失敗，還被嫌棄';
  if (/HoloCure|MiComet Collab|UzRtq51efjs|ALxCeflv9qg|bc7ZrRJSJoU/i.test(raw)) return 'HoloCure 裡的 miComet 聯動相關反應';
  if (/年末ホロライブ|ゆくホロくるホロ|8ysl5INNWjE|6C8cH9114dI/i.test(raw)) return '年末ホロライブ 2022→2023：みこめっと相關片段';
  return fallbackTitle(story, currentTitle);
}

function cleanup2022Context(story: MiCometStory, currentContext?: string) {
  if (!story.date.startsWith('2022-')) return currentContext;
  const raw = rawText(story);
  if (/mikorone24|BGM/i.test(raw)) return '星街看了 mikorone24，並表示喜歡 BGM，是 2022 年初的間接互動紀錄。';
  if (/馬車杯|Mario Kart|マリカ杯|zOKiTb5HBGE|v5HFfJZpBkc/i.test(raw)) return '2022 馬車杯與相關回顧中，Miko 與星街互相鼓勵；Miko 也提到很高興能與星街一起比賽。';
  if (/互寵|pamper|k_IcMoolnj4/i.test(raw)) return 'Miko 與星街互寵片段，屬於 2022 年初兩人關係逐漸變得坦率的代表案例。';
  if (/Stellar Stellar|GHOST|駆けろ|レイニー|mTRv4YApXh8/i.test(raw) && story.date <= '2022-01-26') return 'Miko 談自己喜歡星街的歌，唱《Stellar Stellar》，並提到 GHOST、駆けろ、レイニー等曲子。';
  if (/アニマル|Animal|9yBLZKFKXyg/i.test(raw) && story.date === '2022-01-27') return 'miComet《アニマル》Cover 公開，這是兩人的第一首合唱曲。';
  if (/アニマル|Animal|u1pEUH5UevU/i.test(raw) && story.date === '2022-02-04') return '星街提到《アニマル》是在 2021 年 12 月底突然想做而邀 Miko，也談到頭像未換等話題。';
  if (/Space|螢幕不亮|monitor|1496086674811809792|0f5In8M8k3M/i.test(raw)) return '星街 Space 提到約好隔天與 Miko 聯動，但電腦螢幕不亮。';
  if (/Raft|IJFb5BqQUTg/i.test(raw)) return 'miComet《Raft》聯動只有星街視點；包含合唱、Stellar Stellar 吐槽、救上床等大量 Business 互動。';
  if (/全家|FamilyMart|ファミマ|2kc9kCQ|w3txfIENA9M/i.test(raw)) return '全家聯動中，Miko、星街、Sora 三人同時拿著櫻花與星星主題商品；星街玩貪食蟲時遇到名為 miComet 的玩家並說「是營業」。';
  if (/學.*捏|「捏」|E2D6DQVPkSY/i.test(raw)) return '星街學 Miko 的「捏」語尾，是 2022 年 miComet 語癖互動之一。';
  if (/生日倒數|favorite collab|YNwLq-sX4l0/i.test(raw)) return 'Miko 生日倒數中，觀眾投票最喜歡的聯動組合是 miComet。';
  if (/生日.*最後來賓|VILLS 的日子|Us1KDp3w8IM/i.test(raw)) return 'Miko 生日當天早上公布最後來賓是星街；星街同日直播宣傳 Miko Live，並提到 miComet 生日大概是 VILLS 的日子。';
  if (/約束|Yakusoku|UrOvtpGoW5s|zzh53BQB7v8/i.test(raw)) return 'Miko 生日 Live 後續回顧中，miComet 合唱《約束之絆》；Miko 提到歌詞與兩人經歷重疊，也談到為何常強調 miComet 是商業。';
  if (/EXPO|裁判所|ElDVor7UmSE/i.test(raw)) return 'Hololive EXPO 現地節目《ホロライブ裁判所》，與《アニマル》頭像、商業貼貼失敗梗相關。';
  if (/灼熱|UQ8oyDu08-0/i.test(raw)) return '星街提到新曲《灼熱にて純情》與 Miko／miComet相關，擔心又會被當成 Miko 的歌。';
  if (/Surgeon Simulator|Dr\.miComet|ZmIY2kP/i.test(raw)) return '原直播來源：Miko Ch. さくらみこ。2022/11/10 的 Dr.miComet《Surgeon Simulator 2》聯動。';
  if (/壁ドン|3vXDA4bprI0/i.test(raw)) return '日文剪輯。星街想壁咚 Miko 卻失敗，還被 Miko 嫌棄。';
  if (/HoloCure|MiComet Collab|UzRtq51efjs|ALxCeflv9qg|bc7ZrRJSJoU/i.test(raw)) return 'HoloCure 裡的 miComet 聯動相關反應與剪輯。';
  if (/年末ホロライブ|ゆくホロくるホロ|8ysl5INNWjE|6C8cH9114dI/i.test(raw)) return '年末ホロライブ 2022→2023 原直播與後續 miComet相關剪輯。';
  return currentContext;
}

function cleanup2023Title(story: MiCometStory, currentTitle?: string) {
  if (!story.date.startsWith('2023-')) return currentTitle;
  const raw = rawText(story);
  if (/bDH7Jcvj72g|お揃い衣装|matching outfits/i.test(raw)) return 'miComet 同款衣裝：Miko 在意起衣裝差異';
  if (/0UIcSapvl9M|FRXZB-hkmKY|マリオカート8DX|Mario Kart|あけおめみこめっと/i.test(raw)) return '新年 miComet《マリオカート8DX》合同練習';
  if (/CNvhdhc0HRw|わからされちゃいます|マリン/i.test(raw)) return 'miComet 收錄「わからされちゃいますぅ」，並聊到 Marine 話題';
  if (/IasJpJa7_zo|Haachama|はあちゃま/i.test(raw)) return 'Miko 收錄後的一句話與星街的反應';
  if (/R0Bkq4qvXfY|New Year's Eve|年末活動/i.test(raw)) return '年末活動中 Miko 與星街互相打鬧';
  if (/iT-xmoF1I30|ご飯|お泊まり|出去吃飯/i.test(raw)) return '星街與 Miko 為何不常出去吃飯';
  if (/RiQNmNhFJAI|合体/i.test(raw)) return 'miComet 同步合體ネタ';
  if (/uvgxbZs-gJs|面白すぎる|揃う/i.test(raw)) return 'Miko 與星街湊在一起時的爆笑總集編';
  if (/575VTWDzsgA|弱気/i.test(raw)) return 'Miko 打了弱氣的星街';
  if (/wnlXLkcCTzk|パッド|墊子/i.test(raw)) return '手描き：墊子話題引發的 miComet 玩笑';
  if (/j6TJbFETAHQ|ゲッダン|Get Down/i.test(raw)) return '星街與 Miko 抓住空檔跳「ゲッダン」';
  if (/ZEWpAy7_T9s|IRL footage/i.test(raw)) return '星街與 Miko 玩鬧的真人素材相關剪輯';
  if (/lQojdq6KdsE|mocopi|Nintendo Switch Sports/i.test(raw) && story.date <= '2023-03-16') return 'miComet 使用 mocopi 遊玩 Nintendo Switch Sports';
  if (/GZgz3ub0eAs|衣装を自慢|炫耀衣裝/i.test(raw)) return 'Miko 想炫耀衣裝，星街冷淡吐槽';
  if (/JDXWd32DHHU|Hilarious moment/i.test(raw)) return '星街在 mocopi 直播中的爆笑瞬間';
  if (/wRQCRg9eP2Q|Marine draws|船長が描く|商品化/i.test(raw)) return 'Marine 畫出可愛 miComet，讓人想商品化';
  if (/6gHSAR0epVY|灼熱する度|灼熱.*見て/i.test(raw)) return '星街唱到《灼熱》時總是看向 Miko';
  if (/BPjDLZDgS3s|問題児|teacher|老師/i.test(raw)) return '星街回憶常與老師起衝突，Miko 吐槽她是問題兒童';
  if (/K5XLFq8XTX4|1ブロ|One Block/i.test(raw)) return '1 Block miComet 第二天：靠 Business 的力量生存';
  if (/PB0u-LM86mc|折檻部屋|punishment/i.test(raw)) return '星街幫 Miko 做了一間折檻房';
  if (/C1WUErvLmT0|new expression|新表情/i.test(raw)) return '星街看到 Miko 的新表情後笑到停不下來';
  if (/jIjg0AcXrLQ|言ってること|聽不懂/i.test(raw)) return '星街有時候真的聽不懂 Miko 在說什麼';
  if (/xhbzF9ussoo|雑談したい|想和 Miko 聊天/i.test(raw)) return '星街想和 Miko 聊天';
  if (/iZKFvsNQ5_s|あくたん|Aqua/i.test(raw)) return 'Miko 問星街為什麼要去找 Aqua 玩';
  if (/2F8CoD-fDz8|リスペクト|尊敬/i.test(raw)) return '星街談自己尊敬 Miko 的地方';
  if (/xkhG27kuhQ4|お土産|伴手禮|souvenir/i.test(raw)) return 'Miko 因為 PON 害星街拿不到伴手禮，於是寫信道歉';
  if (/--gKkzs9fjM|逆襲/i.test(raw)) return '手描き：Miko 的逆襲';
  if (/RbJvd73aA5g|オリ曲|original song|匂わせ/i.test(raw)) return '星街暗示 miComet 原創曲，Miko 慌張阻止';
  if (/X7gWTeXe0NE|匂わせで遊ぶ/i.test(raw)) return 'miComet 用暗示互相玩鬧';
  if (/ReGLOSS|l1GxSWH5glk|896inFcI2yg|2YZ4XzJF0xA|_baN-3CnuUw|Nh-L-TrCkk0|Bv09uCbDimQ/i.test(raw)) return 'miComet 同時視聽 ReGLOSS 初配信';
  if (/jlbZrQ9XE98|イキる|act smug/i.test(raw)) return 'Miko 因星街而學會得意起來';
  if (/sIgMvt9j0fU|爆乳|busty/i.test(raw)) return 'Miko 看到爆乳化的星街後笑噴';
  if (/QVjy6dkw4HE|Ez9Z4KxXEBg|NUAKC74CCRM|hmhrDdEO2Ow|YzA7hVN1As0|1E5Ot69zKI0|qS1jL5N-N7M|AaLSN-RHvWg|ytiYjpmdah4|qBpOop6-hsA|Wario|ワリオ|メイドインワリオ/i.test(raw)) return 'miComet《超おどるメイドインワリオ》mocopi 3D 爆笑回';
  if (/F_DNDs98fq4|肩を揉|揉肩/i.test(raw)) return 'Miko 幫星街揉肩';
  if (/4Uy696KG43E|こんすい|スローモーション/i.test(raw)) return '星街第一次說「こんすい」，miComet 開始慢動作玩梗';
  if (/dpPNQOrS5Dk|WHG5XxJz75k|すいせい列車|星街列車/i.test(raw)) return '手描き：星街列車咻咻咻';
  return fallbackTitle(story, currentTitle);
}

function cleanup2023Context(story: MiCometStory, currentContext?: string) {
  if (!story.date.startsWith('2023-')) return currentContext;
  const raw = rawText(story);
  if (/ReGLOSS|l1GxSWH5glk|896inFcI2yg|2YZ4XzJF0xA|_baN-3CnuUw|Nh-L-TrCkk0|Bv09uCbDimQ/i.test(raw)) return '2023/09/09 miComet 同時視聽 ReGLOSS 初配信；同日多個中文剪輯與 9/12 奏相關剪輯都合併為同一組來源。';
  if (/QVjy6dkw4HE|Ez9Z4KxXEBg|NUAKC74CCRM|hmhrDdEO2Ow|YzA7hVN1As0|1E5Ot69zKI0|qS1jL5N-N7M|AaLSN-RHvWg|ytiYjpmdah4|qBpOop6-hsA|Wario|ワリオ|メイドインワリオ/i.test(raw)) return '2023/11/12 miComet《超おどるメイドインワリオ》原直播與後續 mocopi 3D 爆笑剪輯。大量同源剪輯已合併為同日同類故事。';
  if (/0UIcSapvl9M|マリオカート8DX|Mario Kart/i.test(raw)) return '新年 miComet《マリオカート8DX》合同練習原直播與相關剪輯。';
  if (/K5XLFq8XTX4|1ブロ|One Block/i.test(raw)) return '1 Block miComet 第二天原直播，Miko 與星街靠 Business 的力量繼續生存。';
  if (/RbJvd73aA5g|X7gWTeXe0NE|オリ曲|匂わせ/i.test(raw)) return '星街在 One Block miComet 後續片段中暗示 miComet 原創曲，Miko 慌張反應，後續也衍生匂わせ剪輯。';
  if (/dpPNQOrS5Dk|WHG5XxJz75k|すいせい列車|星街列車/i.test(raw)) return '與 2023/11/12 WarioWare 素材相關的手描き短片，主題是星街列車咻咻咻。';
  return currentContext;
}

function normalizeStory(story: MiCometStory): MiCometStory {
  let titleZh = normalizeZhText(story.titleZh || story.title);
  let ctxZh = normalizeZhText(story.ctxZh || story.ctx);
  titleZh = cleanup2020Title(story, titleZh);
  ctxZh = cleanup2020Context(story, ctxZh);
  titleZh = cleanup2021Title(story, titleZh);
  titleZh = cleanup2022Title(story, titleZh);
  ctxZh = cleanup2022Context(story, ctxZh);
  titleZh = cleanup2023Title(story, titleZh);
  ctxZh = cleanup2023Context(story, ctxZh);
  return { ...story, titleZh, ctxZh };
}

function duplicateKey(story: MiCometStory) {
  const text = rawText(story);
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
  if (story.date.startsWith('2022-')) {
    if (/mikorone24|BGM/i.test(text)) return '2022-01-02:mikorone24-bgm';
    if (/馬車杯|Mario Kart|マリカ杯|zOKiTb5HBGE|v5HFfJZpBkc/i.test(text)) return '2022-01-08:mario-kart-cup';
    if (/互寵|pamper|k_IcMoolnj4/i.test(text)) return '2022-01-10:mutual-pamper';
    if (/Stellar Stellar|GHOST|駆けろ|レイニー|mTRv4YApXh8/i.test(text) && story.date <= '2022-01-26') return '2022-01-26:miko-likes-suisei-songs';
    if (/アニマル|Animal|9yBLZKFKXyg/i.test(text) && story.date === '2022-01-27') return '2022-01-27:animal-cover';
    if (/アニマル|Animal|u1pEUH5UevU/i.test(text) && story.date === '2022-02-04') return '2022-02-04:animal-planning';
    if (/Space|螢幕不亮|monitor|1496086674811809792|0f5In8M8k3M/i.test(text)) return '2022-02-22:space-monitor-collab';
    if (/Raft|IJFb5BqQUTg/i.test(text)) return '2022-02-23:micomet-raft';
    if (/全家|FamilyMart|ファミマ|2kc9kCQ|w3txfIENA9M/i.test(text)) return '2022-03-01:familymart-collab';
    if (/學.*捏|「捏」|E2D6DQVPkSY/i.test(text)) return '2022-03-02:suisei-ne-speech';
    if (/生日倒數|favorite collab|YNwLq-sX4l0/i.test(text)) return '2022-03-04:miko-birthday-countdown';
    if (/生日.*最後來賓|VILLS 的日子|Us1KDp3w8IM/i.test(text)) return '2022-03-05:miko-birthday-suisei-guest';
    if (/約束|Yakusoku|UrOvtpGoW5s|zzh53BQB7v8/i.test(text)) return '2022-03-06:yakusoku-no-kizuna-reflection';
    if (/EXPO|裁判所|ElDVor7UmSE/i.test(text)) return '2022-03-20:hololive-expo-court';
    if (/灼熱|UQ8oyDu08-0/i.test(text)) return '2022-11-05:shakunetsu-miko-song';
    if (/Surgeon Simulator|Dr\.miComet|ZmIY2kP/i.test(text)) return '2022-11-10:surgeon-simulator';
    if (/壁ドン|3vXDA4bprI0/i.test(text)) return '2022-11-10:kabedon-fail';
    if (/HoloCure|MiComet Collab|UzRtq51efjs|ALxCeflv9qg|bc7ZrRJSJoU/i.test(text)) return `${story.date}:holocure-micomet-collab:${story.link ?? story.id}`;
    if (/年末ホロライブ|ゆくホロくるホロ|8ysl5INNWjE|6C8cH9114dI/i.test(text)) return `${story.date}:year-end-hololive-micomet:${story.link ?? story.id}`;
  }
  if (story.date.startsWith('2023-')) {
    if (/ReGLOSS|l1GxSWH5glk|896inFcI2yg|2YZ4XzJF0xA|_baN-3CnuUw|Nh-L-TrCkk0|Bv09uCbDimQ/i.test(text)) return '2023-09-09:regloss-watchalong';
    if (/QVjy6dkw4HE|Ez9Z4KxXEBg|NUAKC74CCRM|hmhrDdEO2Ow|YzA7hVN1As0|1E5Ot69zKI0|qS1jL5N-N7M|AaLSN-RHvWg|ytiYjpmdah4|qBpOop6-hsA|Wario|ワリオ|メイドインワリオ/i.test(text)) return `${story.date}:warioware-mocopi:${story.side}`;
    if (/dpPNQOrS5Dk|WHG5XxJz75k|すいせい列車|星街列車/i.test(text)) return '2023-12:suisei-train';
    return `${story.date}:${story.side}`;
  }
  const linkKey = story.link || `${story.ctx} ${story.ctxZh ?? ''}`.match(/https?:\/\/\S+/)?.[0];
  if (linkKey) return `link:${linkKey}`;
  return `id:${story.id}`;
}

function storyUrls(story: MiCometStory) {
  return [story.link, ...(rawText(story).match(/https?:\/\/\S+/g) ?? [])].filter(Boolean) as string[];
}

function mergeDuplicateStory(base: MiCometStory, extra: MiCometStory): MiCometStory {
  const existing = `${base.link ?? ''} ${base.ctx ?? ''} ${base.ctxZh ?? ''}`;
  const extraUrls = storyUrls(extra).filter((url) => !existing.includes(url)).slice(0, 8);
  if (extraUrls.length === 0) return base;
  const addition = ` 補充來源：${extraUrls.join(' / ')}`;
  return {
    ...base,
    ctx: `${base.ctx}${addition}`,
    ctxZh: `${base.ctxZh ?? base.ctx}${addition}`,
  };
}

function normalizeAndMergeStories(stories: MiCometStory[]) {
  const map = new Map<string, MiCometStory>();
  stories.map(normalizeStory).forEach((story) => {
    const key = duplicateKey(story);
    const current = map.get(key);
    map.set(key, current ? mergeDuplicateStory(current, story) : story);
  });
  return [...map.values()];
}

export const MICOMET_TIMELINE: MiCometStory[] = normalizeAndMergeStories([
  ...(timeline2020PttBbqData as MiCometStory[]),
  ...(timeline2022PttBbqData as MiCometStory[]),
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
