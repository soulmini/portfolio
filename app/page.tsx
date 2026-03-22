'use client';

import { useState, useEffect } from 'react';
import Monitor from '@/components/Monitor';
import BootScreen from '@/components/BootScreen';

export default function Home() {
  const [booting, setBooting] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [rebootCount, setRebootCount] = useState(0);

  useEffect(() => {
    setMounted(true);
    // Only show boot screen once per session
    if (sessionStorage.getItem('booted')) {
      setBooting(false);
    }
  }, []);

  const handleBootDone = () => {
    sessionStorage.setItem('booted', '1');
    setBooting(false);
    // Bump key so Monitor fully remounts after every boot
    setRebootCount(c => c + 1);
  };

  const triggerReboot = () => {
    setBooting(true);
  };

  if (!mounted) return null;

  return (
    <>
      {booting && <BootScreen onDone={handleBootDone} />}

      <main style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 0 32px',
        overflowY: 'auto',
        overflowX: 'hidden',
        position: 'relative',
        background: 'radial-gradient(ellipse 120% 80% at 50% 0%, #0a1a0a 0%, #050a05 40%, #020202 100%)',
        opacity: booting ? 0 : 1,
        transition: 'opacity 0.8s ease 0.2s',
      }}>
        {/* Wall grid */}
        <div style={{
          position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
          backgroundImage: `
            linear-gradient(rgba(57,255,20,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(57,255,20,0.025) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }} />

        {/* Screen ambient glow */}
        <div style={{
          position: 'fixed', top: '10%', left: '50%',
          transform: 'translateX(-50%)',
          width: 1000, height: 700,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(57,255,20,0.09) 0%, rgba(57,255,20,0.03) 40%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none', zIndex: 0,
        }} />

        {/* Ceiling bloom */}
        <div style={{
          position: 'fixed', top: -120, left: '50%',
          transform: 'translateX(-50%)',
          width: 600, height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(57,255,20,0.04) 0%, transparent 70%)',
          filter: 'blur(80px)',
          pointerEvents: 'none', zIndex: 0,
        }} />

        {/* Corner labels */}
        <div style={{
          position: 'fixed', top: 10, left: 14, zIndex: 10,
          fontSize: 9, color: '#1a2a1a', fontFamily: 'monospace', letterSpacing: '0.25em',
        }}>
          AYUSH.DEV v1.0.0
        </div>
        <div style={{
          position: 'fixed', top: 10, right: 14, zIndex: 10,
          fontSize: 9, color: '#1a2a1a', fontFamily: 'monospace', letterSpacing: '0.25em',
        }}>
          SDE-1 @ SUPPLYNOTE
        </div>

        {/* Monitor + keyboard — key forces full remount after each reboot */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Monitor key={rebootCount} onRestart={triggerReboot} />
        </div>

        {/* Desk surface fade */}
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          height: '22%', pointerEvents: 'none', zIndex: 0,
          background: 'linear-gradient(to top, #0a0f0a 0%, transparent 100%)',
        }} />
      </main>
    </>
  );
}
