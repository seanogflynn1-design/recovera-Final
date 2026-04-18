// Pitch deck shell — orchestrates 11 slides at 1920×1080, handles keyboard
// navigation, dissolve transitions, export auto-advance, chrome (ticking
// SESSION timestamp + pagination), viewport letterboxing, and the shared
// React refs that slides use to drive embedded prototype components.
//
// Individual slides live in components/slides/*.jsx and attach themselves
// to window.PitchSlides under their numeric id (0..10).

(function () {
  const {
    SessionClockProvider, SessionTimestamp, Pagination,
  } = window;

  const SLIDE_COUNT = 11;

  // Dwell durations (ms) for export / auto-advance mode.
  // Indices 0..10 — title, problem, gap, what, insight, market,
  // patient, clinician, outcome, ceiling, ask. Total 138s = 2:18.
  const DWELL = [5000, 12000, 8000, 10000, 15000, 12000, 16000, 24000, 10000, 14000, 12000];

  function ScaleStage({ children }) {
    const [transform, setTransform] = React.useState('scale(1)');
    React.useEffect(() => {
      const update = () => {
        const sx = window.innerWidth / 1920;
        const sy = window.innerHeight / 1080;
        const s = Math.min(sx, sy);
        setTransform(`scale(${s})`);
      };
      update();
      window.addEventListener('resize', update);
      return () => window.removeEventListener('resize', update);
    }, []);
    return (
      <div style={{
        position: 'fixed', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#000', overflow: 'hidden',
      }}>
        <div style={{
          width: 1920, height: 1080, position: 'relative',
          transform, transformOrigin: 'center center',
          flexShrink: 0,
        }}>
          {children}
        </div>
      </div>
    );
  }

  function ControlsHint({ visible, slideIndex, total }) {
    return (
      <div style={{
        position: 'fixed', bottom: 24, right: 24,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 11, letterSpacing: '0.15em',
        color: 'rgba(255,255,255,0.55)',
        background: 'rgba(0,0,0,0.6)',
        padding: '8px 14px', borderRadius: 6,
        opacity: visible ? 1 : 0,
        transition: 'opacity 300ms ease',
        zIndex: 9999,
        pointerEvents: 'none',
      }}>
        {String(slideIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')} · SPACE / ← → · R · F
      </div>
    );
  }

  function PitchDeck() {
    const exportMode = React.useMemo(() => {
      if (typeof window === 'undefined') return false;
      const p = new URLSearchParams(window.location.search);
      return p.get('export') === '1';
    }, []);

    const [slideIndex, setSlideIndex] = React.useState(0);
    const [epochs, setEpochs] = React.useState(() => Array.from({ length: SLIDE_COUNT }, () => 0));
    const [controlsVisible, setControlsVisible] = React.useState(false);
    const idleTimerRef = React.useRef(null);
    const autoAdvanceRef = React.useRef(null);

    const bumpEpoch = React.useCallback((idx) => {
      setEpochs((prev) => {
        const next = prev.slice();
        next[idx] = (next[idx] || 0) + 1;
        return next;
      });
    }, []);

    const go = React.useCallback((nextIdx) => {
      if (nextIdx < 0 || nextIdx >= SLIDE_COUNT) return;
      setSlideIndex(nextIdx);
      bumpEpoch(nextIdx);
    }, [bumpEpoch]);

    const advance = React.useCallback(() => {
      if (slideIndex < SLIDE_COUNT - 1) go(slideIndex + 1);
    }, [slideIndex, go]);

    const back = React.useCallback(() => {
      if (slideIndex > 0) go(slideIndex - 1);
    }, [slideIndex, go]);

    const restart = React.useCallback(() => {
      bumpEpoch(slideIndex);
    }, [slideIndex, bumpEpoch]);

    // Start the clock + initial slide on mount.
    React.useEffect(() => {
      bumpEpoch(0);
    }, [bumpEpoch]);

    // Keyboard.
    React.useEffect(() => {
      if (exportMode) return undefined;
      const onKey = (e) => {
        if (e.key === ' ' || e.key === 'ArrowRight' || e.key === 'PageDown') {
          e.preventDefault(); advance();
        } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
          e.preventDefault(); back();
        } else if (e.key.toLowerCase() === 'r') {
          e.preventDefault(); restart();
        } else if (e.key.toLowerCase() === 'f') {
          e.preventDefault();
          if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => {});
          else document.exitFullscreen().catch(() => {});
        } else if (/^[0-9]$/.test(e.key)) {
          const n = parseInt(e.key, 10);
          if (n < SLIDE_COUNT) go(n);
        }
      };
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }, [advance, back, restart, go, exportMode]);

    // Mouse-idle controls hint.
    React.useEffect(() => {
      if (exportMode) return undefined;
      const onMove = () => {
        setControlsVisible(true);
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        idleTimerRef.current = setTimeout(() => setControlsVisible(false), 2000);
      };
      window.addEventListener('mousemove', onMove);
      return () => {
        window.removeEventListener('mousemove', onMove);
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      };
    }, [exportMode]);

    // Export mode auto-advance.
    React.useEffect(() => {
      if (!exportMode) return undefined;
      if (slideIndex >= SLIDE_COUNT - 1) return undefined;
      const dwell = DWELL[slideIndex] || 5000;
      autoAdvanceRef.current = setTimeout(() => go(slideIndex + 1), dwell);
      return () => { if (autoAdvanceRef.current) clearTimeout(autoAdvanceRef.current); };
    }, [slideIndex, exportMode, go]);

    const slides = [];
    for (let i = 0; i < SLIDE_COUNT; i += 1) {
      const Component = window.PitchSlides && window.PitchSlides[i];
      const isActive = slideIndex === i;
      const tone = SLIDE_TONE[i] || 'dark';
      slides.push(
        <div
          key={i}
          className={`deck-slide deck-slide-${i} tone-${tone}`}
          data-slide={i}
          data-active={isActive}
          style={{
            position: 'absolute', inset: 0,
            width: 1920, height: 1080,
            background: tone === 'dark' ? 'var(--film-black)' : 'var(--paper)',
            opacity: isActive ? 1 : 0,
            pointerEvents: isActive ? 'auto' : 'none',
            transition: 'opacity 800ms ease',
            overflow: 'hidden',
          }}
        >
          <div
            key={epochs[i] || 0}
            className="deck-slide-inner"
            style={{ position: 'absolute', inset: 0, width: 1920, height: 1080 }}
          >
            {Component
              ? <Component isActive={isActive} epoch={epochs[i] || 0} slideIndex={i} />
              : <PlaceholderSlide index={i} tone={tone} />}
          </div>
          {/* Chrome — SessionTimestamp + Pagination. Clock starts on the
              title slide (index 0). */}
          <SessionTimestamp tone={tone} />
          <Pagination index={i} total={SLIDE_COUNT} tone={tone} />
        </div>
      );
    }

    return (
      <SessionClockProvider slideIndex={slideIndex}>
        <ScaleStage>
          {slides}
        </ScaleStage>
        <ControlsHint visible={controlsVisible} slideIndex={slideIndex} total={SLIDE_COUNT} />
      </SessionClockProvider>
    );
  }

  // Tone map — 11 slides, 0-indexed.
  // 0 title · 1 problem · 2 gap · 3 what (warm) · 4 insight · 5 market ·
  // 6 patient (warm) · 7 clinician (warm) · 8 outcome (warm) · 9 ceiling ·
  // 10 ask.
  const SLIDE_TONE = ['dark', 'dark', 'dark', 'warm', 'dark', 'dark', 'warm', 'warm', 'warm', 'dark', 'dark'];

  function PlaceholderSlide({ index, tone }) {
    const color = tone === 'dark' ? 'var(--film-mute, #7A746B)' : 'var(--mute, #6B6B6B)';
    return (
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color,
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 18, letterSpacing: '0.25em', textTransform: 'uppercase',
      }}>
        Slide {String(index).padStart(2, '0')} — placeholder
      </div>
    );
  }

  Object.assign(window, { PitchDeck });
})();
