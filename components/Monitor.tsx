'use client';

import React, { useState, useEffect } from 'react';
import Terminal from './Terminal';
import Keyboard from './Keyboard';

const SCREEN_W = 'min(860px, 92vw)';
const SCREEN_H = 'min(500px, 54vh)';

export default function Monitor({ onRestart }: { onRestart?: () => void }) {
  const [poweredOn, setPoweredOn] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setPoweredOn(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col items-center" style={{ userSelect: 'none' }}>

      {/* ══ MONITOR BEZEL (dark) ══════════════════════════════════════════ */}
      <div
        className="relative rounded-2xl p-3"
        style={{
          background: 'linear-gradient(160deg, #2a2a2a 0%, #1a1a1a 50%, #111 100%)',
          boxShadow:
            'inset 0 2px 4px rgba(255,255,255,0.08), 0 0 0 1px #333, ' +
            '0 8px 40px rgba(0,0,0,0.9), 0 20px 60px rgba(0,0,0,0.5)',
          filter: 'drop-shadow(0 30px 80px rgba(0,0,0,0.9))',
        }}
      >
        {/* Screen area */}
        <div
          style={{
            width: SCREEN_W,
            height: SCREEN_H,
            borderRadius: 6,
            background: '#050505',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8), 0 0 0 1px #000',
          }}
        >
          {/* Scanline overlay */}
          <div
            className="pointer-events-none absolute inset-0 z-10"
            style={{
              background:
                'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px)',
            }}
          />
          {/* Moving scanline */}
          <div
            className="animate-scanline pointer-events-none absolute left-0 right-0 z-10"
            style={{
              height: 8,
              background: 'linear-gradient(to bottom, transparent, rgba(57,255,20,0.04), transparent)',
            }}
          />
          {/* Screen content */}
          <div
            className={poweredOn ? 'animate-power-on animate-crt-flicker' : ''}
            style={{
              width: '100%', height: '100%',
              opacity: poweredOn ? 1 : 0,
              filter: poweredOn ? 'brightness(1) contrast(1.05)' : 'brightness(0)',
              transition: 'filter 0.5s ease',
            }}
          >
            {poweredOn && <Terminal onRestart={onRestart} />}
          </div>
          {/* Screen glare */}
          <div
            className="pointer-events-none absolute top-0 left-0 right-0 z-20"
            style={{
              height: '40%',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0.02), transparent)',
              borderRadius: '6px 6px 0 0',
            }}
          />
        </div>

        {/* Bezel bottom strip — brand + LED */}
        <div className="flex items-center justify-between px-4 pt-2">
          <span style={{ fontSize: 10, letterSpacing: '0.3em', fontWeight: 300, color: '#555' }}>
            AYUSH.DEV
          </span>
          <div
            style={{
              width: 8, height: 8, borderRadius: '50%',
              background: poweredOn ? '#39ff14' : '#333',
              boxShadow: poweredOn ? '0 0 6px #39ff14, 0 0 12px #39ff14' : 'none',
              transition: 'all 0.5s ease',
            }}
          />
        </div>
      </div>

      {/* ══ NECK ═════════════════════════════════════════════════════════════ */}
      <div
        style={{
          width: 80, height: 28,
          background: 'linear-gradient(to bottom, #1a1a1a, #222)',
          clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)',
        }}
      />

      {/* ══ BASE ═════════════════════════════════════════════════════════════ */}
      <div
        style={{
          width: 200, height: 16, borderRadius: 8,
          background: 'linear-gradient(to bottom, #222, #1a1a1a)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.6)',
        }}
      />

      {/* ══ KEYBOARD ═════════════════════════════════════════════════════════ */}
      <div style={{ marginTop: 6 }}>
        <Keyboard />
      </div>
    </div>
  );
}
