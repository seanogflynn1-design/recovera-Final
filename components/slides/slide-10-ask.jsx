// Slide 10 — THE ASK · DARK (12s) · DECK-LEFT
// Explanation line proves the company is real; "We need NovaUCD." headline,
// three em-dash pilot asks, hairline rule, "Back us." peak-emphatic payoff.

(function () {
  const ASK_LINES = [
    '— To run the 90-day pilot in June',
    '— To hire the CTO',
    '— To turn the prototype into a business',
  ];

  function Slide10() {
    const left = Math.round(1920 * 0.10);    // 192
    const explanationY = Math.round(1080 * 0.10);   // 108
    const eyebrowY     = Math.round(1080 * 0.24);   // 259
    const headlineY    = eyebrowY + 56;             // 315
    const linesY       = headlineY + 96;            // 411  (80 headline + 16 gap, tight)
    const rulesY       = linesY + ASK_LINES.length * 44 + 56;  // 599
    const backY        = rulesY + 40;               // 639

    return (
      <div style={{ position: 'absolute', inset: 0 }}>
        {/* Explanation */}
        <div style={{
          position: 'absolute',
          left, top: explanationY,
          maxWidth: 900,
          fontFamily: "'Inter', sans-serif",
          fontSize: 18, fontWeight: 500,
          lineHeight: 1.4,
          letterSpacing: '0.005em',
          color: 'var(--film-mute)',
          animation: 'pitchFade 500ms ease both',
        }}>
          Recovera is a real company: prototype built, clinical advisor on board, three pilot clinics recruited. Now asking for NovaUCD&apos;s 90 days to run the pilot.
        </div>

        {/* Eyebrow */}
        <div style={{
          position: 'absolute', left, top: eyebrowY,
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 13, fontWeight: 500,
          letterSpacing: '0.3em',
          color: 'var(--film-mute)',
          animation: 'pitchArrive 800ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
          animationDelay: '200ms',
        }}>
          § THE ASK
        </div>

        {/* We need NovaUCD. */}
        <div style={{
          position: 'absolute', left, top: headlineY,
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 900,
          fontVariationSettings: '"opsz" 144',
          fontSize: 80, lineHeight: 1,
          letterSpacing: '-0.03em',
          color: 'var(--film-ink)',
          animation: 'pitchArrive 1000ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
          animationDelay: '500ms',
        }}>
          We need NovaUCD.
        </div>

        {/* Three em-dash lines */}
        {ASK_LINES.map((line, i) => (
          <div key={i} style={{
            position: 'absolute', top: linesY + i * 44, left,
            fontFamily: "'Fraunces', Georgia, serif",
            fontWeight: 400,
            fontSize: 26, lineHeight: 1.3,
            letterSpacing: '-0.005em',
            color: 'var(--film-ink)',
            animation: 'pitchArrive 800ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
            animationDelay: `${1000 + i * 400}ms`,
          }}>
            {line}
          </div>
        ))}

        {/* Rule */}
        <div style={{
          position: 'absolute', left, top: rulesY,
          width: 480, height: 1,
          background: 'var(--film-soft)',
          transformOrigin: 'left center',
          animation: 'pitchDraw 500ms cubic-bezier(0.65, 0, 0.35, 1) both',
          animationDelay: `${1000 + ASK_LINES.length * 400 + 200}ms`,
        }}/>

        {/* Back us. — peak emphatic arrive */}
        <div style={{
          position: 'absolute', left, top: backY,
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 900,
          fontVariationSettings: '"opsz" 144',
          fontSize: 140, lineHeight: 1,
          letterSpacing: '-0.035em',
          color: 'var(--film-ink)',
          animation: 'pitchArriveEmphatic 1400ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
          animationDelay: `${1000 + ASK_LINES.length * 400 + 800}ms`,
        }}>
          Back us.
        </div>
      </div>
    );
  }

  if (!window.PitchSlides) window.PitchSlides = {};
  window.PitchSlides[10] = Slide10;
})();
