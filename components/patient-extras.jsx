// Patient extras — Day 1 onboarding + Before/With Recovera comparison
const PBX = window.PATIENT_BRAND;

// =========================================================================
// DAY 1 ONBOARDING FLOW
// =========================================================================
function Day1Flow({ onFinish }) {
  const [step, setStep] = React.useState(0);
  const steps = ['welcome', 'pain', 'goal', 'scan', 'plan'];
  const next = () => setStep(s => Math.min(steps.length - 1, s + 1));
  const cur = steps[step];

  return (
    <div style={{
      position: 'absolute', inset: 0, background: '#fff',
      fontFamily: "'Inter', system-ui, sans-serif",
      display: 'flex', flexDirection: 'column', overflow: 'hidden',
    }}>
      {/* Progress dots */}
      <div style={{ padding: '60px 24px 20px', display: 'flex', gap: 6, alignItems: 'center' }}>
        {step > 0 && (
          <button onClick={() => setStep(s => s - 1)} style={{
            background: 'transparent', border: 'none', cursor: 'pointer',
            color: PBX.ink3, fontSize: 20, fontFamily: 'inherit', padding: 0, marginRight: 8,
          }}>‹</button>
        )}
        {steps.map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 3, borderRadius: 2,
            background: i <= step ? PBX.green : '#EFEEEA',
            transition: 'background 0.3s',
          }}/>
        ))}
      </div>

      <div style={{ flex: 1, overflow: 'auto', padding: '24px 28px' }}>
        {cur === 'welcome' && (
          <div style={{ animation: 'slideUp 0.4s cubic-bezier(0.22, 1, 0.36, 1)' }}>
            <div style={{ fontSize: 13, color: PBX.green, fontWeight: 600, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 12 }}>
              Invited by Dr. Sarah Nolan
            </div>
            <div style={{ fontSize: 34, fontWeight: 600, color: PBX.ink, letterSpacing: -1.2, lineHeight: 1.1, marginBottom: 16 }}>
              Let's get your knee back to 100%.
            </div>
            <div style={{ fontSize: 15, color: PBX.ink2, lineHeight: 1.55 }}>
              Sarah set up a personalised recovery plan for your ACL reconstruction. We'll take 3 minutes to tune it to you.
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 32 }}>
              {[
                { n: 1, l: 'A quick baseline', s: '2 questions · 30s' },
                { n: 2, l: 'One movement scan', s: 'Front-facing camera · 60s' },
                { n: 3, l: 'Your plan, ready',  s: 'Updated weekly with Sarah' },
              ].map(r => (
                <div key={r.n} style={{
                  display: 'flex', alignItems: 'center', gap: 14, padding: 14,
                  border: `1px solid ${PBX.line}`, borderRadius: 12,
                }}>
                  <div style={{
                    width: 30, height: 30, borderRadius: 15, background: PBX.greenSoft,
                    color: PBX.green, fontSize: 13, fontWeight: 600,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>{r.n}</div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: PBX.ink }}>{r.l}</div>
                    <div style={{ fontSize: 12, color: PBX.ink3, marginTop: 2 }}>{r.s}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {cur === 'pain' && (
          <div style={{ animation: 'slideUp 0.4s cubic-bezier(0.22, 1, 0.36, 1)' }}>
            <div style={{ fontSize: 26, fontWeight: 600, color: PBX.ink, letterSpacing: -0.8, lineHeight: 1.15, marginBottom: 10 }}>
              How much pain are you in today?
            </div>
            <div style={{ fontSize: 13, color: PBX.ink3, marginBottom: 28 }}>
              Sarah needs a baseline. You can update this anytime.
            </div>
            <PainScaleSelect/>
          </div>
        )}

        {cur === 'goal' && (
          <div style={{ animation: 'slideUp 0.4s cubic-bezier(0.22, 1, 0.36, 1)' }}>
            <div style={{ fontSize: 26, fontWeight: 600, color: PBX.ink, letterSpacing: -0.8, lineHeight: 1.15, marginBottom: 10 }}>
              What matters most to you?
            </div>
            <div style={{ fontSize: 13, color: PBX.ink3, marginBottom: 24 }}>
              This will shape your plan.
            </div>
            <GoalPicker/>
          </div>
        )}

        {cur === 'scan' && (
          <div style={{ animation: 'slideUp 0.4s cubic-bezier(0.22, 1, 0.36, 1)' }}>
            <div style={{ fontSize: 26, fontWeight: 600, color: PBX.ink, letterSpacing: -0.8, lineHeight: 1.15, marginBottom: 10 }}>
              Quick movement scan.
            </div>
            <div style={{ fontSize: 13, color: PBX.ink3, marginBottom: 24 }}>
              Prop your phone against something stable. Do 3 slow squats.
            </div>

            <div style={{ position: 'relative', borderRadius: 18, overflow: 'hidden',
              background: 'linear-gradient(180deg, #1C2A21 0%, #0B120D 100%)',
              height: 340, marginBottom: 16,
              border: `1px solid ${PBX.line}`,
            }}>
              <ScanSkeleton/>
              <div style={{
                position: 'absolute', top: 16, left: 16, right: 16,
                display: 'flex', alignItems: 'center', gap: 8,
              }}>
                <div style={{ width: 7, height: 7, borderRadius: 3.5, background: '#FF4343', animation: 'pulse 1.4s ease-in-out infinite' }}/>
                <span style={{ fontSize: 10, color: '#fff', opacity: 0.7, letterSpacing: 1.4, fontWeight: 600, textTransform: 'uppercase' }}>Scanning · 00:42</span>
                <div style={{ flex: 1 }}/>
                <span style={{ fontSize: 11, color: '#4FD66F', fontWeight: 600 }}>2 / 3 reps</span>
              </div>
              <div style={{
                position: 'absolute', bottom: 16, left: 16, right: 16,
                padding: 10, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(8px)',
                borderRadius: 10, color: '#fff',
              }}>
                <div style={{ fontSize: 11, opacity: 0.6, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 600 }}>Guidance</div>
                <div style={{ fontSize: 13, marginTop: 4 }}>Stand tall. Slow squat to your comfortable depth.</div>
              </div>
            </div>
          </div>
        )}

        {cur === 'plan' && (
          <div style={{ animation: 'slideUp 0.4s cubic-bezier(0.22, 1, 0.36, 1)' }}>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20 }}>
              <div style={{
                width: 72, height: 72, borderRadius: 36, background: PBX.greenSoft,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                animation: 'scaleIn 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
              }}>
                <svg width="32" height="32" viewBox="0 0 32 32">
                  <path d="M8 16l5 5 11-11" stroke={PBX.green} strokeWidth="2.5" fill="none"
                    strokeLinecap="round" strokeLinejoin="round"
                    style={{ strokeDasharray: 40, strokeDashoffset: 40, animation: 'dash 0.5s 0.2s forwards ease-out' }}/>
                </svg>
              </div>
            </div>
            <div style={{ fontSize: 28, fontWeight: 600, color: PBX.ink, letterSpacing: -1, lineHeight: 1.15, marginBottom: 10, textAlign: 'center' }}>
              Your plan is ready.
            </div>
            <div style={{ fontSize: 14, color: PBX.ink3, marginBottom: 28, textAlign: 'center', lineHeight: 1.55 }}>
              16 weeks. Updated weekly with Sarah.<br/>
              First session: <strong style={{ color: PBX.ink }}>today, 4:30 PM</strong>
            </div>

            <div style={{
              border: `1px solid ${PBX.line}`, borderRadius: 14, padding: 18, marginBottom: 14,
            }}>
              <div style={{ fontSize: 10, color: PBX.ink3, fontWeight: 600, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 10 }}>Week 1 focus</div>
              {[
                'Range of motion',
                'Gentle activation',
                'Swelling control',
              ].map((l, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 0' }}>
                  <div style={{ width: 4, height: 4, borderRadius: 2, background: PBX.green }}/>
                  <span style={{ fontSize: 14, color: PBX.ink2 }}>{l}</span>
                </div>
              ))}
            </div>

            <div style={{ padding: 14, background: PBX.greenSoft, borderRadius: 12, display: 'flex', gap: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 16, background: PBX.green, color: '#fff', fontSize: 11, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>SN</div>
              <div style={{ flex: 1, fontSize: 13, color: PBX.green, lineHeight: 1.5 }}>
                <strong style={{ fontWeight: 600 }}>Sarah:</strong> Welcome Conor. Let's take it steady in week 1. Message me anytime.
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ padding: '16px 24px 44px', borderTop: `1px solid ${PBX.line}` }}>
        <button onClick={step === steps.length - 1 ? onFinish : next} style={{
          width: '100%', height: 52, borderRadius: 14, border: 'none',
          background: PBX.green, color: '#fff', fontSize: 15, fontWeight: 600, cursor: 'pointer',
          fontFamily: 'inherit', letterSpacing: -0.2,
        }}>
          {cur === 'welcome' && 'Get started →'}
          {cur === 'pain' && 'Continue'}
          {cur === 'goal' && 'Continue'}
          {cur === 'scan' && 'Finish scan'}
          {cur === 'plan' && 'Enter Recovera'}
        </button>
      </div>
    </div>
  );
}

function PainScaleSelect() {
  const [v, setV] = React.useState(null);
  return (
    <>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(11, 1fr)', gap: 4 }}>
        {Array.from({ length: 11 }).map((_, i) => {
          const active = v === i;
          const tone = i <= 3 ? PBX.green : i <= 6 ? '#E89D3F' : PBX.red;
          return (
            <button key={i} onClick={() => setV(i)} style={{
              height: 44, borderRadius: 8,
              border: active ? `2px solid ${tone}` : `1px solid ${PBX.line}`,
              background: active ? tone : '#fff',
              color: active ? '#fff' : PBX.ink,
              fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit',
              fontVariantNumeric: 'tabular-nums',
              transition: 'all 0.12s',
            }}>{i}</button>
          );
        })}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11, color: PBX.ink3 }}>
        <span>None</span><span>Worst I've had</span>
      </div>

      <div style={{ marginTop: 36 }}>
        <div style={{ fontSize: 20, fontWeight: 600, color: PBX.ink, letterSpacing: -0.4, marginBottom: 12 }}>Where is the pain?</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {['Front of knee', 'Side of knee', 'Behind knee', 'Calf', 'Thigh'].map(t => (
            <button key={t} style={{
              padding: '10px 14px', borderRadius: 24, border: `1px solid ${PBX.line}`,
              background: '#fff', color: PBX.ink2, fontSize: 13, cursor: 'pointer', fontFamily: 'inherit',
            }}>{t}</button>
          ))}
        </div>
      </div>
    </>
  );
}

function GoalPicker() {
  const goals = [
    { icon: '🏃', l: 'Run pain-free again', d: '5K by month 4' },
    { icon: '🪜', l: 'Get up stairs without thinking', d: 'Daily life' },
    { icon: '⚽', l: 'Return to sport',             d: 'Pivot & land safely' },
    { icon: '🧘', l: 'Full range of motion',         d: 'Deep squat, no stiffness' },
  ];
  const [sel, setSel] = React.useState(0);
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {goals.map((g, i) => {
        const active = sel === i;
        return (
          <button key={i} onClick={() => setSel(i)} style={{
            display: 'flex', alignItems: 'center', gap: 14, padding: 16,
            borderRadius: 14, cursor: 'pointer', fontFamily: 'inherit', textAlign: 'left',
            border: active ? `1.5px solid ${PBX.green}` : `1px solid ${PBX.line}`,
            background: active ? PBX.greenSoft : '#fff',
            transition: 'all 0.15s',
          }}>
            <div style={{ fontSize: 24 }}>{g.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: PBX.ink }}>{g.l}</div>
              <div style={{ fontSize: 12, color: PBX.ink3, marginTop: 2 }}>{g.d}</div>
            </div>
            <div style={{
              width: 22, height: 22, borderRadius: 11,
              border: active ? 'none' : `1.5px solid ${PBX.line}`,
              background: active ? PBX.green : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {active && <svg width="12" height="12" viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            </div>
          </button>
        );
      })}
    </div>
  );
}

function ScanSkeleton() {
  const [t, setT] = React.useState(0);
  React.useEffect(() => {
    const t0 = performance.now(); let raf;
    const tick = (now) => { setT((now - t0) / 1000); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);
  const phase = (Math.sin(t * Math.PI / 1.8) + 1) / 2;
  const depth = 60 * phase;
  const hip = 170 + depth * 0.7;
  const knee = 230 + depth * 0.3;
  return (
    <svg viewBox="0 0 320 340" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
      <circle cx="160" cy={hip} r="62" fill="#4FD66F" opacity="0.1"/>
      <circle cx="160" cy="100" r="18" fill="none" stroke="#4FD66F" strokeWidth="2"/>
      <line x1="160" y1="118" x2="160" y2={hip} stroke="#4FD66F" strokeWidth="2.4" strokeLinecap="round"/>
      <line x1="160" y1="142" x2="130" y2={180 + depth * 0.3} stroke="#4FD66F" strokeWidth="2" strokeLinecap="round"/>
      <line x1="160" y1="142" x2="190" y2={180 + depth * 0.3} stroke="#4FD66F" strokeWidth="2" strokeLinecap="round"/>
      <line x1="160" y1={hip} x2="140" y2={knee} stroke="#4FD66F" strokeWidth="2.4" strokeLinecap="round"/>
      <line x1="140" y1={knee} x2="128" y2="300" stroke="#4FD66F" strokeWidth="2.4" strokeLinecap="round"/>
      <line x1="160" y1={hip} x2="180" y2={knee} stroke="#4FD66F" strokeWidth="2.4" strokeLinecap="round"/>
      <line x1="180" y1={knee} x2="192" y2="300" stroke="#4FD66F" strokeWidth="2.4" strokeLinecap="round"/>
      <circle cx="160" cy={hip} r="4" fill="#4FD66F"/>
      <circle cx="140" cy={knee} r="4" fill="#4FD66F"/>
      <circle cx="180" cy={knee} r="4" fill="#4FD66F"/>
    </svg>
  );
}

// =========================================================================
// BEFORE / WITH RECOVERA COMPARISON (inside phone frame)
// =========================================================================
function ComparisonView({ onClose }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, background: '#FAFAF8', overflow: 'auto',
      fontFamily: "'Inter', system-ui, sans-serif",
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '52px 20px 12px' }}>
        <button onClick={onClose} style={{
          background: 'transparent', border: 'none', cursor: 'pointer', padding: 0,
          fontSize: 22, color: PBX.ink3, fontFamily: 'inherit', lineHeight: 1,
        }}>‹</button>
        <div style={{ fontSize: 15, fontWeight: 600, color: PBX.ink }}>Why Recovera</div>
      </div>

      <div style={{ padding: '12px 20px 40px' }}>
        <div style={{ fontSize: 11, color: PBX.green, fontWeight: 600, letterSpacing: 1.6, textTransform: 'uppercase', marginBottom: 10 }}>
          For Conor · ACL recovery
        </div>
        <div style={{ fontSize: 28, fontWeight: 600, color: PBX.ink, letterSpacing: -1, lineHeight: 1.1, marginBottom: 22 }}>
          Two ways to recover.
        </div>

        {/* Before card */}
        <div style={{
          padding: 20, borderRadius: 16, background: '#fff',
          border: `1px solid ${PBX.line}`, marginBottom: 14,
        }}>
          <div style={{ fontSize: 10, color: PBX.ink3, fontWeight: 600, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 12 }}>Traditional care</div>
          <div style={{ fontSize: 19, fontWeight: 600, color: PBX.ink, letterSpacing: -0.4, marginBottom: 6 }}>
            20 weeks
          </div>
          <div style={{ fontSize: 13, color: PBX.ink3, lineHeight: 1.5, marginBottom: 16 }}>
            In-clinic sessions, paper exercise sheets, no data between visits.
          </div>

          {[
            { l: 'Session frequency', v: '2× per week (in clinic)' },
            { l: 'At-home guidance',   v: 'Paper sheet' },
            { l: 'Pain tracking',      v: 'Recall at next visit' },
            { l: 'Protocol updates',   v: 'Every 2–4 weeks' },
          ].map((r, i, a) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', padding: '10px 0',
              borderBottom: i < a.length - 1 ? `1px solid ${PBX.line}` : 'none',
            }}>
              <span style={{ fontSize: 12, color: PBX.ink3 }}>{r.l}</span>
              <span style={{ fontSize: 12, color: PBX.ink2, fontWeight: 500, textAlign: 'right', maxWidth: 180 }}>{r.v}</span>
            </div>
          ))}
        </div>

        {/* With Recovera card */}
        <div style={{
          padding: 20, borderRadius: 16,
          background: `linear-gradient(180deg, ${PBX.greenSoft} 0%, #fff 60%)`,
          border: `1.5px solid ${PBX.green}`, marginBottom: 20,
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: 14, right: 14,
            padding: '4px 8px', borderRadius: 12, background: PBX.green, color: '#fff',
            fontSize: 10, fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase',
          }}>Your plan</div>

          <div style={{ fontSize: 10, color: PBX.green, fontWeight: 600, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 12 }}>With Recovera</div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginBottom: 6 }}>
            <span style={{ fontSize: 30, fontWeight: 700, color: PBX.ink, letterSpacing: -1.2 }}>16 weeks</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: PBX.green, padding: '2px 8px', background: '#fff', borderRadius: 8 }}>–4 wks</span>
          </div>
          <div style={{ fontSize: 13, color: PBX.green, lineHeight: 1.5, marginBottom: 16 }}>
            One clinic visit, every session guided by Sarah at home.
          </div>

          {[
            { l: 'Session frequency', v: '4–5× per week (at home)' },
            { l: 'At-home guidance',   v: 'Live form checks + AI flags' },
            { l: 'Pain tracking',      v: 'Daily, takes 5 seconds' },
            { l: 'Protocol updates',   v: 'Weekly — based on your data' },
          ].map((r, i, a) => (
            <div key={i} style={{
              display: 'flex', justifyContent: 'space-between', padding: '10px 0',
              borderBottom: i < a.length - 1 ? `1px solid rgba(31,77,46,0.1)` : 'none',
            }}>
              <span style={{ fontSize: 12, color: PBX.green, opacity: 0.8 }}>{r.l}</span>
              <span style={{ fontSize: 12, color: PBX.ink, fontWeight: 500, textAlign: 'right', maxWidth: 190 }}>{r.v}</span>
            </div>
          ))}
        </div>

        {/* Stacked bars visualisation */}
        <div style={{
          padding: 20, borderRadius: 16, background: '#fff',
          border: `1px solid ${PBX.line}`, marginBottom: 14,
        }}>
          <div style={{ fontSize: 11, color: PBX.ink3, fontWeight: 600, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 14 }}>Visualised</div>
          <CompareBar label="Traditional" weeks={20} pct={100} color="#D4D3CE" light/>
          <div style={{ height: 10 }}/>
          <CompareBar label="Recovera" weeks={16} pct={80} color={PBX.green}/>
          <div style={{ fontSize: 12, color: PBX.ink3, marginTop: 14, lineHeight: 1.5 }}>
            Based on 121 Recovera patients vs 318 matched traditional-care cases across 3 Dublin clinics, Q1 2026.
          </div>
        </div>

        {/* Testimonial */}
        <div style={{
          padding: 20, borderRadius: 16, background: '#fff',
          border: `1px solid ${PBX.line}`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 20, background: PBX.greenSoft,
              color: PBX.green, fontSize: 13, fontWeight: 600,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>EH</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 600, color: PBX.ink }}>Eoin Hartnett</div>
              <div style={{ fontSize: 11, color: PBX.ink3, marginTop: 2 }}>ACL · finished in 15 weeks</div>
            </div>
          </div>
          <div style={{ fontSize: 14, color: PBX.ink2, lineHeight: 1.55, fontStyle: 'italic' }}>
            "I wasn't great at the paper sheets. Having Recovera watch my form meant I actually did the exercises — and did them right."
          </div>
        </div>
      </div>
    </div>
  );
}

function CompareBar({ label, weeks, pct, color, light }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 12, color: PBX.ink2, fontWeight: 500 }}>{label}</span>
        <span style={{ fontSize: 12, color: PBX.ink, fontWeight: 600, fontVariantNumeric: 'tabular-nums' }}>{weeks} weeks</span>
      </div>
      <div style={{ height: 22, borderRadius: 6, background: '#F4F4F2', overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${pct}%`,
          background: color,
          borderRadius: 6,
          animation: `growBar 1.1s 0.2s cubic-bezier(0.22, 1, 0.36, 1) both`,
          transformOrigin: 'left',
          position: 'relative',
        }}>
          {!light && (
            <div style={{
              position: 'absolute', inset: 0,
              background: 'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(255,255,255,0.1) 8px, rgba(255,255,255,0.1) 14px)',
            }}/>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { Day1Flow, ComparisonView });
