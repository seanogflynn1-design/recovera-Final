// Slide 00 — THE HOOK · DARK · 5000ms
// "Recovery happens at home. Nobody can see it."
// All elements horizontally centred. Vertical c.o.g. at y≈42%.
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
  window.PitchSlides[0] = function SlideHook() {
    return (
      <div style={{ position: 'absolute', inset: 0, background: 'var(--film-black)' }}>
        <style>{KEYFRAMES}</style>

        {/* ── Centred column ── */}
        <div style={{
          position: 'absolute',
          left: '50%', top: '50%',
          transform: 'translate(-50%, -56%)',
          textAlign: 'center',
          width: '100%',
        }}>

          {/* "Recovery happens at home." */}
          <div style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontWeight: 900,
            fontSize: 88,
            fontVariationSettings: "'opsz' 144, 'SOFT' 50",
            color: 'var(--film-ink)',
            letterSpacing: '-0.035em',
            lineHeight: 1.1,
            display: 'block',
            opacity: 0,
            animation: 'pitchStrongArrive 1400ms cubic-bezier(0.15, 0.85, 0.15, 1) forwards',
            animationDelay: '0ms',
          }}>
            Recovery happens at home.
          </div>

          {/* "Nobody can see it." */}
          <div style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontWeight: 700,
            fontSize: 68,
            fontVariationSettings: "'opsz' 144, 'SOFT' 50",
            color: 'var(--film-mute)',
            letterSpacing: '-0.025em',
            lineHeight: 1.1,
            marginTop: 16,
            opacity: 0,
            animation: 'pitchArrive 1000ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
            animationDelay: '400ms',
          }}>
            Nobody can see it.
          </div>

          {/* Horizontal rule */}
          <div style={{
            width: 80,
            height: 1,
            background: 'var(--film-ink)',
            opacity: 0,
            margin: '48px auto 0',
            transformOrigin: 'left center',
            animation: 'pitchDraw 500ms cubic-bezier(0.65, 0, 0.35, 1) forwards',
            animationDelay: '1000ms',
          }} />

          {/* "recovera" wordmark */}
          <div style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontWeight: 900,
            fontSize: 52,
            fontVariationSettings: "'opsz' 144, 'SOFT' 50",
            color: 'var(--film-mute)',
            letterSpacing: '-0.04em',
            textTransform: 'lowercase',
            marginTop: 28,
            opacity: 0,
            animation: 'pitchFade 600ms ease-out forwards',
            animationDelay: '1300ms',
          }}>
            recovera
          </div>
        </div>

        {/* Meta line — anchored to bottom */}
        <div style={{
          position: 'absolute',
          bottom: '9%',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 11,
          letterSpacing: '0.3em',
          color: 'var(--film-soft)',
          whiteSpace: 'nowrap',
          opacity: 0,
          animation: 'pitchFade 400ms ease-out forwards',
          animationDelay: '1500ms',
        }}>
          NOVAUCD 2026 · FIVE-MINUTE SUBMISSION
        </div>
      </div>
    );
  };
})();
