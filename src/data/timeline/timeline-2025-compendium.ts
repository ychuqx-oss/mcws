import q1 from './timeline-2025-compendium-q1';
import q2 from './timeline-2025-compendium-q2';
import q3 from './timeline-2025-compendium-q3';
import q4 from './timeline-2025-compendium-q4';

const rows = [q1, q2, q3, q4].filter(Boolean).join('\n');

const data = rows.split('\n').map((row) => {
  const [id, displayId, date, phase, side, emoji, type, title] = row.split('|');
  const ctx = `${title}。來源：MiComet Compendium II。`;
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
