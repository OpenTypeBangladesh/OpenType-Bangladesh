import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { RotateCcw, Play } from 'lucide-react';

export interface TypingStats {
  wpm: number;
  cpm: number;
  accuracy: number;
  errors: number;
  elapsed: number;
}

interface Props {
  text: string;
  /** when set, the test ends automatically after this many seconds */
  durationSeconds?: number;
  onFinish?: (stats: TypingStats) => void;
  ariaLabel?: string;
}

export default function TypingEngine({ text, durationSeconds, onFinish, ariaLabel }: Props) {
  const [typed, setTyped] = useState('');
  const [started, setStarted] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const finishedRef = useRef(false);

  const reset = useCallback(() => {
    setTyped('');
    setStarted(false);
    setElapsed(0);
    finishedRef.current = false;
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    reset();
  }, [text, reset]);

  useEffect(() => {
    if (!started) return;
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, [started]);

  const stats = useMemo(() => {
    const minutes = Math.max(elapsed, 1) / 60;
    const correctChars = [...typed].filter((ch, i) => ch === text[i]).length;
    const errors = [...typed].filter((ch, i) => ch !== text[i]).length;
    const cpm = Math.round(correctChars / minutes);
    const wpm = Math.round(correctChars / 5 / minutes);
    const accuracy = typed.length === 0 ? 100 : Math.round((correctChars / typed.length) * 100);
    return { wpm, cpm, accuracy, errors, elapsed };
  }, [typed, text, elapsed]);

  const finished = durationSeconds ? elapsed >= durationSeconds : typed.length >= text.length;

  useEffect(() => {
    if (finished && !finishedRef.current && started && typed.length > 0) {
      finishedRef.current = true;
      setStarted(false);
      onFinish?.(stats);
    }
  }, [finished, started, typed.length, stats, onFinish]);

  const handleChange = (value: string) => {
    if (finished) return;
    if (!started && value.length > 0) setStarted(true);
    setTyped(value);
  };

  const timeLeft = durationSeconds ? Math.max(0, durationSeconds - elapsed) : null;

  const chars = useMemo(() => [...text], [text]);
  const typedChars = useMemo(() => [...typed], [typed]);

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex gap-2 text-sm font-semibold">
          <span className="rounded-lg bg-stone-100 px-3 py-1.5" aria-live="polite">
            সময়: {Math.floor(elapsed / 60)}:{String(elapsed % 60).padStart(2, '0')}
            {timeLeft !== null && ` / বাকি ${timeLeft}s`}
          </span>
          <span className="rounded-lg bg-orange-50 px-3 py-1.5 text-orange-800">গতি: {stats.wpm} WPM</span>
          <span className="rounded-lg bg-orange-50 px-3 py-1.5 text-orange-800">নির্ভুলতা: {stats.accuracy}%</span>
        </div>
        <button onClick={reset} className="btn-secondary !px-3 !py-1.5 text-sm">
          <RotateCcw size={15} /> আবার
        </button>
      </div>

      <div
        className="relative rounded-2xl border-2 border-stone-200 bg-white p-5 text-xl leading-loose sm:text-2xl"
        onClick={() => inputRef.current?.focus()}
        role="group"
        aria-label={ariaLabel ?? 'টাইপিং অনুশীলন এলাকা'}
      >
        <p className="break-words font-bangla tracking-wide">
          {chars.map((ch, i) => {
            const state = i < typedChars.length ? (typedChars[i] === ch ? 'ok' : 'bad') : 'pending';
            return (
              <span
                key={i}
                className={
                  state === 'ok'
                    ? 'text-orange-700'
                    : state === 'bad'
                      ? 'rounded bg-red-100 text-red-600'
                      : i === typedChars.length
                        ? 'border-b-2 border-orange-600'
                        : 'text-stone-400'
                }
              >
                {ch}
              </span>
            );
          })}
        </p>
        <input
          ref={inputRef}
          value={typed}
          onChange={(e) => handleChange(e.target.value)}
          className="absolute inset-0 h-full w-full cursor-text opacity-0"
          aria-label="এখানে টাইপ করুন"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
      </div>

      {!started && (
        <p className="mt-3 flex items-center justify-center gap-2 text-sm text-stone-500">
          <Play size={14} /> লেখা শুরু করলেই টাইমার চালু হবে — কীবোর্ডে টাইপ করুন
        </p>
      )}
    </div>
  );
}
