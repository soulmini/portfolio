'use client';

import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  KeyboardEvent,
} from 'react';
import { processCommand, PROMPT, ALL_COMMANDS } from '@/lib/commands';
import { BOOT_LINES } from '@/lib/ascii';

interface HistoryLine {
  id: number;
  type: 'input' | 'output' | 'boot';
  content: React.ReactNode;
}

let idCounter = 0;
const uid = () => ++idCounter;

export default function Terminal({ onRestart }: { onRestart?: () => void }) {
  const [lines, setLines] = useState<HistoryLine[]>([]);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [booting, setBooting] = useState(true);
  const [showMatrix, setShowMatrix] = useState(false);
  const [time, setTime] = useState('');
  const [errorAnim, setErrorAnim] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const matrixCanvasRef = useRef<HTMLCanvasElement>(null);

  // ── Clock ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString());
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // ── Boot sequence ────────────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;
    (async () => {
      for (let i = 0; i < BOOT_LINES.length; i++) {
        if (cancelled) return;
        await new Promise(r => setTimeout(r, 60));
        setLines(prev => [
          ...prev,
          { id: uid(), type: 'boot', content: BOOT_LINES[i] },
        ]);
      }
      await new Promise(r => setTimeout(r, 400));
      if (!cancelled) {
        setBooting(false);
        const banner = processCommand('banner');
        setLines(prev => [
          ...prev,
          { id: uid(), type: 'output', content: banner.output },
          {
            id: uid(),
            type: 'boot',
            content: (
              <span className="text-t-gray text-xs">
                Hint: type{' '}
                <span className="text-t-green">help</span> to explore
              </span>
            ),
          },
        ]);
        inputRef.current?.focus();
      }
    })();
    return () => { cancelled = true; };
  }, []);

  // ── Auto-scroll ──────────────────────────────────────────────────────────
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  // ── Matrix Easter Egg ────────────────────────────────────────────────────
  useEffect(() => {
    if (!showMatrix || !matrixCanvasRef.current) return;
    const canvas = matrixCanvasRef.current;
    const ctx = canvas.getContext('2d')!;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const cols = Math.floor(canvas.width / 16);
    const drops = Array(cols).fill(1);
    const chars = 'AYUSH01アカサタナハマヤラワガザダバパ<>{}[]';

    const draw = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#39ff14';
      ctx.font = '14px monospace';
      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * 16, y * 16);
        if (y * 16 > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      });
    };

    const id = setInterval(draw, 40);
    const stop = setTimeout(() => {
      clearInterval(id);
      setShowMatrix(false);
      setLines(prev => [
        ...prev,
        { id: uid(), type: 'output', content: <span className="text-t-green text-sm">Reality restored.</span> },
      ]);
    }, 5000);

    return () => { clearInterval(id); clearTimeout(stop); };
  }, [showMatrix]);

  // ── Command submit ───────────────────────────────────────────────────────
  const submit = useCallback(() => {
    if (booting) return;
    const raw = input.trim();

    setLines(prev => [
      ...prev,
      {
        id: uid(),
        type: 'input',
        content: raw || '',
      },
    ]);

    if (!raw) { setInput(''); return; }

    // Add to cmd history
    setCmdHistory(prev => {
      const updated = [raw, ...prev.filter(c => c !== raw)].slice(0, 50);
      const result = processCommand(raw, updated);

      if (result.restart) {
        onRestart?.();
      } else if (result.clear) {
        setLines([]);
      } else if (result.matrix) {
        setShowMatrix(true);
        setLines(prev2 => [
          ...prev2,
          { id: uid(), type: 'output', content: result.output },
        ]);
      } else {
        if (result.error) {
          setErrorAnim(true);
          setTimeout(() => setErrorAnim(false), 400);
        }
        if (result.output) {
          setLines(prev2 => [
            ...prev2,
            { id: uid(), type: 'output', content: result.output },
          ]);
        }
      }

      return updated;
    });

    setInput('');
    setHistoryIdx(-1);
  }, [booting, input]);

  // ── Keyboard handling ────────────────────────────────────────────────────
  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        submit();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setCmdHistory(prev => {
          const next = Math.min(historyIdx + 1, prev.length - 1);
          setHistoryIdx(next);
          setInput(prev[next] ?? '');
          return prev;
        });
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = Math.max(historyIdx - 1, -1);
        setHistoryIdx(next);
        setInput(next === -1 ? '' : cmdHistory[next] ?? '');
      } else if (e.key === 'Tab') {
        e.preventDefault();
        const partial = input.toLowerCase();
        const match = ALL_COMMANDS.find(c => c.startsWith(partial) && c !== partial);
        if (match) setInput(match);
      } else if (e.key === 'l' && e.ctrlKey) {
        e.preventDefault();
        setLines([]);
      } else if (e.key === 'c' && e.ctrlKey) {
        e.preventDefault();
        setLines(prev => [
          ...prev,
          { id: uid(), type: 'input', content: input + '^C' },
        ]);
        setInput('');
        setHistoryIdx(-1);
      }
    },
    [submit, historyIdx, cmdHistory, input]
  );

  const focus = () => inputRef.current?.focus();

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div
      className="relative flex flex-col w-full h-full bg-t-bg text-t-white font-mono text-sm overflow-hidden"
      onClick={focus}
    >
      {/* Matrix overlay */}
      {showMatrix && (
        <canvas
          ref={matrixCanvasRef}
          className="absolute inset-0 w-full h-full z-20"
        />
      )}

      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2 bg-t-surface border-b border-t-border shrink-0">
        <span className="w-3 h-3 rounded-full bg-red-500" />
        <span className="w-3 h-3 rounded-full bg-yellow-400" />
        <span className="w-3 h-3 rounded-full bg-green-500" />
        <span className="flex-1 text-center text-t-gray text-xs tracking-widest">
          ayush@portfolio — bash
        </span>
        <span className="text-t-gray text-xs">{time}</span>
      </div>

      {/* Output area */}
      <div className={`flex-1 overflow-y-auto px-4 py-3 space-y-2 scrollbar-thin ${errorAnim ? 'animate-error-flash' : ''}`}>
        {lines.map(line => (
          <div key={line.id} className="animate-fade-in">
            {line.type === 'input' ? (
              <div className="flex gap-2 flex-wrap">
                <span className="text-t-green shrink-0 select-none">{PROMPT}</span>
                <span className="text-t-white break-all">{line.content}</span>
              </div>
            ) : line.type === 'boot' ? (
              <p className="text-t-green-dim text-xs">{line.content}</p>
            ) : (
              <div className="pl-2 border-l border-t-border">{line.content}</div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input line */}
      {!booting && (
        <div className={`flex items-center gap-2 px-4 py-3 border-t border-t-border shrink-0 bg-t-bg ${errorAnim ? 'animate-error-shake' : ''}`}>
          <span className="text-t-green shrink-0 select-none">{PROMPT}</span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            className="flex-1 bg-transparent outline-none text-t-white caret-t-green min-w-0"
            spellCheck={false}
            autoCapitalize="none"
            autoCorrect="off"
            autoFocus
          />
          <span className="animate-blink text-t-green select-none">█</span>
        </div>
      )}

      {/* Status bar */}
      <div className="flex items-center justify-between px-4 py-1 bg-t-green text-black text-xs font-bold shrink-0">
        <span>⬡ AyushOS v1.0.0</span>
        <span>ayush@portfolio</span>
        <span>NORMAL</span>
      </div>
    </div>
  );
}
