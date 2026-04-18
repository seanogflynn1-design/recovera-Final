// Slide 01 — THE PROBLEM · DARK (12s) · DECK-LEFT
// Giant "18" anchors left; supporting text right of it, baseline-aligned.
// Explanation line top-left, source citation below.

(function () {
  function Slide01() {
    // Anchor x at 15% of 1920 = 288px. The rest cascades from there.
    const numeralLeft = 288;
    const numeralBaselineTop = 680;   // vertical centre of the numeral block

    return (
      <div style={{ position: 'absolute', inset: 0 }}>
        {/* Editorial hairline rule, 200px, anchored above the numeral */}
        <div style={{
          position: 'absolute',
          left: numeralLeft,
          top: numeralBaselineTop - 520 - 32,
          width: 200, height: 1,
          background: 'var(--film-soft)',
          transformOrigin: 'left center',
          animation: 'pitchDraw 500ms cubic-bezier(0.65, 0, 0.35, 1) both',
        }}/>

        {/* 18 */}
        <div style={{
          position: 'absolute',
          left: numeralLeft,
          top: numeralBaselineTop - 520,
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 900,
          fontVariationSettings: '"opsz" 144',
          fontSize: 520, lineHeight: 1,
          letterSpacing: '-0.055em',
          color: 'var(--film-ink)',
          animation: 'pitchArrive 1200ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
          animationDelay: '700ms',
        }}>
          18
        </div>

        {/* Right-hand label, baseline-aligned with bottom of numeral */}
        <div style={{
          position: 'absolute',
          left: numeralLeft + 440,
          top: numeralBaselineTop - 140,
          fontFamily: "'Inter', sans-serif",
          fontSize: 34, fontWeight: 500,
          lineHeight: 1.15,
          color: 'var(--film-ink)',
          letterSpacing: '-0.01em',
          animation: 'pitchArrive 800ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
          animationDelay: '1300ms',
        }}>
          <div>minutes lost per</div>
          <div>appointment to reassessment</div>
        </div>

        {/* Supporting headline, tight below numeral */}
        <div style={{
          position: 'absolute',
          left: numeralLeft,
          top: numeralBaselineTop + 56,
          fontFamily: "'Inter', sans-serif",
          fontSize: 22, fontWeight: 500,
          color: 'var(--film-ink)',
          letterSpacing: '-0.005em',
          animation: 'pitchArrive 800ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
          animationDelay: '1700ms',
        }}>
          = €70 in clinical time. Per visit. Every visit.
        </div>

        {/* Source citation */}
        <div style={{
          position: 'absolute',
          left: numeralLeft,
          top: numeralBaselineTop + 100,
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 11, fontWeight: 400,
          letterSpacing: '0.18em',
          color: 'var(--film-mute)',
          animation: 'pitchFade 400ms ease both',
          animationDelay: '2200ms',
        }}>
          SOURCE · RECOVERA PHYSIO INTERVIEWS · DUBLIN · Q4 2025 · N=12
        </div>
      </div>
    );
  }

  if (!window.PitchSlides) window.PitchSlides = {};
  window.PitchSlides[1] = Slide01;
})();
