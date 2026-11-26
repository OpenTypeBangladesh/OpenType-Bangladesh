import { useMemo, useState } from 'react';
import { Briefcase, RotateCcw, CheckCircle2, XCircle, Keyboard } from 'lucide-react';
import { jobCategories, jobQuestionBank } from '@/data/jobPrep';
import { useI18n } from '@/lib/i18n';

export default function JobPrepPage() {
  const { t, lang } = useI18n();
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const questions = useMemo(() => (categoryId ? jobQuestionBank[categoryId] ?? [] : []), [categoryId]);
  const score = questions.reduce((sum, q, i) => sum + (answers[i] === q.answer ? 1 : 0), 0);

  const startQuiz = (id: string) => {
    setCategoryId(id);
    setAnswers({});
    setSubmitted(false);
  };

  if (!categoryId) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-3xl font-bold text-stone-900">{t('চাকরির প্রস্তুতি', 'Job Preparation')}</h1>
        <p className="mt-2 text-stone-600">
          {t(
            'সরকারি ও বেসরকারি চাকরির পদ অনুযায়ী MCQ অনুশীলন ও মক টেস্ট — প্রতিটি উত্তরের ব্যাখ্যাসহ।',
            'MCQ practice and mock tests by job role, with an explanation for every answer.'
          )}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {jobCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => startQuiz(cat.id)}
              className="card group p-6 text-left transition hover:-translate-y-1 hover:border-brand-red-300 hover:shadow-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green-50 text-brand-green-700 transition group-hover:bg-brand-green-700 group-hover:text-white">
                <Briefcase size={24} />
              </span>
              <h2 className="mt-4 font-bold text-stone-900">{cat.name[lang]}</h2>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{cat.description[lang]}</p>
              <p className="mt-4 text-sm font-semibold text-brand-green-700">
                {jobQuestionBank[cat.id]?.length ?? 0} {t('টি প্রশ্ন অনুশীলন করুন', ' questions to practice')}
              </p>
            </button>
          ))}
        </div>

        <div className="card mt-8 flex flex-col items-start gap-4 border-brand-red-300 p-6 sm:flex-row sm:items-center">
          <span className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-brand-green-700 text-white">
            <Keyboard size={24} />
          </span>
          <div className="flex-1">
            <h2 className="font-bold text-stone-900">{t('টাইপিং টেস্টও দিন', 'Also take the typing test')}</h2>
            <p className="mt-1 text-sm text-stone-600">
              {t(
                'কম্পিউটার অপারেটর ও টাইপিস্ট পদের লিখিত পরীক্ষায় টাইপিং গতি ও নির্ভুলতা বাধ্যতামূলক — টাইপিং একাডেমিতে ৫ ও ১০ মিনিটের টেস্ট দিন।',
                'Computer Operator and Typist exams require a live typing test — try the 5 and 10-minute tests in the Typing Academy.'
              )}
            </p>
          </div>
        </div>
      </div>
    );
  }

  const category = jobCategories.find((c) => c.id === categoryId)!;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <button onClick={() => setCategoryId(null)} className="mb-4 text-sm font-semibold text-brand-green-700 hover:underline">
        ← {t('সব পদ', 'All roles')}
      </button>
      <h1 className="text-2xl font-bold text-stone-900">{category.name[lang]}</h1>

      {submitted && (
        <div className="card mt-6 border-brand-red-300 p-6 text-center" role="status" aria-live="polite">
          <div className="text-5xl font-bold text-brand-green-800">
            {score}/{questions.length}
          </div>
          <p className="mt-2 font-semibold text-stone-700">
            {score === questions.length
              ? t('অসাধারণ! পুরোপুরি সঠিক।', 'Outstanding — all correct!')
              : score >= questions.length / 2
                ? t('ভালো করেছেন — আরেকবার অনুশীলন করলে আরও ভালো হবে।', 'Good work — one more round will make it better.')
                : t('ব্যাখ্যাগুলো পড়ে আবার চেষ্টা করুন।', 'Read the explanations and try again.')}
          </p>
          <button onClick={() => startQuiz(categoryId)} className="btn-primary mt-5">
            <RotateCcw size={17} /> {t('আবার মক টেস্ট', 'Retake mock test')}
          </button>
        </div>
      )}

      <div className="mt-6 space-y-4">
        {questions.map((q, qi) => {
          const userAnswer = answers[qi];
          return (
            <article key={qi} className="card p-5">
              <h2 className="font-semibold leading-relaxed text-stone-900">
                {qi + 1}. {q.q[lang]}
              </h2>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {q.options.map((opt, oi) => {
                  const selected = userAnswer === oi;
                  const isCorrect = submitted && oi === q.answer;
                  const isWrong = submitted && selected && oi !== q.answer;
                  return (
                    <button
                      key={oi}
                      disabled={submitted}
                      onClick={() => setAnswers((a) => ({ ...a, [qi]: oi }))}
                      aria-pressed={selected}
                      className={`flex items-center gap-2 rounded-xl border-2 px-4 py-2.5 text-left text-sm font-medium transition ${
                        isCorrect
                          ? 'border-green-500 bg-green-50 text-green-900'
                          : isWrong
                            ? 'border-red-400 bg-red-50 text-red-800'
                            : selected
                              ? 'border-brand-green-600 bg-brand-green-50 text-brand-green-900'
                              : 'border-stone-200 hover:border-brand-green-400'
                      }`}
                    >
                      {isCorrect ? (
                        <CheckCircle2 size={17} className="flex-shrink-0 text-green-600" />
                      ) : isWrong ? (
                        <XCircle size={17} className="flex-shrink-0 text-red-500" />
                      ) : (
                        <span
                          className={`flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full border-2 ${
                            selected ? 'border-brand-green-600' : 'border-stone-300'
                          }`}
                        >
                          {selected && <span className="h-2 w-2 rounded-full bg-brand-green-600" />}
                        </span>
                      )}
                      {opt[lang]}
                    </button>
                  );
                })}
              </div>
              {submitted && (
                <p className="mt-3 rounded-xl bg-stone-50 p-3 text-sm leading-relaxed text-stone-700">
                  <span className="font-bold">{t('ব্যাখ্যা: ', 'Explanation: ')}</span>
                  {q.explain[lang]}
                </p>
              )}
            </article>
          );
        })}
      </div>

      {!submitted && (
        <button
          onClick={() => setSubmitted(true)}
          disabled={Object.keys(answers).length < questions.length}
          className="btn-primary mt-8 w-full"
        >
          {t('জবাব জমা দিন', 'Submit answers')} ({Object.keys(answers).length}/{questions.length})
        </button>
      )}
    </div>
  );
}
