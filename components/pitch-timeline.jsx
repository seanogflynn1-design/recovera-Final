// Deterministic slide-relative timeline engine for the pitch deck.
//
// Every slide owns a sequence of actions keyed to milliseconds since the slide
// became active. A single requestAnimationFrame loop fires each action whose
// `at` has been crossed by the slide-relative clock. When the slide deactivates
// the loop cancels, all registered refs reset, and any DOM side effects are
// wiped — so returning to the slide replays frame-for-frame identically.
//
// Exposes:
//   useSlideTimeline({ timeline, isActive, refs, setAnnotations })
//
//   refs            — { 'patient-app': refObject, 'clinician-dash': refObject }
//                     Keys referenced by action.target when the target is a
//                     registered component (not a CSS selector).
//   setAnnotations  — React setter for an {id -> boolean} map consumed by
//                     <SlideAnnotation> overlays.
//
// Action shapes:
//   { at, action: 'reset',           target: 'patient-app' | 'clinician-dash' | <selector> }
//   { at, action: 'tap'|'click',     target: <selector> }
//   { at, action: 'advance',         target: 'patient-app' | 'clinician-dash', state: {...} }
//   { at, action: 'scroll',          target: <selector>, to: <inner selector>, duration }
//   { at, action: 'highlight',       target: <selector>, effect: 'pulse'|'outline'|'tick',
//                                    from?, to?, duration? }
//   { at, action: 'hover',           target: <selector>, duration }
//   { at, action: 'showAnnotation',  id }
//   { at, action: 'hideAnnotation',  id }
//   { at, action: 'swapAnnotation',  from, to }
//   { at, action: 'resetHighlight',  target?: '*' | <selector> }
//
// Determinism contract: no setTimeout, no Date.now(). All time is
// `performance.now()` minus the slide-start mark. Randomness uses a mulberry32
// PRNG seeded per slide on mount, so two plays of the same slide produce
// bit-identical frames.

(function () {
  const HIGHLIGHT_CLASSES = ['tl-pulse', 'tl-outline', 'tl-tick', 'tl-hover'];

  function clearHighlights(root) {
    const scope = root || document;
    HIGHLIGHT_CLASSES.forEach((cls) => {
      scope.querySelectorAll('.' + cls).forEach((el) => el.classList.remove(cls));
    });
  }

  function animateNumber(el, from, to, duration) {
    if (!el) return;
    const start = performance.now();
    const step = (now) => {
      const raw = Math.min(1, (now - start) / duration);
      const eased = 0.5 - Math.cos(raw * Math.PI) / 2;
      const value = Math.round(from + (to - from) * eased);
      el.textContent = String(value);
      if (raw < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  function runAction(a, ctx) {
    const { refs, setAnnotations } = ctx;
    switch (a.action) {
      case 'reset': {
        if (refs && refs[a.target] && refs[a.target].current && refs[a.target].current.reset) {
          refs[a.target].current.reset();
        } else if (typeof a.target === 'string' && a.target.startsWith('.')) {
          document.querySelectorAll(a.target).forEach((el) => {
            HIGHLIGHT_CLASSES.forEach((cls) => el.classList.remove(cls));
          });
        }
        break;
      }
      case 'tap':
      case 'click': {
        const el = document.querySelector(a.target);
        if (el && typeof el.click === 'function') el.click();
        break;
      }
      case 'advance': {
        const r = refs && refs[a.target] && refs[a.target].current;
        if (r && typeof r.advance === 'function') r.advance(a.state || {});
        break;
      }
      case 'scroll': {
        const containerRef = refs && refs[a.target && a.target.replace(/^\./, '')];
        if (containerRef && containerRef.current && containerRef.current.scrollTo) {
          containerRef.current.scrollTo(a.to, a.duration || 800);
          break;
        }
        const container = document.querySelector(a.target);
        const inner = container && container.querySelector(a.to);
        if (!container || !inner) break;
        const top = inner.offsetTop - 20;
        const startTop = container.scrollTop;
        const t0 = performance.now();
        const dur = a.duration || 800;
        const step = (now) => {
          const raw = Math.min(1, (now - t0) / dur);
          const eased = 0.5 - Math.cos(raw * Math.PI) / 2;
          container.scrollTop = startTop + (top - startTop) * eased;
          if (raw < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        break;
      }
      case 'highlight': {
        const el = document.querySelector(a.target);
        if (!el) break;
        const cls = 'tl-' + (a.effect || 'pulse');
        el.classList.add(cls);
        if (a.effect === 'tick' && typeof a.from === 'number' && typeof a.to === 'number') {
          animateNumber(el, a.from, a.to, a.duration || 1200);
        }
        break;
      }
      case 'hover': {
        const el = document.querySelector(a.target);
        if (!el) break;
        el.classList.add('tl-hover');
        const dur = a.duration || 600;
        const t0 = performance.now();
        const tick = (now) => {
          if (now - t0 >= dur) { el.classList.remove('tl-hover'); return; }
          requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        break;
      }
      case 'showAnnotation': {
        if (setAnnotations) setAnnotations((prev) => ({ ...prev, [a.id]: true }));
        break;
      }
      case 'hideAnnotation': {
        if (setAnnotations) setAnnotations((prev) => ({ ...prev, [a.id]: false }));
        break;
      }
      case 'swapAnnotation': {
        if (setAnnotations) setAnnotations((prev) => {
          const next = { ...prev };
          if (a.from) next[a.from] = false;
          if (a.to) next[a.to] = true;
          return next;
        });
        break;
      }
      case 'resetHighlight': {
        if (!a.target || a.target === '*') clearHighlights();
        else {
          document.querySelectorAll(a.target).forEach((el) => {
            HIGHLIGHT_CLASSES.forEach((cls) => el.classList.remove(cls));
          });
        }
        break;
      }
      default:
        break;
    }
  }

  function useSlideTimeline({ timeline, isActive, refs, setAnnotations }) {
    React.useEffect(() => {
      if (!isActive || !Array.isArray(timeline) || timeline.length === 0) return undefined;

      const sorted = timeline.slice().sort((a, b) => a.at - b.at);
      const t0 = performance.now();
      let i = 0;
      let rafId = 0;
      let cancelled = false;

      // Reset refs on entry so every replay begins from the same state.
      if (refs) {
        Object.keys(refs).forEach((key) => {
          const r = refs[key];
          if (r && r.current && typeof r.current.reset === 'function') r.current.reset();
        });
      }
      if (setAnnotations) setAnnotations({});
      clearHighlights();

      const ctx = { refs, setAnnotations };

      const tick = (now) => {
        if (cancelled) return;
        const elapsed = now - t0;
        while (i < sorted.length && sorted[i].at <= elapsed) {
          runAction(sorted[i], ctx);
          i += 1;
        }
        if (i < sorted.length) rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);

      return () => {
        cancelled = true;
        if (rafId) cancelAnimationFrame(rafId);
        clearHighlights();
        if (setAnnotations) setAnnotations({});
        if (refs) {
          Object.keys(refs).forEach((key) => {
            const r = refs[key];
            if (r && r.current && typeof r.current.reset === 'function') r.current.reset();
          });
        }
      };
    }, [isActive, timeline]);
  }

  // Mulberry32 PRNG — seeded, deterministic.
  function seededPRNG(seed) {
    let s = seed >>> 0;
    return function () {
      s = (s + 0x6d2b79f5) >>> 0;
      let t = s;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  Object.assign(window, { useSlideTimeline, seededPRNG });
})();
