// Slide 01 — THE SCALE · DARK · 11000ms · DECK-LEFT
// "18 minutes every appointment, reconstructing from memory"
(function () {
  const KEYFRAMES = `
@keyframes pitchStrongArrive {
  from { opacity: 0; transform: scale(1.08); filter: blur(8px); }
  to   { opacity: 1; transform: scale(1.0);  filter: blur(0);   }
}
@keyframes pitchArrive {
  from { opacity: 0; transform: scale(1.04); filter: blur(4px); }
  to   { opacity: 1; transform: scale(1.0);  filter: blur(0);   }
}
@keyframes pitchDraw {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
@keyframes pitchFade {
  from { opacity: 0; }
  to   { opacity: 1; }
}
`;

  window.PitchSlides = window.PitchSlides || {};
  window.PitchSlides[1] = function SlideScale() {
    return (
      <div style={{ position: 'absolute', inset: 0 }}>
        <style>{KEYFRAMES}</style>

        {/* Explanation line */}
        <div style={{
          position: 'absolute', left: '6%', top: '8%', maxWidth: 840,
          fontFamily: "'Inter', sans-serif",
          fontSize: 17, fontWeight: 500, lineHeight: 1.4,
          letterSpacing: '0.005em',
          color: 'var(--film-mute)',
          opacity: 0,
          animation: 'pitchFade 400ms ease-out forwards',
          animationDelay: '0ms',
        }}>
          This isn&apos;t one family. This is every movement professional on earth — every appointment, every day.
        </div>

        {/* Hairline rule */}
        <div style={{
          position: 'absolute', left: '6%', top: '20%',
          width: 180, height: 1,
          background: 'var(--film-soft)',
          transformOrigin: 'left center',
          opacity: 0,
          animation: 'pitchDraw 500ms cubic-bezier(0.65, 0, 0.35, 1) forwards',
          animationDelay: '300ms',
        }} />

        {/* "18" hero numeral */}
        <div style={{
          position: 'absolute', left: '6%', top: '22%',
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 900,
          fontVariationSettings: "'opsz' 144",
          fontSize: 360, lineHeight: 1,
          letterSpacing: '-0.055em',
          color: 'var(--film-ink)',
          fontVariantNumeric: 'tabular-nums',
          opacity: 0,
          animation: 'pitchStrongArrive 1200ms cubic-bezier(0.15, 0.85, 0.15, 1) forwards',
          animationDelay: '600ms',
        }}>
          18
        </div>

        {/* Right text block — baseline-aligned with bottom of "18" */}
        <div style={{
          position: 'absolute', left: '30%', top: '68%', maxWidth: 560,
          fontFamily: "'Inter', sans-serif",
          fontSize: 26, fontWeight: 500, lineHeight: 1.3,
          letterSpacing: '-0.005em',
          color: 'var(--film-ink)',
          opacity: 0,
          animation: 'pitchArrive 800ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
          animationDelay: '900ms',
        }}>
          <div>minutes. Every appointment.</div>
          <div>Reconstructing — from memory —</div>
          <div>what happened at home.</div>
        </div>

        {/* Body copy */}
        <div style={{
          position: 'absolute', left: '6%', top: '76%', maxWidth: 820,
          fontFamily: "'Inter', sans-serif",
          fontSize: 17, fontWeight: 400, lineHeight: 1.6,
          color: 'var(--film-ink)',
          opacity: 0,
          animation: 'pitchFade 600ms ease-out forwards',
          animationDelay: '1800ms',
        }}>
          The HSE and NHS don&apos;t have a shortage of physios. They have a shortage of physio time. Give those minutes back and every physio treats more patients. This is a healthcare access problem.
        </div>

        {/* Why now */}
        <div style={{
          position: 'absolute', left: '6%', top: '84%', maxWidth: 700,
          fontFamily: "'Inter', sans-serif",
          fontSize: 14, fontWeight: 400, lineHeight: 1.5,
          color: 'var(--film-mute)',
          opacity: 0,
          animation: 'pitchFade 500ms ease-out forwards',
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
          position: 'absolute', left: '6%', top: '91%',
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 10, fontWeight: 400,
          letterSpacing: '0.18em',
          color: 'var(--film-mute)',
          opacity: 0,
          animation: 'pitchFade 400ms ease-out forwards',
          animationDelay: '2900ms',
        }}>
          SOURCE · RECOVERA PHYSIO INTERVIEWS · DUBLIN · Q4 2025 · N=12
        </div>
      </div>
    );
  };
})();
