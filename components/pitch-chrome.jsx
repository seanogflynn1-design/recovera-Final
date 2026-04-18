// Clinical-chrome signature elements — the ticking SESSION timestamp and
// pagination index that sit on every slide of the pitch deck. These are the
// subconscious "medical instrument" cues described in the build spec.
//
// Exports (attached to window):
//   SessionClockProvider — wraps the deck. Starts a monotonic clock on the
//                          title slide (slideIndex 0) and never resets.
//   SessionTimestamp     — reads the clock from context and renders
//                          `SESSION · HH:MM:SS · DUBLIN` at top-right.
//   Pagination           — `NN / MM` at bottom-left, 1-indexed for display.

(function () {
  const SessionContext = React.createContext({ seconds: 0, started: false });

  function SessionClockProvider({ slideIndex, children }) {
    const [seconds, setSeconds] = React.useState(0);
    const [started, setStarted] = React.useState(false);
    const startMarkRef = React.useRef(null);

    React.useEffect(() => {
      if (startMarkRef.current !== null) return undefined;
      if (typeof slideIndex !== 'number' || slideIndex < 0) return undefined;
      startMarkRef.current = performance.now();
      setStarted(true);
      let rafId = 0;
      let cancelled = false;
      const tick = () => {
        if (cancelled) return;
        const elapsed = performance.now() - startMarkRef.current;
        setSeconds(Math.floor(elapsed / 1000));
        rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);
      return () => { cancelled = true; if (rafId) cancelAnimationFrame(rafId); };
    }, [slideIndex]);

    const value = React.useMemo(() => ({ seconds, started }), [seconds, started]);

    return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
  }

  function pad(n) { return String(n).padStart(2, '0'); }

  function SessionTimestamp({ tone = 'dark', visible = true }) {
    const { seconds, started } = React.useContext(SessionContext);
    if (!visible || !started) return null;
    const hh = pad(Math.floor(seconds / 3600));
    const mm = pad(Math.floor((seconds % 3600) / 60));
    const ss = pad(seconds % 60);
    const color = tone === 'dark' ? 'var(--film-mute, #7A746B)' : 'var(--mute, #6B6B6B)';
    return (
      <div style={{
        position: 'absolute',
        top: 40,
        right: 40,
        fontFamily: "'JetBrains Mono', ui-monospace, Menlo, monospace",
        fontSize: 11,
        fontWeight: 400,
        letterSpacing: '0.2em',
        color,
        zIndex: 120,
        pointerEvents: 'none',
      }}>
        SESSION · {hh}:{mm}:{ss} · DUBLIN
      </div>
    );
  }

  function Pagination({ index, total, tone = 'dark', visible = true }) {
    if (!visible) return null;
    const color = tone === 'dark' ? 'var(--film-mute, #7A746B)' : 'var(--mute, #6B6B6B)';
    return (
      <div style={{
        position: 'absolute',
        bottom: 40,
        left: 40,
        fontFamily: "'JetBrains Mono', ui-monospace, Menlo, monospace",
        fontSize: 12,
        fontWeight: 400,
        letterSpacing: '0.2em',
        color,
        zIndex: 120,
        pointerEvents: 'none',
      }}>
        {pad(index + 1)} / {pad(total)}
      </div>
    );
  }

  Object.assign(window, { SessionClockProvider, SessionContext, SessionTimestamp, Pagination });
})();
