// Slide 02 — WHAT RECOVERA DOES · DARK (10s) · DECK-FULL
// Three-column flow: Patient → Recovera → Clinician. Each column has a
// circular-framed icon, a column label, and a plain-English sentence.
// Bottom strip carries the pricing + market ground truth.

(function () {
  const INK  = 'var(--film-ink)';
  const MUTE = 'var(--film-mute)';
  const SOFT = 'var(--film-soft)';

  function IconFrame({ children }) {
    return (
      <div style={{ position: 'relative', width: 88, height: 88 }}>
        <svg width="88" height="88" viewBox="0 0 88 88" style={{ position: 'absolute', inset: 0 }}>
          <circle cx="44" cy="44" r="43" fill="none" stroke={MUTE} strokeWidth="1" opacity="0.6"/>
        </svg>
        <div style={{
          position: 'absolute', inset: 12,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>{children}</div>
      </div>
    );
  }

  const PersonIcon = () => (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <circle cx="32" cy="22" r="10" stroke={INK} strokeWidth="1.5"/>
      <path d="M14 54 C14 42 22 36 32 36 C42 36 50 42 50 54"
        stroke={INK} strokeWidth="1.5" strokeLinecap="round" fill="none"/>
    </svg>
  );

  const GridIcon = () => (
    <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <rect x="13" y="13" width="16" height="16" rx="1.5" stroke={INK} strokeWidth="1.5" fill="none"/>
      <rect x="35" y="13" width="16" height="16" rx="1.5" stroke={INK} strokeWidth="1.5" fill="none"/>
      <rect x="13" y="35" width="16" height="16" rx="1.5" stroke={INK} strokeWidth="1.5" fill="none"/>
      <rect x="35" y="35" width="16" height="16" rx="1.5" stroke={INK} strokeWidth="1.5" fill="none"/>
    </svg>
  );

  const COLUMNS = [
    {
      icon: <PersonIcon/>,
      label: 'Patient',
      body: 'Does their prescribed session at home. The phone camera scores every rep and logs their pain.',
    },
    {
      icon: <GridIcon/>,
      label: 'Recovera',
      body: 'Turns every session into a movement report. Flags anything the physio needs to see.',
    },
    {
      icon: <PersonIcon/>,
      label: 'Clinician',
      body: 'Opens the dashboard before the next appointment. Knows exactly what to do — in three seconds.',
    },
  ];

  function Slide02() {
    const centres = [320, 960, 1600];
    const colWidth = 360;
    const iconCy = 340;

    const eyebrowY  = Math.round(1080 * 0.22);
    const labelY    = iconCy + 88 + 28;
    const bodyY     = labelY + 42;
    const pricingY  = 872;

    return (
      <div style={{ position: 'absolute', inset: 0 }}>
        <div style={{
          position: 'absolute',
          left: Math.round(1920 * 0.10),
          top: Math.round(1080 * 0.08),
          maxWidth: 1000,
          fontFamily: "'Inter', sans-serif",
          fontSize: 18, fontWeight: 500,
          lineHeight: 1.4,
          letterSpacing: '0.005em',
          color: MUTE,
          animation: 'pitchFade 500ms ease both',
        }}>
          Recovera replaces &ldquo;how was it at home?&rdquo; with a report. Here&apos;s the whole product, on one slide.
        </div>

        <div style={{
          position: 'absolute',
          left: Math.round(1920 * 0.10),
          top: eyebrowY,
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 13, fontWeight: 500,
          letterSpacing: '0.3em',
          color: MUTE,
          animation: 'pitchArrive 800ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
          animationDelay: '200ms',
        }}>
          § WHAT RECOVERA DOES
        </div>

        {COLUMNS.map((col, i) => {
          const cx = centres[i];
          const arriveDelay = 600 + i * 350;
          return (
            <React.Fragment key={col.label}>
              <div style={{
                position: 'absolute',
                left: cx - 44, top: iconCy - 44,
                animation: 'pitchArriveFrame 800ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
                animationDelay: `${arriveDelay}ms`,
              }}>
                <IconFrame>{col.icon}</IconFrame>
              </div>

              <div style={{
                position: 'absolute',
                left: cx - colWidth / 2, top: labelY,
                width: colWidth, textAlign: 'center',
                fontFamily: "'JetBrains Mono', ui-monospace, monospace",
                fontSize: 12, fontWeight: 500,
                letterSpacing: '0.3em',
                color: MUTE,
                animation: 'pitchFade 500ms ease both',
                animationDelay: `${arriveDelay + 200}ms`,
              }}>
                {col.label.toUpperCase()}
              </div>

              <div style={{
                position: 'absolute',
                left: cx - colWidth / 2, top: bodyY,
                width: colWidth, textAlign: 'center',
                fontFamily: "'Fraunces', Georgia, serif",
                fontWeight: 400,
                fontVariationSettings: '"opsz" 144',
                fontSize: 22, lineHeight: 1.35,
                letterSpacing: '-0.005em',
                color: INK,
                animation: 'pitchArrive 1000ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
                animationDelay: `${arriveDelay + 400}ms`,
              }}>
                {col.body}
              </div>
            </React.Fragment>
          );
        })}

        {[640, 1280].map((x, i) => (
          <div key={x} style={{
            position: 'absolute',
            left: x - 24, top: iconCy - 18,
            width: 48, height: 36,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Fraunces', Georgia, serif",
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 32,
            color: MUTE,
            animation: 'pitchFade 600ms ease both',
            animationDelay: `${1200 + i * 350}ms`,
          }}>
            →
          </div>
        ))}

        <div style={{
          position: 'absolute',
          left: Math.round(1920 * 0.10),
          width: 1920 - Math.round(1920 * 0.10) * 2,
          top: pricingY - 40,
          height: 1,
          background: SOFT,
          transformOrigin: 'left center',
          animation: 'pitchDraw 600ms cubic-bezier(0.65, 0, 0.35, 1) both',
          animationDelay: '2400ms',
        }}/>

        <div style={{
          position: 'absolute',
          left: Math.round(1920 * 0.10),
          width: 1920 - Math.round(1920 * 0.10) * 2,
          top: pricingY,
          display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          animation: 'pitchFade 600ms ease both',
          animationDelay: '2700ms',
        }}>
          <div>
            <div style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontWeight: 700,
              fontVariationSettings: '"opsz" 144',
              fontSize: 48, lineHeight: 1,
              letterSpacing: '-0.025em',
              color: INK,
            }}>
              <span style={{ color: 'var(--accent)' }}>€399</span> / clinic / month
            </div>
            <div style={{
              marginTop: 8,
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: 11, fontWeight: 500,
              letterSpacing: '0.2em',
              color: MUTE,
            }}>
              FLAT FEE · UNLIMITED PATIENTS
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontFamily: "'Fraunces', Georgia, serif",
              fontWeight: 700,
              fontVariationSettings: '"opsz" 144',
              fontSize: 48, lineHeight: 1,
              letterSpacing: '-0.025em',
              color: INK,
              fontVariantNumeric: 'tabular-nums',
            }}>
              14,200 clinics
            </div>
            <div style={{
              marginTop: 8,
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: 11, fontWeight: 500,
              letterSpacing: '0.2em',
              color: MUTE,
            }}>
              IRELAND · UK · THE MARKET
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!window.PitchSlides) window.PitchSlides = {};
  window.PitchSlides[2] = Slide02;
})();
