// Slide 02 — THE PHYSIO · LIGHT · 14000ms · PATTERN B [AUTO-PLAY]
// Text left, MacBook dashboard right. Three sequential annotations.
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

  // MacBook at 1280×800 screen → 1488×884 total frame.
  // Dashboard column: left 38%, available width to safe zone 94% = 1075px.
  // Scale = 1075 / 1488 = 0.722 → use 0.72.
  const MB_SCALE = 0.72;

  // Minimal TIMELINE — just resets the dashboard on slide entry.
  const TIMELINE = [
    { at: 0, action: 'reset', target: 'clinician-dash' },
  ];

  function Ann({ top, text, color, delay }) {
    return (
      <div style={{
        position: 'absolute',
        right: '62%',   // right edge aligns with dashboard left edge at 38%
        top,
        display: 'flex', alignItems: 'center', gap: 8,
        opacity: 0,
        animation: 'fadeIn 400ms ease-out forwards',
        animationDelay: delay + 'ms',
        pointerEvents: 'none',
        zIndex: 20,
      }}>
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 14, fontWeight: 500,
          color,
          whiteSpace: 'nowrap',
        }}>{text}</div>
        <svg width={32} height={12} viewBox="0 0 32 12" style={{ flexShrink: 0, opacity: 0.3 }}>
          <line x1="0" y1="6" x2="28" y2="6" stroke={color} strokeWidth="1" strokeLinecap="round"/>
          <circle cx="28" cy="6" r="2" fill={color}/>
        </svg>
      </div>
    );
  }

  window.PitchSlides = window.PitchSlides || {};
  window.PitchSlides[2] = function SlidePhysio({ isActive }) {
    const clinicianDashRef = React.useRef(null);
    const [, setAnnotations] = React.useState({});
    const [mbMounted, setMbMounted] = React.useState(false);

    // MacBook entry: scale + opacity transition after 300ms
    React.useEffect(() => {
      const id = setTimeout(() => setMbMounted(true), 300);
      return () => clearTimeout(id);
    }, []);

    window.useSlideTimeline({
      timeline: TIMELINE,
      isActive,
      refs: { 'clinician-dash': clinicianDashRef },
      setAnnotations,
    });

    return (
      <div style={{ position: 'absolute', inset: 0, background: '#F8F7F5' }}>
        <style>{STYLES}</style>

        {/* ── TEXT COLUMN ── */}
        <div style={{
          position: 'absolute',
          left: '6%', top: '50%',
          transform: 'translateY(-50%)',
          width: '28%',
        }}>

          {/* Label */}
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 13, fontWeight: 500,
            letterSpacing: '0.1em', textTransform: 'uppercase',
            color: '#9A9A9A',
            opacity: 0,
            animation: 'fadeIn 400ms ease-out forwards',
            animationDelay: '0ms',
          }}>
            THE PHYSIO
          </div>

          {/* Headline */}
          <div style={{
            marginTop: 20,
            opacity: 0,
            animation: 'fadeUp 500ms ease-out forwards',
            animationDelay: '200ms',
          }}>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600, fontSize: 38, lineHeight: 1.2,
              letterSpacing: '-0.02em', color: '#0D0D0D',
            }}>She opens the dashboard.</div>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600, fontSize: 38, lineHeight: 1.2,
              letterSpacing: '-0.02em', color: '#0D0D0D',
            }}>Already knows everything.</div>
          </div>

          {/* Accent divider */}
          <div style={{
            marginTop: 28,
            width: 40, height: 2, background: '#1F4D2E',
            opacity: 0,
            animation: 'fadeIn 400ms ease-out forwards',
            animationDelay: '700ms',
          }} />

          {/* Three facts */}
          <div style={{
            marginTop: 24,
            fontFamily: "'Inter', sans-serif",
            fontSize: 18, fontWeight: 400,
            color: '#6B6B6B', lineHeight: 1.9,
            opacity: 0,
            animation: 'fadeUp 500ms ease-out forwards',
            animationDelay: '900ms',
          }}>
            <div>Who did their exercises.</div>
            <div>Who&apos;s in pain.</div>
            <div>Who needs attention first.</div>
          </div>

          {/* Context line */}
          <div style={{
            marginTop: 32,
            fontFamily: "'Inter', sans-serif",
            fontSize: 16, fontWeight: 500,
            color: '#1F4D2E',
            opacity: 0,
            animation: 'fadeIn 400ms ease-out forwards',
            animationDelay: '1400ms',
          }}>
            Before a single patient walks in.
          </div>
        </div>

        {/* ── VERTICAL DIVIDER ── */}
        <div style={{
          position: 'absolute',
          left: '36%', top: '15%',
          width: 1, height: '70%',
          background: '#E8E6E3',
          opacity: 0,
          animation: 'fadeIn 400ms ease-out forwards',
          animationDelay: '500ms',
        }} />

        {/* ── ANNOTATIONS ── */}
        <Ann top="22%" text="8 patients · briefs ready" color="#0D0D0D" delay={1500} />
        <Ann top="40%" text="3 flagged by the AI"       color="#B9432C" delay={2500} />
        <Ann top="58%" text="Conor · 4 weeks ahead"     color="#1F4D2E" delay={3500} />

        {/* ── DASHBOARD COLUMN ── */}
        <div style={{
          position: 'absolute',
          left: '38%', top: '20%',
          transformOrigin: 'top left',
          transform: mbMounted
            ? `scale(${MB_SCALE})`
            : `scale(${MB_SCALE * 0.97})`,
          opacity: mbMounted ? 1 : 0,
          transition: 'transform 600ms ease-out, opacity 600ms ease-out',
          zIndex: 10,
        }}>
          <MacBookFrame screenWidth={1280} screenHeight={800}>
            <ClinicianDash ref={clinicianDashRef} />
          </MacBookFrame>
        </div>

        {/* Caption */}
        <div style={{
          position: 'absolute', bottom: '6%', left: '6%',
          fontFamily: "'Inter', sans-serif",
          fontSize: 12, fontWeight: 500,
          letterSpacing: '0.08em', textTransform: 'uppercase',
          color: '#9A9A9A',
          opacity: 0,
          animation: 'fadeIn 400ms ease-out forwards',
          animationDelay: '1000ms',
        }}>
          DR. ÁINE O&apos;BRIEN · MISCP · DUBLIN PHYSIO CO
        </div>
      </div>
    );
  };
})();
