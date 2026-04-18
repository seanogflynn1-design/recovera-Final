// Slide 02 — THE GAP · DARK (8s) · DECK-FULL
// Split composition: 30 min at clinic vs 167 hrs at home, separated by a
// hairline vertical rule. Bottom thesis line ties it together.

(function () {
  function Slide02() {
    const colLabelY = 380;
    const colNumberY = colLabelY + 56;
    const colSubY = colNumberY + 170;
    const ruleTop = colLabelY - 8;
    const ruleHeight = 280;

    const leftX  = Math.round(1920 * 0.20);   // 384
    const rightX = Math.round(1920 * 0.60);   // 1152

    const Column = ({ left, label, number, sub, numberColor, delay }) => (
      <>
        <div style={{
          position: 'absolute', left, top: colLabelY,
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 13, fontWeight: 500,
          letterSpacing: '0.2em',
          color: 'var(--film-mute)',
          animation: 'pitchArrive 600ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
          animationDelay: `${delay}ms`,
        }}>
          {label}
        </div>
        <div style={{
          position: 'absolute', left, top: colNumberY,
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 900,
          fontVariationSettings: '"opsz" 144',
          fontSize: 140, lineHeight: 1,
          letterSpacing: '-0.035em',
          color: numberColor,
          animation: 'pitchArrive 1200ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
          animationDelay: `${delay + 200}ms`,
        }}>
          {number}
        </div>
        <div style={{
          position: 'absolute', left, top: colSubY,
          fontFamily: "'Inter', sans-serif",
          fontSize: 20, fontWeight: 500,
          color: 'var(--film-mute)',
          letterSpacing: '-0.005em',
          animation: 'pitchFade 600ms ease both',
          animationDelay: `${delay + 600}ms`,
        }}>
          {sub}
        </div>
      </>
    );

    return (
      <div style={{ position: 'absolute', inset: 0 }}>
        {/* Explanation */}
        <div style={{
          position: 'absolute',
          left: 0, right: 0, top: Math.round(1080 * 0.10),
          textAlign: 'center',
          fontFamily: "'Inter', sans-serif",
          fontSize: 18, fontWeight: 500,
          letterSpacing: '0.01em',
          color: 'var(--film-mute)',
          animation: 'pitchFade 500ms ease both',
        }}>
          <div style={{ display: 'inline-block', maxWidth: 900 }}>
            The gap between what the physio sees and what happens at home.
          </div>
        </div>

        {/* Vertical rule — drawn top-down */}
        <div style={{
          position: 'absolute',
          left: 960 - 0.5, top: ruleTop,
          width: 1, height: ruleHeight,
          background: 'var(--film-soft)',
          transformOrigin: 'top center',
          animation: 'pitchDrawV 600ms cubic-bezier(0.65, 0, 0.35, 1) both',
          animationDelay: '400ms',
        }}/>

        <Column
          left={leftX}
          label="AT THE CLINIC"
          number="30 min"
          sub="twice a week"
          numberColor="var(--film-ink)"
          delay={900}
        />
        <Column
          left={rightX}
          label="AT HOME"
          number={<><span style={{ color: 'var(--accent)' }}>167 hrs</span></>}
          sub="every week, invisible"
          numberColor="var(--film-ink)"
          delay={1150}
        />

        {/* Bottom thesis line */}
        <div style={{
          position: 'absolute',
          left: 0, right: 0, top: Math.round(1080 * 0.78),
          textAlign: 'center',
          fontFamily: "'Fraunces', Georgia, serif",
          fontStyle: 'italic', fontWeight: 700,
          fontSize: 32, lineHeight: 1.25,
          letterSpacing: '-0.01em',
          color: 'var(--film-ink)',
          animation: 'pitchArrive 1000ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
          animationDelay: '2600ms',
        }}>
          Everything important happens in the 167 hours nobody sees.
        </div>
      </div>
    );
  }

  if (!window.PitchSlides) window.PitchSlides = {};
  window.PitchSlides[2] = Slide02;
})();
