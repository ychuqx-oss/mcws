import { useMemo, useState } from 'react';
import {
  CartesianGrid,
  Legend,
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

type CountPoint = {
  label: string;
  miko: number;
  suisei: number;
  shared: number;
};

const YEAR_START = 2019;
const YEAR_END = 2026;

const COLORS = {
  miko: '#ff7dbb',
  suisei: '#66a9ff',
  shared: '#ffd166',
  total: '#7ee2a8',
};

const TYPE_LABELS: Record<string, string> = {
  Clip: '剪輯',
  Stream: '直播',
  News: '綜合',
  Text: '文字',
};

function formatDate(dateISO: string) {
  const date = new Date(`${dateISO}T00:00:00Z`);
  return `${date.getUTCFullYear()}年${date.getUTCMonth() + 1}月${date.getUTCDate()}日`;
}

function monthKey(dateISO: string) {
  return dateISO.slice(0, 7);
}

function normalizeStories(stories: MiCometStory[]) {
  const seen = new Set<string>();
  return [...stories]
    .sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id))
    .filter((story) => {
      const key = `${story.date}:${story.side}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
}

function summarizeTimeline(stories: MiCometStory[]) {
  const timeline = normalizeStories(stories);
  const counts = timeline.reduce<Record<Side, number>>(
    (acc, story) => {
      acc[story.side] += 1;
      return acc;
    },
    { miko: 0, suisei: 0, shared: 0, others: 0 },
  );
  const years = [...new Set(timeline.map((story) => Number(story.date.slice(0, 4))))].sort((a, b) => a - b);
  return {
    timeline,
    counts,
    totals: {
      miko: counts.miko + counts.shared,
      suisei: counts.suisei + counts.shared,
      shared: counts.shared,
      total: timeline.length,
    },
    first: timeline[0],
    last: timeline[timeline.length - 1],
    years,
  };
}

function buildTypeCounts(stories: MiCometStory[]) {
  const counts: Record<string, number> = {};
  stories.forEach((story) => {
    counts[story.type] = (counts[story.type] ?? 0) + 1;
  });
  return counts;
}

function buildMonthlyCounts(stories: MiCometStory[]) {
  const monthly = new Map<string, { miko: number; suisei: number; shared: number }>();

  stories.forEach((story) => {
    const key = monthKey(story.date);
    const current = monthly.get(key) ?? { miko: 0, suisei: 0, shared: 0 };

    if (story.side === 'miko') current.miko += 1;
    if (story.side === 'suisei') current.suisei += 1;
    if (story.side === 'shared') {
      current.shared += 1;
      current.miko += 1;
      current.suisei += 1;
    }

    monthly.set(key, current);
  });

  return monthly;
}

function sumYear(map: Map<string, { miko: number; suisei: number; shared: number }>, year: number) {
  const yearKey = String(year);
  return [...map.entries()]
    .filter(([key]) => key.startsWith(yearKey))
    .reduce(
      (acc, [, value]) => ({
        miko: acc.miko + value.miko,
        suisei: acc.suisei + value.suisei,
        shared: acc.shared + value.shared,
      }),
      { miko: 0, suisei: 0, shared: 0 },
    );
}

function buildCountPoints(mode: ChartMode, stories: MiCometStory[]) {
  const timeline = normalizeStories(stories);
  const monthly = buildMonthlyCounts(timeline);
  const points: CountPoint[] = [];

  if (mode === 'year') {
    for (let year = YEAR_START; year <= YEAR_END; year += 1) {
      const totals = sumYear(monthly, year);
      points.push({ label: String(year), ...totals });
    }
    return points;
  }

  for (let year = YEAR_START; year <= YEAR_END; year += 1) {
    for (let month = 1; month <= 12; month += 1) {
      const key = `${year}-${String(month).padStart(2, '0')}`;
      const value = monthly.get(key) ?? { miko: 0, suisei: 0, shared: 0 };
      points.push({ label: `${year}/${String(month).padStart(2, '0')}`, ...value });
    }
  }

  return points;
}

function buildCumulativePoints(mode: ChartMode, stories: MiCometStory[]) {
  const countPoints = buildCountPoints(mode, stories);
  const points: CountPoint[] = [];
  let miko = 0;
  let suisei = 0;
  let shared = 0;

  countPoints.forEach((point) => {
    miko += point.miko;
    suisei += point.suisei;
    shared += point.shared;
    points.push({ label: point.label, miko, suisei, shared });
  });

  return points;
}

function formatTypeLabel(type: string) {
  return TYPE_LABELS[type] ?? type;
}

function chartShellStyle() {
  return {
    marginTop: 20,
    borderRadius: 26,
    background:
      'radial-gradient(1200px 480px at 18% 0%, rgba(255,125,183,0.08), transparent 45%), radial-gradient(800px 420px at 88% 12%, rgba(102,169,255,0.08), transparent 42%), #070910',
    border: '1px solid rgba(255,255,255,0.07)',
    boxShadow: '0 28px 70px rgba(0,0,0,0.42)',
    padding: 20,
  } as const;
}

function ChartStatCard({
  label,
  value,
  accent,
  tint,
}: {
  label: string;
  value: string | number;
  accent: string;
  tint: string;
}) {
  return (
    <div
      style={{
        borderRadius: 18,
        padding: '16px 18px',
        background: tint,
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.16)',
      }}
    >
      <div style={{ color: '#9aa2b2', fontSize: 13, fontWeight: 700 }}>{label}</div>
      <div style={{ color: accent, fontSize: 28, fontWeight: 900, lineHeight: 1.05, marginTop: 8 }}>{value}</div>
    </div>
  );
}

function ChartShell({
  title,
  subtitle,
  stories,
  cumulative = false,
  defaultMode = 'month',
}: {
  title: string;
  subtitle: string;
  stories: MiCometStory[];
  cumulative?: boolean;
  defaultMode?: ChartMode;
}) {
  const [mode, setMode] = useState<ChartMode>(defaultMode);
  const summary = useMemo(() => summarizeTimeline(stories), [stories]);
  const data = useMemo(
    () => (cumulative ? buildCumulativePoints(mode, summary.timeline) : buildCountPoints(mode, summary.timeline)),
    [cumulative, mode, summary.timeline],
  );

  return (
    <section style={chartShellStyle()}>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, alignItems: 'flex-start', marginBottom: 16, flexWrap: 'wrap' }}>
        <div>
          <div style={{ fontSize: 20, fontWeight: 900, color: '#edf0f8' }}>{title}</div>
          <div style={{ color: '#9aa2b2', marginTop: 5, fontSize: 13 }}>{subtitle}</div>
        </div>
        <div
          style={{
            display: 'flex',
            gap: 8,
            background: '#0d0f15',
            borderRadius: 14,
            padding: 6,
            border: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <button
            onClick={() => setMode('year')}
            style={{
              background: mode === 'year' ? '#1f2432' : 'transparent',
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
              background: mode === 'month' ? '#1f2432' : 'transparent',
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

      {!cumulative ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: 12,
            marginBottom: 16,
          }}
        >
          <ChartStatCard
            label="Miko 累計"
            value={summary.totals.miko}
            accent={COLORS.miko}
            tint="linear-gradient(180deg, rgba(255,125,183,0.12), rgba(255,125,183,0.04))"
          />
          <ChartStatCard
            label="Suisei 累計"
            value={summary.totals.suisei}
            accent={COLORS.suisei}
            tint="linear-gradient(180deg, rgba(102,169,255,0.12), rgba(102,169,255,0.04))"
          />
          <ChartStatCard
            label="共同故事"
            value={summary.totals.shared}
            accent={COLORS.shared}
            tint="linear-gradient(180deg, rgba(255,209,102,0.12), rgba(255,209,102,0.04))"
          />
          <ChartStatCard
            label="總計"
            value={summary.totals.total}
            accent={COLORS.total}
            tint="linear-gradient(180deg, rgba(126,226,168,0.12), rgba(126,226,168,0.04))"
          />
        </div>
      ) : null}

      <div style={{ height: cumulative ? 420 : 380 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 12, right: 22, left: 0, bottom: 38 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.11)" strokeDasharray="4 6" />
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
              label={{
                value: cumulative ? '累計故事數' : '故事數量',
                angle: -90,
                position: 'insideLeft',
                fill: '#9aa2b2',
              }}
            />
            <Tooltip
              contentStyle={{
                background: '#0a0c11',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 12,
              }}
              labelStyle={{ color: '#fff' }}
            />
            <Legend
              wrapperStyle={{ paddingTop: 8, color: '#cfd4de', fontSize: 13 }}
              formatter={(value) => <span style={{ color: '#cfd4de' }}>{value}</span>}
            />
            <Line type="monotone" dataKey="miko" name={cumulative ? 'Miko 累計' : 'Miko 數量'} stroke={COLORS.miko} strokeWidth={3} dot={false} />
            <Line type="monotone" dataKey="suisei" name={cumulative ? 'Suisei 累計' : 'Suisei 數量'} stroke={COLORS.suisei} strokeWidth={3} dot={false} />
            <Line
              type="monotone"
              dataKey="shared"
              name={cumulative ? '共同故事累計' : '共同故事數量'}
              stroke={COLORS.shared}
              strokeWidth={2.5}
              strokeDasharray="6 6"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 18, flexWrap: 'wrap', marginTop: 10, color: '#cfd4de' }}>
        <div style={{ color: COLORS.miko }}>{cumulative ? '● Miko 累計' : '● Miko 數量'}</div>
        <div style={{ color: COLORS.suisei }}>{cumulative ? '● Suisei 累計' : '● Suisei 數量'}</div>
        <div style={{ color: COLORS.shared }}>{cumulative ? '● 共同故事累計' : '● 共同故事數量'}</div>
      </div>
    </section>
  );
}

function MonthlyStoryChart({ stories }: { stories: MiCometStory[] }) {
  return (
    <ChartShell
      title="故事數量折線圖"
      subtitle="共同故事會同時計入 Miko 與 Suisei"
      stories={stories}
      cumulative={false}
      defaultMode="month"
    />
  );
}

function CumulativeStoryChart({ stories }: { stories: MiCometStory[] }) {
  return (
    <ChartShell
      title="miComet 累計故事成長圖"
      subtitle="粉色是 Miko 累計，藍色是 Suisei 累計，黃色是共同故事累計。"
      stories={stories}
      cumulative
      defaultMode="year"
    />
  );
}

function Card({ item, onOpen }: { item: MiCometStory; onOpen: (item: MiCometStory) => void }) {
  return (
    <article
      onClick={() => onOpen(item)}
      style={{
        borderRadius: 16,
        padding: 16,
        background: 'linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: '0 10px 28px rgba(0,0,0,0.28)',
        cursor: 'pointer',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center' }}>
        <div style={{ color: '#c4c9d6', fontSize: 12 }}>{formatDate(item.date)}</div>
        <div
          style={{
            color: item.side === 'miko' ? COLORS.miko : item.side === 'suisei' ? COLORS.suisei : item.side === 'shared' ? COLORS.shared : '#a7adbb',
            fontSize: 12,
            fontWeight: 700,
          }}
        >
          {item.side === 'miko' ? 'Miko' : item.side === 'suisei' ? 'Suisei' : item.side === 'shared' ? '共同故事' : '其他'}
        </div>
      </div>
      <div style={{ marginTop: 10, fontSize: 15, fontWeight: 800, lineHeight: 1.45, color: '#f6f7fb' }}>{item.titleZh || item.title}</div>
      <div style={{ marginTop: 8, color: '#a7adbb', fontSize: 13, lineHeight: 1.55 }}>{item.ctxZh || item.ctx}</div>
      <div style={{ marginTop: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <div style={{ color: '#7f8594', fontSize: 12 }}>Phase {item.phase}</div>
        <div style={{ color: '#cfd4de', fontSize: 12 }}>{formatTypeLabel(item.type)}</div>
      </div>
    </article>
  );
}

function Modal({ item, onClose }: { item: MiCometStory; onClose: () => void }) {
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
      </div>
    </div>
  );
}

function StatCard({ label, value, note, accent }: { label: string; value: string | number; note: string; accent: string }) {
  return (
    <div
      style={{
        borderRadius: 22,
        padding: '18px 18px 20px',
        background: 'linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0.015))',
        border: '1px solid rgba(255,255,255,0.06)',
        boxShadow: '0 14px 36px rgba(0,0,0,0.22)',
      }}
    >
      <div style={{ color: '#9aa2b2', fontSize: 13, fontWeight: 700 }}>{label}</div>
      <div style={{ color: accent, fontSize: 30, fontWeight: 900, lineHeight: 1.05, marginTop: 10 }}>{value}</div>
      <div style={{ color: '#8d93a3', fontSize: 12, marginTop: 8 }}>{note}</div>
    </div>
  );
}

function CompactStatRow({
  title,
  items,
}: {
  title: string;
  items: Array<{ label: string; value: number; color: string }>;
}) {
  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ color: '#8f96a8', fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 800, marginBottom: 10 }}>{title}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 22 }}>
        {items.map((item) => (
          <div key={item.label} style={{ display: 'flex', alignItems: 'baseline', gap: 8, fontWeight: 800 }}>
            <span style={{ color: '#a8afbf' }}>{item.label}</span>
            <span style={{ color: item.color }}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Index() {
  const [search, setSearch] = useState('');
  const [yearFilter, setYearFilter] = useState(0);
  const [openItem, setOpenItem] = useState<MiCometStory | null>(null);

  const summary = useMemo(() => summarizeTimeline(MICOMET_TIMELINE), []);
  const typeCounts = useMemo(() => buildTypeCounts(summary.timeline), [summary.timeline]);
  const years = useMemo(() => summary.years, [summary.years]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return summary.timeline.filter((story) => {
      if (yearFilter !== 0 && Number(story.date.slice(0, 4)) !== yearFilter) return false;
      if (!q) return true;
      return [story.date, story.title, story.titleZh ?? '', story.ctx, story.ctxZh ?? ''].join(' ').toLowerCase().includes(q);
    }).sort((a, b) => a.date.localeCompare(b.date) || a.id.localeCompare(b.id));
  }, [search, summary.timeline, yearFilter]);

  const groups = useMemo(
    () =>
      filtered.reduce<Array<{ date: string; items: MiCometStory[] }>>((acc, story) => {
        const last = acc[acc.length - 1];
        if (last && last.date === story.date) last.items.push(story);
        else acc.push({ date: story.date, items: [story] });
        return acc;
      }, []),
    [filtered],
  );

  const sideStats = [
    { label: 'Miko', value: summary.counts.miko, color: COLORS.miko },
    { label: 'Suisei', value: summary.counts.suisei, color: COLORS.suisei },
    { label: '共同', value: summary.counts.shared, color: COLORS.shared },
    { label: '其他', value: summary.counts.others, color: '#aab0c0' },
  ];

  const typeStats = [
    { label: '剪輯', value: typeCounts.Clip ?? 0, color: COLORS.shared },
    { label: '直播', value: typeCounts.Stream ?? 0, color: COLORS.miko },
    { label: '綜合', value: typeCounts.News ?? 0, color: COLORS.total },
    { label: '文字', value: typeCounts.Text ?? 0, color: COLORS.suisei },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        color: '#fff',
        padding: '22px 16px 40px',
        background:
          'radial-gradient(1200px 600px at 18% -8%, rgba(255,125,183,0.12), transparent 60%), radial-gradient(900px 500px at 84% 6%, rgba(102,169,255,0.10), transparent 55%), #000',
      }}
    >
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>
        <section
          style={{
            borderRadius: 30,
            border: '1px solid rgba(255,255,255,0.06)',
            background: 'linear-gradient(180deg, rgba(16,18,26,0.98), rgba(10,11,16,0.98))',
            boxShadow: '0 30px 80px rgba(0,0,0,0.52)',
            padding: 28,
          }}
        >
          <div style={{ color: '#f6d77d', fontSize: 12, fontWeight: 900, letterSpacing: '0.18em', textTransform: 'uppercase' }}>2019 - 2026 / BLACK EDITION</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(280px, 0.8fr)', gap: 24, marginTop: 14, alignItems: 'center' }}>
            <div>
              <div style={{ color: '#d5d8e3', fontSize: 14, marginBottom: 14 }}>Live timeline • synced from GitHub</div>
              <h1
                style={{
                  margin: 0,
                  fontSize: 'clamp(3.4rem, 8vw, 5.8rem)',
                  lineHeight: 0.95,
                  letterSpacing: '0.02em',
                  fontWeight: 900,
                  background: 'linear-gradient(90deg, #ff9ccf 0%, #e6b7ff 52%, #9ed6ff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                miComet
                <br />
                Compendium
              </h1>
              <div style={{ color: '#a8afbf', fontSize: 16, marginTop: 14 }}>星街彗星 × 櫻巫女 | Business &amp; Beyond</div>
              <div
                style={{
                  marginTop: 18,
                  maxWidth: 680,
                  borderRadius: 18,
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderLeft: '4px solid #ff8cc8',
                  padding: '16px 18px',
                  color: '#f2f4fa',
                  lineHeight: 1.8,
                }}
              >
                黑底、粉藍高光、年 / 月雙模式折線圖。共同故事會同時計入 Miko 與 Suisei，讓兩條線一起往前看。
              </div>
            </div>
            <div
              style={{
                borderRadius: 26,
                background: 'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01))',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 18px 42px rgba(0,0,0,0.26)',
                padding: 24,
                minHeight: 300,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div style={{ color: '#a8afbf', fontSize: 12, letterSpacing: '0.16em', fontWeight: 900 }}>MI COMET</div>
              <div>
                <div style={{ fontSize: 'clamp(3.3rem, 8vw, 4.8rem)', lineHeight: 1, fontWeight: 900, color: '#f7f8fb' }}>{summary.totals.total}</div>
                <div style={{ color: '#8f96a8', marginTop: 8, fontSize: 16 }}>stories archived</div>
              </div>
              <div style={{ color: '#c9cedb', fontSize: 14, lineHeight: 1.8 }}>
                {summary.first ? `${formatDate(summary.first.date)} 起` : '—'}
                <br />
                {summary.last ? `${formatDate(summary.last.date)} 迄` : '—'}
              </div>
            </div>
          </div>
        </section>

        <section
          style={{
            marginTop: 18,
            borderRadius: 24,
            background: '#11141c',
            border: '1px solid rgba(255,255,255,0.06)',
            padding: 18,
            boxShadow: '0 18px 42px rgba(0,0,0,0.24)',
          }}
        >
          <div style={{ color: '#8f96a8', fontSize: 12, letterSpacing: '0.16em', textTransform: 'uppercase', fontWeight: 800, marginBottom: 12 }}>統計總覽</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
            <StatCard label="總故事數" value={summary.totals.total} note={`${summary.years[0] ?? 2019} - ${summary.years[summary.years.length - 1] ?? 2026}`} accent="#f7f8fb" />
            <StatCard label="故事區間" value={`${summary.years[0] ?? 2019} - ${summary.years[summary.years.length - 1] ?? 2026}`} note="年 / 月雙模式統計" accent="#ffb7de" />
            <StatCard label="最早紀錄" value={summary.first ? formatDate(summary.first.date) : '—'} note={summary.first?.titleZh ?? summary.first?.title ?? '—'} accent="#9ed6ff" />
            <StatCard label="最新紀錄" value={summary.last ? formatDate(summary.last.date) : '—'} note={summary.last?.titleZh ?? summary.last?.title ?? '—'} accent="#c58cff" />
          </div>

          <CompactStatRow title="side counts" items={sideStats} />
          <CompactStatRow title="type counts" items={typeStats} />
        </section>

        <CumulativeStoryChart stories={MICOMET_TIMELINE} />
        <MonthlyStoryChart stories={MICOMET_TIMELINE} />

        <section
          style={{
            marginTop: 18,
            borderRadius: 20,
            background: '#151823',
            border: '1px solid rgba(255,255,255,0.06)',
            padding: 16,
            boxShadow: '0 18px 42px rgba(0,0,0,0.24)',
          }}
        >
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
                style={{
                  padding: '10px 14px',
                  borderRadius: 12,
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: yearFilter === 0 ? '#232838' : '#0d0f15',
                  color: '#fff',
                  cursor: 'pointer',
                }}
              >
                全部
              </button>
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => setYearFilter(yearFilter === year ? 0 : year)}
                  style={{
                    padding: '10px 14px',
                    borderRadius: 12,
                    border: '1px solid rgba(255,255,255,0.08)',
                    background: yearFilter === year ? '#232838' : '#0d0f15',
                    color: '#fff',
                    cursor: 'pointer',
                  }}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section style={{ marginTop: 18, color: '#b5bbca', fontSize: 13 }}>找到 {filtered.length} 個故事</section>

        <main style={{ marginTop: 16, display: 'grid', gap: 18 }}>
          {groups.length === 0 ? (
            <div style={{ padding: 36, borderRadius: 18, background: '#151823', color: '#9aa2b2', textAlign: 'center' }}>沒有符合條件的故事</div>
          ) : (
            groups.map((group) => (
              <section key={group.date} style={{ borderRadius: 20, background: '#151823', border: '1px solid rgba(255,255,255,0.06)', padding: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 12 }}>
                  <div>
                    <div style={{ color: '#8f96a8', fontSize: 12 }}>{group.date.slice(0, 4)}</div>
                    <h2 style={{ margin: '4px 0 0', fontSize: 20 }}>{formatDate(group.date)}</h2>
                  </div>
                  <div style={{ color: '#9aa2b2', fontSize: 13 }}>Phase {group.items[0]?.phase ?? '-'}</div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 12 }}>
                  {group.items.map((item) => (
                    <Card key={item.id} item={item} onOpen={setOpenItem} />
                  ))}
                </div>
              </section>
            ))
          )}
        </main>

        <section style={{ marginTop: 22, borderRadius: 18, background: '#151823', border: '1px solid rgba(255,255,255,0.06)', padding: 16, color: '#9aa2b2', fontSize: 13, lineHeight: 1.7 }}>
          分析規則：同一天同一人只算一筆；共同故事同時計入 Miko 與 Suisei。折線圖已保留累計與單月兩個內容區塊，黑底高光版本與你提供的參考一致。
        </section>
      </div>

      {openItem ? <Modal item={openItem} onClose={() => setOpenItem(null)} /> : null}
    </div>
  );
}
