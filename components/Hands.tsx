'use client';

import React, { useState, useEffect } from 'react';

// finger: 0=pinky, 1=ring, 2=middle, 3=index, 4=thumb
type FingerInfo = { hand: 'left' | 'right' | 'both'; finger: 0 | 1 | 2 | 3 | 4 };

function getFingerForKey(key: string, location: number): FingerInfo | null {
  const k = key.toLowerCase();

  if (key === ' ') return { hand: 'both', finger: 4 };
  if (key === 'Shift')   return { hand: location === 2 ? 'right' : 'left', finger: 0 };
  if (key === 'Control') return { hand: location === 2 ? 'right' : 'left', finger: 0 };
  if (key === 'Alt')     return { hand: location === 2 ? 'right' : 'left', finger: 4 };
  if (key === 'Meta')    return { hand: location === 2 ? 'right' : 'left', finger: 3 };

  if (['`','~','1','!','q','a','z','tab','capslock'].includes(k)) return { hand: 'left', finger: 0 };
  if (['2','@','w','s','x'].includes(k))                          return { hand: 'left', finger: 1 };
  if (['3','#','e','d','c'].includes(k))                          return { hand: 'left', finger: 2 };
  if (['4','$','5','%','r','t','f','g','v','b'].includes(k))      return { hand: 'left', finger: 3 };

  if (['6','^','7','&','y','u','h','j','n','m'].includes(k))      return { hand: 'right', finger: 3 };
  if (['8','*','i','k',',','<'].includes(k))                      return { hand: 'right', finger: 2 };
  if (['9','(','o','l','.', '>'].includes(k))                     return { hand: 'right', finger: 1 };
  if (['0',')','p','-','_','=','+','[','{',']','}','\\','|',';',':',`'`,'"','/','?','backspace','enter'].includes(k)) return { hand: 'right', finger: 0 };
  if (['arrowup','arrowdown','arrowleft','arrowright'].includes(k)) return { hand: 'right', finger: 0 };

  return null;
}

const SKIN   = '#D4A574';
const SHADOW = '#B8845A';
const ACTIVE = '#39ff14';

// finger order for left hand (left→right on SVG): pinky(0), ring(1), middle(2), index(3)
const LEFT_FINGERS  = [
  { fi: 0, x: 4,  h: 44 },
  { fi: 1, x: 22, h: 56 },
  { fi: 2, x: 40, h: 62 },
  { fi: 3, x: 58, h: 54 },
];
// right hand (left→right on SVG): index(3), middle(2), ring(1), pinky(0)
const RIGHT_FINGERS = [
  { fi: 3, x: 4,  h: 54 },
  { fi: 2, x: 22, h: 62 },
  { fi: 1, x: 40, h: 56 },
  { fi: 0, x: 58, h: 44 },
];

const PALM_Y = 84;
const W = 16;

function HandSVG({ side, activeFinger }: { side: 'left' | 'right'; activeFinger: number | null }) {
  const fingers = side === 'left' ? LEFT_FINGERS : RIGHT_FINGERS;
  const fa = (i: number) => activeFinger === i;

  // thumb pivot (base where thumb meets palm)
  const thumbX  = side === 'left' ? 78 : 2;
  const thumbCX = side === 'left' ? 92 : 8;
  const thumbAngle = side === 'left' ? -30 : 30;

  return (
    <svg viewBox="0 0 94 130" width={80} height={110} style={{ overflow: 'visible' }}>
      {/* Finger shafts */}
      {fingers.map(f => {
        const active = fa(f.fi);
        const topY = active ? PALM_Y - f.h - 6 : PALM_Y - f.h;
        const height = PALM_Y - topY + 6;
        return (
          <g key={f.fi} style={{ transition: 'all 0.07s ease' }}>
            {/* Shadow */}
            <rect x={f.x + 1} y={topY + 2} width={W} height={height} rx={8} fill={SHADOW} opacity={0.35} />
            {/* Finger */}
            <rect x={f.x} y={topY} width={W} height={height} rx={8}
              fill={active ? ACTIVE : SKIN}
              style={{ filter: active ? 'drop-shadow(0 0 4px #39ff14)' : 'none' }}
            />
            {/* Nail */}
            <rect x={f.x + 3} y={topY + 2} width={W - 6} height={9} rx={4}
              fill={active ? '#fff' : '#C08858'} opacity={0.55}
            />
          </g>
        );
      })}

      {/* Thumb */}
      <g transform={`rotate(${thumbAngle}, ${thumbCX}, 108)`}>
        <rect x={thumbX} y={fa(4) ? 68 : 72} width={13} height={36} rx={6}
          fill={fa(4) ? ACTIVE : SKIN}
          style={{ transition: 'all 0.07s ease', filter: fa(4) ? 'drop-shadow(0 0 4px #39ff14)' : 'none' }}
        />
        <rect x={thumbX + 2} y={fa(4) ? 70 : 74} width={9} height={8} rx={4}
          fill={fa(4) ? '#fff' : '#C08858'} opacity={0.5}
        />
      </g>

      {/* Palm shadow */}
      <rect x={3} y={PALM_Y + 3} width={88} height={42} rx={12} fill={SHADOW} opacity={0.4} />
      {/* Palm body */}
      <rect x={1} y={PALM_Y} width={88} height={42} rx={12} fill={SKIN} />
      {/* Palm highlight */}
      <rect x={1} y={PALM_Y} width={88} height={14} rx={12} fill="rgba(255,255,255,0.12)" />

      {/* Knuckle lines */}
      {fingers.map(f => (
        <line key={`k${f.fi}`}
          x1={f.x + 3} y1={PALM_Y + 5}
          x2={f.x + W - 3} y2={PALM_Y + 5}
          stroke={SHADOW} strokeWidth={1.2} strokeLinecap="round" opacity={0.5}
        />
      ))}
    </svg>
  );
}

export default function Hands() {
  const [info, setInfo] = useState<FingerInfo | null>(null);

  useEffect(() => {
    const onDown = (e: KeyboardEvent) => setInfo(getFingerForKey(e.key, e.location));
    const onUp   = () => setInfo(null);
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup',   onUp);
    window.addEventListener('blur',    onUp);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup',   onUp);
      window.removeEventListener('blur',    onUp);
    };
  }, []);

  const leftFinger  = info?.hand === 'left'  || info?.hand === 'both' ? info.finger : null;
  const rightFinger = info?.hand === 'right' || info?.hand === 'both' ? info.finger : null;

  const FINGER_NAMES = ['Pinky', 'Ring', 'Middle', 'Index', 'Thumb'];

  return (
    <div className="flex items-start justify-between" style={{ width: 'min(664px, 88vw)', paddingTop: '2px' }}>
      {/* Left hand */}
      <div className="flex flex-col items-center gap-0.5">
        <span style={{ fontSize: 8, color: '#555', letterSpacing: '0.2em', fontFamily: 'monospace' }}>LEFT</span>
        <HandSVG side="left" activeFinger={leftFinger} />
      </div>

      {/* Center indicator */}
      <div className="flex flex-col items-center justify-center pt-6 px-2" style={{ minWidth: 80 }}>
        <div style={{
          padding: '4px 8px', borderRadius: 4, border: '1px solid #2a2a2a',
          fontFamily: 'monospace', fontSize: 8, textAlign: 'center',
          color: info ? '#39ff14' : '#444', minWidth: 72,
          background: '#0c0c0c',
        }}>
          {info ? (
            <>
              <div style={{ color: '#888', marginBottom: 2 }}>{info.hand === 'both' ? 'BOTH' : info.hand.toUpperCase()}</div>
              <div style={{ color: '#39ff14', fontWeight: 'bold' }}>{FINGER_NAMES[info.finger]}</div>
            </>
          ) : (
            <span style={{ color: '#333' }}>─────</span>
          )}
        </div>
      </div>

      {/* Right hand */}
      <div className="flex flex-col items-center gap-0.5">
        <span style={{ fontSize: 8, color: '#555', letterSpacing: '0.2em', fontFamily: 'monospace' }}>RIGHT</span>
        <HandSVG side="right" activeFinger={rightFinger} />
      </div>
    </div>
  );
}
