// Slide 03 — THE ROSEBUD · DARK · 13000ms · DECK-FULL
// The deck's peak moment. Three-phase transition: setup → climax → resolution.
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

  window.PitchSlides = window.PitchSlides || {};
  window.PitchSlides[3] = function SlideRosebud() {
    const [phase, setPhase] = React.useState(1);
    const [phaseVisible, setPhaseVisible] = React.useState(true);

    React.useEffect(() => {
      // Phase 1 → 2
      const t1 = setTimeout(() => setPhaseVisible(false), 3200);
      const t2 = setTimeout(() => { setPhase(2); setPhaseVisible(true); }, 3500);
      // Phase 2 → 3
      const t3 = setTimeout(() => setPhaseVisible(false), 7500);
      const t4 = setTimeout(() => { setPhase(3); setPhaseVisible(true); }, 7800);
      return () => [t1, t2, t3, t4].forEach(clearTimeout);
    }, []);

    const wrapStyle = {
      position: 'absolute', inset: 0,
      opacity: phaseVisible ? 1 : 0,
      transition: 'opacity 300ms ease',
    };

    return (
      <div style={{ position: 'absolute', inset: 0 }}>
        <style>{KEYFRAMES}</style>

        {phase === 1 && (
          <div style={wrapStyle}>
            {/* "When the internet launched," */}
            <div style={{
              position: 'absolute', top: '27%', left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: "'Fraunces', Georgia, serif",
              fontWeight: 700, fontSize: 46,
              color: 'var(--film-ink)',
              letterSpacing: '-0.02em',
              whiteSpace: 'nowrap',
              opacity: 0,
              animation: 'pitchArrive 1000ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
              animationDelay: '0ms',
            }}>
              When the internet launched,
            </div>

            {/* "everyone predicted doctors would become obsolete." */}
            <div style={{
              position: 'absolute', top: '34%', left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: "'Fraunces', Georgia, serif",
              fontWeight: 700, fontSize: 42,
              color: 'var(--film-mute)',
              letterSpacing: '-0.02em',
              maxWidth: '90%',
              textAlign: 'center',
              opacity: 0,
              animation: 'pitchArrive 1000ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
              animationDelay: '0ms',
            }}>
              everyone predicted doctors would become obsolete.
            </div>

            {/* "Patients could look up symptoms. Diagnose themselves." */}
            <div style={{
              position: 'absolute', top: '41%', left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: "'Fraunces', Georgia, serif",
              fontWeight: 400, fontStyle: 'italic', fontSize: 30,
              color: 'var(--film-mute)',
              textAlign: 'center',
              maxWidth: '90%',
              opacity: 0,
              animation: 'pitchArrive 1000ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
              animationDelay: '0ms',
            }}>
              Patients could look up symptoms. Diagnose themselves.
            </div>
          </div>
        )}

        {phase === 2 && (
          <div style={wrapStyle}>
            {/* Rule */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translateX(-50%)',
              width: 420, height: 1,
              background: 'var(--film-soft)',
              transformOrigin: 'left center',
              opacity: 0,
              animation: 'pitchDraw 500ms cubic-bezier(0.65, 0, 0.35, 1) forwards',
              animationDelay: '0ms',
            }} />

            {/* "The opposite happened." — THE PEAK MOMENT */}
            <div style={{
              position: 'absolute', top: '57%', left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: "'Fraunces', Georgia, serif",
              fontWeight: 900,
              fontVariationSettings: "'opsz' 144, 'SOFT' 50",
              fontSize: 84,
              color: 'var(--film-ink)',
              letterSpacing: '-0.03em',
              whiteSpace: 'nowrap',
              opacity: 0,
              animation: 'pitchStrongArrive 1600ms cubic-bezier(0.15, 0.85, 0.15, 1) forwards',
              animationDelay: '300ms',
            }}>
              The opposite happened.
            </div>
          </div>
        )}

        {phase === 3 && (
          <div style={wrapStyle}>
            {/* Line A */}
            <div style={{
              position: 'absolute', top: '27%', left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: "'Inter', sans-serif",
              fontSize: 21, fontWeight: 500,
              color: 'var(--film-ink)',
              textAlign: 'center', maxWidth: 960,
              opacity: 0,
              animation: 'pitchFade 600ms ease-out forwards',
              animationDelay: '0ms',
            }}>
              Patients arrived more informed. More anxious.
            </div>

            {/* Line B */}
            <div style={{
              position: 'absolute', top: '33%', left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: "'Inter', sans-serif",
              fontSize: 21, fontWeight: 500,
              color: 'var(--film-ink)',
              textAlign: 'center', maxWidth: 960,
              opacity: 0,
              animation: 'pitchFade 600ms ease-out forwards',
              animationDelay: '200ms',
            }}>
              More in need of a professional they could trust.
            </div>

            {/* Line C */}
            <div style={{
              position: 'absolute', top: '44%', left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: "'Fraunces', Georgia, serif",
              fontWeight: 700, fontStyle: 'italic', fontSize: 28,
              color: 'var(--film-mute)',
              textAlign: 'center', maxWidth: 960,
              opacity: 0,
              animation: 'pitchFade 600ms ease-out forwards',
              animationDelay: '500ms',
            }}>
              The internet didn&apos;t replace the expert.
            </div>

            {/* Line D */}
            <div style={{
              position: 'absolute', top: '50%', left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: "'Fraunces', Georgia, serif",
              fontWeight: 700, fontStyle: 'italic', fontSize: 28,
              color: 'var(--film-ink)',
              textAlign: 'center', maxWidth: 960,
              opacity: 0,
              animation: 'pitchFade 600ms ease-out forwards',
              animationDelay: '700ms',
            }}>
              It made the expert indispensable.
            </div>

            {/* Line E */}
            <div style={{
              position: 'absolute', top: '62%', left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: "'Fraunces', Georgia, serif",
              fontWeight: 900, fontSize: 50,
              color: 'var(--film-ink)',
              letterSpacing: '-0.025em',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              opacity: 0,
              animation: 'pitchArrive 900ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
              animationDelay: '1500ms',
            }}>
              AI is following the same curve.
            </div>

            {/* Line F */}
            <div style={{
              position: 'absolute', top: '71%', left: '50%',
              transform: 'translateX(-50%)',
              fontFamily: "'Fraunces', Georgia, serif",
              fontWeight: 700, fontStyle: 'italic', fontSize: 36,
              color: 'var(--accent)',
              textAlign: 'center',
              whiteSpace: 'nowrap',
              opacity: 0,
              animation: 'pitchArrive 900ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
              animationDelay: '2000ms',
            }}>
              Recovera is built on that truth.
            </div>
          </div>
        )}
      </div>
    );
  };
})();
