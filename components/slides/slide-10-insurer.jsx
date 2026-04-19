// Slide 10 — THE INSURER · DARK · 9000ms · DECK-LEFT
// "Avoided re-injury." Three cost-avoidance headlines. Insurer rationale.
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

  const ARROWS = [
    { text: '→  Fewer re-injury claims. Fewer surgical repeats.',       delay: 1800 },
    { text: '→  Shorter claims windows. Lower chronic care exposure.',  delay: 2100 },
    { text: '→  Outcome data that insurers can show regulators.',       delay: 2400 },
  ];

  window.PitchSlides = window.PitchSlides || {};
  window.PitchSlides[10] = function SlideInsurer() {
    return (
      <div style={{ position: 'absolute', inset: 0 }}>
        <style>{KEYFRAMES}</style>

        {/* Eyebrow */}
        <div style={{
          position: 'absolute', top: '8%', left: '8%',
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 12, letterSpacing: '0.3em', color: 'var(--film-mute)',
          opacity: 0, animation: 'pitchFade 400ms ease-out forwards',
          animationDelay: '0ms',
        }}>§ THE INSURER</div>

        {/* Headline 1 */}
        <div style={{
          position: 'absolute', top: '17%', left: '8%',
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 900, fontSize: 58, lineHeight: 1,
          letterSpacing: '-0.03em', color: 'var(--film-ink)',
          opacity: 0, animation: 'pitchStrongArrive 1000ms cubic-bezier(0.15, 0.85, 0.15, 1) forwards',
          animationDelay: '400ms',
        }}>Avoided re-injury.</div>

        {/* Headline 2 */}
        <div style={{
          position: 'absolute', top: '29%', left: '8%',
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 700, fontSize: 42, lineHeight: 1,
          letterSpacing: '-0.025em', color: 'var(--film-mute)',
          opacity: 0, animation: 'pitchArrive 800ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
          animationDelay: '800ms',
        }}>Avoided re-surgery.</div>

        {/* Headline 3 */}
        <div style={{
          position: 'absolute', top: '39%', left: '8%',
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 700, fontSize: 30, lineHeight: 1,
          letterSpacing: '-0.02em', color: 'var(--film-mute)',
          opacity: 0, animation: 'pitchArrive 800ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
          animationDelay: '1100ms',
        }}>Avoided chronic pain management.</div>

        {/* Rule */}
        <div style={{
          position: 'absolute', left: '8%', top: '50%',
          width: '84%', height: 1,
          background: 'var(--film-soft)', transformOrigin: 'left center',
          opacity: 0, animation: 'pitchDraw 500ms cubic-bezier(0.65, 0, 0.35, 1) forwards',
          animationDelay: '1500ms',
        }} />

        {/* Arrow rows */}
        {ARROWS.map(({ text, delay }) => (
          <div key={delay} style={{
            position: 'absolute', left: '8%',
            top: delay === 1800 ? '55%' : delay === 2100 ? '63%' : '71%',
            fontFamily: "'Inter', sans-serif",
            fontSize: 16, fontWeight: 500, lineHeight: 1.6,
            color: 'var(--film-ink)',
            opacity: 0, animation: 'pitchFade 500ms ease-out forwards',
            animationDelay: delay + 'ms',
          }}>{text}</div>
        ))}

        {/* Closing italic paragraph */}
        <div style={{
          position: 'absolute', top: '82%', left: '8%', maxWidth: 860,
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 400, fontStyle: 'italic', fontSize: 18, lineHeight: 1.7,
          color: 'var(--film-mute)',
          opacity: 0, animation: 'pitchFade 600ms ease-out forwards',
          animationDelay: '3000ms',
        }}>
          The insurer does not need to believe in AI. They need to believe in lower claims costs.
          Recovera gives them the data to justify the partnership — and the outcomes to sustain it.
        </div>
      </div>
    );
  };
})();
