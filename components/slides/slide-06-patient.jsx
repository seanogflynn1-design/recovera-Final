// Slide 06 — THE PATIENT · WARM · 14000ms · PATTERN A [AUTO-PLAY]
// Phone left (x=3%→36%), text right (x=41%→92%). Timeline auto-drives PatientApp.
(function () {
  const KEYFRAMES = `
@keyframes pitchStrongArrive {
  from { opacity: 0; transform: scale(1.08); filter: blur(8px); }
  to   { opacity: 1; transform: scale(1.0);  filter: blur(0);   }
}
@keyframes pitchArrive {
  from { opacity: 0; transform: scale(1.04); filter: blur(4px); }
  to   { opacity: 1; transform: scale(1.0);  filter: blur(0);   }
}
@keyframes pitchDraw {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
@keyframes pitchFade {
  from { opacity: 0; }
  to   { opacity: 1; }
}
`;

  const ANNOTATION_TEXTS = [
    'Conor does his prescribed session.',
    'The AI reads his movement in real time.',
    'He sees his own recovery journey.',
    'His physio sees it all — before the appointment.',
  ];

  // Stable timeline reference — defined outside component so it never changes identity
  const TIMELINE = [
    { at: 0,     action: 'reset',          target: 'patient-app' },
    { at: 500,   action: 'showAnnotation', id: 0 },
    { at: 1500,  action: 'highlight',      target: '.start-session-btn', effect: 'pulse' },
    { at: 2800,  action: 'tap',            target: '.start-session-btn' },
    { at: 3200,  action: 'swapAnnotation', from: 0, to: 1 },
    { at: 3400,  action: 'advance',        target: 'patient-app', state: { inSession: true } },
    { at: 6800,  action: 'swapAnnotation', from: 1, to: 2 },
    { at: 8800,  action: 'advance',        target: 'patient-app', state: { sessionComplete: true } },
    { at: 10200, action: 'tap',            target: '.log-checkin-btn' },
    { at: 10200, action: 'swapAnnotation', from: 2, to: 3 },
    { at: 11600, action: 'advance',        target: 'patient-app', state: { checkInLogged: true, streak: 13 } },
    { at: 12800, action: 'highlight',      target: '.streak-number', effect: 'tick', from: 12, to: 13 },
  ];

  window.PitchSlides = window.PitchSlides || {};
  window.PitchSlides[6] = function SlidePatient({ isActive }) {
    const patientAppRef = React.useRef(null);
    const [annotations, setAnnotations] = React.useState({});

    // Wire the deterministic timeline engine
    window.useSlideTimeline({
      timeline: TIMELINE,
      isActive,
      refs: { 'patient-app': patientAppRef },
      setAnnotations,
    });

    // Current annotation index — only one visible at a time
    const currentAnnotation = ANNOTATION_TEXTS.findIndex((_, i) => annotations[i]);

    return (
      <div style={{ position: 'absolute', inset: 0, background: 'var(--paper)' }}>
        <style>{KEYFRAMES}</style>

        {/* ── PHONE COLUMN ── */}
        <div style={{
          position: 'absolute', left: '3%', top: '8%',
          opacity: 0,
          animation: 'pitchFade 700ms ease forwards',
          animationDelay: '400ms',
        }}>
          <IPhone15Pro>
            <PatientApp mode="app" ref={patientAppRef} />
          </IPhone15Pro>
        </div>

        {/* ── TEXT COLUMN ── */}
        <div style={{ position: 'absolute', left: '41%', top: '18%' }}>

          {/* Eyebrow */}
          <div style={{
            fontFamily: "'JetBrains Mono', ui-monospace, monospace",
            fontSize: 11, letterSpacing: '0.3em',
            color: 'var(--mute)',
            opacity: 0,
            animation: 'pitchFade 400ms ease-out forwards',
            animationDelay: '0ms',
          }}>§ WHERE THE DATA COMES FROM</div>

          {/* Headline */}
          <div style={{
            marginTop: 24,
            opacity: 0,
            animation: 'pitchArrive 700ms cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
            animationDelay: '200ms',
          }}>
            <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 700, fontSize: 40, lineHeight: 1.0, color: 'var(--ink)' }}>
              Movement captured.
            </div>
            <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 700, fontSize: 40, lineHeight: 1.0, color: 'var(--ink)', marginTop: 6 }}>
              Report sent.
            </div>
            <div style={{ fontFamily: "'Fraunces', Georgia, serif", fontWeight: 700, fontSize: 40, lineHeight: 1.0, color: 'var(--accent)', marginTop: 6 }}>
              Physio informed.
            </div>
          </div>

          {/* Bullets */}
          <div style={{
            marginTop: 32,
            fontFamily: "'Inter', sans-serif",
            fontSize: 16, fontWeight: 500, lineHeight: 1.8,
            color: 'var(--ink)',
            opacity: 0,
            animation: 'pitchFade 500ms ease-out forwards',
            animationDelay: '600ms',
          }}>
            <div>· AI reads movement — not video, clinical data</div>
            <div>· Visual recovery journey sent to the patient</div>
            <div>· Report reaches the physio automatically</div>
          </div>

          {/* Device line */}
          <div style={{
            marginTop: 24,
            opacity: 0,
            animation: 'pitchFade 400ms ease-out forwards',
            animationDelay: '900ms',
          }}>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 400, fontStyle: 'italic', color: 'var(--mute)' }}>
              Phone. Laptop. Smart TV webcam.
            </div>
            <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 400, fontStyle: 'italic', color: 'var(--mute)', marginTop: 4 }}>
              Any camera the patient already owns.
            </div>
          </div>

          {/* Rotating annotation */}
          <div style={{
            marginTop: 32, maxWidth: 440, minHeight: 40,
            position: 'relative',
          }}>
            {ANNOTATION_TEXTS.map((text, i) => (
              <div key={i} style={{
                position: i === 0 ? 'relative' : 'absolute',
                top: i === 0 ? undefined : 0, left: 0,
                fontFamily: "'Fraunces', Georgia, serif",
                fontStyle: 'italic', fontSize: 26,
                color: 'var(--ink)',
                opacity: currentAnnotation === i ? 1 : 0,
                transform: currentAnnotation === i ? 'scale(1)' : 'scale(1.03)',
                transition: currentAnnotation === i
                  ? 'opacity 500ms ease, transform 500ms ease'
                  : 'opacity 200ms ease, transform 200ms ease',
                pointerEvents: 'none',
              }}>{text}</div>
            ))}
          </div>
        </div>

        {/* Caption */}
        <div style={{
          position: 'absolute', left: '3%', bottom: '9%',
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 10, color: 'var(--mute)',
          opacity: 0,
          animation: 'pitchFade 400ms ease-out forwards',
          animationDelay: '400ms',
        }}>
          CONOR MURPHY · WEEK 8 ACL RECOVERY · DUBLIN
        </div>
      </div>
    );
  };
})();
