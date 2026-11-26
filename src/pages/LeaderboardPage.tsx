import { useEffect, useState } from 'react';
import { Trophy, Medal, Crown, RefreshCw } from 'lucide-react';
import { fetchLeaderboard } from '@/lib/supabase';
import type { TypingResult } from '@/lib/supabase';

export default function LeaderboardPage() {
  const [lang, setLang] = useState<'bangla' | 'english'>('bangla');
  const [results, setResults] = useState<TypingResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetchLeaderboard(lang)
      .then((data) => {
        if (!cancelled) setResults(data);
      })
      .catch(() => {
        if (!cancelled)
          setError('লিডারবোর্ড লোড করা যায়নি। ইন্টারনেট সংযোগ দেখে পেজটি আবার চালু করুন।');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [lang]);

  const medals = [Crown, Medal, Medal];

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="flex items-center gap-2.5 text-3xl font-bold text-stone-900">
            <Trophy className="text-brand-red-500" /> লিডারবোর্ড
          </h1>
          <p className="mt-2 text-stone-600">সর্বোচ্চ গতির টাইপিং চ্যাম্পিয়নরা</p>
        </div>
        <div className="inline-flex rounded-xl border border-stone-200 bg-white p-1" role="tablist" aria-label="ভাষা">
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
              {l === 'bangla' ? 'বাংলা' : 'English'}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="mt-10 space-y-3" aria-busy="true">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 animate-pulse rounded-2xl bg-stone-100" />
          ))}
        </div>
      ) : error ? (
        <div className="card mt-8 p-8 text-center">
          <p className="text-stone-700">{error}</p>
        </div>
      ) : results.length === 0 ? (
        <div className="card mt-8 p-10 text-center">
          <Trophy size={40} className="mx-auto text-stone-300" />
          <p className="mt-4 font-semibold text-stone-700">এখনো কেউ ফলাফল সেভ করেনি — প্রথম হয়ে যান!</p>
          <p className="mt-1 text-sm text-stone-500">টাইপিং টেস্ট দিয়ে আপনার নাম তালিকায় যোগ করুন।</p>
        </div>
      ) : (
        <ol className="mt-8 space-y-3" aria-label="সেরা ফলাফল">
          {results.map((r, i) => (
            <li
              key={r.id}
              className={`card flex items-center gap-4 p-4 ${
                i === 0 ? 'border-brand-red-300 bg-brand-red-50' : i < 3 ? 'border-stone-300' : ''
              }`}
            >
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl font-bold">
                {i < 3 ? (
                  (() => {
                    const MedalIcon = medals[i];
                    return <MedalIcon size={24} className={i === 0 ? 'text-brand-red-500' : i === 1 ? 'text-stone-400' : 'text-brand-red-700'} />;
                  })()
                ) : (
                  <span className="text-stone-500">{i + 1}</span>
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-bold text-stone-900">{r.user_name}</p>
                <p className="text-sm text-stone-500">
                  {r.duration_seconds === 30 ? '৩০ সেকেন্ড' : r.duration_seconds === 60 ? '১ মিনিট' : `${r.duration_seconds} সেকেন্ড`} ·
                  নির্ভুলতা {r.accuracy}%
                </p>
              </div>
              <div className="text-right">
                <div className="text-xl font-bold text-brand-green-800">{Math.round(r.wpm)}</div>
                <div className="text-xs text-stone-500">WPM</div>
              </div>
            </li>
          ))}
        </ol>
      )}

      <p className="mt-8 flex items-center justify-center gap-2 text-sm text-stone-500">
        <RefreshCw size={14} /> ফলাফল তালিকাটি স্বয়ংক্রিয়ভাবে সর্বোচ্চ গতি অনুযায়ী সাজানো
      </p>
    </div>
  );
}
