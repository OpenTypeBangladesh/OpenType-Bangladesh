import { useEffect, useRef, useState } from 'react';
import { Accessibility, X, MoveVertical } from 'lucide-react';
import { useAccessibility } from '@/lib/accessibility';

const labels: Record<string, { bn: string; desc: string }> = {
  largeText: { bn: 'বড় লেখা', desc: 'সব লেখা একটু বড় করে দেখানো হয়' },
  underlineLinks: { bn: 'লিংকে রেখা', desc: 'লিংকগুলোতে নিচে রেখা দেখানো হয়' },
  dyslexiaFriendly: { bn: 'ডিসলেক্সিয়া বান্ধব', desc: 'অক্ষরের ফাঁক বাড়িয়ে পড়া সহজ করা হয়' },
  highContrast: { bn: 'উচ্চ বৈসাদৃশ্য', desc: 'রংয়ের পার্থক্য বাড়িয়ে স্পষ্ট করা হয়' },
  reduceMotion: { bn: 'অ্যানিমেশন কমান', desc: 'স্ক্রিনের নড়াচড়া বন্ধ করা হয়' },
  screenReaderFriendly: { bn: 'স্ক্রিন রিডার সহায়তা', desc: 'অতিরিক্ত বিবরণ সহায়ক প্রযুক্তিতে পাঠানো হয়' },
};

export default function AccessibilityPanel() {
  const [open, setOpen] = useState(false);
  const { settings, toggle, reset } = useAccessibility();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [open]);

  const keys = Object.keys(labels) as Array<keyof typeof labels>;

  return (
    <div className="fixed bottom-4 left-4 z-50" ref={panelRef}>
      {open && (
        <div
          role="dialog"
          aria-label="প্রবেশগম্যতার সেটিংস"
          className="mb-2 w-80 max-w-[calc(100vw-2rem)] rounded-2xl border border-stone-200 bg-white p-4 shadow-xl"
        >
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-bold text-stone-800">প্রবেশগম্যতার সেটিংস</h2>
            <button
              onClick={() => setOpen(false)}
              aria-label="বন্ধ করুন"
              className="rounded-lg p-1.5 text-stone-500 hover:bg-stone-100"
            >
              <X size={18} />
            </button>
          </div>
          <div className="space-y-1">
            {keys.map((key) => (
              <button
                key={key}
                onClick={() => toggle(key as keyof typeof settings)}
                aria-pressed={settings[key as keyof typeof settings]}
                className={`flex w-full items-start gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                  settings[key as keyof typeof settings]
                    ? 'bg-orange-50 ring-1 ring-orange-300'
                    : 'hover:bg-stone-50'
                }`}
              >
                <span
                  className={`mt-0.5 flex h-5 w-9 flex-shrink-0 items-center rounded-full px-0.5 transition ${
                    settings[key as keyof typeof settings] ? 'bg-orange-600 justify-end' : 'bg-stone-300 justify-start'
                  }`}
                >
                  <span className="h-4 w-4 rounded-full bg-white shadow" />
                </span>
                <span>
                  <span className="block text-sm font-semibold text-stone-800">{labels[key].bn}</span>
                  <span className="block text-xs text-stone-500">{labels[key].desc}</span>
                </span>
              </button>
            ))}
          </div>
          <button
            onClick={reset}
            className="mt-3 w-full rounded-xl border border-stone-200 py-2 text-sm font-semibold text-stone-600 hover:bg-stone-50"
          >
            সব রিসেট করুন
          </button>
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="প্রবেশগম্যতার সেটিংস খুলুন"
        className="flex items-center gap-2 rounded-full bg-orange-700 px-4 py-3 font-semibold text-white shadow-lg transition hover:bg-orange-800 focus-visible:outline-none"
      >
        {open ? <X size={20} /> : <Accessibility size={20} />}
        {!open && <span className="hidden sm:inline text-sm">প্রবেশগম্যতা</span>}
      </button>
      <div className="sr-only flex items-center gap-1">
        <MoveVertical size={12} /> সেটিংস প্যানেল
      </div>
    </div>
  );
}
