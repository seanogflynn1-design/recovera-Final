// Slide 05 — WHY RECOVERA WINS · LIGHT · 10000ms · DECK-FULL
// The architectural argument. Competitors proved the market, got it wrong.
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

  // Three companies: 3 × 300px + 2 × 80px gap = 1060px. Left edge: (1920-1060)/2 = 430px.
  // Using percentage: 430/1920 = 22.4%

  const COMPANIES = [
    { name: 'Hinge Health', valuation: '$6B',   flaw: 'Routes around the clinician.' },
    { name: 'Sword Health', valuation: '$4B',   flaw: 'Replaces the physio.'         },
    { name: 'Kaia Health',  valuation: '$123M', flaw: 'No clinical integration.'     },
  ];

  window.PitchSlides = window.PitchSlides || {};
  window.PitchSlides[5] = function SlideTrust() {
    return (
      <div style={{ position: 'absolute', inset: 0, background: '#F8F7F5' }}>
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
          WHY RECOVERA WINS
        </div>

        {/* Three companies — one animated group */}
        <div style={{
          position: 'absolute', top: '20%', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', alignItems: 'flex-start', gap: 80,
          opacity: 0,
          animation: 'fadeUp 500ms ease-out forwards',
          animationDelay: '200ms',
        }}>
          {COMPANIES.map(({ name, valuation, flaw }) => (
            <div key={name} style={{ width: 300, textAlign: 'center' }}>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600, fontSize: 22, color: '#0D0D0D',
              }}>{name}{'  '}{valuation}</div>
              <div style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400, fontSize: 16, color: '#9A9A9A',
                marginTop: 8,
              }}>{flaw}</div>
            </div>
          ))}
        </div>

        {/* Rule below companies */}
        <div style={{
          position: 'absolute', top: '34%', left: '50%',
          width: 760, height: 1, background: '#E8E6E3',
          transform: 'translateX(-50%)',
          opacity: 0,
          animation: 'fadeIn 300ms ease-out forwards',
          animationDelay: '800ms',
        }} />

        {/* Contrast 1 */}
        <div style={{
          position: 'absolute', top: '44%', left: '50%',
          transform: 'translateX(-50%)',
          maxWidth: 1000, textAlign: 'center',
          fontFamily: "'Inter', sans-serif",
          fontSize: 26, fontWeight: 400, color: '#6B6B6B',
          opacity: 0,
          animation: 'fadeUp 500ms ease-out forwards',
          animationDelay: '1100ms',
        }}>
          Every one of them proved the market.
        </div>

        {/* Contrast 2 */}
        <div style={{
          position: 'absolute', top: '52%', left: '50%',
          transform: 'translateX(-50%)',
          maxWidth: 1000, textAlign: 'center',
          fontFamily: "'Inter', sans-serif",
          fontSize: 26, fontWeight: 400, color: '#6B6B6B',
          opacity: 0,
          animation: 'fadeUp 500ms ease-out forwards',
          animationDelay: '1300ms',
        }}>
          Every one of them got the architecture wrong.
        </div>

        {/* Core insight 1 */}
        <div style={{
          position: 'absolute', top: '58%', left: '50%',
          transform: 'translateX(-50%)',
          maxWidth: 1100, textAlign: 'center',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 600, fontSize: 40,
          letterSpacing: '-0.02em', color: '#0D0D0D',
          opacity: 0,
          animation: 'fadeUp 600ms ease-out forwards',
          animationDelay: '1800ms',
        }}>
          Movement is individual.
        </div>

        {/* Core insight 2 */}
        <div style={{
          position: 'absolute', top: '67%', left: '50%',
          transform: 'translateX(-50%)',
          maxWidth: 1100, textAlign: 'center',
          fontFamily: "'Inter', sans-serif",
          fontSize: 28, fontWeight: 400, color: '#6B6B6B',
          opacity: 0,
          animation: 'fadeUp 500ms ease-out forwards',
          animationDelay: '2100ms',
        }}>
          The same exercise that heals one patient harms another.
        </div>

        {/* Core insight 3 */}
        <div style={{
          position: 'absolute', top: '74%', left: '50%',
          transform: 'translateX(-50%)',
          maxWidth: 1100, textAlign: 'center',
          fontFamily: "'Inter', sans-serif",
          fontSize: 28, fontWeight: 400, color: '#6B6B6B',
          opacity: 0,
          animation: 'fadeUp 500ms ease-out forwards',
          animationDelay: '2300ms',
        }}>
          Generic AI advice at clinical scale breaks down.
        </div>

        {/* Recovera answer 1 */}
        <div style={{
          position: 'absolute', top: '83%', left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 600, fontSize: 30, color: '#1F4D2E',
          whiteSpace: 'nowrap',
          opacity: 0,
          animation: 'fadeUp 500ms ease-out forwards',
          animationDelay: '2900ms',
        }}>
          Recovera puts the data in the expert&apos;s hands.
        </div>

        {/* Recovera answer 2 */}
        <div style={{
          position: 'absolute', top: '90%', left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
          fontFamily: "'Inter', sans-serif",
          fontWeight: 500, fontSize: 24, color: '#1F4D2E',
          whiteSpace: 'nowrap',
          opacity: 0,
          animation: 'fadeUp 500ms ease-out forwards',
          animationDelay: '3100ms',
        }}>
          The physio decides. Always.
        </div>
      </div>
    );
  };
})();
