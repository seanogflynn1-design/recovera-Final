// Slide 11 — THE CEILING · DARK · 13000ms · DECK-LEFT
// "€500B+" market. Four rollout rows. "Stripe. Veeva. Recovera."
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

  const ROLLOUT = [
    { label: 'NOW · PILOT',  body: 'Dublin physio clinics. ACL, shoulder, hip. Tight feedback loop. Model training begins.',              delay: 2200 },
    { label: 'YEAR 1',       body: 'Ireland national rollout. Sports bodies. VHI / Laya partnerships. 50 clinic target.',               delay: 2750 },
    { label: 'YEAR 2',       body: 'UK expansion. NHS physiotherapy referral pathway. BUPA, AXA commercial channel.',                   delay: 3300 },
    { label: 'YEAR 3+',      body: 'EU and North America. Orthopaedics, cardio rehab, neurological recovery. Platform licensing.',       delay: 3850 },
  ];

  function RolloutRow({ label, body, delay }) {
    return (
      <div style={{
        opacity: 0,
        animation: 'pitchFade 500ms ease-out forwards',
        animationDelay: delay + 'ms',
      }}>
        <div style={{
          width: '100%', height: 1,
          background: 'var(--film-soft)', transformOrigin: 'left center',
          opacity: 0,
          animation: 'pitchDraw 400ms cubic-bezier(0.65, 0, 0.35, 1) forwards',
          animationDelay: delay + 'ms',
          marginBottom: 8,
        }} />
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24 }}>
          <div style={{
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: 10, letterSpacing: '0.2em',
            color: 'var(--film-mute)',
            minWidth: 160, paddingTop: 2,
          }}>{label}</div>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 14, fontWeight: 400, lineHeight: 1.6,
            color: 'var(--film-mute)',
            maxWidth: 660,
          }}>{body}</div>
        </div>
      </div>
    );
  }

  window.PitchSlides = window.PitchSlides || {};
  window.PitchSlides[11] = function SlideCeiling() {
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
        }}>§ THE CEILING</div>

        {/* Hero number */}
        <div style={{
          position: 'absolute', top: '14%', left: '8%',
          opacity: 0,
          animation: 'pitchStrongArrive 1200ms cubic-bezier(0.15, 0.85, 0.15, 1) forwards',
          animationDelay: '400ms',
        }}>
          <span style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontWeight: 900, fontSize: 100, lineHeight: 1,
            letterSpacing: '-0.04em', color: 'var(--film-ink)',
          }}>€500B</span>
          <span style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontWeight: 900, fontSize: 100, lineHeight: 1,
            letterSpacing: '-0.04em', color: 'var(--accent)',
          }}>+</span>
        </div>

        {/* Subline 1 */}
        <div style={{
          position: 'absolute', top: '31%', left: '8%',
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 700, fontSize: 28, lineHeight: 1.1,
          letterSpacing: '-0.02em', color: 'var(--film-ink)',
          opacity: 0, animation: 'pitchFade 600ms ease-out forwards',
          animationDelay: '1100ms',
        }}>global movement health market.</div>

        {/* Subline 2 */}
        <div style={{
          position: 'absolute', top: '38%', left: '8%',
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 400, fontStyle: 'italic', fontSize: 22,
          color: 'var(--film-mute)',
          opacity: 0, animation: 'pitchFade 600ms ease-out forwards',
          animationDelay: '1500ms',
        }}>No intelligence layer. Anywhere.</div>

        {/* Rollout rows */}
        <div style={{
          position: 'absolute', top: '48%', left: '8%', right: '8%',
          display: 'flex', flexDirection: 'column', gap: 14,
        }}>
          {ROLLOUT.map((row) => (
            <RolloutRow key={row.label} {...row} />
          ))}
        </div>

        {/* Bottom rule */}
        <div style={{
          position: 'absolute', left: '8%', top: '84%',
          width: '84%', height: 1,
          background: 'var(--film-soft)', transformOrigin: 'left center',
          opacity: 0, animation: 'pitchDraw 500ms cubic-bezier(0.65, 0, 0.35, 1) forwards',
          animationDelay: '4600ms',
        }} />

        {/* Comparable */}
        <div style={{
          position: 'absolute', top: '89%', left: '8%',
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 900, fontSize: 36, lineHeight: 1,
          letterSpacing: '-0.02em', color: 'var(--film-ink)',
          opacity: 0, animation: 'pitchArrive 800ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
          animationDelay: '4900ms',
        }}>Stripe. Veeva.{' '}
          <span style={{ color: 'var(--accent)' }}>Recovera.</span>
        </div>
      </div>
    );
  };
})();
