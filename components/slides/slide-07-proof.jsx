// Slide 07 — THE PROOF · DARK · 10000ms · DECK-FULL
// Three stat blocks centred. "Four weeks faster recovery."
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

  // Block layout: 3 × 280px + 2 × 120px gap = 1080px
  // Left edge: (1920 – 1080) / 2 = 420px
  const B1 = 420, B2 = 820, B3 = 1220, BW = 280;

  function StatBlock({ left, numEl, label1, label2, source, numDelay }) {
    return (
      <div style={{ position: 'absolute', left, top: '26%', width: BW, textAlign: 'center' }}>
        <div style={{
          opacity: 0,
          animation: 'pitchArrive 1000ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
          animationDelay: numDelay + 'ms',
        }}>
          {numEl}
        </div>
        <div style={{
          opacity: 0,
          animation: 'pitchFade 400ms ease-out forwards',
          animationDelay: '1900ms',
        }}>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 17, fontWeight: 500, lineHeight: 1.4,
            color: 'var(--film-ink)', marginTop: 16,
          }}>{label1}</div>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 15, fontWeight: 400, lineHeight: 1.4,
            color: 'var(--film-mute)', marginTop: 4,
          }}>{label2}</div>
          {source && (
            <div style={{
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: 9, letterSpacing: '0.15em',
              color: 'var(--film-mute)', marginTop: 12,
            }}>{source}</div>
          )}
        </div>
      </div>
    );
  }

  window.PitchSlides = window.PitchSlides || {};
  window.PitchSlides[7] = function SlideProof() {
    return (
      <div style={{ position: 'absolute', inset: 0 }}>
        <style>{KEYFRAMES}</style>

        {/* Explanation */}
        <div style={{
          position: 'absolute', top: '8%', left: '50%',
          transform: 'translateX(-50%)',
          maxWidth: 1060, textAlign: 'center',
          fontFamily: "'Inter', sans-serif",
          fontSize: 16, fontWeight: 500, lineHeight: 1.4,
          color: 'var(--film-mute)',
          opacity: 0, animation: 'pitchFade 400ms ease-out forwards',
          animationDelay: '0ms',
        }}>
          When the AI brief replaces reconstruction, everything changes. Not just clinical efficiency — the number of people the movement health system can actually serve.
        </div>

        {/* Eyebrow */}
        <div style={{
          position: 'absolute', top: '18%', left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 12, letterSpacing: '0.3em', color: 'var(--film-mute)',
          opacity: 0, animation: 'pitchFade 400ms ease-out forwards',
          animationDelay: '300ms',
        }}>§ THE PROOF</div>

        {/* Vertical dividers */}
        {['37.5%', '62.5%'].map((left) => (
          <div key={left} style={{
            position: 'absolute', left, top: '26%', height: '38%', width: 1,
            background: 'var(--film-soft)',
            opacity: 0, animation: 'pitchFade 400ms ease-out forwards',
            animationDelay: '600ms',
          }} />
        ))}

        {/* Block 1 — 18 min */}
        <StatBlock
          left={B1} numDelay={800}
          numEl={
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 4 }}>
              <span style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontWeight: 900, fontSize: 76, lineHeight: 1,
                letterSpacing: '-0.03em', color: 'var(--accent)',
              }}>18</span>
              <span style={{
                fontFamily: "'Fraunces', Georgia, serif",
                fontWeight: 700, fontSize: 38, lineHeight: 1,
                color: 'var(--film-mute)', paddingBottom: 8,
              }}>min</span>
            </div>
          }
          label1="returned to treatment"
          label2="every session"
        />

        {/* Block 2 — 3× */}
        <StatBlock
          left={B2} numDelay={1100}
          numEl={
            <div style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontWeight: 900, fontSize: 76, lineHeight: 1,
              letterSpacing: '-0.03em', color: 'var(--film-ink)',
              textAlign: 'center',
            }}>3×</div>
          }
          label1="more patients monitored"
          label2="same clinician, same hours"
          source="PILOT-CLINIC AUDIT · N=1"
        />

        {/* Block 3 — 512M */}
        <StatBlock
          left={B3} numDelay={1400}
          numEl={
            <div style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontWeight: 900, fontSize: 68, lineHeight: 1,
              letterSpacing: '-0.03em', color: 'var(--film-ink)',
              textAlign: 'center',
            }}>512M</div>
          }
          label1="minutes lost annually"
          label2="Ireland + UK · to reconstruction"
        />

        {/* Bottom rule */}
        <div style={{
          position: 'absolute', left: '10%', top: '70%',
          width: '80%', height: 1,
          background: 'var(--film-soft)', transformOrigin: 'left center',
          opacity: 0, animation: 'pitchDraw 500ms cubic-bezier(0.65, 0, 0.35, 1) forwards',
          animationDelay: '2700ms',
        }} />

        {/* Synthesis 1 */}
        <div style={{
          position: 'absolute', top: '76%', left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 700, fontSize: 32,
          color: 'var(--film-ink)', letterSpacing: '-0.02em',
          whiteSpace: 'nowrap',
          opacity: 0, animation: 'pitchFade 600ms ease-out forwards',
          animationDelay: '3200ms',
        }}>Four weeks faster recovery per patient.</div>

        {/* Synthesis 2 */}
        <div style={{
          position: 'absolute', top: '84%', left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 400, fontStyle: 'italic', fontSize: 22,
          color: 'var(--film-mute)', whiteSpace: 'nowrap',
          opacity: 0, animation: 'pitchFade 600ms ease-out forwards',
          animationDelay: '3800ms',
        }}>Because every session starts optimised. Because optimised sessions compound.</div>
      </div>
    );
  };
})();
