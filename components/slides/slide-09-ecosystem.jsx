// Slide 09 — THE ECOSYSTEM · DARK · 11000ms · DECK-LEFT
// "The platform that compounds indefinitely." Five compounding-layer rows.
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
      label: 'PROFESSIONAL NETWORK',
      body: 'Clinicians refer within the platform. Every new clinic expands the referral surface for every other clinic.',
      labelColor: 'var(--accent)',
      delay: 1900,
    },
    {
      label: 'DATA ASSET',
      body: 'Aggregated, anonymised movement data becomes a proprietary clinical intelligence layer no competitor can replicate.',
      labelColor: 'var(--film-mute)',
      delay: 2200,
    },
    {
      label: 'WORKFLOW LOCK',
      body: 'Once the AI brief is inside the clinical workflow, removing it is operationally disruptive. Switching cost is high by design.',
      labelColor: 'var(--film-mute)',
      delay: 2500,
    },
    {
      label: 'INSTITUTIONAL LAYER',
      body: 'Hospital systems, sports bodies, and insurer networks adopt Recovera as infrastructure. Not a tool — a standard.',
      labelColor: 'var(--film-mute)',
      delay: 2800,
    },
    {
      label: 'THE FLYWHEEL',
      body: 'More patients → better model → better outcomes → more clinics → more patients. Each rotation accelerates the next.',
      labelColor: 'var(--film-mute)',
      delay: 3100,
    },
  ];

  function EcoRow({ label, body, labelColor, delay }) {
    return (
      <div style={{
        opacity: 0,
        animation: 'pitchFade 500ms ease-out forwards',
        animationDelay: delay + 'ms',
      }}>
        <div style={{
          width: '100%', height: 1,
          background: 'var(--film-soft)',
          transformOrigin: 'left center',
          opacity: 0,
          animation: 'pitchDraw 400ms cubic-bezier(0.65, 0, 0.35, 1) forwards',
          animationDelay: delay + 'ms',
          marginBottom: 8,
        }} />
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24 }}>
          <div style={{
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: 10, letterSpacing: '0.2em',
            color: labelColor,
            minWidth: 220, paddingTop: 2,
          }}>{label}</div>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 14, fontWeight: 400, lineHeight: 1.6,
            color: 'var(--film-mute)',
            maxWidth: 560,
          }}>{body}</div>
        </div>
      </div>
    );
  }

  window.PitchSlides = window.PitchSlides || {};
  window.PitchSlides[9] = function SlideEcosystem() {
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
        }}>§ THE ECOSYSTEM</div>

        {/* Hero line 1 */}
        <div style={{
          position: 'absolute', top: '15%', left: '8%',
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 700, fontSize: 42, lineHeight: 1.1,
          letterSpacing: '-0.02em', color: 'var(--film-ink)',
          opacity: 0, animation: 'pitchArrive 800ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
          animationDelay: '400ms',
        }}>The platform that</div>

        {/* Hero line 2 */}
        <div style={{
          position: 'absolute', top: '23%', left: '8%',
          opacity: 0, animation: 'pitchArrive 1000ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
          animationDelay: '700ms',
        }}>
          <span style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontWeight: 900, fontSize: 60, lineHeight: 1,
            letterSpacing: '-0.03em', color: 'var(--accent)',
          }}>compounds</span>
          <span style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontWeight: 900, fontSize: 60, lineHeight: 1,
            letterSpacing: '-0.03em', color: 'var(--film-ink)',
          }}> indefinitely.</span>
        </div>

        {/* Rows */}
        <div style={{
          position: 'absolute', top: '38%', left: '8%', right: '8%',
          display: 'flex', flexDirection: 'column', gap: 14,
        }}>
          {ROWS.map((row) => (
            <EcoRow key={row.label} {...row} />
          ))}
        </div>

        {/* Closing body */}
        <div style={{
          position: 'absolute', top: '88%', left: '8%', maxWidth: 760,
          fontFamily: "'Inter', sans-serif",
          fontSize: 15, fontWeight: 500, lineHeight: 1.6,
          color: 'var(--film-mute)',
          opacity: 0, animation: 'pitchFade 600ms ease-out forwards',
          animationDelay: '4200ms',
        }}>
          Recovera is not a SaaS product. It is a compounding clinical intelligence platform.
        </div>

        {/* Closing accent */}
        <div style={{
          position: 'absolute', top: '93%', left: '8%',
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 700, fontStyle: 'italic', fontSize: 22,
          color: 'var(--accent)',
          opacity: 0, animation: 'pitchFade 600ms ease-out forwards',
          animationDelay: '4700ms',
        }}>The network effect is structural. It cannot be purchased.</div>
      </div>
    );
  };
})();
