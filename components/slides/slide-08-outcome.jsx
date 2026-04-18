// Slide 9 — FOUR WEEKS BACK · WARM (10s) · DECK-LEFT
// Motion-as-proof. Grey baseline bar on entry; green segment fills from left
// over 1500ms starting at t=2500ms. When the green crosses 80% width, a
// callout labels the tail as "→ 4 WEEKS BACK". Labels frame the whole bar as
// 16 vs 20 weeks.

(function () {
  const { IPhone15Pro, PatientApp } = window;

  function Slide08({ isActive, epoch }) {
    const [fill, setFill] = React.useState(0); // 0..1 green width fraction
    const [tailLabelShown, setTailLabelShown] = React.useState(false);

    React.useEffect(() => {
      if (!isActive) { setFill(0); setTailLabelShown(false); return undefined; }
      let cancelled = false;
      const start = performance.now();
      const delay = 2500;
      const duration = 1500;
      const loop = () => {
        if (cancelled) return;
        const elapsed = performance.now() - start;
        if (elapsed < delay) {
          setFill(0);
        } else {
          const p = Math.min(1, (elapsed - delay) / duration);
          setFill(p);
          if (p >= 0.8) setTailLabelShown(true);
        }
        if (elapsed < delay + duration + 100) requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
      return () => { cancelled = true; };
    }, [isActive, epoch]);

    // iPhone at x=18% of viewport (centre), vertically centred.
    const phoneCentre = Math.round(1920 * 0.18);  // 346
    const phoneLeft = phoneCentre - 412 / 2;
    const phoneTop  = (1080 - 866) / 2;

    const textLeft  = Math.round(1920 * 0.38);   // 730
    const textRight = Math.round(1920 * 0.72);   // 1382
    const textWidth = textRight - textLeft;

    const barWidth = 440;
    const barHeight = 28;
    const tailFrac = 0.20;

    return (
      <div style={{ position: 'absolute', inset: 0 }}>
        {/* iPhone */}
        <div style={{
          position: 'absolute', left: phoneLeft, top: phoneTop,
          animation: 'pitchArriveFrame 700ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
          animationDelay: '200ms',
        }}>
          <IPhone15Pro>
            <PatientApp mode="compare" onExitMode={() => {}}/>
          </IPhone15Pro>
        </div>

        {/* Eyebrow */}
        <div style={{
          position: 'absolute', left: textLeft, top: 200,
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 13, fontWeight: 500,
          letterSpacing: '0.3em',
          color: 'var(--mute)',
          animation: 'pitchArrive 800ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
        }}>
          § THE OUTCOME
        </div>

        {/* Headline */}
        <div style={{
          position: 'absolute', left: textLeft, top: 200 + 56,
          width: textWidth,
          fontFamily: "'Fraunces', Georgia, serif",
          fontWeight: 700,
          fontVariationSettings: '"opsz" 144',
          fontSize: 48, lineHeight: 1.1,
          letterSpacing: '-0.025em',
          color: 'var(--ink)',
          animation: 'pitchArrive 1000ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
          animationDelay: '300ms',
        }}>
          <div>Four weeks of life</div>
          <div>back to every patient.</div>
        </div>

        {/* Sub */}
        <div style={{
          position: 'absolute', left: textLeft, top: 200 + 56 + 148,
          width: textWidth,
          fontFamily: "'Inter', sans-serif",
          fontSize: 20, fontWeight: 400,
          color: 'var(--mute)',
          animation: 'pitchArrive 800ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
          animationDelay: '700ms',
        }}>
          Across 14,200 clinics in Ireland and the UK alone.
        </div>

        {/* Bar label above */}
        <div style={{
          position: 'absolute', left: textLeft, top: 200 + 56 + 148 + 80,
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 11, fontWeight: 400,
          letterSpacing: '0.18em',
          color: 'var(--mute)',
          animation: 'pitchFade 400ms ease both',
          animationDelay: '1100ms',
        }}>
          20 WEEKS · STANDARD CARE
        </div>

        {/* Comparison bar */}
        <div style={{
          position: 'absolute', left: textLeft, top: 200 + 56 + 148 + 80 + 28,
          width: barWidth, height: barHeight,
          background: '#E5E4DD',
          borderRadius: 4, overflow: 'hidden',
          animation: 'pitchFade 600ms ease both',
          animationDelay: '1100ms',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            width: `${fill * 100}%`,
            background: 'var(--green)',
            transition: 'width 40ms linear',
          }}/>
        </div>

        {/* Tail label "→ 4 WEEKS BACK" */}
        <div style={{
          position: 'absolute',
          left: textLeft + barWidth * (1 - tailFrac / 2),
          top: 200 + 56 + 148 + 80 - 4,
          transform: 'translateX(-50%)',
          fontFamily: "'Fraunces', Georgia, serif",
          fontStyle: 'italic', fontWeight: 400,
          fontSize: 14, color: 'var(--green)',
          opacity: tailLabelShown ? 1 : 0,
          transition: 'opacity 400ms ease',
          whiteSpace: 'nowrap',
        }}>
          → 4 WEEKS BACK
        </div>

        {/* Bar label below */}
        <div style={{
          position: 'absolute', left: textLeft, top: 200 + 56 + 148 + 80 + 28 + barHeight + 14,
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 11, fontWeight: 400,
          letterSpacing: '0.18em',
          color: 'var(--ink)',
          animation: 'pitchFade 400ms ease both',
          animationDelay: '1500ms',
        }}>
          16 WEEKS · RECOVERA
        </div>

        {/* Source */}
        <div style={{
          position: 'absolute', left: textLeft, top: 200 + 56 + 148 + 80 + 28 + barHeight + 14 + 36,
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 11, fontWeight: 400,
          letterSpacing: '0.18em',
          color: 'var(--mute-soft)',
          animation: 'pitchFade 400ms ease both',
          animationDelay: '1900ms',
        }}>
          BASED ON PROTOCOL TIMELINES · POST-SURGICAL ACL RECOVERY
        </div>
      </div>
    );
  }

  if (!window.PitchSlides) window.PitchSlides = {};
  window.PitchSlides[8] = Slide08;
})();
