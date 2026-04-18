// Slide 04 — THE INSIGHT · DARK (15s) · DECK-FULL — THESIS SLIDE
// Two-phase analogy that closes on-slide without voiceover.
//   Phase 1 (0–5000ms): email analogy + mock email demo.
//   Phase 2 (5000–15000ms): rule draws, question restated for physical
//     recovery, then payoff "Recovera is the physio, checking it."
//     lands at t=10000ms and holds 5s before the dissolve.

(function () {
  function Slide04({ isActive, epoch }) {
    const [phase, setPhase] = React.useState(1);
    const [emailState, setEmailState] = React.useState('enter');
    const [payoffShown, setPayoffShown] = React.useState(false);

    React.useEffect(() => {
      if (!isActive) {
        setPhase(1);
        setEmailState('enter');
        setPayoffShown(false);
        return undefined;
      }
      const t0 = performance.now();
      let cancelled = false;
      const marks = [
        { at: 2200,  run: () => setEmailState('selected') },
        { at: 2700,  run: () => setEmailState('corrected') },
        { at: 4700,  run: () => setEmailState('leaving') },
        { at: 5000,  run: () => setPhase(2) },
        { at: 10000, run: () => setPayoffShown(true) },
      ];
      let idx = 0;
      const loop = () => {
        if (cancelled) return;
        const elapsed = performance.now() - t0;
        while (idx < marks.length && marks[idx].at <= elapsed) {
          marks[idx].run();
          idx += 1;
        }
        if (idx < marks.length) requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
      return () => { cancelled = true; };
    }, [isActive, epoch]);

    return (
      <div style={{ position: 'absolute', inset: 0 }}>
        {/* Explanation — top-centred */}
        <div style={{
          position: 'absolute',
          left: 0, right: 0, top: Math.round(1080 * 0.08),
          textAlign: 'center',
          fontFamily: "'Inter', sans-serif",
          fontSize: 18, fontWeight: 500,
          letterSpacing: '0.01em',
          color: 'var(--film-mute)',
          animation: 'pitchFade 500ms ease both',
        }}>
          <div style={{ display: 'inline-block', maxWidth: 1000 }}>
            Other companies built AI that replaces the physio. Recovera is the first that works with her.
          </div>
        </div>

        {/* Phase 1 — email analogy + mock email */}
        <div style={{
          position: 'absolute', top: '30%', left: 0, right: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          opacity: phase === 1 ? 1 : 0,
          transition: 'opacity 800ms ease',
          pointerEvents: phase === 1 ? 'auto' : 'none',
        }}>
          <div style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontWeight: 700,
            fontVariationSettings: '"opsz" 144',
            fontSize: 46, lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: 'var(--film-ink)',
            animation: 'pitchArrive 1000ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
          }}>
            You wouldn&apos;t send an AI-written email
          </div>
          <div style={{
            marginTop: 8,
            fontFamily: "'Fraunces', Georgia, serif",
            fontWeight: 700,
            fontVariationSettings: '"opsz" 144',
            fontSize: 46, lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: 'var(--film-mute)',
            animation: 'pitchArrive 1000ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
          }}>
            without reading it first.
          </div>

          {/* Mock email */}
          <div style={{
            marginTop: 64,
            width: 720,
            padding: '20px 28px',
            border: '1px solid var(--film-soft)',
            borderRadius: 8,
            background: 'rgba(237, 234, 227, 0.04)',
            fontFamily: "'Inter', sans-serif",
            fontSize: 18,
            color: 'var(--film-ink)',
            opacity: emailState === 'enter' ? 0 : emailState === 'leaving' ? 0 : 0.32,
            transition: 'opacity 500ms ease',
          }}>
            <div style={{
              fontFamily: "'JetBrains Mono', ui-monospace, monospace",
              fontSize: 10, letterSpacing: '0.2em',
              color: 'var(--film-mute)', marginBottom: 12,
            }}>
              DRAFT
            </div>
            Confirming next week&apos;s appointment at{' '}
            {emailState === 'corrected' || emailState === 'leaving' ? (
              <span style={{
                background: 'rgba(237, 234, 227, 0.14)',
                padding: '1px 4px',
                borderRadius: 2,
                fontWeight: 600,
              }}>10:30am</span>
            ) : (
              <span style={{
                background: emailState === 'selected' ? 'rgba(237, 234, 227, 0.14)' : 'transparent',
                padding: '1px 4px',
                borderRadius: 2,
                transition: 'background 200ms ease',
              }}>10am</span>
            )}
            .
          </div>
        </div>

        {/* Phase 2 — rule + two-question restatement */}
        <div style={{
          position: 'absolute', top: '40%', left: 0, right: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          opacity: phase === 2 ? 1 : 0,
          transition: 'opacity 800ms ease',
          pointerEvents: phase === 2 ? 'auto' : 'none',
        }}>
          <div style={{
            width: 560, height: 1,
            background: 'var(--film-soft)',
            transformOrigin: 'left center',
            animation: phase === 2 ? 'pitchDraw 500ms cubic-bezier(0.65, 0, 0.35, 1) both' : 'none',
          }}/>
          <div style={{
            marginTop: 56,
            maxWidth: 1400,
            textAlign: 'center',
            fontFamily: "'Fraunces', Georgia, serif",
            fontWeight: 700,
            fontVariationSettings: '"opsz" 144',
            fontSize: 46, lineHeight: 1.2,
            letterSpacing: '-0.02em',
            color: 'var(--film-ink)',
            animation: phase === 2 ? 'pitchArrive 1200ms cubic-bezier(0.2, 0.8, 0.2, 1) both' : 'none',
            animationDelay: '600ms',
          }}>
            So why would you trust AI with your <span style={{ color: 'var(--accent)' }}>physical recovery</span>
          </div>
          <div style={{
            marginTop: 12,
            textAlign: 'center',
            fontFamily: "'Fraunces', Georgia, serif",
            fontWeight: 700,
            fontVariationSettings: '"opsz" 144',
            fontSize: 46, lineHeight: 1.2,
            letterSpacing: '-0.02em',
            color: 'var(--film-ink)',
            animation: phase === 2 ? 'pitchArrive 1200ms cubic-bezier(0.2, 0.8, 0.2, 1) both' : 'none',
            animationDelay: '600ms',
          }}>
            without a <span style={{ color: 'var(--accent)' }}>physiotherapist</span> checking it?
          </div>

          {/* Payoff — lands at t=10000ms */}
          <div style={{
            marginTop: 60,
            textAlign: 'center',
            fontFamily: "'Fraunces', Georgia, serif",
            fontWeight: 900,
            fontVariationSettings: '"opsz" 144',
            fontSize: 64, lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: 'var(--film-ink)',
            opacity: payoffShown ? 1 : 0,
            transform: payoffShown ? 'scale(1)' : 'scale(1.05)',
            filter: payoffShown ? 'blur(0)' : 'blur(6px)',
            transition: 'opacity 1400ms cubic-bezier(0.2, 0.8, 0.2, 1), transform 1400ms cubic-bezier(0.2, 0.8, 0.2, 1), filter 1400ms cubic-bezier(0.2, 0.8, 0.2, 1)',
          }}>
            Recovera is the physio, checking it.
          </div>
        </div>
      </div>
    );
  }

  if (!window.PitchSlides) window.PitchSlides = {};
  window.PitchSlides[4] = Slide04;
})();
