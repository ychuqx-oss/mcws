import { useState, useMemo } from 'react';
import { PHASES, TIMELINE, TYPE_NAMES, type TimelineItem, type InternationalizedString } from '@/data/micomet-data';

// Define types for the languages
type Lang = 'zh' | 'ja' | 'en';

const monthNames: { [key in Lang]: string[] } = {
  zh: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
  ja: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

function fmt(dateISO: string, lang: Lang) {
  if (!dateISO) return '';
  const date = new Date(dateISO);
  const y = date.getUTCFullYear();
  const m = date.getUTCMonth();
  const d = date.getUTCDate();
  if (lang === 'zh') return `${y}年${m + 1}月${d}日`;
  if (lang === 'ja') return `${y}年${m + 1}月${d}日`;
  return `${monthNames[lang][m]} ${d}, ${y}`;
}

function getLink(ctx: InternationalizedString, title: InternationalizedString, link: string) {
  if (link && link.startsWith('http')) return { url: link, type: link.includes('twitter') ? 'tw' : 'yt' };
  const text = (ctx.zh || '') + ' ' + (title.zh || ''); // Search in Chinese context
  const yt = text.match(/https?:\/\/(www\.)?youtu(be\.com|\.be)\/\S+/);
  if (yt) return { url: yt[0].replace(/[）)】」』"']+$/, ''), type: 'yt' };
  const tw = text.match(/https?:\/\/(www\.)?twitter\.com\/\S+/);
  if (tw) return { url: tw[0].replace(/[）)】」』"']+$/, ''), type: 'tw' };
  return null;
}

const UI_STRINGS = {
  title: { zh: 'miComet 編年史', ja: 'miComet クロニクル', en: 'miComet Chronicle' },
  subtitle: { zh: '星街彗星 × 櫻巫女 ｜ Business & Beyond', ja: '星街すいせい × さくらみこ ｜ ビジネスとそれを超えて', en: 'Hoshimachi Suisei × Sakura Miko | Business & Beyond' },
  mikoStories: { zh: '🌸 咪口', ja: '🌸 みこち', en: '🌸 Miko' },
  suiseiStories: { zh: '⭐ 星街', ja: '⭐ すいちゃん', en: '⭐ Suisei' },
  sharedStories: { zh: '💕 共同', ja: '💕 共有', en: '💕 Shared' },
  searchPlaceholder: { zh: '搜尋故事...（鬼屋、Mario Kart、Animal、超市、凸待...）', ja: '物語を検索... (お化け屋敷, マリオカート, アニマル, スーパー...)', en: 'Search stories... (haunted house, Mario Kart, Animal, supermarket...)' },
  filterPhase: { zh: '篩選階段：', ja: 'フェーズで絞り込み:', en: 'Filter by Phase:' },
  all: { zh: '全部', ja: 'すべて', en: 'All' },
  phaseButton: { zh: '第{id}階段 · {label}', ja: 'フェーズ{id} · {label}', en: 'Phase {id} · {label}' },
  foundStories: { zh: '找到 {count} 個故事', ja: '{count} 件の物語が見つかりました', en: 'Found {count} stories' },
  totalStories: { zh: '共 {count} 個故事（2019 – 2023）', ja: '合計 {count} 件の物語 (2019 – 2023)', en: 'Total of {count} stories (2019 – 2023)' },
  noResults: { zh: '沒有找到符合條件的故事', ja: '該当する物語は見つかりませんでした', en: 'No matching stories found' },
  mikoColumn: { zh: '🌸 咪口 · 櫻巫女', ja: '🌸 みこち · さくらみこ', en: '🌸 Miko · Sakura Miko' },
  suiseiColumn: { zh: '⭐ 彗醬 · 星街彗星', ja: '⭐ すいちゃん · 星街すいせい', en: '⭐ Suichan · Hoshimachi Suisei' },
  sharedMoments: { zh: '💕 miComet 共同時刻', ja: '💕 miComet 共有の瞬間', en: '💕 miComet Shared Moments' },
  sharedSub: { zh: '這個階段兩人一起出現的 {count} 個故事', ja: 'このフェーズで二人が一緒に登場した物語 {count} 件', en: '{count} stories where they appeared together in this phase' },
  convergenceTitle: { zh: '兩條線，最終交匯', ja: '二つの線が、ついに交わる', en: 'Two Lines, Finally Converging' },
  convergenceBody: {
    zh: `從 2019 年星街悄悄打開咪口直播的那一天，<br />到卡片戰士的工商、VILLS 的擁抱、夏祭的冰船約會，<br />從「商業朋友」到「只是來看妳的」，<br /><br />miComet 的故事，從來都不只是商業。`,
    ja: `2019年、星街がこっそりみこの配信を開いたあの日から、<br />カードファイトのコラボ、VILLSでの抱擁、夏祭りの氷上ボートデートまで、<br />「ビジネスフレンド」から「ただ、君に会いに来ただけ」へ、<br /><br />miCometの物語は、決してビジネスだけではなかった。`,
    en: `From that day in 2019 when Suisei secretly opened Miko's stream,<br />to the Cardfight collab, the hug at VILLS, the ice boat date at the summer festival,<br />from "business friends" to "I just came to see you,"<br /><br />the story of miComet was never just about business.`
  },
  references: { zh: '📚 參考資料', ja: '📚 参考資料', en: '📚 References' },
  cardMore: {
    yt: { zh: '▶ 前往影片', ja: '▶ 動画へ', en: '▶ Watch Video' },
    tw: { zh: '🐦 前往推文', ja: '🐦 ツイートへ', en: '🐦 View Tweet' },
    default: { zh: '閱讀詳情 →', ja: '詳細を見る →', en: 'Read More →' }
  },
  modalPov: {
    miko: { zh: '🌸 櫻巫女視角', ja: '🌸 さくらみこ視点', en: '🌸 Sakura Miko's POV' },
    suisei: { zh: '⭐ 星街彗星視角', ja: '⭐ 星街すいせい視点', en: '⭐ Hoshimachi Suisei's POV' },
    shared: { zh: '💕 miComet 共同', ja: '💕 miComet 共有', en: '💕 miComet Shared' }
  },
  modalPhase: { zh: '第{id}階段：{label}', ja: 'フェーズ{id}：{label}', en: 'Phase {id}: {label}' },
  modalLink: {
    yt: { zh: '▶ 在 YouTube 觀看', ja: '▶ YouTubeで見る', en: '▶ Watch on YouTube' },
    tw: { zh: '🐦 在 Twitter 查看', ja: '🐦 Twitterで見る', en: '🐦 View on Twitter' }
  }
};

function Card({ item, side, lang, onClick }: { item: TimelineItem; side: string; lang: Lang; onClick: (item: TimelineItem, side: string) => void }) {
  const link = getLink(item.ctx, item.title, item.directLink || item.link || '');
  const typeKey = (item.type || 'Clip');
  const displayType = TYPE_NAMES[typeKey]?.[lang] || typeKey;
  const displayTitle = item.title[lang] || item.title.zh || '(No Title)';
  const displayCtx = item.ctx[lang] || item.ctx.zh;
  
  let moreText = UI_STRINGS.cardMore.default[lang];
  if (link) {
    moreText = link.type === 'yt' ? UI_STRINGS.cardMore.yt[lang] : UI_STRINGS.cardMore.tw[lang];
  }

  return (
    <div className={`ev-card ${side}`} onClick={() => onClick(item, side)}>
      <div className="card-meta">
        <span className="card-date">{fmt(item.date, lang)}</span>
        <span className={`card-type ct-${typeKey.toLowerCase()}`}>{displayType}</span>
        {item.platform && item.platform !== 'YT' && (
          <span className="card-type ct-other">{item.platform}</span>
        )}
      </div>
      <div className="card-emoji">{item.emoji || '💫'}</div>
      <div className="card-title">{displayTitle}</div>
      {displayCtx && <div className="card-ctx">{displayCtx}</div>}
      <div className="card-more">{moreText}</div>
    </div>
  );
}

function Modal({ item, side, lang, onClose }: { item: TimelineItem; side: string; lang: Lang; onClose: () => void }) {
  if (!item) return null;
  const link = getLink(item.ctx, item.title, item.directLink || item.link || '');
  const povLabel = UI_STRINGS.modalPov[side][lang];
  const phase = PHASES.find(p => p.id === item.phase);
  const displayTitle = item.title[lang] || item.title.zh || '(No Title)';
  const displayCtx = item.ctx[lang] || item.ctx.zh;

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className={`modal-hero ${side}`}></div>
        <div className="modal-body">
          <button className="modal-x" onClick={onClose}>✕</button>
          <div className={`modal-pov ${side}`}>{povLabel}</div>
          <div className="modal-date">
            {fmt(item.date, lang)}
            {item.type && ` ・ ${TYPE_NAMES[item.type]?.[lang] || item.type}`}
            {item.platform && item.platform !== 'YT' && ` ・ ${item.platform}`}
            {phase ? ` ・ ${UI_STRINGS.modalPhase[lang].replace('{id}', String(phase.id)).replace('{label}', phase.label[lang])}` : ''}
          </div>
          <div className="modal-title">{displayTitle}</div>
          {displayCtx && <div className="modal-ctx" dangerouslySetInnerHTML={{ __html: displayCtx.replace(/\n/g, '<br />') }}></div>}
          {link && (
            <a href={link.url} target="_blank" rel="noopener noreferrer" className={`modal-link ${link.type}`}>
              {link.type === 'yt' ? UI_STRINGS.modalLink.yt[lang] : UI_STRINGS.modalLink.tw[lang]}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Index() {
  const [search, setSearch] = useState('');
  const [phaseFilter, setPhaseFilter] = useState(0);
  const [modal, setModal] = useState<{ item: TimelineItem; side: string } | null>(null);
  const [lang, setLang] = useState<Lang>('zh');

  const allItems = useMemo(() => {
    return [...TIMELINE].sort((a, b) => a.date.localeCompare(b.date));
  }, []);

  const filtered = useMemo(() => {
    return allItems.filter(e => {
      if (phaseFilter !== 0 && e.phase !== phaseFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (e.title[lang] || e.title.zh).toLowerCase().includes(q) || 
               (e.ctx[lang] || e.ctx.zh).toLowerCase().includes(q);
      }
      return true;
    });
  }, [allItems, search, phaseFilter, lang]);

  const byPhase = useMemo(() => {
    const map: Record<number, TimelineItem[]> = {};
    filtered.forEach(e => {
      if (!map[e.phase]) map[e.phase] = [];
      map[e.phase].push(e);
    });
    return map;
  }, [filtered]);

  const mikoCount = allItems.filter(e => e.side === 'miko').length;
  const suiseiCount = allItems.filter(e => e.side === 'suisei').length;
  const sharedCount = allItems.filter(e => e.side === 'shared').length;
  const total = mikoCount + suiseiCount + sharedCount;

  const activePhases = PHASES.filter(p => byPhase[p.id] && byPhase[p.id].length > 0);
  
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* HEADER */}
      <div className="header">
        <div className="header-lang">
          <button onClick={() => setLang('zh')} className={lang === 'zh' ? 'on' : ''}>中文</button>
          <button onClick={() => setLang('ja')} className={lang === 'ja' ? 'on' : ''}>日本語</button>
          <button onClick={() => setLang('en')} className={lang === 'en' ? 'on' : ''}>English</button>
        </div>
        <div className="header-crown">🌸 ✨ ⭐</div>
        <h1>{UI_STRINGS.title[lang]}</h1>
        <div className="header-sub">{UI_STRINGS.subtitle[lang]} | 2019 – {currentYear}</div>
        <div className="header-pills">
          <span className="pill pink">{UI_STRINGS.mikoStories[lang]} {mikoCount}</span>
          <span className="pill blue">{UI_STRINGS.suiseiStories[lang]} {suiseiCount}</span>
          <span className="pill purple">{UI_STRINGS.sharedStories[lang]} {sharedCount}</span>
        </div>
      </div>

      {/* CONTROLS */}
      <div className="controls-wrap">
        <div className="search-row">
          <span className="si">🔍</span>
          <input placeholder={UI_STRINGS.searchPlaceholder[lang]}
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="btn-row">
          <label>{UI_STRINGS.filterPhase[lang]}</label>
          <button className={`tbtn ${phaseFilter === 0 ? 'on' : ''}`} onClick={() => setPhaseFilter(0)}>{UI_STRINGS.all[lang]}</button>
          {PHASES.map(p => (
            <button key={p.id} className={`tbtn ${phaseFilter === p.id ? 'on' : ''}`}
              onClick={() => setPhaseFilter(phaseFilter === p.id ? 0 : p.id)}>
              {UI_STRINGS.phaseButton[lang].replace('{id}', String(p.id)).replace('{label}', p.label[lang])}
            </button>
          ))}
        </div>
      </div>

      <div className="result-line">
        {search || phaseFilter !== 0
          ? UI_STRINGS.foundStories[lang].replace('{count}', String(filtered.length))
          : UI_STRINGS.totalStories[lang].replace('{count}', String(total))}
      </div>

      {/* MAIN */}
      <div className="main-wrap">
        {activePhases.length === 0 && (
          <div className="empty-state"><div className="eico">🔍</div><p>{UI_STRINGS.noResults[lang]}</p></div>
        )}

        {activePhases.map(phase => {
          const items = byPhase[phase.id] || [];
          const mikoItems = items.filter(e => e.side === 'miko').sort((a, b) => a.date.localeCompare(b.date));
          const suiseiItems = items.filter(e => e.side === 'suisei').sort((a, b) => a.date.localeCompare(b.date));
          const sharedItems = items.filter(e => e.side === 'shared').sort((a, b) => a.date.localeCompare(b.date));

          return (
            <div key={phase.id} className="phase-group" id={`phase-${phase.id}`}>
              {/* Phase header */}
              <div className="phase-header">
                <div className="phase-color-bar" style={{ background: phase.color }}></div>
                <div className="phase-header-body">
                  <div>
                    <div className="phase-num">{UI_STRINGS.phaseButton[lang].replace('{id}', String(phase.id)).replace('{label}','')}</div>
                    <div className="phase-name">{phase.label[lang]}</div>
                  </div>
                  <div className="phase-period">{phase.period}</div>
                </div>
              </div>
              <p className="phase-desc" dangerouslySetInnerHTML={{ __html: phase.desc[lang] }}></p>

              {/* 雙時間軸 */}
              <div className="dual">
                {/* 咪口（左） */}
                <div>
                  {(mikoItems.length > 0 || suiseiItems.length > 0) && (
                    <div className="col-head miko">{UI_STRINGS.mikoColumn[lang]}</div>
                  )}
                  <div className="col-cards">
                    {mikoItems.map(item => (
                      <Card key={item.id} item={item} side="miko" lang={lang}
                        onClick={(it, s) => setModal({ item: it, side: s })} />
                    ))}
                  </div>
                </div>

                <div className="axis-col"><div className="ax-line"></div></div>

                {/* 星街（右） */}
                <div>
                  {(mikoItems.length > 0 || suiseiItems.length > 0) && (
                    <div className="col-head suisei">{UI_STRINGS.suiseiColumn[lang]}</div>
                  )}
                  <div className="col-cards">
                    {suiseiItems.map(item => (
                      <Card key={item.id} item={item} side="suisei" lang={lang}
                        onClick={(it, s) => setModal({ item: it, side: s })} />
                    ))}
                  </div>
                </div>
              </div>

              {/* 共同事件 */}
              {sharedItems.length > 0 && (
                <div className="shared-wrap">
                  <div className="shared-head">
                    <h2>{UI_STRINGS.sharedMoments[lang]}</h2>
                    <p>{UI_STRINGS.sharedSub[lang].replace('{count}', String(sharedItems.length))}</p>
                  </div>
                  <div className="shared-grid">
                    {sharedItems.map(item => (
                      <Card key={item.id} item={item} side="shared" lang={lang}
                        onClick={(it, s) => setModal({ item: it, side: s })} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* 結語 */}
        <div className="convergence">
          <div className="hearts">🌸 💫 ⭐</div>
          <h3>{UI_STRINGS.convergenceTitle[lang]}</h3>
          <p dangerouslySetInnerHTML={{ __html: UI_STRINGS.convergenceBody[lang] }}></p>
        </div>

        {/* 參考資料 */}
        <div className="references-section">
          <h3>{UI_STRINGS.references[lang]}</h3>
          <ul>
            <li><a href="https://www.youtube.com/@SakuraMiko" target="_blank" rel="noopener noreferrer">櫻巫女 Sakura Miko — YouTube Official Channel</a></li>
            <li><a href="https://www.youtube.com/@HoshimachiSuisei" target="_blank" rel="noopener noreferrer">星街彗星 Hoshimachi Suisei — YouTube Official Channel</a></li>
            <li><a href="https://twitter.com/sakuramiko35" target="_blank" rel="noopener noreferrer">櫻巫女 — Twitter / X</a></li>
            <li><a href="https://twitter.com/suaborealice" target="_blank" rel="noopener noreferrer">星街彗星 — Twitter / X</a></li>
            <li><a href="https://docs.google.com/document/d/e/2PACX-1vRcUa0y4lpqboc3v6Q-8qNu5a8v8TX9EkSqbQfjSdUhLcbhANp7XBYfFc2jdZTkzgwMN1P18kNjuP-U/pub" target="_blank" rel="noopener noreferrer">MiComet Compendium II</a></li>
            <li><a href="https://docs.google.com/spreadsheets/d/1UkroWXcwoU-1v_wAT6virfDYKULWyxd8RthHs0vEoM8/" target="_blank" rel="noopener noreferrer">miComet Moments Compendium Spreadsheet (discontinued)</a></li>
            <li><a href="https://seesaawiki.jp/hololivetv/" target="_blank" rel="noopener noreferrer">Hololive Unofficial Wiki</a></li>
            <li><a href="https://www.reddit.com/r/miComet/" target="_blank" rel="noopener noreferrer">r/miComet — Reddit Community</a></li>
            <li>Clip channels (hololive 切り抜き) for translations and compilations</li>
            <li>Chronicle data compiled by the fan community. All content rights belong to the original creators and Cover Corp.</li>
          </ul>
        </div>
      </div>

      {/* MODAL */}
      {modal && <Modal item={modal.item} side={modal.side} lang={lang} onClose={() => setModal(null)} />}
    </>
  );
}
