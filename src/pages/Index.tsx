import { useState, useMemo } from 'react';
import { PHASES, TIMELINE, TYPE_ZH, type TimelineItem } from '@/data/micomet-data';

function fmt(dateISO: string) {
  if (!dateISO) return '';
  const [y, m, d] = dateISO.split('-');
  return `${y}/${parseInt(m)}/${parseInt(d)}`;
}

function getLink(ctx: string, title: string, link: string) {
  if (link && link.startsWith('http')) return { url: link, type: link.includes('twitter') ? 'tw' : 'yt' };
  const text = (ctx || '') + ' ' + (title || '');
  const yt = text.match(/https?:\/\/(www\.)?youtu(be\.com|\.be)\/\S+/);
  if (yt) return { url: yt[0].replace(/[）)】」』"']+$/, ''), type: 'yt' };
  const tw = text.match(/https?:\/\/(www\.)?twitter\.com\/\S+/);
  if (tw) return { url: tw[0].replace(/[）)】」』"']+$/, ''), type: 'tw' };
  return null;
}

function Card({ item, side, onClick }: { item: TimelineItem; side: string; onClick: (item: TimelineItem, side: string) => void }) {
  const link = getLink(item.ctx || '', item.title || '', item.directLink || item.link || '');
  const typeKey = (item.type || 'clip').toLowerCase();
  const displayType = TYPE_ZH[item.type] || item.type || '切片';
  const displayTitle = item.title || '(無標題)';
  const displayCtx = item.ctx || '';
  return (
    <div className={`ev-card ${side}`} onClick={() => onClick(item, side)}>
      <div className="card-meta">
        <span className="card-date">{fmt(item.date)}</span>
        <span className={`card-type ct-${typeKey}`}>{displayType}</span>
        {item.platform && item.platform !== 'YT' && (
          <span className="card-type ct-other">{item.platform}</span>
        )}
      </div>
      <div className="card-emoji">{item.emoji || '💫'}</div>
      <div className="card-title">{displayTitle}</div>
      {displayCtx && <div className="card-ctx">{displayCtx}</div>}
      <div className="card-more">
        {link ? (link.type === 'yt' ? '▶ 前往影片' : '🐦 前往推文') : '閱讀詳情 →'}
      </div>
    </div>
  );
}

function Modal({ item, side, onClose }: { item: TimelineItem; side: string; onClose: () => void }) {
  if (!item) return null;
  const link = getLink(item.ctx || '', item.title || '', item.directLink || item.link || '');
  const povLabel = side === 'miko' ? '🌸 櫻巫女視角' : side === 'suisei' ? '⭐ 星街彗星視角' : '💕 miComet 共同';
  const phase = PHASES.find(p => p.id === item.phase);
  const displayTitle = item.title || '(無標題)';
  const displayCtx = item.ctx || '';
  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal-box" onClick={e => e.stopPropagation()}>
        <div className={`modal-hero ${side}`}></div>
        <div className="modal-body">
          <button className="modal-x" onClick={onClose}>✕</button>
          <div className={`modal-pov ${side}`}>{povLabel}</div>
          <div className="modal-date">
            {fmt(item.date)}
            {item.type && ` ・ ${TYPE_ZH[item.type] || item.type}`}
            {item.platform && item.platform !== 'YT' && ` ・ ${item.platform}`}
            {phase ? ` ・ 第${phase.id}階段：${phase.label}` : ''}
          </div>
          <div className="modal-title">{displayTitle}</div>
          {displayCtx && <div className="modal-ctx">{displayCtx}</div>}
          {link && (
            <a href={link.url} target="_blank" rel="noopener noreferrer"
              className={`modal-link ${link.type}`}>
              {link.type === 'yt' ? '▶ 在 YouTube 觀看' : '🐦 在 Twitter 查看'}
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

  const allItems = useMemo(() => {
    return [...TIMELINE].sort((a, b) => a.date.localeCompare(b.date));
  }, []);

  const filtered = useMemo(() => {
    return allItems.filter(e => {
      if (phaseFilter !== 0 && e.phase !== phaseFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (e.title || '').toLowerCase().includes(q) || (e.ctx || '').toLowerCase().includes(q);
      }
      return true;
    });
  }, [allItems, search, phaseFilter]);

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

  return (
    <>
      {/* HEADER */}
      <div className="header">
        <div className="header-crown">🌸 ✨ ⭐</div>
        <h1>miComet 編年史</h1>
        <div className="header-sub">星街彗星 × 櫻巫女 ｜ Business &amp; Beyond ｜ 2019 – 2025</div>
        <div className="header-pills">
          <span className="pill pink">🌸 咪口 {mikoCount} 則</span>
          <span className="pill blue">⭐ 星街 {suiseiCount} 則</span>
          <span className="pill purple">💕 共同 {sharedCount} 則</span>
        </div>
      </div>

      {/* CONTROLS */}
      <div className="controls-wrap">
        <div className="search-row">
          <span className="si">🔍</span>
          <input placeholder="搜尋故事...（鬼屋、Mario Kart、Animal、超市、凸待...）"
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="btn-row">
          <label>篩選階段：</label>
          <button className={`tbtn ${phaseFilter === 0 ? 'on' : ''}`} onClick={() => setPhaseFilter(0)}>全部</button>
          {PHASES.map(p => (
            <button key={p.id} className={`tbtn ${phaseFilter === p.id ? 'on' : ''}`}
              onClick={() => setPhaseFilter(phaseFilter === p.id ? 0 : p.id)}>
              第{p.id}階段 · {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="result-line">
        {search || phaseFilter !== 0
          ? `找到 ${filtered.length} 個故事`
          : `共 ${total} 個故事（2019 – 2025）`}
      </div>

      {/* MAIN */}
      <div className="main-wrap">
        {activePhases.length === 0 && (
          <div className="empty-state"><div className="eico">🔍</div><p>沒有找到符合條件的故事</p></div>
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
                    <div className="phase-num">第 {phase.id} 階段</div>
                    <div className="phase-name">{phase.label}</div>
                  </div>
                  <div className="phase-period">{phase.period}</div>
                </div>
              </div>
              <p className="phase-desc">{phase.desc}</p>

              {/* 雙時間軸 */}
              <div className="dual">
                {/* 咪口（左） */}
                <div>
                  {(mikoItems.length > 0 || suiseiItems.length > 0) && (
                    <div className="col-head miko">🌸 咪口 · 櫻巫女</div>
                  )}
                  <div className="col-cards">
                    {mikoItems.map(item => (
                      <Card key={item.id} item={item} side="miko"
                        onClick={(it, s) => setModal({ item: it, side: s })} />
                    ))}
                    {mikoItems.length === 0 && suiseiItems.length > 0 && (
                      <div style={{ padding: '16px', textAlign: 'center', color: 'hsl(var(--mc-text2))', fontSize: '13px', opacity: .5 }}>—</div>
                    )}
                  </div>
                </div>

                {/* 中軸 */}
                <div className="axis-col">
                  <div className="ax-line"></div>
                </div>

                {/* 星街（右） */}
                <div>
                  {(mikoItems.length > 0 || suiseiItems.length > 0) && (
                    <div className="col-head suisei">⭐ 彗醬 · 星街彗星</div>
                  )}
                  <div className="col-cards">
                    {suiseiItems.map(item => (
                      <Card key={item.id} item={item} side="suisei"
                        onClick={(it, s) => setModal({ item: it, side: s })} />
                    ))}
                    {suiseiItems.length === 0 && mikoItems.length > 0 && (
                      <div style={{ padding: '16px', textAlign: 'center', color: 'hsl(var(--mc-text2))', fontSize: '13px', opacity: .5 }}>—</div>
                    )}
                  </div>
                </div>
              </div>

              {/* 共同事件 */}
              {sharedItems.length > 0 && (
                <div className="shared-wrap">
                  <div className="shared-head">
                    <h2>💕 miComet 共同時刻</h2>
                    <p>這個階段兩人一起出現的 {sharedItems.length} 個故事</p>
                  </div>
                  <div className="shared-grid">
                    {sharedItems.map(item => (
                      <Card key={item.id} item={item} side="shared"
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
          <h3>兩條線，最終交匯</h3>
          <p>
            從 2019 年星街悄悄打開咪口直播的那一天，<br />
            到卡片戰士的工商、VILLS 的擁抱、夏祭的冰船約會，<br />
            從「商業朋友」到「只是來看妳的」，<br /><br />
            miComet 的故事，從來都不只是商業。
          </p>
        </div>

        {/* 參考資料 */}
        <div className="references-section">
          <h3>📚 參考資料</h3>
          <ul>
            <li><a href="https://www.youtube.com/@SakuraMiko" target="_blank" rel="noopener noreferrer">櫻巫女 Sakura Miko — YouTube 官方頻道</a></li>
            <li><a href="https://www.youtube.com/@HoshimachiSuisei" target="_blank" rel="noopener noreferrer">星街彗星 Hoshimachi Suisei — YouTube 官方頻道</a></li>
            <li><a href="https://twitter.com/sakuramiko35" target="_blank" rel="noopener noreferrer">櫻巫女 — Twitter / X</a></li>
            <li><a href="https://twitter.com/suaborealice" target="_blank" rel="noopener noreferrer">星街彗星 — Twitter / X（前）</a></li>
            <li><a href="https://twitter.com/suaborealice" target="_blank" rel="noopener noreferrer">星街彗星 — Twitter / X</a></li>
            <li><a href="https://hololive.hololivepro.com/" target="_blank" rel="noopener noreferrer">Hololive Production 官方網站</a></li>
            <li><a href="https://seesaawiki.jp/hololivetv/" target="_blank" rel="noopener noreferrer">Hololive 非公式 Wiki</a></li>
            <li><a href="https://www.reddit.com/r/miComet/" target="_blank" rel="noopener noreferrer">r/miComet — Reddit 社群</a></li>
            <li>各切片頻道（hololive 切り抜き）之翻譯與整理</li>
            <li>miComet 編年史資料由粉絲社群整理，所有內容版權歸原作者與 Cover Corp. 所有</li>
          </ul>
        </div>
      </div>

      {/* MODAL */}
      {modal && <Modal item={modal.item} side={modal.side} onClose={() => setModal(null)} />}
    </>
  );
}
