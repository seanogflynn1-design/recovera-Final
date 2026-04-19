// Pitch deck chrome — slide pagination only.
// SlidePagination renders the current slide index at bottom-left.

(function () {
  function pad(n) { return String(n).padStart(2, '0'); }

  function SlidePagination({ index, total, visible = true }) {
    if (!visible) return null;
    return (
      <div style={{
        position: 'fixed',
        bottom: '32px',
        left: '48px',
        fontFamily: "'Inter', sans-serif",
        fontSize: '13px',
        fontWeight: 500,
        letterSpacing: '0.06em',
        color: '#9A9A9A',
        zIndex: 120,
        pointerEvents: 'none',
      }}>
        {pad(index + 1)} / {pad(total)}
      </div>
    );
  }

  Object.assign(window, { SlidePagination });
})();
