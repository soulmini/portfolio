'use client';

import React, { useState, useEffect, useCallback } from 'react';

const BOOT_SEQUENCE = [
  { text: '──────────────────────────────────────────────────────────────', delay: 0 },
  { text: '  AyushOS BIOS v2.0  —  Copyright 2024 Ayush Jaiswal          ', delay: 60 },
  { text: '──────────────────────────────────────────────────────────────', delay: 120 },
  { text: '', delay: 180 },
  { text: 'System memory check .............................. 4,194,304 KB OK', delay: 240 },
  { text: '', delay: 300 },
  { text: 'CPU    : Backend Engineering Core × 8 @ 3.6GHz', delay: 360 },
  { text: 'RAM    : 4,000,000+ Records Optimized', delay: 420 },
  { text: 'GPU    : Next.js SSR Pipeline v14', delay: 480 },
  { text: 'NET    : Apache Kafka  |  GCP  |  AWS EC2', delay: 540 },
  { text: '', delay: 600 },
  { text: 'Detecting devices ...', delay: 660 },
  { text: '  [OK]  Node.js v20 runtime ............. found', delay: 780 },
  { text: '  [OK]  Express.js router ............... found', delay: 880 },
  { text: '  [OK]  MongoDB 7.0 ..................... found', delay: 960 },
  { text: '  [OK]  ClickHouse analytics ............ found', delay: 1040 },
  { text: '  [OK]  Redis cache layer ............... found', delay: 1120 },
  { text: '  [OK]  Apache Kafka .................... found', delay: 1200 },
  { text: '  [OK]  Sentry observability ............ found', delay: 1280 },
  { text: '', delay: 1360 },
  { text: 'Loading AyushOS kernel ......', delay: 1420 },
  { text: 'Initializing file systems ...', delay: 1600 },
  { text: 'Starting network services ...', delay: 1750 },
  { text: '', delay: 1880 },
  { text: '  ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  100%', delay: 2100 },
  { text: '', delay: 2200 },
  { text: '  AyushOS v1.0.0 ready.', delay: 2350 },
  { text: '  Logged in as: recruiter@portfolio', delay: 2500 },
  { text: '', delay: 2620 },
  { text: '  Launching portfolio ...', delay: 2750 },
];

interface Props {
  onDone: () => void;
}

export default function BootScreen({ onDone }: Props) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const [exiting, setExiting] = useState(false);

  const finish = useCallback(() => {
    if (done) return;
    setDone(true);
    setExiting(true);
    setTimeout(onDone, 600);
  }, [done, onDone]);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    BOOT_SEQUENCE.forEach(({ text, delay }) => {
      timers.push(
        setTimeout(() => {
          setVisibleLines(prev => [...prev, text]);
        }, delay)
      );
    });

    // Auto-finish after last line + short pause
    const last = BOOT_SEQUENCE[BOOT_SEQUENCE.length - 1].delay;
    timers.push(setTimeout(finish, last + 500));

    return () => timers.forEach(clearTimeout);
  }, [finish]);

  // Skip on any key / click
  useEffect(() => {
    const skip = () => finish();
    window.addEventListener('keydown', skip);
    window.addEventListener('click', skip);
    return () => {
      window.removeEventListener('keydown', skip);
      window.removeEventListener('click', skip);
    };
  }, [finish]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#000',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: '10vh 12vw',
        fontFamily: '"JetBrains Mono", "Fira Code", Consolas, monospace',
        fontSize: 'clamp(10px, 1.4vw, 14px)',
        lineHeight: 1.7,
        color: '#39ff14',
        overflowY: 'auto',
        opacity: exiting ? 0 : 1,
        transition: 'opacity 0.6s ease',
      }}
    >
      {/* CRT scanlines */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1,
        background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)',
      }} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 700 }}>
        {visibleLines.map((line, i) => (
          <div
            key={i}
            style={{
              color: line.startsWith('  [OK]')
                ? '#22c55e'
                : line.startsWith('──')
                ? '#166534'
                : line.startsWith('  ▓')
                ? '#39ff14'
                : line.startsWith('  AyushOS') || line.startsWith('  Logged') || line.startsWith('  Launch')
                ? '#86efac'
                : '#39ff14',
              opacity: 0,
              animation: 'bootFadeIn 0.15s ease forwards',
            }}
          >
            {line || '\u00A0'}
          </div>
        ))}

        {/* Blinking cursor at end */}
        {!exiting && (
          <div style={{ display: 'inline-block', width: 10, height: '1.1em', background: '#39ff14', verticalAlign: 'middle', animation: 'bootBlink 1s step-end infinite' }} />
        )}
      </div>

      {/* Skip hint */}
      {!exiting && (
        <div style={{
          position: 'fixed', bottom: 24, right: 32,
          fontSize: 10, color: '#166534',
          fontFamily: 'monospace', letterSpacing: '0.2em',
          zIndex: 2,
        }}>
          PRESS ANY KEY TO SKIP
        </div>
      )}

      <style>{`
        @keyframes bootFadeIn {
          from { opacity: 0; transform: translateX(-4px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes bootBlink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
