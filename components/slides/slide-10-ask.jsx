// Slide 11 — THE ASK · DARK (12s) · DECK-LEFT → DECK-BACKGROUND
// Final slide. "We need NovaUCD." → three em-dash lines → rule → "Back us."
// peak emphatic arrive.

(function () {
  const ASK_LINES = [
    '— To run the 90-day pilot in June',
    '— To hire the CTO',
    '— To turn a working prototype into a working business',
  ];

  function Slide10() {
    const left = Math.round(1920 * 0.10);  // 192
    const topEyebrow = 140;
    const topHeadline = topEyebrow + 72;
    const topLines = topHeadline + 48 + 100;
    const topRule = topLines + ASK_LINES.length * 56 + 72 - 36;
    const topBack = topRule + 48;

    return (
      <div style={{ position: 'absolute', inset: 0 }}>
        {/* Eyebrow */}
        <div style={{
          position: 'absolute', top: topEyebrow, left,
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 13, fontWeight: 500,
          letterSpacing: '0.3em',
          color: 'var(--film-mute)',
          animation: 'pitchArrive 800ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
        }}>
          § THE ASK
        </div>

        {/* We need NovaUCD. */}
        <div style={{
          position: 'absolute', top: topHeadline, left,
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 900,
          fontVariationSettings: '"opsz" 144',
          fontSize: 88, lineHeight: 1,
          letterSpacing: '-0.03em',
          color: 'var(--film-ink)',
          animation: 'pitchArrive 1000ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
          animationDelay: '300ms',
        }}>
          We need NovaUCD.
        </div>

        {/* Three em-dash lines */}
        {ASK_LINES.map((line, i) => (
          <div key={i} style={{
            position: 'absolute', top: topLines + i * 56, left,
            fontFamily: "'Fraunces', Georgia, serif",
            fontWeight: 400,
            fontSize: 28, lineHeight: 1.3,
            letterSpacing: '-0.005em',
            color: 'var(--film-ink)',
            animation: 'pitchArrive 800ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
            animationDelay: `${900 + i * 400}ms`,
          }}>
            {line}
          </div>
        ))}

        {/* Rule */}
        <div style={{
          position: 'absolute', top: topRule, left,
          width: 480, height: 1,
          background: 'var(--film-soft)',
          transformOrigin: 'left center',
          animation: 'pitchDraw 500ms cubic-bezier(0.65, 0, 0.35, 1) both',
          animationDelay: `${900 + ASK_LINES.length * 400 + 200}ms`,
        }}/>

        {/* Back us. — most emphatic arrive */}
        <div style={{
          position: 'absolute', top: topBack, left,
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 900,
          fontVariationSettings: '"opsz" 144',
          fontSize: 160, lineHeight: 1,
          letterSpacing: '-0.035em',
          color: 'var(--film-ink)',
          animation: 'pitchArriveEmphatic 1400ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
          animationDelay: `${900 + ASK_LINES.length * 400 + 800}ms`,
        }}>
          Back us.
        </div>
      </div>
    );
  }

  if (!window.PitchSlides) window.PitchSlides = {};
  window.PitchSlides[10] = Slide10;
})();
