// Slide 05 — THE BILLION-DOLLAR GAP · DARK (12s) · DECK-LEFT
// Three valuation rows with sub-lines, hairline rule, verdict, source.

(function () {
  const COMPETITORS = [
    { name: 'Hinge Health',  value: '$6B' },
    { name: 'Sword Health',  value: '$4B' },
    { name: 'Kaia Health',   value: '$123M raised' },
  ];

  function Slide05() {
    const left = 120;
    const topStart = 240;
    const rowHeight = 100;
    const colWidth = 640;

    return (
      <div style={{ position: 'absolute', inset: 0 }}>
        {/* Eyebrow */}
        <div style={{
          position: 'absolute', top: 96, left,
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 13, fontWeight: 500,
          letterSpacing: '0.3em',
          color: 'var(--film-mute)',
          animation: 'pitchArrive 800ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
        }}>
          § THE MARKET
        </div>

        {/* Rows */}
        {COMPETITORS.map((c, i) => (
          <div key={c.name} style={{
            position: 'absolute',
            left, top: topStart + i * rowHeight,
            width: colWidth,
            display: 'flex', alignItems: 'baseline',
            justifyContent: 'space-between',
            animation: 'pitchArrive 800ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
            animationDelay: `${400 + i * 350}ms`,
          }}>
            <span style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontWeight: 700,
              fontVariationSettings: '"opsz" 144',
              fontSize: 48, lineHeight: 1,
              letterSpacing: '-0.025em',
              color: 'var(--film-ink)',
            }}>{c.name}</span>
            <span style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontWeight: 400,
              fontVariationSettings: '"opsz" 144',
              fontSize: 48, lineHeight: 1,
              letterSpacing: '-0.015em',
              color: 'var(--film-mute)',
              fontVariantNumeric: 'tabular-nums',
            }}>{c.value}</span>
          </div>
        ))}

        {/* Rule */}
        <div style={{
          position: 'absolute',
          left, top: topStart + 3 * rowHeight + 48,
          width: colWidth, height: 1,
          background: 'var(--film-soft)',
          transformOrigin: 'left center',
          animation: 'pitchDraw 500ms cubic-bezier(0.65, 0, 0.35, 1) both',
          animationDelay: `${400 + 3 * 350 + 500}ms`,
        }}/>

        {/* Verdict */}
        <div style={{
          position: 'absolute',
          left, top: topStart + 3 * rowHeight + 48 + 44,
          width: colWidth,
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 700,
          fontVariationSettings: '"opsz" 144',
          fontSize: 30, lineHeight: 1.25,
          letterSpacing: '-0.015em',
          color: 'var(--film-ink)',
          animation: 'pitchArrive 1000ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
          animationDelay: `${400 + 3 * 350 + 1000}ms`,
        }}>
          <div>All three routed around the clinician.</div>
          <div>That&apos;s the position they left open.</div>
        </div>

        {/* Source */}
        <div style={{
          position: 'absolute',
          left, top: topStart + 3 * rowHeight + 48 + 44 + 110,
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 11, fontWeight: 400,
          letterSpacing: '0.18em',
          color: 'var(--film-mute)',
          animation: 'pitchFade 400ms ease both',
          animationDelay: `${400 + 3 * 350 + 1400}ms`,
        }}>
          SOURCE · PUBLIC VALUATION REPORTS · 2024-25
        </div>
      </div>
    );
  }

  if (!window.PitchSlides) window.PitchSlides = {};
  window.PitchSlides[5] = Slide05;
})();
