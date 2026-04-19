// Slide 08 — THE MOAT · DARK · 11000ms · DECK-LEFT
// "The AI learns." Four compound-advantage rows. Terminal moat statement.
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

  const ROWS = [
    {
      label: 'CLINICAL DATA',
      body: 'Every session feeds the model. Movement patterns, recovery trajectories, failure modes. No competitor can buy this.',
      labelColor: 'var(--accent)',
      delay: 1700,
    },
    {
      label: 'PATTERN RECOGNITION',
      body: 'The model identifies what predicts recovery — and what predicts relapse. It gets better with every patient.',
      labelColor: 'var(--film-mute)',
      delay: 2000,
    },
    {
      label: 'THE GAP WIDENS',
      body: 'Clinics that run on Recovera produce better outcomes. Better outcomes produce more referrals. More referrals produce more data.',
      labelColor: 'var(--film-mute)',
      delay: 2300,
    },
    {
      label: 'THE TERMINAL ADVANTAGE',
      body: 'A new entrant would need years of clinical deployment to replicate what we have built. The data cannot be cloned.',
      labelColor: 'var(--film-mute)',
      delay: 2600,
    },
  ];

  function MoatRow({ label, body, labelColor, delay }) {
    return (
      <div style={{
        opacity: 0,
        animation: 'pitchFade 500ms ease-out forwards',
        animationDelay: delay + 'ms',
        marginBottom: 0,
      }}>
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: 0,
        }}>
          <div style={{
            width: '100%', height: 1,
            background: 'var(--film-soft)',
            transformOrigin: 'left center',
            opacity: 0,
            animation: 'pitchDraw 400ms cubic-bezier(0.65, 0, 0.35, 1) forwards',
            animationDelay: delay + 'ms',
            marginBottom: 10,
          }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24 }}>
          <div style={{
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: 10, letterSpacing: '0.2em',
            color: labelColor,
            minWidth: 220, paddingTop: 2,
          }}>{label}</div>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 15, fontWeight: 400, lineHeight: 1.6,
            color: 'var(--film-mute)',
            maxWidth: 560,
          }}>{body}</div>
        </div>
      </div>
    );
  }

  window.PitchSlides = window.PitchSlides || {};
  window.PitchSlides[8] = function SlideMoat() {
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
        }}>§ THE MOAT</div>

        {/* Hero */}
        <div style={{
          position: 'absolute', top: '15%', left: '8%',
          opacity: 0,
          animation: 'pitchStrongArrive 1200ms cubic-bezier(0.15, 0.85, 0.15, 1) forwards',
          animationDelay: '600ms',
        }}>
          <span style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontWeight: 900, fontSize: 80, lineHeight: 1,
            letterSpacing: '-0.03em', color: 'var(--film-ink)',
          }}>The AI </span>
          <span style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontWeight: 900, fontSize: 80, lineHeight: 1,
            letterSpacing: '-0.03em', color: 'var(--accent)',
          }}>learns.</span>
        </div>

        {/* Subline */}
        <div style={{
          position: 'absolute', top: '31%', left: '8%',
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 400, fontStyle: 'italic', fontSize: 26,
          color: 'var(--film-mute)',
          opacity: 0, animation: 'pitchFade 600ms ease-out forwards',
          animationDelay: '1000ms',
        }}>Every session. Every patient. Every condition.</div>

        {/* Rows */}
        <div style={{
          position: 'absolute', top: '42%', left: '8%', right: '8%',
          display: 'flex', flexDirection: 'column', gap: 18,
        }}>
          {ROWS.map((row) => (
            <MoatRow key={row.label} {...row} />
          ))}
        </div>

        {/* Bottom rule */}
        <div style={{
          position: 'absolute', left: '8%', top: '82%',
          width: '84%', height: 1,
          background: 'var(--film-soft)', transformOrigin: 'left center',
          opacity: 0, animation: 'pitchDraw 500ms cubic-bezier(0.65, 0, 0.35, 1) forwards',
          animationDelay: '3200ms',
        }} />

        {/* Closing line 1 */}
        <div style={{
          position: 'absolute', top: '86%', left: '8%',
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 700, fontSize: 28, letterSpacing: '-0.02em',
          color: 'var(--film-ink)',
          opacity: 0, animation: 'pitchFade 600ms ease-out forwards',
          animationDelay: '3700ms',
        }}>The moat is not the software.</div>

        {/* Closing line 2 */}
        <div style={{
          position: 'absolute', top: '91%', left: '8%',
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 400, fontStyle: 'italic', fontSize: 22,
          color: 'var(--accent)',
          opacity: 0, animation: 'pitchFade 600ms ease-out forwards',
          animationDelay: '4000ms',
        }}>It is what the software generates — and it compounds indefinitely.</div>
      </div>
    );
  };
})();
