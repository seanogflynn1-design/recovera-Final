// Patient mobile app — Recovera (v2 with tabs)

const BRAND = {
  green: '#1F4D2E',
  greenSoft: '#E8EFEA',
  greenDim: '#4F7A5E',
  ink: '#0D0D0D',
  ink2: '#3A3A3A',
  ink3: '#6B6B6B',
  ink4: '#A3A3A3',
  line: '#EAEAEA',
  bg: '#FAFAF8',
  amber: '#D97706',
  amberBg: '#FEF3E2',
  red: '#B9432C',
  redBg: '#FBEAE6',
  white: '#FFFFFF',
};

// ---- Pose skeleton (animated squat) --------------------------------------
function PoseFigure({ t }) {
  const phase = (Math.sin(t * Math.PI * 2) + 1) / 2;
  const depth = 40 * phase;
  const head = { x: 130, y: 40 };
  const neck = { x: 130, y: 72 };
  const shoulderL = { x: 108, y: 82 };
  const shoulderR = { x: 152, y: 82 };
  const elbowL = { x: 94, y: 120 + depth * 0.2 };
  const elbowR = { x: 166, y: 120 + depth * 0.2 };
  const wristL = { x: 86, y: 158 + depth * 0.3 };
  const wristR = { x: 174, y: 158 + depth * 0.3 };
  const hip = { x: 130, y: 150 + depth * 0.5 };
  const hipL = { x: 116, y: 154 + depth * 0.5 };
  const hipR = { x: 144, y: 154 + depth * 0.5 };
  const valgusDrift = phase * 6;
  const kneeL = { x: 112 + valgusDrift, y: 200 + depth * 0.15 };
  const kneeR = { x: 148, y: 200 + depth * 0.15 };
  const ankleL = { x: 114, y: 250 };
  const ankleR = { x: 146, y: 250 };
  const lines = [
    [head, neck], [neck, shoulderL], [neck, shoulderR],
    [shoulderL, elbowL], [elbowL, wristL],
    [shoulderR, elbowR], [elbowR, wristR],
    [neck, hip], [hip, hipL], [hip, hipR],
    [hipL, kneeL], [kneeL, ankleL],
    [hipR, kneeR], [kneeR, ankleR],
  ];
  const joints = [head, neck, shoulderL, shoulderR, elbowL, elbowR, wristL, wristR, hip, hipL, hipR, kneeL, kneeR, ankleL, ankleR];
  return (
    <svg width="260" height="280" viewBox="0 0 260 280" style={{ display: 'block' }}>
      <defs>
        <pattern id="grid" width="26" height="26" patternUnits="userSpaceOnUse">
          <path d="M 26 0 L 0 0 0 26" fill="none" stroke="rgba(31,77,46,0.06)" strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="260" height="280" fill="url(#grid)"/>
      {lines.map((l, i) => (
        <line key={i} x1={l[0].x} y1={l[0].y} x2={l[1].x} y2={l[1].y}
          stroke={BRAND.green} strokeWidth="1.5" strokeLinecap="round" opacity="0.75"/>
      ))}
      <circle cx={kneeL.x} cy={kneeL.y} r="10" fill="none" stroke={BRAND.amber} strokeWidth="1.2" opacity="0.55">
        <animate attributeName="r" values="8;14;8" dur="1.6s" repeatCount="indefinite"/>
        <animate attributeName="opacity" values="0.55;0.15;0.55" dur="1.6s" repeatCount="indefinite"/>
      </circle>
      {joints.map((j, i) => (
        <g key={i}>
          <circle cx={j.x} cy={j.y} r="4.5" fill={BRAND.white} stroke={BRAND.green} strokeWidth="1.5"/>
          <circle cx={j.x} cy={j.y} r="1.6" fill={BRAND.green}/>
        </g>
      ))}
      <g>
        <line x1={kneeL.x - 12} y1={kneeL.y} x2={20} y2={kneeL.y} stroke={BRAND.amber} strokeWidth="0.8" strokeDasharray="2 2"/>
        <text x="10" y={kneeL.y - 6} fontSize="9" fill={BRAND.amber} fontFamily="ui-monospace, Menlo, monospace" letterSpacing="0.5">L KNEE · VALGUS</text>
      </g>
    </svg>
  );
}

function MetricBar({ label, value, tone, flag }) {
  const colors = {
    green: { fg: BRAND.green, bg: BRAND.greenSoft, text: BRAND.green },
    amber: { fg: BRAND.amber, bg: BRAND.amberBg, text: BRAND.amber },
  }[tone];
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: BRAND.ink2, fontWeight: 500 }}>
          {label}
          {flag && (
            <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 14, height: 14, borderRadius: 3, background: BRAND.red, color: '#fff', fontSize: 9, fontWeight: 700 }}>!</span>
          )}
        </div>
        <div style={{ fontSize: 13, color: colors.text, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{value}%</div>
      </div>
      <div style={{ height: 6, background: colors.bg, borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ width: `${value}%`, height: '100%', background: colors.fg, borderRadius: 3, transition: 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)' }}/>
      </div>
    </div>
  );
}

// ---- PATIENT: HOME -------------------------------------------------------
function PatientHome({ onStart, onMessages, streak = 12, checkInLogged = false, onCheckIn }) {
  const [painValue, setPainValue] = React.useState(3);
  const [painSubmittedLocal, setPainSubmittedLocal] = React.useState(false);
  const painSubmitted = checkInLogged || painSubmittedLocal;
  const painColor = painValue <= 3 ? BRAND.green : painValue <= 6 ? BRAND.amber : BRAND.red;

  return (
    <div style={{ padding: '0 20px', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ marginTop: 8, marginBottom: 24 }}>
        <div style={{ fontSize: 13, color: BRAND.ink3, letterSpacing: 0.2, marginBottom: 6 }}>Tuesday · April 14</div>
        <div style={{ fontSize: 28, fontWeight: 600, color: BRAND.ink, letterSpacing: -0.6, lineHeight: 1.1 }}>
          Good morning,<br/>Conor.
        </div>
      </div>

      {/* Today's session */}
      <div style={{ background: BRAND.ink, color: BRAND.white, borderRadius: 20, padding: '22px 20px 20px' }}>
        <div style={{ fontSize: 11, letterSpacing: 1.4, textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', fontWeight: 500, marginBottom: 10 }}>Today's session</div>
        <div style={{ fontSize: 22, fontWeight: 600, letterSpacing: -0.4, marginBottom: 4 }}>ACL Recovery</div>
        <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', marginBottom: 18 }}>Session 4 of 8 · 12 min</div>
        <div style={{ display: 'flex', gap: 4, marginBottom: 22 }}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} style={{ flex: 1, height: 3, borderRadius: 2,
              background: i < 3 ? BRAND.green : (i === 3 ? 'rgba(31,77,46,0.55)' : 'rgba(255,255,255,0.12)') }}/>
          ))}
        </div>
        <button onClick={onStart} className="start-session-btn" style={{ width: '100%', height: 52, borderRadius: 14, border: 'none',
          background: BRAND.green, color: BRAND.white, fontSize: 16, fontWeight: 600, letterSpacing: -0.2, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontFamily: 'inherit' }}>
          Start session
          <svg width="16" height="16" viewBox="0 0 16 16"><path d="M4 8h8M9 4l4 4-4 4" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </button>
      </div>

      {/* Pain check-in */}
      <div style={{ marginTop: 22, border: `1px solid ${BRAND.line}`, borderRadius: 16, padding: 18, background: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
          <div style={{ fontSize: 11, letterSpacing: 1.4, textTransform: 'uppercase', color: BRAND.ink3, fontWeight: 500 }}>Daily check-in</div>
          <div style={{ fontSize: 11, color: BRAND.ink4 }}>30 sec</div>
        </div>
        {!painSubmitted ? (
          <>
            <div style={{ fontSize: 15, fontWeight: 500, color: BRAND.ink, marginTop: 8, marginBottom: 14, letterSpacing: -0.2 }}>
              How's your knee today?
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 8 }}>
              <span style={{ fontSize: 34, fontWeight: 600, color: painColor, letterSpacing: -1, fontVariantNumeric: 'tabular-nums' }}>{painValue}</span>
              <span style={{ fontSize: 13, color: BRAND.ink3 }}>/ 10 pain</span>
            </div>
            <input type="range" min="0" max="10" value={painValue} onChange={e => setPainValue(+e.target.value)}
              style={{ width: '100%', accentColor: painColor, height: 4 }}/>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: BRAND.ink4, marginTop: 4, fontFamily: 'ui-monospace, Menlo, monospace' }}>
              <span>None</span><span>Severe</span>
            </div>
            <button onClick={() => { setPainSubmittedLocal(true); if (onCheckIn) onCheckIn(); }} className="log-checkin-btn" style={{
              width: '100%', height: 42, borderRadius: 10, marginTop: 14, fontFamily: 'inherit',
              background: BRAND.ink, color: '#fff', fontSize: 13, fontWeight: 500, border: 'none', cursor: 'pointer' }}>
              Log check-in
            </button>
          </>
        ) : (
          <div style={{ padding: '14px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: 14, background: BRAND.greenSoft, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 7l3 3 5-6" stroke={BRAND.green} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, color: BRAND.ink, fontWeight: 500 }}>Logged · {painValue}/10</div>
              <div style={{ fontSize: 12, color: BRAND.ink3 }}>Shared with Dr. Kelleher</div>
            </div>
          </div>
        )}
      </div>

      {/* This week */}
      <div style={{ marginTop: 22, marginBottom: 10, fontSize: 11, letterSpacing: 1.4, textTransform: 'uppercase', color: BRAND.ink3, fontWeight: 500 }}>This week</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div style={{ border: `1px solid ${BRAND.line}`, borderRadius: 14, padding: 14, background: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
            <span className="streak-number" style={{ fontSize: 28, fontWeight: 600, color: BRAND.ink, letterSpacing: -0.8, fontVariantNumeric: 'tabular-nums' }}>{streak}</span>
            <span style={{ fontSize: 13, color: BRAND.ink3 }}>day streak</span>
          </div>
          <div style={{ display: 'flex', gap: 3, marginTop: 8 }}>
            {['M','T','W','T','F','S','S'].map((d, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{ height: 20, borderRadius: 4, marginBottom: 4,
                  background: i <= 1 ? BRAND.green : (i === 2 ? BRAND.greenSoft : '#F4F4F4') }}/>
                <div style={{ fontSize: 9, color: BRAND.ink4, fontWeight: 500 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ border: `1px solid ${BRAND.line}`, borderRadius: 14, padding: 14, background: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
            <span style={{ fontSize: 28, fontWeight: 600, color: BRAND.ink, letterSpacing: -0.8 }}>3</span>
            <span style={{ fontSize: 13, color: BRAND.ink3 }}>/ 5 sessions</span>
          </div>
          <div style={{ fontSize: 12, color: BRAND.ink3, marginTop: 8 }}>Next rest day Sunday</div>
        </div>
      </div>

      {/* Upcoming appointment */}
      <div style={{ marginTop: 22, marginBottom: 10, fontSize: 11, letterSpacing: 1.4, textTransform: 'uppercase', color: BRAND.ink3, fontWeight: 500 }}>Next appointment</div>
      <div style={{ border: `1px solid ${BRAND.line}`, borderRadius: 14, padding: 16, display: 'flex', alignItems: 'center', gap: 12, background: '#fff' }}>
        <div style={{ width: 48, height: 48, borderRadius: 10, background: BRAND.greenSoft, color: BRAND.green,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: 1 }}>APR</div>
          <div style={{ fontSize: 17, fontWeight: 600, lineHeight: 1, marginTop: 1 }}>18</div>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 500, color: BRAND.ink }}>In-clinic check-up</div>
          <div style={{ fontSize: 12, color: BRAND.ink3, marginTop: 2 }}>Dr. Sarah Kelleher · 14:30</div>
        </div>
        <button onClick={onMessages} style={{ background: 'transparent', border: 'none', color: BRAND.green, fontSize: 12, fontWeight: 500, cursor: 'pointer' }}>Message →</button>
      </div>

      <div style={{ height: 100 }}/>
    </div>
  );
}

// ---- PATIENT: SESSION ----------------------------------------------------
function PatientSession({ onFinish }) {
  const [poseT, setPoseT] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [leftKnee, setLeftKnee] = React.useState(0);
  const [hipSym, setHipSym] = React.useState(0);
  const [formQ, setFormQ] = React.useState(0);
  const [reps, setReps] = React.useState(0);
  React.useEffect(() => {
    let raf; const start = performance.now();
    const tick = (now) => { setPoseT(((now - start) / 2800) % 1); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  React.useEffect(() => {
    const startTime = performance.now(); const DUR = 2200; let raf;
    const ease = (x) => 1 - Math.pow(1 - x, 3);
    const tick = (now) => {
      const p = Math.min(1, (now - startTime) / DUR); const e = ease(p);
      setScore(Math.round(84 * e)); setLeftKnee(Math.round(78 * e));
      setHipSym(Math.round(42 * e)); setFormQ(Math.round(71 * e));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  React.useEffect(() => { const id = setInterval(() => setReps(r => Math.min(12, r + 1)), 1400); return () => clearInterval(id); }, []);

  return (
    <div style={{ padding: '0 20px', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: 4, background: BRAND.red, animation: 'pulse 1.4s ease-in-out infinite' }}/>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: 1.2, color: BRAND.ink2, textTransform: 'uppercase' }}>Recording</span>
        </div>
        <div style={{ fontSize: 13, color: BRAND.ink3, fontVariantNumeric: 'tabular-nums' }}>00:0{Math.min(9, Math.floor(poseT * 9))} / 12:00</div>
      </div>

      <div style={{ background: '#fff', border: `1px solid ${BRAND.line}`, borderRadius: 18, padding: 18 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 1.2, textTransform: 'uppercase', color: BRAND.ink3, fontWeight: 500 }}>Exercise 2 of 4</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: BRAND.ink, letterSpacing: -0.3, marginTop: 2 }}>Bodyweight squat</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 11, letterSpacing: 1.2, textTransform: 'uppercase', color: BRAND.ink3, fontWeight: 500 }}>Reps</div>
            <div style={{ fontSize: 18, fontWeight: 600, color: BRAND.ink, fontVariantNumeric: 'tabular-nums', marginTop: 2 }}>{reps} / 12</div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '8px 0 4px' }}><PoseFigure t={poseT}/></div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderRadius: 12, background: BRAND.greenSoft, marginTop: 4 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: 1.2, textTransform: 'uppercase', color: BRAND.green, fontWeight: 600, opacity: 0.8 }}>Live form score</div>
            <div style={{ fontSize: 12, color: BRAND.greenDim, marginTop: 2 }}>Target · 80+</div>
          </div>
          <div style={{ fontSize: 36, fontWeight: 600, color: BRAND.green, fontVariantNumeric: 'tabular-nums', letterSpacing: -1 }}>{score}</div>
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <MetricBar label="Left knee alignment" value={leftKnee} tone="green"/>
        <MetricBar label="Hip symmetry" value={hipSym} tone="amber" flag/>
        <MetricBar label="Form quality" value={formQ} tone="green"/>
      </div>

      <button onClick={onFinish} style={{ width: '100%', height: 48, borderRadius: 12, marginTop: 8,
        background: '#fff', color: BRAND.ink, fontSize: 15, fontWeight: 500,
        border: `1px solid ${BRAND.line}`, cursor: 'pointer', fontFamily: 'inherit' }}>
        End session
      </button>
      <div style={{ height: 100 }}/>
    </div>
  );
}

// ---- PATIENT: DONE -------------------------------------------------------
function PatientDone({ onRestart }) {
  return (
    <div style={{ padding: '0 24px', fontFamily: "'Inter', system-ui, sans-serif",
      display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', paddingTop: 40 }}>
      <div style={{ width: 72, height: 72, borderRadius: 36, background: BRAND.greenSoft,
        display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'scaleIn 0.5s cubic-bezier(0.22, 1, 0.36, 1)' }}>
        <svg width="32" height="32" viewBox="0 0 32 32">
          <path d="M8 16l6 6 12-12" stroke={BRAND.green} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round"
            style={{ strokeDasharray: 40, strokeDashoffset: 40, animation: 'dash 0.7s 0.2s forwards ease-out' }}/>
        </svg>
      </div>
      <div style={{ fontSize: 22, fontWeight: 600, color: BRAND.ink, letterSpacing: -0.4, marginTop: 22 }}>Session complete</div>
      <div style={{ fontSize: 14, color: BRAND.ink3, marginTop: 8, maxWidth: 280, lineHeight: 1.45 }}>
        Report sent to your physio. Dr. Kelleher will review before your next session.
      </div>
      <div style={{ width: '100%', marginTop: 28, padding: 18, borderRadius: 16, border: `1px solid ${BRAND.line}`, textAlign: 'left', background: '#fff' }}>
        <div style={{ fontSize: 11, letterSpacing: 1.2, textTransform: 'uppercase', color: BRAND.ink3, fontWeight: 500, marginBottom: 10 }}>Today's summary</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
          <div><div style={{ fontSize: 22, fontWeight: 600, color: BRAND.ink, letterSpacing: -0.5 }}>84</div><div style={{ fontSize: 12, color: BRAND.ink3 }}>Form score</div></div>
          <div><div style={{ fontSize: 22, fontWeight: 600, color: BRAND.ink, letterSpacing: -0.5 }}>48</div><div style={{ fontSize: 12, color: BRAND.ink3 }}>Total reps</div></div>
          <div><div style={{ fontSize: 22, fontWeight: 600, color: BRAND.ink, letterSpacing: -0.5 }}>12:14</div><div style={{ fontSize: 12, color: BRAND.ink3 }}>Duration</div></div>
          <div><div style={{ fontSize: 22, fontWeight: 600, color: BRAND.ink, letterSpacing: -0.5 }}>4 / 8</div><div style={{ fontSize: 12, color: BRAND.ink3 }}>Sessions</div></div>
        </div>
      </div>
      <button onClick={onRestart} style={{ width: '100%', height: 50, borderRadius: 13, marginTop: 20,
        background: BRAND.ink, color: BRAND.white, fontSize: 15, fontWeight: 500, border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Done</button>
      <div style={{ height: 100 }}/>
    </div>
  );
}

// ---- PATIENT: MESSAGES ---------------------------------------------------
function PatientMessages() {
  const messages = [
    { from: 'them', text: "Hi Conor — I saw the hip symmetry flag from yesterday. Not worried, but let's add hip activation before tomorrow's session.", time: '09:14' },
    { from: 'them', text: "I've updated your protocol — you'll see it in the app.", time: '09:14' },
    { from: 'me', text: "Thanks Sarah. Hip felt a bit off in the warm-up yesterday.", time: '09:42' },
    { from: 'me', text: "I'll get the activation done tonight.", time: '09:42' },
    { from: 'them', text: "Perfect. Good form on the squats btw — left knee tracking has improved vs last week 👍", time: '10:01' },
  ];
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* thread header */}
      <div style={{ padding: '4px 20px 14px', borderBottom: `1px solid ${BRAND.line}`, display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: 20, background: BRAND.greenSoft, color: BRAND.green, fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>SK</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 600, color: BRAND.ink, letterSpacing: -0.2 }}>Dr. Sarah Kelleher</div>
          <div style={{ fontSize: 12, color: BRAND.green, display: 'flex', alignItems: 'center', gap: 5 }}>
            <span style={{ width: 6, height: 6, borderRadius: 3, background: BRAND.green }}/> Online now
          </div>
        </div>
      </div>

      {/* messages */}
      <div style={{ flex: 1, overflow: 'auto', padding: '18px 16px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ textAlign: 'center', fontSize: 11, color: BRAND.ink4, margin: '4px 0 12px', letterSpacing: 0.3 }}>Today · 9:14</div>

        {/* flag reference card */}
        <div style={{ alignSelf: 'flex-start', maxWidth: '85%', padding: 12, borderRadius: 12,
          border: `1px solid ${BRAND.amberBg}`, background: BRAND.amberBg, marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <span style={{ width: 14, height: 14, borderRadius: 3, background: BRAND.amber, color: '#fff', fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>!</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: BRAND.amber, letterSpacing: 1, textTransform: 'uppercase' }}>Flag acknowledged</span>
          </div>
          <div style={{ fontSize: 13, color: BRAND.ink2 }}>Hip symmetry · Session 3 · 42%</div>
        </div>

        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', justifyContent: m.from === 'me' ? 'flex-end' : 'flex-start', marginBottom: 2 }}>
            <div style={{
              maxWidth: '78%', padding: '10px 14px', borderRadius: 18,
              background: m.from === 'me' ? BRAND.green : '#F0F0EE',
              color: m.from === 'me' ? '#fff' : BRAND.ink,
              fontSize: 14, lineHeight: 1.4, letterSpacing: -0.1,
              borderBottomRightRadius: m.from === 'me' ? 6 : 18,
              borderBottomLeftRadius: m.from === 'me' ? 18 : 6,
            }}>{m.text}</div>
          </div>
        ))}
        <div style={{ fontSize: 10, color: BRAND.ink4, alignSelf: 'flex-end', marginTop: 2, marginRight: 8 }}>Delivered</div>
      </div>

      {/* input */}
      <div style={{ padding: '10px 16px 16px', borderTop: `1px solid ${BRAND.line}`, background: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#F4F4F2', borderRadius: 22, padding: '8px 14px' }}>
          <input placeholder="Message Dr. Kelleher" style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: 14, fontFamily: 'inherit', color: BRAND.ink }}/>
          <button style={{ width: 30, height: 30, borderRadius: 15, background: BRAND.green, border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M7 11V3M3 7l4-4 4 4" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ---- PATIENT: PROGRESS ---------------------------------------------------
function RecoveraScore({ target = 74 }) {
  const [v, setV] = React.useState(0);
  React.useEffect(() => {
    const start = performance.now(); const DUR = 1800; let raf;
    const ease = (x) => 1 - Math.pow(1 - x, 3);
    const tick = (now) => { const p = Math.min(1, (now - start) / DUR); setV(Math.round(target * ease(p))); if (p < 1) raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  const R = 70, C = 2 * Math.PI * R;
  return (
    <svg width="180" height="180" viewBox="0 0 180 180">
      <circle cx="90" cy="90" r={R} stroke={BRAND.greenSoft} strokeWidth="12" fill="none"/>
      <circle cx="90" cy="90" r={R} stroke={BRAND.green} strokeWidth="12" fill="none"
        strokeLinecap="round" strokeDasharray={C} strokeDashoffset={C - (v / 100) * C}
        transform="rotate(-90 90 90)" style={{ transition: 'stroke-dashoffset 0.1s linear' }}/>
      <text x="90" y="94" textAnchor="middle" dominantBaseline="middle" fontSize="42" fontWeight="600" fill={BRAND.ink} style={{ fontVariantNumeric: 'tabular-nums', letterSpacing: -1.2 }}>{v}</text>
      <text x="90" y="118" textAnchor="middle" fontSize="10" fill={BRAND.ink3} letterSpacing="1.4" fontWeight="500">RECOVERA SCORE</text>
    </svg>
  );
}
function PatientProgress() {
  const weeks = [
    { w: 'W5', score: 48 }, { w: 'W6', score: 58 }, { w: 'W7', score: 67 }, { w: 'W8', score: 74 },
  ];
  return (
    <div style={{ padding: '0 20px', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ marginTop: 4, marginBottom: 18 }}>
        <div style={{ fontSize: 13, color: BRAND.ink3, letterSpacing: 0.2, marginBottom: 6 }}>Progress</div>
        <div style={{ fontSize: 26, fontWeight: 600, color: BRAND.ink, letterSpacing: -0.6 }}>Week 8 of 16</div>
      </div>

      {/* score ring */}
      <div style={{ border: `1px solid ${BRAND.line}`, borderRadius: 18, padding: '18px 18px 22px', background: '#fff',
        display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <RecoveraScore target={74}/>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: -4 }}>
          <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 7l3-4 3 4" stroke={BRAND.green} strokeWidth="1.6" fill="none" strokeLinecap="round"/></svg>
          <span style={{ fontSize: 12, color: BRAND.green, fontWeight: 500 }}>+7 this week · on track</span>
        </div>
      </div>

      {/* 4-week trend */}
      <div style={{ border: `1px solid ${BRAND.line}`, borderRadius: 18, padding: 18, marginTop: 14, background: '#fff' }}>
        <div style={{ fontSize: 11, letterSpacing: 1.4, textTransform: 'uppercase', color: BRAND.ink3, fontWeight: 500, marginBottom: 14 }}>Movement · past 4 weeks</div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 16, height: 120 }}>
          {weeks.map((w, i) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ fontSize: 11, color: BRAND.ink, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{w.score}</div>
              <div style={{ width: '100%', height: `${w.score}%`, background: i === weeks.length - 1 ? BRAND.green : BRAND.greenSoft, borderRadius: 6, transition: 'height 1s ease' }}/>
              <div style={{ fontSize: 10, color: BRAND.ink3, fontFamily: 'ui-monospace, Menlo, monospace' }}>{w.w}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Milestones */}
      <div style={{ border: `1px solid ${BRAND.line}`, borderRadius: 18, padding: 18, marginTop: 14, background: '#fff' }}>
        <div style={{ fontSize: 11, letterSpacing: 1.4, textTransform: 'uppercase', color: BRAND.ink3, fontWeight: 500, marginBottom: 14 }}>Milestones</div>
        {[
          { done: true, t: 'Full knee extension', d: 'Week 2' },
          { done: true, t: 'Pain under 4 on scale', d: 'Week 6' },
          { done: true, t: 'Single-leg balance · 30s', d: 'Week 7' },
          { done: false, t: 'Return to jogging', d: 'Week 12 · target', active: true },
          { done: false, t: 'Return to sport', d: 'Week 16 · target' },
        ].map((m, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0',
            borderBottom: i < 4 ? `1px solid ${BRAND.line}` : 'none' }}>
            <div style={{ width: 22, height: 22, borderRadius: 11, flexShrink: 0,
              background: m.done ? BRAND.green : (m.active ? BRAND.greenSoft : '#F4F4F4'),
              border: m.active ? `2px dashed ${BRAND.green}` : 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {m.done && <svg width="11" height="11" viewBox="0 0 11 11"><path d="M2 5.5l2.5 2.5L9 3" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round"/></svg>}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, color: m.done ? BRAND.ink3 : BRAND.ink, fontWeight: 500, textDecoration: m.done ? 'line-through' : 'none' }}>{m.t}</div>
              <div style={{ fontSize: 11, color: BRAND.ink4, marginTop: 2 }}>{m.d}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ height: 100 }}/>
    </div>
  );
}

// ---- PATIENT: PROFILE ----------------------------------------------------
function PatientProfile() {
  return (
    <div style={{ padding: '0 20px', fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '16px 0 20px' }}>
        <div style={{ width: 72, height: 72, borderRadius: 36, background: BRAND.green, color: '#fff',
          fontSize: 24, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', letterSpacing: -0.5 }}>CM</div>
        <div style={{ fontSize: 20, fontWeight: 600, color: BRAND.ink, letterSpacing: -0.3, marginTop: 14 }}>Conor Murphy</div>
        <div style={{ fontSize: 13, color: BRAND.ink3, marginTop: 2 }}>Dublin · Age 28</div>
      </div>

      {[
        { h: 'Condition', rows: [
          ['Diagnosis', 'ACL reconstruction · Right'],
          ['Procedure date', '18 Feb 2026'],
          ['Recovery week', 'Week 8 of 16'],
          ['Target return', '10 Jun 2026'],
        ]},
        { h: 'Care team', rows: [
          ['Physio', 'Dr. Sarah Kelleher'],
          ['Clinic', 'Santry Sports Medicine'],
          ['Surgeon', 'Mr. Ronan Cusack'],
        ]},
        { h: 'Insurance', rows: [
          ['Provider', 'Irish Life Health'],
          ['Plan', 'Benefit Plus'],
          ['Member #', 'IL-7142-8831'],
          ['Sessions covered', '24 of 30 used'],
        ]},
      ].map((s, i) => (
        <div key={i} style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 11, letterSpacing: 1.4, textTransform: 'uppercase', color: BRAND.ink3, fontWeight: 500, marginBottom: 8, paddingLeft: 4 }}>{s.h}</div>
          <div style={{ border: `1px solid ${BRAND.line}`, borderRadius: 14, background: '#fff', overflow: 'hidden' }}>
            {s.rows.map((r, j) => (
              <div key={j} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '13px 16px', borderBottom: j < s.rows.length - 1 ? `1px solid ${BRAND.line}` : 'none', fontSize: 14 }}>
                <span style={{ color: BRAND.ink3 }}>{r[0]}</span>
                <span style={{ color: BRAND.ink, fontWeight: 500 }}>{r[1]}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div style={{ height: 100 }}/>
    </div>
  );
}

// ---- Tab bar -------------------------------------------------------------
function TabBar({ tab, setTab }) {
  const tabs = [
    { k: 'home', l: 'Home', icon: (c) => <svg width="20" height="20" viewBox="0 0 20 20"><path d="M3 9l7-6 7 6v8a1 1 0 01-1 1h-4v-5H8v5H4a1 1 0 01-1-1V9z" stroke={c} strokeWidth="1.6" fill="none" strokeLinejoin="round"/></svg> },
    { k: 'progress', l: 'Progress', icon: (c) => <svg width="20" height="20" viewBox="0 0 20 20"><path d="M3 15l4-5 4 3 6-8" stroke={c} strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/><circle cx="17" cy="5" r="1.5" fill={c}/></svg> },
    { k: 'messages', l: 'Messages', icon: (c) => <svg width="20" height="20" viewBox="0 0 20 20"><path d="M3 5a2 2 0 012-2h10a2 2 0 012 2v7a2 2 0 01-2 2H8l-3 3v-3a2 2 0 01-2-2V5z" stroke={c} strokeWidth="1.6" fill="none" strokeLinejoin="round"/></svg> },
    { k: 'profile', l: 'Profile', icon: (c) => <svg width="20" height="20" viewBox="0 0 20 20"><circle cx="10" cy="7" r="3" stroke={c} strokeWidth="1.6" fill="none"/><path d="M4 17c1-3 4-4 6-4s5 1 6 4" stroke={c} strokeWidth="1.6" fill="none" strokeLinecap="round"/></svg> },
  ];
  return (
    <div style={{ borderTop: `1px solid ${BRAND.line}`, background: 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      padding: '8px 12px 0', display: 'flex', justifyContent: 'space-around' }}>
      {tabs.map(t => {
        const active = tab === t.k;
        const c = active ? BRAND.green : BRAND.ink4;
        return (
          <button key={t.k} onClick={() => setTab(t.k)} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            background: 'transparent', border: 'none', padding: '4px 10px', cursor: 'pointer',
            fontFamily: 'inherit',
          }}>
            {t.icon(c)}
            <span style={{ fontSize: 10, color: c, fontWeight: 500, letterSpacing: 0.2 }}>{t.l}</span>
          </button>
        );
      })}
    </div>
  );
}

function PatientHeader({ title }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 20px', height: 46, fontFamily: "'Inter', system-ui, sans-serif" }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <div style={{ width: 22, height: 22, borderRadius: 6, background: BRAND.green,
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 10, height: 10, borderRadius: 5, border: '1.8px solid #fff', borderBottomColor: 'transparent', transform: 'rotate(-45deg)' }}/>
        </div>
        <div style={{ fontSize: 16, fontWeight: 600, color: BRAND.ink, letterSpacing: -0.4 }}>recovera</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 13, color: BRAND.ink3 }}>Conor Murphy</span>
        <div style={{ width: 28, height: 28, borderRadius: 14, background: BRAND.greenSoft, color: BRAND.green, fontSize: 11, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>CM</div>
      </div>
    </div>
  );
}

const PatientApp = React.forwardRef(function PatientApp({ mode = 'app', onExitMode }, ref) {
  const [tab, setTab] = React.useState('home');
  const [homeSub, setHomeSub] = React.useState('home'); // home | session | done
  const [streak, setStreak] = React.useState(12);
  const [checkInLogged, setCheckInLogged] = React.useState(false);

  const onStart = () => setHomeSub('session');
  const onFinish = () => setHomeSub('done');
  const onRestart = () => setHomeSub('home');

  React.useImperativeHandle(ref, () => ({
    reset: () => {
      setTab('home');
      setHomeSub('home');
      setStreak(12);
      setCheckInLogged(false);
    },
    startSession: () => { setTab('home'); setHomeSub('session'); },
    completeSession: () => { setTab('home'); setHomeSub('done'); },
    logCheckIn: () => setCheckInLogged(true),
    advanceStreak: (from, to) => setStreak(to),
    advance: (state = {}) => {
      if (state.inSession) { setTab('home'); setHomeSub('session'); }
      if (state.sessionComplete) { setTab('home'); setHomeSub('done'); }
      if (state.checkInLogged !== undefined) setCheckInLogged(!!state.checkInLogged);
      if (state.streak !== undefined) setStreak(state.streak);
    },
  }), []);

  if (mode === 'onboarding') {
    return (
      <div style={{ height: '100%', background: '#fff', position: 'relative' }}>
        <Day1Flow onFinish={onExitMode}/>
      </div>
    );
  }
  if (mode === 'compare') {
    return (
      <div style={{ height: '100%', background: '#fff', position: 'relative' }}>
        <ComparisonView onClose={onExitMode}/>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', background: BRAND.bg, display: 'flex', flexDirection: 'column' }}>
      <div style={{ paddingTop: 54 }}/>
      <PatientHeader/>
      <div key={tab + homeSub} style={{ flex: 1, overflow: 'auto', animation: 'fadeIn 0.3s ease' }}>
        {tab === 'home' && homeSub === 'home' && <PatientHome onStart={onStart} onMessages={() => setTab('messages')} streak={streak} checkInLogged={checkInLogged} onCheckIn={() => setCheckInLogged(true)}/>}
        {tab === 'home' && homeSub === 'session' && <PatientSession onFinish={onFinish}/>}
        {tab === 'home' && homeSub === 'done' && <PatientDone onRestart={onRestart}/>}
        {tab === 'progress' && <PatientProgress/>}
        {tab === 'messages' && <PatientMessages/>}
        {tab === 'profile' && <PatientProfile/>}
      </div>
      <TabBar tab={tab} setTab={(k) => { setTab(k); if (k === 'home') setHomeSub('home'); }}/>
      <div style={{ height: 22 }}/> {/* home indicator space */}
    </div>
  );
});

Object.assign(window, { PatientApp, PATIENT_BRAND: BRAND });
