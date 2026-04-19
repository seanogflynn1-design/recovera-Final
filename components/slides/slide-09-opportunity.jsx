// Slide 09 — THE OPPORTUNITY · DARK (12s) · DECK-LEFT
// Three concrete beats: the 14,200-clinic TAM, the €4.8M ARR path at
// 1,000 clinics, and the category ceiling (same engine, adjacent domains).
// Arithmetic is shown to the reviewer: 1,000 × €399 × 12 = €4.8M.

(function () {
  const INK  = 'var(--film-ink)';
  const MUTE = 'var(--film-mute)';
  const SOFT = 'var(--film-soft)';

  function Slide09() {
    const left = Math.round(1920 * 0.10);   // 192

    const explanationY = Math.round(1080 * 0.10);  // 108
    const eyebrowY     = Math.round(1080 * 0.24);  // 259
    const tamY         = eyebrowY + 56;            // 315
    const tamSubY      = tamY + 148;               // 463
    const rule1Y       = tamSubY + 60;             // 523
    const pathY        = rule1Y + 52;              // 575
    const pathMathY    = pathY + 104;              // 679
    const rule2Y       = pathMathY + 60;           // 739
    const ceilingY     = rule2Y + 36;              // 775
    const ceilingSubY  = ceilingY + 44;            // 819

    return (
      <div style={{ position: 'absolute', inset: 0 }}>
        {/* Explanation */}
        <div style={{
          position: 'absolute',
          left, top: explanationY,
          maxWidth: 1100,
          fontFamily: "'Inter', sans-serif",
          fontSize: 18, fontWeight: 500,
          lineHeight: 1.4,
          letterSpacing: '0.005em',
          color: MUTE,
          animation: 'pitchFade 500ms ease both',
        }}>
          14,200 physio clinics in Ireland and the UK. Capture 1,000 and that&apos;s &euro;4.8M ARR — before we leave physio.
        </div>

        {/* Eyebrow */}
        <div style={{
          position: 'absolute', left, top: eyebrowY,
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 13, fontWeight: 500,
          letterSpacing: '0.3em',
          color: MUTE,
          animation: 'pitchArrive 800ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
          animationDelay: '200ms',
        }}>
          § THE OPPORTUNITY
        </div>

        {/* TAM hero */}
        <div style={{
          position: 'absolute', left, top: tamY,
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 900,
          fontVariationSettings: '"opsz" 144',
          fontSize: 128, lineHeight: 1,
          letterSpacing: '-0.035em',
          color: INK,
          fontVariantNumeric: 'tabular-nums',
          animation: 'pitchArrive 1000ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
          animationDelay: '400ms',
        }}>
          14,200 <span style={{
            fontSize: 64, fontWeight: 400, color: MUTE, letterSpacing: '-0.02em',
          }}>clinics</span>
        </div>

        {/* TAM sub */}
        <div style={{
          position: 'absolute', left, top: tamSubY,
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 12, fontWeight: 500,
          letterSpacing: '0.28em',
          color: MUTE,
          animation: 'pitchFade 500ms ease both',
          animationDelay: '900ms',
        }}>
          IRELAND · UK · TOTAL ADDRESSABLE
        </div>

        {/* Rule 1 */}
        <div style={{
          position: 'absolute',
          left, top: rule1Y,
          width: 480, height: 1,
          background: SOFT,
          transformOrigin: 'left center',
          animation: 'pitchDraw 600ms cubic-bezier(0.65, 0, 0.35, 1) both',
          animationDelay: '1100ms',
        }}/>

        {/* Path — 1,000 clinics = €4.8M ARR */}
        <div style={{
          position: 'absolute', left, top: pathY,
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 700,
          fontVariationSettings: '"opsz" 144',
          fontSize: 80, lineHeight: 1,
          letterSpacing: '-0.028em',
          color: INK,
          animation: 'pitchArrive 1000ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
          animationDelay: '1300ms',
        }}>
          1,000 clinics = <span style={{ color: 'var(--accent)' }}>&euro;4.8M</span> ARR
        </div>

        {/* Path maths */}
        <div style={{
          position: 'absolute', left, top: pathMathY,
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 12, fontWeight: 500,
          letterSpacing: '0.22em',
          color: MUTE,
          animation: 'pitchFade 500ms ease both',
          animationDelay: '1800ms',
        }}>
          1,000 × &euro;399 × 12 MONTHS · 7% OF THE MARKET
        </div>

        {/* Rule 2 */}
        <div style={{
          position: 'absolute',
          left, top: rule2Y,
          width: 480, height: 1,
          background: SOFT,
          transformOrigin: 'left center',
          animation: 'pitchDraw 600ms cubic-bezier(0.65, 0, 0.35, 1) both',
          animationDelay: '2100ms',
        }}/>

        {/* Ceiling line */}
        <div style={{
          position: 'absolute', left, top: ceilingY,
          fontFamily: "'Fraunces', Georgia, serif",
          fontStyle: 'italic',
          fontWeight: 400,
          fontVariationSettings: '"opsz" 144',
          fontSize: 24, lineHeight: 1.3,
          letterSpacing: '-0.005em',
          color: INK,
          maxWidth: 1100,
          animation: 'pitchFade 800ms ease both',
          animationDelay: '2300ms',
        }}>
          Then the same engine runs every movement-based recovery.
        </div>

        {/* Ceiling sub */}
        <div style={{
          position: 'absolute', left, top: ceilingSubY,
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 12, fontWeight: 500,
          letterSpacing: '0.22em',
          color: MUTE,
          animation: 'pitchFade 500ms ease both',
          animationDelay: '2600ms',
        }}>
          NURSING HOMES · ELITE SPORT · PHARMA TRIALS · SURGICAL FOLLOW-UP
        </div>
      </div>
    );
  }

  if (!window.PitchSlides) window.PitchSlides = {};
  window.PitchSlides[9] = Slide09;
})();
