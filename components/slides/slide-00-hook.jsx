// Slide 00 — THE HOOK · DARK · placeholder
(function () {
  if (!window.PitchSlides) window.PitchSlides = {};
  window.PitchSlides[0] = function SlideHook() {
    return React.createElement('div', {
      style: {
        width: '100%', height: '100%',
        background: 'var(--film-black)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--film-ink)', fontFamily: 'Inter, sans-serif', fontSize: '24px',
      },
    }, 'SLIDE 00 — THE HOOK');
  };
})();
