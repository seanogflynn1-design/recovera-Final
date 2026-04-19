// Slide 05 — WHY IT MATTERS · DARK (10s) · DECK-FULL
// Three economic blocks in a row: 18 min saved / 3× throughput / €399 price.
// Each block is one oversized Fraunces number + two lines of context.
// Tiny JetBrains source caption under the 3× claim anchors it to the audit.

(function () {
  const INK  = 'var(--film-ink)';
  const MUTE = 'var(--film-mute)';

  const BLOCKS = [
    {
      number: '18',
      unit: 'min',
      line1: 'of physio time back,',
      line2: 'every session.',
      accent: true,
    },
    {
      number: '3\u00d7',
      unit: null,
      line1: 'patients monitored,',
      line2: 'in the same hour.',
      source: 'BASED ON PILOT-CLINIC TIME AUDIT · N=1',
    },
    {
      number: '\u20ac399',
      unit: null,
      line1: 'per clinic, per month.',
      line2: 'Flat. Unlimited patients.',
    },
  ];

  function Slide05() {
    const centres = [320, 960, 1600];
    const colWidth = 440;
    const numberY  = 420;
    const line1Y   = numberY + 180;
    const line2Y   = line1Y + 36;
    const sourceY  = line2Y + 50;

    const eyebrowY = Math.round(1080 * 0.22);

    return (
      <div style={{ position: 'absolute', inset: 0 }}>
        {/* Explanation */}
        <div style={{
          position: 'absolute',
          left: Math.round(1920 * 0.10),
          top: Math.round(1080 * 0.08),
          maxWidth: 1000,
          fontFamily: "'Inter', sans-serif",
          fontSize: 18, fontWeight: 500,
          lineHeight: 1.4,
          letterSpacing: '0.005em',
          color: MUTE,
          animation: 'pitchFade 500ms ease both',
        }}>
          Why physio clinics pay. Three numbers.
        </div>

        {/* Eyebrow */}
        <div style={{
          position: 'absolute',
          left: Math.round(1920 * 0.10),
          top: eyebrowY,
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 13, fontWeight: 500,
          letterSpacing: '0.3em',
          color: MUTE,
          animation: 'pitchArrive 800ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
          animationDelay: '200ms',
        }}>
          § WHY IT MATTERS
        </div>

        {BLOCKS.map((b, i) => {
          const cx = centres[i];
          const arriveDelay = 600 + i * 450;
          return (
            <React.Fragment key={i}>
              {/* Big number */}
              <div style={{
                position: 'absolute',
                left: cx - colWidth / 2, top: numberY,
                width: colWidth, textAlign: 'center',
                fontFamily: "'Fraunces', Georgia, serif",
                fontWeight: 900,
                fontVariationSettings: '"opsz" 144',
                fontSize: 180, lineHeight: 1,
                letterSpacing: '-0.05em',
                color: b.accent ? 'var(--accent)' : INK,
                fontVariantNumeric: 'tabular-nums',
                animation: 'pitchArrive 1200ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
                animationDelay: `${arriveDelay}ms`,
              }}>
                {b.number}
                {b.unit && (
                  <span style={{
                    fontSize: 72,
                    fontWeight: 400,
                    color: MUTE,
                    letterSpacing: '-0.015em',
                    marginLeft: 12,
                  }}>
                    {b.unit}
                  </span>
                )}
              </div>

              {/* Line 1 */}
              <div style={{
                position: 'absolute',
                left: cx - colWidth / 2, top: line1Y,
                width: colWidth, textAlign: 'center',
                fontFamily: "'Fraunces', Georgia, serif",
                fontWeight: 400,
                fontVariationSettings: '"opsz" 144',
                fontSize: 24, lineHeight: 1.25,
                letterSpacing: '-0.005em',
                color: INK,
                animation: 'pitchFade 800ms ease both',
                animationDelay: `${arriveDelay + 500}ms`,
              }}>
                {b.line1}
              </div>

              {/* Line 2 */}
              <div style={{
                position: 'absolute',
                left: cx - colWidth / 2, top: line2Y,
                width: colWidth, textAlign: 'center',
                fontFamily: "'Fraunces', Georgia, serif",
                fontWeight: 400,
                fontVariationSettings: '"opsz" 144',
                fontSize: 24, lineHeight: 1.25,
                letterSpacing: '-0.005em',
                color: MUTE,
                animation: 'pitchFade 800ms ease both',
                animationDelay: `${arriveDelay + 700}ms`,
              }}>
                {b.line2}
              </div>

              {/* Source (only for middle block) */}
              {b.source && (
                <div style={{
                  position: 'absolute',
                  left: cx - colWidth / 2, top: sourceY,
                  width: colWidth, textAlign: 'center',
                  fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                  fontSize: 10, fontWeight: 400,
                  letterSpacing: '0.18em',
                  color: MUTE,
                  animation: 'pitchFade 600ms ease both',
                  animationDelay: `${arriveDelay + 1000}ms`,
                }}>
                  {b.source}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  if (!window.PitchSlides) window.PitchSlides = {};
  window.PitchSlides[5] = Slide05;
})();
