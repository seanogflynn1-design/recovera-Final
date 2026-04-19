// Slide 03 — WHAT RECOVERA IS · WARM (10s) · DECK-LEFT
// Explanation line teaches the business one-liner; text block explains the
// patient-side product; iPhone right shows Day-1 onboarding. Green-bar
// pull-quote from Áine, CORU-registered clinical advisor.

(function () {
  const { IPhone15Pro, PatientApp } = window;

  function Slide03() {
    const phoneLeft = Math.round(1920 * 0.55);            // 1056
    const phoneTop  = Math.round((1080 - 866) / 2);       // 107

    const textLeft  = Math.round(1920 * 0.10);            // 192
    const textWidth = Math.round(1920 * 0.48) - textLeft; // 730

    const explanationY = Math.round(1080 * 0.10);         // 108
    const eyebrowY     = explanationY + 72 + 80;          // 260
    const headlineY    = eyebrowY + 12 + 48;              // 320
    const bodyY        = headlineY + Math.round(48 * 1.1 * 2) + 40; // 465
    const quoteY       = bodyY + Math.round(18 * 1.3) + 24;         // 513

    return (
      <div style={{ position: 'absolute', inset: 0 }}>
        {/* Explanation — the museum placard */}
        <div style={{
          position: 'absolute', left: textLeft, top: explanationY,
          maxWidth: 720,
          fontFamily: "'Inter', sans-serif",
          fontSize: 20, fontWeight: 500,
          lineHeight: 1.35,
          letterSpacing: '0.005em',
          color: 'var(--ink)',
          animation: 'pitchFade 500ms ease both',
        }}>
          Recovera sends every patient home with their physio&apos;s prescription — and a camera that monitors how well they do it.
        </div>

        {/* Eyebrow */}
        <div style={{
          position: 'absolute', left: textLeft, top: eyebrowY,
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 12, fontWeight: 500,
          letterSpacing: '0.3em',
          color: 'var(--mute)',
          animation: 'pitchArrive 800ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
          animationDelay: '300ms',
        }}>
          § THE PATIENT SIDE · 01
        </div>

        {/* Headline */}
        <div style={{
          position: 'absolute', left: textLeft, top: headlineY,
          width: textWidth,
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 700,
          fontSize: 48, lineHeight: 1.1,
          letterSpacing: '-0.025em',
          color: 'var(--ink)',
          animation: 'pitchArrive 1000ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
          animationDelay: '600ms',
        }}>
          <div>Prescribed by the physio.</div>
          <div>Monitored by the phone.</div>
        </div>

        {/* Body */}
        <div style={{
          position: 'absolute', left: textLeft, top: bodyY,
          width: textWidth,
          fontFamily: "'Inter', sans-serif",
          fontSize: 18, fontWeight: 500,
          lineHeight: 1.4,
          color: 'var(--ink)',
          animation: 'pitchArrive 800ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
          animationDelay: '900ms',
        }}>
          Every session scored. Every rep tracked. Every day of pain logged.
        </div>

        {/* Pull-quote — green bar + italic */}
        <div style={{
          position: 'absolute', left: textLeft, top: quoteY,
          width: textWidth,
          display: 'flex', alignItems: 'flex-start', gap: 20,
          animation: 'pitchArrive 1000ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
          animationDelay: '1200ms',
        }}>
          <div style={{ width: 3, height: 72, background: 'var(--green)', flexShrink: 0, marginTop: 4 }}/>
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: "'Inter', sans-serif",
              fontStyle: 'italic',
              fontSize: 17, fontWeight: 400,
              lineHeight: 1.55,
              color: 'var(--ink)',
            }}>
              &ldquo;This is the first tool where what happens at home actually reaches me.&rdquo;
            </div>
            <div style={{
              marginTop: 12,
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: 10, fontWeight: 400,
              letterSpacing: '0.18em',
              color: 'var(--mute)',
            }}>
              — ÁINE L., CORU-REGISTERED PHYSIOTHERAPIST · RECOVERA CLINICAL ADVISOR
            </div>
          </div>
        </div>

        {/* iPhone — onboarding mode */}
        <div style={{
          position: 'absolute', left: phoneLeft, top: phoneTop,
          animation: 'pitchArriveFrame 700ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
          animationDelay: '1500ms',
        }}>
          <IPhone15Pro>
            <PatientApp mode="onboarding" onExitMode={() => {}}/>
          </IPhone15Pro>
        </div>
      </div>
    );
  }

  if (!window.PitchSlides) window.PitchSlides = {};
  window.PitchSlides[3] = Slide03;
})();
