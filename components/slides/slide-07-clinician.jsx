// Slide 8 — THE CLINICIAN · WARM (24s) · DECK-FULL
// Embedded MacBook with ClinicianDash. The timeline walks the eye through
// the 4 KPIs, then the 3 red-flag patients, then the Conor schedule card.
// Each beat gets a Fraunces italic annotation anchored back to its target.

(function () {
  const { useSlideTimeline, SlideAnnotation, MacBookFrame, ClinicianDash } = window;

  const TIMELINE = [
    { at: 0,     action: 'reset',           target: 'clinician-dash' },

    { at: 1200,  action: 'highlight',       target: '.kpi-card-scheduled', effect: 'pulse' },
    { at: 1200,  action: 'showAnnotation',  id: 'ann-8-patients' },
    { at: 2400,  action: 'highlight',       target: '.kpi-card-flags', effect: 'pulse' },
    { at: 2400,  action: 'showAnnotation',  id: 'ann-3-flags' },
    { at: 3600,  action: 'highlight',       target: '.kpi-card-adherence', effect: 'pulse' },
    { at: 4400,  action: 'highlight',       target: '.kpi-card-completed', effect: 'pulse' },

    { at: 5500,  action: 'hideAnnotation',  id: 'ann-8-patients' },
    { at: 5500,  action: 'scroll',          target: '.clinician-dash', to: '.flagged-patients-panel', duration: 800 },

    { at: 7000,  action: 'highlight',       target: '.flag-daniel-keane', effect: 'outline' },
    { at: 7000,  action: 'showAnnotation',  id: 'ann-pain-spike' },

    { at: 10000, action: 'hideAnnotation',  id: 'ann-pain-spike' },
    { at: 10000, action: 'resetHighlight',  target: '.flag-daniel-keane' },
    { at: 10000, action: 'highlight',       target: '.flag-tomas-hennessy', effect: 'outline' },
    { at: 10000, action: 'showAnnotation',  id: 'ann-no-logs' },

    { at: 13000, action: 'hideAnnotation',  id: 'ann-no-logs' },
    { at: 13000, action: 'resetHighlight',  target: '.flag-tomas-hennessy' },
    { at: 13000, action: 'highlight',       target: '.flag-niamh-byrne', effect: 'outline' },
    { at: 13000, action: 'showAnnotation',  id: 'ann-call-req' },

    { at: 16000, action: 'hideAnnotation',  id: 'ann-3-flags' },
    { at: 16000, action: 'hideAnnotation',  id: 'ann-call-req' },
    { at: 16000, action: 'resetHighlight',  target: '.flag-niamh-byrne' },

    { at: 16500, action: 'scroll',          target: '.clinician-dash', to: '.schedule-panel', duration: 800 },

    { at: 18000, action: 'highlight',       target: '.patient-card-conor', effect: 'outline' },
    { at: 18000, action: 'showAnnotation',  id: 'ann-conor-ahead' },

    { at: 22000, action: 'resetHighlight',  target: '*' },
  ];

  function Slide07({ isActive }) {
    const clinicianRef = React.useRef(null);
    const [annotations, setAnnotations] = React.useState({});

    const refs = React.useMemo(() => ({
      'clinician-dash': clinicianRef,
    }), []);

    useSlideTimeline({
      timeline: TIMELINE,
      isActive,
      refs,
      setAnnotations,
    });

    // MacBook frame dimensions from device-frames.jsx:
    //   lid width  = screen(1280) + bezel(14*2) = 1308
    //   total W    = lid + baseHang(90*2)       = 1488
    //   lid height = screen(800) + bezel(14*2) + 20 = 848
    //   total H    = lid + hinge(10) + base(26) + extra ≈ 890
    // Centre it horizontally; nudge upward so caption has breathing room.
    const macW = 1488;
    const macH = 900;
    const macLeft = Math.round((1920 - macW) / 2);  // 216
    const macTop  = Math.round((1080 - macH) / 2) - 20; // ≈ 70

    return (
      <div style={{ position: 'absolute', inset: 0 }}>
        {/* Eyebrow */}
        <div style={{
          position: 'absolute', top: 72, left: 120,
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 13, fontWeight: 500,
          letterSpacing: '0.3em',
          color: 'var(--mute)',
          animation: 'pitchArrive 800ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
        }}>
          § THE CLINICIAN · 03
        </div>

        {/* MacBook with embedded ClinicianDash */}
        <div style={{
          position: 'absolute', left: macLeft, top: macTop,
          animation: 'pitchArriveFrame 700ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
        }}>
          <MacBookFrame>
            <ClinicianDash ref={clinicianRef}/>
          </MacBookFrame>
        </div>

        {/* Caption */}
        <div style={{
          position: 'absolute', left: 120, bottom: 72,
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 13, fontWeight: 500,
          letterSpacing: '0.2em',
          color: 'var(--mute)',
        }}>
          DR. ÁINE O&apos;BRIEN · MISCP · DUBLIN PHYSIO CO
        </div>

        {/* Annotations — positioned above / beside the MacBook. */}
        <SlideAnnotation
          shown={!!annotations['ann-8-patients']}
          style={{ left: macLeft + 70, top: macTop - 56, width: 240 }}
          text="8 patients today"
          typographyStyle={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontStyle: 'italic', fontWeight: 400,
            fontSize: 20, color: 'var(--ink)',
          }}
          anchor=".kpi-card-scheduled"
          connector
          connectorOrigin="bottom"
        />

        <SlideAnnotation
          shown={!!annotations['ann-3-flags']}
          style={{ left: macLeft + 320, top: macTop - 56, width: 240 }}
          text="3 need attention"
          typographyStyle={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontStyle: 'italic', fontWeight: 400,
            fontSize: 20, color: 'var(--red)',
          }}
          anchor=".kpi-card-flags"
          connector
          connectorColor="rgba(185, 67, 44, 0.55)"
          connectorOrigin="bottom"
        />

        <SlideAnnotation
          shown={!!annotations['ann-pain-spike']}
          style={{ left: macLeft - 360, top: macTop + 260, width: 320, textAlign: 'right' }}
          text="→ pain spike · 2 sessions missed"
          typographyStyle={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontStyle: 'italic', fontWeight: 400,
            fontSize: 16, color: 'var(--ink)',
          }}
          anchor=".flag-daniel-keane"
          connector
          connectorOrigin="right"
        />

        <SlideAnnotation
          shown={!!annotations['ann-no-logs']}
          style={{ left: macLeft - 360, top: macTop + 340, width: 320, textAlign: 'right' }}
          text="→ no logs in 3 days"
          typographyStyle={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontStyle: 'italic', fontWeight: 400,
            fontSize: 16, color: 'var(--ink)',
          }}
          anchor=".flag-tomas-hennessy"
          connector
          connectorOrigin="right"
        />

        <SlideAnnotation
          shown={!!annotations['ann-call-req']}
          style={{ left: macLeft - 360, top: macTop + 420, width: 320, textAlign: 'right' }}
          text="→ requires call"
          typographyStyle={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontStyle: 'italic', fontWeight: 400,
            fontSize: 16, color: 'var(--ink)',
          }}
          anchor=".flag-niamh-byrne"
          connector
          connectorOrigin="right"
        />

        <SlideAnnotation
          shown={!!annotations['ann-conor-ahead']}
          style={{ left: macLeft + macW + 28, top: macTop + 430, width: 260 }}
          text="→ 4 weeks ahead of protocol"
          typographyStyle={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontStyle: 'italic', fontWeight: 400,
            fontSize: 16, color: 'var(--green)',
          }}
          anchor=".patient-card-conor"
          connector
          connectorColor="rgba(31, 77, 46, 0.55)"
          connectorOrigin="left"
        />
      </div>
    );
  }

  if (!window.PitchSlides) window.PitchSlides = {};
  window.PitchSlides[7] = Slide07;
})();
