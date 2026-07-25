import q1 from './timeline-2025-compendium-q1';
import q2 from './timeline-2025-compendium-q2';
import q3 from './timeline-2025-compendium-q3';
import q4 from './timeline-2025-compendium-q4';

const rows = [q1, q2, q3, q4].filter(Boolean).join('\n');

type Side = 'miko' | 'suisei' | 'shared' | 'others';

const specificTitles: Record<string, string> = {
  'c2-2025-129': 'FubuMiComet相關直播',
  'c2-2025-130': '星街談到miComet圖與粉絲圖',
  'c2-2025-131': '星街談鋼彈話題',
  'c2-2025-132': '戌神沁音談到miComet',
  'c2-2025-133': 'Miko轉推miComet動畫',
  'c2-2025-134': '星街建議寶鐘瑪琳找白上吹雪和Miko玩以提升動力',
  'c2-2025-135': '星街轉推miComet圖',
  'c2-2025-136': 'Miko炫耀抽中Switch 2',
  'c2-2025-137': '星街在Miko直播中談麥塊城堡、鋼彈、Raft與周年',
  'c2-2025-138': 'miComet計畫在麥塊蓋城堡',
  'c2-2025-139': '星街觀看Miko直播',
  'c2-2025-140': '星街觀眾要她去Miko家看鋼彈最終話',
  'c2-2025-141': 'Miko直播中提到星街',
  'c2-2025-142': 'Miko剪輯星街相關互動',
  'c2-2025-143': 'Miko發布miComet圖相關推文',
  'c2-2025-144': 'Miko直播中提到星街',
  'c2-2025-145': 'Miko發布miComet打情罵俏推文',
  'c2-2025-146': 'miComet相關消息',
  'c2-2025-147': 'Miko轉推miComet圖',
  'c2-2025-148': 'FubuMiComet參加VRChat',
  'c2-2025-149': '白上吹雪談到miComet',
  'c2-2025-150': 'Miko再次談到星街',
  'c2-2025-151': 'miComet相關消息',
  'c2-2025-152': 'miComet瑪利歐賽車連動與相關圖',
  'c2-2025-153': '鷹嶺琉依談到miComet',
  'c2-2025-154': 'Miko發布瑪利歐賽車與miComet圖相關推文',
  'c2-2025-155': 'Miko直播中提到星街',
  'c2-2025-156': '白上吹雪在6月調侃FubuMiComet',
  'c2-2025-157': 'Miko直播中提到星街',
  'c2-2025-158': 'Miko轉推miComet圖',
  'c2-2025-159': 'SubaMiComet參加R.E.P.O.連動',
  'c2-2025-160': 'Miko談到星街與狗',
  'c2-2025-161': 'Miko直播中提到星街',
  'c2-2025-162': 'Miko發布miComet圖相關推文',
  'c2-2025-163': 'Miko發布miComet互動推文',
  'c2-2025-164': 'Hololive成員談到miComet',
  'c2-2025-165': '星街談麥塊與Raft互動',
  'c2-2025-166': '星街剪輯中的miComet互動',
  'c2-2025-167': 'Miko談到miComet圖',
  'c2-2025-168': '星街談到miComet圖',
  'c2-2025-169': '星街直播中提到Miko',
  'c2-2025-170': '星街直播中提到Miko',
  'c2-2025-171': 'Miko發布miComet圖相關推文',
  'c2-2025-172': '星街發布miComet圖相關推文',
  'c2-2025-173': 'miComet麥塊與Raft連動',
  'c2-2025-174': 'Miko直播中提到星街',
  'c2-2025-175': 'Miko與星街在廣播中互動',
  'c2-2025-176': '鷹嶺琉依談到miComet',
  'c2-2025-177': '星街直播中提到Miko',
  'c2-2025-178': 'Miko轉推miComet圖',
  'c2-2025-179': 'Miko與星街麥塊與Raft連動',
  'c2-2025-180': 'Miko轉推miComet圖',
  'c2-2025-181': '星街發布miComet相關推文',
  'c2-2025-182': 'Miko談到星街',
  'c2-2025-183': 'miComet相關消息',
  'c2-2025-184': 'Miko發布與星街相關的短片',
  'c2-2025-185': 'Miko直播中提到星街',
  'c2-2025-186': 'Miko發布miComet圖相關推文',
  'c2-2025-187': 'Miko參與FubuMiComet相關內容',
  'c2-2025-188': '星街在廣播中談到miComet',
  'c2-2025-189': 'Miko直播中提到星街',
  'c2-2025-190': 'Miko談到miComet圖',
  'c2-2025-191': '星街談旅行與推文話題',
  'c2-2025-192': 'FubuMiComet談到約會話題',
  'c2-2025-193': 'Miko談鋼彈話題',
  'c2-2025-194': 'Miko談旅行話題',
  'c2-2025-195': 'Miko剪輯星街相關互動',
  'c2-2025-196': '白上吹雪談到miComet與VRChat',
  'c2-2025-197': 'Miko直播中提到星街',
  'c2-2025-198': 'Miko轉推miComet圖',
  'c2-2025-199': 'Miko發布miComet互動推文',
  'c2-2025-200': '白上吹雪與星街出現在Miko短片中',
  'c2-2025-201': 'Miko直播中提到星街',
  'c2-2025-202': 'Miko談旅行話題',
  'c2-2025-203': 'Miko轉推FubuMiComet圖',
  'c2-2025-204': 'Miko直播中提到星街',
  'c2-2025-205': 'Hololive成員談到miComet',
  'c2-2025-206': '角卷綿芽談到miComet',
  'c2-2025-207': 'Miko與星街同場互動',
};

function hasBadTitle(title: string) {
  return /相關紀錄|條目|相關話題|\bmakes\b|\babout\b|\bmerch\b|\bfigures\b|\bappear\b|\bscreenshot\b|cosplay|thumbnail|\w+'s|FubuMiComet的FubuMiComet|teetee|Shiraken/.test(title);
}

function cleanTitle(title: string) {
  return title
    .replace(/\s+/g, '')
    .replace(/Miko\s*轉推\s*miComet/g, 'Miko轉推miComet')
    .replace(/白上吹雪\s*發推\s*about\s*miComet/g, '白上吹雪發推談miComet')
    .replace(/Miko\s*對\s*miComet\s*圖/g, 'Miko對miComet圖作出反應')
    .replace(/Miko\s*轉推\s*MaguTako\s*為\s*周年/g, 'Miko轉推MaguTako周年圖')
    .replace(/Miko\s*談到\s*商業\s*forever/g, 'Miko談到商業Forever')
    .replace(/星街\s*拿走\s*screenshot\s*從\s*Miko的\s*直播/g, '星街從Miko直播中擷取截圖')
    .replace(/Miko\s*抱怨\s*商業\s*violation/g, 'Miko抱怨商業違規')
    .replace(/miComet\s*appear\s*在\s*Hololive\s*短片/g, 'miComet出現在Hololive短片')
    .replace(/miComet\s*appear\s*在\s*白上吹雪的\s*MV/g, 'miComet出現在白上吹雪MV')
    .replace(/miComet\s*teetee\s*在\s*白上吹雪的\s*直播/g, '白上吹雪直播中的miComet貼貼')
    .replace(/麥塊\s*Ao的\s*直播，Miko的\s*直播，星街的/g, 'Miko與星街參與麥塊互動')
    .replace(/FubuMiComet的FubuMiComet/g, 'FubuMiComet')
    .replace(/miCometfigures/g, 'miComet模型消息')
    .replace(/miComet的圖/g, 'miComet圖')
    .replace(/miComet的/g, 'miComet')
    .replace(/Miko的/g, 'Miko')
    .replace(/星街的/g, '星街')
    .replace(/AZKi的/g, 'AZKi')
    .replace(/白上吹雪的/g, '白上吹雪')
    .replace(/旅行相關紀錄/g, '談到旅行話題')
    .replace(/睡覺相關紀錄/g, '談到睡覺話題')
    .replace(/打情罵俏相關紀錄/g, '談到miComet打情罵俏')
    .replace(/麥塊、Raft相關紀錄/g, '麥塊與Raft互動')
    .replace(/周年、麥塊、Raft相關紀錄/g, '周年、麥塊與Raft互動')
    .replace(/周年、生日相關紀錄/g, '周年與生日互動')
    .replace(/圖、睡覺相關紀錄/g, 'miComet圖與睡覺話題')
    .replace(/廣播相關紀錄/g, '廣播談到miComet')
    .replace(/商業相關紀錄/g, '談到商業互動')
    .replace(/圖相關紀錄/g, 'miComet圖消息')
    .replace(/互動相關紀錄/g, '互動')
    .replace(/相關紀錄/g, '互動');
}

function topicFallback(date: string, side: Side, type: string, rawTitle: string) {
  const title = cleanTitle(rawTitle);
  if (/麥塊|Raft/.test(title)) return side === 'shared' ? 'Miko與星街麥塊與Raft互動' : `${side === 'suisei' ? '星街' : side === 'miko' ? 'Miko' : 'Hololive成員'}談麥塊與Raft互動`;
  if (/旅行/.test(title)) return `${side === 'suisei' ? '星街' : side === 'miko' ? 'Miko' : 'Hololive成員'}談旅行話題`;
  if (/圖|動畫|粉絲圖/.test(title)) return title;
  if (/鋼彈/.test(title)) return `${side === 'suisei' ? '星街' : side === 'miko' ? 'Miko' : 'Hololive成員'}談鋼彈話題`;
  if (/廣播/.test(title)) return `${side === 'suisei' ? '星街' : side === 'miko' ? 'Miko' : 'Hololive成員'}在廣播中談到miComet`;
  return '';
}

function normalizeTitle(id: string, date: string, side: Side, type: string, rawTitle: string) {
  if (specificTitles[id]) return specificTitles[id];
  const cleaned = cleanTitle(rawTitle).trim();
  if (!hasBadTitle(cleaned) && cleaned.length >= 6) return cleaned;
  const topic = topicFallback(date, side, type, rawTitle);
  if (topic) return topic;
  return cleaned.replace(/互動$/g, '互動內容待補');
}

const data = rows.split('\n').map((row) => {
  const [id, displayId, date, phase, sideRaw, emoji, type, rawTitle] = row.split('|');
  const side = sideRaw as Side;
  const title = normalizeTitle(id, date, side, type, rawTitle);
  const ctx = `${title}。`;
  return {
    id,
    displayId,
    date,
    phase: Number(phase),
    side,
    emoji,
    title,
    titleZh: title,
    ctx,
    ctxZh: ctx,
    type,
    link: '',
    source: 'MiComet Compendium II',
  };
});

export default data;