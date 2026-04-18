// Slide 4 — INVITED BY DR. SARAH NOLAN · WARM (10s) · DECK-LEFT
// Text block left; iPhone showing Day 1 onboarding right. Green bar + italic
// pull-quote from Áine, CORU-registered clinical advisor.

(function () {
  const { IPhone15Pro, PatientApp } = window;

  function Slide04() {
    // iPhone at x=50% of viewport (per spec), vertically centered.
    // iPhone dimensions 412 × 866.
    const phoneLeft = Math.round(1920 * 0.50);            // 960
    const phoneTop  = Math.round((1080 - 866) / 2);       // 107

    // Text block x=10% → x=46% of viewport = 192 → 883 (width ~691).
    const textLeft  = Math.round(1920 * 0.10);            // 192
    const textWidth = Math.round(1920 * 0.46) - textLeft; // 691

    return (
      <div style={{ position: 'absolute', inset: 0 }}>
        {/* Eyebrow */}
        <div style={{
          position: 'absolute', left: textLeft, top: 180,
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 13, fontWeight: 500,
          letterSpacing: '0.3em',
          color: 'var(--mute)',
          animation: 'pitchArrive 800ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
        }}>
          § THE PRODUCT · 01
        </div>

        {/* Headline */}
        <div style={{
          position: 'absolute', left: textLeft, top: 180 + 80,
          width: textWidth,
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 700,
          fontSize: 52, lineHeight: 1.1,
          letterSpacing: '-0.025em',
          color: 'var(--ink)',
          animation: 'pitchArrive 1000ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
          animationDelay: '300ms',
        }}>
          <div>The clinical relationship,</div>
          <div>in the patient&apos;s pocket.</div>
        </div>

        {/* Pull-quote — green bar + italic */}
        <div style={{
          position: 'absolute', left: textLeft, top: 180 + 80 + 160,
          width: textWidth,
          display: 'flex', alignItems: 'flex-start', gap: 20,
          animation: 'pitchArrive 1000ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
          animationDelay: '600ms',
        }}>
          <div style={{ width: 3, height: 72, background: 'var(--green)', flexShrink: 0, marginTop: 6 }}/>
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontStyle: 'italic',
            fontSize: 19, fontWeight: 400,
            lineHeight: 1.55,
            color: 'var(--ink)',
          }}>
            &ldquo;Patients stop adhering because nobody sees the effort. Recovera is the first tool that shows me what happened between appointments.&rdquo;
          </div>
        </div>

        {/* Attribution */}
        <div style={{
          position: 'absolute', left: textLeft + 23, top: 180 + 80 + 160 + 200,
          width: textWidth,
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 11, fontWeight: 400,
          letterSpacing: '0.18em',
          color: 'var(--mute)',
          animation: 'pitchFade 400ms ease both',
          animationDelay: '1000ms',
        }}>
          — ÁINE L., CORU-REGISTERED PHYSIOTHERAPIST · RECOVERA CLINICAL ADVISOR
        </div>

        {/* iPhone — onboarding mode */}
        <div style={{
          position: 'absolute', left: phoneLeft, top: phoneTop,
          animation: 'pitchArriveFrame 700ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
          animationDelay: '600ms',
        }}>
          <IPhone15Pro>
            <PatientApp mode="onboarding" onExitMode={() => {}}/>
          </IPhone15Pro>
        </div>
      </div>
    );
  }

  if (!window.PitchSlides) window.PitchSlides = {};
  window.PitchSlides[4] = Slide04;
})();
