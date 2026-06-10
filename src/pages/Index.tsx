import { useMemo, useState } from 'react';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import { MICOMET_TIMELINE, type MiCometStory } from '@/data/miCometTimeline';

type Side = 'miko' | 'suisei' | 'shared' | 'others';
type ChartMode = 'year' | 'month';

interface TimelineItem {
  id: string;
  date: string;
  phase: number;
  side: Side;
  emoji: string;
  title: string;
  ctx: string;
  type: string;
  link?: string;
  num: string;
}

interface DateGroup {
  date: string;
  items: TimelineItem[];
}

const CHART_START_YEAR = 2019;
const CHART_END_YEAR = 2026;

const PHASES = [
  { id: 1, label: '真・商業夥伴階段', period: '2019 - 2020', color: '#ff7b7b', desc: '從最初的 Project Winter 到後續互動，奠定了 miComet 的開端。' },
  { id: 2, label: '曖昧升溫階段', period: '2021', color: '#ffb37b', desc: '兩人之間的距離開始明顯拉近。' },
  { id: 3, label: '公開承認階段', period: '2022', color: '#d4e880', desc: '從互動到態度，關係開始更自然。' },
  { id: 4, label: '日常化階段', period: '2023 - 2024', color: '#80c8e8', desc: '日常互動與私下連結變成常態。' },
  { id: 5, label: '未來階段', period: 'Future', color: '#a9a3f9', desc: '傳說中的最終章。' },
];

const TYPE_NAMES: Record<string, string> = {
  Clip: '剪輯',
  Stream: '直播',
  Text: '文字',
  Mixed: '綜合',
  Audio: '音訊',
  Other: '其他',
};

const UI = {
  title: 'miComet 編年史',
  subtitle: '星街彗星 × 櫻巫女 | Business & Beyond',
  search: '搜尋故事、關鍵字、日期...',
  filter: '篩選階段：',
  all: '全部',
  stats: '統計總覽',
  total: '總故事數',
  shared: '共同故事',
  first: '最早紀錄',
  last: '最新紀錄',
  results: '找到 {count} 個結果',
  heroTag: 'miComet 特別企劃',
  heroBlurb: '以更像活動海報的方式呈現時間線、統計與重點事件。',
  refs: '參考資料',
  chartTitle: '故事數量折線圖',
  chartSub: '共同故事會同時計入 Miko 與 Suisei',
  chartYear: '年',
  chartMonth: '月',
  chartMiko: 'Miko',
  chartSuisei: 'Suisei',
};

function buildStoryNumberMap(stories: MiCometStory[]) {
  const counters: Record<string, number> = {};
  const map = new Map<string, string>();
  [...stories].sort((a, b) => a.date.localeCompare(b.date)).forEach((story) => {
    const year = story.date.slice(0, 4);
    counters[year] = (counters[year] ?? 0) + 1;
    map.set(story.id, `${year.slice(2)}-${counters[year]}`);
  });
  return map;
}

const storyNumbers = buildStoryNumberMap(MICOMET_TIMELINE);

const items: TimelineItem[] = MICOMET_TIMELINE.map((story) => ({
  ...story,
  num: storyNumbers.get(story.id) ?? story.id,
  title: story.titleZh || story.title,
  ctx: story.ctxZh || story.ctx,
  type: story.type || 'Other',
})).sort((a, b) => a.date.localeCompare(b.date));

function fmt(dateISO: string) {
  const date = new Date(`${dateISO}T00:00:00Z`);
  return `${date.getUTCFullYear()}年${date.getUTCMonth() + 1}月${date.getUTCDate()}日`;
}

function getLink(item: TimelineItem) {
  const text = `${item.title} ${item.ctx}`;
  const yt = text.match(/https?:\/\/(?:www\.)?(?:youtube\.com|youtu\.be)\/\S+/);
  if (yt) return { type: 'yt' as const, url: yt[0].replace(/[\u300d\u300f\)]+$/, '') };
  const tw = text.match(/https?:\/\/(?:www\.)?(?:twitter\.com|x\.com)\/\S+/);
  if (tw) return { type: 'tw' as const, url: tw[0].replace(/[\u300d\u300f\)]+$/, '') };
  return null;
}

function groupByDate(list: TimelineItem[]) {
  return list.reduce<DateGroup[]>((acc, item) => {
    const last = acc[acc.length - 1];
    if (last && last.date === item.date) last.items.push(item);
    else acc.push({ date: item.date, items: [item] });
    return acc;
  }, []);
}

function Card({ item, onOpen }: { item: TimelineItem; onOpen: (item: TimelineItem) => void }) {
  const link = getLink(item);
  const typeLabel = TYPE_NAMES[item.type] ?? item.type;

  return (
    <article className={`card side-${item.side}`} onClick={() => onOpen(item)}>
      <div className="card-top">
        <span className="card-date">{fmt(item.date)}</span>
        <span className={`card-type type-${item.type.toLowerCase()}`}>{typeLabel}</span>
      </div>
      <div className="card-emoji">{item.emoji || '✨'}</div>
      <div className="card-title">{item.num} {item.title}</div>
      <div className="card-ctx">{item.ctx}</div>
      <div className="card-more">{link ? (link.type === 'yt' ? '▶ 前往影片' : '🐦 前往推文') : '閱讀詳情 →'}</div>
    </article>
  );
}

function Modal({ item, onClose }: { item: TimelineItem; onClose: () => void }) {
  const link = getLink(item);
  const phase = PHASES.find((p) => p.id === item.phase);
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className={`modal-bar side-${item.side}`} />
        <div className="modal-body">
          <div className="modal-kicker">{item.num} · {TYPE_NAMES[item.type] ?? item.type}</div>
          <h3>{item.title}</h3>
          <div className="modal-meta">{fmt(item.date)}{phase ? ` · ${phase.label}` : ''}</div>
          <p>{item.ctx}</p>
          {link && (
            <a href={link.url} target="_blank" rel="noreferrer" className="modal-link">
              {link.type === 'yt' ? '開啟 YouTube' : '開啟 Twitter/X'}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function buildChartData(mode: ChartMode) {
  const years = Array.from({ length: CHART_END_YEAR - CHART_START_YEAR + 1 }, (_, i) => CHART_START_YEAR + i);
  const source = new Map<string, { miko: number; suisei: number }>();

  if (mode === 'year') {
    years.forEach((year) => source.set(String(year), { miko: 0, suisei: 0 }));
    items.forEach((item) => {
      const year = item.date.slice(0, 4);
      if (!source.has(year)) return;
      if (item.side === 'miko' || item.side === 'shared') source.get(year)!.miko += 1;
      if (item.side === 'suisei' || item.side === 'shared') source.get(year)!.suisei += 1;
    });
    return years.map((year) => ({
      label: String(year),
      miko: source.get(String(year))?.miko ?? 0,
      suisei: source.get(String(year))?.suisei ?? 0,
    }));
  }

  years.forEach((year) => {
    for (let month = 1; month <= 12; month += 1) {
      const key = `${year}-${String(month).padStart(2, '0')}`;
      source.set(key, { miko: 0, suisei: 0 });
    }
  });

  items.forEach((item) => {
    const key = item.date.slice(0, 7);
    if (!source.has(key)) return;
    if (item.side === 'miko' || item.side === 'shared') source.get(key)!.miko += 1;
    if (item.side === 'suisei' || item.side === 'shared') source.get(key)!.suisei += 1;
  });

  return years.flatMap((year) =>
    Array.from({ length: 12 }, (_, monthIndex) => {
      const month = monthIndex + 1;
      const key = `${year}-${String(month).padStart(2, '0')}`;
      return {
        label: `${year}/${String(month).padStart(2, '0')}`,
        miko: source.get(key)?.miko ?? 0,
        suisei: source.get(key)?.suisei ?? 0,
      };
    }),
  );
}

function ChartSection({ mode, onModeChange }: { mode: ChartMode; onModeChange: (mode: ChartMode) => void }) {
  const data = useMemo(() => buildChartData(mode), [mode]);

  return (
    <section className="chart-wrap">
      <div className="chart-head">
        <div>
          <div className="section-title">{UI.chartTitle}</div>
          <div className="chart-subtitle">{UI.chartSub}</div>
        </div>
        <div className="chart-toggle">
          <button className={mode === 'year' ? 'active' : ''} onClick={() => onModeChange('year')}>{UI.chartYear}</button>
          <button className={mode === 'month' ? 'active' : ''} onClick={() => onModeChange('month')}>{UI.chartMonth}</button>
        </div>
      </div>
      <div className="chart-frame">
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
            <CartesianGrid stroke="rgba(255,255,255,0.07)" strokeDasharray="4 6" />
            <XAxis dataKey="label" tick={{ fill: 'rgba(230,233,255,0.68)', fontSize: 12 }} interval={mode === 'year' ? 0 : 11} />
            <YAxis tick={{ fill: 'rgba(230,233,255,0.68)', fontSize: 12 }} allowDecimals={false} />
            <Tooltip
              contentStyle={{
                background: 'rgba(10, 12, 18, 0.95)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 14,
                color: '#fff',
              }}
              labelStyle={{ color: '#fff' }}
            />
            <Line type="monotone" dataKey="miko" name={UI.chartMiko} stroke="hsl(var(--pink))" strokeWidth={3} dot={{ r: 2.5 }} activeDot={{ r: 5 }} />
            <Line type="monotone" dataKey="suisei" name={UI.chartSuisei} stroke="hsl(var(--blue))" strokeWidth={3} dot={{ r: 2.5 }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default function Index() {
  const [search, setSearch] = useState('');
  const [phaseFilter, setPhaseFilter] = useState(0);
  const [modalItem, setModalItem] = useState<TimelineItem | null>(null);
  const [chartMode, setChartMode] = useState<ChartMode>('year');

  const stats = useMemo(() => {
    const counts: Record<Side, number> = { miko: 0, suisei: 0, shared: 0, others: 0 };
    const typeCounts = new Map<string, number>();
    items.forEach((item) => {
      counts[item.side] += 1;
      typeCounts.set(item.type, (typeCounts.get(item.type) ?? 0) + 1);
    });
    return { total: items.length, counts, typeCounts, first: items[0], last: items[items.length - 1] };
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((item) => {
      if (phaseFilter !== 0 && item.phase !== phaseFilter) return false;
      if (!q) return true;
      return [item.num, item.date, item.title, item.ctx].join(' ').toLowerCase().includes(q);
    });
  }, [phaseFilter, search]);

  const filteredPhaseCount = useMemo(() => groupByDate(filtered).length, [filtered]);
  const activePhases = PHASES.filter((phase) => filtered.some((item) => item.phase === phase.id));
  const typeStats = [...stats.typeCounts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 4);

  return (
    <div className="page-shell">
      <div className="backdrop-blob blob-a" />
      <div className="backdrop-blob blob-b" />
      <div className="backdrop-grid" />

      <header className="hero">
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="hero-tag">{UI.heroTag}</div>
            <h1>{UI.title}</h1>
            <p>{UI.subtitle}</p>
            <div className="hero-blurb">{UI.heroBlurb}</div>
          </div>

          <div className="hero-art">
            <div className="hero-slab slab-pink" />
            <div className="hero-slab slab-blue" />
            <div className="hero-slab slab-gold" />
            <div className="hero-badge">
              <div className="badge-label">miComet</div>
              <div className="badge-value">{stats.total}</div>
              <div className="badge-sub">stories archived</div>
            </div>
          </div>
        </div>
      </header>

      <section className="stats-wrap">
        <div className="section-title">{UI.stats}</div>
        <div className="stats-grid">
          <div className="stat-card accent-pink">
            <div className="stat-label">{UI.total}</div>
            <div className="stat-value">{stats.total}</div>
            <div className="stat-note">2019 - {new Date().getFullYear()}</div>
          </div>
          <div className="stat-card accent-blue">
            <div className="stat-label">{UI.shared}</div>
            <div className="stat-value">{stats.counts.shared}</div>
            <div className="stat-note">共同出現</div>
          </div>
          <div className="stat-card accent-purple">
            <div className="stat-label">{UI.first}</div>
            <div className="stat-value small">{fmt(stats.first.date)}</div>
            <div className="stat-note">{stats.first.title}</div>
          </div>
          <div className="stat-card accent-gold">
            <div className="stat-label">{UI.last}</div>
            <div className="stat-value small">{fmt(stats.last.date)}</div>
            <div className="stat-note">{stats.last.title}</div>
          </div>
        </div>
        <div className="type-strip">
          {typeStats.map(([type, count]) => (
            <div key={type} className="type-chip">{TYPE_NAMES[type] ?? type} <strong>{count}</strong></div>
          ))}
        </div>
      </section>

      <ChartSection mode={chartMode} onModeChange={setChartMode} />

      <section className="controls">
        <div className="search-row">
          <span>⌕</span>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={UI.search} />
        </div>
        <div className="filter-row">
          <span>{UI.filter}</span>
          <button className={phaseFilter === 0 ? 'active' : ''} onClick={() => setPhaseFilter(0)}>{UI.all}</button>
          {PHASES.map((phase) => (
            <button
              key={phase.id}
              className={phaseFilter === phase.id ? 'active' : ''}
              onClick={() => setPhaseFilter(phaseFilter === phase.id ? 0 : phase.id)}
            >
              {phase.id} · {phase.label}
            </button>
          ))}
        </div>
      </section>

      <section className="result-line">
        {search || phaseFilter !== 0 ? UI.results.replace('{count}', String(filteredPhaseCount)) : UI.results.replace('{count}', String(stats.total))}
      </section>

      <main className="content">
        {activePhases.length === 0 ? (
          <div className="empty-state">沒有符合條件的故事</div>
        ) : (
          activePhases.map((phase) => {
            const phaseItems = filtered.filter((item) => item.phase === phase.id);
            const groups = groupByDate(phaseItems);
            return (
              <section key={phase.id} className="phase-block">
                <div className="phase-head">
                  <span className="phase-bar" style={{ background: phase.color }} />
                  <div>
                    <div className="phase-kicker">Phase {phase.id}</div>
                    <h2>{phase.label}</h2>
                  </div>
                  <div className="phase-period">{phase.period}</div>
                </div>
                <p className="phase-desc">{phase.desc}</p>
                <div className="day-grid">
                  {groups.map((group) => (
                    <div key={group.date} className="day-card">
                      <div className="day-label">{fmt(group.date)}</div>
                      <div className="card-list">
                        {(() => {
                          const merged: TimelineItem = {
                            ...group.items[0],
                            id: group.items.map((i) => i.id).join('+'),
                            emoji: group.items.length > 1 ? '🔄' : group.items[0].emoji,
                            title: group.items.length > 1
                              ? `${group.items[0].num} 當日 ${group.items.length} 則故事`
                              : `${group.items[0].num} ${group.items[0].title}`,
                            ctx: group.items.map((i) => `• ${i.title}\n${i.ctx}`).join('\n\n'),
                            type: group.items.length > 1 ? 'Mixed' : group.items[0].type,
                          };
                          return <Card key={merged.id} item={merged} onOpen={setModalItem} />;
                        })()}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            );
          })
        )}

        <section className="convergence">
          <h3>Two Lines, Finally Converging</h3>
          <p>{UI.heroBlurb}</p>
        </section>

        <section className="references">
          <h3>{UI.refs}</h3>
          <ul>
            <li><a href="https://www.youtube.com/@SakuraMiko" target="_blank" rel="noreferrer">Sakura Miko YouTube</a></li>
            <li><a href="https://www.youtube.com/@HoshimachiSuisei" target="_blank" rel="noreferrer">Hoshimachi Suisei YouTube</a></li>
            <li><a href="https://twitter.com/sakuramiko35" target="_blank" rel="noreferrer">Sakura Miko X</a></li>
            <li><a href="https://twitter.com/suaborealice" target="_blank" rel="noreferrer">Hoshimachi Suisei X</a></li>
          </ul>
        </section>
      </main>

      {modalItem && <Modal item={modalItem} onClose={() => setModalItem(null)} />}
    </div>
  );
}
