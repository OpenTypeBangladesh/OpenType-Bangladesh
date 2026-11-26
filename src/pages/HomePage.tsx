import { useEffect, useState } from 'react';
import { Keyboard, Monitor, GraduationCap, Accessibility, Trophy, ArrowRight, CheckCircle2, BookOpen, Briefcase, Sparkles, Zap, Target, Megaphone, Mail, MapPin, Loader2 } from 'lucide-react';
import type { PageId } from '@/components/Navbar';
import { computerLessons } from '@/data/computerLessons';
import { educationLessons } from '@/data/educationLessons';
import { useI18n } from '@/lib/i18n';
import { fetchNews, sendContactMessage } from '@/lib/supabase';
import type { NewsPost } from '@/lib/supabase';

interface Props {
  onNavigate: (page: PageId) => void;
}

const missionPoints = [
  {
    bn: 'প্রতিটি পাঠ, প্রতিটি টেস্ট — সম্পূর্ণ ফ্রি। কোনো পেইড প্ল্যান নেই, কখনোই না।',
    en: 'Every lesson, every test — completely free. No paid plans, ever.',
  },
  {
    bn: 'শহর বা গ্রাম, সুবিধাসম্পন্ন বা সুবিধাবঞ্চিত — সবার জন্য সমান সুযোগ।',
    en: 'Urban or rural, privileged or not — equal opportunity for everyone.',
  },
  {
    bn: 'প্রতিবন্ধী শিক্ষার্থীদের জন্য প্রবেশগম্যতা একটি বৈশিষ্ট্য নয়, মূল প্রতিশ্রুতি।',
    en: 'Accessibility for disabled learners is not a feature — it is a core promise.',
  },
];

function MissionSection() {
  const { t } = useI18n();
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <p className="section-label">{t('আমাদের মিশন', 'Our Mission')}</p>
            <h2 className="mt-2 text-3xl font-extrabold leading-snug text-stone-900 sm:text-4xl">
              {t(
                'শিক্ষাকে করে তোলা সবার নাগালে',
                'Putting education within everyone\u2019s reach'
              )}
            </h2>
            <p className="mt-4 leading-relaxed text-stone-600">
              {t(
                'OpenType Bangladesh-এর মিশন একটাই — টাইপিং ও কম্পিউটার দক্ষতাকে বিনা খরচে, সহজ ভাষায়, সবার হাতে পৌঁছে দেওয়া।',
                'Our mission is simple — bring typing and computer skills to everyone at zero cost, in plain language.'
              )}
            </p>
          </div>
          <ul className="space-y-4">
            {missionPoints.map((point, i) => (
              <li key={i} className="flex gap-4 rounded-2xl border border-stone-100 bg-stone-50 p-5 transition hover:border-brand-green-200 hover:bg-brand-green-50/60">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-brand-green-600 text-white">
                  <Target size={17} />
                </span>
                <p className="leading-relaxed text-stone-700">{t(point.bn, point.en)}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function NewsSection() {
  const { t, lang } = useI18n();
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [state, setState] = useState<'loading' | 'ok' | 'error'>('loading');

  useEffect(() => {
    let cancelled = false;
    fetchNews(3)
      .then((data) => {
        if (!cancelled) {
          setPosts(data);
          setState('ok');
        }
      })
      .catch(() => {
        if (!cancelled) setState('error');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <p className="section-label text-center">{t('খবর ও হালনাগাদ', 'News & Updates')}</p>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-stone-900 sm:text-4xl">
          {t('যা নতুন হচ্ছে এখানে', 'What\u2019s new on the platform')}
        </h2>

        {state === 'loading' && (
          <p className="mt-12 flex items-center justify-center gap-2 text-stone-500" aria-busy="true">
            <Loader2 size={20} className="animate-spin" /> {t('খবর লোড হচ্ছে…', 'Loading news…')}
          </p>
        )}

        {state === 'error' && (
          <p className="mx-auto mt-12 max-w-md rounded-2xl bg-white p-6 text-center text-stone-600 shadow-sm" role="alert">
            {t('এই মুহূর্তে খবর দেখানো যাচ্ছে না। কিছুক্ষণ পর আবার চেষ্টা করুন।', 'News cannot be shown right now. Please try again later.')}
          </p>
        )}

        {state === 'ok' && (
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {posts.map((post, i) => (
              <article
                key={post.id}
                className="card animate-fade-up p-6 transition hover:-translate-y-1 hover:shadow-lg"
                style={{ animationDelay: `${0.08 * i}s` }}
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="chip bg-brand-green-100 text-brand-green-700">{lang === 'bn' ? post.tag_bn : post.tag_en}</span>
                  <time dateTime={post.published_at} className="text-xs text-stone-500">
                    {formatDate(post.published_at)}
                  </time>
                </div>
                <h3 className="mt-3 font-extrabold leading-snug text-stone-900">{lang === 'bn' ? post.title_bn : post.title_en}</h3>
                <p className="mt-2 text-sm leading-relaxed text-stone-600">{lang === 'bn' ? post.body_bn : post.body_en}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ContactSection({ onNavigate }: { onNavigate: (page: PageId) => void }) {
  const { t } = useI18n();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const valid =
    form.name.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) &&
    form.message.trim().length > 0;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setState('sending');
    try {
      await sendContactMessage({
        name: form.name.trim(),
        email: form.email.trim(),
        subject: t('হোমপেজ থেকে বার্তা', 'Message from homepage'),
        message: form.message.trim(),
      });
      setState('sent');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setState('error');
    }
  };

  return (
    <section className="pb-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-[2rem] bg-stone-900 p-8 text-white sm:p-12">
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-brand-green-600/30 blur-3xl" />
            <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-brand-green-500/20 blur-3xl" />
          </div>

          <div className="relative grid gap-10 lg:grid-cols-2">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-widest text-brand-red-500">{t('যোগাযোগ', 'Contact')}</p>
              <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">{t('কিছু জানতে চান?', 'Got a question?')}</h2>
              <p className="mt-4 leading-relaxed text-stone-300">
                {t(
                  'প্রশ্ন, পরামর্শ বা সহযোগিতার প্রস্তাব — সরাসরি লিখে পাঠান। আমরা সব বার্তা পড়ি এবং যত দ্রুত সম্ভব উত্তর দিই।',
                  'Questions, suggestions or collaboration offers — send them over. We read every message and reply as fast as we can.'
                )}
              </p>
              <div className="mt-6 space-y-3 text-sm text-stone-300">
                <p className="flex items-center gap-2.5">
                  <Mail size={17} className="text-brand-red-500" /> hello@opentypebd.org
                </p>
                <p className="flex items-center gap-2.5">
                  <MapPin size={17} className="text-brand-red-500" /> {t('ঢাকা, বাংলাদেশ', 'Dhaka, Bangladesh')}
                </p>
              </div>
              <button
                onClick={() => onNavigate('contact')}
                className="mt-7 inline-flex items-center gap-1.5 text-sm font-extrabold text-brand-red-500 hover:text-brand-red-300"
              >
                {t('বিস্তারিত যোগাযোগ পেজ', 'Full contact page')} <ArrowRight size={15} />
              </button>
            </div>

            <div>
              {state === 'sent' ? (
                <div className="flex h-full min-h-64 flex-col items-center justify-center rounded-3xl bg-white/5 p-8 text-center backdrop-blur" role="status" aria-live="polite">
                  <CheckCircle2 size={44} className="text-green-400" />
                  <h3 className="mt-4 text-xl font-extrabold">{t('বার্তা পাঠানো হয়েছে', 'Message sent')}</h3>
                  <p className="mt-2 text-sm text-stone-300">{t('ধন্যবাদ! শীঘ্রই উত্তর পাবেন।', 'Thank you! You will hear back soon.')}</p>
                  <button onClick={() => setState('idle')} className="mt-5 text-sm font-bold text-brand-red-500 hover:text-brand-red-300">
                    {t('আরেকটি বার্তা', 'Another message')}
                  </button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-3 rounded-3xl bg-white/5 p-6 backdrop-blur">
                  <input
                    type="text"
                    required
                    maxLength={100}
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder={t('আপনার নাম', 'Your name')}
                    aria-label={t('আপনার নাম', 'Your name')}
                    className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-stone-400 focus:border-brand-red-500 focus:outline-none"
                  />
                  <input
                    type="email"
                    required
                    maxLength={200}
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder={t('ইমেইল', 'Email')}
                    aria-label={t('ইমেইল', 'Email')}
                    className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-stone-400 focus:border-brand-red-500 focus:outline-none"
                  />
                  <textarea
                    required
                    rows={4}
                    maxLength={5000}
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder={t('আপনার বার্তা', 'Your message')}
                    aria-label={t('আপনার বার্তা', 'Your message')}
                    className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white placeholder:text-stone-400 focus:border-brand-red-500 focus:outline-none"
                  />
                  {state === 'error' && (
                    <p className="rounded-xl bg-red-500/20 px-4 py-2.5 text-sm font-semibold text-red-200" role="alert">
                      {t('পাঠানো যায়নি — আবার চেষ্টা করুন।', 'Could not send — please try again.')}
                    </p>
                  )}
                  <button type="submit" disabled={!valid || state === 'sending'} className="btn-primary w-full">
                    {state === 'sending' ? t('পাঠানো হচ্ছে…', 'Sending…') : t('বার্তা পাঠান', 'Send message')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage({ onNavigate }: Props) {
  const { t } = useI18n();

  const features = [
    {
      icon: Keyboard,
      title: t('টাইপিং একাডেমি', 'Typing Academy'),
      desc: t(
        'বাংলা ও ইংরেজি টাইপিং অনুশীলন, ১/২/৫/১০ মিনিটের টেস্ট, WPM ও নির্ভুলতা পরিমাপ।',
        'Bangla and English typing practice, 1/2/5/10-minute tests, WPM and accuracy measurement.'
      ),
      page: 'lessons' as PageId,
      accent: 'bg-brand-green-100 text-brand-green-700 group-hover:bg-brand-green-600',
    },
    {
      icon: Monitor,
      title: t('কম্পিউটার একাডেমি', 'Computer Academy'),
      desc: t(
        'হার্ডওয়্যার-সফটওয়্যার, শর্টকাট, MS Word-Excel-PowerPoint ও ডিজিটাল নিরাপত্তা।',
        'Hardware and software, shortcuts, MS Word, Excel, PowerPoint and digital safety.'
      ),
      page: 'computer' as PageId,
      accent: 'bg-sky-100 text-sky-700 group-hover:bg-sky-600',
    },
    {
      icon: BookOpen,
      title: t('শিক্ষা একাডেমি', 'Education Academy'),
      desc: t(
        'বাংলা, ইংরেজি, গণিত, বিজ্ঞান ও সাধারণ জ্ঞান — বাংলাদেশ ও আন্তর্জাতিক বিষয়াবলিসহ।',
        'Bangla, English, math, science and general knowledge — including Bangladesh and world affairs.'
      ),
      page: 'education' as PageId,
      accent: 'bg-emerald-100 text-emerald-700 group-hover:bg-emerald-600',
    },
    {
      icon: Briefcase,
      title: t('চাকরির প্রস্তুতি', 'Job Preparation'),
      desc: t(
        'কম্পিউটার অপারেটর, অফিস সহকারি, ডেটা এন্ট্রি অপারেটর — MCQ ও মক টেস্ট।',
        'Computer Operator, Office Assistant, Data Entry Operator — MCQs and mock tests.'
      ),
      page: 'jobprep' as PageId,
      accent: 'bg-rose-100 text-rose-700 group-hover:bg-rose-600',
    },
  ];

  return (
    <div>
      <section className="relative overflow-hidden bg-brand-green-800 text-white">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -left-24 top-10 h-72 w-72 rounded-full bg-brand-green-600/40 blur-3xl" />
          <div className="absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-brand-green-500/30 blur-3xl" />
          <div className="absolute left-1/3 top-1/2 h-40 w-40 rounded-full bg-brand-red-500/20 blur-2xl" />
        </div>

        <div className="relative mx-auto max-w-6xl px-4 pb-24 pt-20 text-center sm:pb-28 sm:pt-24">
          <span className="inline-flex animate-fade-up items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-bold backdrop-blur">
            <Sparkles size={16} className="text-brand-red-500" />
            {t('১০০% ফ্রি — কোনো রেজিস্ট্রেশন লাগে না', '100% free — no registration needed')}
          </span>

          <h1 className="mx-auto mt-7 max-w-4xl animate-fade-up text-4xl font-extrabold leading-snug sm:text-6xl sm:leading-snug">
            {t(
              'টাইপিং শিখুন,',
              'Learn typing,'
            )}{' '}
            <span className="bg-gradient-to-r from-brand-green-600 via-brand-green-700 to-brand-green-800 bg-clip-text text-transparent">
              {t('দক্ষ হোন', 'get skilled')}
            </span>{' '}
            {t('— সম্পূর্ণ বাংলায়', '— fully in your language')}
            <span className="ml-2 inline-block h-10 w-1 animate-blink rounded bg-brand-red-500 sm:h-14" aria-hidden="true" />
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-stone-300">
            {t(
              'টাইপিং, কম্পিউটার শিক্ষা, সাধারণ শিক্ষা ও চাকরির প্রস্তুতি — সব এক জায়গায়, প্রতিবন্ধী ব্যবহারকারীদের প্রবেশগম্যতাসহ।',
              'Typing, computer education, general education and job prep — all in one place, accessible to disabled users.'
            )}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <button onClick={() => onNavigate('lessons')} className="btn-primary">
              {t('শেখা শুরু করুন', 'Start learning')} <ArrowRight size={18} />
            </button>
            <button onClick={() => onNavigate('test')} className="btn-ghost-light">
              <Zap size={18} className="text-brand-red-500" /> {t('টাইপিং টেস্ট দিন', 'Take a typing test')}
            </button>
          </div>

          <div className="mx-auto mt-14 grid max-w-3xl grid-cols-3 gap-4">
            {[
              { n: '10+', l: t('টাইপিং পাঠ', 'typing lessons') },
              { n: '10+', l: t('শিক্ষামূলক মডিউল', 'learning modules') },
              { n: t('১০০%', '100%'), l: t('ফ্রি', 'free') },
            ].map((s, i) => (
              <div
                key={s.l}
                className="animate-fade-up rounded-3xl border border-white/10 bg-white/5 px-4 py-6 backdrop-blur"
                style={{ animationDelay: `${0.15 * i}s` }}
              >
                <div className="text-3xl font-extrabold text-brand-red-500 sm:text-4xl">{s.n}</div>
                <div className="mt-1 text-sm text-stone-300">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 h-8 bg-brand-green-50/40 [clip-path:polygon(0_100%,100%_100%,0_0)]" aria-hidden="true" />
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
        <p className="section-label text-center">{t('যা যা পাবেন', 'What you get')}</p>
        <h2 className="mt-2 text-center text-3xl font-extrabold text-stone-900 sm:text-4xl">
          {t('চারটি একাডেমি, একটি প্ল্যাটফর্ম', 'Four academies, one platform')}
        </h2>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <button
              key={f.title}
              onClick={() => onNavigate(f.page)}
              className="card group p-6 text-left transition hover:-translate-y-2 hover:shadow-xl"
              style={{ animationDelay: `${0.1 * i}s` }}
            >
              <span className={`flex h-14 w-14 items-center justify-center rounded-2xl transition group-hover:text-white ${f.accent}`}>
                <f.icon size={26} />
              </span>
              <h3 className="mt-4 text-lg font-extrabold text-stone-900">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">{f.desc}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-extrabold text-brand-green-600">
                {t('শুরু করুন', 'Start')} <ArrowRight size={15} className="transition group-hover:translate-x-1.5" />
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 sm:pb-20">
        <div className="card relative overflow-hidden p-8 sm:p-12">
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-brand-green-100 blur-2xl" aria-hidden="true" />
          <div className="relative grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="flex h-14 w-14 animate-float items-center justify-center rounded-2xl bg-brand-green-600 text-white shadow-lg shadow-brand-green-600/30">
                <Accessibility size={28} />
              </span>
              <h2 className="mt-5 text-3xl font-extrabold text-stone-900">{t('সবার জন্য উন্মুক্ত', 'Open to everyone')}</h2>
              <p className="mt-4 leading-relaxed text-stone-600">
                {t(
                  'প্রতিবন্ধী ব্যবহারকারীদের কথা মাথায় রেখে তৈরি — বড় লেখা, উচ্চ বৈসাদৃশ্য, ডিসলেক্সিয়া-বান্ধব ফন্ট ফাঁক, অ্যানিমেশন কমানো ও স্ক্রিন রিডার সহায়তা। পায়ের কাছের "প্রবেশগম্যতা" বোতাম থেকে সব নিজের মতো সাজিয়ে নিন।',
                  'Built with disabled users in mind — large text, high contrast, dyslexia-friendly spacing, reduced motion and screen reader support. Set it all from the "Accessibility" button at the bottom left.'
                )}
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: Trophy, label: t('লাইভ লিডারবোর্ড', 'Live leaderboard'), desc: t('সেরা টাইপিস্টদের সাথে তুলনা করুন', 'Compare with top typists') },
                { icon: GraduationCap, label: t('মক টেস্ট', 'Mock tests'), desc: t('প্রতিটি উত্তরের ব্যাখ্যাসহ', 'Explanation for every answer') },
                { icon: Zap, label: t('বাস্তব টেস্ট', 'Real tests'), desc: t('১-১০ মিনিটের টাইমারসহ', 'With 1-10 minute timers') },
                { icon: BookOpen, label: t('সহজ ভাষা', 'Plain language'), desc: t('সহজ বাংলা ও ইংরেজিতে', 'In simple Bangla and English') },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl bg-stone-50 p-5 transition hover:bg-brand-green-50">
                  <item.icon size={20} className="text-brand-green-600" />
                  <h3 className="mt-2 font-extrabold text-stone-900">{item.label}</h3>
                  <p className="mt-1 text-sm text-stone-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <MissionSection />

      <NewsSection />

      <ContactSection onNavigate={onNavigate} />

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-green-600 via-brand-green-500 to-brand-red-500 px-6 py-14 text-center text-white">
          <div className="pointer-events-none absolute inset-0 opacity-20" aria-hidden="true">
            <div className="absolute left-10 top-8 h-24 w-24 rounded-full bg-white/30 blur-2xl" />
            <div className="absolute bottom-6 right-12 h-32 w-32 rounded-full bg-white/20 blur-2xl" />
          </div>
          <h2 className="relative text-3xl font-extrabold sm:text-4xl">{t('আজই শেখা শুরু করুন', 'Start learning today')}</h2>
          <p className="relative mx-auto mt-3 max-w-xl text-brand-green-50">
            {t(
              `${computerLessons.length}টি কম্পিউটার মডিউল, ${educationLessons.length}টি শিক্ষা পাঠ আর অসংখ্য টাইপিং অনুশীলন — সবই ফ্রি, সবসময়।`,
              `${computerLessons.length} computer modules, ${educationLessons.length} education lessons and endless typing practice — all free, always.`
            )}
          </p>
          <button onClick={() => onNavigate('lessons')} className="btn-primary relative mt-7 bg-white !text-brand-green-700 shadow-xl hover:!bg-brand-green-50">
            {t('ফ্রি শিখুন', 'Learn for free')} <ArrowRight size={18} />
          </button>
          <p className="relative mt-5 flex items-center justify-center gap-2 text-sm font-semibold text-brand-green-100">
            <CheckCircle2 size={16} /> {t('কোনো পেইড প্ল্যান নেই, কখনোই না', 'No paid plans, ever')}
          </p>
        </div>
      </section>
    </div>
  );
}
