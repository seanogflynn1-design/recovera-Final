// Slide 02 — THE MONEY · DARK · 10000ms · DECK-LEFT
// Three companies raised billions validating this market — all made the same mistake.
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

  function Row({ name, valuation, sub, topPct, rulePct, delay }) {
    return (
      <>
        <div style={{
          position: 'absolute', left: '6%', top: topPct,
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 700, fontSize: 36, lineHeight: 1.1,
          color: 'var(--film-ink)',
          opacity: 0,
          animation: 'pitchArrive 800ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
          animationDelay: delay + 'ms',
        }}>{name}</div>
        <div style={{
          position: 'absolute', left: '58%', top: topPct,
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 400, fontSize: 36, lineHeight: 1.1,
          color: 'var(--film-mute)',
          opacity: 0,
          animation: 'pitchArrive 800ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
          animationDelay: delay + 'ms',
        }}>{valuation}</div>
        <div style={{
          position: 'absolute', left: '6%', top: `calc(${topPct} + 4.5%)`, maxWidth: '52%',
          fontFamily: "'Inter', sans-serif",
          fontSize: 14, fontWeight: 400, lineHeight: 1.5,
          color: 'var(--film-mute)',
          opacity: 0,
          animation: 'pitchArrive 800ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
          animationDelay: delay + 'ms',
        }}>{sub}</div>
        <div style={{
          position: 'absolute', left: '6%', top: rulePct,
          width: '56%', height: 1,
          background: 'var(--film-soft)',
          opacity: 0,
          animation: 'pitchArrive 800ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
          animationDelay: delay + 'ms',
        }} />
      </>
    );
  }

  window.PitchSlides = window.PitchSlides || {};
  window.PitchSlides[2] = function SlideMoney() {
    return (
      <div style={{ position: 'absolute', inset: 0 }}>
        <style>{KEYFRAMES}</style>

        {/* Explanation */}
        <div style={{
          position: 'absolute', left: '6%', top: '8%', maxWidth: 840,
          fontFamily: "'Inter', sans-serif",
          fontSize: 17, fontWeight: 500, lineHeight: 1.4,
          color: 'var(--film-mute)',
          opacity: 0,
          animation: 'pitchFade 400ms ease-out forwards',
          animationDelay: '0ms',
        }}>
          Three companies raised billions validating this market. All three made the same architectural mistake. That mistake is now the most valuable unclaimed position in healthcare.
        </div>

        {/* Eyebrow */}
        <div style={{
          position: 'absolute', left: '6%', top: '17%',
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 12, letterSpacing: '0.3em',
          color: 'var(--film-mute)',
          opacity: 0,
          animation: 'pitchFade 400ms ease-out forwards',
          animationDelay: '300ms',
        }}>
          § THE MARKET PROOF
        </div>

        {/* Column headers */}
        <div style={{
          position: 'absolute', left: '6%', top: '23%',
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 11, letterSpacing: '0.2em',
          color: 'var(--film-mute)',
          opacity: 0,
          animation: 'pitchFade 400ms ease-out forwards',
          animationDelay: '600ms',
        }}>COMPANY</div>
        <div style={{
          position: 'absolute', left: '58%', top: '23%',
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 11, letterSpacing: '0.2em',
          color: 'var(--film-mute)',
          opacity: 0,
          animation: 'pitchFade 400ms ease-out forwards',
          animationDelay: '600ms',
        }}>VALUATION</div>
        <div style={{
          position: 'absolute', left: '6%', top: '25.5%',
          width: '56%', height: 1,
          background: 'var(--film-soft)',
          opacity: 0,
          animation: 'pitchFade 400ms ease-out forwards',
          animationDelay: '600ms',
        }} />

        <Row
          name="Hinge Health"
          valuation="Valued at $6B"
          sub="Bypasses the clinician. Generic AI advice. Movement is individual — generic advice fails."
          topPct="29%" rulePct="36.5%"
          delay={900}
        />
        <Row
          name="Sword Health"
          valuation="Valued at $4B"
          sub="Replaces the physio appointment. Removes the expert judgment that makes outcomes trustworthy."
          topPct="39%" rulePct="43.5%"
          delay={1250}
        />
        <Row
          name="Kaia Health"
          valuation="$123M raised"
          sub="Validated smartphone AI reaches clinical equivalence with physiotherapists. Then routed around the clinician entirely."
          topPct="46%" rulePct="52%"
          delay={1600}
        />

        {/* Closing rule */}
        <div style={{
          position: 'absolute', left: '6%', top: '72%',
          width: '48%', height: 1,
          background: 'var(--film-ink)', opacity: 0,
          transformOrigin: 'left center',
          animation: 'pitchDraw 500ms cubic-bezier(0.65, 0, 0.35, 1) forwards',
          animationDelay: '2400ms',
        }} />

        {/* Punchline 1 */}
        <div style={{
          position: 'absolute', left: '6%', top: '78%',
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 900, fontSize: 44,
          color: 'var(--film-ink)',
          letterSpacing: '-0.025em',
          opacity: 0,
          animation: 'pitchArrive 900ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
          animationDelay: '2900ms',
        }}>
          They saw the market.
        </div>

        {/* Punchline 2 */}
        <div style={{
          position: 'absolute', left: '6%', top: '87%',
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 700, fontStyle: 'italic', fontSize: 34,
          color: 'var(--film-mute)',
          letterSpacing: '-0.02em',
          opacity: 0,
          animation: 'pitchArrive 800ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
          animationDelay: '3600ms',
        }}>
          They missed the insight.
        </div>
      </div>
    );
  };
})();
