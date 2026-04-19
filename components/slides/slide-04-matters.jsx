// Slide 04 — WHY IT MATTERS · LIGHT · 10000ms · DECK-FULL
// The structural argument. Efficiency frames it wrong. Time is the point.
(function () {
  const STYLES = `
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(12px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes drawRule {
      from { transform: scaleX(0); }
      to   { transform: scaleX(1); }
    }
  `;

  window.PitchSlides = window.PitchSlides || {};
  window.PitchSlides[4] = function SlideMatters() {
    return (
      <div style={{ position: 'absolute', inset: 0, background: '#FFFFFF' }}>
        <style>{STYLES}</style>

        {/* Label */}
        <div style={{
          position: 'absolute', top: '12%', left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: "'Inter', sans-serif",
          fontSize: 13, fontWeight: 500,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: '#9A9A9A',
          opacity: 0,
          animation: 'fadeIn 400ms ease-out forwards',
          animationDelay: '0ms',
        }}>
          WHY IT MATTERS
        </div>

        {/* Headline 1 */}
        <div style={{
          position: 'absolute', top: '18%', left: '50%',
          transform: 'translateX(-50%)',
          maxWidth: 1100, textAlign: 'center',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 600, fontSize: 54,
          letterSpacing: '-0.02em', color: '#0D0D0D',
          whiteSpace: 'nowrap',
          opacity: 0,
          animation: 'fadeUp 500ms ease-out forwards',
          animationDelay: '200ms',
        }}>
          The physio gets those minutes back.
        </div>

        {/* Headline 2 */}
        <div style={{
          position: 'absolute', top: '27%', left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 600, fontSize: 54,
          letterSpacing: '-0.02em', color: '#1F4D2E',
          whiteSpace: 'nowrap',
          opacity: 0,
          animation: 'fadeUp 500ms ease-out forwards',
          animationDelay: '400ms',
        }}>
          Every session. Every patient.
        </div>

        {/* Horizontal rule — outer div centres, inner div animates (separate transforms) */}
        <div style={{
          position: 'absolute', top: '38%', left: '50%',
          transform: 'translateX(-50%)',
        }}>
          <div style={{
            width: 64, height: 1, background: '#E8E6E3',
            transform: 'scaleX(0)',
            transformOrigin: 'center',
            animation: 'drawRule 400ms ease-out forwards',
            animationDelay: '900ms',
          }} />
        </div>

        {/* Statement 1 */}
        <div style={{
          position: 'absolute', top: '44%', left: '50%',
          transform: 'translateX(-50%)',
          maxWidth: 900, textAlign: 'center',
          fontFamily: "'Inter', sans-serif",
          fontSize: 26, fontWeight: 400,
          color: '#6B6B6B',
          opacity: 0,
          animation: 'fadeUp 500ms ease-out forwards',
          animationDelay: '1200ms',
        }}>
          That is not an efficiency improvement.
        </div>

        {/* Statement 2 */}
        <div style={{
          position: 'absolute', top: '52%', left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          opacity: 0,
          animation: 'fadeUp 500ms ease-out forwards',
          animationDelay: '1600ms',
        }}>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600, fontSize: 32,
            color: '#0D0D0D',
          }}>That is how many more people</div>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 600, fontSize: 32,
            color: '#0D0D0D',
          }}>a physio can actually help.</div>
        </div>

        {/* Statement 3 */}
        <div style={{
          position: 'absolute', top: '65%', left: '50%',
          transform: 'translateX(-50%)',
          maxWidth: 800, textAlign: 'center',
          opacity: 0,
          animation: 'fadeUp 500ms ease-out forwards',
          animationDelay: '2100ms',
        }}>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 22, fontWeight: 400,
            color: '#6B6B6B',
          }}>The HSE and NHS waiting lists are not a shortage of physios.</div>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 22, fontWeight: 500,
            color: '#0D0D0D', marginTop: 4,
          }}>They are a shortage of physio time.</div>
        </div>

        {/* Bottom line */}
        <div style={{
          position: 'absolute', top: '80%', left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 600, fontSize: 28,
          color: '#1F4D2E', whiteSpace: 'nowrap',
          opacity: 0,
          animation: 'fadeUp 500ms ease-out forwards',
          animationDelay: '2700ms',
        }}>
          Recovera fixes the time problem.
        </div>
      </div>
    );
  };
})();
