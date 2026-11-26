import { useState } from 'react';
import { Mail, Send, CheckCircle2, AlertCircle, MapPin, Phone, Clock } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useI18n } from '@/lib/i18n';

type SubmitState =
  | { status: 'idle' }
  | { status: 'sending' }
  | { status: 'sent' }
  | { status: 'error'; message: string };

export default function ContactPage() {
  const { t } = useI18n();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [state, setState] = useState<SubmitState>({ status: 'idle' });

  const valid =
    form.name.trim().length > 0 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()) &&
    form.subject.trim().length > 0 &&
    form.message.trim().length > 0;

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setState({ status: 'sending' });
    try {
      const { error } = await supabase.from('contact_messages').insert({
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      });
      if (error) throw error;
      setState({ status: 'sent' });
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setState({
        status: 'error',
        message: t(
          'বার্তা পাঠানো যায়নি। ইন্টারনেট সংযোগ দেখে আবার চেষ্টা করুন।',
          'Your message could not be sent. Check your connection and try again.'
        ),
      });
    }
  };

  const contactCards = [
    {
      icon: Mail,
      label: t('ইমেইল ঠিকানা', 'Email Address'),
      value: 'hello@opentypebd.org',
      href: 'mailto:hello@opentypebd.org',
      accent: 'bg-brand-green-100 text-brand-green-700',
    },
    {
      icon: Phone,
      label: t('ফোন নম্বর', 'Phone Number'),
      value: '+880 1712-345678',
      href: 'tel:+8801712345678',
      accent: 'bg-emerald-100 text-emerald-700',
    },
    {
      icon: MapPin,
      label: t('অবস্থান', 'Location'),
      value: t('ঢাকা, বাংলাদেশ', 'Dhaka, Bangladesh'),
      accent: 'bg-sky-100 text-sky-700',
    },
    {
      icon: Clock,
      label: t('উত্তর দেওয়ার সময়', 'Response Time'),
      value: t('সাধারণত ২৪-৪৮ ঘণ্টার মধ্যে', 'Usually within 24-48 hours'),
      accent: 'bg-brand-red-100 text-brand-red-700',
    },
  ];

  return (
    <div className="py-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <p className="section-label">{t('যোগাযোগ', 'Contact')}</p>
          <h1 className="mt-2 text-3xl font-extrabold text-stone-900 sm:text-4xl">{t('যোগাযোগ করুন', 'Contact Us')}</h1>
          <p className="mx-auto mt-3 max-w-2xl leading-relaxed text-stone-600">
            {t(
              'প্রশ্ন, পরামর্শ বা সহযোগিতার প্রস্তাব — ইমেইল, ফোন বা নিচের ফরম দিয়ে সরাসরি পাঠান। আমরা সব বার্তা পড়ি।',
              'Questions, suggestions or collaboration offers — reach us by email, phone or the form below. We read every one.'
            )}
          </p>
        </div>

        <section aria-label={t('যোগাযোগের তথ্য', 'Contact Information')} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contactCards.map((card) => {
            const content = (
              <>
                <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${card.accent}`}>
                  <card.icon size={22} />
                </span>
                <h2 className="mt-4 text-sm font-bold uppercase tracking-wide text-stone-500">{card.label}</h2>
                <p className="mt-1 break-all font-semibold text-stone-900">{card.value}</p>
              </>
            );
            return card.href ? (
              <a
                key={card.label}
                href={card.href}
                className="card block p-6 transition hover:-translate-y-1 hover:border-brand-green-200 hover:shadow-lg"
              >
                {content}
              </a>
            ) : (
              <div key={card.label} className="card p-6">
                {content}
              </div>
            );
          })}
        </section>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="card p-6 sm:p-8">
            <h2 className="text-xl font-extrabold text-stone-900">{t('বার্তা পাঠান', 'Send a message')}</h2>
            <p className="mt-1 text-sm text-stone-600">
              {t('ফরম পূরণ করুন — যত দ্রুত সম্ভব উত্তর দেওয়া হবে।', 'Fill in the form — we will reply as soon as possible.')}
            </p>

            {state.status === 'sent' ? (
              <div className="py-10 text-center" role="status" aria-live="polite">
                <CheckCircle2 size={48} className="mx-auto text-green-600" />
                <h3 className="mt-4 text-xl font-bold text-stone-900">{t('বার্তা পাঠানো হয়েছে', 'Message sent')}</h3>
                <p className="mt-2 text-stone-600">
                  {t('ধন্যবাদ! যত দ্রুত সম্ভব উত্তর দেওয়া হবে।', 'Thank you! We will reply as soon as possible.')}
                </p>
                <button onClick={() => setState({ status: 'idle' })} className="btn-secondary mt-6">
                  {t('আরেকটি বার্তা লিখুন', 'Write another message')}
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-6 space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="c-name" className="block text-sm font-semibold text-stone-700">
                      {t('আপনার নাম', 'Your name')} *
                    </label>
                    <input
                      id="c-name"
                      type="text"
                      required
                      maxLength={100}
                      value={form.name}
                      onChange={set('name')}
                      className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-2.5 focus:border-brand-green-600 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="c-email" className="block text-sm font-semibold text-stone-700">
                      {t('ইমেইল', 'Email')} *
                    </label>
                    <input
                      id="c-email"
                      type="email"
                      required
                      maxLength={200}
                      value={form.email}
                      onChange={set('email')}
                      className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-2.5 focus:border-brand-green-600 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="c-subject" className="block text-sm font-semibold text-stone-700">
                    {t('বিষয়', 'Subject')} *
                  </label>
                  <input
                    id="c-subject"
                    type="text"
                    required
                    maxLength={150}
                    value={form.subject}
                    onChange={set('subject')}
                    className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-2.5 focus:border-brand-green-600 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="c-message" className="block text-sm font-semibold text-stone-700">
                    {t('বার্তা', 'Message')} *
                  </label>
                  <textarea
                    id="c-message"
                    required
                    rows={5}
                    maxLength={5000}
                    value={form.message}
                    onChange={set('message')}
                    className="mt-1.5 w-full rounded-xl border border-stone-300 px-4 py-2.5 focus:border-brand-green-600 focus:outline-none"
                  />
                </div>

                {state.status === 'error' && (
                  <p className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700" role="alert">
                    <AlertCircle size={17} /> {state.message}
                  </p>
                )}

                <button type="submit" disabled={!valid || state.status === 'sending'} className="btn-primary w-full sm:w-auto">
                  <Send size={17} />
                  {state.status === 'sending' ? t('পাঠানো হচ্ছে…', 'Sending…') : t('বার্তা পাঠান', 'Send message')}
                </button>
              </form>
            )}
          </div>

          <aside className="space-y-6">
            <div className="relative overflow-hidden rounded-3xl bg-stone-900 p-6 text-white sm:p-8">
              <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-brand-green-600/30 blur-2xl" aria-hidden="true" />
              <h2 className="relative text-lg font-extrabold">{t('সরাসরি যোগাযোগ', 'Get in touch directly')}</h2>
              <a
                href="mailto:hello@opentypebd.org"
                className="relative mt-5 flex items-start gap-3 rounded-2xl bg-white/5 p-4 transition hover:bg-white/10"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-green-600">
                  <Mail size={18} />
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-wide text-stone-400">{t('ইমেইল ঠিকানা', 'Email Address')}</span>
                  <span className="mt-0.5 block break-all font-semibold">hello@opentypebd.org</span>
                </span>
              </a>
              <a
                href="tel:+8801712345678"
                className="relative mt-3 flex items-start gap-3 rounded-2xl bg-white/5 p-4 transition hover:bg-white/10"
              >
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-brand-red-600">
                  <Phone size={18} />
                </span>
                <span>
                  <span className="block text-xs font-bold uppercase tracking-wide text-stone-400">{t('ফোন নম্বর', 'Phone Number')}</span>
                  <span className="mt-0.5 block font-semibold">+880 1712-345678</span>
                  <span className="mt-0.5 block text-xs text-stone-400">{t('শনি-বৃহস্পতি, সকাল ১০টা - বিকাল ৫টা', 'Sat-Thu, 10 AM - 5 PM')}</span>
                </span>
              </a>
              <p className="relative mt-5 flex items-center gap-2.5 text-sm text-stone-300">
                <MapPin size={16} className="flex-shrink-0 text-brand-red-400" /> {t('ঢাকা, বাংলাদেশ', 'Dhaka, Bangladesh')}
              </p>
            </div>

            <div className="card p-6">
              <h2 className="font-extrabold text-stone-900">{t('কখন উত্তর পাবেন?', 'When will you hear back?')}</h2>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                {t(
                  'ইমেইল ও ফরমের বার্তার উত্তর সাধারণত ২৪-৪৮ ঘণ্টার মধ্যে দেওয়া হয়। জরুরি হলে ফোন করুন — কার্যদিবসে সকাল ১০টা থেকে বিকাল ৫টা পর্যন্ত ধরা যাবে।',
                  'Email and form messages usually get a reply within 24-48 hours. In a hurry? Call us — we answer from 10 AM to 5 PM on working days.'
                )}
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
