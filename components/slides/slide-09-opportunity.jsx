// Slide 09 — WHAT COMES NEXT · DARK (14s) · DECK-LEFT
// Category-expansion slide. Explanation line teaches the "same monitoring
// engine" thesis; hero "One engine." + sub; two-column roadmap of future
// movement-based recovery domains; Veeva comparable as closing proof.

(function () {
  const LEFT_ITEMS = [
    'ACL reconstruction · now',
    'Hip replacement · Year 1',
    'Return-to-work clearance · Year 2',
  ];
  const RIGHT_ITEMS = [
    'Nursing home fall prevention · Year 3',
    'Elite sport readiness · Year 3',
    'Pharmaceutical trial monitoring · Year 5',
  ];

  function Slide09() {
    const left = Math.round(1920 * 0.10);   // 192
    const explanationY = Math.round(1080 * 0.10);         // 108
    const eyebrowY = explanationY + 120;                  // 228
    const heroY = eyebrowY + 40 + 16;                     // 284  ("One engine." top)
    const subY = heroY + 108 + 16;                        // 408
    const colsY = subY + 44 + 72;                         // 524
    const veevaY = colsY + 3 * 60 + 56;                   // 760
    const colGap = 340;

    const Item = ({ text, delay }) => (
      <div style={{
        display: 'flex', alignItems: 'center', gap: 20,
        marginBottom: 28,
        animation: 'pitchArrive 800ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
        animationDelay: `${delay}ms`,
      }}>
        <div style={{ width: 32, height: 1, background: 'var(--film-mute)', flexShrink: 0 }}/>
        <span style={{
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 400,
          fontSize: 22, lineHeight: 1.2,
          color: 'var(--film-ink)',
          letterSpacing: '-0.005em',
        }}>{text}</span>
      </div>
    );

    return (
      <div style={{ position: 'absolute', inset: 0 }}>
        {/* Explanation */}
        <div style={{
          position: 'absolute',
          left, top: explanationY,
          maxWidth: 900,
          fontFamily: "'Inter', sans-serif",
          fontSize: 18, fontWeight: 500,
          lineHeight: 1.35,
          letterSpacing: '0.005em',
          color: 'var(--film-mute)',
          animation: 'pitchFade 500ms ease both',
        }}>
          The same monitoring engine works for any movement-based recovery — today&apos;s physio patient is tomorrow&apos;s nursing home resident, returning athlete, or surgical follow-up.
        </div>

        {/* Eyebrow */}
        <div style={{
          position: 'absolute', left, top: eyebrowY,
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 13, fontWeight: 500,
          letterSpacing: '0.3em',
          color: 'var(--film-mute)',
          animation: 'pitchArrive 800ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
          animationDelay: '200ms',
        }}>
          § THE CEILING
        </div>

        {/* One engine. */}
        <div style={{
          position: 'absolute', left, top: heroY,
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 900,
          fontVariationSettings: '"opsz" 144',
          fontSize: 108, lineHeight: 1,
          letterSpacing: '-0.03em',
          color: 'var(--film-ink)',
          animation: 'pitchArrive 1000ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
          animationDelay: '400ms',
        }}>
          One <span style={{ color: 'var(--accent)' }}>engine</span>.
        </div>

        {/* Sub */}
        <div style={{
          position: 'absolute', left, top: subY,
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 700,
          fontVariationSettings: '"opsz" 144',
          fontSize: 44, lineHeight: 1.05,
          letterSpacing: '-0.02em',
          color: 'var(--film-mute)',
          animation: 'pitchArrive 1000ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
          animationDelay: '800ms',
        }}>
          Every movement-based recovery in healthcare.
        </div>

        {/* Columns */}
        <div style={{ position: 'absolute', top: colsY, left }}>
          {LEFT_ITEMS.map((t, i) => (
            <Item key={t} text={t} delay={1300 + i * 250}/>
          ))}
        </div>
        <div style={{ position: 'absolute', top: colsY, left: left + colGap + 24 }}>
          {RIGHT_ITEMS.map((t, i) => (
            <Item key={t} text={t} delay={1300 + 250 + i * 250}/>
          ))}
        </div>

        {/* Veeva comparable line */}
        <div style={{
          position: 'absolute',
          left, top: veevaY,
          maxWidth: 900,
          fontFamily: "'Inter', sans-serif",
          fontSize: 17, fontWeight: 400,
          lineHeight: 1.45,
          color: 'var(--film-mute)',
          animation: 'pitchFade 400ms ease both',
          animationDelay: '3200ms',
        }}>
          Comparable company: Veeva Systems built monitoring infrastructure for pharma. Public at $4B in 2013, now $30B.
        </div>
      </div>
    );
  }

  if (!window.PitchSlides) window.PitchSlides = {};
  window.PitchSlides[9] = Slide09;
})();
