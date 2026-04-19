// Slide 01 — THE PROBLEM · DARK (10s) · DECK-LEFT
// Explanation line at top, giant "18" left-anchored, supporting text
// baseline-right of the numeral (accent on "asking"), thesis sub-headline,
// source citation.

(function () {
  function Slide01() {
    const numeralLeft = Math.round(1920 * 0.12);   // 230
    const numeralTop  = 228;
    const numeralSize = 440;

    // Numeral visual baseline — Fraunces 900 sits at roughly 0.82 * fontSize
    // below the top of the block.
    const numeralBaseline = numeralTop + Math.round(numeralSize * 0.82);

    // Right-hand text block: 3 lines Inter 32px line-height 1.2.
    // Align the last line baseline with the numeral baseline.
    const lineHeight = 32 * 1.2;
    const rightTextTop = numeralBaseline - (2 * lineHeight + 32 * 0.82);
    const rightTextLeft = numeralLeft + numeralSize + 24;

    return (
      <div style={{ position: 'absolute', inset: 0 }}>
        {/* Explanation — top-left museum placard */}
        <div style={{
          position: 'absolute',
          left: Math.round(1920 * 0.10),
          top: Math.round(1080 * 0.08),
          maxWidth: 900,
          fontFamily: "'Inter', sans-serif",
          fontSize: 18, fontWeight: 500,
          letterSpacing: '0.01em',
          color: 'var(--film-mute)',
          animation: 'pitchFade 500ms ease both',
        }}>
          Here&apos;s how physiotherapy works today.
        </div>

        {/* Editorial hairline rule, 200px, anchored above the numeral */}
        <div style={{
          position: 'absolute',
          left: numeralLeft,
          top: numeralTop - 32,
          width: 200, height: 1,
          background: 'var(--film-soft)',
          transformOrigin: 'left center',
          animation: 'pitchDraw 500ms cubic-bezier(0.65, 0, 0.35, 1) both',
          animationDelay: '300ms',
        }}/>

        {/* 18 */}
        <div style={{
          position: 'absolute',
          left: numeralLeft,
          top: numeralTop,
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 900,
          fontVariationSettings: '"opsz" 144',
          fontSize: numeralSize, lineHeight: 1,
          letterSpacing: '-0.055em',
          color: 'var(--film-ink)',
          animation: 'pitchArrive 1200ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
          animationDelay: '700ms',
        }}>
          18
        </div>

        {/* Right-hand three-line label, baseline-aligned with numeral */}
        <div style={{
          position: 'absolute',
          left: rightTextLeft,
          top: rightTextTop,
          fontFamily: "'Inter', sans-serif",
          fontSize: 32, fontWeight: 500,
          lineHeight: 1.2,
          color: 'var(--film-ink)',
          letterSpacing: '-0.01em',
          animation: 'pitchArrive 800ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
          animationDelay: '1700ms',
        }}>
          <div>minutes a physio spends <span style={{ color: 'var(--accent)' }}>asking</span></div>
          <div>what happened at home,</div>
          <div>before every session.</div>
        </div>

        {/* Sub-thesis, aligned with numeral left edge */}
        <div style={{
          position: 'absolute',
          left: numeralLeft,
          top: numeralTop + numeralSize + 56,
          fontFamily: "'Inter', sans-serif",
          fontSize: 22, fontWeight: 500,
          lineHeight: 1.3,
          color: 'var(--film-ink)',
          letterSpacing: '-0.005em',
          animation: 'pitchArrive 800ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
          animationDelay: '2100ms',
        }}>
          Because between sessions, she has no data.
        </div>

        {/* Source citation */}
        <div style={{
          position: 'absolute',
          left: numeralLeft,
          top: numeralTop + numeralSize + 56 + 44,
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 10, fontWeight: 400,
          letterSpacing: '0.18em',
          color: 'var(--film-mute)',
          animation: 'pitchFade 400ms ease both',
          animationDelay: '2600ms',
        }}>
          SOURCE · RECOVERA PHYSIO INTERVIEWS · DUBLIN · Q4 2025 · N=12
        </div>
      </div>
    );
  }

  if (!window.PitchSlides) window.PitchSlides = {};
  window.PitchSlides[1] = Slide01;
})();
