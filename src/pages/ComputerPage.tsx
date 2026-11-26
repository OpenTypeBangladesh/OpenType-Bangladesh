import { useState } from 'react';
import { Clock, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { computerLessons } from '@/data/computerLessons';

export default function ComputerPage() {
  const [openId, setOpenId] = useState<string | null>(computerLessons[0].id);
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const toggleComplete = (id: string) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const progress = Math.round((completed.size / computerLessons.length) * 100);

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold text-stone-900">কম্পিউটার শিক্ষা</h1>
      <p className="mt-2 text-stone-600">
        চাকরি ও দৈনন্দিন জীবনের জন্য প্রয়োজনীয় কম্পিউটার দক্ষতা — সহজ বাংলায়।
      </p>

      <div className="card mt-6 p-5">
        <div className="flex items-center justify-between text-sm font-semibold text-stone-700">
          <span>আপনার অগ্রগতি</span>
          <span className="text-brand-green-700">
            {completed.size}/{computerLessons.length} মডিউল ({progress}%)
          </span>
        </div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-stone-100">
          <div
            className="h-full rounded-full bg-brand-green-600 transition-all duration-500"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {computerLessons.map((lesson) => {
          const open = openId === lesson.id;
          const done = completed.has(lesson.id);
          return (
            <article key={lesson.id} className={`card overflow-hidden ${done ? 'border-green-300' : ''}`}>
              <button
                onClick={() => setOpenId(open ? null : lesson.id)}
                aria-expanded={open}
                className="flex w-full items-center justify-between gap-4 p-5 text-left"
              >
                <div className="flex items-start gap-3">
                  <span
                    role="checkbox"
                    aria-checked={done}
                    aria-label={`${lesson.title} সম্পন্ন হয়েছে`}
                    tabIndex={0}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleComplete(lesson.id);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleComplete(lesson.id);
                      }
                    }}
                    className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full border-2 transition ${
                      done ? 'border-green-600 bg-green-600 text-white' : 'border-stone-300 text-transparent'
                    }`}
                  >
                    <CheckCircle2 size={14} />
                  </span>
                  <div>
                    <h2 className={`font-bold ${done ? 'text-green-800' : 'text-stone-900'}`}>{lesson.title}</h2>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-stone-500">
                      <Clock size={14} /> আনুমানিক {lesson.minutes} মিনিট
                    </p>
                  </div>
                </div>
                {open ? <ChevronUp size={20} className="text-stone-500" /> : <ChevronDown size={20} className="text-stone-500" />}
              </button>

              {open && (
                <div className="border-t border-stone-100 px-5 pb-5 pt-4">
                  <p className="text-stone-700">{lesson.summary}</p>
                  <ul className="mt-4 space-y-3">
                    {lesson.points.map((point, i) => (
                      <li key={i} className="flex gap-3 rounded-xl bg-stone-50 p-4 text-sm leading-relaxed text-stone-700">
                        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-green-700 text-xs font-bold text-white">
                          {i + 1}
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => toggleComplete(lesson.id)}
                    className={`mt-4 ${done ? 'btn-secondary' : 'btn-primary'}`}
                  >
                    <CheckCircle2 size={17} />
                    {done ? 'সম্পন্ন হয়েছে — আবার চালু করুন' : 'এই মডিউল সম্পন্ন করেছি'}
                  </button>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </div>
  );
}
