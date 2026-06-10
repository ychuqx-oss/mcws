import { useMemo, useState } from 'react';
import { MICOMET_TIMELINE, type MiCometStory } from '@/data/miCometTimeline';

type Lang = 'zh' | 'ja' | 'en';
type Side = 'miko' | 'suisei' | 'shared' | 'others';

interface TimelineItem {
  id: string;
  date: string;
  phase: number;
  side: Side;
  emoji: string;
  title: Record<Lang, string>;
  ctx: Record<Lang, string>;
  type: string;
  link?: string;
  num: string;
}

interface DateGroup {
  date: string;
  items: TimelineItem[];
}

const PHASES = [
  { id: 1, label: { zh: '真・商業夥伴階段', ja: '真・ビジネスパートナー段階', en: 'True Business Partners' }, period: '2019 - 2020', color: '#ff7b7b', desc: { zh: '從最初的 Project Winter 到後續互動，奠定了 miComet 的開端。', ja: '最初の Project Winter から、その後の交流まで。', en: 'From the first Project Winter interaction onward.' } },
  { id: 2, label: { zh: '曖昧升溫階段', ja: '曖昧が温まる段階', en: 'Heating Up' }, period: '2021', color: '#ffb37b', desc: { zh: '兩人之間的距離開始明顯拉近。', ja: '二人の距離がはっきり縮まり始めた時期。', en: 'A clear shift toward closeness.' } },
  { id: 3, label: { zh: '公開承認階段', ja: '公開承認段階', en: 'Openly Acknowledged' }, period: '2022', color: '#d4e880', desc: { zh: '從互動到態度，關係開始更自然。', ja: 'やり取りも態度も、より自然に。', en: 'The relationship became more natural and open.' } },
  { id: 4, label: { zh: '日常化階段', ja: '日常化段階', en: 'Daily Life' }, period: '2023 - 2024', color: '#80c8e8', desc: { zh: '日常互動與私下連結變成常態。', ja: '日常のやり取りと私的なつながりが常態化。', en: 'Daily interaction became the norm.' } },
  { id: 5, label: { zh: '未來階段', ja: '未来段階', en: 'Future' }, period: 'Future', color: '#a9a3f9', desc: { zh: '傳說中的最終章。', ja: '伝説の最終章。', en: 'The legendary final chapter.' } },
];

const TYPE_NAMES: Record<string, Record<Lang, string>> = {
  Clip: { zh: '剪輯', ja: '切り抜き', en: 'Clip' },
  Stream: { zh: '直播', ja: '配信', en: 'Stream' },
  Text: { zh: '文字', ja: 'テキスト', en: 'Text' },
  Mixed: { zh: '綜合', ja: '混合', en: 'Mixed' },
  Audio: { zh: '音訊', ja: '音声', en: 'Audio' },
  Other: { zh: '其他', ja: 'その他', en: 'Other' },
};

const UI = {
  title: { zh: 'miComet 編年史', ja: 'miComet クロニクル', en: 'miComet Chronicle' },
  subtitle: { zh: '星街彗星 × 櫻巫女 | Business & Beyond', ja: '星街すいせい × さくらみこ | Business & Beyond', en: 'Hoshimachi Suisei × Sakura Miko | Business & Beyond' },
  search: { zh: '搜尋故事、關鍵字、日期...', ja: '物語・キーワード・日付を検索...', en: 'Search stories, keywords, dates...' },
  filter: { zh: '篩選階段：', ja: '段階で絞り込み：', en: 'Filter by phase:' },
  all: { zh: '全部', ja: 'すべて', en: 'All' },
  stats: { zh: '統計總覽', ja: '統計サマリー', en: 'Stats' },
  total: { zh: '總故事數', ja: '総ストーリー数', en: 'Total stories' },
  shared: { zh: '共同故事', ja: '共同ストーリー', en: 'Shared stories' },
  first: { zh: '最早紀錄', ja: '最初の記録', en: 'First record' },
  last: { zh: '最新紀錄', ja: '最新の記錄', en: 'Latest record' },
  results: { zh: '找到 {count} 個結果', ja: '{count} 件見つかりました', en: '{count} results found' },
  heroTag: { zh: 'miComet 特別企劃', ja: 'miComet 特別企画', en: 'miComet Special' },
  heroBlurb: { zh: '以更像活動海報的方式呈現時間線、統計與重點事件。', ja: 'タイムライン、統計、主要イベントをポスター風に再構成。', en: 'A poster-style presentation of the timeline, stats, and highlights.' },
  refs: { zh: '參考資料', ja: '参考資料', en: 'References' },
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
  title: {
    zh: story.titleZh || story.title,
    ja: story.titleJa || story.title,
    en: story.title,
  },
  ctx: {
    zh: story.ctxZh || story.ctx,
    ja: story.ctxJa || story.ctx,
    en: story.ctx,
  },
  type: story.type || 'Other',
})).sort((a, b) => a.date.localeCompare(b.date));

function fmt(dateISO: string, lang: Lang) {
  const date = new Date(`${dateISO}T00:00:00Z`);
  const y = date.getUTCFullYear();
  const m = date.getUTCMonth() + 1;
  const d = date.getUTCDate();
  if (lang === 'en') return `${date.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' })} ${d}, ${y}`;
  return `${y}年${m}月${d}日`;
}

function getLink(item: TimelineItem) {
  const text = `${item.title.zh} ${item.ctx.zh}`;
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

function Card({ item, lang, onOpen }: { item: TimelineItem; lang: Lang; onOpen: (item: TimelineItem) => void }) {
  const link = getLink(item);
  const typeLabel = TYPE_NAMES[item.type]?.[lang] ?? item.type;

  return (
    <article className={`card side-${item.side}`} onClick={() => onOpen(item)}>
      <div className="card-top">
        <span className="card-date">{fmt(item.date, lang)}</span>
        <span className={`card-type type-${item.type.toLowerCase()}`}>{typeLabel}</span>
      </div>
      <div className="card-emoji">{item.emoji || '✨'}</div>
      <div className="card-title">{item.num} {item.title[lang]}</div>
      <div className="card-ctx">{item.ctx[lang]}</div>
      <div className="card-more">{link ? (link.type === 'yt' ? '▶ Watch video' : '🐦 View post') : 'Read more →'}</div>
    </article>
  );
}

function Modal({ item, lang, onClose }: { item: TimelineItem; lang: Lang; onClose: () => void }) {
  const link = getLink(item);
  const phase = PHASES.find((p) => p.id === item.phase);
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className={`modal-bar side-${item.side}`} />
        <div className="modal-body">
          <div className="modal-kicker">{item.num} · {TYPE_NAMES[item.type]?.[lang] ?? item.type}</div>
          <h3>{item.title[lang]}</h3>
          <div className="modal-meta">{fmt(item.date, lang)}{phase ? ` · ${phase.label[lang]}` : ''}</div>
          <p>{item.ctx[lang]}</p>
          {link && (
            <a href={link.url} target="_blank" rel="noreferrer" className="modal-link">
              {link.type === 'yt' ? 'Open YouTube' : 'Open Twitter/X'}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const [lang, setLang] = useState<Lang>('zh');
  const [search, setSearch] = useState('');
  const [phaseFilter, setPhaseFilter] = useState(0);
  const [modalItem, setModalItem] = useState<TimelineItem | null>(null);

  const stats = useMemo(() => {
    const counts: Record<Side, number> = { miko: 0, suisei: 0, shared: 0, others: 0 };
    const typeCounts = new Map<string, number>();
    items.forEach((item) => {
      counts[item.side] += 1;
      typeCounts.set(item.type, (typeCounts.get(item.type) ?? 0) + 1);
    });
    return {
      total: items.length,
      counts,
      typeCounts,
      first: items[0],
      last: items[items.length - 1],
    };
  }, []);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return items.filter((item) => {
      if (phaseFilter !== 0 && item.phase !== phaseFilter) return false;
      if (!q) return true;
      return [item.num, item.date, item.title[lang], item.ctx[lang], item.title.zh, item.ctx.zh].join(' ').toLowerCase().includes(q);
    });
  }, [lang, phaseFilter, search]);

  const filteredPhaseCount = useMemo(() => groupByDate(filtered).length, [filtered]);
  const activePhases = PHASES.filter((phase) => filtered.some((item) => item.phase === phase.id));

  const typeStats = [...stats.typeCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4);

  return (
    <div className="page-shell">
      <div className="backdrop-blob blob-a" />
      <div className="backdrop-blob blob-b" />
      <div className="backdrop-grid" />

      <header className="hero">
        <div className="lang-switch">
          <button className={lang === 'zh' ? 'active' : ''} onClick={() => setLang('zh')}>ZH 中文</button>
          <button className={lang === 'ja' ? 'active' : ''} onClick={() => setLang('ja')}>JP 日本語</button>
          <button className={lang === 'en' ? 'active' : ''} onClick={() => setLang('en')}>EN English</button>
        </div>

        <div className="hero-grid">
          <div className="hero-copy">
            <div className="hero-tag">{UI.heroTag[lang]}</div>
            <h1>{UI.title[lang]}</h1>
            <p>{UI.subtitle[lang]}</p>
            <div className="hero-blurb">{UI.heroBlurb[lang]}</div>
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
        <div className="section-title">{UI.stats[lang]}</div>
        <div className="stats-grid">
          <div className="stat-card accent-pink">
            <div className="stat-label">{UI.total[lang]}</div>
            <div className="stat-value">{stats.total}</div>
            <div className="stat-note">2019 - {new Date().getFullYear()}</div>
          </div>
          <div className="stat-card accent-blue">
            <div className="stat-label">{UI.shared[lang]}</div>
            <div className="stat-value">{stats.counts.shared}</div>
            <div className="stat-note">cross-over moments</div>
          </div>
          <div className="stat-card accent-purple">
            <div className="stat-label">{UI.first[lang]}</div>
            <div className="stat-value small">{fmt(stats.first.date, lang)}</div>
            <div className="stat-note">{stats.first.title[lang]}</div>
          </div>
          <div className="stat-card accent-gold">
            <div className="stat-label">{UI.last[lang]}</div>
            <div className="stat-value small">{fmt(stats.last.date, lang)}</div>
            <div className="stat-note">{stats.last.title[lang]}</div>
          </div>
        </div>
        <div className="type-strip">
          {typeStats.map(([type, count]) => (
            <div key={type} className="type-chip">{TYPE_NAMES[type]?.[lang] ?? type} <strong>{count}</strong></div>
          ))}
        </div>
      </section>

      <section className="controls">
        <div className="search-row">
          <span>⌕</span>
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={UI.search[lang]} />
        </div>
        <div className="filter-row">
          <span>{UI.filter[lang]}</span>
          <button className={phaseFilter === 0 ? 'active' : ''} onClick={() => setPhaseFilter(0)}>{UI.all[lang]}</button>
          {PHASES.map((phase) => (
            <button
              key={phase.id}
              className={phaseFilter === phase.id ? 'active' : ''}
              onClick={() => setPhaseFilter(phaseFilter === phase.id ? 0 : phase.id)}
            >
              {phase.id} · {phase.label[lang]}
            </button>
          ))}
        </div>
      </section>

      <section className="result-line">
        {search || phaseFilter !== 0 ? UI.results[lang].replace('{count}', String(filteredPhaseCount)) : UI.results[lang].replace('{count}', String(stats.total))}
      </section>

      <main className="content">
        {activePhases.length === 0 ? (
          <div className="empty-state">No matching stories found</div>
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
                    <h2>{phase.label[lang]}</h2>
                  </div>
                  <div className="phase-period">{phase.period}</div>
                </div>
                <p className="phase-desc">{phase.desc[lang]}</p>
                <div className="day-grid">
                  {groups.map((group) => (
                    <div key={group.date} className="day-card">
                      <div className="day-label">{fmt(group.date, lang)}</div>
                      <div className="card-list">
                        {group.items.map((item) => (
                          <Card key={item.id} item={item} lang={lang} onOpen={setModalItem} />
                        ))}
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
          <p>{UI.heroBlurb[lang]}</p>
        </section>

        <section className="references">
          <h3>{UI.refs[lang]}</h3>
          <ul>
            <li><a href="https://www.youtube.com/@SakuraMiko" target="_blank" rel="noreferrer">Sakura Miko YouTube</a></li>
            <li><a href="https://www.youtube.com/@HoshimachiSuisei" target="_blank" rel="noreferrer">Hoshimachi Suisei YouTube</a></li>
            <li><a href="https://twitter.com/sakuramiko35" target="_blank" rel="noreferrer">Sakura Miko X</a></li>
            <li><a href="https://twitter.com/suaborealice" target="_blank" rel="noreferrer">Hoshimachi Suisei X</a></li>
          </ul>
        </section>
      </main>

      {modalItem && <Modal item={modalItem} lang={lang} onClose={() => setModalItem(null)} />}
    </div>
  );
}
