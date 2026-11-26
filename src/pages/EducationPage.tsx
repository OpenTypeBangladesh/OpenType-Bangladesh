import { useMemo, useState } from 'react';
import { Clock, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { educationLessons } from '@/data/educationLessons';
import { useI18n } from '@/lib/i18n';

export default function EducationPage() {
  const { t, lang } = useI18n();
  const [openId, setOpenId] = useState<string | null>(educationLessons[0].id);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [subject, setSubject] = useState<string>('all');

  const subjects = useMemo(() => {
    const map = new Map<string, string>();
    educationLessons.forEach((l) => map.set(l.subject.en, l.subject[lang]));
    return [...map.entries()].map(([en, label]) => ({ en, label }));
  }, [lang]);

  const visible = subject === 'all' ? educationLessons : educationLessons.filter((l) => l.subject.en === subject);
  const progress = Math.round((completed.size / educationLessons.length) * 100);

  const toggleComplete = (id: string) =>
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="text-3xl font-bold text-stone-900">{t('শিক্ষা একাডেমি', 'Education Academy')}</h1>
      <p className="mt-2 text-stone-600">
        {t(
          'বাংলা, ইংরেজি, গণিত, বিজ্ঞান ও সাধারণ জ্ঞান — স্কুল-কলেজ ও প্রতিযোগিতামূলক পরীক্ষার জন্য।',
          'Bangla, English, math, science and general knowledge for school and competitive exams.'
        )}
      </p>

      <div className="card mt-6 p-5">
        <div className="flex items-center justify-between text-sm font-semibold text-stone-700">
          <span>{t('আপনার অগ্রগতি', 'Your progress')}</span>
          <span className="text-brand-green-700">
            {completed.size}/{educationLessons.length} {t('পাঠ সম্পন্ন', 'lessons done')} ({progress}%)
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

      <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label={t('বিষয়', 'Subject')}>
        <button
          role="tab"
          aria-selected={subject === 'all'}
          onClick={() => setSubject('all')}
          className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
            subject === 'all' ? 'bg-brand-green-700 text-white' : 'bg-white text-stone-600 hover:bg-stone-100'
          }`}
        >
          {t('সব বিষয়', 'All subjects')}
        </button>
        {subjects.map((s) => (
          <button
            key={s.en}
            role="tab"
            aria-selected={subject === s.en}
            onClick={() => setSubject(s.en)}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              subject === s.en ? 'bg-brand-green-700 text-white' : 'bg-white text-stone-600 hover:bg-stone-100'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-3">
        {visible.map((lesson) => {
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
                    aria-label={`${lesson.title[lang]} ${t('সম্পন্ন হয়েছে', 'completed')}`}
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
                    <span className="rounded-full bg-brand-green-50 px-2 py-0.5 text-xs font-bold text-brand-green-800">
                      {lesson.subject[lang]}
                    </span>
                    <h2 className={`mt-1 font-bold ${done ? 'text-green-800' : 'text-stone-900'}`}>{lesson.title[lang]}</h2>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-stone-500">
                      <Clock size={14} /> {t('আনুমানিক', 'About')} {lesson.minutes} {t('মিনিট', 'min')}
                    </p>
                  </div>
                </div>
                {open ? <ChevronUp size={20} className="text-stone-500" /> : <ChevronDown size={20} className="text-stone-500" />}
              </button>

              {open && (
                <div className="border-t border-stone-100 px-5 pb-5 pt-4">
                  <p className="text-stone-700">{lesson.summary[lang]}</p>
                  <ul className="mt-4 space-y-3">
                    {lesson.points.map((point, i) => (
                      <li key={i} className="flex gap-3 rounded-xl bg-stone-50 p-4 text-sm leading-relaxed text-stone-700">
                        <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-green-700 text-xs font-bold text-white">
                          {i + 1}
                        </span>
                        {point[lang]}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => toggleComplete(lesson.id)} className={`mt-4 ${done ? 'btn-secondary' : 'btn-primary'}`}>
                    <CheckCircle2 size={17} />
                    {done
                      ? t('সম্পন্ন হয়েছে — আবার চালু করুন', 'Marked done — reopen')
                      : t('এই পাঠ সম্পন্ন করেছি', 'Mark this lesson done')}
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
