// Slide 04 — THE INSTRUMENT · DARK · 10000ms · DECK-FULL
// "The first AI system that reads movement data, understands it clinically..."
(function () {
  const KEYFRAMES = `
@keyframes pitchStrongArrive {
  from { opacity: 0; transform: scale(1.08); filter: blur(8px); }
  to   { opacity: 1; transform: scale(1.0);  filter: blur(0);   }
}
@keyframes pitchArrive {
  from { opacity: 0; transform: scale(1.04); filter: blur(4px); }
  to   { opacity: 1; transform: scale(1.0);  filter: blur(0);   }
}
@keyframes pitchDraw {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
@keyframes pitchFade {
  from { opacity: 0; }
  to   { opacity: 1; }
}
`;

  // Column layout — 1920px canvas
  // totalCols=1220px, leftEdge=350px
  // col1: 350, col2: 800, col3: 1250 — each 320px wide
  // arrow1: 670px, arrow2: 1120px

  const COL1 = 350, COL2 = 800, COL3 = 1250, COL_W = 320;
  const ARROW1 = 670, ARROW2 = 1120;
  const COL_TOP = '27%';    // icon tops
  const ARROW_TOP = '32%';  // vertical center near icons

  function ColIcon({ children }) {
    return (
      <div style={{
        display: 'flex', justifyContent: 'center',
        opacity: 0,
        animation: 'pitchFade 600ms ease-out forwards',
        animationDelay: '900ms',
      }}>
        {children}
      </div>
    );
  }

  function ColLabel({ children, color }) {
    return (
      <div style={{
        textAlign: 'center', marginTop: 12,
        fontFamily: "'JetBrains Mono', ui-monospace, monospace",
        fontSize: 11, letterSpacing: '0.2em',
        color: color || 'var(--film-mute)',
        opacity: 0,
        animation: 'pitchFade 400ms ease-out forwards',
        animationDelay: '1200ms',
      }}>
        {children}
      </div>
    );
  }

  function ColBody({ children, delay = 1700 }) {
    return (
      <div style={{
        textAlign: 'center', maxWidth: 280, margin: '12px auto 0',
        fontFamily: "'Inter', sans-serif",
        fontSize: 14, fontWeight: 400, lineHeight: 1.6,
        color: 'var(--film-mute)',
        opacity: 0,
        animation: 'pitchArrive 700ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
        animationDelay: delay + 'ms',
      }}>
        {children}
      </div>
    );
  }

  window.PitchSlides = window.PitchSlides || {};
  window.PitchSlides[4] = function SlideInstrument() {
    return (
      <div style={{ position: 'absolute', inset: 0 }}>
        <style>{KEYFRAMES}</style>

        {/* Explanation */}
        <div style={{
          position: 'absolute', top: '8%', left: '50%',
          transform: 'translateX(-50%)',
          maxWidth: 1050, textAlign: 'center',
          fontFamily: "'Inter', sans-serif",
          fontSize: 18, fontWeight: 600, lineHeight: 1.4,
          color: 'var(--film-ink)',
          opacity: 0,
          animation: 'pitchArrive 1000ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
          animationDelay: '0ms',
        }}>
          The first AI system that reads movement data, understands it clinically, and delivers structured intelligence to the professional and the patient — before the session starts.
        </div>

        {/* Eyebrow */}
        <div style={{
          position: 'absolute', top: '17%', left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 12, letterSpacing: '0.3em',
          color: 'var(--film-mute)',
          opacity: 0,
          animation: 'pitchFade 400ms ease-out forwards',
          animationDelay: '600ms',
        }}>
          § THE INSTRUMENT
        </div>

        {/* ── Column 1 — THE PATIENT ── */}
        <div style={{ position: 'absolute', left: COL1, top: COL_TOP, width: COL_W }}>
          <ColIcon>
            <svg width="68" height="68" viewBox="0 0 68 68" fill="none">
              <circle cx="34" cy="34" r="33" stroke="var(--film-mute)" strokeWidth="1.5"/>
              <circle cx="34" cy="22" r="8" stroke="var(--film-mute)" strokeWidth="1.5"/>
              <line x1="34" y1="30" x2="34" y2="52" stroke="var(--film-mute)" strokeWidth="1.5"/>
              <line x1="20" y1="40" x2="48" y2="40" stroke="var(--film-mute)" strokeWidth="1.5"/>
            </svg>
          </ColIcon>
          <ColLabel>THE PATIENT</ColLabel>
          <ColBody delay={1700}>
            Does prescribed exercises at home. The AI reads movement through any camera — phone, laptop, Smart TV webcam. Not video. Structured movement data.
          </ColBody>
        </div>

        {/* Arrow 1 */}
        <div style={{
          position: 'absolute', left: ARROW1, top: ARROW_TOP,
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 400, fontSize: 30,
          color: 'var(--film-mute)',
          opacity: 0,
          animation: 'pitchFade 300ms ease-out forwards',
          animationDelay: '1500ms',
        }}>→</div>

        {/* ── Column 2 — RECOVERA ── */}
        <div style={{ position: 'absolute', left: COL2, top: COL_TOP, width: COL_W }}>
          <ColIcon>
            <svg width="68" height="68" viewBox="0 0 68 68" fill="none">
              <rect x="6" y="6" width="24" height="24" stroke="var(--film-mute)" strokeWidth="1.5"/>
              <rect x="38" y="6" width="24" height="24" stroke="var(--film-mute)" strokeWidth="1.5"/>
              <rect x="6" y="38" width="24" height="24" stroke="var(--film-mute)" strokeWidth="1.5"/>
              <rect x="38" y="38" width="24" height="24" stroke="var(--film-mute)" strokeWidth="1.5"/>
            </svg>
          </ColIcon>
          <ColLabel color="var(--accent)">RECOVERA</ColLabel>
          <ColBody delay={1900}>
            The AI analyses movement clinically. Generates two outputs — a clinical report for the professional, and a visual recovery journey for the patient. Same engine. Two people empowered.
          </ColBody>
        </div>

        {/* Arrow 2 */}
        <div style={{
          position: 'absolute', left: ARROW2, top: ARROW_TOP,
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 400, fontSize: 30,
          color: 'var(--film-mute)',
          opacity: 0,
          animation: 'pitchFade 300ms ease-out forwards',
          animationDelay: '1500ms',
        }}>→</div>

        {/* ── Column 3 — THE CLINICIAN ── */}
        <div style={{ position: 'absolute', left: COL3, top: COL_TOP, width: COL_W }}>
          <ColIcon>
            <svg width="68" height="68" viewBox="0 0 68 68" fill="none">
              <circle cx="34" cy="34" r="33" stroke="var(--film-mute)" strokeWidth="1.5"/>
              <circle cx="34" cy="22" r="8" stroke="var(--film-mute)" strokeWidth="1.5"/>
              <line x1="34" y1="30" x2="34" y2="52" stroke="var(--film-mute)" strokeWidth="1.5"/>
              <line x1="20" y1="40" x2="48" y2="40" stroke="var(--film-mute)" strokeWidth="1.5"/>
              <text x="34" y="48" textAnchor="middle" fontSize="12" fill="var(--film-mute)">+</text>
            </svg>
          </ColIcon>
          <ColLabel>THE CLINICIAN</ColLabel>
          <ColBody delay={2100}>
            Reads the AI brief before the session. Knows what happened, what it means, what to address. Session starts with treatment. Not reconstruction.
          </ColBody>
        </div>

        {/* Bottom rule */}
        <div style={{
          position: 'absolute', left: '10%', top: '70%',
          width: '80%', height: 1,
          background: 'var(--film-soft)',
          transformOrigin: 'left center',
          opacity: 0,
          animation: 'pitchDraw 500ms cubic-bezier(0.65, 0, 0.35, 1) forwards',
          animationDelay: '3000ms',
        }} />

        {/* Bottom left — pricing */}
        <div style={{
          position: 'absolute', left: '20%', top: '76%',
          opacity: 0,
          animation: 'pitchFade 600ms ease-out forwards',
          animationDelay: '3500ms',
        }}>
          <div style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontWeight: 700, fontSize: 30,
            color: 'var(--accent)',
          }}>€399 / clinic / month</div>
          <div style={{
            marginTop: 8,
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: 10, letterSpacing: '0.2em',
            color: 'var(--film-mute)',
          }}>FLAT FEE · UNLIMITED PATIENTS</div>
        </div>

        {/* Bottom right — device line */}
        <div style={{
          position: 'absolute', left: '60%', top: '76%',
          opacity: 0,
          animation: 'pitchFade 600ms ease-out forwards',
          animationDelay: '3500ms',
        }}>
          <div style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontWeight: 700, fontStyle: 'italic', fontSize: 26,
            color: 'var(--film-ink)',
          }}>Phone. Laptop. Smart TV webcam.</div>
          <div style={{
            marginTop: 8,
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: 10, letterSpacing: '0.2em',
            color: 'var(--film-mute)',
          }}>ANY CAMERA-CONNECTED DEVICE</div>
        </div>
      </div>
    );
  };
})();
