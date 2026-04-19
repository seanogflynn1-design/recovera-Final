// Slide 05 — THE SESSION · WARM · 12000ms · PATTERN B
// Text left (x=3%→27%), dashboard right (x=31%→97%)
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
@keyframes s05FrameIn {
  from { opacity: 0; transform: scale(0.852) scale(0.96); }
  to   { opacity: 1; transform: scale(0.852) scale(1.0); }
}
`;

  // MacBook at 1280×800: totalW=1488px, totalH=884px
  // Available: 66% of 1920 = 1267px wide, 88% of 1080 = 950px tall
  // Scale = min(1267/1488, 950/884) = 0.852
  const MB_SCALE = 0.852;

  function Annotation({ top, text, color, delay }) {
    return (
      <div style={{
        position: 'absolute',
        right: '69%',   // right edge at x=31% — touching dashboard edge
        top,
        display: 'flex', alignItems: 'center', gap: 6,
        opacity: 0,
        animation: 'pitchFade 400ms ease-out forwards',
        animationDelay: delay + 'ms',
        color,
        pointerEvents: 'none',
        zIndex: 20,
      }}>
        <div style={{
          fontFamily: "'Fraunces', Georgia, serif",
          fontStyle: 'italic', fontSize: 13,
          whiteSpace: 'nowrap',
          textAlign: 'right',
        }}>{text}</div>
        <svg width={32} height={12} viewBox="0 0 32 12" style={{ flexShrink: 0, opacity: 0.35 }}>
          <line x1="0" y1="6" x2="28" y2="6" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
          <circle cx="28" cy="6" r="2" fill="currentColor"/>
        </svg>
      </div>
    );
  }

  window.PitchSlides = window.PitchSlides || {};
  window.PitchSlides[5] = function SlideSession() {
    const clinicianDashRef = React.useRef(null);

    return (
      <div style={{ position: 'absolute', inset: 0, background: 'var(--paper)' }}>
        <style>{KEYFRAMES}</style>

        {/* ── TEXT COLUMN ── */}

        {/* Context line */}
        <div style={{
          position: 'absolute', left: '3%', top: '16%', maxWidth: 250,
          fontFamily: "'Inter', sans-serif",
          fontSize: 14, fontWeight: 500, lineHeight: 1.4,
          color: 'var(--ink)',
          opacity: 0,
          animation: 'pitchFade 400ms ease-out forwards',
          animationDelay: '0ms',
        }}>
          Every patient&apos;s home sessions — analysed by AI overnight.
        </div>

        {/* Eyebrow */}
        <div style={{
          position: 'absolute', left: '3%', top: '25%',
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 11, letterSpacing: '0.3em',
          color: 'var(--mute)',
          opacity: 0,
          animation: 'pitchFade 400ms ease-out forwards',
          animationDelay: '200ms',
        }}>§ THE AI BRIEF</div>

        {/* Headline */}
        <div style={{
          position: 'absolute', left: '3%', top: '31%',
          opacity: 0,
          animation: 'pitchArrive 700ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
          animationDelay: '400ms',
        }}>
          <div style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontWeight: 700, fontSize: 30, lineHeight: 1.1,
            color: 'var(--ink)',
          }}>She reads the report.</div>
          <div style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontWeight: 700, fontSize: 30, lineHeight: 1.1,
            color: 'var(--ink)', marginTop: 8,
          }}>She walks in knowing.</div>
        </div>

        {/* Bullets */}
        {[
          { text: '· AI brief generated overnight', delay: 700 },
          { text: '· Flags ranked by urgency',      delay: 850 },
          { text: '· Session planned before she arrives', delay: 1000 },
        ].map(({ text, delay }) => (
          <div key={text} style={{
            position: 'absolute', left: '3%',
            top: delay === 700 ? '45%' : delay === 850 ? '51%' : '57%',
            fontFamily: "'Inter', sans-serif",
            fontSize: 14, fontWeight: 500, lineHeight: 2.0,
            color: 'var(--ink)',
            opacity: 0,
            animation: 'pitchFade 500ms ease-out forwards',
            animationDelay: delay + 'ms',
          }}>{text}</div>
        ))}

        {/* Italic footnote */}
        <div style={{
          position: 'absolute', left: '3%', top: '63%', maxWidth: 250,
          opacity: 0,
          animation: 'pitchFade 400ms ease-out forwards',
          animationDelay: '1100ms',
        }}>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 400, fontStyle: 'italic', color: 'var(--mute)' }}>
            Five minutes of reading.
          </div>
          <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 400, fontStyle: 'italic', color: 'var(--mute)', marginTop: 4 }}>
            Replaces eighteen minutes of reconstruction.
          </div>
        </div>

        {/* Caption */}
        <div style={{
          position: 'absolute', left: '3%', top: '91%',
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 10, color: 'var(--mute)',
          opacity: 0,
          animation: 'pitchFade 400ms ease-out forwards',
          animationDelay: '1100ms',
        }}>
          DR. ÁINE O&apos;BRIEN · MISCP · DUBLIN PHYSIO CO
        </div>

        {/* ── ANNOTATIONS ── */}
        <Annotation top="20%" text="AI brief — ready overnight"  color="var(--ink)" delay={1500} />
        <Annotation top="38%" text="3 flagged · AI-ranked"       color="var(--red)" delay={2500} />
        <Annotation top="55%" text="Click in · full AI report"   color="var(--ink)" delay={3500} />

        {/* ── DASHBOARD COLUMN ── */}
        <div style={{
          position: 'absolute',
          left: '31%', top: '6%',
          transformOrigin: 'top left',
          transform: `scale(${MB_SCALE})`,
          zIndex: 10,
          opacity: 0,
          animation: 'pitchFade 700ms ease forwards',
          animationDelay: '400ms',
        }}>
          <MacBookFrame screenWidth={1280} screenHeight={800}>
            <ClinicianDash ref={clinicianDashRef} />
          </MacBookFrame>
        </div>
      </div>
    );
  };
})();
