// Clinician extras — Live session, referrals, enhanced analytics
// All components read from window.PATIENT_BRAND (CB).

const CBX = window.PATIENT_BRAND;

// =========================================================================
// LIVE SESSION — in-clinic view, clinician's screen during a session
// =========================================================================
function LiveSession({ patientName = 'Conor Murphy', onExit }) {
  // Rep counter + current exercise state
  const [reps, setReps] = React.useState(0);
  const [elapsed, setElapsed] = React.useState(0);
  const [phase, setPhase] = React.useState(0); // 0..1 squat depth
  const [currentEx, setCurrentEx] = React.useState(1); // index into protocol
  const [flagActive, setFlagActive] = React.useState(false);
  const [showNote, setShowNote] = React.useState(false);

  const protocol = [
    { n: 1, name: 'Hip abductor activation', target: 12, sets: '1 of 3' },
    { n: 2, name: 'Bodyweight squat', target: 12, sets: '1 of 3', active: true },
    { n: 3, name: 'Single-leg balance', target: 2, sets: '0 of 2' },
    { n: 4, name: 'Step-down', target: 8, sets: '0 of 3' },
  ];

  // Animation loop: squat phase + elapsed timer
  React.useEffect(() => {
    const t0 = performance.now();
    let raf;
    const tick = (now) => {
      const secs = (now - t0) / 1000;
      setElapsed(secs);
      const p = (Math.sin(secs * Math.PI / 1.8) + 1) / 2; // 1 rep = 3.6s
      setPhase(p);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Rep counter tied to phase transitions at bottom of squat
  React.useEffect(() => {
    const id = setInterval(() => setReps(r => Math.min(12, r + 1)), 3600);
    return () => clearInterval(id);
  }, []);

  // Inject AI flag at ~rep 7
  React.useEffect(() => {
    if (reps === 7 && !flagActive) setFlagActive(true);
  }, [reps, flagActive]);

  const mm = Math.floor(elapsed / 60).toString().padStart(2, '0');
  const ss = Math.floor(elapsed % 60).toString().padStart(2, '0');

  return (
    <div style={{
      position: 'absolute', inset: 0, background: '#0B0B0B', color: '#fff',
      display: 'flex', flexDirection: 'column', fontFamily: 'inherit',
      animation: 'fadeIn 0.3s ease',
    }}>
      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', padding: '16px 24px',
        borderBottom: '1px solid rgba(255,255,255,0.08)', gap: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            width: 8, height: 8, borderRadius: 4, background: '#FF4343',
            animation: 'pulse 1.4s ease-in-out infinite',
          }}/>
          <span style={{ fontSize: 11, letterSpacing: 1.6, fontWeight: 600, color: '#FF4343' }}>LIVE SESSION · REC</span>
        </div>
        <div style={{ width: 1, height: 16, background: 'rgba(255,255,255,0.15)' }}/>
        <div style={{ fontSize: 13, fontWeight: 500 }}>{patientName}</div>
        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>· ACL wk 8 · session 16</div>
        <div style={{ flex: 1 }}/>
        <div style={{ fontSize: 13, fontFamily: 'ui-monospace, Menlo, monospace', letterSpacing: 1, color: 'rgba(255,255,255,0.7)' }}>
          {mm}:{ss}
        </div>
        <button onClick={onExit} style={{
          height: 32, padding: '0 14px', borderRadius: 8, border: 'none', cursor: 'pointer',
          background: '#FF4343', color: '#fff', fontSize: 12, fontWeight: 600, fontFamily: 'inherit',
        }}>End session</button>
      </div>

      {/* Body: camera feed left, metrics right */}
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        {/* Camera/pose feed */}
        <div style={{ flex: 1, position: 'relative', background: '#141413', overflow: 'hidden' }}>
          {/* Faux camera noise background */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'radial-gradient(circle at 50% 60%, rgba(40,50,45,0.8), #0B0B0B 70%)',
          }}/>
          {/* Pose skeleton */}
          <LiveSkeleton phase={phase} flag={flagActive}/>
          {/* Floor indicator */}
          <div style={{
            position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
            width: 280, height: 12, borderRadius: 6,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)',
          }}/>

          {/* Live flag overlay */}
          {flagActive && (
            <div style={{
              position: 'absolute', top: 24, left: '50%', transform: 'translateX(-50%)',
              background: 'rgba(255,67,67,0.95)', padding: '12px 20px', borderRadius: 10,
              display: 'flex', alignItems: 'center', gap: 12,
              animation: 'slideDown 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
              boxShadow: '0 8px 32px rgba(255,67,67,0.35)',
            }}>
              <div style={{
                width: 24, height: 24, borderRadius: 12, background: '#fff', color: '#FF4343',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 14, fontWeight: 700,
              }}>!</div>
              <div>
                <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: 0.8, textTransform: 'uppercase' }}>
                  Form breakdown · Left knee valgus
                </div>
                <div style={{ fontSize: 11, opacity: 0.85, marginTop: 2 }}>
                  Rep 7 · 12° medial collapse detected
                </div>
              </div>
              <button onClick={() => setShowNote(true)} style={{
                background: '#fff', color: '#FF4343', border: 'none', borderRadius: 6,
                padding: '6px 12px', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
              }}>Log</button>
            </div>
          )}

          {/* Rep counter big */}
          <div style={{
            position: 'absolute', bottom: 64, left: 40, fontSize: 12,
            letterSpacing: 1.6, textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', fontWeight: 600,
          }}>Reps</div>
          <div style={{
            position: 'absolute', bottom: 18, left: 40,
            fontSize: 56, fontWeight: 700, letterSpacing: -2, fontVariantNumeric: 'tabular-nums',
            color: '#fff', lineHeight: 1,
          }}>
            {reps}<span style={{ fontSize: 28, color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}> / 12</span>
          </div>

          {/* Current exercise pill */}
          <div style={{
            position: 'absolute', top: 24, left: 24,
            background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)',
            padding: '10px 14px', borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{ width: 6, height: 6, borderRadius: 3, background: '#4FD66F' }}/>
            <div>
              <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', letterSpacing: 1.2, textTransform: 'uppercase', fontWeight: 600 }}>Exercise 2 of 4</div>
              <div style={{ fontSize: 14, fontWeight: 600, marginTop: 2 }}>Bodyweight squat</div>
            </div>
          </div>

          {/* Note logged confirmation */}
          {showNote && (
            <div style={{
              position: 'absolute', bottom: 24, right: 24,
              background: 'rgba(79, 214, 111, 0.15)', border: '1px solid rgba(79, 214, 111, 0.4)',
              padding: '10px 14px', borderRadius: 10, fontSize: 12,
              color: '#4FD66F', fontWeight: 500,
              animation: 'slideUp 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
            }}>
              ✓ Flag logged to clinical note
            </div>
          )}
        </div>

        {/* Right column — metrics + protocol */}
        <div style={{ width: 320, background: '#111', borderLeft: '1px solid rgba(255,255,255,0.06)',
          display: 'flex', flexDirection: 'column', overflow: 'auto' }}>
          {/* Live metrics */}
          <div style={{ padding: '20px 20px 8px' }}>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: 1.6, fontWeight: 600, textTransform: 'uppercase', marginBottom: 14 }}>Live metrics</div>
            <LiveMetric label="Depth" value={Math.round(60 + phase * 35)} unit="°" good={90}/>
            <LiveMetric label="Knee tracking" value={flagActive ? 76 : 94} unit="%" good={85} warn={flagActive}/>
            <LiveMetric label="Tempo" value="3-1-1" raw/>
            <LiveMetric label="Symmetry L/R" value="92%" raw good="green"/>
          </div>

          <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '8px 0' }}/>

          {/* Protocol checklist */}
          <div style={{ padding: '12px 20px' }}>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: 1.6, fontWeight: 600, textTransform: 'uppercase', marginBottom: 10 }}>Protocol</div>
            {protocol.map((e) => {
              const done = e.n < 2;
              const active = e.n === 2;
              return (
                <div key={e.n} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.04)',
                }}>
                  <div style={{
                    width: 20, height: 20, borderRadius: 10, flexShrink: 0,
                    background: done ? '#4FD66F' : active ? 'transparent' : 'rgba(255,255,255,0.05)',
                    border: active ? '1.5px solid #4FD66F' : 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {done && <svg width="10" height="10" viewBox="0 0 10 10"><path d="M2 5l2 2 4-4" stroke="#0B0B0B" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    {active && <div style={{ width: 8, height: 8, borderRadius: 4, background: '#4FD66F', animation: 'pulse 1.4s ease-in-out infinite' }}/>}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, color: active ? '#fff' : done ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.7)',
                      fontWeight: active ? 600 : 500, textDecoration: done ? 'line-through' : 'none' }}>{e.name}</div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)', marginTop: 2,
                      fontFamily: 'ui-monospace, Menlo, monospace', letterSpacing: 0.4 }}>Set {e.sets}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ flex: 1 }}/>

          {/* Session actions */}
          <div style={{ padding: 16, borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: 8 }}>
            <button style={{
              flex: 1, height: 36, borderRadius: 8, border: '1px solid rgba(255,255,255,0.15)',
              background: 'transparent', color: '#fff', fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
            }}>Pause</button>
            <button style={{
              flex: 1, height: 36, borderRadius: 8, border: 'none', background: '#4FD66F',
              color: '#0B0B0B', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
            }}>Next exercise →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LiveSkeleton({ phase, flag }) {
  // Phase 0 = standing, 1 = bottom of squat
  const depth = 110 * phase;
  const kneeX = flag ? 165 - phase * 18 : 165; // valgus: knee caves inward
  const color = flag ? '#FF4343' : '#4FD66F';
  const hip = 220 + depth * 0.8;
  const knee = 340 + depth * 0.3;
  return (
    <svg viewBox="0 0 400 560" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      {/* trail */}
      <circle cx={200} cy={hip} r="90" fill={color} opacity="0.06"/>
      <circle cx={200} cy={hip} r="50" fill={color} opacity="0.1"/>

      {/* head */}
      <circle cx="200" cy={130 + depth * 0.5} r="22" fill="none" stroke={color} strokeWidth="2.5"/>
      {/* torso */}
      <line x1="200" y1={152 + depth * 0.5} x2="200" y2={hip} stroke={color} strokeWidth="3" strokeLinecap="round"/>
      {/* arms forward */}
      <line x1="200" y1={180 + depth * 0.5} x2={170 - depth * 0.15} y2={225 + depth * 0.4} stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
      <line x1="200" y1={180 + depth * 0.5} x2={230 + depth * 0.15} y2={225 + depth * 0.4} stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
      {/* legs: hip → knee → ankle */}
      <line x1="200" y1={hip} x2={kneeX} y2={knee} stroke={flag ? '#FF4343' : color} strokeWidth="3" strokeLinecap="round"/>
      <line x1={kneeX} y1={knee} x2="175" y2="470" stroke={flag ? '#FF4343' : color} strokeWidth="3" strokeLinecap="round"/>
      <line x1="200" y1={hip} x2="235" y2={knee} stroke={color} strokeWidth="3" strokeLinecap="round"/>
      <line x1="235" y1={knee} x2="225" y2="470" stroke={color} strokeWidth="3" strokeLinecap="round"/>

      {/* joints */}
      <circle cx="200" cy={hip} r="5" fill={color}/>
      <circle cx={kneeX} cy={knee} r="5" fill={flag ? '#FF4343' : color}/>
      <circle cx="235" cy={knee} r="5" fill={color}/>
      <circle cx="175" cy="470" r="4" fill={color}/>
      <circle cx="225" cy="470" r="4" fill={color}/>

      {/* valgus alert circle around knee */}
      {flag && (
        <circle cx={kneeX} cy={knee} r="20" fill="none" stroke="#FF4343" strokeWidth="2"
          strokeDasharray="4 3" style={{ animation: 'spin 3s linear infinite', transformOrigin: `${kneeX}px ${knee}px` }}/>
      )}
    </svg>
  );
}

function LiveMetric({ label, value, unit, raw, good, warn }) {
  const color = warn ? '#FF4343' : good === 'green' ? '#4FD66F' : '#fff';
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{label}</span>
      <span style={{ fontSize: 15, fontWeight: 600, color, fontVariantNumeric: 'tabular-nums', letterSpacing: -0.3 }}>
        {value}{unit && <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', marginLeft: 2, fontWeight: 500 }}>{unit}</span>}
      </span>
    </div>
  );
}

// =========================================================================
// REFERRAL FLOW — clinician sends patient to a network pro
// =========================================================================
function ReferralFlow({ onClose, preselect = null }) {
  const [step, setStep] = React.useState(preselect ? 1 : 0); // 0=pick pro, 1=pick patient+reason, 2=sent
  const [pro, setPro] = React.useState(preselect);
  const [patient, setPatient] = React.useState('Conor Murphy');
  const [reason, setReason] = React.useState('Glute activation & core stability — hip deficit identified.');

  const pros = [
    { name: 'Laura Fitzgerald', role: 'Pilates instructor', clinic: 'Stillorgan Pilates Studio', dist: '2.3 km', verified: true, match: 94 },
    { name: 'Mark O\'Sullivan',  role: 'S&C coach',          clinic: 'Blackrock Performance',    dist: '4.1 km', verified: true, match: 89 },
    { name: 'Siobhán Walsh',     role: 'Yoga therapist',     clinic: 'Dún Laoghaire Wellness',   dist: '6.7 km', verified: true, match: 72 },
  ];

  return (
    <div style={{
      position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      animation: 'fadeIn 0.2s ease', zIndex: 100,
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        width: 560, maxHeight: '85vh', background: '#fff', borderRadius: 16,
        overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,0.25)',
        display: 'flex', flexDirection: 'column',
        animation: 'slideUp 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
      }}>
        {/* header */}
        <div style={{ padding: '18px 24px', borderBottom: `1px solid ${CBX.line}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 10, color: CBX.ink3, fontWeight: 600, letterSpacing: 1.4, textTransform: 'uppercase' }}>
              Network referral · Step {step + 1} of 3
            </div>
            <div style={{ fontSize: 17, fontWeight: 600, color: CBX.ink, letterSpacing: -0.3, marginTop: 4 }}>
              {step === 0 && 'Select a network pro'}
              {step === 1 && 'Who and why'}
              {step === 2 && 'Referral sent'}
            </div>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', cursor: 'pointer',
            width: 28, height: 28, borderRadius: 14, color: CBX.ink3, fontSize: 16, fontFamily: 'inherit' }}>×</button>
        </div>

        {/* body */}
        <div style={{ flex: 1, overflow: 'auto', padding: 24 }}>
          {step === 0 && (
            <>
              <div style={{ fontSize: 12, color: CBX.ink3, marginBottom: 14 }}>
                Matched to Conor's condition & location. All pros in your network have shared outcome data.
              </div>
              {pros.map((x, i) => (
                <button key={x.name} onClick={() => { setPro(x); setStep(1); }} style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: 12,
                  padding: 14, borderRadius: 12, border: `1px solid ${CBX.line}`,
                  background: '#fff', cursor: 'pointer', fontFamily: 'inherit', marginBottom: 8,
                  textAlign: 'left',
                  transition: 'all 0.15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = CBX.green; e.currentTarget.style.transform = 'translateX(2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = CBX.line; e.currentTarget.style.transform = 'translateX(0)'; }}
                >
                  <div style={{ width: 42, height: 42, borderRadius: 21, background: CBX.greenSoft,
                    color: CBX.green, fontSize: 13, fontWeight: 600,
                    display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {x.name.split(' ').map(s => s[0]).join('').slice(0,2)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 14, fontWeight: 600, color: CBX.ink }}>{x.name}</span>
                      {x.verified && <svg width="13" height="13" viewBox="0 0 13 13"><path d="M6.5 1l1.5 1.2 1.9.2.2 1.9L11.3 5.8 11 7.6l-1.2 1.5-.2 1.9-1.9.2L6.5 12.5 4.7 11.2 2.8 11l-.2-1.9L1.3 7.6 1.6 5.8l1.2-1.5.2-1.9 1.9-.2L6.5 1z" fill={CBX.green}/><path d="M4 6.5l1.8 1.8L9 5" stroke="#fff" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </div>
                    <div style={{ fontSize: 12, color: CBX.ink3, marginTop: 2 }}>
                      {x.role} · {x.clinic} · {x.dist}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 11, color: CBX.ink3, fontWeight: 500, letterSpacing: 0.4 }}>Match</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: x.match >= 85 ? CBX.green : CBX.ink, fontVariantNumeric: 'tabular-nums', marginTop: 2 }}>{x.match}%</div>
                  </div>
                </button>
              ))}
            </>
          )}

          {step === 1 && pro && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 14,
                borderRadius: 12, background: CBX.greenSoft, marginBottom: 20 }}>
                <div style={{ width: 36, height: 36, borderRadius: 18, background: CBX.green, color: '#fff',
                  fontSize: 12, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {pro.name.split(' ').map(s => s[0]).join('').slice(0,2)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: CBX.ink }}>{pro.name}</div>
                  <div style={{ fontSize: 11, color: CBX.ink3, marginTop: 2 }}>{pro.role} · {pro.clinic}</div>
                </div>
                <button onClick={() => setStep(0)} style={{ fontSize: 11, fontWeight: 500, color: CBX.green,
                  background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>Change</button>
              </div>

              <div style={{ fontSize: 11, color: CBX.ink3, fontWeight: 500, letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 8 }}>Patient</div>
              <select value={patient} onChange={e => setPatient(e.target.value)} style={{
                width: '100%', height: 40, padding: '0 12px', borderRadius: 8, border: `1px solid ${CBX.line}`,
                fontSize: 14, color: CBX.ink, background: '#fff', fontFamily: 'inherit', marginBottom: 18,
              }}>
                <option>Conor Murphy</option>
                <option>Aoife O'Brien</option>
                <option>Daniel Keane</option>
              </select>

              <div style={{ fontSize: 11, color: CBX.ink3, fontWeight: 500, letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 8 }}>Reason for referral</div>
              <textarea value={reason} onChange={e => setReason(e.target.value)} style={{
                width: '100%', minHeight: 80, padding: 12, borderRadius: 8, border: `1px solid ${CBX.line}`,
                fontSize: 13, color: CBX.ink, fontFamily: 'inherit', resize: 'vertical', marginBottom: 18,
                lineHeight: 1.5,
              }}/>

              <div style={{ fontSize: 11, color: CBX.ink3, fontWeight: 500, letterSpacing: 0.6, textTransform: 'uppercase', marginBottom: 10 }}>Shared data</div>
              <div style={{ border: `1px solid ${CBX.line}`, borderRadius: 10, padding: 14 }}>
                {[
                  { l: 'Last 4 weeks of adherence + pain', on: true },
                  { l: 'Current protocol + AI insights',    on: true },
                  { l: 'Clinical notes & SOAP',             on: false },
                ].map((r, i) => (
                  <label key={i} style={{ display: 'flex', alignItems: 'center', gap: 10,
                    padding: '8px 0', cursor: 'pointer' }}>
                    <div style={{
                      width: 30, height: 18, borderRadius: 9, padding: 2,
                      background: r.on ? CBX.green : '#E5E5E2',
                      display: 'flex', alignItems: 'center',
                      justifyContent: r.on ? 'flex-end' : 'flex-start',
                      transition: 'all 0.2s',
                    }}>
                      <div style={{ width: 14, height: 14, borderRadius: 7, background: '#fff' }}/>
                    </div>
                    <span style={{ fontSize: 13, color: CBX.ink2 }}>{r.l}</span>
                  </label>
                ))}
              </div>
            </>
          )}

          {step === 2 && pro && (
            <div style={{ padding: '20px 0', textAlign: 'center' }}>
              <div style={{
                width: 72, height: 72, borderRadius: 36, background: CBX.greenSoft,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 18px',
                animation: 'scaleIn 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
              }}>
                <svg width="32" height="32" viewBox="0 0 32 32">
                  <path d="M8 16l5 5 11-11" stroke={CBX.green} strokeWidth="2.5" fill="none"
                    strokeLinecap="round" strokeLinejoin="round"
                    style={{ strokeDasharray: 40, strokeDashoffset: 40, animation: 'dash 0.5s 0.2s forwards ease-out' }}/>
                </svg>
              </div>
              <div style={{ fontSize: 19, fontWeight: 600, color: CBX.ink, letterSpacing: -0.3 }}>Referral sent to {pro.name}</div>
              <div style={{ fontSize: 13, color: CBX.ink3, marginTop: 8, lineHeight: 1.5 }}>
                {pro.name.split(' ')[0]} will see {patient}'s shared data and reach out directly.<br/>
                You'll receive outcome updates in the Network tab.
              </div>
              <div style={{ marginTop: 20, padding: 14, background: '#FAFAF8', borderRadius: 10,
                fontSize: 11, color: CBX.ink3, lineHeight: 1.5, letterSpacing: 0.2 }}>
                Logged: <span style={{ color: CBX.ink, fontWeight: 500 }}>14:32 · Tue 14 Apr</span>
                <span style={{ margin: '0 8px', color: CBX.ink4 }}>·</span>
                Ref# <span style={{ fontFamily: 'ui-monospace, Menlo, monospace', color: CBX.ink }}>RCV-2849</span>
              </div>
            </div>
          )}
        </div>

        {/* footer */}
        {step < 2 && (
          <div style={{ padding: 16, borderTop: `1px solid ${CBX.line}`, display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
            <button onClick={step === 1 ? () => setStep(0) : onClose} style={{
              height: 36, padding: '0 16px', borderRadius: 8, border: `1px solid ${CBX.line}`,
              background: '#fff', color: CBX.ink2, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
            }}>{step === 1 ? 'Back' : 'Cancel'}</button>
            <button onClick={() => step === 0 ? null : setStep(2)} disabled={step === 0 && !pro} style={{
              height: 36, padding: '0 16px', borderRadius: 8, border: 'none', cursor: step === 0 ? 'default' : 'pointer',
              background: step === 0 ? '#E5E5E2' : CBX.ink, color: step === 0 ? CBX.ink3 : '#fff',
              fontSize: 12, fontWeight: 600, fontFamily: 'inherit',
            }}>{step === 0 ? 'Select a pro →' : 'Send referral'}</button>
          </div>
        )}
        {step === 2 && (
          <div style={{ padding: 16, borderTop: `1px solid ${CBX.line}`, display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={onClose} style={{
              height: 36, padding: '0 20px', borderRadius: 8, border: 'none', cursor: 'pointer',
              background: CBX.ink, color: '#fff', fontSize: 12, fontWeight: 600, fontFamily: 'inherit',
            }}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
}

// =========================================================================
// CLINIC ANALYTICS — new deep-dive card for ReportsView
// =========================================================================
function AnalyticsDetail() {
  // Cohort comparison: Recovera vs traditional
  const cohorts = [
    { label: 'Recovera patients (n=121)', weeks: 14.2, pain: 72, adherence: 78, color: CBX.green },
    { label: 'Traditional cohort (n=318)', weeks: 18.6, pain: 54, adherence: 52, color: '#B8B8B2' },
  ];
  return (
    <div style={{ border: `1px solid ${CBX.line}`, borderRadius: 14, padding: 22, background: '#fff', marginBottom: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div>
          <div style={{ fontSize: 11, color: CBX.ink3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.2 }}>Outcome benchmarking</div>
          <div style={{ fontSize: 16, fontWeight: 600, color: CBX.ink, letterSpacing: -0.2, marginTop: 4 }}>Recovera vs traditional care · Q1 2026</div>
        </div>
        <button style={{
          height: 30, padding: '0 12px', borderRadius: 7, border: `1px solid ${CBX.line}`,
          background: '#fff', color: CBX.ink2, fontSize: 11, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
        }}>Export report ↓</button>
      </div>

      {/* 3 side-by-side delta cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 20 }}>
        <DeltaCard label="Avg recovery time" rec="14.2 wks" trad="18.6 wks" delta="-24%" positive/>
        <DeltaCard label="Patient-reported pain ↓" rec="72%" trad="54%" delta="+18 pts" positive/>
        <DeltaCard label="Protocol adherence" rec="78%" trad="52%" delta="+26 pts" positive/>
      </div>

      {/* Condition mix horizontal bars */}
      <div style={{ fontSize: 11, color: CBX.ink3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 12 }}>Condition mix · this clinic</div>
      <div>
        {[
          { c: 'ACL reconstruction', n: 38, pct: 31, wks: 16.2, baseline: 20.4 },
          { c: 'Rotator cuff',       n: 24, pct: 20, wks: 12.8, baseline: 15.2 },
          { c: 'Lower back',         n: 22, pct: 18, wks: 9.4,  baseline: 12.1 },
          { c: 'Achilles',           n: 18, pct: 15, wks: 13.1, baseline: 16.8 },
          { c: 'Other',              n: 19, pct: 16, wks: 11.0, baseline: 14.5 },
        ].map((r, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '8px 0' }}>
            <div style={{ width: 150, fontSize: 13, color: CBX.ink, fontWeight: 500 }}>{r.c}</div>
            <div style={{ width: 36, fontSize: 12, color: CBX.ink3, fontVariantNumeric: 'tabular-nums' }}>{r.n}</div>
            <div style={{ flex: 1, height: 22, borderRadius: 4, background: '#F4F4F2', position: 'relative', overflow: 'hidden' }}>
              <div style={{
                position: 'absolute', top: 0, bottom: 0, left: 0, width: `${r.pct * 3}%`,
                background: `linear-gradient(90deg, ${CBX.green}, ${CBX.greenDim})`,
                borderRadius: 4,
                animation: `growBar 0.9s ${i * 0.08}s cubic-bezier(0.22, 1, 0.36, 1) both`,
                transformOrigin: 'left',
              }}/>
              <div style={{
                position: 'absolute', top: 0, bottom: 0, right: 8,
                display: 'flex', alignItems: 'center',
                fontSize: 11, color: CBX.ink3, fontVariantNumeric: 'tabular-nums', fontWeight: 500,
              }}>
                {r.wks}w <span style={{ color: CBX.green, marginLeft: 6 }}>vs {r.baseline}w</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 18, padding: 14, background: '#FAFAF8', borderRadius: 10, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <div style={{ width: 24, height: 24, borderRadius: 6, background: CBX.green,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="12" height="12" viewBox="0 0 12 12"><path d="M6 1v10M1 6h10" stroke="#fff" strokeWidth="1.6" strokeLinecap="round"/></svg>
        </div>
        <div style={{ flex: 1, fontSize: 12, color: CBX.ink2, lineHeight: 1.55 }}>
          Your ACL cohort finishes <strong style={{ color: CBX.green, fontWeight: 600 }}>4.2 weeks earlier</strong> than the traditional-care baseline — the largest gain in your practice. Consider spotlighting ACL outcomes in your next insurer report.
        </div>
      </div>
    </div>
  );
}

function DeltaCard({ label, rec, trad, delta, positive }) {
  return (
    <div style={{ border: `1px solid ${CBX.line}`, borderRadius: 10, padding: 14 }}>
      <div style={{ fontSize: 10, color: CBX.ink3, fontWeight: 500, letterSpacing: 1, textTransform: 'uppercase' }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 10 }}>
        <span style={{ fontSize: 22, fontWeight: 600, color: CBX.ink, letterSpacing: -0.4, fontVariantNumeric: 'tabular-nums' }}>{rec}</span>
        <span style={{ fontSize: 11, color: positive ? CBX.green : CBX.red, fontWeight: 600,
          padding: '2px 6px', borderRadius: 4, background: positive ? CBX.greenSoft : CBX.redBg }}>{delta}</span>
      </div>
      <div style={{ fontSize: 11, color: CBX.ink3, marginTop: 6 }}>
        Traditional: <span style={{ fontVariantNumeric: 'tabular-nums', color: CBX.ink2 }}>{trad}</span>
      </div>
    </div>
  );
}

Object.assign(window, { LiveSession, ReferralFlow, AnalyticsDetail });
