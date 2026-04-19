// Slide 03 — BEFORE A SESSION · WARM (12s) · DECK-FULL · STATIC
// Static (non-auto-play) ClinicianDash inside a MacBook frame. Three
// Fraunces italic annotations point at the scheduled count, red-flag
// count, and Daniel Keane's flag card — staggered in via the timeline
// engine so the reviewer's eye is walked through the screen.

(function () {
  const { useSlideTimeline, SlideAnnotation, MacBookFrame, ClinicianDash } = window;

  const TIMELINE = [
    { at: 0,    action: 'reset',          target: 'clinician-dash' },
    { at: 800,  action: 'showAnnotation', id: 'ann-8-patients' },
    { at: 1800, action: 'showAnnotation', id: 'ann-3-flags' },
    { at: 2800, action: 'showAnnotation', id: 'ann-daniel' },
  ];

  function Slide03({ isActive }) {
    const clinicianRef = React.useRef(null);
    const [annotations, setAnnotations] = React.useState({});

    const refs = React.useMemo(() => ({ 'clinician-dash': clinicianRef }), []);

    useSlideTimeline({ timeline: TIMELINE, isActive, refs, setAnnotations });

    const macW = 1488;
    const macH = 900;
    const macLeft = Math.round((1920 - macW) / 2);       // 216
    const macTop  = Math.round((1080 - macH) / 2) - 20;  // 70

    return (
      <div style={{ position: 'absolute', inset: 0 }}>
        {/* Explanation — top-centred */}
        <div style={{
          position: 'absolute',
          left: 0, right: 0, top: Math.round(1080 * 0.06),
          textAlign: 'center',
          fontFamily: "'Inter', sans-serif",
          fontSize: 20, fontWeight: 500,
          letterSpacing: '0.01em',
          color: 'var(--ink)',
          animation: 'pitchFade 500ms ease both',
        }}>
          <div style={{ display: 'inline-block', maxWidth: 1100 }}>
            Before her first patient of the day, &Aacute;ine opens Recovera. The whole clinic, at a glance.
          </div>
        </div>

        {/* MacBook with static ClinicianDash */}
        <div style={{
          position: 'absolute', left: macLeft, top: macTop,
          animation: 'pitchArriveFrame 700ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
        }}>
          <MacBookFrame>
            <ClinicianDash ref={clinicianRef}/>
          </MacBookFrame>
        </div>

        {/* Bottom caption */}
        <div style={{
          position: 'absolute', left: 120, bottom: 72,
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 13, fontWeight: 500,
          letterSpacing: '0.2em',
          color: 'var(--mute)',
        }}>
          DR. &Aacute;INE O&apos;BRIEN · MISCP · DUBLIN PHYSIO CO
        </div>

        {/* Annotation 1 — 8 patients today (scheduled KPI, top) */}
        <SlideAnnotation
          shown={!!annotations['ann-8-patients']}
          style={{ left: macLeft + 70, top: macTop - 56, width: 260 }}
          text="8 patients today"
          typographyStyle={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontStyle: 'italic', fontWeight: 400,
            fontSize: 22, color: 'var(--ink)',
          }}
          anchor=".kpi-card-scheduled"
          connector
          connectorOrigin="bottom"
        />

        {/* Annotation 2 — 3 flagged (flags KPI, top) */}
        <SlideAnnotation
          shown={!!annotations['ann-3-flags']}
          style={{ left: macLeft + 320, top: macTop - 56, width: 300 }}
          text={<span>3 flagged &mdash; see them first</span>}
          typographyStyle={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontStyle: 'italic', fontWeight: 400,
            fontSize: 22, color: 'var(--red)',
          }}
          anchor=".kpi-card-flags"
          connector
          connectorColor="rgba(185, 67, 44, 0.55)"
          connectorOrigin="bottom"
        />

        {/* Annotation 3 — Daniel flag, left of MacBook */}
        <SlideAnnotation
          shown={!!annotations['ann-daniel']}
          style={{ left: macLeft - 360, top: macTop + 280, width: 320, textAlign: 'right' }}
          text={<span>&rarr; Daniel: pain spike, missed two sessions</span>}
          typographyStyle={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontStyle: 'italic', fontWeight: 400,
            fontSize: 18, lineHeight: 1.35, color: 'var(--ink)',
          }}
          anchor=".flag-daniel-keane"
          connector
          connectorOrigin="right"
        />
      </div>
    );
  }

  if (!window.PitchSlides) window.PitchSlides = {};
  window.PitchSlides[3] = Slide03;
})();
