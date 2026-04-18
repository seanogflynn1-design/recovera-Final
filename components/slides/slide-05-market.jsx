// Slide 05 — THE BILLION-DOLLAR GAP · DARK (12s) · DECK-LEFT
// Three-row competitor table with sub-lines explaining each company's
// position, hairline rule, italic verdict with an accented "for".

(function () {
  const COMPETITORS = [
    {
      name: 'Hinge Health',
      value: '$6B',
      sub: 'Consumer pain app. Routes around the clinician.',
    },
    {
      name: 'Sword Health',
      value: '$4B',
      sub: 'Digital physiotherapy. Replaces in-person sessions.',
    },
    {
      name: 'Kaia Health',
      value: '$123M raised',
      sub: 'Camera AI for pain. No clinical integration.',
    },
  ];

  function Slide05() {
    const left = Math.round(1920 * 0.10);   // 192
    const tableWidth = 1040;
    const eyebrowY = Math.round(1080 * 0.22);              // 238
    const tableTop = eyebrowY + 64;                        // 302
    const headerRuleY = tableTop + 24;                     // 326
    const rowsStart = headerRuleY + 16;                    // 342
    const rowHeight = 130;
    const afterTableY = rowsStart + rowHeight * 3;         // 732
    const bottomRuleY = afterTableY + 44;                  // 776
    const verdictY = bottomRuleY + 40;                     // 816

    return (
      <div style={{ position: 'absolute', inset: 0 }}>
        {/* Explanation */}
        <div style={{
          position: 'absolute',
          left, top: Math.round(1080 * 0.08),
          maxWidth: 1000,
          fontFamily: "'Inter', sans-serif",
          fontSize: 18, fontWeight: 500,
          letterSpacing: '0.01em',
          color: 'var(--film-mute)',
          animation: 'pitchFade 500ms ease both',
        }}>
          Three companies built billion-dollar businesses skipping the physio. None built a tool for her.
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
          § THE MARKET
        </div>

        {/* Table header row */}
        <div style={{
          position: 'absolute', left, top: tableTop,
          width: tableWidth,
          display: 'flex', justifyContent: 'space-between',
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 11, fontWeight: 500,
          letterSpacing: '0.2em',
          color: 'var(--film-mute)',
          animation: 'pitchFade 400ms ease both',
          animationDelay: '500ms',
        }}>
          <span>COMPANY</span>
          <span>VALUATION</span>
        </div>

        {/* Header underline */}
        <div style={{
          position: 'absolute',
          left, top: headerRuleY,
          width: tableWidth, height: 1,
          background: 'var(--film-soft)',
          transformOrigin: 'left center',
          animation: 'pitchDraw 500ms cubic-bezier(0.65, 0, 0.35, 1) both',
          animationDelay: '600ms',
        }}/>

        {/* Rows */}
        {COMPETITORS.map((c, i) => {
          const rowY = rowsStart + i * rowHeight;
          const delay = 800 + i * 350;
          return (
            <React.Fragment key={c.name}>
              <div style={{
                position: 'absolute', left, top: rowY,
                width: tableWidth,
                display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
                animation: 'pitchArrive 800ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
                animationDelay: `${delay}ms`,
              }}>
                <span style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontWeight: 700,
                  fontVariationSettings: '"opsz" 144',
                  fontSize: 44, lineHeight: 1,
                  letterSpacing: '-0.022em',
                  color: 'var(--film-ink)',
                }}>{c.name}</span>
                <span style={{
                  fontFamily: "'Fraunces', Georgia, serif",
                  fontWeight: 400,
                  fontVariationSettings: '"opsz" 144',
                  fontSize: 44, lineHeight: 1,
                  letterSpacing: '-0.015em',
                  color: 'var(--film-mute)',
                  fontVariantNumeric: 'tabular-nums',
                }}>{c.value}</span>
              </div>
              <div style={{
                position: 'absolute', left, top: rowY + 60,
                fontFamily: "'Inter', sans-serif",
                fontSize: 16, fontWeight: 400,
                color: 'var(--film-mute)',
                letterSpacing: '0.005em',
                animation: 'pitchFade 600ms ease both',
                animationDelay: `${delay + 250}ms`,
              }}>
                {c.sub}
              </div>
              <div style={{
                position: 'absolute',
                left, top: rowY + rowHeight - 1,
                width: tableWidth, height: 1,
                background: 'var(--film-soft)',
                transformOrigin: 'left center',
                animation: 'pitchDraw 500ms cubic-bezier(0.65, 0, 0.35, 1) both',
                animationDelay: `${delay + 400}ms`,
              }}/>
            </React.Fragment>
          );
        })}

        {/* Bottom rule */}
        <div style={{
          position: 'absolute',
          left, top: bottomRuleY,
          width: 480, height: 1,
          background: 'rgba(237, 234, 227, 0.4)',
          transformOrigin: 'left center',
          animation: 'pitchDraw 500ms cubic-bezier(0.65, 0, 0.35, 1) both',
          animationDelay: `${800 + 3 * 350 + 600}ms`,
        }}/>

        {/* Verdict */}
        <div style={{
          position: 'absolute',
          left, top: verdictY,
          width: tableWidth,
          fontFamily: "'Fraunces', Georgia, serif",
          fontStyle: 'italic',
          fontWeight: 700,
          fontVariationSettings: '"opsz" 144',
          fontSize: 32, lineHeight: 1.25,
          letterSpacing: '-0.015em',
          color: 'var(--film-ink)',
          animation: 'pitchArrive 1000ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
          animationDelay: `${800 + 3 * 350 + 1000}ms`,
        }}>
          Recovera is the first platform built <span style={{
            color: 'var(--accent)',
            fontSize: 44,
            fontWeight: 900,
            fontStyle: 'italic',
            letterSpacing: '-0.02em',
          }}>for</span> the physio — not around her.
        </div>
      </div>
    );
  }

  if (!window.PitchSlides) window.PitchSlides = {};
  window.PitchSlides[5] = Slide05;
})();
