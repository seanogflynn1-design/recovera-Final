// Slide 12 — THE ASK · DARK · 14000ms · DECK-LEFT
// "We need NovaUCD." → "Back us." The deck's final call to action.
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

  const EM_LINES = [
    { text: '— Research access. Movement health data. MISCP clinical network.', delay: 1600 },
    { text: '— Regulatory credibility. HSE and VHI need a university voice.', delay: 2000 },
    { text: '— €50k pre-seed. Six months. First commercial clinic live.', delay: 2400 },
  ];

  window.PitchSlides = window.PitchSlides || {};
  window.PitchSlides[12] = function SlideAsk() {
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
        }}>§ THE ASK</div>

        {/* Headline */}
        <div style={{
          position: 'absolute', top: '15%', left: '8%',
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 900, fontSize: 74, lineHeight: 1,
          letterSpacing: '-0.03em', color: 'var(--film-ink)',
          opacity: 0,
          animation: 'pitchStrongArrive 1200ms cubic-bezier(0.15, 0.85, 0.15, 1) forwards',
          animationDelay: '400ms',
        }}>We need{' '}
          <span style={{ color: 'var(--accent)' }}>NovaUCD.</span>
        </div>

        {/* Em-dash lines */}
        {EM_LINES.map(({ text, delay }) => (
          <div key={delay} style={{
            position: 'absolute', left: '8%',
            top: delay === 1600 ? '33%' : delay === 2000 ? '40%' : '47%',
            maxWidth: 860,
            fontFamily: "'Inter', sans-serif",
            fontSize: 17, fontWeight: 500, lineHeight: 1.6,
            color: 'var(--film-ink)',
            opacity: 0, animation: 'pitchFade 500ms ease-out forwards',
            animationDelay: delay + 'ms',
          }}>{text}</div>
        ))}

        {/* Italic paragraph */}
        <div style={{
          position: 'absolute', top: '57%', left: '8%', maxWidth: 860,
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 400, fontStyle: 'italic', fontSize: 20, lineHeight: 1.7,
          color: 'var(--film-mute)',
          opacity: 0, animation: 'pitchFade 600ms ease-out forwards',
          animationDelay: '3000ms',
        }}>
          This is not a research project waiting for permission. The product works. The market is real.
          The clinical problem is urgent. We are asking NovaUCD to be the partner that makes it impossible to ignore.
        </div>

        {/* Rule */}
        <div style={{
          position: 'absolute', left: '8%', top: '72%',
          width: '84%', height: 1,
          background: 'var(--film-soft)', transformOrigin: 'left center',
          opacity: 0, animation: 'pitchDraw 500ms cubic-bezier(0.65, 0, 0.35, 1) forwards',
          animationDelay: '3600ms',
        }} />

        {/* "Back us." — THE PEAK MOMENT */}
        <div style={{
          position: 'absolute', top: '76%', left: '8%',
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 900,
          fontVariationSettings: "'opsz' 144, 'SOFT' 50",
          fontSize: 120, lineHeight: 1,
          letterSpacing: '-0.04em', color: 'var(--film-ink)',
          opacity: 0,
          animation: 'pitchStrongArrive 1600ms cubic-bezier(0.15, 0.85, 0.15, 1) forwards',
          animationDelay: '3800ms',
        }}>Back us.</div>

        {/* Closing lines */}
        <div style={{
          position: 'absolute', top: '91%', left: '8%',
          opacity: 0, animation: 'pitchFade 600ms ease-out forwards',
          animationDelay: '11400ms',
        }}>
          <span style={{
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: 11, letterSpacing: '0.25em', color: 'var(--film-mute)',
          }}>RECOVERA · NOVAUCD 2025 · SEAN O&apos;FLYNN</span>
        </div>
      </div>
    );
  };
})();
