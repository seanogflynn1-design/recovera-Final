// Clinician professional identity layer — profile, clinic overview,
// and clinical workflow extensions (SOAP, billing, PDF export).

const CB2 = window.PATIENT_BRAND;

// Insurer logotypes — stylised text marks (placeholder brand pills)
function InsurerMark({ name, short, color }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '8px 12px', borderRadius: 8,
      border: `1px solid ${CB2.line}`, background: '#fff',
    }}>
      <div style={{
        width: 26, height: 26, borderRadius: 6, background: color, color: '#fff',
        fontSize: 10, fontWeight: 700, letterSpacing: 0.5,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>{short}</div>
      <div>
        <div style={{ fontSize: 12, fontWeight: 600, color: CB2.ink, letterSpacing: -0.1 }}>{name}</div>
        <div style={{ fontSize: 10, color: CB2.green, fontWeight: 500, marginTop: 1 }}>● Contracted</div>
      </div>
    </div>
  );
}

// Verified shield badge
function VerifiedBadge({ size = 'lg' }) {
  const S = size === 'lg' ? 1 : 0.7;
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: `${6 * S}px ${12 * S}px`, borderRadius: 999,
      background: CB2.green, color: '#fff',
    }}>
      <svg width={14 * S} height={14 * S} viewBox="0 0 14 14">
        <path d="M7 1l5 2v4c0 3-2.2 5.3-5 6-2.8-.7-5-3-5-6V3l5-2z" fill="#fff"/>
        <path d="M4.5 7l1.7 1.7L9.7 5.2" stroke={CB2.green} strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span style={{ fontSize: 11 * S, fontWeight: 600, letterSpacing: 1 * S, textTransform: 'uppercase' }}>
        Recovera Verified
      </span>
    </div>
  );
}

// ---- Profile view --------------------------------------------------------
function ClinicianProfileView({ onClose }) {
  return (
    <div style={{ overflow: 'auto', background: '#FAFAF8', height: '100%' }}>
      {/* Header band */}
      <div style={{
        background: '#fff', borderBottom: `1px solid ${CB2.line}`,
        padding: '28px 40px 32px', position: 'relative',
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: 18, right: 22,
          background: 'transparent', border: 'none', cursor: 'pointer',
          color: CB2.ink3, fontSize: 13, display: 'flex', alignItems: 'center', gap: 6,
          fontFamily: 'inherit',
        }}>
          Close
          <svg width="14" height="14" viewBox="0 0 14 14"><path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>
        </button>

        <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', maxWidth: 960 }}>
          <div style={{
            width: 84, height: 84, borderRadius: 42, background: CB2.green, color: '#fff',
            fontSize: 28, fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'center',
            letterSpacing: -0.5, flexShrink: 0,
          }}>ÁO</div>

          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
              <div style={{ fontSize: 26, fontWeight: 600, color: CB2.ink, letterSpacing: -0.6 }}>
                Dr. Áine O'Brien
              </div>
              <span style={{ fontSize: 15, color: CB2.ink3, fontWeight: 500 }}>MISCP</span>
            </div>
            <div style={{ fontSize: 14, color: CB2.ink2, marginBottom: 14 }}>
              Chartered Physiotherapist · ACL rehabilitation, sports injuries
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <VerifiedBadge/>
              <span style={{ fontSize: 12, color: CB2.ink3, display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="12" height="12" viewBox="0 0 12 12"><rect x="2" y="3" width="8" height="7" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none"/><path d="M2 5h8M4 2v2M8 2v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/></svg>
                MISCP Reg. <span style={{ fontFamily: 'ui-monospace, Menlo, monospace', color: CB2.ink2 }}>PT12847</span>
              </span>
              <span style={{ fontSize: 12, color: CB2.ink3, display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="12" height="12" viewBox="0 0 12 12"><path d="M6 1C3.8 1 2 2.8 2 5c0 3 4 6 4 6s4-3 4-6c0-2.2-1.8-4-4-4z" stroke="currentColor" strokeWidth="1.2" fill="none"/><circle cx="6" cy="5" r="1.3" fill="currentColor"/></svg>
                Dublin Physio Co · Blackrock, Co. Dublin
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{
              height: 34, padding: '0 14px', borderRadius: 8,
              border: `1px solid ${CB2.line}`, background: '#fff',
              color: CB2.ink2, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
            }}>Share profile</button>
            <button style={{
              height: 34, padding: '0 14px', borderRadius: 8, border: 'none',
              background: CB2.ink, color: '#fff', fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
            }}>Edit profile</button>
          </div>
        </div>
      </div>

      <div style={{ padding: '28px 40px 40px', maxWidth: 960 }}>
        {/* Outcome stats */}
        <div style={{ fontSize: 11, color: CB2.ink3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.4, marginBottom: 12 }}>Clinical outcomes</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 28 }}>
          <div style={{ border: `1px solid ${CB2.line}`, borderRadius: 12, padding: 18, background: '#fff' }}>
            <div style={{ fontSize: 11, color: CB2.ink3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 10 }}>Patients treated</div>
            <div style={{ fontSize: 28, fontWeight: 600, color: CB2.ink, letterSpacing: -0.8, fontVariantNumeric: 'tabular-nums' }}>147</div>
            <div style={{ fontSize: 11, color: CB2.ink3, marginTop: 4 }}>through Recovera</div>
          </div>
          <div style={{ border: `1px solid ${CB2.line}`, borderRadius: 12, padding: 18, background: '#fff' }}>
            <div style={{ fontSize: 11, color: CB2.ink3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 10 }}>Adherence rate</div>
            <div style={{ fontSize: 28, fontWeight: 600, color: CB2.green, letterSpacing: -0.8, fontVariantNumeric: 'tabular-nums' }}>94%</div>
            <div style={{ fontSize: 11, color: CB2.green, marginTop: 4 }}>↑ 16 pts vs. national avg</div>
          </div>
          <div style={{ border: `1px solid ${CB2.line}`, borderRadius: 12, padding: 18, background: '#fff' }}>
            <div style={{ fontSize: 11, color: CB2.ink3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 10 }}>Avg Recovera Score</div>
            <div style={{ fontSize: 28, fontWeight: 600, color: CB2.ink, letterSpacing: -0.8, fontVariantNumeric: 'tabular-nums' }}>4.8<span style={{ fontSize: 16, color: CB2.ink3, fontWeight: 400 }}>/5</span></div>
            <div style={{ fontSize: 11, color: CB2.ink3, marginTop: 4 }}>from 112 patients</div>
          </div>
          <div style={{ border: `1px solid ${CB2.line}`, borderRadius: 12, padding: 18, background: '#fff' }}>
            <div style={{ fontSize: 11, color: CB2.ink3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 10 }}>Avg recovery time</div>
            <div style={{ fontSize: 28, fontWeight: 600, color: CB2.ink, letterSpacing: -0.8, fontVariantNumeric: 'tabular-nums' }}>13.8<span style={{ fontSize: 16, color: CB2.ink3, fontWeight: 400 }}>wks</span></div>
            <div style={{ fontSize: 11, color: CB2.green, marginTop: 4 }}>↓ 2.4 wks vs. benchmark</div>
          </div>
        </div>

        {/* Two col — CPD + Insurers */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
          <div style={{ border: `1px solid ${CB2.line}`, borderRadius: 14, padding: 22, background: '#fff' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ fontSize: 11, color: CB2.ink3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.2 }}>CPD · Recovera Academy</div>
              <span style={{ fontSize: 11, color: CB2.green, fontWeight: 500 }}>On track</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 10 }}>
              <div style={{ fontSize: 34, fontWeight: 600, color: CB2.ink, letterSpacing: -0.8, fontVariantNumeric: 'tabular-nums' }}>12.5</div>
              <div style={{ fontSize: 13, color: CB2.ink3 }}>hours logged · 20 required</div>
            </div>
            <div style={{ height: 6, background: CB2.greenSoft, borderRadius: 3, overflow: 'hidden', marginBottom: 14 }}>
              <div style={{ width: '62.5%', height: '100%', background: CB2.green, borderRadius: 3 }}/>
            </div>
            <div style={{ fontSize: 11, color: CB2.ink3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 10 }}>Recent modules</div>
            {[
              { t: 'ACL graft selection & return-to-sport criteria', h: 3.5, done: true },
              { t: 'Movement analysis · interpreting asymmetry data', h: 4.0, done: true },
              { t: 'Motivational interviewing for adherence', h: 2.0, done: true },
              { t: 'Tendinopathy loading protocols · 2026 update', h: 3.0, done: false },
            ].map((m, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0',
                borderTop: i > 0 ? `1px solid ${CB2.line}` : 'none' }}>
                <div style={{ width: 16, height: 16, borderRadius: 8, flexShrink: 0,
                  background: m.done ? CB2.green : '#fff',
                  border: m.done ? 'none' : `1.5px solid ${CB2.line}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {m.done && <svg width="8" height="8" viewBox="0 0 8 8"><path d="M1 4l2 2 4-4" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
                <div style={{ flex: 1, fontSize: 12.5, color: m.done ? CB2.ink2 : CB2.ink, fontWeight: 500 }}>{m.t}</div>
                <div style={{ fontSize: 11, color: CB2.ink3, fontVariantNumeric: 'tabular-nums' }}>{m.h}h</div>
              </div>
            ))}
          </div>

          <div style={{ border: `1px solid ${CB2.line}`, borderRadius: 14, padding: 22, background: '#fff' }}>
            <div style={{ fontSize: 11, color: CB2.ink3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 14 }}>Insurer panel</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <InsurerMark name="VHI Healthcare" short="VHI" color="#003C71"/>
              <InsurerMark name="Laya Healthcare" short="LH" color="#E4002B"/>
              <InsurerMark name="Irish Life Health" short="IL" color="#006633"/>
              <InsurerMark name="HSA" short="HSA" color="#111"/>
            </div>
            <div style={{ fontSize: 11, color: CB2.ink3, marginTop: 14, paddingTop: 14, borderTop: `1px solid ${CB2.line}` }}>
              All insurer reports auto-generated monthly · last submission 31 March 2026
            </div>
          </div>
        </div>

        {/* Bio + qualifications */}
        <div style={{ border: `1px solid ${CB2.line}`, borderRadius: 14, padding: 22, background: '#fff' }}>
          <div style={{ fontSize: 11, color: CB2.ink3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 14 }}>Qualifications & experience</div>
          {[
            { y: '2015', t: 'BSc Physiotherapy', s: 'Royal College of Surgeons in Ireland' },
            { y: '2018', t: 'MSc Sports & Exercise Medicine', s: 'Trinity College Dublin' },
            { y: '2020', t: 'Certified ACL Rehabilitation Specialist', s: 'Sports Surgery Clinic, Santry' },
            { y: '2023', t: 'MISCP Chartered Member', s: 'Irish Society of Chartered Physiotherapists' },
          ].map((q, i, a) => (
            <div key={i} style={{ display: 'flex', gap: 20, padding: '10px 0',
              borderTop: i > 0 ? `1px solid ${CB2.line}` : 'none' }}>
              <div style={{ fontSize: 12, color: CB2.ink3, fontFamily: 'ui-monospace, Menlo, monospace', width: 42, flexShrink: 0, paddingTop: 2 }}>{q.y}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13.5, color: CB2.ink, fontWeight: 500 }}>{q.t}</div>
                <div style={{ fontSize: 12, color: CB2.ink3, marginTop: 2 }}>{q.s}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---- Clinic overview view ------------------------------------------------
function ClinicOverviewView() {
  const schedule = [
    { t: '08:00', name: "Aoife O'Brien", cond: 'Rotator cuff', flag: null },
    { t: '09:00', name: 'Maeve Ryan', cond: 'Patellar tendinopathy', flag: null },
    { t: '10:00', name: 'Daniel Keane', cond: 'Achilles rehab', flag: 'red' },
    { t: '11:00', name: 'Tomás Hennessy', cond: 'Low back · L4-L5', flag: 'red' },
    { t: '12:00', name: '— Lunch —', cond: null, flag: null, break: true },
    { t: '13:00', name: 'Siobhán Doyle', cond: 'MCL sprain', flag: null },
    { t: '14:30', name: 'Conor Murphy', cond: 'ACL reconstruction', flag: 'amber' },
    { t: '15:30', name: 'James Whelan', cond: 'Meniscus repair', flag: null },
    { t: '16:30', name: 'Niamh Byrne', cond: 'Hip impingement', flag: 'red' },
  ];

  return (
    <div style={{ padding: 32, maxWidth: 1040, margin: '0 auto' }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 11, color: CB2.ink3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.4 }}>Clinic</div>
        <div style={{ fontSize: 26, fontWeight: 600, color: CB2.ink, letterSpacing: -0.5, marginTop: 4 }}>Dublin Physio Co</div>
        <div style={{ fontSize: 13, color: CB2.ink3, marginTop: 4 }}>3 clinicians · 121 active patients · Blackrock, Co. Dublin</div>
      </div>

      {/* Top KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
        <div style={{ border: `1px solid ${CB2.line}`, borderRadius: 12, padding: 18, background: '#fff' }}>
          <div style={{ fontSize: 11, color: CB2.ink3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 10 }}>This week</div>
          <div style={{ fontSize: 28, fontWeight: 600, color: CB2.ink, letterSpacing: -0.8, fontVariantNumeric: 'tabular-nums' }}>38 <span style={{ fontSize: 14, color: CB2.ink3, fontWeight: 400 }}>appts</span></div>
          <div style={{ fontSize: 11, color: CB2.green, marginTop: 4 }}>+6 vs last week</div>
        </div>
        <div style={{ border: `1px solid ${CB2.line}`, borderRadius: 12, padding: 18, background: '#fff' }}>
          <div style={{ fontSize: 11, color: CB2.ink3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 10 }}>Utilisation</div>
          <div style={{ fontSize: 28, fontWeight: 600, color: CB2.ink, letterSpacing: -0.8, fontVariantNumeric: 'tabular-nums' }}>87%</div>
          <div style={{ fontSize: 11, color: CB2.ink3, marginTop: 4 }}>of available slots</div>
        </div>
        <div style={{ border: `1px solid ${CB2.line}`, borderRadius: 12, padding: 18, background: '#fff' }}>
          <div style={{ fontSize: 11, color: CB2.ink3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 10 }}>No-show rate</div>
          <div style={{ fontSize: 28, fontWeight: 600, color: CB2.green, letterSpacing: -0.8, fontVariantNumeric: 'tabular-nums' }}>3.1%</div>
          <div style={{ fontSize: 11, color: CB2.green, marginTop: 4 }}>↓ well below 9% national</div>
        </div>
        <div style={{ border: `1px solid ${CB2.line}`, borderRadius: 12, padding: 18, background: '#fff' }}>
          <div style={{ fontSize: 11, color: CB2.ink3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 10 }}>Revenue MTD</div>
          <div style={{ fontSize: 28, fontWeight: 600, color: CB2.ink, letterSpacing: -0.8, fontVariantNumeric: 'tabular-nums' }}>€22.7k</div>
          <div style={{ fontSize: 11, color: CB2.green, marginTop: 4 }}>on pace · +14% MoM</div>
        </div>
      </div>

      {/* Today schedule + benchmarks */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 16, marginBottom: 24 }}>
        <div style={{ border: `1px solid ${CB2.line}`, borderRadius: 14, padding: 22, background: '#fff' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <div style={{ fontSize: 11, color: CB2.ink3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.2 }}>Today's schedule</div>
            <div style={{ fontSize: 11, color: CB2.red, fontWeight: 600 }}>3 need pre-review</div>
          </div>
          {schedule.map((s, i) => s.break ? (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '6px 0',
              borderTop: `1px dashed ${CB2.line}`, marginTop: 6 }}>
              <div style={{ fontSize: 11, color: CB2.ink4, fontFamily: 'ui-monospace, Menlo, monospace', width: 42 }}>{s.t}</div>
              <div style={{ fontSize: 11, color: CB2.ink4, fontStyle: 'italic' }}>Lunch</div>
            </div>
          ) : (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '10px 0',
              borderTop: i > 0 ? `1px solid ${CB2.line}` : 'none' }}>
              <div style={{ fontSize: 12, color: CB2.ink3, fontFamily: 'ui-monospace, Menlo, monospace', width: 42, flexShrink: 0 }}>{s.t}</div>
              <div style={{ width: 6, height: 6, borderRadius: 3, flexShrink: 0,
                background: s.flag === 'red' ? CB2.red : s.flag === 'amber' ? CB2.amber : CB2.green }}/>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: CB2.ink }}>{s.name}</div>
                <div style={{ fontSize: 11, color: CB2.ink3, marginTop: 1 }}>{s.cond}</div>
              </div>
              {s.flag === 'red' && <span style={{ fontSize: 10, fontWeight: 600, color: CB2.red, letterSpacing: 1.2, textTransform: 'uppercase' }}>Review</span>}
            </div>
          ))}
        </div>

        <div style={{ border: `1px solid ${CB2.line}`, borderRadius: 14, padding: 22, background: '#fff' }}>
          <div style={{ fontSize: 11, color: CB2.ink3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 14 }}>Clinic vs. national benchmark</div>
          {[
            { label: 'Adherence', clinic: 78, nat: 62 },
            { label: 'Recovery time', clinic: 86, nat: 72, note: 'faster' },
            { label: 'Pain reduction', clinic: 81, nat: 68 },
            { label: 'Return-to-sport', clinic: 74, nat: 59 },
            { label: 'Patient satisfaction', clinic: 96, nat: 78 },
          ].map((b, i) => (
            <div key={i} style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 5, fontWeight: 500 }}>
                <span style={{ color: CB2.ink2 }}>{b.label}</span>
                <span style={{ color: CB2.green, fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>+{b.clinic - b.nat} pts</span>
              </div>
              <div style={{ position: 'relative', height: 6, background: '#F4F4F2', borderRadius: 3, overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, height: '100%', width: `${b.clinic}%`, background: CB2.green, borderRadius: 3 }}/>
                <div style={{ position: 'absolute', top: -2, left: `${b.nat}%`, width: 2, height: 10, background: CB2.ink2, borderRadius: 1 }}/>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: CB2.ink4, marginTop: 3, fontFamily: 'ui-monospace, Menlo, monospace' }}>
                <span>clinic · {b.clinic}%</span>
                <span>national · {b.nat}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Condition mix + insurers */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 24 }}>
        <div style={{ border: `1px solid ${CB2.line}`, borderRadius: 14, padding: 22, background: '#fff' }}>
          <div style={{ fontSize: 11, color: CB2.ink3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 14 }}>Patient mix by condition</div>
          {[
            { c: 'ACL / knee reconstruction', n: 38, pct: 31 },
            { c: 'Shoulder · rotator cuff', n: 24, pct: 20 },
            { c: 'Low back pain', n: 22, pct: 18 },
            { c: 'Hip replacement / impingement', n: 17, pct: 14 },
            { c: 'Achilles / foot', n: 12, pct: 10 },
            { c: 'Other', n: 8, pct: 7 },
          ].map((c, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: CB2.ink2, marginBottom: 5, fontWeight: 500 }}>
                <span>{c.c}</span>
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>{c.n} · {c.pct}%</span>
              </div>
              <div style={{ height: 4, background: '#F4F4F2', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{ width: `${c.pct * 3}%`, height: '100%', background: CB2.green, borderRadius: 2 }}/>
              </div>
            </div>
          ))}
        </div>

        <div style={{ border: `1px solid ${CB2.line}`, borderRadius: 14, padding: 22, background: '#fff' }}>
          <div style={{ fontSize: 11, color: CB2.ink3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.2, marginBottom: 14 }}>Insurer contract status</div>
          {[
            { name: 'VHI Healthcare', short: 'VHI', color: '#003C71', pts: 38, status: 'Active', until: 'Dec 2026' },
            { name: 'Laya Healthcare', short: 'LH', color: '#E4002B', pts: 29, status: 'Active', until: 'Jun 2026' },
            { name: 'Irish Life Health', short: 'IL', color: '#006633', pts: 42, status: 'Active', until: 'Mar 2027' },
            { name: 'HSA', short: 'HSA', color: '#111', pts: 12, status: 'Renewal due', until: 'Jul 2026' },
          ].map((ins, i, a) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0',
              borderTop: i > 0 ? `1px solid ${CB2.line}` : 'none' }}>
              <div style={{ width: 32, height: 32, borderRadius: 7, background: ins.color, color: '#fff',
                fontSize: 10, fontWeight: 700, letterSpacing: 0.5,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{ins.short}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 500, color: CB2.ink }}>{ins.name}</div>
                <div style={{ fontSize: 11, color: CB2.ink3, marginTop: 1 }}>{ins.pts} patients · through {ins.until}</div>
              </div>
              <span style={{
                fontSize: 10, fontWeight: 600, letterSpacing: 1.2, textTransform: 'uppercase',
                padding: '3px 8px', borderRadius: 4,
                background: ins.status === 'Active' ? CB2.greenSoft : CB2.amberBg,
                color: ins.status === 'Active' ? CB2.green : CB2.amber,
              }}>{ins.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue strip */}
      <div style={{ border: `1px solid ${CB2.line}`, borderRadius: 14, padding: 22, background: '#fff' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <div style={{ fontSize: 11, color: CB2.ink3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.2 }}>Revenue through Recovera-tracked sessions</div>
            <div style={{ fontSize: 22, fontWeight: 600, color: CB2.ink, letterSpacing: -0.4, marginTop: 4 }}>€48,420 <span style={{ fontSize: 12, color: CB2.ink3, fontWeight: 400 }}>· last 6 months</span></div>
          </div>
          <button style={{ height: 32, padding: '0 14px', borderRadius: 8, border: `1px solid ${CB2.line}`,
            background: '#fff', color: CB2.ink2, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>Export ledger</button>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 90 }}>
          {[
            { m: 'Oct', v: 6.8 }, { m: 'Nov', v: 7.4 }, { m: 'Dec', v: 6.1 },
            { m: 'Jan', v: 8.2 }, { m: 'Feb', v: 8.5 }, { m: 'Mar', v: 11.4 },
          ].map((b, i, a) => (
            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ fontSize: 10, color: CB2.ink3, fontVariantNumeric: 'tabular-nums' }}>€{b.v.toFixed(1)}k</div>
              <div style={{ width: '62%', height: `${(b.v / 12) * 70}px`,
                background: i === a.length - 1 ? CB2.green : CB2.greenSoft, borderRadius: 4 }}/>
              <div style={{ fontSize: 10, color: CB2.ink4, fontFamily: 'ui-monospace, Menlo, monospace' }}>{b.m}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ height: 40 }}/>
    </div>
  );
}

// ---- SOAP Note block -----------------------------------------------------
function SOAPNote({ patient }) {
  const soap = {
    CM: {
      s: "Reports hip feeling \"a bit off\" during warm-up yesterday. No pain at rest. 6/10 confidence in knee on stairs descending. Sleep undisturbed.",
      o: "Session 4 of 8 completed. Live form score 84 (target 80+). Left knee valgus detected in 9/12 reps. Hip symmetry 62% (↓4 pts vs. last week). ROM knee flexion 132° (R) / 118° (L).",
      a: "ACL reconstruction week 8. Movement progressing well overall. Emerging left hip abductor weakness causing dynamic valgus under load — addressable before single-leg progression.",
      p: "Add hip abductor activation (3×12) before main sets for 2 weeks. Gate single-leg balance behind symmetry ≥75%. Reassess at session 6. Referral to S&C not required at this stage.",
    },
  }[patient.id] || {
    s: "Patient reports stable symptoms, no new complaints. Adherent to home programme.",
    o: "Objective session data auto-captured from Recovera. Form score within target range.",
    a: "Progressing within expected recovery trajectory.",
    p: "Continue current protocol. Review at next session.",
  };

  const rows = [
    { k: 'S', label: 'Subjective', text: soap.s },
    { k: 'O', label: 'Objective', text: soap.o, auto: true },
    { k: 'A', label: 'Assessment', text: soap.a },
    { k: 'P', label: 'Plan', text: soap.p },
  ];

  return (
    <div style={{ border: `1px solid ${CB2.line}`, borderRadius: 14, padding: 22, background: '#fff', marginTop: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontSize: 11, color: CB2.ink3, fontWeight: 500, textTransform: 'uppercase', letterSpacing: 1.2 }}>SOAP note</div>
          <span style={{
            fontSize: 10, fontWeight: 600, color: CB2.green, letterSpacing: 1.2, textTransform: 'uppercase',
            padding: '3px 8px', borderRadius: 4, background: CB2.greenSoft,
            display: 'inline-flex', alignItems: 'center', gap: 4,
          }}>
            <svg width="10" height="10" viewBox="0 0 10 10"><circle cx="5" cy="5" r="4" fill="none" stroke="currentColor" strokeWidth="1.2"/><circle cx="5" cy="5" r="1.5" fill="currentColor"/></svg>
            Auto-drafted from session data
          </span>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button style={{ height: 28, padding: '0 10px', borderRadius: 6, border: `1px solid ${CB2.line}`,
            background: '#fff', color: CB2.ink2, fontSize: 11, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>Edit</button>
          <button style={{ height: 28, padding: '0 10px', borderRadius: 6, border: `1px solid ${CB2.line}`,
            background: '#fff', color: CB2.ink2, fontSize: 11, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>Lock & sign</button>
        </div>
      </div>
      <div style={{ borderLeft: `2px solid ${CB2.greenSoft}`, paddingLeft: 18 }}>
        {rows.map((r, i) => (
          <div key={r.k} style={{ display: 'flex', gap: 16, padding: '12px 0',
            borderTop: i > 0 ? `1px dashed ${CB2.line}` : 'none' }}>
            <div style={{ flexShrink: 0, width: 36 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 6, background: CB2.green, color: '#fff',
                fontSize: 13, fontWeight: 600, letterSpacing: 0.3,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{r.k}</div>
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <div style={{ fontSize: 11, color: CB2.ink3, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1.2 }}>{r.label}</div>
                {r.auto && <span style={{ fontSize: 9, color: CB2.green, fontFamily: 'ui-monospace, Menlo, monospace' }}>· pulled from pose + motion data</span>}
              </div>
              <div style={{ fontSize: 13.5, color: CB2.ink, lineHeight: 1.55, letterSpacing: -0.1 }}>{r.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- Clinical workflow actions row --------------------------------------
function ClinicalActions({ patient }) {
  return (
    <div style={{ border: `1px solid ${CB2.line}`, borderRadius: 14, background: '#fff', marginTop: 16, overflow: 'hidden' }}>
      {/* Auto-suggested appointment */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '16px 22px',
        background: '#FBFCFB', borderBottom: `1px solid ${CB2.line}` }}>
        <div style={{ width: 36, height: 36, borderRadius: 8, background: CB2.greenSoft, color: CB2.green,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <svg width="18" height="18" viewBox="0 0 18 18"><rect x="3" y="4" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.4" fill="none"/><path d="M3 7h12M6 2v3M12 2v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><circle cx="13" cy="11" r="1.4" fill="currentColor"/></svg>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 11, color: CB2.green, fontWeight: 600, letterSpacing: 1.2, textTransform: 'uppercase', marginBottom: 3 }}>Next appointment · auto-suggested</div>
          <div style={{ fontSize: 14, fontWeight: 500, color: CB2.ink }}>
            Friday 17 April · 14:30 <span style={{ color: CB2.ink3, fontWeight: 400 }}>· 45 min · reassess hip symmetry</span>
          </div>
          <div style={{ fontSize: 11, color: CB2.ink3, marginTop: 3 }}>
            Gated on symmetry ≥75% before single-leg progression. Recovera booked the next free slot.
          </div>
        </div>
        <button style={{ height: 32, padding: '0 14px', borderRadius: 8, border: 'none',
          background: CB2.green, color: '#fff', fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>Confirm</button>
        <button style={{ height: 32, padding: '0 10px', borderRadius: 8, border: `1px solid ${CB2.line}`,
          background: '#fff', color: CB2.ink2, fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit' }}>Reschedule</button>
      </div>

      {/* Actions row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
        {[
          { label: 'Export clinical summary', sub: 'PDF for GP / surgeon', icon: (
            <svg width="18" height="18" viewBox="0 0 18 18"><path d="M11 2H4a1 1 0 00-1 1v12a1 1 0 001 1h10a1 1 0 001-1V6l-4-4z" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinejoin="round"/><path d="M11 2v4h4M9 9v4m-2-2l2 2 2-2" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
          ) },
          { label: 'Log billing', sub: '€65 · Follow-up · VHI', icon: (
            <svg width="18" height="18" viewBox="0 0 18 18"><rect x="2" y="4" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.4" fill="none"/><path d="M2 7h14M5 11h2M9 11h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
          ) },
          { label: 'Send to patient', sub: 'Summary + homework', icon: (
            <svg width="18" height="18" viewBox="0 0 18 18"><path d="M2 9l14-6-5 14-2-6-7-2z" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinejoin="round"/></svg>
          ) },
        ].map((a, i, arr) => (
          <button key={i} style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '16px 22px',
            background: '#fff', border: 'none', cursor: 'pointer',
            borderRight: i < arr.length - 1 ? `1px solid ${CB2.line}` : 'none',
            textAlign: 'left', fontFamily: 'inherit', color: CB2.ink2,
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#FBFCFB'}
          onMouseLeave={e => e.currentTarget.style.background = '#fff'}
          >
            <div style={{ color: CB2.green, flexShrink: 0 }}>{a.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 500, color: CB2.ink }}>{a.label}</div>
              <div style={{ fontSize: 11, color: CB2.ink3, marginTop: 2 }}>{a.sub}</div>
            </div>
            <svg width="12" height="12" viewBox="0 0 12 12"><path d="M4 2l4 4-4 4" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round"/></svg>
          </button>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, {
  ClinicianProfileView, ClinicOverviewView, SOAPNote, ClinicalActions, VerifiedBadge,
});
