import { useState } from 'react';
import { Clock, Signal } from 'lucide-react';
import { typingLessons } from '@/data/typingLessons';
import TypingEngine from '@/components/TypingEngine';

const levelColors: Record<string, string> = {
  'সহজ': 'bg-green-100 text-green-800',
  'মাধ্যম': 'bg-yellow-100 text-yellow-800',
  'কঠিন': 'bg-red-100 text-red-800',
};

export default function LessonsPage() {
  const [lang, setLang] = useState<'bangla' | 'english'>('bangla');
  const [activeId, setActiveId] = useState(typingLessons[0].id);
  const [practiceIndex, setPracticeIndex] = useState(0);

  const lessons = typingLessons.filter((l) => l.language === lang);
  const active = lessons.find((l) => l.id === activeId) ?? lessons[0];
  const practiceText = active.practice[practiceIndex];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold text-stone-900">টাইপিং পাঠ</h1>
      <p className="mt-2 text-stone-600">
        সহজ থেকে কঠিন — ধাপে ধাপে বাংলা ও ইংরেজি টাইপিং অনুশীলন করুন।
      </p>

      <div className="mt-6 inline-flex rounded-xl border border-stone-200 bg-white p-1" role="tablist" aria-label="ভাষা নির্বাচন">
        {(['bangla', 'english'] as const).map((l) => (
          <button
            key={l}
            role="tab"
            aria-selected={lang === l}
            onClick={() => {
              setLang(l);
              setActiveId(typingLessons.filter((x) => x.language === l)[0].id);
              setPracticeIndex(0);
            }}
            className={`rounded-lg px-5 py-2 text-sm font-semibold transition ${
              lang === l ? 'bg-brand-green-700 text-white' : 'text-stone-600 hover:bg-stone-100'
            }`}
          >
            {l === 'bangla' ? 'বাংলা' : 'English'}
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[320px_1fr]">
        <aside aria-label="পাঠের তালিকা">
          <div className="space-y-2">
            {lessons.map((lesson) => (
              <button
                key={lesson.id}
                onClick={() => {
                  setActiveId(lesson.id);
                  setPracticeIndex(0);
                }}
                aria-current={active.id === lesson.id ? 'true' : undefined}
                className={`card w-full p-4 text-left transition ${
                  active.id === lesson.id
                    ? 'border-brand-red-500 ring-2 ring-brand-red-200'
                    : 'hover:border-brand-green-300'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="font-semibold text-stone-900">{lesson.title}</h3>
                  <span className={`flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-bold ${levelColors[lesson.level]}`}>
                    {lesson.level}
                  </span>
                </div>
                <p className="mt-1.5 line-clamp-2 text-sm text-stone-600">{lesson.description}</p>
              </button>
            ))}
          </div>
        </aside>

        <main className="card p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold text-stone-900">{active.title}</h2>
              <p className="mt-2 max-w-xl text-stone-600">{active.description}</p>
            </div>
            <div className="flex gap-2 text-sm">
              <span className="flex items-center gap-1.5 rounded-lg bg-stone-100 px-3 py-1.5 font-semibold text-stone-700">
                <Signal size={14} /> {active.level}
              </span>
              <span className="flex items-center gap-1.5 rounded-lg bg-stone-100 px-3 py-1.5 font-semibold text-stone-700">
                <Clock size={14} /> {active.practice.length}টি লাইন
              </span>
            </div>
          </div>

          <div className="mt-5 rounded-xl bg-brand-green-50 px-4 py-3">
            <span className="text-sm font-semibold text-brand-green-900">মূল অক্ষর: </span>
            <span className="font-bangla text-lg tracking-widest text-brand-green-800">{active.keys}</span>
          </div>

          <div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="অনুশীলনের লাইন">
            {active.practice.map((_, i) => (
              <button
                key={i}
                role="tab"
                aria-selected={practiceIndex === i}
                onClick={() => setPracticeIndex(i)}
                className={`h-9 w-9 rounded-lg text-sm font-bold transition ${
                  practiceIndex === i
                    ? 'bg-brand-green-700 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <div className="mt-5">
            <TypingEngine
              key={`${active.id}-${practiceIndex}`}
              text={practiceText}
              ariaLabel={`${active.title} — লাইন ${practiceIndex + 1}`}
            />
          </div>

          {practiceIndex < active.practice.length - 1 && (
            <button
              onClick={() => setPracticeIndex((i) => i + 1)}
              className="btn-primary mt-6 w-full sm:w-auto"
            >
              পরের লাইনে যান
            </button>
          )}
        </main>
      </div>
    </div>
  );
}
