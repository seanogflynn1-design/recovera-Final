// MacBook Pro frame — premium SVG bezel + screen well + keyboard base
// Exports: MacBookFrame

function MacBookFrame({ children, screenWidth = 1280, screenHeight = 800 }) {
  // Bezel is ~12px; lid thickness ~14 at bottom
  const BEZEL = 14;
  const W = screenWidth + BEZEL * 2;
  const H = screenHeight + BEZEL * 2 + 20; // extra for bottom chin with camera/speakers? No, MBP has uniform bezel + notch
  // Keyboard base: wider than screen, trapezoidal
  const baseHang = 90; // how much wider the base is on each side
  const baseH = 26;    // keyboard base thickness
  const hingeH = 10;
  const totalW = W + baseHang * 2;
  const totalH = H + baseH + hingeH;

  return (
    <div style={{
      position: 'relative', width: totalW, height: totalH,
      filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.22)) drop-shadow(0 8px 16px rgba(0,0,0,0.08))',
    }}>
      {/* Lid (screen assembly) */}
      <div style={{
        position: 'absolute', top: 0, left: baseHang, width: W, height: H,
        borderRadius: 18,
        background: 'linear-gradient(180deg, #2a2b2d 0%, #1e1f21 100%)',
        padding: BEZEL, boxSizing: 'border-box',
        boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.12)',
      }}>
        {/* Notch */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: 160, height: 22, borderRadius: '0 0 12px 12px',
          background: '#0a0a0a', zIndex: 2,
          boxShadow: 'inset 0 -1px 2px rgba(0,0,0,0.6)',
        }}>
          <div style={{
            position: 'absolute', top: 7, left: '50%', transform: 'translateX(-50%)',
            width: 7, height: 7, borderRadius: '50%', background: '#1a1a1a',
            boxShadow: 'inset 0 0 2px rgba(255,255,255,0.12)',
          }}>
            <div style={{ width: 3, height: 3, borderRadius: '50%',
              background: '#2a3a4a', margin: '2px auto 0', opacity: 0.7 }}/>
          </div>
        </div>

        {/* Screen */}
        <div style={{
          width: screenWidth, height: screenHeight, borderRadius: 6,
          overflow: 'hidden', background: '#fff', position: 'relative',
          boxShadow: 'inset 0 0 0 0.5px rgba(255,255,255,0.04)',
        }}>
          {children}
        </div>
      </div>

      {/* Hinge shadow seam */}
      <div style={{
        position: 'absolute', top: H, left: baseHang - 2, width: W + 4, height: hingeH,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.08) 100%)',
      }}/>

      {/* Keyboard base — trapezoid shape */}
      <svg
        width={totalW} height={baseH + 4}
        style={{ position: 'absolute', top: H + hingeH, left: 0, display: 'block' }}
        viewBox={`0 0 ${totalW} ${baseH + 4}`}
      >
        <defs>
          <linearGradient id="baseGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c9cacc"/>
            <stop offset="25%" stopColor="#aeb0b3"/>
            <stop offset="60%" stopColor="#8b8d90"/>
            <stop offset="100%" stopColor="#6e7074"/>
          </linearGradient>
          <linearGradient id="baseShadow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(0,0,0,0.3)"/>
            <stop offset="100%" stopColor="rgba(0,0,0,0)"/>
          </linearGradient>
        </defs>
        {/* Top edge highlight under hinge */}
        <rect x="0" y="0" width={totalW} height="1" fill="rgba(255,255,255,0.6)"/>
        {/* Trapezoid */}
        <path
          d={`M 0 1 L ${totalW} 1 L ${totalW - 18} ${baseH} L 18 ${baseH} Z`}
          fill="url(#baseGrad)"
        />
        {/* Trackpad notch (thin dark strip) */}
        <rect x={totalW / 2 - 44} y={baseH - 2} width="88" height="2" rx="1" fill="rgba(0,0,0,0.2)"/>
      </svg>

      {/* Bottom shadow reflection */}
      <div style={{
        position: 'absolute', bottom: -14, left: baseHang + 40,
        right: baseHang + 40, height: 14,
        background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0) 70%)',
        filter: 'blur(4px)',
      }}/>
    </div>
  );
}

// Premium iPhone 15 Pro frame (Dynamic Island, titanium bezel)
function IPhone15Pro({ children, screenWidth = 390, screenHeight = 844 }) {
  const BEZEL = 11;
  const W = screenWidth + BEZEL * 2;
  const H = screenHeight + BEZEL * 2;
  return (
    <div style={{
      position: 'relative', width: W, height: H,
      borderRadius: 55, padding: BEZEL, boxSizing: 'border-box',
      // Titanium bezel gradient
      background: 'linear-gradient(145deg, #4a4a4d 0%, #2c2c2e 35%, #1a1a1c 60%, #323234 85%, #545456 100%)',
      boxShadow: [
        // outer rim highlight
        '0 0 0 1px rgba(255,255,255,0.08)',
        // inner chamfer dark
        'inset 0 0 0 1px rgba(0,0,0,0.6)',
        // outer specular
        'inset 1px 2px 3px rgba(255,255,255,0.12)',
        'inset -1px -2px 3px rgba(0,0,0,0.45)',
        // ground shadow
        '0 30px 60px rgba(0,0,0,0.28)',
        '0 10px 20px rgba(0,0,0,0.12)',
      ].join(', '),
    }}>
      {/* Inner bezel line */}
      <div style={{
        position: 'absolute', inset: BEZEL - 2, borderRadius: 48,
        boxShadow: 'inset 0 0 0 1.5px #050506',
        pointerEvents: 'none', zIndex: 3,
      }}/>
      {/* Side buttons (subtle nubs) */}
      <div style={{ position: 'absolute', left: -1.5, top: 110, width: 3, height: 30, borderRadius: 1, background: 'linear-gradient(90deg, #2a2a2c, #4a4a4d)' }}/>
      <div style={{ position: 'absolute', left: -1.5, top: 170, width: 3, height: 54, borderRadius: 1, background: 'linear-gradient(90deg, #2a2a2c, #4a4a4d)' }}/>
      <div style={{ position: 'absolute', left: -1.5, top: 238, width: 3, height: 54, borderRadius: 1, background: 'linear-gradient(90deg, #2a2a2c, #4a4a4d)' }}/>
      <div style={{ position: 'absolute', right: -1.5, top: 190, width: 3, height: 84, borderRadius: 1, background: 'linear-gradient(270deg, #2a2a2c, #4a4a4d)' }}/>

      {/* Screen */}
      <div style={{
        width: screenWidth, height: screenHeight,
        borderRadius: 44, overflow: 'hidden', position: 'relative',
        background: '#fff',
      }}>
        {/* Dynamic Island */}
        <div style={{
          position: 'absolute', top: 11, left: '50%', transform: 'translateX(-50%)',
          width: 122, height: 36, borderRadius: 20, background: '#050506',
          zIndex: 50, boxShadow: 'inset 0 0 2px rgba(255,255,255,0.04)',
        }}>
          <div style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
            width: 8, height: 8, borderRadius: 4, background: '#1a1a1c' }}>
            <div style={{ width: 3, height: 3, borderRadius: 1.5, background: '#2a3a4a', margin: '2.5px auto', opacity: 0.6 }}/>
          </div>
        </div>
        {/* Status bar time/icons */}
        <div style={{
          position: 'absolute', top: 14, left: 0, right: 0, height: 32, zIndex: 40,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 28px', pointerEvents: 'none',
          fontFamily: '-apple-system, "SF Pro", system-ui',
        }}>
          <span style={{ fontSize: 15, fontWeight: 600, color: '#0D0D0D', letterSpacing: -0.2 }}>9:41</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <svg width="16" height="10" viewBox="0 0 17 11"><rect x="0" y="7" width="3" height="4" rx="0.5" fill="#0D0D0D"/><rect x="4.5" y="5" width="3" height="6" rx="0.5" fill="#0D0D0D"/><rect x="9" y="2.5" width="3" height="8.5" rx="0.5" fill="#0D0D0D"/><rect x="13.5" y="0" width="3" height="11" rx="0.5" fill="#0D0D0D"/></svg>
            <svg width="24" height="11" viewBox="0 0 25 12"><rect x="0.5" y="0.5" width="21" height="11" rx="3" stroke="#0D0D0D" strokeOpacity="0.35" fill="none"/><rect x="2" y="2" width="17.5" height="8" rx="1.5" fill="#0D0D0D"/><rect x="22.5" y="4" width="1.5" height="4" rx="0.5" fill="#0D0D0D" opacity="0.4"/></svg>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

Object.assign(window, { MacBookFrame, IPhone15Pro });
