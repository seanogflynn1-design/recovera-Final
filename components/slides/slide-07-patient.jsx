// Slide 7 — "The Patient" — WARM, 16s, DECK-FULL.
//
// Embedded iPhone with PatientApp playing a scripted sequence: start session
// → complete → log check-in → streak ticks 12 → 13. A rotating Fraunces
// italic caption sits right of the iPhone. Two annotation callouts (with thin
// SVG connector lines) point at the Start Session button and the streak
// number at specific timeline cues.
//
// This is the validation slide for the timeline engine's determinism
// contract: navigate away and back, and this sequence must replay
// frame-for-frame identically.

(function () {
  const { useSlideTimeline, SlideAnnotation, IPhone15Pro, PatientApp } = window;

  const LINES = [
    { id: 'line-1', text: 'Conor logs his session.' },
    { id: 'line-2', text: 'Twelve minutes. No clinic visit.' },
    { id: 'line-3', text: 'His streak grows by one.' },
    { id: 'line-4', text: 'His physio sees all of it — already.' },
  ];

  // Timeline authoritative per build spec.
  const TIMELINE = [
    { at: 0,     action: 'reset',           target: 'patient-app' },
    { at: 800,   action: 'showAnnotation',  id: 'line-1' },
    { at: 1500,  action: 'showAnnotation',  id: 'callout-prescribed' },
    { at: 1500,  action: 'highlight',       target: '.start-session-btn', effect: 'pulse' },
    { at: 3000,  action: 'tap',             target: '.start-session-btn' },
    { at: 3500,  action: 'hideAnnotation',  id: 'callout-prescribed' },
    { at: 3500,  action: 'swapAnnotation',  from: 'line-1', to: 'line-2' },
    { at: 3600,  action: 'advance',         target: 'patient-app', state: { inSession: true } },
    { at: 7000,  action: 'swapAnnotation',  from: 'line-2', to: 'line-3' },
    { at: 9000,  action: 'advance',         target: 'patient-app', state: { sessionComplete: true, sessionCount: 5 } },
    { at: 10500, action: 'tap',             target: '.log-checkin-btn' },
    { at: 10500, action: 'swapAnnotation',  from: 'line-3', to: 'line-4' },
    { at: 12000, action: 'advance',         target: 'patient-app', state: { checkInLogged: true, streak: 13 } },
    { at: 12000, action: 'showAnnotation',  id: 'callout-streak' },
    { at: 13200, action: 'highlight',       target: '.streak-number', effect: 'tick', from: 12, to: 13, duration: 900 },
    { at: 14500, action: 'hideAnnotation',  id: 'callout-streak' },
  ];

  function Slide07({ isActive }) {
    const patientAppRef = React.useRef(null);
    const [annotations, setAnnotations] = React.useState({});

    const refs = React.useMemo(() => ({ 'patient-app': patientAppRef }), []);

    useSlideTimeline({
      timeline: TIMELINE,
      isActive,
      refs,
      setAnnotations,
    });

    // Phone position per spec — x=40% (iPhone centre at 40% of viewport).
    // iPhone dimensions from device-frames: 412 × 866. Centre at 1920*0.40 = 768.
    const phoneLeft = Math.round(768 - 412 / 2);       // 562
    const phoneTop  = Math.round(1080 / 2 - 866 / 2);  // 107

    return (
      <div style={{ position: 'absolute', inset: 0 }}>
        {/* Eyebrow */}
        <div style={{
          position: 'absolute', top: 96, left: 120,
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 13, letterSpacing: '0.3em', color: 'var(--mute)',
          fontWeight: 500,
          animation: 'pitchArrive 800ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
        }}>
          § THE PATIENT · 02
        </div>

        {/* iPhone with embedded PatientApp */}
        <div style={{
          position: 'absolute', left: phoneLeft, top: phoneTop,
          animation: 'pitchArriveFrame 700ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
        }}>
          <IPhone15Pro>
            <PatientApp ref={patientAppRef} mode="app" />
          </IPhone15Pro>
        </div>

        {/* Rotating right-side caption block */}
        <div style={{
          position: 'absolute',
          left: 1114, top: 440,
          width: 690,
          fontFamily: "'Fraunces', Georgia, serif",
          fontStyle: 'italic', fontWeight: 400,
          fontSize: 36, lineHeight: 1.25,
          color: 'var(--ink)',
          letterSpacing: '-0.005em',
        }}>
          {LINES.map((line) => (
            <div key={line.id} style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              opacity: annotations[line.id] ? 1 : 0,
              transition: 'opacity 500ms ease',
            }}>
              {line.text}
            </div>
          ))}
        </div>

        {/* Bottom-left caption */}
        <div style={{
          position: 'absolute', left: 120, bottom: 96,
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 13, letterSpacing: '0.2em', color: 'var(--mute)',
          fontWeight: 500,
        }}>
          CONOR MURPHY · WEEK 8 ACL · DUBLIN
        </div>

        {/* Annotation callout 1 — prescribed by Dr. Sarah Nolan */}
        <SlideAnnotation
          shown={!!annotations['callout-prescribed']}
          style={{
            left: phoneLeft - 270,
            top: phoneTop + 740,
            width: 240,
            textAlign: 'right',
          }}
          text={<span>→ prescribed by Dr. Sarah Nolan</span>}
          typographyStyle={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontStyle: 'italic', fontWeight: 400,
            fontSize: 18, lineHeight: 1.3,
            color: 'var(--ink)',
          }}
          anchor=".start-session-btn"
          connector
          connectorOrigin="right"
          connectorColor="rgba(13,13,13,0.4)"
        />

        {/* Annotation callout 2 — streak clinically verified */}
        <SlideAnnotation
          shown={!!annotations['callout-streak']}
          style={{
            left: phoneLeft + 460,
            top: phoneTop + 330,
            width: 280,
          }}
          text={<span>→ 13 days · clinically verified</span>}
          typographyStyle={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontStyle: 'italic', fontWeight: 400,
            fontSize: 18, lineHeight: 1.3,
            color: 'var(--ink)',
          }}
          anchor=".streak-number"
          connector
          connectorOrigin="left"
          connectorColor="rgba(13,13,13,0.4)"
        />
      </div>
    );
  }

  if (!window.PitchSlides) window.PitchSlides = {};
  window.PitchSlides[7] = Slide07;
})();
