// Slide 06 — THE ASK · LIGHT · 12000ms · DECK-FULL
// The close. Market size. Where we are. One ask. "Back us."
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

  const ITEMS = [
    'Functional demo \u2014 clinician dashboard and patient app',
    'CORU-registered physiotherapist as clinical architect',
    'Three pilot clinics recruited for June',
    'Seeking CTO to build the production system',
  ];

  window.PitchSlides = window.PitchSlides || {};
  window.PitchSlides[6] = function SlideAsk() {
    return (
      <div style={{ position: 'absolute', inset: 0, background: '#FFFFFF' }}>
        <style>{STYLES}</style>

        {/* Market stat 1 */}
        <div style={{
          position: 'absolute', top: '12%', left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 600, fontSize: 42,
          letterSpacing: '-0.02em', color: '#0D0D0D',
          whiteSpace: 'nowrap',
          opacity: 0,
          animation: 'fadeUp 500ms ease-out forwards',
          animationDelay: '0ms',
        }}>
          €500B+ global movement health market.
        </div>

        {/* Market stat 2 */}
        <div style={{
          position: 'absolute', top: '21%', left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          fontFamily: "'Inter', sans-serif",
          fontSize: 28, fontWeight: 400, color: '#6B6B6B',
          whiteSpace: 'nowrap',
          opacity: 0,
          animation: 'fadeUp 500ms ease-out forwards',
          animationDelay: '200ms',
        }}>
          No system of record for what happens between sessions.
        </div>

        {/* "Anywhere." */}
        <div style={{
          position: 'absolute', top: '28%', left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 600, fontSize: 28, color: '#1F4D2E',
          opacity: 0,
          animation: 'fadeUp 500ms ease-out forwards',
          animationDelay: '400ms',
        }}>
          Anywhere.
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

        {/* WHERE WE ARE label */}
        <div style={{
          position: 'absolute', top: '44%', left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: "'Inter', sans-serif",
          fontSize: 13, fontWeight: 500,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: '#9A9A9A',
          opacity: 0,
          animation: 'fadeIn 400ms ease-out forwards',
          animationDelay: '1200ms',
        }}>
          WHERE WE ARE
        </div>

        {/* Four items — one animated group */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          fontFamily: "'Inter', sans-serif",
          fontSize: 20, fontWeight: 400,
          color: '#3D3D3D', lineHeight: 2.0,
          opacity: 0,
          animation: 'fadeUp 500ms ease-out forwards',
          animationDelay: '1400ms',
        }}>
          {ITEMS.map((item) => (
            <div key={item}>· {item}</div>
          ))}
        </div>

        {/* "We need NovaUCD." */}
        <div style={{
          position: 'absolute', top: '68%', left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 700, fontSize: 48,
          letterSpacing: '-0.02em', color: '#0D0D0D',
          whiteSpace: 'nowrap',
          opacity: 0,
          animation: 'fadeUp 600ms ease-out forwards',
          animationDelay: '2000ms',
        }}>
          We need NovaUCD.
        </div>

        {/* Ask lines — one group */}
        <div style={{
          position: 'absolute', top: '78%', left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          opacity: 0,
          animation: 'fadeUp 500ms ease-out forwards',
          animationDelay: '2400ms',
        }}>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 26, fontWeight: 400, color: '#6B6B6B',
          }}>90 days. Three clinics. One metric.</div>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 22, fontWeight: 400, color: '#6B6B6B',
            marginTop: 8,
          }}>A physio saying — unprompted —</div>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 26, fontWeight: 600, color: '#0D0D0D',
            marginTop: 4,
          }}>I cannot imagine going back.</div>
        </div>

        {/* "Back us." */}
        <div style={{
          position: 'absolute', top: '87%', left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 700, fontSize: 52,
          letterSpacing: '-0.02em', color: '#1F4D2E',
          whiteSpace: 'nowrap',
          opacity: 0,
          animation: 'fadeUp 700ms ease-out forwards',
          animationDelay: '3200ms',
        }}>
          Back us.
        </div>
      </div>
    );
  };
})();
