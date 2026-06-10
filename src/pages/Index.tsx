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

function formatDate(dateISO: string) {
  const date = new Date(`${dateISO}T00:00:00Z`);
  return `${date.getUTCFullYear()}年${date.getUTCMonth() + 1}月${date.getUTCDate()}日`;
}

function monthKey(dateISO: string) {
  return dateISO.slice(0, 7);
}

function dedupeByDayAndSide(stories: MiCometStory[]) {
  const seen = new Set<string>();
  return stories.filter((story) => {
    const key = `${story.date}:${story.side}:${story.title}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function buildMonthlyCounts(stories: MiCometStory[]) {
  const miko = new Map<string, number>();
  const suisei = new Map<string, number>();
  const shared = new Map<string, number>();

  stories.forEach((story) => {
    const key = monthKey(story.date);
    if (story.side === 'miko') miko.set(key, (miko.get(key) ?? 0) + 1);
    if (story.side === 'suisei') suisei.set(key, (suisei.get(key) ?? 0) + 1);
    if (story.side === 'shared') {
      shared.set(key, (shared.get(key) ?? 0) + 1);
      miko.set(key, (miko.get(key) ?? 0) + 1);
      suisei.set(key, (suisei.get(key) ?? 0) + 1);
    }
  });

  return { miko, suisei, shared };
}

function buildChartData(mode: ChartMode, stories: MiCometStory[]) {
  const deduped = dedupeByDayAndSide(stories).sort((a, b) => a.date.localeCompare(b.date));
  const monthly = buildMonthlyCounts(deduped);
  const points: Array<{ label: string; miko: number; suisei: number; shared: number }> = [];

  if (mode === 'year') {
    let cumMiko = 0;
    let cumSuisei = 0;
    let cumShared = 0;
    for (let year = YEAR_START; year <= YEAR_END; year += 1) {
      const yearStr = String(year);
      const totalMiko = [...monthly.miko.entries()].filter(([k]) => k.startsWith(yearStr)).reduce((sum, [, v]) => sum + v, 0);
      const totalSuisei = [...monthly.suisei.entries()].filter(([k]) => k.startsWith(yearStr)).reduce((sum, [, v]) => sum + v, 0);
      const totalShared = [...monthly.shared.entries()].filter(([k]) => k.startsWith(yearStr)).reduce((sum, [, v]) => sum + v, 0);
      cumMiko += totalMiko;
      cumSuisei += totalSuisei;
      cumShared += totalShared;
      points.push({ label: yearStr, miko: cumMiko, suisei: cumSuisei, shared: cumShared });
    }
    return points;
  }

  let cumMiko = 0;
  let cumSuisei = 0;
  let cumShared = 0;
  for (let year = YEAR_START; year <= YEAR_END; year += 1) {
    for (let month = 1; month <= 12; month += 1) {
      const key = `${year}-${String(month).padStart(2, '0')}`;
      cumMiko += monthly.miko.get(key) ?? 0;
      cumSuisei += monthly.suisei.get(key) ?? 0;
      cumShared += monthly.shared.get(key) ?? 0;
      points.push({ label: key, miko: cumMiko, suisei: cumSuisei, shared: cumShared });
    }
  }
  return points;
}

function statCard({ label, value, tone }: { label: string; value: number | string; tone: 'blue' | 'purple' | 'pink' | 'green' }) {
  const bg = {
    blue: 'linear-gradient(180deg, #eaf1ff 0%, #e3edff 100%)',
    purple: 'linear-gradient(180deg, #f7efff 0%, #f1e8ff 100%)',
    pink: 'linear-gradient(180deg, #fff0f7 0%, #ffe8f4 100%)',
    green: 'linear-gradient(180deg, #edfdf0 0%, #e2f8e7 100%)',
  }[tone];
  const color = { blue: '#2f66f7', purple: '#8d3df2', pink: '#e22f7c', green: '#10a54d' }[tone];
  return (
    <div
      style={{
        background: bg,
        borderRadius: 18,
        padding: '16px 18px',
        boxShadow: '0 10px 35px rgba(0,0,0,.18)',
      }}
    >
      <div style={{ color: '#6b7280', fontSize: 14, marginBottom: 6 }}>{label}</div>
      <div style={{ color, fontSize: 28, fontWeight: 800, lineHeight: 1 }}>{value}</div>
    </div>
  );
}

export default function Index() {
  const [mode, setMode] = useState<ChartMode>('year');
  const stories = MICOMET_TIMELINE;

  const stats = useMemo(() => {
    const counts: Record<Side, number> = { miko: 0, suisei: 0, shared: 0, others: 0 };
    const sorted = [...stories].sort((a, b) => a.date.localeCompare(b.date));
    sorted.forEach((story) => {
      counts[story.side] += 1;
    });
    const first = sorted[0];
    const last = sorted[sorted.length - 1];
    return {
      counts,
      total: counts.miko + counts.suisei + counts.shared + counts.others,
      first,
      last,
    };
  }, [stories]);

  const chartData = useMemo(() => buildChartData(mode, stories), [mode, stories]);
  const yearOptions = useMemo(() => Array.from({ length: YEAR_END - YEAR_START + 1 }, (_, i) => YEAR_START + i), []);

  const monthlyChartData = chartData.map((row) => ({
    ...row,
    label: mode === 'year' ? row.label : row.label.replace('-', '/'),
  }));

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#12141d',
        color: '#fff',
        padding: '22px 16px 40px',
      }}
    >
      <div style={{ maxWidth: 1120, margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: 16, marginBottom: 20 }}>
          <div>
            <h1 style={{ fontSize: 28, fontWeight: 800, margin: 0, lineHeight: 1.1 }}>miComet 累計故事折線圖</h1>
            <div style={{ color: '#a7adbb', marginTop: 6, fontSize: 14 }}>按年月統計 2019-2026 的累計故事數，共同故事計入 Miko 與 Suisei</div>
          </div>
          <button
            onClick={() => setMode(mode === 'year' ? 'month' : 'year')}
            style={{
              background: '#0d0f15',
              color: '#fff',
              border: '1px solid rgba(255,255,255,.12)',
              borderRadius: 16,
              padding: '14px 18px',
              minWidth: 120,
              fontWeight: 700,
            }}
          >
            {mode === 'year' ? '全年時間' : '單月時間'}
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0, 1fr))', gap: 14, marginBottom: 18 }}>
          {statCard({ label: 'Miko 累計', value: stats.counts.miko, tone: 'blue' })}
          {statCard({ label: 'Suisei 累計', value: stats.counts.suisei, tone: 'purple' })}
          {statCard({ label: '共同故事', value: stats.counts.shared, tone: 'pink' })}
          {statCard({ label: '總計', value: stats.total, tone: 'green' })}
        </div>

        <div
          style={{
            background: '#161824',
            borderRadius: 16,
            padding: '12px 16px 8px',
            border: '1px solid rgba(255,255,255,.06)',
            boxShadow: '0 18px 40px rgba(0,0,0,.28)',
          }}
        >
          <ResponsiveContainer width="100%" height={500}>
            <LineChart data={monthlyChartData} margin={{ top: 20, right: 24, left: 8, bottom: 56 }}>
              <CartesianGrid stroke="rgba(255,255,255,.26)" strokeDasharray="4 4" />
              <XAxis
                dataKey="label"
                tick={{ fill: '#7f8594', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(255,255,255,.2)' }}
                tickLine={{ stroke: 'rgba(255,255,255,.2)' }}
                interval={mode === 'year' ? 0 : 2}
                angle={-45}
                textAnchor="end"
                height={50}
              />
              <YAxis
                tick={{ fill: '#7f8594', fontSize: 13 }}
                axisLine={{ stroke: 'rgba(255,255,255,.2)' }}
                tickLine={{ stroke: 'rgba(255,255,255,.2)' }}
                allowDecimals={false}
                label={{ value: '累計故事數', angle: -90, position: 'insideLeft', fill: '#8f96a8' }}
              />
              <Tooltip
                contentStyle={{ background: '#10131b', border: '1px solid rgba(255,255,255,.1)', borderRadius: 12 }}
                labelStyle={{ color: '#fff' }}
              />
              <Line type="monotone" dataKey="miko" name="Miko 累計" stroke="#3b82f6" strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="suisei" name="Suisei 累計" stroke="#a855f7" strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="shared" name="共同故事累計" stroke="#ff4fa0" strokeWidth={2.5} strokeDasharray="6 6" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginTop: 14, color: '#cfd4de' }}>
          <div style={{ color: '#3b82f6' }}>● Miko 累計</div>
          <div style={{ color: '#a855f7' }}>● Suisei 累計</div>
          <div style={{ color: '#ff4fa0' }}>● 共同故事累計</div>
        </div>

        <div style={{ marginTop: 28, display: 'grid', gap: 12 }}>
          <div style={{ color: '#b5bbca', fontSize: 13 }}>
            最早紀錄：{stats.first ? formatDate(stats.first.date) : '-'} · 最新紀錄：{stats.last ? formatDate(stats.last.date) : '-'}
          </div>
          <div style={{ color: '#6f7584', fontSize: 12 }}>
            分析規則：同一天同一人只算一筆；共同故事同時計入 Miko 與 Suisei。
          </div>
        </div>

        <div style={{ marginTop: 10, display: 'none' }}>
          {yearOptions.map((y) => (
            <span key={y}>{y}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
