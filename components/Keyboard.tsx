'use client';

import React, { useState, useEffect } from 'react';

type KeyDef = {
  label: string;
  sub?: string;
  values: string[];
  flex?: number;
};

const ROWS: KeyDef[][] = [
  [
    { label: '`',  sub: '~', values: ['`','~'] },
    { label: '1',  sub: '!', values: ['1','!'] },
    { label: '2',  sub: '@', values: ['2','@'] },
    { label: '3',  sub: '#', values: ['3','#'] },
    { label: '4',  sub: '$', values: ['4','$'] },
    { label: '5',  sub: '%', values: ['5','%'] },
    { label: '6',  sub: '^', values: ['6','^'] },
    { label: '7',  sub: '&', values: ['7','&'] },
    { label: '8',  sub: '*', values: ['8','*'] },
    { label: '9',  sub: '(', values: ['9','('] },
    { label: '0',  sub: ')', values: ['0',')'] },
    { label: '-',  sub: '_', values: ['-','_'] },
    { label: '=',  sub: '+', values: ['=','+'] },
    { label: '⌫',          values: ['Backspace'], flex: 2.1 },
  ],
  [
    { label: 'Tab',         values: ['Tab'],       flex: 1.6 },
    { label: 'Q', values: ['q','Q'] }, { label: 'W', values: ['w','W'] },
    { label: 'E', values: ['e','E'] }, { label: 'R', values: ['r','R'] },
    { label: 'T', values: ['t','T'] }, { label: 'Y', values: ['y','Y'] },
    { label: 'U', values: ['u','U'] }, { label: 'I', values: ['i','I'] },
    { label: 'O', values: ['o','O'] }, { label: 'P', values: ['p','P'] },
    { label: '[', sub: '{', values: ['[','{'] },
    { label: ']', sub: '}', values: [']','}'] },
    { label: '\\',sub: '|', values: ['\\','|'], flex: 1.55 },
  ],
  [
    { label: 'Caps',        values: ['CapsLock'],  flex: 1.85 },
    { label: 'A', values: ['a','A'] }, { label: 'S', values: ['s','S'] },
    { label: 'D', values: ['d','D'] }, { label: 'F', values: ['f','F'] },
    { label: 'G', values: ['g','G'] }, { label: 'H', values: ['h','H'] },
    { label: 'J', values: ['j','J'] }, { label: 'K', values: ['k','K'] },
    { label: 'L', values: ['l','L'] },
    { label: ';', sub: ':', values: [';',':'] },
    { label: "'", sub: '"', values: ["'",'"'] },
    { label: 'Enter',       values: ['Enter'],     flex: 2.3 },
  ],
  [
    { label: '⇧',           values: ['Shift'],     flex: 2.5 },
    { label: 'Z', values: ['z','Z'] }, { label: 'X', values: ['x','X'] },
    { label: 'C', values: ['c','C'] }, { label: 'V', values: ['v','V'] },
    { label: 'B', values: ['b','B'] }, { label: 'N', values: ['n','N'] },
    { label: 'M', values: ['m','M'] },
    { label: ',', sub: '<', values: [',','<'] },
    { label: '.', sub: '>', values: ['.', '>'] },
    { label: '/', sub: '?', values: ['/','?'] },
    { label: '⇧',           values: ['Shift'],     flex: 3.15 },
  ],
  [
    { label: 'Ctrl',        values: ['Control'],   flex: 1.3 },
    { label: '❖',           values: ['Meta'],      flex: 1.1 },
    { label: 'Alt',         values: ['Alt'],       flex: 1.1 },
    { label: '',            values: [' '],         flex: 6.6 },
    { label: 'Alt',         values: ['Alt'],       flex: 1.1 },
    { label: '❖',           values: ['Meta'],      flex: 1.1 },
    { label: 'Ctrl',        values: ['Control'],   flex: 1.3 },
  ],
];

const ARROW_ROWS: KeyDef[][] = [
  [ { label: '',  values: [], flex: 1 }, { label: '↑', values: ['ArrowUp'],    flex: 1 }, { label: '', values: [], flex: 1 } ],
  [ { label: '←', values: ['ArrowLeft'] }, { label: '↓', values: ['ArrowDown'] }, { label: '→', values: ['ArrowRight'] } ],
];

function isActive(k: KeyDef, active: string | null) {
  if (!active || k.values.length === 0) return false;
  return k.values.some(v => v === active || v.toLowerCase() === active.toLowerCase());
}

function KeyCap({ keyDef, active, small }: { keyDef: KeyDef; active: boolean; small?: boolean }) {
  const isEmpty = keyDef.values.length === 0;
  const isSpace = keyDef.values.includes(' ');

  return (
    <div
      style={{
        flex: keyDef.flex ?? 1,
        height: small ? 30 : 32,
        borderRadius: 4,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: 2,
        fontSize: 8,
        fontFamily: 'monospace',
        position: 'relative',
        cursor: 'default',
        userSelect: 'none',
        opacity: isEmpty ? 0 : 1,
        pointerEvents: isEmpty ? 'none' : 'auto',
        transition: 'all 0.07s ease',
        background: active ? '#39ff14' : '#252525',
        color: active ? '#000' : '#9ca3af',
        boxShadow: active
          ? '0 1px 0 rgba(0,100,0,0.8), 0 0 8px rgba(57,255,20,0.6)'
          : '0 3px 0 #111, 0 4px 0 rgba(0,0,0,0.5)',
        transform: active ? 'translateY(2px)' : 'translateY(0)',
        fontWeight: active ? 700 : 400,
      }}
    >
      {keyDef.sub && !active && (
        <span style={{ position: 'absolute', top: 2, right: 3, fontSize: 6, color: '#4b5563', opacity: 0.9 }}>
          {keyDef.sub}
        </span>
      )}
      <span>{isSpace ? '' : keyDef.label}</span>
      {active && (
        <div style={{ position: 'absolute', inset: 0, borderRadius: 4, background: 'rgba(57,255,20,0.15)' }} />
      )}
    </div>
  );
}

export default function Keyboard() {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  useEffect(() => {
    const onDown = (e: KeyboardEvent) => setActiveKey(e.key);
    const onUp   = () => setActiveKey(null);
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup',   onUp);
    window.addEventListener('blur',    onUp);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup',   onUp);
      window.removeEventListener('blur',    onUp);
    };
  }, []);

  return (
    <div style={{
      width: 'min(860px, 92vw)',
      borderRadius: 10,
      padding: '8px 8px 10px',
      background: 'linear-gradient(160deg, #1f1f1f 0%, #161616 100%)',
      boxShadow:
        '0 8px 32px rgba(0,0,0,0.8), ' +
        'inset 0 1px 0 rgba(255,255,255,0.04), ' +
        'inset 0 -1px 0 rgba(0,0,0,0.5)',
    }}>
      {/* Brand strip */}
      <div style={{ textAlign: 'center', marginBottom: 5 }}>
        <span style={{ fontSize: 7, color: '#374151', letterSpacing: '0.3em', fontFamily: 'monospace' }}>
          AYUSH.DEV KB-101
        </span>
      </div>

      <div style={{ display: 'flex', gap: 6 }}>
        {/* Main rows */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4 }}>
          {ROWS.map((row, i) => (
            <div key={i} style={{ display: 'flex', gap: 4 }}>
              {row.map((key, j) => (
                <KeyCap key={`${i}-${j}`} keyDef={key} active={isActive(key, activeKey)} />
              ))}
            </div>
          ))}
        </div>

        {/* Arrow cluster */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 4 }}>
          {ARROW_ROWS.map((row, i) => (
            <div key={i} style={{ display: 'flex', gap: 4 }}>
              {row.map((key, j) => (
                <KeyCap key={`a${i}-${j}`} keyDef={key} active={isActive(key, activeKey)} small />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Status strip */}
      <div style={{ marginTop: 6, display: 'flex', justifyContent: 'center' }}>
        <div style={{
          padding: '2px 10px', borderRadius: 3,
          border: '1px solid #2a2a2a',
          fontFamily: 'monospace', fontSize: 8, textAlign: 'center',
          background: '#0c0c0c',
          minWidth: 140,
          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)',
        }}>
          {activeKey
            ? <span><span style={{ color: '#39ff14' }}>{activeKey === ' ' ? 'Space' : activeKey}</span><span style={{ color: '#555' }}> pressed</span></span>
            : <span style={{ color: '#333' }}>no key pressed</span>
          }
        </div>
      </div>
    </div>
  );
}
