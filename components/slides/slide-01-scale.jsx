// Slide 01 — THE SCALE · DARK (11s) · DECK-LEFT
// "18 minutes every appointment, reconstructing from memory" — anchors the
// problem as healthcare access, not software convenience. Why-now callout:
// smartphone camera AI crossed clinical reliability in 2023 (peer-reviewed).

(function () {
  const INK  = 'var(--film-ink)';
  const MUTE = 'var(--film-mute)';
  const SOFT = 'var(--film-soft)';

  function Slide01() {
    // Layout math (1920×1080 canvas) — DECK-LEFT column: x=6%→x=62%.
    const leftX     = Math.round(1920 * 0.06);   // 115
    const rightColX = Math.round(1920 * 0.30);   // 576

    const explanationY = Math.round(1080 * 0.08); // 86
    const hairlineY    = Math.round(1080 * 0.20); // 216
    const heroY        = Math.round(1080 * 0.22); // 238
    const heroSize     = 360;
    const heroBottom   = heroY + heroSize;        // 598

    // Right text: 3 lines at 26px × 1.3 ≈ 101.4px, bottom-aligned with "18".
    const rightLineH = Math.round(26 * 1.3);              // 34
    const rightTop   = heroBottom - (3 * rightLineH);     // 496

    const bodyY   = heroBottom + 20;                      // 618
    // Body wraps to 3–4 lines at 17px × 1.6 ≈ 27.2px/line. Budget 4.
    const bodyH   = Math.round(4 * 17 * 1.6);             // 109
    const whyNowY = bodyY + bodyH + 14;                   // 741
    const sourceY = Math.round(1080 * 0.90);              // 972

    return (
      <div style={{ position: 'absolute', inset: 0 }}>
        {/* Explanation */}
        <div style={{
          position: 'absolute', left: leftX, top: explanationY,
          maxWidth: 840,
          fontFamily: "'Inter', sans-serif",
          fontSize: 17, fontWeight: 500, lineHeight: 1.4,
          letterSpacing: '0.005em',
          color: MUTE,
          animation: 'pitchFade 400ms ease-out both',
        }}>
          This isn&apos;t one family. This is every movement professional on earth — every appointment, every day.
        </div>

        {/* Hairline rule */}
        <div style={{
          position: 'absolute', left: leftX, top: hairlineY,
          width: 180, height: 1,
          background: SOFT,
          transformOrigin: 'left center',
          animation: 'pitchDraw 500ms cubic-bezier(0.65, 0, 0.35, 1) both',
          animationDelay: '300ms',
        }}/>

        {/* "18" hero */}
        <div style={{
          position: 'absolute', left: leftX, top: heroY,
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 900,
          fontVariationSettings: '"opsz" 144',
          fontSize: heroSize, lineHeight: 1,
          letterSpacing: '-0.055em',
          color: INK,
          fontVariantNumeric: 'tabular-nums',
          animation: 'pitchArriveEmphatic 1200ms cubic-bezier(0.15, 0.85, 0.15, 1) both',
          animationDelay: '600ms',
        }}>
          18
        </div>

        {/* Right text block — baseline-aligned with bottom of "18" */}
        <div style={{
          position: 'absolute', left: rightColX, top: rightTop,
          maxWidth: 560,
          fontFamily: "'Inter', sans-serif",
          fontSize: 26, fontWeight: 500, lineHeight: 1.3,
          letterSpacing: '-0.005em',
          color: INK,
          animation: 'pitchArrive 800ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
          animationDelay: '900ms',
        }}>
          <div>minutes. Every appointment.</div>
          <div>Reconstructing — from memory —</div>
          <div>what happened at home.</div>
        </div>

        {/* Body copy */}
        <div style={{
          position: 'absolute', left: leftX, top: bodyY,
          maxWidth: 820,
          fontFamily: "'Inter', sans-serif",
          fontSize: 17, fontWeight: 400, lineHeight: 1.6,
          color: INK,
          animation: 'pitchFade 600ms ease-out both',
          animationDelay: '1800ms',
        }}>
          The HSE and NHS don&apos;t have a shortage of physios. They have a shortage of physio time. Give those minutes back and every physio treats more patients. This is a healthcare access problem.
        </div>

        {/* Why now */}
        <div style={{
          position: 'absolute', left: leftX, top: whyNowY,
          maxWidth: 700,
          fontFamily: "'Inter', sans-serif",
          fontSize: 14, fontWeight: 400, lineHeight: 1.5,
          color: MUTE,
          animation: 'pitchFade 500ms ease-out both',
          animationDelay: '2400ms',
        }}>
          <span style={{
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: 11, fontWeight: 500,
            letterSpacing: '0.2em',
            color: 'var(--accent)',
            marginRight: 8,
          }}>WHY NOW ·</span>
          In 2023, smartphone camera AI crossed clinical reliability. Peer-reviewed. Published by a competitor.
        </div>

        {/* Source */}
        <div style={{
          position: 'absolute', left: leftX, top: sourceY,
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 10, fontWeight: 400,
          letterSpacing: '0.18em',
          color: MUTE,
          animation: 'pitchFade 400ms ease-out both',
          animationDelay: '2900ms',
        }}>
          SOURCE · RECOVERA PHYSIO INTERVIEWS · DUBLIN · Q4 2025 · N=12
        </div>
      </div>
    );
  }

  if (!window.PitchSlides) window.PitchSlides = {};
  window.PitchSlides[1] = Slide01;
})();
