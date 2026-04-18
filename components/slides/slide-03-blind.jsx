// Slide 3 — BLIND. · DARK (4s) · DECK-FULL
// Pure visual punctuation. 800ms of blackness, then the word lands.

(function () {
  function Slide03() {
    return (
      <div style={{ position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 900,
          fontVariationSettings: '"opsz" 144',
          fontSize: 340, lineHeight: 1,
          letterSpacing: '-0.06em',
          color: 'var(--film-ink)',
          animation: 'pitchArrive 1000ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
          animationDelay: '800ms',
        }}>
          BLIND.
        </div>
      </div>
    );
  }
  if (!window.PitchSlides) window.PitchSlides = {};
  window.PitchSlides[3] = Slide03;
})();
