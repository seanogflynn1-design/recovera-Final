// Recovera — Pitch-polish layer
// Day-1 onboarding, Before/With comparison, Live session, Referral flow,
// plus Patient outcome card + Clinic analytics card atoms.

const CB3 = window.PATIENT_BRAND;

// ========================================================================
// 1. ONBOARDING — Day 1 empty state + 3-step add-patient flow
// ========================================================================
function OnboardingView({ onExit }) {
  const [step, setStep] = React.useState(0); // 0 empty, 1 form, 2 invite sending, 3 appears
  const [email, setEmail] = React.useState('');
  const [name, setName] = React.useState('');

  React.useEffect(() => {
    if (step === 2) {
      const t = setTimeout(() => setStep(3), 1800);
      return () => clearTimeout(t);
    }
  }, [step]);

  return (
    <div style={{ padding: 40, maxWidth: 880, margin: '0 auto', height: '100%', overflow: 'auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 4, background: CB3.amberBg, color: CB3.amber, fontSize: 10, fontWeight: 600, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 12 }}>
            <span style={{ width: 6, height: 6, borderRadius: 3, background: CB3.amber, animation: 'pulse 1.6s ease-in-out infinite' }}/>
            Demo · Day 1
          </div>
          <div style={{ fontSize: 28, fontWeight: 600, color: CB3.ink, letterSpacing: -0.6 }}>Welcome to Recovera</div>
          <div style={{ fontSize: 14, color: CB3.ink3, marginTop: 6 }}>Your clinic is set up. Now invite your first patient.</div>
        </div>
        <button onClick={onExit} style={{ height: 32, padding: '0 14px', borderRadius: 8, border: `1px solid ${CB3.line}`, background: '#fff', color: CB3.ink3, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>Exit demo</button>
      </div>

      {/* Progress */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 28 }}>
        {['Add details', 'Send invite', 'Appear on board'].map((s, i) => (
          <div key={i} style={{ flex: 1 }}>
            <div style={{ height: 3, borderRadius: 2, background: i <= step - 1 ? CB3.green : '#EEE', marginBottom: 8, transition: 'background 0.3s' }}/>
            <div style={{ fontSize: 11, color: i <= step - 1 ? CB3.green : CB3.ink3, fontWeight: 500, letterSpacing: 0.4 }}>
              {String(i + 1).padStart(2, '0')} · {s}
            </div>
          </div>
        ))}
      </div>

      {/* Step content */}
      {step === 0 && (
        <div style={{
          border: `2px dashed ${CB3.line}`, borderRadius: 16, padding: 56,
          textAlign: 'center', background: '#fff',
          animation: 'fadeIn 0.3s ease',
        }}>
          <div style={{ width: 56, height: 56, borderRadius: 28, background: CB3.greenSoft, color: CB3.green,
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
            <svg width="26" height="26" viewBox="0 0 26 26"><circle cx="13" cy="9" r="4" stroke="currentColor" strokeWidth="1.6" fill="none"/><path d="M5 22c1-4 5-6 8-6s7 2 8 6" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round"/><path d="M20 3v6M17 6h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
          </div>
          <div style={{ fontSize: 20, fontWeight: 600, color: CB3.ink, letterSpacing: -0.3 }}>No patients yet</div>
          <div style={{ fontSize: 14, color: CB3.ink3, marginTop: 8, maxWidth: 380, margin: '8px auto 24px' }}>
            Once you invite a patient, they'll appear here. Session data, flags, and outcomes populate automatically.
          </div>
          <button onClick={() => setStep(1)} style={{
            height: 44, padding: '0 22px', borderRadius: 10, border: 'none',
            background: CB3.green, color: '#fff', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
          }}>Invite your first patient</button>
        </div>
      )}

      {step === 1 && (
        <div style={{ border: `1px solid ${CB3.line}`, borderRadius: 16, padding: 32, background: '#fff', animation: 'fadeIn 0.3s ease' }}>
          <div style={{ fontSize: 11, color: CB3.ink3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.4, marginBottom: 10 }}>New patient</div>
          <div style={{ fontSize: 20, fontWeight: 600, color: CB3.ink, letterSpacing: -0.3, marginBottom: 24 }}>Basic details</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
            <OnbField label="Full name" value={name} onChange={setName} placeholder="e.g. Conor Murphy"/>
            <OnbField label="Email" value={email} onChange={setEmail} placeholder="conor@example.com"/>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 20 }}>
            <OnbField label="Condition" value="ACL reconstruction" readOnly select/>
            <OnbField label="Protocol" value="ACL · 16-week return-to-sport" readOnly select/>
          </div>
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button onClick={() => setStep(0)} style={{ height: 36, padding: '0 16px', borderRadius: 8, border: `1px solid ${CB3.line}`, background: '#fff', color: CB3.ink2, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>Back</button>
            <button onClick={() => setStep(2)} disabled={!name || !email} style={{
              height: 36, padding: '0 18px', borderRadius: 8, border: 'none',
              background: (!name || !email) ? '#CCC' : CB3.green, color: '#fff',
              fontSize: 12, fontWeight: 500, cursor: (!name || !email) ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
            }}>Send invite →</button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div style={{ border: `1px solid ${CB3.line}`, borderRadius: 16, padding: 48, background: '#fff', textAlign: 'center', animation: 'fadeIn 0.3s ease' }}>
          <div style={{ width: 56, height: 56, margin: '0 auto 18px', position: 'relative' }}>
            <svg width="56" height="56" viewBox="0 0 56 56" style={{ animation: 'spin 1.6s linear infinite' }}>
              <circle cx="28" cy="28" r="22" stroke={CB3.greenSoft} strokeWidth="3" fill="none"/>
              <circle cx="28" cy="28" r="22" stroke={CB3.green} strokeWidth="3" fill="none"
                strokeLinecap="round" strokeDasharray="30 200"/>
            </svg>
          </div>
          <div style={{ fontSize: 18, fontWeight: 600, color: CB3.ink, letterSpacing: -0.3 }}>Sending invite to {name || 'your patient'}…</div>
          <div style={{ fontSize: 13, color: CB3.ink3, marginTop: 6 }}>SMS + email link · downloads the Recovera app</div>
        </div>
      )}

      {step === 3 && (
        <div style={{ animation: 'fadeIn 0.3s ease' }}>
          <div style={{ border: `1.5px solid ${CB3.green}`, borderRadius: 16, padding: 28, background: '#FBFCFB', marginBottom: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 18, background: CB3.green, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 16 16"><path d="M3 8l3 3 7-7" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 600, color: CB3.ink, letterSpacing: -0.2 }}>Invite accepted</div>
                <div style={{ fontSize: 12, color: CB3.ink3, marginTop: 2 }}>{name || 'Conor Murphy'} · Recovera app installed · baseline captured</div>
              </div>
              <span style={{ fontSize: 11, color: CB3.green, fontWeight: 500, fontFamily: 'ui-monospace, Menlo, monospace' }}>2m 14s</span>
            </div>
          </div>

          <div style={{ fontSize: 11, color: CB3.ink3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.4, marginBottom: 10 }}>Your clinician board · 1 patient</div>
          <div style={{ border: `1px solid ${CB3.line}`, borderRadius: 12, padding: 16, background: '#fff',
            display: 'flex', alignItems: 'center', gap: 12,
            animation: 'slideUp 0.5s 0.1s cubic-bezier(0.22, 1, 0.36, 1) both' }}>
            <div style={{ width: 40, height: 40, borderRadius: 20, background: CB3.greenSoft, color: CB3.green, fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {(name || 'Conor Murphy').split(' ').map(s => s[0]).slice(0, 2).join('')}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: CB3.ink }}>{name || 'Conor Murphy'}</div>
              <div style={{ fontSize: 12, color: CB3.ink3, marginTop: 2 }}>ACL reconstruction · Week 1 · Baseline captured</div>
            </div>
            <span style={{ fontSize: 10, fontWeight: 600, color: CB3.green, letterSpacing: 1.2, textTransform: 'uppercase', padding: '3px 8px', borderRadius: 4, background: CB3.greenSoft }}>Ready</span>
          </div>

          <div style={{ display: 'flex', gap: 10, marginTop: 28, justifyContent: 'center' }}>
            <button onClick={() => setStep(0)} style={{ height: 36, padding: '0 16px', borderRadius: 8, border: `1px solid ${CB3.line}`, background: '#fff', color: CB3.ink2, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>Restart demo</button>
            <button onClick={onExit} style={{ height: 36, padding: '0 18px', borderRadius: 8, border: 'none', background: CB3.ink, color: '#fff', fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>Open live clinic →</button>
          </div>
        </div>
      )}
    </div>
  );
}

function OnbField({ label, value, onChange, placeholder, readOnly, select }) {
  return (
    <label style={{ display: 'block' }}>
      <div style={{ fontSize: 11, color: CB3.ink3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 6 }}>{label}</div>
      <div style={{
        display: 'flex', alignItems: 'center',
        height: 40, padding: '0 14px', borderRadius: 8,
        border: `1px solid ${CB3.line}`, background: readOnly ? '#FAFAF8' : '#fff',
      }}>
        <input
          value={value} placeholder={placeholder} readOnly={readOnly}
          onChange={e => onChange && onChange(e.target.value)}
          style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 13, color: CB3.ink, fontFamily: 'inherit' }}
        />
        {select && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 4l3 3 3-3" stroke={CB3.ink3} strokeWidth="1.4" fill="none" strokeLinecap="round"/></svg>}
      </div>
    </label>
  );
}

// ========================================================================
// 2. BEFORE / WITH RECOVERA comparison
// ========================================================================
function BeforeAfterView({ onClose }) {
  return (
    <div style={{ padding: '32px 40px 40px', maxWidth: 1180, margin: '0 auto', height: '100%', overflow: 'auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <div style={{ fontSize: 11, color: CB3.ink3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.4 }}>The wedge</div>
          <div style={{ fontSize: 28, fontWeight: 600, color: CB3.ink, letterSpacing: -0.6, marginTop: 4 }}>Before Recovera vs. With Recovera</div>
          <div style={{ fontSize: 13, color: CB3.ink3, marginTop: 4 }}>Same patient. Same clinic. 6 weeks apart.</div>
        </div>
        {onClose && <button onClick={onClose} style={{ height: 32, padding: '0 14px', borderRadius: 8, border: `1px solid ${CB3.line}`, background: '#fff', color: CB3.ink3, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>Close</button>}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, alignItems: 'stretch' }}>
        {/* BEFORE */}
        <div style={{ border: `1px solid ${CB3.line}`, borderRadius: 16, padding: 24, background: '#FAFAF6', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 4, background: '#F0E6DB', color: '#8A6A3E', fontSize: 10, fontWeight: 600, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 14 }}>Before</div>
          <div style={{ fontSize: 18, fontWeight: 600, color: CB3.ink, letterSpacing: -0.3, marginBottom: 18 }}>Scattered. Manual. Blind between sessions.</div>

          {/* paper note */}
          <div style={{
            background: '#FEFBF3', border: '1px solid #E8DEC7', borderRadius: 4,
            padding: '14px 16px', fontFamily: 'Kalam, Caveat, "Comic Sans MS", cursive',
            transform: 'rotate(-1.2deg)', marginBottom: 16, position: 'relative',
            boxShadow: '0 4px 10px -4px rgba(0,0,0,0.12)',
          }}>
            <div style={{ fontSize: 13, color: '#4A3820', lineHeight: 1.55 }}>
              <span style={{ textDecoration: 'line-through', color: '#8A7458' }}>Conor - ACL wk 8</span><br/>
              pain 3/10 prob — says knee <u>giving way?</u><br/>
              progress squats? <span style={{ color: '#B94B2E' }}>ask about sleep</span><br/>
              <span style={{ fontSize: 11, color: '#8A7458' }}>— last week: wrote reps on card, lost it</span>
            </div>
          </div>

          {/* WhatsApp screenshot */}
          <div style={{ background: '#fff', borderRadius: 10, padding: 12, border: `1px solid #E8E4DE`, marginBottom: 16, transform: 'rotate(0.8deg)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, paddingBottom: 8, borderBottom: '1px solid #F0EDE5', marginBottom: 10 }}>
              <div style={{ width: 22, height: 22, borderRadius: 11, background: '#25D366', color: '#fff', fontSize: 10, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>CM</div>
              <span style={{ fontSize: 11, color: '#666', fontWeight: 500 }}>WhatsApp · Conor Murphy</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 11 }}>
              <div style={{ alignSelf: 'flex-start', background: '#F0F0F0', padding: '5px 9px', borderRadius: 10, maxWidth: '75%', color: '#333' }}>knee sore today — do I still run?</div>
              <div style={{ alignSelf: 'flex-end', background: '#DCF8C6', padding: '5px 9px', borderRadius: 10, maxWidth: '75%', color: '#333' }}>how sore 1-10?</div>
              <div style={{ alignSelf: 'flex-start', background: '#F0F0F0', padding: '5px 9px', borderRadius: 10, maxWidth: '75%', color: '#333' }}>maybe 4-5?</div>
              <div style={{ alignSelf: 'flex-end', background: '#DCF8C6', padding: '5px 9px', borderRadius: 10, maxWidth: '75%', color: '#333' }}>skip run, ice tonight</div>
              <div style={{ fontSize: 9, color: '#999', alignSelf: 'flex-end', fontStyle: 'italic', marginTop: 4 }}>— nothing logged, nothing measured</div>
            </div>
          </div>

          {/* blank form */}
          <div style={{ background: '#fff', border: `1px solid #E8E4DE`, borderRadius: 6, padding: 14, transform: 'rotate(-0.4deg)' }}>
            <div style={{ fontSize: 10, color: '#8A7458', letterSpacing: 1.2, textTransform: 'uppercase', fontWeight: 600, marginBottom: 8 }}>Pre-session form · blank</div>
            {['Last week pain: ____', 'Exercises done: ____', 'Any flare-ups: ____', 'Sleep: ____'].map((l, i) => (
              <div key={i} style={{ fontSize: 11, color: '#999', borderBottom: '1px dotted #D6CEBE', padding: '5px 0' }}>{l}</div>
            ))}
          </div>

          <div style={{ marginTop: 20, paddingTop: 20, borderTop: `1px dashed #D6CEBE`, fontSize: 12, color: '#6A5838', lineHeight: 1.6 }}>
            <div><strong style={{ color: '#4A3820' }}>12 min</strong> of pre-session scrambling</div>
            <div><strong style={{ color: '#4A3820' }}>50%</strong> of patients drop off by week 6</div>
            <div><strong style={{ color: '#4A3820' }}>Zero</strong> objective data between sessions</div>
          </div>
        </div>

        {/* WITH */}
        <div style={{ border: `1.5px solid ${CB3.green}`, borderRadius: 16, padding: 24, background: '#fff', position: 'relative' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 4, background: CB3.greenSoft, color: CB3.green, fontSize: 10, fontWeight: 600, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 14 }}>With Recovera</div>
          <div style={{ fontSize: 18, fontWeight: 600, color: CB3.ink, letterSpacing: -0.3, marginBottom: 18 }}>One surface. Every session. Clinically grounded.</div>

          {/* AI insight mock */}
          <div style={{ border: `1.5px solid ${CB3.green}`, borderRadius: 12, padding: 16, background: '#FBFCFB', marginBottom: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
              <div style={{ width: 16, height: 16, borderRadius: 4, background: CB3.green, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="8" height="8" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" fill="none" stroke="#fff" strokeWidth="1.4"/><circle cx="5" cy="5" r="1.5" fill="#fff"/></svg>
              </div>
              <span style={{ fontSize: 10, fontWeight: 600, color: CB3.green, letterSpacing: 1.2, textTransform: 'uppercase' }}>AI Insight · Pre-session</span>
            </div>
            <div style={{ fontSize: 13, color: CB3.ink, lineHeight: 1.5 }}>
              Left knee valgus × 3 sessions. Hip abductor deficit. <strong style={{ color: CB3.green }}>Add activation test</strong> before single-leg.
            </div>
          </div>

          {/* adherence chip */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 14 }}>
            <MiniStat label="Adherence" value="82%" tone="green"/>
            <MiniStat label="Pain" value="4→2" tone="green"/>
            <MiniStat label="Symmetry" value="62%" tone="amber"/>
          </div>

          {/* flag row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', background: CB3.redBg, borderRadius: 8, marginBottom: 14 }}>
            <div style={{ width: 16, height: 16, borderRadius: 8, background: CB3.red, color: '#fff', fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>!</div>
            <div style={{ fontSize: 11, color: CB3.red, fontWeight: 500 }}>Hip symmetry dropped below 50% · review before progressing</div>
          </div>

          {/* pose strip */}
          <div style={{ border: `1px solid ${CB3.line}`, borderRadius: 10, padding: 14, background: '#FAFAF8' }}>
            <div style={{ fontSize: 10, color: CB3.ink3, fontWeight: 500, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 10 }}>Session 4 · captured at home</div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <svg width="60" height="70" viewBox="0 0 60 70">
                <circle cx="30" cy="10" r="4" fill="none" stroke={CB3.green} strokeWidth="1.4"/>
                <path d="M30 14v14M20 20l10 4 10-4M20 38l10-4 10 4M26 42v18M34 42v18" stroke={CB3.green} strokeWidth="1.4" fill="none" strokeLinecap="round"/>
                {[[30,14],[20,20],[40,20],[30,28],[30,42],[26,60],[34,60]].map((p, i) => (
                  <circle key={i} cx={p[0]} cy={p[1]} r="1.8" fill={CB3.green}/>
                ))}
              </svg>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: CB3.ink3 }}>Form score</div>
                <div style={{ fontSize: 24, fontWeight: 600, color: CB3.green, fontVariantNumeric: 'tabular-nums', letterSpacing: -0.6 }}>84</div>
                <div style={{ fontSize: 10, color: CB3.ink3 }}>12 reps · objective · timestamped</div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 20, paddingTop: 20, borderTop: `1px dashed ${CB3.greenSoft}`, fontSize: 12, color: CB3.greenDim, lineHeight: 1.6 }}>
            <div><strong style={{ color: CB3.green }}>30 sec</strong> pre-session brief, already written</div>
            <div><strong style={{ color: CB3.green }}>94%</strong> adherence across Recovera patients</div>
            <div><strong style={{ color: CB3.green }}>Full</strong> between-session objective data</div>
          </div>
        </div>
      </div>

      <div style={{ height: 40 }}/>
    </div>
  );
}

function MiniStat({ label, value, tone }) {
  const c = { green: CB3.green, amber: CB3.amber, red: CB3.red, ink: CB3.ink }[tone] || CB3.ink;
  return (
    <div style={{ border: `1px solid ${CB3.line}`, borderRadius: 8, padding: '8px 10px', background: '#fff' }}>
      <div style={{ fontSize: 9, color: CB3.ink3, fontWeight: 500, letterSpacing: 1.2, textTransform: 'uppercase' }}>{label}</div>
      <div style={{ fontSize: 15, fontWeight: 600, color: c, fontVariantNumeric: 'tabular-nums', letterSpacing: -0.3, marginTop: 2 }}>{value}</div>
    </div>
  );
}

// ========================================================================
// 3. LIVE SESSION MODE — real-time pose estimation during in-clinic appt
// ========================================================================
function LiveSessionModal({ patient, onClose }) {
  const [t, setT] = React.useState(0);
  const [reps, setReps] = React.useState(0);
  const [formScore, setFormScore] = React.useState(78);
  const [elapsed, setElapsed] = React.useState(0);

  // Pose animation
  React.useEffect(() => {
    let raf; const start = performance.now();
    const tick = (now) => {
      const s = (now - start) / 1000;
      setElapsed(s);
      setT(((s * 0.4) % 1));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  React.useEffect(() => {
    const id = setInterval(() => {
      setReps(r => (r < 12 ? r + 1 : r));
      setFormScore(s => Math.min(92, Math.max(72, s + (Math.random() - 0.5) * 6)));
    }, 1800);
    return () => clearInterval(id);
  }, []);

  const phase = (Math.sin(t * Math.PI * 2) + 1) / 2;
  const depth = 30 * phase;
  const valgus = phase * 8;

  // Joints
  const J = {
    head: [180, 50], neck: [180, 85],
    shL: [155, 95], shR: [205, 95],
    elL: [140, 135 + depth * 0.2], elR: [220, 135 + depth * 0.2],
    wrL: [132, 172 + depth * 0.3], wrR: [228, 172 + depth * 0.3],
    hip: [180, 170 + depth * 0.5],
    hipL: [165, 174 + depth * 0.5], hipR: [195, 174 + depth * 0.5],
    knL: [160 + valgus, 230 + depth * 0.15], knR: [200, 230 + depth * 0.15],
    anL: [162, 290], anR: [198, 290],
  };
  const bones = [
    ['head','neck'],['neck','shL'],['neck','shR'],
    ['shL','elL'],['elL','wrL'],['shR','elR'],['elR','wrR'],
    ['neck','hip'],['hip','hipL'],['hip','hipR'],
    ['hipL','knL'],['knL','anL'],['hipR','knR'],['knR','anR'],
  ];

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(13,13,13,0.85)',
      backdropFilter: 'blur(8px)', zIndex: 100,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      animation: 'fadeIn 0.2s ease', padding: 24,
    }}>
      <div style={{
        width: 'min(1000px, 100%)', maxHeight: '92vh', background: '#0D0D0D', borderRadius: 16,
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
        animation: 'slideUp 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', padding: '18px 24px',
          borderBottom: '1px solid rgba(255,255,255,0.08)', gap: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: 4, background: CB3.red, animation: 'pulse 1.4s ease-in-out infinite' }}/>
            <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: 1.4, color: '#fff', textTransform: 'uppercase' }}>Live · in-clinic</span>
          </div>
          <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.15)' }}/>
          <div style={{ fontSize: 13, color: '#fff', fontWeight: 500 }}>{patient?.name || 'Conor Murphy'}</div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>· Bodyweight squat · 3×12</div>
          <div style={{ flex: 1 }}/>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', fontFamily: 'ui-monospace, Menlo, monospace' }}>
            {String(Math.floor(elapsed / 60)).padStart(2,'0')}:{String(Math.floor(elapsed) % 60).padStart(2,'0')}
          </div>
          <button onClick={onClose} style={{
            background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer',
            color: '#fff', fontSize: 12, height: 30, padding: '0 14px', borderRadius: 8, fontFamily: 'inherit',
          }}>End session</button>
        </div>

        {/* Body */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', flex: 1, minHeight: 0 }}>
          {/* camera view */}
          <div style={{ background: '#111', position: 'relative', overflow: 'hidden' }}>
            {/* grid bg */}
            <svg width="100%" height="100%" viewBox="0 0 360 400" preserveAspectRatio="xMidYMid meet">
              <defs>
                <pattern id="ls-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5"/>
                </pattern>
                <radialGradient id="spot" cx="50%" cy="40%">
                  <stop offset="0%" stopColor="rgba(31,77,46,0.22)"/>
                  <stop offset="100%" stopColor="rgba(0,0,0,0)"/>
                </radialGradient>
              </defs>
              <rect width="360" height="400" fill="url(#ls-grid)"/>
              <rect width="360" height="400" fill="url(#spot)"/>
              {/* crosshair corners */}
              {[[16,16],[344,16],[16,384],[344,384]].map((p, i) => (
                <g key={i} stroke="rgba(255,255,255,0.25)" strokeWidth="1">
                  <line x1={p[0] - 6} y1={p[1]} x2={p[0] + 6} y2={p[1]}/>
                  <line x1={p[0]} y1={p[1] - 6} x2={p[0]} y2={p[1] + 6}/>
                </g>
              ))}
              {/* bones */}
              {bones.map((b, i) => (
                <line key={i} x1={J[b[0]][0]} y1={J[b[0]][1]} x2={J[b[1]][0]} y2={J[b[1]][1]}
                  stroke={CB3.green} strokeWidth="2" strokeLinecap="round" opacity="0.85"/>
              ))}
              {/* joints */}
              {Object.entries(J).map(([k, p]) => (
                <g key={k}>
                  <circle cx={p[0]} cy={p[1]} r="5" fill="none" stroke={CB3.green} strokeWidth="1" opacity="0.4"/>
                  <circle cx={p[0]} cy={p[1]} r="3" fill={CB3.green}/>
                </g>
              ))}
              {/* knee flag */}
              <circle cx={J.knL[0]} cy={J.knL[1]} r="12" fill="none" stroke={CB3.amber} strokeWidth="1.4" opacity="0.7">
                <animate attributeName="r" values="10;18;10" dur="1.5s" repeatCount="indefinite"/>
                <animate attributeName="opacity" values="0.7;0.2;0.7" dur="1.5s" repeatCount="indefinite"/>
              </circle>
              {/* label */}
              <line x1={J.knL[0] - 14} y1={J.knL[1]} x2={J.knL[0] - 40} y2={J.knL[1] - 20}
                stroke={CB3.amber} strokeWidth="0.8" strokeDasharray="2 2"/>
              <rect x={J.knL[0] - 100} y={J.knL[1] - 32} width="64" height="16" rx="3" fill={CB3.amber}/>
              <text x={J.knL[0] - 68} y={J.knL[1] - 21} textAnchor="middle" fontSize="9" fill="#fff" fontFamily="ui-monospace, Menlo, monospace" fontWeight="600">L KNEE +8°</text>
            </svg>

            {/* overlay HUD */}
            <div style={{ position: 'absolute', top: 16, left: 16, display: 'flex', gap: 6 }}>
              <div style={{ fontSize: 9, color: '#fff', background: 'rgba(0,0,0,0.6)', padding: '4px 8px', borderRadius: 3, fontFamily: 'ui-monospace, Menlo, monospace', letterSpacing: 0.8 }}>30 FPS · 17 JOINTS</div>
              <div style={{ fontSize: 9, color: CB3.green, background: 'rgba(31,77,46,0.25)', padding: '4px 8px', borderRadius: 3, fontFamily: 'ui-monospace, Menlo, monospace', letterSpacing: 0.8 }}>● TRACKING</div>
            </div>

            <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16,
              display: 'flex', gap: 10, justifyContent: 'space-between' }}>
              <div style={{ background: 'rgba(0,0,0,0.65)', padding: '8px 12px', borderRadius: 6 }}>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', letterSpacing: 1, textTransform: 'uppercase' }}>Reps</div>
                <div style={{ fontSize: 18, fontWeight: 600, color: '#fff', fontVariantNumeric: 'tabular-nums' }}>{reps}<span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 400 }}> /12</span></div>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.65)', padding: '8px 12px', borderRadius: 6, minWidth: 88 }}>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', letterSpacing: 1, textTransform: 'uppercase' }}>Live form</div>
                <div style={{ fontSize: 18, fontWeight: 600, color: CB3.green, fontVariantNumeric: 'tabular-nums' }}>{Math.round(formScore)}</div>
              </div>
              <div style={{ background: 'rgba(0,0,0,0.65)', padding: '8px 12px', borderRadius: 6 }}>
                <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', letterSpacing: 1, textTransform: 'uppercase' }}>Depth</div>
                <div style={{ fontSize: 18, fontWeight: 600, color: '#fff', fontVariantNumeric: 'tabular-nums' }}>{Math.round(92 - depth * 0.8)}°</div>
              </div>
            </div>
          </div>

          {/* side panel — live flags */}
          <div style={{ padding: 22, background: '#0D0D0D', borderLeft: '1px solid rgba(255,255,255,0.08)', color: '#fff', overflow: 'auto' }}>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 500, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 12 }}>Real-time flags</div>

            <div style={{ border: `1px solid rgba(180,122,26,0.35)`, background: 'rgba(180,122,26,0.08)', borderRadius: 10, padding: 14, marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: 3, background: CB3.amber, animation: 'pulse 1.6s ease-in-out infinite' }}/>
                <span style={{ fontSize: 10, fontWeight: 600, color: CB3.amber, letterSpacing: 1.2, textTransform: 'uppercase' }}>Active · 4s ago</span>
              </div>
              <div style={{ fontSize: 13, color: '#fff', fontWeight: 500, marginBottom: 4 }}>Left knee valgus · +8°</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>Detected on descent. 6 of last 8 reps. Cue hip engagement before next set.</div>
            </div>

            <div style={{ border: `1px solid rgba(255,255,255,0.1)`, background: 'rgba(255,255,255,0.03)', borderRadius: 10, padding: 14, marginBottom: 16 }}>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontWeight: 500, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 8 }}>Tracked metrics</div>
              {[
                { l: 'Symmetry', v: 68, tone: 'amber' },
                { l: 'Tempo', v: 88, tone: 'green' },
                { l: 'ROM', v: 82, tone: 'green' },
                { l: 'Trunk lean', v: 91, tone: 'green' },
              ].map((m, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '7px 0', borderTop: i > 0 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                  <div style={{ flex: 1, fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>{m.l}</div>
                  <div style={{ width: 60, height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${m.v}%`, background: m.tone === 'amber' ? CB3.amber : CB3.green, borderRadius: 2, transition: 'width 0.5s' }}/>
                  </div>
                  <div style={{ fontSize: 11, color: '#fff', fontVariantNumeric: 'tabular-nums', width: 28, textAlign: 'right', fontWeight: 500 }}>{m.v}</div>
                </div>
              ))}
            </div>

            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', fontWeight: 500, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 10 }}>Session log</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', lineHeight: 1.7, fontFamily: 'ui-monospace, Menlo, monospace' }}>
              <div>00:00 · session started</div>
              <div>00:14 · set 1 begin</div>
              <div style={{ color: CB3.amber }}>00:42 · L valgus flagged</div>
              <div>01:06 · set 1 complete · 12 reps</div>
              <div>01:28 · set 2 begin</div>
              <div style={{ color: CB3.green }}>02:02 · form ↑ 78 → 84</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ========================================================================
// 4. PATIENT OUTCOME CARD (small inline component)
// ========================================================================
function PatientOutcomeStrip({ patient }) {
  // Reasonable mock values based on patient id
  const outcome = {
    CM: { cond: 'ACL reconstruction', week: 8, total: 16, adherence: 82, painFrom: 8, painTo: 2, status: 'On track' },
    AO: { cond: 'Rotator cuff', week: 4, total: 12, adherence: 91, painFrom: 7, painTo: 5, status: 'On track' },
    DK: { cond: 'Achilles rehab', week: 12, total: 14, adherence: 66, painFrom: 6, painTo: 4, status: 'Behind' },
    MR: { cond: 'Patellar', week: 3, total: 10, adherence: 88, painFrom: 6, painTo: 4, status: 'On track' },
    TH: { cond: 'Low back', week: 6, total: 12, adherence: 54, painFrom: 7, painTo: 7, status: 'Behind' },
    SD: { cond: 'MCL sprain', week: 2, total: 8, adherence: 96, painFrom: 5, painTo: 2, status: 'Ahead' },
    JW: { cond: 'Meniscus', week: 9, total: 12, adherence: 79, painFrom: 5, painTo: 3, status: 'On track' },
    NB: { cond: 'Hip impingement', week: 5, total: 14, adherence: 42, painFrom: 6, painTo: 7, status: 'Behind' },
  }[patient.id] || { cond: patient.condition, week: patient.week, total: 12, adherence: patient.adherence, painFrom: patient.pain[0]+3, painTo: patient.pain[1], status: 'On track' };

  const statusTone = outcome.status === 'On track' ? CB3.green : outcome.status === 'Ahead' ? CB3.green : CB3.red;
  const statusBg = outcome.status === 'Behind' ? CB3.redBg : CB3.greenSoft;
  const progress = Math.min(100, (outcome.week / outcome.total) * 100);

  return (
    <div style={{ marginTop: 10, padding: '10px 12px', background: '#FAFAF8', borderRadius: 8, border: `1px solid ${CB3.line}` }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
        <span style={{ fontSize: 11, color: CB3.ink, fontWeight: 600, letterSpacing: -0.1 }}>{outcome.cond}</span>
        <span style={{ fontSize: 10, color: CB3.ink3, fontFamily: 'ui-monospace, Menlo, monospace' }}>Wk {outcome.week}/{outcome.total}</span>
        <div style={{ flex: 1 }}/>
        <span style={{ fontSize: 9, fontWeight: 600, color: statusTone, letterSpacing: 1.2, textTransform: 'uppercase', padding: '2px 7px', borderRadius: 3, background: statusBg }}>
          {outcome.status}
        </span>
      </div>
      <div style={{ height: 3, background: '#EEE', borderRadius: 2, overflow: 'hidden', marginBottom: 8 }}>
        <div style={{ width: `${progress}%`, height: '100%', background: statusTone, borderRadius: 2 }}/>
      </div>
      <div style={{ display: 'flex', gap: 14, fontSize: 10.5, color: CB3.ink3 }}>
        <span><strong style={{ color: CB3.ink, fontWeight: 600 }}>{outcome.adherence}%</strong> adherence</span>
        <span>Pain <strong style={{ color: CB3.ink, fontWeight: 600 }}>{outcome.painFrom}→{outcome.painTo}</strong></span>
        <span style={{ color: outcome.status === 'Behind' ? CB3.red : CB3.greenDim, fontWeight: 500 }}>
          {outcome.status === 'Behind' ? 'Recovery lagging · call recommended' : outcome.status === 'Ahead' ? 'Full recovery projected early' : 'Full recovery projected on time'}
        </span>
      </div>
    </div>
  );
}

// ========================================================================
// 5. REFERRAL FLOW — AI-generated handover with Permission Stack
// ========================================================================
function ReferralFlowModal({ onClose }) {
  // 0 pick pro, 1 generating, 2 scope selector, 3 generated doc
  const [step, setStep] = React.useState(0);
  const [recipient, setRecipient] = React.useState(null);
  const [genProgress, setGenProgress] = React.useState(0);

  const pros = [
    { name: 'Laura Fitzgerald', role: 'Pilates instructor', clinic: 'Stillorgan Pilates Studio' },
    { name: 'Eoin Gallagher', role: 'S&C coach', clinic: 'Athletic Development Dublin' },
    { name: 'Cara Donnelly', role: 'Occupational therapist', clinic: 'Blackrock OT Clinic' },
  ];

  React.useEffect(() => {
    if (step === 1) {
      setGenProgress(0);
      let p = 0;
      const id = setInterval(() => {
        p += 4;
        setGenProgress(p);
        if (p >= 100) { clearInterval(id); setTimeout(() => setStep(2), 200); }
      }, 180);
      return () => clearInterval(id);
    }
  }, [step]);

  // Typed-out doc content for step 3
  const docLines = {
    'Pilates instructor': [
      { k: 'Functional capacity', v: 'Mobility work cleared. Avoid closed-chain lunges until week 10. Single-leg balance on stable surface only.' },
      { k: 'Contraindications', v: 'No deep flexion beyond 90° left knee. No jumping. No rotational load under compression.' },
      { k: 'Loading parameters', v: 'Bodyweight only. Max 2 sessions/week. Stop any exercise if pain >3/10.' },
      { k: 'Communication', v: 'Flag any reported knee giving-way or swelling. Auto-report back to Recovera.' },
    ],
    'S&C coach': [
      { k: 'Functional capacity', v: 'Cleared for lower-body strength. ROM knee 132°/118°. Symmetry 62% (target 80% before plyo).' },
      { k: 'Contraindications', v: 'No plyometrics. No single-leg loading above 1.5×BW. No cutting drills.' },
      { k: 'Loading parameters', v: 'Bilateral squat, hinge, press. RPE ≤ 7. Gate unilateral progression on movement score.' },
      { k: 'Communication', v: 'Weekly form-score sync with Recovera. Flag if any pain episode >4/10.' },
    ],
    'Occupational therapist': [
      { k: 'Functional capacity', v: 'Activities of daily living intact. Stairs with minor discomfort descending.' },
      { k: 'Contraindications', v: 'Avoid prolonged kneeling. No ladder work for 4 more weeks.' },
      { k: 'Loading parameters', v: 'Standing tolerance 45 min before rest. Lifting ≤ 10 kg.' },
      { k: 'Communication', v: 'Report workplace ergonomics feedback into Recovera.' },
    ],
  }[recipient?.role] || [];

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(13,13,13,0.5)', backdropFilter: 'blur(6px)',
      zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
      animation: 'fadeIn 0.2s ease' }}>
      <div style={{ width: 'min(820px, 100%)', maxHeight: '92vh', background: '#fff', borderRadius: 16,
        overflow: 'hidden', display: 'flex', flexDirection: 'column',
        animation: 'slideUp 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
        boxShadow: '0 20px 60px -20px rgba(0,0,0,0.35)' }}>
        {/* header */}
        <div style={{ padding: '20px 24px', borderBottom: `1px solid ${CB3.line}`, display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: CB3.ink3, fontWeight: 600, letterSpacing: 1.4, textTransform: 'uppercase' }}>Refer patient · Conor Murphy</div>
            <div style={{ fontSize: 17, fontWeight: 600, color: CB3.ink, letterSpacing: -0.3, marginTop: 4 }}>
              {step === 0 && 'Choose recipient'}
              {step === 1 && 'Generating scope-appropriate handover'}
              {step === 2 && 'Permission scope'}
              {step === 3 && `Handover to ${recipient?.name}`}
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: CB3.ink3, padding: 4 }}>
            <svg width="18" height="18" viewBox="0 0 18 18"><path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
          </button>
        </div>

        <div style={{ flex: 1, overflow: 'auto' }}>
          {step === 0 && (
            <div style={{ padding: 24 }}>
              {pros.map((p, i) => (
                <button key={i} onClick={() => { setRecipient(p); setStep(1); }} style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 14, padding: 16,
                  borderRadius: 10, border: `1px solid ${CB3.line}`, background: '#fff', cursor: 'pointer',
                  fontFamily: 'inherit', textAlign: 'left', marginBottom: 8,
                  transition: 'border-color 0.15s, background 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = CB3.green; e.currentTarget.style.background = CB3.greenSoft; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = CB3.line; e.currentTarget.style.background = '#fff'; }}>
                  <div style={{ width: 40, height: 40, borderRadius: 20, background: '#F2F2F0', color: CB3.ink2,
                    fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {p.name.split(' ').map(s => s[0]).slice(0, 2).join('')}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, fontWeight: 600, color: CB3.ink }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: CB3.ink3, marginTop: 2 }}>{p.role} · {p.clinic}</div>
                  </div>
                  <svg width="12" height="12" viewBox="0 0 12 12"><path d="M4 2l4 4-4 4" stroke={CB3.ink3} strokeWidth="1.4" fill="none" strokeLinecap="round"/></svg>
                </button>
              ))}
            </div>
          )}

          {step === 1 && (
            <div style={{ padding: '48px 32px', textAlign: 'center' }}>
              <div style={{ width: 68, height: 68, margin: '0 auto 18px', borderRadius: 16, background: CB3.greenSoft,
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="30" height="30" viewBox="0 0 30 30" style={{ animation: 'spin 1.2s linear infinite' }}>
                  <circle cx="15" cy="15" r="11" stroke={CB3.green} strokeWidth="2" fill="none"
                    strokeLinecap="round" strokeDasharray="20 80"/>
                </svg>
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, color: CB3.ink, marginBottom: 6 }}>
                Filtering patient record to {recipient?.role} scope…
              </div>
              <div style={{ fontSize: 12, color: CB3.ink3, maxWidth: 400, margin: '0 auto', lineHeight: 1.5 }}>
                Recovera's Permission Stack only shares what this role clinically needs. No raw data leaves the clinical record.
              </div>
              <div style={{ width: 320, maxWidth: '80%', margin: '24px auto 0', height: 4, background: '#EEE', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${genProgress}%`, background: CB3.green, borderRadius: 2, transition: 'width 0.15s linear' }}/>
              </div>
              <div style={{ fontSize: 10, color: CB3.ink4, marginTop: 10, fontFamily: 'ui-monospace, Menlo, monospace' }}>
                {genProgress < 30 && 'scanning patient record · 847 data points'}
                {genProgress >= 30 && genProgress < 60 && 'applying scope filter · 12 relevant fields'}
                {genProgress >= 60 && genProgress < 90 && 'drafting clinical summary · redacting out-of-scope'}
                {genProgress >= 90 && 'attaching digital signature & audit log'}
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={{ padding: 24 }}>
              <div style={{ fontSize: 12, color: CB3.ink3, marginBottom: 16, lineHeight: 1.55 }}>
                Recovera drafted a handover filtered to a <strong style={{ color: CB3.ink }}>{recipient?.role}</strong>'s clinical scope. Review before sending.
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
                <ScopeRow label="Functional capacity" inc/>
                <ScopeRow label="Contraindications" inc/>
                <ScopeRow label="Loading parameters" inc/>
                <ScopeRow label="Communication channel" inc/>
                <ScopeRow label="Full imaging (MRI)" inc={false}/>
                <ScopeRow label="Surgical history" inc={false}/>
                <ScopeRow label="Pain scores · raw" inc={false}/>
                <ScopeRow label="Medication list" inc={false}/>
              </div>
              <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                <button onClick={() => setStep(0)} style={{ height: 36, padding: '0 16px', borderRadius: 8, border: `1px solid ${CB3.line}`, background: '#fff', color: CB3.ink2, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>Back</button>
                <button onClick={() => setStep(3)} style={{ height: 36, padding: '0 18px', borderRadius: 8, border: 'none', background: CB3.green, color: '#fff', fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>Preview handover →</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ padding: 0 }}>
              <div style={{ padding: 24, background: '#FAFAF8', borderBottom: `1px solid ${CB3.line}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: CB3.green, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="16" height="16" viewBox="0 0 16 16"><path d="M9 2H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1V6l-4-4z" stroke="#fff" strokeWidth="1.4" fill="none" strokeLinejoin="round"/></svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: CB3.ink }}>Handover · Conor Murphy</div>
                    <div style={{ fontSize: 11, color: CB3.ink3, marginTop: 2 }}>To {recipient?.name} · {recipient?.role} · digitally signed by Dr. Áine O'Brien</div>
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 600, color: CB3.green, letterSpacing: 1.2, textTransform: 'uppercase', padding: '3px 8px', borderRadius: 4, background: CB3.greenSoft }}>Scope-filtered</span>
                </div>
              </div>
              <div style={{ padding: 24 }}>
                {docLines.map((line, i) => (
                  <div key={i} style={{
                    padding: '14px 0', borderBottom: i < docLines.length - 1 ? `1px solid ${CB3.line}` : 'none',
                    animation: `slideUp 0.3s ${i * 0.08}s both cubic-bezier(0.22, 1, 0.36, 1)`,
                  }}>
                    <div style={{ fontSize: 10, color: CB3.green, fontWeight: 600, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 6 }}>{line.k}</div>
                    <div style={{ fontSize: 13, color: CB3.ink, lineHeight: 1.6 }}>{line.v}</div>
                  </div>
                ))}
                <div style={{ marginTop: 18, padding: '12px 14px', background: CB3.greenSoft, borderRadius: 8, fontSize: 11, color: CB3.greenDim, lineHeight: 1.5 }}>
                  <strong style={{ color: CB3.green }}>Permission Stack</strong> · {recipient?.role} scope only. Out-of-scope fields (imaging, surgical notes, medication) not shared. Audit logged.
                </div>
                <div style={{ display: 'flex', gap: 8, marginTop: 18, justifyContent: 'flex-end' }}>
                  <button onClick={() => setStep(0)} style={{ height: 36, padding: '0 16px', borderRadius: 8, border: `1px solid ${CB3.line}`, background: '#fff', color: CB3.ink2, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>Start over</button>
                  <button onClick={onClose} style={{ height: 36, padding: '0 18px', borderRadius: 8, border: 'none', background: CB3.ink, color: '#fff', fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>Send handover</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ScopeRow({ label, inc }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', borderRadius: 8,
      background: inc ? CB3.greenSoft : '#FAFAF8',
      border: `1px solid ${inc ? CB3.greenSoft : CB3.line}`,
    }}>
      <div style={{
        width: 16, height: 16, borderRadius: 8, flexShrink: 0,
        background: inc ? CB3.green : '#DDD', color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {inc ? (
          <svg width="8" height="8" viewBox="0 0 8 8"><path d="M1 4l2 2 4-4" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        ) : (
          <svg width="8" height="8" viewBox="0 0 8 8"><path d="M1 1l6 6M7 1L1 7" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/></svg>
        )}
      </div>
      <div style={{ fontSize: 11.5, color: inc ? CB3.green : CB3.ink3, fontWeight: 500 }}>{label}</div>
    </div>
  );
}

// ========================================================================
// 6. CLINIC ANALYTICS CARD
// ========================================================================
function ClinicAnalyticsCard() {
  return (
    <div style={{ border: `1.5px solid ${CB3.green}`, borderRadius: 14, padding: 22, background: '#FBFCFB', marginBottom: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <div style={{ width: 20, height: 20, borderRadius: 5, background: CB3.green, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1 8l3-3 2 2 3-4" stroke="#fff" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
        </div>
        <span style={{ fontSize: 11, fontWeight: 600, color: CB3.green, letterSpacing: 1.4, textTransform: 'uppercase' }}>This month · at a glance</span>
        <div style={{ flex: 1 }}/>
        <span style={{ fontSize: 10, color: CB3.ink4, fontFamily: 'ui-monospace, Menlo, monospace' }}>Updated 12 min ago</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 0 }}>
        {[
          { v: '147', l: 'sessions tracked' },
          { v: '94%', l: 'insurer compliance', tone: 'green' },
          { v: '€12.4k', l: 'revenue tracked' },
          { v: '3', l: 'new referrals this week' },
          { v: '+14 pts', l: 'vs. national benchmark', tone: 'green' },
        ].map((s, i, a) => (
          <div key={i} style={{
            padding: '6px 16px',
            borderRight: i < a.length - 1 ? `1px solid ${CB3.line}` : 'none',
          }}>
            <div style={{ fontSize: 22, fontWeight: 600, color: s.tone === 'green' ? CB3.green : CB3.ink, letterSpacing: -0.5, fontVariantNumeric: 'tabular-nums' }}>{s.v}</div>
            <div style={{ fontSize: 10.5, color: CB3.ink3, marginTop: 3, fontWeight: 500 }}>{s.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, {
  OnboardingView, BeforeAfterView, LiveSessionModal, PatientOutcomeStrip,
  ReferralFlowModal, ClinicAnalyticsCard,
});
