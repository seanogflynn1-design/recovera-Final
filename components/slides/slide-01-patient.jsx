// Slide 01 — THE PATIENT · LIGHT · 14000ms · PATTERN A [AUTO-PLAY]
// Phone left, text right. Timeline auto-drives PatientApp.
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

  const CAPTIONS = [
    'Starting his prescribed session.',
    'Camera reading movement in real time.',
    'Session complete. Report sending.',
    'His physio receives it before tomorrow\u2019s appointment.',
  ];

  // TIMELINE — uses showAnnotation/hideAnnotation to drive caption index.
  // swapAnnotation with id:0 is buggy in the engine (0 is falsy), so we use
  // explicit hide + show pairs for all caption transitions.
  const TIMELINE = [
    { at: 0,     action: 'reset',          target: 'patient-app' },
    { at: 500,   action: 'showAnnotation', id: 0 },
    { at: 1500,  action: 'highlight',      target: '.start-session-btn', effect: 'pulse' },
    { at: 2800,  action: 'tap',            target: '.start-session-btn' },
    { at: 3200,  action: 'hideAnnotation', id: 0 },
    { at: 3200,  action: 'showAnnotation', id: 1 },
    { at: 3400,  action: 'advance',        target: 'patient-app', state: { inSession: true } },
    { at: 7000,  action: 'hideAnnotation', id: 1 },
    { at: 7000,  action: 'showAnnotation', id: 2 },
    { at: 8800,  action: 'advance',        target: 'patient-app', state: { sessionComplete: true, sessionCount: 5 } },
    { at: 10200, action: 'tap',            target: '.log-checkin-btn' },
    { at: 10200, action: 'hideAnnotation', id: 2 },
    { at: 10200, action: 'showAnnotation', id: 3 },
    { at: 11600, action: 'advance',        target: 'patient-app', state: { checkInLogged: true, streak: 13 } },
  ];

  window.PitchSlides = window.PitchSlides || {};
  window.PitchSlides[1] = function SlidePatient({ isActive }) {
    const patientAppRef = React.useRef(null);
    const [annotations, setAnnotations] = React.useState({});
    const [mounted, setMounted] = React.useState(false);

    // Phone entry scale transition
    React.useEffect(() => {
      const id = setTimeout(() => setMounted(true), 300);
      return () => clearTimeout(id);
    }, []);

    // Timeline drives PatientApp state and caption index via setAnnotations
    window.useSlideTimeline({
      timeline: TIMELINE,
      isActive,
      refs: { 'patient-app': patientAppRef },
      setAnnotations,
    });

    // Derive current caption from annotation map (-1 = none visible yet)
    const captionIndex = CAPTIONS.findIndex((_, i) => annotations[i]);

    return (
      <div style={{ position: 'absolute', inset: 0, background: '#F8F7F5' }}>
        <style>{STYLES}</style>

        {/* ── PHONE COLUMN ── */}
        <div style={{
          position: 'absolute',
          left: '8%', top: '8%',
          width: '34%', height: '84%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transform: mounted ? 'scale(1)' : 'scale(0.97)',
          opacity: mounted ? 1 : 0,
          transition: 'transform 600ms ease-out, opacity 600ms ease-out',
        }}>
          <IPhone15Pro>
            <PatientApp mode="app" ref={patientAppRef} />
          </IPhone15Pro>
        </div>

        {/* ── VERTICAL DIVIDER ── */}
        <div style={{
          position: 'absolute',
          left: '44%', top: '15%',
          width: 1, height: '70%',
          background: '#E8E6E3',
          opacity: 0,
          animation: 'fadeIn 400ms ease-out forwards',
          animationDelay: '600ms',
        }} />

        {/* ── TEXT COLUMN ── */}
        <div style={{
          position: 'absolute',
          left: '48%', top: '50%',
          transform: 'translateY(-50%)',
          width: '44%',
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
            THE PATIENT
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
              fontWeight: 600, fontSize: 44, lineHeight: 1.15,
              letterSpacing: '-0.02em', color: '#0D0D0D',
            }}>Conor does his session.</div>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600, fontSize: 44, lineHeight: 1.15,
              letterSpacing: '-0.02em', color: '#0D0D0D',
            }}>At home. Twelve minutes.</div>
          </div>

          {/* Accent divider line */}
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
            fontSize: 20, fontWeight: 400,
            color: '#6B6B6B', lineHeight: 1.8,
            opacity: 0,
            animation: 'fadeUp 500ms ease-out forwards',
            animationDelay: '900ms',
          }}>
            <div>The phone reads his movement — not video.</div>
            <div>Form, symmetry, compensation patterns.</div>
            <div>Report sent to his physio automatically.</div>
          </div>

          {/* Rotating caption */}
          <div style={{
            marginTop: 32,
            position: 'relative',
            minHeight: 28,
          }}>
            {CAPTIONS.map((text, i) => (
              <div key={i} style={{
                position: i === 0 ? 'relative' : 'absolute',
                top: i === 0 ? undefined : 0,
                left: 0, right: 0,
                fontFamily: "'Inter', sans-serif",
                fontSize: 16, fontWeight: 500,
                color: '#1F4D2E',
                opacity: captionIndex === i ? 1 : 0,
                transition: captionIndex === i
                  ? 'opacity 300ms ease'
                  : 'opacity 200ms ease',
                pointerEvents: 'none',
              }}>{text}</div>
            ))}
          </div>
        </div>

        {/* Bottom caption */}
        <div style={{
          position: 'absolute', bottom: '6%', left: '48%',
          fontFamily: "'Inter', sans-serif",
          fontSize: 12, fontWeight: 500,
          letterSpacing: '0.08em', textTransform: 'uppercase',
          color: '#9A9A9A',
          opacity: 0,
          animation: 'fadeIn 400ms ease-out forwards',
          animationDelay: '1200ms',
        }}>
          CONOR MURPHY · WEEK 8 · ACL RECONSTRUCTION · DUBLIN
        </div>
      </div>
    );
  };
})();
