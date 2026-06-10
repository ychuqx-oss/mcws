import { useMemo, useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { MICOMET_TIMELINE, type MiCometStory } from '@/data/miCometTimelineAll';

type Side = 'miko' | 'suisei' | 'shared' | 'others';
type ChartMode = 'year' | 'month';

const YEAR_START = 2019;
const YEAR_END = 2026;

const SIDE_LABELS: Record<Side, string> = {
  miko: 'Miko',
  suisei: 'Suisei',
  shared: '共同故事',
  others: '其他',
};

const PHASE_LABELS: Record<number, string> = {
  1: '開端',
  2: '升溫',
  3: '公開承認',
  4: '日常化',
  5: '後期',
  6: '2025-2026',
};

function formatDate(dateISO: string) {
  const date = new Date(`${dateISO}T00:00:00Z`);
  return `${date.getUTCFullYear()}年${date.getUTCMonth() + 1}月${date.getUTCDate()}日`;
}

function monthKey(dateISO: string) {
  return dateISO.slice(0, 7);
}

function buildChartData(mode: ChartMode, stories: MiCometStory[]) {
  const deduped = [...stories]
    .sort((a, b) => a.date.localeCompare(b.date))
    .filter((story, index, list) => {
      const prev = list.slice(0, index).some((other) => other.date === story.date && other.side === story.side && other.title === story.title);
      return !prev;
    });

  const monthly = new Map<string, { miko: number; suisei: number; shared: number }>();
  deduped.forEach((story) => {
    const key = monthKey(story.date);
    const point = monthly.get(key) ?? { miko: 0, suisei: 0, shared: 0 };
    if (story.side === 'miko') point.miko += 1;
    if (story.side === 'suisei') point.suisei += 1;
    if (story.side === 'shared') {
      point.shared += 1;
      point.miko += 1;
      point.suisei += 1;
    }
    monthly.set(key, point);
  });

  if (mode === 'year') {
    let miko = 0;
    let suisei = 0;
    let shared = 0;
    return Array.from({ length: YEAR_END - YEAR_START + 1 }, (_, idx) => YEAR_START + idx).map((year) => {
      const yearStr = String(year);
      let yearMiko = 0;
      let yearSuisei = 0;
      let yearShared = 0;
      for (const [key, value] of monthly.entries()) {
        if (!key.startsWith(yearStr)) continue;
        yearMiko += value.miko;
        yearSuisei += value.suisei;
        yearShared += value.shared;
      }
      miko += yearMiko;
      suisei += yearSuisei;
      shared += yearShared;
      return { label: String(year), miko, suisei, shared };
    });
  }

  let miko = 0;
  let suisei = 0;
  let shared = 0;
  const points: Array<{ label: string; miko: number; suisei: number; shared: number }> = [];
  for (let year = YEAR_START; year <= YEAR_END; year += 1) {
    for (let month = 1; month <= 12; month += 1) {
      const key = `${year}-${String(month).padStart(2, '0')}`;
      const value = monthly.get(key) ?? { miko: 0, suisei: 0, shared: 0 };
      miko += value.miko;
      suisei += value.suisei;
      shared += value.shared;
      points.push({ label: `${year}/${String(month).padStart(2, '0')}`, miko, suisei, shared });
    }
  }
  return points;
}

function countBySide(stories: MiCometStory[]) {
  return stories.reduce<Record<Side, number>>(
    (acc, story) => {
      acc[story.side] += 1;
      return acc;
    },
    { miko: 0, suisei: 0, shared: 0, others: 0 },
  );
}

function groupByDate(stories: MiCometStory[]) {
  return stories.reduce<Array<{ date: string; items: MiCometStory[] }>>((acc, story) => {
    const last = acc[acc.length - 1];
    if (last && last.date === story.date) last.items.push(story);
    else acc.push({ date: story.date, items: [story] });
    return acc;
  }, []);
}

function getLink(item: MiCometStory) {
  const text = `${item.title} ${item.ctx}`;
  const yt = text.match(/https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)\/\S+/);
  if (yt) return { type: 'yt' as const, url: yt[0].replace(/[\u300d\u300f\)]+$/, '') };
  const tw = text.match(/https?:\/\/(?:www\.)?(?:twitter\.com|x\.com)\/\S+/);
  if (tw) return { type: 'tw' as const, url: tw[0].replace(/[\u300d\u300f\)]+$/, '') };
  return null;
}

function Card({ item, onOpen }: { item: MiCometStory; onOpen: (item: MiCometStory) => void }) {
  const link = getLink(item);
  return (
    <article
      onClick={() => onOpen(item)}
      style={{
        borderRadius: 16,
        padding: 16,
        background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015))',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 10px 28px rgba(0,0,0,0.28)',
        cursor: 'pointer',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
        <div style={{ color: '#c4c9d6', fontSize: 12 }}>{formatDate(item.date)}</div>
        <div style={{ color: item.side === 'miko' ? '#3b82f6' : item.side === 'suisei' ? '#a855f7' : '#ff4fa0', fontSize: 12, fontWeight: 700 }}>
          {SIDE_LABELS[item.side]}
        </div>
      </div>
      <div style={{ marginTop: 10, fontSize: 15, fontWeight: 800, lineHeight: 1.45, color: '#f6f7fb' }}>{item.titleZh || item.title}</div>
      <div style={{ marginTop: 8, color: '#a7adbb', fontSize: 13, lineHeight: 1.55 }}>{item.ctxZh || item.ctx}</div>
      <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <div style={{ color: '#7f8594', fontSize: 12 }}>Phase {item.phase} · {PHASE_LABELS[item.phase] ?? '故事'}</div>
        <div style={{ color: '#cfd4de', fontSize: 12 }}>{link ? (link.type === 'yt' ? 'YouTube' : 'X/Twitter') : '詳情'}</div>
      </div>
    </article>
  );
}

function Modal({ item, onClose }: { item: MiCometStory; onClose: () => void }) {
  const link = getLink(item);
  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.72)',
        display: 'grid',
        placeItems: 'center',
        padding: 16,
        zIndex: 40,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(720px, 100%)',
          borderRadius: 20,
          background: '#111420',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 24px 60px rgba(0,0,0,0.5)',
          padding: 20,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'start' }}>
          <div>
            <div style={{ color: '#8f96a8', fontSize: 12 }}>{formatDate(item.date)}</div>
            <h3 style={{ margin: '8px 0 0', fontSize: 22, lineHeight: 1.3 }}>{item.titleZh || item.title}</h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#0d0f15',
              color: '#fff',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: 999,
              width: 36,
              height: 36,
              fontSize: 18,
              cursor: 'pointer',
            }}
          >
            ×
          </button>
        </div>
        <div style={{ marginTop: 14, color: '#cfd4de', lineHeight: 1.7 }}>{item.ctxZh || item.ctx}</div>
        {link ? (
          <a
            href={link.url}
            target="_blank"
            rel="noreferrer"
            style={{ display: 'inline-block', marginTop: 16, color: '#ff5aa5', fontWeight: 700 }}
          >
            開啟原始來源
          </a>
        ) : null}
      </div>
    </div>
  );
}

function ChartSection({ stories }: { stories: MiCometStory[] }) {
  const [mode, setMode] = useState<ChartMode>('year');
  const data = useMemo(() => buildChartData(mode, stories), [mode, stories]);

  return (
    <section
      style={{
        marginTop: 28,
        borderRadius: 24,
        background: '#141722',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 20px 50px rgba(0,0,0,0.28)',
        padding: 20,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'start', marginBottom: 14 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 800 }}>故事數量折線圖</div>
          <div style={{ color: '#9aa2b2', marginTop: 4, fontSize: 13 }}>年 / 月切換，統計 Miko、Suisei 與共同故事的累計變化</div>
        </div>
        <div style={{ display: 'flex', gap: 8, background: '#0d0f15', borderRadius: 14, padding: 6, border: '1px solid rgba(255,255,255,0.08)' }}>
          <button
            onClick={() => setMode('year')}
            style={{
              background: mode === 'year' ? '#1c2030' : 'transparent',
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              padding: '10px 14px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            年
          </button>
          <button
            onClick={() => setMode('month')}
            style={{
              background: mode === 'month' ? '#1c2030' : 'transparent',
              color: '#fff',
              border: 'none',
              borderRadius: 10,
              padding: '10px 14px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
          >
            月
          </button>
        </div>
      </div>
      <div style={{ height: 420 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 12, right: 20, left: 0, bottom: 38 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.12)" strokeDasharray="4 6" />
            <XAxis
              dataKey="label"
              tick={{ fill: '#8f96a8', fontSize: 12 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.14)' }}
              tickLine={{ stroke: 'rgba(255,255,255,0.14)' }}
              interval={mode === 'year' ? 0 : 2}
              angle={-45}
              textAnchor="end"
              height={48}
            />
            <YAxis
              tick={{ fill: '#8f96a8', fontSize: 12 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.14)' }}
              tickLine={{ stroke: 'rgba(255,255,255,0.14)' }}
              allowDecimals={false}
              label={{ value: '累計故事數', angle: -90, position: 'insideLeft', fill: '#9aa2b2' }}
            />
            <Tooltip
              contentStyle={{ background: '#0f1220', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12 }}
              labelStyle={{ color: '#fff' }}
            />
            <Line type="monotone" dataKey="miko" name="Miko 累計" stroke="#3b82f6" strokeWidth={3} dot={false} />
            <Line type="monotone" dataKey="suisei" name="Suisei 累計" stroke="#a855f7" strokeWidth={3} dot={false} />
            <Line type="monotone" dataKey="shared" name="共同故事累計" stroke="#ff4fa0" strokeWidth={2.5} strokeDasharray="6 6" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 18, flexWrap: 'wrap', marginTop: 8, color: '#cfd4de' }}>
        <div style={{ color: '#3b82f6' }}>● Miko 累計</div>
        <div style={{ color: '#a855f7' }}>● Suisei 累計</div>
        <div style={{ color: '#ff4fa0' }}>● 共同故事累計</div>
      </div>
    </section>
  );
}

export default function Index() {
  const [search, setSearch] = useState('');
  const [yearFilter, setYearFilter] = useState(0);
  const [openItem, setOpenItem] = useState<MiCometStory | null>(null);

  const years = useMemo(() => Array.from(new Set(MICOMET_TIMELINE.map((story) => Number(story.date.slice(0, 4))))).sort((a, b) => a - b), []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return MICOMET_TIMELINE.filter((story) => {
      if (yearFilter !== 0 && Number(story.date.slice(0, 4)) !== yearFilter) return false;
      if (!q) return true;
      return [story.date, story.title, story.titleZh ?? '', story.ctx, story.ctxZh ?? ''].join(' ').toLowerCase().includes(q);
    }).sort((a, b) => a.date.localeCompare(b.date));
  }, [search, yearFilter]);

  const stats = useMemo(() => {
    const counts = countBySide(MICOMET_TIMELINE);
    const sorted = [...MICOMET_TIMELINE].sort((a, b) => a.date.localeCompare(b.date));
    return {
      counts,
      total: sorted.length,
      first: sorted[0],
      last: sorted[sorted.length - 1],
    };
  }, []);

  const groups = useMemo(() => groupByDate(filtered), [filtered]);
  const yearsInFiltered = useMemo(() => Array.from(new Set(filtered.map((story) => Number(story.date.slice(0, 4))))).sort((a, b) => a - b), [filtered]);

  return (
    <div style={{ minHeight: '100vh', background: '#12141d', color: '#fff', padding: '22px 16px 40px' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <header style={{ marginBottom: 18 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'start', flexWrap: 'wrap' }}>
            <div>
              <h1 style={{ fontSize: 30, fontWeight: 900, margin: 0, lineHeight: 1.1 }}>miComet 故事檔案</h1>
              <div style={{ color: '#9aa2b2', marginTop: 6, fontSize: 14 }}>黑底時間軸頁面，折線圖只是內容區塊，不是首頁主視覺。</div>
            </div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <div style={{ padding: '10px 14px', borderRadius: 999, background: '#0d0f15', border: '1px solid rgba(255,255,255,0.08)', color: '#d8dbe3', fontSize: 13 }}>
                {formatDate(stats.first?.date ?? '2019-07-23')} 起
              </div>
              <div style={{ padding: '10px 14px', borderRadius: 999, background: '#0d0f15', border: '1px solid rgba(255,255,255,0.08)', color: '#d8dbe3', fontSize: 13 }}>
                {formatDate(stats.last?.date ?? '2026-03-29')} 迄
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 14, marginTop: 18 }}>
            {[
              { label: 'Miko', value: stats.counts.miko, tone: '#3b82f6' },
              { label: 'Suisei', value: stats.counts.suisei, tone: '#a855f7' },
              { label: '共同', value: stats.counts.shared, tone: '#ff4fa0' },
              { label: '總故事', value: stats.total, tone: '#10a54d' },
            ].map((item) => (
              <div key={item.label} style={{ borderRadius: 18, padding: '16px 18px', background: '#171a26', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ color: '#9aa2b2', fontSize: 13 }}>{item.label}</div>
                <div style={{ color: item.tone, fontWeight: 900, fontSize: 28, marginTop: 6 }}>{item.value}</div>
              </div>
            ))}
          </div>
        </header>

        <section style={{ borderRadius: 20, background: '#151823', border: '1px solid rgba(255,255,255,0.06)', padding: 16, boxShadow: '0 18px 42px rgba(0,0,0,0.24)' }}>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ flex: '1 1 320px', display: 'flex', alignItems: 'center', gap: 10, background: '#0d0f15', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, padding: '12px 14px' }}>
              <span style={{ color: '#8f96a8' }}>⌕</span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="搜尋故事、關鍵字、日期..."
                style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontSize: 14 }}
              />
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
              <span style={{ color: '#9aa2b2', fontSize: 13 }}>篩選年份：</span>
              <button
                onClick={() => setYearFilter(0)}
                style={{ padding: '10px 14px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)', background: yearFilter === 0 ? '#232838' : '#0d0f15', color: '#fff', cursor: 'pointer' }}
              >
                全部
              </button>
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setYearFilter(yearFilter === year ? 0 : year)}
                  style={{ padding: '10px 14px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)', background: yearFilter === year ? '#232838' : '#0d0f15', color: '#fff', cursor: 'pointer' }}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section style={{ marginTop: 18, color: '#b5bbca', fontSize: 13 }}>
          找到 {filtered.length} 筆故事 · {yearsInFiltered.length ? yearsInFiltered.join(' / ') : '無資料'}
        </section>

        <main style={{ marginTop: 16, display: 'grid', gap: 18 }}>
          {groups.length === 0 ? (
            <div style={{ padding: 36, borderRadius: 18, background: '#151823', color: '#9aa2b2', textAlign: 'center' }}>沒有符合條件的故事</div>
          ) : (
            groups.map((group) => {
              const year = Number(group.date.slice(0, 4));
              return (
                <section key={group.date} style={{ borderRadius: 20, background: '#151823', border: '1px solid rgba(255,255,255,0.06)', padding: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
                    <div>
                      <div style={{ color: '#8f96a8', fontSize: 12 }}>{year}</div>
                      <h2 style={{ margin: '4px 0 0', fontSize: 20 }}>{formatDate(group.date)}</h2>
                    </div>
                    <div style={{ color: '#9aa2b2', fontSize: 13 }}>Phase {group.items[0]?.phase ?? '-'} · {PHASE_LABELS[group.items[0]?.phase ?? 0] ?? '故事'}</div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
                    {group.items.map((item) => (
                      <Card key={item.id} item={item} onOpen={setOpenItem} />
                    ))}
                  </div>
                </section>
              );
            })
          )}
        </main>

        <ChartSection stories={MICOMET_TIMELINE} />

        <section style={{ marginTop: 22, borderRadius: 18, background: '#151823', border: '1px solid rgba(255,255,255,0.06)', padding: 16, color: '#9aa2b2', fontSize: 13, lineHeight: 1.7 }}>
          分析規則：同一天同一人只算一筆；共同故事同時計入 Miko 與 Suisei。折線圖是內容區塊，已移回頁面下方。
        </section>
      </div>

      {openItem ? <Modal item={openItem} onClose={() => setOpenItem(null)} /> : null}
    </div>
  );
}
