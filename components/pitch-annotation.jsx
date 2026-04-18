// Typography annotations composed onto a slide, with an optional thin SVG
// connector line linking the annotation text back to an anchored DOM element
// inside an embedded prototype frame. Used on slides 7 and 8 to stop the
// embedded-prototype sequences from feeling like screen recordings — the
// editorial typography sits ON the slide, not IN the product.
//
// Annotation visibility is driven by the timeline engine via setAnnotations.

(function () {
  function SlideAnnotation(props) {
    const {
      shown = false,
      style = {},
      text,
      typographyStyle = {},
      anchor,            // CSS selector, resolved against document on show
      connector = false, // draw a 1px SVG line from annotation to anchor
      connectorOrigin,   // 'left' | 'right' | 'top' | 'bottom' on the annotation
      connectorColor = 'rgba(13, 13, 13, 0.4)',
      slideSelector = '.deck-slide-inner',
    } = props;

    const [anchorRect, setAnchorRect] = React.useState(null);
    const [selfRect, setSelfRect] = React.useState(null);
    const rootRef = React.useRef(null);

    React.useEffect(() => {
      if (!shown || !anchor || !connector) {
        setAnchorRect(null);
        return undefined;
      }
      let cancelled = false;
      const measure = () => {
        if (cancelled) return;
        const annotationEl = rootRef.current;
        const slideEl = annotationEl && annotationEl.closest(slideSelector);
        const anchorEl = typeof anchor === 'string' ? document.querySelector(anchor) : null;
        if (!annotationEl || !slideEl || !anchorEl) {
          requestAnimationFrame(measure);
          return;
        }
        const sb = slideEl.getBoundingClientRect();
        const ab = anchorEl.getBoundingClientRect();
        const nb = annotationEl.getBoundingClientRect();
        // Convert to unscaled slide coords: divide by the scale of the slide.
        const scale = sb.width / slideEl.offsetWidth || 1;
        setAnchorRect({
          left: (ab.left - sb.left) / scale,
          top: (ab.top - sb.top) / scale,
          width: ab.width / scale,
          height: ab.height / scale,
        });
        setSelfRect({
          left: (nb.left - sb.left) / scale,
          top: (nb.top - sb.top) / scale,
          width: nb.width / scale,
          height: nb.height / scale,
        });
      };
      requestAnimationFrame(measure);
      return () => { cancelled = true; };
    }, [shown, anchor, connector, slideSelector]);

    if (!shown) return null;

    let lineEl = null;
    if (connector && anchorRect && selfRect) {
      const annCenter = {
        x: selfRect.left + selfRect.width / 2,
        y: selfRect.top + selfRect.height / 2,
      };
      const anchorCenter = {
        x: anchorRect.left + anchorRect.width / 2,
        y: anchorRect.top + anchorRect.height / 2,
      };
      // Origin point on the annotation bounding box, facing the anchor.
      let origin = connectorOrigin;
      if (!origin) {
        const dx = anchorCenter.x - annCenter.x;
        const dy = anchorCenter.y - annCenter.y;
        origin = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'bottom' : 'top');
      }
      const startPoints = {
        left:   { x: selfRect.left, y: selfRect.top + selfRect.height / 2 },
        right:  { x: selfRect.left + selfRect.width, y: selfRect.top + selfRect.height / 2 },
        top:    { x: selfRect.left + selfRect.width / 2, y: selfRect.top },
        bottom: { x: selfRect.left + selfRect.width / 2, y: selfRect.top + selfRect.height },
      };
      const start = startPoints[origin];
      // End point on edge of anchor rect nearest to annotation.
      const end = {
        x: Math.max(anchorRect.left, Math.min(anchorCenter.x, anchorRect.left + anchorRect.width)),
        y: Math.max(anchorRect.top, Math.min(anchorCenter.y, anchorRect.top + anchorRect.height)),
      };
      if (start.x <= anchorRect.left) end.x = anchorRect.left;
      else if (start.x >= anchorRect.left + anchorRect.width) end.x = anchorRect.left + anchorRect.width;
      if (start.y <= anchorRect.top) end.y = anchorRect.top;
      else if (start.y >= anchorRect.top + anchorRect.height) end.y = anchorRect.top + anchorRect.height;

      const minX = Math.min(start.x, end.x) - 4;
      const minY = Math.min(start.y, end.y) - 4;
      const width = Math.abs(end.x - start.x) + 8;
      const height = Math.abs(end.y - start.y) + 8;
      const sx = start.x - minX;
      const sy = start.y - minY;
      const ex = end.x - minX;
      const ey = end.y - minY;
      lineEl = (
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          style={{
            position: 'absolute',
            left: minX,
            top: minY,
            pointerEvents: 'none',
            zIndex: 199,
            overflow: 'visible',
            animation: 'fadeIn 400ms ease both',
          }}
        >
          <line
            x1={sx} y1={sy} x2={ex} y2={ey}
            stroke={connectorColor}
            strokeWidth={1}
            strokeLinecap="round"
          />
          <circle cx={ex} cy={ey} r={2.4} fill={connectorColor} />
        </svg>
      );
    }

    return (
      <>
        {lineEl}
        <div
          ref={rootRef}
          style={{
            position: 'absolute',
            pointerEvents: 'none',
            zIndex: 200,
            animation: 'fadeIn 400ms ease both',
            ...style,
          }}
        >
          <div style={typographyStyle}>{text}</div>
        </div>
      </>
    );
  }

  Object.assign(window, { SlideAnnotation });
})();
