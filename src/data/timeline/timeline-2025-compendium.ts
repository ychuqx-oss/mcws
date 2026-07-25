import q1 from './timeline-2025-compendium-q1';
import q2 from './timeline-2025-compendium-q2';
import q3 from './timeline-2025-compendium-q3';
import q4 from './timeline-2025-compendium-q4';

const rows = [q1, q2, q3, q4].filter(Boolean).join('\n');

type Side = 'miko' | 'suisei' | 'shared' | 'others';

function hasBadTitle(title: string) {
  return /相關紀錄|條目|\bmakes\b|\babout\b|\bmerch\b|\bfigures\b|\bappear\b|\bscreenshot\b|cosplay|thumbnail|\w+'s|FubuMiComet的FubuMiComet|teetee|Shiraken/.test(title);
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
    .replace(/互動相關紀錄/g, '提到星街相關話題')
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
    .replace(/相關紀錄/g, '互動');
}

function fallbackTitle(date: string, side: Side, type: string) {
  const d = date.replace(/-/g, '/');
  if (side === 'miko') return type === 'Text' ? `Miko在${d}發推或轉推星街相關內容` : `Miko在${d}直播提到星街相關話題`;
  if (side === 'suisei') return type === 'Text' ? `星街在${d}發推談Miko相關內容` : `星街在${d}直播提到Miko相關話題`;
  if (side === 'shared') return `Miko與星街在${d}同場連動`;
  return `Hololive成員在${d}提到miComet相關話題`;
}

function normalizeTitle(date: string, side: Side, type: string, rawTitle: string) {
  const cleaned = cleanTitle(rawTitle).trim();
  if (!hasBadTitle(cleaned) && cleaned.length >= 6) return cleaned;
  return fallbackTitle(date, side, type);
}

const data = rows.split('\n').map((row) => {
  const [id, displayId, date, phase, sideRaw, emoji, type, rawTitle] = row.split('|');
  const side = sideRaw as Side;
  const title = normalizeTitle(date, side, type, rawTitle);
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