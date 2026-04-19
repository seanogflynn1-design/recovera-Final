// Slide 00 — TITLE · DARK (4s) · DECK-FULL
// "recovera" wordmark, hairline rule, NovaUCD metadata, explanation line.
// Start of the SessionTimestamp clock.

(function () {
  function Slide00() {
    return (
      <div style={{ position: 'absolute', inset: 0 }}>
        {/* Centred stack — wordmark, rule, metadata */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontWeight: 900,
            fontVariationSettings: '"opsz" 144, "SOFT" 50',
            fontSize: 200, lineHeight: 1,
            letterSpacing: '-0.04em',
            color: 'var(--film-ink)',
            animation: 'pitchArrive 1000ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
          }}>
            recovera
          </div>
          <div style={{
            marginTop: 40,
            width: 80, height: 1,
            background: 'var(--film-ink)',
            opacity: 0.6,
            transformOrigin: 'left center',
            animation: 'pitchDraw 500ms cubic-bezier(0.65, 0, 0.35, 1) both',
            animationDelay: '1400ms',
          }}/>
          <div style={{
            marginTop: 40,
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: 12, fontWeight: 400,
            letterSpacing: '0.3em',
            color: 'var(--film-mute)',
            animation: 'pitchFade 400ms ease both',
            animationDelay: '2200ms',
          }}>
            NOVAUCD 2026 · FIVE-MINUTE SUBMISSION
          </div>
        </div>

        {/* Explanation — the museum placard. Bottom-centred, 100px from edge. */}
        <div style={{
          position: 'absolute',
          left: 0, right: 0, bottom: 100,
          textAlign: 'center',
          fontFamily: "'Inter', sans-serif",
          fontSize: 16, fontWeight: 500,
          letterSpacing: '0.02em',
          color: 'var(--film-mute)',
          animation: 'pitchFade 400ms ease both',
          animationDelay: '2200ms',
        }}>
          Software for physiotherapy clinics.
        </div>
      </div>
    );
  }
  if (!window.PitchSlides) window.PitchSlides = {};
  window.PitchSlides[0] = Slide00;
})();
