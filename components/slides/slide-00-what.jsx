// Slide 00 — WHAT IT IS · LIGHT · 6000ms
// Full pitch in one slide. Centred. Product stated first.
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
  window.PitchSlides[0] = function SlideWhat() {
    return (
      <div style={{ position: 'absolute', inset: 0, background: '#FFFFFF' }}>
        <style>{STYLES}</style>

        {/* Main content block — centred at y=48% */}
        <div style={{
          position: 'absolute', left: '50%', top: '48%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          width: '100%',
        }}>

          {/* Label */}
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 13, fontWeight: 500,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: '#9A9A9A',
            marginBottom: 80,
            opacity: 0,
            animation: 'fadeIn 400ms ease-out forwards',
            animationDelay: '0ms',
          }}>
            MOVEMENT INTELLIGENCE · PHYSIOTHERAPY
          </div>

          {/* Headline — three lines as one animated unit */}
          <div style={{
            opacity: 0,
            animation: 'fadeUp 500ms ease-out forwards',
            animationDelay: '200ms',
          }}>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600, fontSize: 58, lineHeight: 1.15,
              letterSpacing: '-0.02em', color: '#0D0D0D',
            }}>Recovera shows physios</div>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600, fontSize: 58, lineHeight: 1.15,
              letterSpacing: '-0.02em', color: '#0D0D0D',
            }}>what patients did at home</div>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600, fontSize: 58, lineHeight: 1.15,
              letterSpacing: '-0.02em', color: '#1F4D2E',
            }}>before every session.</div>
          </div>

          {/* Horizontal rule — drawn from centre */}
          <div style={{
            width: 64, height: 1, background: '#E8E6E3',
            margin: '32px auto',
            transform: 'scaleX(0)',
            transformOrigin: 'center',
            animation: 'drawRule 400ms ease-out forwards',
            animationDelay: '800ms',
          }} />

          {/* Subline */}
          <div style={{
            maxWidth: 800, margin: '0 auto',
            fontFamily: "'Inter', sans-serif",
            fontSize: 24, fontWeight: 400,
            color: '#6B6B6B', lineHeight: 1.5,
            opacity: 0,
            animation: 'fadeUp 500ms ease-out forwards',
            animationDelay: '1100ms',
          }}>
            <div>Not AI replacing the clinician.</div>
            <div>AI giving the clinician data she has never had.</div>
          </div>

          {/* Wordmark */}
          <div style={{
            marginTop: 48,
            fontFamily: "'Inter', sans-serif",
            fontWeight: 700, fontSize: 20,
            letterSpacing: '0.04em', color: '#0D0D0D',
            opacity: 0,
            animation: 'fadeIn 400ms ease-out forwards',
            animationDelay: '1600ms',
          }}>
            recovera
          </div>
        </div>

        {/* Meta — bottom 6% */}
        <div style={{
          position: 'absolute', bottom: '6%', left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: "'Inter', sans-serif",
          fontSize: 12, fontWeight: 500,
          letterSpacing: '0.1em', textTransform: 'uppercase',
          color: '#9A9A9A',
          opacity: 0,
          animation: 'fadeIn 400ms ease-out forwards',
          animationDelay: '1800ms',
        }}>
          NOVAUCD 2026
        </div>
      </div>
    );
  };
})();
