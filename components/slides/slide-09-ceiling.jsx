// Slide 10 — THE CEILING · DARK (14s) · DECK-LEFT
// Category-expansion slide. "One engine. Many surfaces." plus a 2-column
// roadmap, italic thesis line, Veeva comparable citation.

(function () {
  const LEFT_ITEMS = [
    'ACL recovery · today',
    'Hip replacement · Y1',
    'Return-to-work · Y2',
  ];
  const RIGHT_ITEMS = [
    'Nursing-home fall risk · Y3',
    'Elite sport readiness · Y3',
    'Pharma trial infrastructure · Y5',
  ];

  function Slide09() {
    const left = Math.round(1920 * 0.10);     // 192
    const topOne = 160;                       // eyebrow
    const topEngine = topOne + 56;
    const topSurfaces = topEngine + 140;
    const topCols = topSurfaces + 168;
    const topItalic = topCols + 280;
    const topSource = topItalic + 50;
    const colGap = 320;

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
          fontSize: 26, lineHeight: 1.2,
          color: 'var(--film-ink)',
          letterSpacing: '-0.01em',
        }}>{text}</span>
      </div>
    );

    return (
      <div style={{ position: 'absolute', inset: 0 }}>
        {/* Eyebrow */}
        <div style={{
          position: 'absolute', top: topOne, left,
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 13, fontWeight: 500,
          letterSpacing: '0.3em',
          color: 'var(--film-mute)',
          animation: 'pitchArrive 800ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
        }}>
          § THE CEILING
        </div>

        {/* One engine. */}
        <div style={{
          position: 'absolute', top: topEngine, left,
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 900,
          fontVariationSettings: '"opsz" 144',
          fontSize: 120, lineHeight: 1,
          letterSpacing: '-0.03em',
          color: 'var(--film-ink)',
          animation: 'pitchArrive 1000ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
          animationDelay: '300ms',
        }}>
          One engine.
        </div>

        {/* Many surfaces. */}
        <div style={{
          position: 'absolute', top: topSurfaces, left,
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 700,
          fontVariationSettings: '"opsz" 144',
          fontSize: 88, lineHeight: 1,
          letterSpacing: '-0.025em',
          color: 'var(--film-mute)',
          animation: 'pitchArrive 1000ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
          animationDelay: '700ms',
        }}>
          Many surfaces.
        </div>

        {/* Columns */}
        <div style={{ position: 'absolute', top: topCols, left }}>
          {LEFT_ITEMS.map((t, i) => (
            <Item key={t} text={t} delay={1200 + i * 250}/>
          ))}
        </div>
        <div style={{ position: 'absolute', top: topCols, left: left + colGap + 24 }}>
          {RIGHT_ITEMS.map((t, i) => (
            <Item key={t} text={t} delay={1200 + 250 + i * 250}/>
          ))}
        </div>

        {/* Italic thesis line */}
        <div style={{
          position: 'absolute', top: topItalic, left,
          fontFamily: "'Fraunces', Georgia, serif",
          fontStyle: 'italic', fontWeight: 400,
          fontSize: 24, lineHeight: 1.3,
          color: 'var(--film-ink)',
          letterSpacing: '-0.005em',
          animation: 'pitchArrive 800ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
          animationDelay: '3200ms',
        }}>
          The category is monitoring movement. It runs on us.
        </div>

        {/* Citation */}
        <div style={{
          position: 'absolute', top: topSource, left,
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 11, fontWeight: 400,
          letterSpacing: '0.18em',
          color: 'var(--film-mute)',
          animation: 'pitchFade 400ms ease both',
          animationDelay: '3700ms',
        }}>
          COMPARABLE · VEEVA SYSTEMS · FOUNDED 2007 · PUBLIC 2013 · $4B IPO · NOW $30B+
        </div>
      </div>
    );
  }

  if (!window.PitchSlides) window.PitchSlides = {};
  window.PitchSlides[9] = Slide09;
})();
