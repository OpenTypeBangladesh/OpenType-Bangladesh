import { useEffect, useState } from 'react';
import { Save, CheckCircle2, AlertCircle } from 'lucide-react';
import TypingEngine from '@/components/TypingEngine';
import type { TypingStats } from '@/components/TypingEngine';
import { saveTypingResult } from '@/lib/supabase';
import { useI18n } from '@/lib/i18n';

const DURATIONS = [60, 120, 300, 600];

const SAMPLE_TEXTS: Record<'bangla' | 'english', string[]> = {
  bangla: [
    'বাংলাদেশ একটি উন্নয়নশীল দেশ, যেখানে প্রযুক্তি শিক্ষা প্রতিদিন আরও গুরুত্বপূর্ণ হয়ে উঠছে।',
    'মেধাবী শিক্ষার্থীরা নিয়মিত অনুশীলনের মাধ্যমে দ্রুত টাইপিং দক্ষতা অর্জন করতে পারে।',
    'কম্পিউটারে বাংলা লেখার দক্ষতা সরকারি ও বেসরকারি প্রতিষ্ঠানে খুবই কাজে লাগে।',
    'সরকারি অফিসে কম্পিউটার অপারেটর নিয়োগে বাংলা ও ইংরেজি দুই ভাষাতেই টাইপিং পরীক্ষা নেওয়া হয়।',
    'ডেটা এন্ট্রি কাজে নির্ভুলতা গতির চেয়েও জরুরি, তাই ধীরে হলেও সঠিক টাইপ করার অভ্যাস গড়ুন।',
  ],
  english: [
    'Consistent practice every day is the only secret behind fast and accurate typing skills.',
    'Computer literacy opens doors to freelancing, office jobs and higher education abroad.',
    'The quick brown fox jumps over the lazy dog while the sun sets behind the hills.',
    'Data entry operators must balance speed with accuracy to meet modern office demands.',
    'A good typist keeps their wrists straight and their eyes on the text, not the keyboard.',
  ],
};

interface SavedState {
  status: 'idle' | 'saving' | 'saved' | 'error';
  message?: string;
}

export default function TestPage() {
  const { t } = useI18n();
  const [lang, setLang] = useState<'bangla' | 'english'>('bangla');
  const [duration, setDuration] = useState(60);
  const [round, setRound] = useState(0);
  const [result, setResult] = useState<TypingStats | null>(null);
  const [name, setName] = useState('');
  const [saveState, setSaveState] = useState<SavedState>({ status: 'idle' });

  const text = SAMPLE_TEXTS[lang][round % SAMPLE_TEXTS[lang].length];

  useEffect(() => {
    setResult(null);
    setSaveState({ status: 'idle' });
  }, [lang, duration, round]);

  const handleFinish = (stats: TypingStats) => setResult(stats);

  const handleSave = async () => {
    if (!result || !name.trim()) return;
    setSaveState({ status: 'saving' });
    try {
      await saveTypingResult({
        user_name: name.trim(),
        language: lang,
        duration_seconds: duration,
        wpm: result.wpm,
        cpm: result.cpm,
        accuracy: result.accuracy,
        error_count: result.errors,
      });
      setSaveState({ status: 'saved' });
    } catch {
      setSaveState({
        status: 'error',
        message: t(
          'ফলাফল সেভ করা যায়নি। ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করুন।',
          'Could not save your result. Check your internet connection and try again.'
        ),
      });
    }
  };

  const durationLabel = (d: number) => {
    const labels: Record<number, { bn: string; en: string }> = {
      60: { bn: '১ মিনিট', en: '1 minute' },
      120: { bn: '২ মিনিট', en: '2 minutes' },
      300: { bn: '৫ মিনিট', en: '5 minutes' },
      600: { bn: '১০ মিনিট', en: '10 minutes' },
    };
    return labels[d][t('bn', 'en') as 'bn' | 'en'];
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold text-stone-900">{t('টাইপিং টেস্ট', 'Typing Test')}</h1>
      <p className="mt-2 text-stone-600">
        {t(
          'আপনার গতি ও নির্ভুলতা যাচাই করুন। টাইমার শেষ হলে ফলাফল দেখা যাবে।',
          'Measure your speed and accuracy. Results appear when the timer ends.'
        )}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-xl border border-stone-200 bg-white p-1" role="tablist" aria-label={t('ভাষা', 'Language')}>
          {(['bangla', 'english'] as const).map((l) => (
            <button
              key={l}
              role="tab"
              aria-selected={lang === l}
              onClick={() => setLang(l)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                lang === l ? 'bg-brand-green-700 text-white' : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              {l === 'bangla' ? t('বাংলা', 'Bangla') : t('ইংরেজি', 'English')}
            </button>
          ))}
        </div>
        <div className="inline-flex flex-wrap rounded-xl border border-stone-200 bg-white p-1" role="tablist" aria-label={t('সময়', 'Duration')}>
          {DURATIONS.map((d) => (
            <button
              key={d}
              role="tab"
              aria-selected={duration === d}
              onClick={() => setDuration(d)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                duration === d ? 'bg-stone-800 text-white' : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              {durationLabel(d)}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <TypingEngine
          key={`${lang}-${duration}-${round}`}
          text={text}
          durationSeconds={duration}
          onFinish={handleFinish}
          ariaLabel={t('টাইপিং টেস্ট', 'Typing test')}
        />
      </div>

      {result && (
        <div className="card mt-8 border-brand-red-300 p-6" aria-live="polite">
          <h2 className="text-xl font-bold text-stone-900">{t('টেস্ট শেষ — ফলাফল', 'Test complete — results')}</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: t('গতি', 'Speed'), value: `${result.wpm} WPM` },
              { label: t('অক্ষর/মিনিট', 'Chars/min'), value: `${result.cpm} CPM` },
              { label: t('নির্ভুলতা', 'Accuracy'), value: `${result.accuracy}%` },
              { label: t('ভুল', 'Errors'), value: `${result.errors}` },
            ].map((s) => (
              <div key={s.label} className="rounded-xl bg-stone-50 p-4 text-center">
                <div className="text-2xl font-bold text-brand-green-800">{s.value}</div>
                <div className="mt-1 text-sm text-stone-600">{s.label}</div>
              </div>
            ))}
          </div>

          {saveState.status === 'saved' ? (
            <p className="mt-5 flex items-center gap-2 rounded-xl bg-green-50 px-4 py-3 font-semibold text-green-800">
              <CheckCircle2 size={18} /> {t('ফলাফল সেভ হয়েছে — লিডারবোর্ডে দেখুন', 'Result saved — see the leaderboard')}
            </p>
          ) : saveState.status === 'error' ? (
            <p className="mt-5 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 font-semibold text-red-700">
              <AlertCircle size={18} /> {saveState.message}
            </p>
          ) : (
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t('আপনার নাম লিখুন', 'Enter your name')}
                maxLength={40}
                aria-label={t('আপনার নাম', 'Your name')}
                className="flex-1 rounded-xl border border-stone-300 px-4 py-2.5 focus:border-brand-green-600 focus:outline-none"
              />
              <button
                onClick={handleSave}
                disabled={!name.trim() || saveState.status === 'saving'}
                className="btn-primary"
              >
                <Save size={17} />
                {saveState.status === 'saving'
                  ? t('সেভ হচ্ছে…', 'Saving…')
                  : t('লিডারবোর্ডে সেভ করুন', 'Save to leaderboard')}
              </button>
            </div>
          )}

          <button onClick={() => setRound((r) => r + 1)} className="btn-secondary mt-4">
            {t('নতুন লেখা দিয়ে আবার টেস্ট', 'Test again with new text')}
          </button>
        </div>
      )}
    </div>
  );
}
