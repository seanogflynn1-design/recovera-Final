// Clinician dashboard — Recovera (v2 with tabs)

const CB = window.PATIENT_BRAND;

// ---- Shared atoms --------------------------------------------------------
function Tag({ children, tone = 'green' }) {
  const map = {
    green: { bg: CB.greenSoft, fg: CB.green },
    amber: { bg: CB.amberBg, fg: CB.amber },
    red:   { bg: CB.redBg, fg: CB.red },
    gray:  { bg: '#F2F2F0', fg: CB.ink3 },
    ink:   { bg: '#F2F2F0', fg: CB.ink },
  }[tone];
  return (
    <span style={{
      fontSize: 10, fontWeight: 600, color: map.fg, letterSpacing: 1.2,
      padding: '3px 8px', borderRadius: 4, background: map.bg, textTransform: 'uppercase',
      display: 'inline-flex', alignItems: 'center', gap: 4,
    }}>{children}</span>
  );
}

function StatCard({ label, value, sub, tone = 'ink', children, className }) {
  const toneC = { green: CB.green, amber: CB.amber, ink: CB.ink, red: CB.red }[tone];
  return (
    <div className={className} style={{ border: `1px solid ${CB.line}`, borderRadius: 14, padding: 18, background: '#fff' }}>
      <div style={{ fontSize: 11, color: CB.ink3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 10 }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <div style={{ fontSize: 30, fontWeight: 600, color: toneC, letterSpacing: -0.8, fontVariantNumeric: 'tabular-nums' }}>{value}</div>
        {sub && <div style={{ fontSize: 12, color: CB.ink3 }}>{sub}</div>}
      </div>
      {children}
    </div>
  );
}

// ---- Patient data --------------------------------------------------------
const PATIENTS = [
  { id: 'CM', initials: 'CM', name: 'Conor Murphy',    condition: 'ACL reconstruction', week: 8,  adherence: 82, pain: [4,2], painTrend: 'down', flag: 'amber', time: '14:30', outcome: 'On track · 4 wks ahead' },
  { id: 'AO', initials: 'AO', name: "Aoife O'Brien",   condition: 'Rotator cuff',       week: 4,  adherence: 91, pain: [6,5], painTrend: 'down', flag: null,     time: '10:00', outcome: 'Ahead of protocol' },
  { id: 'DK', initials: 'DK', name: 'Daniel Keane',    condition: 'Achilles rehab',     week: 12, adherence: 66, pain: [3,4], painTrend: 'up',   flag: 'red',    time: '10:45', outcome: 'At risk · 2 wks behind' },
  { id: 'MR', initials: 'MR', name: 'Maeve Ryan',      condition: 'Patellar tendinopathy', week: 3, adherence: 88, pain: [5,4], painTrend: 'down', flag: null, time: '11:30', outcome: 'On track' },
  { id: 'TH', initials: 'TH', name: 'Tomás Hennessy',  condition: 'Low back · L4-L5',   week: 6,  adherence: 54, pain: [7,7], painTrend: 'flat', flag: 'red',    time: '13:15', outcome: 'Needs call · 1 wk behind' },
  { id: 'SD', initials: 'SD', name: 'Siobhán Doyle',   condition: 'MCL sprain',         week: 2,  adherence: 96, pain: [4,2], painTrend: 'down', flag: null,     time: '15:15', outcome: 'Ahead of protocol' },
  { id: 'JW', initials: 'JW', name: 'James Whelan',    condition: 'Meniscus repair',    week: 9,  adherence: 79, pain: [3,3], painTrend: 'flat', flag: null,     time: '16:00', outcome: 'On track' },
  { id: 'NB', initials: 'NB', name: 'Niamh Byrne',     condition: 'Hip impingement',    week: 5,  adherence: 42, pain: [6,7], painTrend: 'up',   flag: 'red',    time: '16:45', outcome: 'At risk · 3 wks behind' },
];

// ---- Sidebar -------------------------------------------------------------
function Sidebar({ view, setView, selectedPatient, setSelectedPatient }) {
  const tabs = [
    { k: 'today',    l: 'Today',    n: 8,  icon: <svg width="16" height="16" viewBox="0 0 16 16"><rect x="2" y="3" width="12" height="11" rx="2" stroke="currentColor" strokeWidth="1.4" fill="none"/><path d="M2 6h12M5 2v2M11 2v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg> },
    { k: 'clinic',   l: 'Clinic',         icon: <svg width="16" height="16" viewBox="0 0 16 16"><path d="M2 14V6l6-4 6 4v8" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinejoin="round"/><path d="M6 14V9h4v5" stroke="currentColor" strokeWidth="1.4" fill="none"/></svg> },
    { k: 'messages', l: 'Messages', n: 3,  icon: <svg width="16" height="16" viewBox="0 0 16 16"><path d="M2 4a2 2 0 012-2h8a2 2 0 012 2v6a2 2 0 01-2 2H6l-2 2v-2a2 2 0 01-2-2V4z" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinejoin="round"/></svg> },
    { k: 'network',  l: 'Network',        icon: <svg width="16" height="16" viewBox="0 0 16 16"><circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.4" fill="none"/><circle cx="12" cy="4" r="2" stroke="currentColor" strokeWidth="1.4" fill="none"/><circle cx="8" cy="12" r="2" stroke="currentColor" strokeWidth="1.4" fill="none"/><path d="M5.5 5.5L7 10.5M10.5 5.5L9 10.5" stroke="currentColor" strokeWidth="1.4"/></svg> },
    { k: 'reports',  l: 'Reports',        icon: <svg width="16" height="16" viewBox="0 0 16 16"><rect x="3" y="2" width="10" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4" fill="none"/><path d="M5 6h6M5 9h6M5 12h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg> },
  ];
  return (
    <div style={{ width: 240, borderRight: `1px solid ${CB.line}`, background: '#fff',
      display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '20px 18px 14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 22, height: 22, borderRadius: 6, background: CB.green,
            display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 10, height: 10, borderRadius: 5, border: '1.8px solid #fff', borderBottomColor: 'transparent', transform: 'rotate(-45deg)' }}/>
          </div>
          <div style={{ fontSize: 15, fontWeight: 600, color: CB.ink, letterSpacing: -0.3 }}>recovera</div>
          <div style={{ flex: 1 }}/>
          <div style={{ fontSize: 10, color: CB.ink4, letterSpacing: 0.8, textTransform: 'uppercase', fontWeight: 500 }}>Clinic</div>
        </div>
      </div>

      {/* Primary nav */}
      <div style={{ padding: '8px 8px 16px', borderBottom: `1px solid ${CB.line}` }}>
        {tabs.map(t => {
          const active = view === t.k;
          return (
            <button key={t.k} onClick={() => setView(t.k)} style={{
              width: '100%', display: 'flex', alignItems: 'center', gap: 10,
              padding: '9px 12px', borderRadius: 8, border: 'none', cursor: 'pointer', marginBottom: 2,
              background: active ? CB.greenSoft : 'transparent',
              color: active ? CB.green : CB.ink2,
              fontFamily: 'inherit', fontSize: 13, fontWeight: active ? 600 : 500, letterSpacing: -0.1,
            }}>
              <span style={{ color: active ? CB.green : CB.ink3, display: 'flex' }}>{t.icon}</span>
              <span style={{ flex: 1, textAlign: 'left' }}>{t.l}</span>
              {t.n && (
                <span style={{
                  minWidth: 20, height: 18, padding: '0 6px', borderRadius: 9,
                  background: active ? CB.green : '#F2F2F0', color: active ? '#fff' : CB.ink3,
                  fontSize: 10, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>{t.n}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Patient list (only shown on today view) */}
      {view === 'today' && (
        <>
          <div style={{ padding: '14px 18px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: 10, color: CB.ink3, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1.2 }}>Today's patients</div>
            <div style={{ fontSize: 10, color: CB.ink4 }}>8 · 3 flagged</div>
          </div>
          <div style={{ flex: 1, overflow: 'auto', padding: '0 8px' }}>
            {PATIENTS.map(p => {
              const active = selectedPatient === p.id;
              return (
                <button key={p.id} onClick={() => setSelectedPatient(p.id)} style={{
                  width: '100%', textAlign: 'left', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px',
                  borderRadius: 8, background: active ? CB.greenSoft : 'transparent',
                  fontFamily: 'inherit', marginBottom: 1,
                }}>
                  <div style={{ width: 28, height: 28, borderRadius: 14, flexShrink: 0,
                    background: active ? CB.green : '#F2F2F0', color: active ? '#fff' : CB.ink2,
                    fontSize: 11, fontWeight: 600,
                    display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{p.initials}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12.5, fontWeight: 500, color: CB.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</div>
                    <div style={{ fontSize: 10.5, color: CB.ink3, marginTop: 1 }}>{p.time} · Wk {p.week}</div>
                  </div>
                  {p.flag && <span style={{ width: 6, height: 6, borderRadius: 3, background: p.flag === 'red' ? CB.red : CB.amber, flexShrink: 0 }}/>}
                </button>
              );
            })}
          </div>
        </>
      )}
      {view !== 'today' && <div style={{ flex: 1 }}/>}

      <button onClick={() => setView('profile')} style={{
        padding: '12px 18px', borderTop: `1px solid ${CB.line}`, display: 'flex', alignItems: 'center', gap: 10,
        background: view === 'profile' ? CB.greenSoft : 'transparent',
        border: 'none', cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left', width: '100%',
      }}>
        <div style={{ width: 28, height: 28, borderRadius: 14, background: CB.green, color: '#fff', fontSize: 11, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>ÁO</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 12, color: CB.ink, fontWeight: 500 }}>Dr. Áine O'Brien</span>
            <svg width="10" height="10" viewBox="0 0 10 10" style={{ flexShrink: 0 }}>
              <path d="M5 0.7l3.8 1.5v2.9c0 2.2-1.6 3.9-3.8 4.4-2.2-.5-3.8-2.2-3.8-4.4V2.2L5 0.7z" fill={CB.green}/>
              <path d="M3.3 5l1.2 1.2L7 3.7" stroke="#fff" strokeWidth="1" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{ fontSize: 10, color: CB.ink3 }}>Dublin Physio Co · MISCP</div>
        </div>
      </button>
    </div>
  );
}

// ---- Today view (8 patient cards + 3 red flags) -------------------------
function TodayView({ onOpenPatient, onStartLive }) {
  const flagged = PATIENTS.filter(p => p.flag === 'red');
  return (
    <div style={{ padding: 32, maxWidth: 1040, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 11, color: CB.ink3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.4 }}>Tuesday · 14 April</div>
          <div style={{ fontSize: 26, fontWeight: 600, color: CB.ink, letterSpacing: -0.5, marginTop: 4 }}>8 patients today</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button style={{ height: 34, padding: '0 14px', borderRadius: 8, border: `1px solid ${CB.line}`,
            background: '#fff', color: CB.ink2, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>Filter</button>
          <button style={{ height: 34, padding: '0 14px', borderRadius: 8, border: 'none',
            background: CB.ink, color: '#fff', fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>+ Add patient</button>
        </div>
      </div>

      {/* KPI strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 28 }}>
        <StatCard className="kpi-card-scheduled" label="Scheduled" value="8" sub="today" tone="ink"/>
        <StatCard className="kpi-card-flags" label="Red flags" value="3" sub="needs review" tone="red"/>
        <StatCard className="kpi-card-adherence" label="Avg adherence" value="75%" sub="clinic" tone="green"/>
        <StatCard className="kpi-card-completed" label="Completed" value="2 / 8" sub="by 14:30" tone="ink"/>
      </div>

      {/* Red flag alerts */}
      <div style={{ fontSize: 11, color: CB.ink3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.4, marginBottom: 10 }}>
        Flagged for attention · 3
      </div>
      <div className="flagged-patients-panel" style={{ marginBottom: 28 }}>
        {flagged.map((p, i) => (
          <div key={p.id} className={
            p.id === 'DK' ? 'flag-daniel-keane' :
            p.id === 'TH' ? 'flag-tomas-hennessy' :
            p.id === 'NB' ? 'flag-niamh-byrne' : ''
          } style={{
            display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px',
            background: CB.redBg, borderRadius: 10, marginBottom: 8,
            animation: `pulseBar 2.6s ease-in-out infinite`,
            animationDelay: `${i * 0.3}s`,
          }}>
            <div style={{ width: 22, height: 22, borderRadius: 11, background: CB.red, color: '#fff',
              fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>!</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, color: CB.red, fontWeight: 600 }}>{p.name}</div>
              <div style={{ fontSize: 12, color: CB.red, opacity: 0.85, marginTop: 2 }}>
                {p.id === 'DK' && 'Pain spike · 3→4 across last 2 sessions. Missed Friday session.'}
                {p.id === 'TH' && 'Adherence at 54%. No sessions logged in 3 days.'}
                {p.id === 'NB' && 'Pain trending up 6→7. Adherence 42%. Requires call.'}
              </div>
            </div>
            <button onClick={() => onOpenPatient(p.id)} style={{ background: 'transparent', border: 'none',
              color: CB.red, fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit' }}>Open brief →</button>
          </div>
        ))}
      </div>

      {/* Patient schedule grid */}
      <div style={{ fontSize: 11, color: CB.ink3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.4, marginBottom: 10 }}>
        Schedule
      </div>
      <div className="schedule-panel" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
        {PATIENTS.map(p => (
          <button key={p.id} onClick={() => onOpenPatient(p.id)} className={p.id === 'CM' ? 'patient-card-conor' : ''} style={{
            textAlign: 'left', border: `1px solid ${CB.line}`, borderRadius: 12, padding: 16,
            background: '#fff', cursor: 'pointer', fontFamily: 'inherit',
            transition: 'border-color 0.15s, transform 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = CB.green; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = CB.line; }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 18, background: CB.greenSoft, color: CB.green,
                fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{p.initials}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: CB.ink, letterSpacing: -0.2 }}>{p.name}</span>
                  {p.flag === 'red' && <span style={{ width: 7, height: 7, borderRadius: 3.5, background: CB.red,
                    animation: 'pulse 1.8s ease-in-out infinite' }}/>}
                  {p.flag === 'amber' && <span style={{ width: 7, height: 7, borderRadius: 3.5, background: CB.amber }}/>}
                </div>
                <div style={{ fontSize: 12, color: CB.ink3, marginTop: 2 }}>{p.condition} · Wk {p.week}</div>
              </div>
              <div style={{ fontSize: 12, color: CB.ink3, fontVariantNumeric: 'tabular-nums' }}>{p.time}</div>
            </div>
            <div style={{ display: 'flex', gap: 18, paddingTop: 10, borderTop: `1px solid ${CB.line}` }}>
              <div>
                <div style={{ fontSize: 10, color: CB.ink3, letterSpacing: 0.8, textTransform: 'uppercase', fontWeight: 500 }}>Adherence</div>
                <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2,
                  color: p.adherence >= 80 ? CB.green : p.adherence >= 60 ? CB.amber : CB.red,
                  fontVariantNumeric: 'tabular-nums' }}>{p.adherence}%</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: CB.ink3, letterSpacing: 0.8, textTransform: 'uppercase', fontWeight: 500 }}>Pain</div>
                <div style={{ fontSize: 14, fontWeight: 600, color: CB.ink, marginTop: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                  {p.pain[0]}→{p.pain[1]}
                  <span style={{ color: p.painTrend === 'down' ? CB.green : p.painTrend === 'up' ? CB.red : CB.ink3, fontSize: 11 }}>
                    {p.painTrend === 'down' ? '↓' : p.painTrend === 'up' ? '↑' : '→'}
                  </span>
                </div>
              </div>
              <div style={{ flex: 1 }}/>
              <div style={{ alignSelf: 'center' }}>
                {p.flag === 'red' && <Tag tone="red">Flag</Tag>}
                {p.flag === 'amber' && <Tag tone="amber">Review</Tag>}
                {!p.flag && <Tag tone="green">Ready</Tag>}
              </div>
            </div>
            <div style={{ marginTop: 10, fontSize: 11, fontWeight: 500,
              color: p.outcome.includes('At risk') || p.outcome.includes('Needs') ? CB.red
                : p.outcome.includes('Ahead') || p.outcome.includes('ahead') ? CB.green : CB.ink3,
              letterSpacing: 0.2 }}>
              {p.outcome}
            </div>
          </button>
        ))}
      </div>
      <div style={{ height: 40 }}/>
    </div>
  );
}

// ---- Pain sparkline ------------------------------------------------------
function PainSparkline() {
  const data = [6, 5, 5, 6, 4, 4, 3, 2];
  const W = 260, H = 60, P = 6;
  const pts = data.map((v, i) => [P + (i / (data.length - 1)) * (W - P * 2), P + (1 - v / 8) * (H - P * 2)]);
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ');
  const area = `${path} L ${pts[pts.length-1][0]} ${H - P} L ${pts[0][0]} ${H - P} Z`;
  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ marginTop: 10, display: 'block' }}>
      <defs>
        <linearGradient id="painGrad" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={CB.green} stopOpacity="0.16"/>
          <stop offset="100%" stopColor={CB.green} stopOpacity="0"/>
        </linearGradient>
      </defs>
      <path d={area} fill="url(#painGrad)"/>
      <path d={path} stroke={CB.green} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"
        style={{ strokeDasharray: 600, strokeDashoffset: 600, animation: 'dash 1.2s 0.1s forwards ease-out' }}/>
      {pts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={i === pts.length - 1 ? 3.5 : 2} fill="#fff" stroke={CB.green} strokeWidth="1.6"/>
      ))}
      <text x={pts[0][0] + 4} y={pts[0][1] - 6} fontSize="10" fill={CB.ink3} fontFamily="ui-monospace, Menlo, monospace">4</text>
      <text x={pts[pts.length-1][0] - 10} y={pts[pts.length-1][1] - 8} fontSize="10" fill={CB.green} fontFamily="ui-monospace, Menlo, monospace" fontWeight="600">2</text>
    </svg>
  );
}

// ---- Movement ring -------------------------------------------------------
function MovementRing({ target = 81 }) {
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    const start = performance.now(); const DUR = 1600; let raf;
    const ease = (x) => 1 - Math.pow(1 - x, 3);
    const tick = (now) => { const p = Math.min(1, (now - start) / DUR); setVal(Math.round(target * ease(p))); if (p < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  const R = 52, C = 2 * Math.PI * R;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
      <svg width="140" height="140" viewBox="0 0 140 140">
        <circle cx="70" cy="70" r={R} stroke={CB.greenSoft} strokeWidth="10" fill="none"/>
        <circle cx="70" cy="70" r={R} stroke={CB.green} strokeWidth="10" fill="none"
          strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C - (val / 100) * C}
          transform="rotate(-90 70 70)" style={{ transition: 'stroke-dashoffset 0.1s linear' }}/>
        <text x="70" y="72" textAnchor="middle" dominantBaseline="middle" fontSize="30" fontWeight="600" fill={CB.ink} style={{ fontVariantNumeric: 'tabular-nums', letterSpacing: -1 }}>{val}</text>
        <text x="70" y="94" textAnchor="middle" fontSize="10" fill={CB.ink3} letterSpacing="1.2" fontWeight="500">MOVEMENT</text>
      </svg>
      <div>
        <div style={{ fontSize: 11, color: CB.ink3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 6 }}>Latest score</div>
        <div style={{ fontSize: 14, color: CB.ink2, lineHeight: 1.5, maxWidth: 200 }}>
          Up 6 points from last session. Best score this recovery cycle.
        </div>
        <div style={{ display: 'flex', gap: 4, marginTop: 12 }}>
          {[62, 68, 65, 72, 75, 81].map((v, i) => (
            <div key={i} style={{ width: 8, height: 28, borderRadius: 2, background: CB.greenSoft, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: `${v}%`, background: CB.green }}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---- Typing AI insight ---------------------------------------------------
function AIInsight({ keyNonce }) {
  const full = "Left knee valgus detected across 3 consecutive sessions. Load-dependent. Probable hip abductor deficit. Recommend activation test before progressing single-leg work.";
  const [typed, setTyped] = React.useState('');
  React.useEffect(() => {
    setTyped('');
    let i = 0; const id = setInterval(() => {
      i += 2;
      if (i >= full.length) { setTyped(full); clearInterval(id); }
      else setTyped(full.slice(0, i));
    }, 22);
    return () => clearInterval(id);
  }, [keyNonce]);
  const done = typed.length >= full.length;
  return (
    <div style={{
      border: `1.5px solid ${CB.green}`, borderRadius: 14, padding: 20,
      background: '#FBFCFB',
      animation: 'slideUp 0.5s 0.1s cubic-bezier(0.22, 1, 0.36, 1) both',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <div style={{
          width: 20, height: 20, borderRadius: 5, background: CB.green,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" fill="none" stroke="#fff" strokeWidth="1.4"/><circle cx="5" cy="5" r="1.5" fill="#fff"/></svg>
        </div>
        <span style={{ fontSize: 11, fontWeight: 600, color: CB.green, letterSpacing: 1.4, textTransform: 'uppercase' }}>AI Insight · Pre-session</span>
        <div style={{ flex: 1 }}/>
        <span style={{ fontSize: 10, color: CB.ink4, letterSpacing: 0.6, fontFamily: 'ui-monospace, Menlo, monospace' }}>Model · Recovera-1</span>
      </div>
      <div style={{ fontSize: 16, color: CB.ink, lineHeight: 1.55, letterSpacing: -0.1, minHeight: 88 }}>
        {typed}
        {!done && <span style={{ display: 'inline-block', width: 7, height: 17, background: CB.green, marginLeft: 2, verticalAlign: 'text-bottom', animation: 'blink 0.9s step-end infinite' }}/>}
      </div>
      <div style={{ display: 'flex', gap: 8, marginTop: 16, opacity: done ? 1 : 0.3, transition: 'opacity 0.3s' }}>
        <button style={{ height: 34, padding: '0 14px', borderRadius: 8, border: 'none',
          background: CB.green, color: '#fff', fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>Add activation test</button>
        <button style={{ height: 34, padding: '0 14px', borderRadius: 8, cursor: 'pointer',
          background: '#fff', color: CB.ink2, fontSize: 12, fontWeight: 500, border: `1px solid ${CB.line}`, fontFamily: 'inherit' }}>Dismiss</button>
      </div>
    </div>
  );
}

// ---- Pre-session brief ---------------------------------------------------
function PreSessionBrief({ patientId, onBack, onStartLive }) {
  const p = PATIENTS.find(x => x.id === patientId) || PATIENTS[0];
  const isConor = p.id === 'CM';
  // AI insight for non-CM patients
  const insightKey = p.id;

  return (
    <div style={{ overflow: 'auto', background: '#FAFAF8', height: '100%' }}>
      {/* Top header */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '18px 32px',
        borderBottom: `1px solid ${CB.line}`, background: '#fff', gap: 16 }}>
        <button onClick={onBack} style={{ background: 'transparent', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 6, color: CB.ink3, fontSize: 12, fontFamily: 'inherit' }}>
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Today
        </button>
        <div style={{ width: 1, height: 20, background: CB.line }}/>
        <div style={{ width: 40, height: 40, borderRadius: 20, background: CB.green, color: '#fff', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{p.initials}</div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ fontSize: 17, fontWeight: 600, color: CB.ink, letterSpacing: -0.3 }}>{p.name}</div>
            {!p.flag && <Tag tone="green">Ready for session</Tag>}
            {p.flag === 'amber' && <Tag tone="amber">Review before session</Tag>}
            {p.flag === 'red' && <Tag tone="red">Clinical flag</Tag>}
          </div>
          <div style={{ fontSize: 12, color: CB.ink3, marginTop: 3 }}>
            {p.condition} · Week {p.week} of 16 · Session today at {p.time}
          </div>
        </div>
        <button style={{ height: 34, padding: '0 14px', borderRadius: 8, border: `1px solid ${CB.line}`,
          background: '#fff', color: CB.ink2, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>Full history</button>
        <button onClick={() => onStartLive && onStartLive(p.name)} style={{ height: 34, padding: '0 14px', borderRadius: 8, border: 'none',
          background: CB.green, color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
          display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ width: 6, height: 6, borderRadius: 3, background: '#fff', animation: 'pulse 1.4s ease-in-out infinite' }}/>
          Start live session
        </button>
      </div>

      <div style={{ padding: 32, maxWidth: 1040 }}>
        <div style={{ fontSize: 11, color: CB.ink3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.4, marginBottom: 14 }}>Pre-session brief</div>

        {/* red flag row */}
        {p.flag === 'amber' && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px',
            background: CB.redBg, borderRadius: 10, marginBottom: 18,
            animation: 'pulseBar 2.2s ease-in-out infinite, slideUp 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
          }}>
            <div style={{ width: 20, height: 20, borderRadius: 10, background: CB.red, color: '#fff',
              fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>!</div>
            <div style={{ flex: 1, fontSize: 13, color: CB.red, fontWeight: 500 }}>
              <strong style={{ fontWeight: 600 }}>Hip symmetry dropped below 50%</strong> in last session. Review before progressing load.
            </div>
            <button style={{ background: 'transparent', border: 'none', color: CB.red, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>Review →</button>
          </div>
        )}

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 18 }}>
          <StatCard label="Adherence" value={`${p.adherence}%`} sub="14d" tone={p.adherence >= 80 ? 'green' : p.adherence >= 60 ? 'amber' : 'red'}>
            <div style={{ display: 'flex', gap: 2, marginTop: 12 }}>
              {Array.from({length: 14}).map((_, i) => (
                <div key={i} style={{ flex: 1, height: 16, borderRadius: 1.5,
                  background: Math.random() * 100 < p.adherence ? CB.green : '#EEE' }}/>
              ))}
            </div>
          </StatCard>
          <StatCard label="Pain trend" value={`${p.pain[0]}→${p.pain[1]}`} sub={p.painTrend === 'down' ? 'declining' : p.painTrend === 'up' ? 'rising' : 'flat'} tone={p.painTrend === 'down' ? 'green' : p.painTrend === 'up' ? 'red' : 'ink'}>
            <div style={{ fontSize: 12, color: p.painTrend === 'down' ? CB.greenDim : p.painTrend === 'up' ? CB.red : CB.ink3, marginTop: 10 }}>
              {p.painTrend === 'down' ? '↓ 50% over 8 weeks' : p.painTrend === 'up' ? '↑ up 1 pt in 7 days' : 'Stable for 14 days'}
            </div>
          </StatCard>
          <StatCard label="Symmetry" value="62%" sub="amber" tone="amber">
            <div style={{ fontSize: 12, color: CB.amber, marginTop: 10 }}>↓ 4 pts vs. last week</div>
          </StatCard>
          <StatCard label="Sessions" value="7 / 8" sub="this week" tone="ink">
            <div style={{ display: 'flex', gap: 3, marginTop: 12 }}>
              {[1,1,1,1,1,1,1,0].map((v, i) => (
                <div key={i} style={{ flex: 1, height: 16, borderRadius: 1.5, background: v ? CB.ink : '#EEE' }}/>
              ))}
            </div>
          </StatCard>
        </div>

        <AIInsight keyNonce={insightKey}/>

        {/* Clinical workflow — auto-booked next appt + PDF / billing actions */}
        <ClinicalActions patient={p}/>

        {/* SOAP note */}
        <SOAPNote patient={p}/>

        {/* Trends row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 18 }}>
          <div style={{ border: `1px solid ${CB.line}`, borderRadius: 14, padding: 20, background: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <div style={{ fontSize: 11, color: CB.ink3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.2 }}>Pain · 8 weeks</div>
              <div style={{ fontSize: 11, color: CB.green, fontWeight: 600 }}>Trending down</div>
            </div>
            <PainSparkline/>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 10, color: CB.ink4, fontFamily: 'ui-monospace, Menlo, monospace' }}>
              <span>W1</span><span>W2</span><span>W3</span><span>W4</span><span>W5</span><span>W6</span><span>W7</span><span>W8</span>
            </div>
          </div>
          <div style={{ border: `1px solid ${CB.line}`, borderRadius: 14, padding: 20, background: '#fff' }}>
            <div style={{ fontSize: 11, color: CB.ink3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 14 }}>Movement score</div>
            <MovementRing target={81}/>
          </div>
        </div>

        {/* Protocol */}
        <div style={{ border: `1px solid ${CB.line}`, borderRadius: 14, padding: 20, background: '#fff', marginTop: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
            <div style={{ fontSize: 11, color: CB.ink3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.2 }}>Today's protocol</div>
            <button style={{ fontSize: 12, color: CB.green, fontWeight: 500, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Edit</button>
          </div>
          {[
            { n: 1, name: 'Hip abductor activation', detail: 'Added · 3×12', tag: 'New', tone: 'green' },
            { n: 2, name: 'Bodyweight squat', detail: '3×12 · tempo 3-1-1' },
            { n: 3, name: 'Single-leg balance', detail: '2×30s · hold test', tag: 'Gated', tone: 'amber' },
            { n: 4, name: 'Step-down', detail: '3×8 per side' },
          ].map((e, i, a) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14,
              padding: '12px 0', borderBottom: i < a.length - 1 ? `1px solid ${CB.line}` : 'none' }}>
              <div style={{ width: 26, height: 26, borderRadius: 13, background: '#F4F4F2',
                color: CB.ink3, fontSize: 11, fontWeight: 600,
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{e.n}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, color: CB.ink, fontWeight: 500 }}>{e.name}</div>
                <div style={{ fontSize: 12, color: CB.ink3, marginTop: 2 }}>{e.detail}</div>
              </div>
              {e.tag && <Tag tone={e.tone}>{e.tag}</Tag>}
            </div>
          ))}
        </div>
        <div style={{ height: 40 }}/>
      </div>
    </div>
  );
}

// ---- Messages view -------------------------------------------------------
function MessagesView() {
  const threads = [
    { id: 'DK', name: 'Daniel Keane', initials: 'DK', last: "The pain came back yesterday after the run. Worse than last week.", time: '08:42', unread: 2, flagged: true },
    { id: 'TH', name: 'Tomás Hennessy', initials: 'TH', last: "Missed yesterday. Back is really tight.", time: '07:18', unread: 1, flagged: true },
    { id: 'NB', name: 'Niamh Byrne', initials: 'NB', last: "Can we push the afternoon session to next week?", time: 'Yesterday', unread: 1, flagged: true },
    { id: 'CM', name: 'Conor Murphy', initials: 'CM', last: "I'll get the activation done tonight.", time: 'Yesterday', unread: 0 },
    { id: 'AO', name: "Aoife O'Brien", initials: 'AO', last: "Felt great today — first time without pain on overhead.", time: '2 days ago', unread: 0 },
    { id: 'MR', name: 'Maeve Ryan', initials: 'MR', last: "Question about the new stretches —", time: '2 days ago', unread: 0 },
  ];
  const [sel, setSel] = React.useState('DK');
  const t = threads.find(x => x.id === sel);

  const msgs = {
    DK: [
      { from: 'them', text: "Morning Sarah. I ran yesterday — felt tight around the Achilles from about 3k.", time: '08:12' },
      { from: 'them', text: "The pain came back yesterday after the run. Worse than last week.", time: '08:42' },
    ],
    TH: [
      { from: 'them', text: "Missed yesterday. Back is really tight.", time: '07:18' },
    ],
    NB: [
      { from: 'them', text: "Can we push the afternoon session to next week? Work is really full on right now.", time: 'Yesterday 18:04' },
    ],
    CM: [
      { from: 'me', text: "Hi Conor — I saw the hip symmetry flag. Adding hip activation to your protocol.", time: 'Yesterday 09:14' },
      { from: 'them', text: "Thanks Sarah. Hip felt a bit off in the warm-up yesterday.", time: 'Yesterday 09:42' },
      { from: 'them', text: "I'll get the activation done tonight.", time: 'Yesterday 09:42' },
    ],
    AO: [{ from: 'them', text: "Felt great today — first time without pain on overhead.", time: '2 days ago' }],
    MR: [{ from: 'them', text: "Question about the new stretches —", time: '2 days ago' }],
  }[sel] || [];

  return (
    <div style={{ display: 'flex', height: '100%', background: '#fff' }}>
      {/* thread list */}
      <div style={{ width: 320, borderRight: `1px solid ${CB.line}`, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px 20px 14px', borderBottom: `1px solid ${CB.line}` }}>
          <div style={{ fontSize: 18, fontWeight: 600, color: CB.ink, letterSpacing: -0.3 }}>Messages</div>
          <div style={{ fontSize: 12, color: CB.ink3, marginTop: 3 }}>3 unread · flagged at top</div>
        </div>
        <div style={{ flex: 1, overflow: 'auto', padding: 8 }}>
          {threads.map(th => {
            const active = sel === th.id;
            return (
              <button key={th.id} onClick={() => setSel(th.id)} style={{
                width: '100%', textAlign: 'left', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'flex-start', gap: 10, padding: 12,
                borderRadius: 10, background: active ? CB.greenSoft : 'transparent', fontFamily: 'inherit', marginBottom: 2,
                position: 'relative',
              }}>
                {th.flagged && <div style={{ position: 'absolute', left: 2, top: '50%', transform: 'translateY(-50%)', width: 3, height: 28, borderRadius: 2, background: CB.red }}/>}
                <div style={{ width: 36, height: 36, borderRadius: 18, background: active ? CB.green : '#F2F2F0',
                  color: active ? '#fff' : CB.ink2, fontSize: 12, fontWeight: 600,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{th.initials}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 6 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: CB.ink, letterSpacing: -0.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{th.name}</span>
                    <span style={{ fontSize: 10, color: CB.ink4, whiteSpace: 'nowrap' }}>{th.time}</span>
                  </div>
                  <div style={{ fontSize: 12, color: CB.ink3, marginTop: 3,
                    display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {th.last}
                  </div>
                </div>
                {th.unread > 0 && (
                  <div style={{ width: 18, height: 18, borderRadius: 9, background: CB.green, color: '#fff',
                    fontSize: 10, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{th.unread}</div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* conversation */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#FAFAF8' }}>
        <div style={{ padding: '16px 24px', borderBottom: `1px solid ${CB.line}`, background: '#fff',
          display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 36, height: 36, borderRadius: 18, background: CB.greenSoft, color: CB.green, fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{t.initials}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: CB.ink }}>{t.name}</div>
            <div style={{ fontSize: 11, color: CB.ink3 }}>Patient file · Open brief</div>
          </div>
          {t.flagged && <Tag tone="red">Flagged</Tag>}
        </div>

        <div style={{ flex: 1, overflow: 'auto', padding: 28, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {msgs.map((m, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: m.from === 'me' ? 'flex-end' : 'flex-start', marginBottom: 2 }}>
              <div style={{ maxWidth: '60%' }}>
                <div style={{
                  padding: '11px 15px', borderRadius: 18,
                  background: m.from === 'me' ? CB.green : '#fff',
                  color: m.from === 'me' ? '#fff' : CB.ink,
                  border: m.from === 'me' ? 'none' : `1px solid ${CB.line}`,
                  fontSize: 13.5, lineHeight: 1.45, letterSpacing: -0.1,
                  borderBottomRightRadius: m.from === 'me' ? 6 : 18,
                  borderBottomLeftRadius: m.from === 'me' ? 18 : 6,
                }}>{m.text}</div>
                <div style={{ fontSize: 10, color: CB.ink4, marginTop: 4, textAlign: m.from === 'me' ? 'right' : 'left' }}>{m.time}</div>
              </div>
            </div>
          ))}

          {/* auto-logged clinical note */}
          <div style={{ alignSelf: 'center', maxWidth: 480, padding: '12px 16px', borderRadius: 10,
            background: CB.greenSoft, marginTop: 8, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <svg width="14" height="14" viewBox="0 0 14 14" style={{ marginTop: 2, flexShrink: 0 }}>
              <rect x="2" y="2" width="10" height="10" rx="2" stroke={CB.green} strokeWidth="1.4" fill="none"/>
              <path d="M5 7l1.5 1.5L9 5" stroke={CB.green} strokeWidth="1.4" fill="none" strokeLinecap="round"/>
            </svg>
            <div style={{ fontSize: 11, color: CB.green, lineHeight: 1.45 }}>
              <strong style={{ fontWeight: 600 }}>Clinical note auto-logged</strong> — pain recurrence post-run, week {sel === 'DK' ? 12 : 8}. Added to patient file.
            </div>
          </div>
        </div>

        <div style={{ padding: '14px 24px 20px', borderTop: `1px solid ${CB.line}`, background: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: '#F4F4F2', borderRadius: 22, padding: '10px 16px' }}>
            <input placeholder={`Message ${t.name.split(' ')[0]}`} style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: 14, fontFamily: 'inherit', color: CB.ink }}/>
            <button style={{ background: 'transparent', border: 'none', color: CB.ink3, fontSize: 11, cursor: 'pointer', fontFamily: 'inherit' }}>+ Note</button>
            <button style={{ width: 32, height: 32, borderRadius: 16, background: CB.green, border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 14 14"><path d="M2 7l10-5-4 12-2-5-4-2z" stroke="#fff" strokeWidth="1.4" fill="none" strokeLinejoin="round"/></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---- Network view --------------------------------------------------------
function NetworkView({ onOpenReferral }) {
  const pros = [
    { name: 'Laura Fitzgerald', role: 'Pilates instructor', clinic: 'Stillorgan Pilates Studio', dist: '2.3 km', verified: true, sessions: 14 },
    { name: 'Eoin Gallagher',   role: 'S&C coach',         clinic: 'Athletic Development Dublin', dist: '4.1 km', verified: true, sessions: 9 },
    { name: 'Cara Donnelly',    role: 'Occupational therapist', clinic: 'Blackrock OT Clinic', dist: '5.0 km', verified: true, sessions: 22 },
    { name: 'Peter Lynch',      role: 'S&C coach',         clinic: 'Powerhouse Performance', dist: '3.8 km', verified: true, sessions: 6 },
    { name: 'Hannah Walsh',     role: 'Pilates instructor', clinic: 'Core & More Rathmines', dist: '1.9 km', verified: false, sessions: 3 },
    { name: 'Dr. Mark Ó Súilleabháin', role: 'Sports physician', clinic: 'Santry Sports Medicine', dist: '0.0 km', verified: true, sessions: 31 },
  ];
  const referrals = [
    { to: 'Laura Fitzgerald', patient: 'Aoife O\'Brien', when: '2 days ago', status: 'Accepted' },
    { to: 'Eoin Gallagher', patient: 'James Whelan', when: '5 days ago', status: 'In progress' },
    { to: 'Cara Donnelly', patient: 'Siobhán Doyle', when: '1 week ago', status: 'Accepted' },
    { to: 'Dr. Mark Ó Súilleabháin', patient: 'Daniel Keane', when: '2 weeks ago', status: 'Completed' },
  ];
  const [filter, setFilter] = React.useState('All');
  const filters = ['All', 'Pilates instructors', 'S&C coaches', 'OTs', 'Physicians'];
  const shown = filter === 'All' ? pros :
    filter === 'Pilates instructors' ? pros.filter(p => p.role.includes('Pilates')) :
    filter === 'S&C coaches' ? pros.filter(p => p.role === 'S&C coach') :
    filter === 'OTs' ? pros.filter(p => p.role.includes('Occupational')) :
    pros.filter(p => p.role.includes('physician'));

  return (
    <div style={{ padding: 32, maxWidth: 1040, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 11, color: CB.ink3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.4 }}>Network</div>
          <div style={{ fontSize: 26, fontWeight: 600, color: CB.ink, letterSpacing: -0.5, marginTop: 4 }}>Refer a patient</div>
          <div style={{ fontSize: 13, color: CB.ink3, marginTop: 4 }}>Verified professionals in the Recovera network · Greater Dublin</div>
        </div>
        <button onClick={onOpenReferral} style={{ height: 36, padding: '0 16px', borderRadius: 8, border: 'none',
          background: CB.green, color: '#fff', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>+ New referral</button>
      </div>

      {/* Filter chips */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 18, flexWrap: 'wrap' }}>
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            height: 30, padding: '0 14px', borderRadius: 15,
            border: `1px solid ${filter === f ? CB.ink : CB.line}`,
            background: filter === f ? CB.ink : '#fff',
            color: filter === f ? '#fff' : CB.ink2,
            fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
          }}>{f}</button>
        ))}
      </div>

      {/* Professionals grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 32 }}>
        {shown.map((pro, i) => (
          <div key={i} style={{ border: `1px solid ${CB.line}`, borderRadius: 12, padding: 16, background: '#fff',
            display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 40, height: 40, borderRadius: 20, background: '#F2F2F0', color: CB.ink2,
              fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {pro.name.split(' ').map(s => s[0]).slice(0, 2).join('')}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 13.5, fontWeight: 600, color: CB.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{pro.name}</span>
                {pro.verified && (
                  <svg width="12" height="12" viewBox="0 0 12 12" style={{ flexShrink: 0 }}>
                    <path d="M6 1l1.4 1 1.7-.2.2 1.7L10 5l-1 1.4.2 1.7-1.7.2L6 9l-1.4-1-1.7.2-.2-1.7L2 5l1-1.4-.2-1.7 1.7-.2L6 1z" fill={CB.green}/>
                    <path d="M4 6l1.5 1.5L8 4.5" stroke="#fff" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                  </svg>
                )}
              </div>
              <div style={{ fontSize: 11.5, color: CB.ink3, marginTop: 2 }}>{pro.role} · {pro.clinic}</div>
              <div style={{ fontSize: 10.5, color: CB.ink4, marginTop: 2 }}>{pro.dist} · {pro.sessions} referrals</div>
            </div>
            <button style={{ height: 30, padding: '0 14px', borderRadius: 8, border: `1px solid ${CB.line}`,
              background: '#fff', color: CB.ink2, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0 }}>Refer</button>
          </div>
        ))}
      </div>

      {/* Referrals log */}
      <div style={{ fontSize: 11, color: CB.ink3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.4, marginBottom: 10 }}>Recent referrals</div>
      <div style={{ border: `1px solid ${CB.line}`, borderRadius: 12, background: '#fff', overflow: 'hidden' }}>
        {referrals.map((r, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '14px 18px',
            borderBottom: i < referrals.length - 1 ? `1px solid ${CB.line}` : 'none' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13.5, color: CB.ink, fontWeight: 500 }}>
                {r.patient} <span style={{ color: CB.ink4, fontWeight: 400 }}>→</span> {r.to}
              </div>
              <div style={{ fontSize: 11.5, color: CB.ink3, marginTop: 2 }}>{r.when}</div>
            </div>
            <Tag tone={r.status === 'Completed' ? 'green' : r.status === 'Accepted' ? 'green' : 'gray'}>{r.status}</Tag>
          </div>
        ))}
      </div>
      <div style={{ height: 40 }}/>
    </div>
  );
}

// ---- Reports view --------------------------------------------------------
function ReportsView() {
  const insurerReports = [
    { insurer: 'Irish Life Health', patients: 42, outcome: 'Within protocol', month: 'March 2026', status: 'Generated' },
    { insurer: 'VHI',                patients: 38, outcome: 'Within protocol', month: 'March 2026', status: 'Generated' },
    { insurer: 'Laya Healthcare',    patients: 29, outcome: 'Pending review',  month: 'March 2026', status: 'Draft' },
    { insurer: 'HSA',                patients: 12, outcome: 'Within protocol', month: 'March 2026', status: 'Generated' },
  ];
  return (
    <div style={{ padding: 32, maxWidth: 1040, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, color: CB.ink3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.4 }}>Reports</div>
        <div style={{ fontSize: 26, fontWeight: 600, color: CB.ink, letterSpacing: -0.5, marginTop: 4 }}>March 2026 · Clinic performance</div>
      </div>

      {/* Clinic KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
        <StatCard label="Active patients" value="121" sub="+14 vs Feb" tone="ink"/>
        <StatCard label="Avg recovery" value="14.2" sub="wks · -1.8 vs bench" tone="green"/>
        <StatCard label="Adherence" value="78%" sub="clinic avg" tone="green"/>
        <StatCard label="Revenue" value="€48.4k" sub="+12% MoM" tone="ink"/>
      </div>

      <AnalyticsDetail/>

      {/* Monthly performance */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 16, marginBottom: 24 }}>
        <div style={{ border: `1px solid ${CB.line}`, borderRadius: 14, padding: 22, background: '#fff' }}>
          <div style={{ fontSize: 11, color: CB.ink3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 16 }}>Patient outcomes · 6 months</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, height: 140 }}>
            {[
              { m: 'Oct', r: 18, o: 82 }, { m: 'Nov', r: 22, o: 84 }, { m: 'Dec', r: 19, o: 81 },
              { m: 'Jan', r: 26, o: 88 }, { m: 'Feb', r: 28, o: 91 }, { m: 'Mar', r: 34, o: 93 },
            ].map((b, i, a) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                <div style={{ fontSize: 10, color: CB.ink, fontWeight: 600 }}>{b.o}%</div>
                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
                  <div style={{ width: '70%', height: `${b.o * 0.9}%`, background: i === a.length - 1 ? CB.green : CB.greenSoft, borderRadius: 4 }}/>
                </div>
                <div style={{ fontSize: 10, color: CB.ink3, fontFamily: 'ui-monospace, Menlo, monospace' }}>{b.m}</div>
              </div>
            ))}
          </div>
          <div style={{ fontSize: 12, color: CB.ink3, marginTop: 12 }}>% of patients meeting outcome targets</div>
        </div>

        <div style={{ border: `1px solid ${CB.line}`, borderRadius: 14, padding: 22, background: '#fff' }}>
          <div style={{ fontSize: 11, color: CB.ink3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 16 }}>Condition mix</div>
          {[
            { c: 'ACL / knee', n: 38, pct: 31 },
            { c: 'Shoulder', n: 24, pct: 20 },
            { c: 'Low back', n: 22, pct: 18 },
            { c: 'Achilles / foot', n: 17, pct: 14 },
            { c: 'Hip', n: 12, pct: 10 },
            { c: 'Other', n: 8, pct: 7 },
          ].map((c, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: CB.ink2, marginBottom: 5, fontWeight: 500 }}>
                <span>{c.c}</span>
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>{c.n} · {c.pct}%</span>
              </div>
              <div style={{ height: 4, background: '#F4F4F2', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ width: `${c.pct * 3}%`, height: '100%', background: CB.green, borderRadius: 2 }}/>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Insurer reports */}
      <div style={{ border: `1px solid ${CB.line}`, borderRadius: 14, background: '#fff', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', padding: '18px 22px', borderBottom: `1px solid ${CB.line}` }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: CB.ink }}>Insurer outcome reports</div>
            <div style={{ fontSize: 12, color: CB.ink3, marginTop: 2 }}>Auto-generated monthly · HSE & private</div>
          </div>
          <button style={{ height: 32, padding: '0 14px', borderRadius: 8, border: `1px solid ${CB.line}`,
            background: '#fff', color: CB.ink2, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>Export all</button>
        </div>
        {insurerReports.map((r, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', padding: '16px 22px', gap: 16,
            borderBottom: i < insurerReports.length - 1 ? `1px solid ${CB.line}` : 'none' }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: '#F2F2F0', color: CB.ink2,
              fontSize: 11, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              {r.insurer.split(' ').map(s => s[0]).slice(0, 2).join('')}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 500, color: CB.ink }}>{r.insurer}</div>
              <div style={{ fontSize: 12, color: CB.ink3, marginTop: 2 }}>{r.patients} patients · {r.month}</div>
            </div>
            <Tag tone={r.outcome === 'Within protocol' ? 'green' : 'amber'}>{r.outcome}</Tag>
            <Tag tone={r.status === 'Generated' ? 'gray' : 'amber'}>{r.status}</Tag>
            <button style={{ background: 'transparent', border: 'none', color: CB.green, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>Download</button>
          </div>
        ))}
      </div>
      <div style={{ height: 40 }}/>
    </div>
  );
}

// ---- Main shell ----------------------------------------------------------
const ClinicianDash = React.forwardRef(function ClinicianDash(props, ref) {
  const [view, setView] = React.useState('today'); // today | messages | network | reports
  const [selectedPatient, setSelectedPatient] = React.useState(null);
  const [live, setLive] = React.useState(null); // patient name when live session active
  const [referralOpen, setReferralOpen] = React.useState(false);
  const scrollRef = React.useRef(null);

  const openPatient = (id) => { setView('today'); setSelectedPatient(id); };
  const backToToday = () => setSelectedPatient(null);

  const animateScrollTo = (top, duration) => {
    const el = scrollRef.current;
    if (!el) return;
    const start = el.scrollTop;
    const delta = top - start;
    const t0 = performance.now();
    const step = (now) => {
      const raw = Math.min(1, (now - t0) / duration);
      const eased = 0.5 - Math.cos(raw * Math.PI) / 2;
      el.scrollTop = start + delta * eased;
      if (raw < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  React.useImperativeHandle(ref, () => ({
    reset: () => {
      setView('today');
      setSelectedPatient(null);
      setLive(null);
      setReferralOpen(false);
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    },
    scrollTo: (innerSelector, duration = 800) => {
      const container = scrollRef.current;
      if (!container) return;
      const target = container.querySelector(innerSelector);
      if (!target) return;
      const top = target.offsetTop - 20;
      animateScrollTo(top, duration);
    },
    highlightPatient: (id) => { setSelectedPatient(id); },
    hoverButton: (selector, duration = 600) => {
      const btn = document.querySelector(selector);
      if (!btn) return;
      btn.classList.add('tl-hover');
      setTimeout(() => btn.classList.remove('tl-hover'), duration);
    },
  }), []);

  return (
    <div style={{ display: 'flex', height: '100%', background: '#fff', position: 'relative',
      fontFamily: "'Inter', system-ui, sans-serif", color: CB.ink }}>
      <Sidebar view={view} setView={(v) => { setView(v); setSelectedPatient(null); }}
        selectedPatient={selectedPatient}
        setSelectedPatient={setSelectedPatient}/>
      <div ref={scrollRef} className="clinician-dash" key={view + (selectedPatient || '')} style={{ flex: 1, overflow: 'auto', background: '#FAFAF8', animation: 'fadeIn 0.25s ease' }}>
        {view === 'today' && !selectedPatient && <TodayView onOpenPatient={openPatient} onStartLive={setLive}/>}
        {view === 'today' && selectedPatient && <PreSessionBrief patientId={selectedPatient} onBack={backToToday} onStartLive={setLive}/>}
        {view === 'clinic' && <ClinicOverviewView/>}
        {view === 'messages' && <MessagesView/>}
        {view === 'network' && <NetworkView onOpenReferral={() => setReferralOpen(true)}/>}
        {view === 'reports' && <ReportsView/>}
        {view === 'profile' && <ClinicianProfileView onClose={() => setView('today')}/>}
      </div>
      {live && <LiveSession patientName={live} onExit={() => setLive(null)}/>}
      {referralOpen && <ReferralFlow onClose={() => setReferralOpen(false)}/>}
    </div>
  );
});

Object.assign(window, { ClinicianDash });
