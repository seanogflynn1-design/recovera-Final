// Slide 0 — PRELUDE · DARK (5s) · DECK-BACKGROUND
// "In 2023, my father broke his ankle." Both lines arrive together.
// No SessionTimestamp on this slide — clock starts on slide 1.

(function () {
  function Slide00() {
    return (
      <div style={{ position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        paddingBottom: '8%',
      }}>
        <div style={{
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 700,
          fontVariationSettings: '"opsz" 144',
          fontSize: 64,
          letterSpacing: '-0.025em',
          color: 'var(--film-ink)',
          animation: 'pitchArrive 1000ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
        }}>
          In 2023,
        </div>
        <div style={{
          marginTop: 24,
          fontFamily: "'Fraunces', Georgia, serif",
          fontStyle: 'italic',
          fontWeight: 400,
          fontVariationSettings: '"opsz" 144',
          fontSize: 48,
          letterSpacing: '-0.02em',
          color: 'var(--film-ink)',
          animation: 'pitchArrive 1000ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
          animationDelay: '0ms',
        }}>
          my father broke his ankle.
        </div>
      </div>
    );
  }

  if (!window.PitchSlides) window.PitchSlides = {};
  window.PitchSlides[0] = Slide00;
})();
