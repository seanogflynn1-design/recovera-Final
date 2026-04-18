// Slide 5 — THE PROOFREADER · DARK (22s) · DECK-BACKGROUND — THESIS SLIDE
// Two phases.
//   Phase 1 (0–4s): "You wouldn't send an AI-written email / without reading it
//                    first." + simplified email demo ("10am" → "10:30am").
//   Phase 2 (4s+):  "Recovera is the proofreader / the physio has never had."
//                   — the deck's peak Fraunces moment at 88px.

(function () {
  function Slide04({ isActive, epoch }) {
    const [phase, setPhase] = React.useState(1);
    const [emailState, setEmailState] = React.useState('enter'); // enter → selected → corrected → leaving

    // Drive phase transitions deterministically from slide-activation t0.
    React.useEffect(() => {
      if (!isActive) {
        setPhase(1);
        setEmailState('enter');
        return undefined;
      }
      const t0 = performance.now();
      let cancelled = false;
      const marks = [
        { at: 2200, run: () => setEmailState('selected') },
        { at: 2700, run: () => setEmailState('corrected') },
        { at: 3700, run: () => setEmailState('leaving') },
        { at: 4000, run: () => setPhase(2) },
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
        {/* Eyebrow */}
        <div style={{
          position: 'absolute', top: 96, left: 120,
          fontFamily: "'JetBrains Mono', ui-monospace, monospace",
          fontSize: 13, fontWeight: 500,
          letterSpacing: '0.3em',
          color: 'var(--film-mute)',
          animation: 'pitchArrive 800ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
        }}>
          § THE INSIGHT
        </div>

        {/* Phase 1 — two lines + email demo */}
        <div style={{
          position: 'absolute', top: '32%', left: 0, right: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          opacity: phase === 1 ? 1 : 0,
          transition: 'opacity 800ms ease',
          pointerEvents: phase === 1 ? 'auto' : 'none',
        }}>
          <div style={{
            fontFamily: "'Fraunces', Georgia, serif",
            fontWeight: 700,
            fontVariationSettings: '"opsz" 144',
            fontSize: 54, lineHeight: 1.15,
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
            fontSize: 54, lineHeight: 1.15,
            letterSpacing: '-0.02em',
            color: 'var(--film-mute)',
            animation: 'pitchArrive 1000ms cubic-bezier(0.2, 0.8, 0.2, 1) both',
          }}>
            without reading it first.
          </div>

          {/* Mock email, fades in 2.2s after slide start */}
          <div style={{
            marginTop: 80,
            width: 760,
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

        {/* Phase 2 — thesis lines */}
        <div style={{
          position: 'absolute', top: '48%', left: 0, right: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          opacity: phase === 2 ? 1 : 0,
          transition: 'opacity 800ms ease',
          pointerEvents: phase === 2 ? 'auto' : 'none',
        }}>
          {/* Rule */}
          <div style={{
            width: 560, height: 1,
            background: 'var(--film-soft)',
            transformOrigin: 'left center',
            animation: phase === 2 ? 'pitchDraw 500ms cubic-bezier(0.65, 0, 0.35, 1) both' : 'none',
          }}/>
          <div style={{
            marginTop: 72,
            fontFamily: "'Fraunces', Georgia, serif",
            fontWeight: 900,
            fontVariationSettings: '"opsz" 144',
            fontSize: 88, lineHeight: 1.05,
            letterSpacing: '-0.03em',
            color: 'var(--film-ink)',
            animation: phase === 2 ? 'pitchArrive 1200ms cubic-bezier(0.2, 0.8, 0.2, 1) both' : 'none',
            animationDelay: '400ms',
          }}>
            Recovera is the proofreader
          </div>
          <div style={{
            marginTop: 18,
            fontFamily: "'Fraunces', Georgia, serif",
            fontWeight: 700,
            fontVariationSettings: '"opsz" 144',
            fontSize: 54, lineHeight: 1.1,
            letterSpacing: '-0.02em',
            color: 'var(--film-ink)',
            animation: phase === 2 ? 'pitchArrive 1200ms cubic-bezier(0.2, 0.8, 0.2, 1) both' : 'none',
            animationDelay: '400ms',
          }}>
            the physio has never had.
          </div>
        </div>
      </div>
    );
  }

  if (!window.PitchSlides) window.PitchSlides = {};
  window.PitchSlides[4] = Slide04;
})();
