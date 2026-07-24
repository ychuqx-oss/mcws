import q1 from './timeline-2025-compendium-q1';
import q2 from './timeline-2025-compendium-q2';
import q3 from './timeline-2025-compendium-q3';
import q4 from './timeline-2025-compendium-q4';

const rows = [q1, q2, q3, q4].filter(Boolean).join('\n');

const typeLabel: Record<string, string> = {
  Clip: '剪輯',
  Stream: '直播',
  News: '消息',
  Text: '推文',
  Audio: '音訊',
  Music: '音樂',
};

const data = rows.split('\n').map((row) => {
  const [id, displayId, date, phase, side, emoji, type, title] = row.split('|');
  const ctx = `${typeLabel[type] ?? '故事'}條目：${title}。來源：MiComet Compendium II。`;
  return {
    id,
    displayId,
    date,
    phase: Number(phase),
    side: side as 'miko' | 'suisei' | 'shared' | 'others',
    emoji,
    title,
    titleZh: title,
    ctx,
    ctxZh: ctx,
    type,
    link: '',
  };
});

export default data;
