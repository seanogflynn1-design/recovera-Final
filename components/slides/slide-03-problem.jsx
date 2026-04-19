// Slide 03 — THE PROBLEM · LIGHT · 12000ms · DECK-FULL
// Two-column contrast: "18 minutes" vs "0 minutes". Seen after the solution.
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

  // Content block: 1400px wide, centred in 1920px → left edge 260px = 13.54%
  // Left column:  x=13.54%, width=560px (29.17%)
  // Divider:      x=52%
  // Right column: x=54.5%, width=560px (29.17%)

  window.PitchSlides = window.PitchSlides || {};
  window.PitchSlides[3] = function SlideProblem() {
    return (
      <div style={{ position: 'absolute', inset: 0, background: '#FFFFFF' }}>
        <style>{STYLES}</style>

        {/* ── LEFT COLUMN — WITHOUT RECOVERA ── */}
        <div style={{
          position: 'absolute',
          left: '13.54%', top: '12%',
          width: '29.17%',
        }}>

          {/* Label */}
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 12, fontWeight: 500,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: '#9A9A9A',
            opacity: 0,
            animation: 'fadeIn 400ms ease-out forwards',
            animationDelay: '0ms',
          }}>
            WITHOUT RECOVERA
          </div>

          {/* Stat */}
          <div style={{
            marginTop: 24,
            opacity: 0,
            animation: 'fadeUp 600ms ease-out forwards',
            animationDelay: '200ms',
          }}>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700, fontSize: 200, lineHeight: 1,
              letterSpacing: '-0.04em', color: '#0D0D0D',
            }}>18</div>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400, fontSize: 32,
              color: '#6B6B6B', marginTop: -8,
            }}>minutes</div>
          </div>

          {/* Description */}
          <div style={{
            marginTop: 24,
            fontFamily: "'Inter', sans-serif",
            fontSize: 22, fontWeight: 400,
            color: '#6B6B6B', lineHeight: 1.6,
            opacity: 0,
            animation: 'fadeUp 500ms ease-out forwards',
            animationDelay: '900ms',
          }}>
            <div>spent asking the patient</div>
            <div>to remember what happened</div>
            <div>at home. Every session.</div>
          </div>

          {/* Quote */}
          <div style={{
            marginTop: 32,
            borderLeft: '3px solid #E8E6E3',
            paddingLeft: 20,
            maxWidth: 480,
            opacity: 0,
            animation: 'fadeIn 500ms ease-out forwards',
            animationDelay: '1400ms',
          }}>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 17, fontWeight: 400, fontStyle: 'italic',
              color: '#9A9A9A', lineHeight: 1.6,
            }}>
              The physio is the most skilled person in the room.
              She spends the first third of every appointment
              on the weakest possible data.
            </div>
          </div>
        </div>

        {/* ── VERTICAL DIVIDER ── */}
        <div style={{
          position: 'absolute',
          left: '52%', top: '15%',
          width: 1, height: '70%',
          background: '#E8E6E3',
          opacity: 0,
          animation: 'fadeIn 400ms ease-out forwards',
          animationDelay: '600ms',
        }} />

        {/* ── RIGHT COLUMN — WITH RECOVERA ── */}
        <div style={{
          position: 'absolute',
          left: '54.5%', top: '12%',
          width: '29.17%',
        }}>

          {/* Label */}
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 12, fontWeight: 500,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: '#1F4D2E',
            opacity: 0,
            animation: 'fadeIn 400ms ease-out forwards',
            animationDelay: '800ms',
          }}>
            WITH RECOVERA
          </div>

          {/* Stat */}
          <div style={{
            marginTop: 24,
            opacity: 0,
            animation: 'fadeUp 600ms ease-out forwards',
            animationDelay: '1000ms',
          }}>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700, fontSize: 200, lineHeight: 1,
              letterSpacing: '-0.04em', color: '#1F4D2E',
            }}>0</div>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 400, fontSize: 32,
              color: '#1F4D2E', marginTop: -8,
            }}>minutes</div>
          </div>

          {/* Description */}
          <div style={{
            marginTop: 24,
            fontFamily: "'Inter', sans-serif",
            fontSize: 22, fontWeight: 400,
            color: '#3D3D3D', lineHeight: 1.6,
            opacity: 0,
            animation: 'fadeUp 500ms ease-out forwards',
            animationDelay: '1700ms',
          }}>
            <div>spent on reconstruction.</div>
            <div>The report arrived before</div>
            <div>she walked in.</div>
          </div>

          {/* Context */}
          <div style={{
            marginTop: 32,
            fontFamily: "'Inter', sans-serif",
            fontSize: 18, fontWeight: 500,
            color: '#0D0D0D', lineHeight: 1.7,
            opacity: 0,
            animation: 'fadeUp 500ms ease-out forwards',
            animationDelay: '2200ms',
          }}>
            <div>The HSE and NHS don&apos;t lack physios.</div>
            <div>They lack physio time.</div>
            <div>Recovera gives it back.</div>
          </div>
        </div>

        {/* Source — centred bottom */}
        <div style={{
          position: 'absolute', top: '88%', left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: "'Inter', sans-serif",
          fontSize: 11, fontWeight: 500,
          letterSpacing: '0.08em', textTransform: 'uppercase',
          color: '#9A9A9A',
          whiteSpace: 'nowrap',
          opacity: 0,
          animation: 'fadeIn 400ms ease-out forwards',
          animationDelay: '2700ms',
        }}>
          SOURCE · RECOVERA PHYSIO INTERVIEWS · DUBLIN · Q4 2025 · N=12
        </div>
      </div>
    );
  };
})();
