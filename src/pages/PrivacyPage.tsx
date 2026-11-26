import { useI18n } from '@/lib/i18n';

export default function PrivacyPage() {
  const { t } = useI18n();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-stone-900">{t('প্রাইভেসি পলিসি', 'Privacy Policy')}</h1>
      <p className="mt-2 text-sm text-stone-500">
        {t('সর্বশেষ হালনাগাদ: নভেম্বর ২০২৬', 'Last updated: November 2026')}
      </p>

      <div className="mt-8 space-y-6 leading-relaxed text-stone-700">
        <section>
          <h2 className="text-xl font-bold text-stone-900">{t('১. আমরা কী তথ্য রাখি', '1. What we collect')}</h2>
          <p className="mt-2">
            {t(
              'OpenType Bangladesh-এ অ্যাকাউন্ট খোলার প্রয়োজন নেই। আমরা কেবল দুই ধরনের তথ্য সংরক্ষণ করি: (ক) আপনি টাইপিং টেস্ট সেভ করলে আপনার দেওয়া নাম, টেস্টের ভাষা, সময়, গতি ও নির্ভুলতা; (খ) আপনি যোগাযোগ ফরম পূরণ করলে নাম, ইমেইল, বিষয় ও বার্তা।',
              'OpenType Bangladesh needs no account. We store only two kinds of data: (a) if you save a typing test — the name you typed, the language, duration, speed and accuracy; (b) if you use the contact form — your name, email, subject and message.'
            )}
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-stone-900">{t('২. যা আমরা কখনো চাই না', '2. What we never collect')}</h2>
          <p className="mt-2">
            {t(
              'আমরা ফোন নম্বর, ঠিকানা, জাতীয় পরিচয়পত্র, পাসওয়ার্ড বা কোনো সংবেদনশীল ব্যক্তিগত তথ্য চাই না এবং রাখি না। প্ল্যাটফর্মে কোনো বিজ্ঞাপন ট্র্যাকার নেই।',
              'We never ask for or store phone numbers, addresses, national ID numbers, passwords, or any sensitive personal data. The platform carries no advertising trackers.'
            )}
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-stone-900">{t('৩. তথ্য কীভাবে ব্যবহৃত হয়', '3. How data is used')}</h2>
          <p className="mt-2">
            {t(
              'টাইপিং ফলাফল লিডারবোর্ডে প্রকাশ্যে দেখানো হয় — তাই টেস্ট সেভ করার সময় প্রকাশ করতে না চাইলে আসল নাম না লিখে ডাকনাম ব্যবহার করুন। যোগাযোগ বার্তা কেবল উত্তর দেওয়ার জন্য ব্যবহৃত হয়; কখনো বিক্রি বা ভাগ করা হয় না।',
              'Typing results appear publicly on the leaderboard — use a nickname instead of your real name if you prefer. Contact messages are used only to reply to you and are never sold or shared.'
            )}
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-stone-900">{t('৪. ব্রাউজার সেটিংস', '4. Browser settings')}</h2>
          <p className="mt-2">
            {t(
              'আপনার প্রবেশগম্যতার সেটিংস (বড় লেখা, বৈসাদৃশ্য ইত্যাদি) ও ভাষা পছন্দ শুধু আপনার নিজ ব্রাউজারে সংরক্ষিত থাকে — সেগুলো আমাদের সার্ভারে যায় না।',
              'Your accessibility settings (large text, contrast, etc.) and language choice stay only in your own browser — they are never sent to our servers.'
            )}
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-stone-900">{t('৫. যোগাযোগ', '5. Contact')}</h2>
          <p className="mt-2">
            {t(
              'আপনার তথ্য নিয়ে প্রশ্ন থাকলে যোগাযোগ পেজ থেকে লিখুন — hello@opentypebd.org',
              'Questions about your data? Write to us from the Contact page — hello@opentypebd.org'
            )}
          </p>
        </section>
      </div>
    </div>
  );
}
