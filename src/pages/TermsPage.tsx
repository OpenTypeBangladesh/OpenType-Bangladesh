import { useI18n } from '@/lib/i18n';

export default function TermsPage() {
  const { t } = useI18n();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-stone-900">{t('শর্তাবলি ও নীতিমালা', 'Terms and Conditions')}</h1>
      <p className="mt-2 text-sm text-stone-500">
        {t('সর্বশেষ হালনাগাদ: নভেম্বর ২০২৬', 'Last updated: November 2026')}
      </p>

      <div className="mt-8 space-y-6 leading-relaxed text-stone-700">
        <section>
          <h2 className="text-xl font-bold text-stone-900">{t('১. পরিষেবার ধরন', '1. Nature of the service')}</h2>
          <p className="mt-2">
            {t(
              'OpenType Bangladesh একটি ফ্রি শিক্ষামূলক ওয়েবসাইট। টাইপিং অনুশীলন, পাঠ ও MCQ অনুশীলন ব্যবহারের জন্য কোনো অর্থ দিতে হয় না। এই সংস্করণে কোনো পেইড ফিচার নেই।',
              'OpenType Bangladesh is a free educational website. No payment is required to use the typing practice, lessons or MCQ quizzes. There are no paid features in this version.'
            )}
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-stone-900">{t('২. ব্যবহারের শর্ত', '2. Acceptable use')}</h2>
          <p className="mt-2">
            {t(
              'প্ল্যাটফর্মটি ব্যক্তিগত শেখার জন্য মুক্ত। তবে সার্ভারে ক্ষতিকর কার্যক্রম, স্বয়ংক্রিয় বট দিয়ে অনুচিত অনুরোধ, বা অন্যদের বিভ্রান্তিকর নাম ও বার্তা পাঠানো নিষিদ্ধ।',
              'The platform is open for personal learning. Abusing the server, sending automated excessive requests, or submitting misleading names and messages is not allowed.'
            )}
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-stone-900">{t('৩. শিক্ষাউপকরণের সীমা', '3. Scope of the materials')}</h2>
          <p className="mt-2">
            {t(
              'পাঠ ও প্রশ্নগুলো শিক্ষার্থীদের সহায়তার জন্য যত্ন নিয়ে তৈরি, তবে এগুলো কোনো সরকারি পরীক্ষার অফিসিয়াল সিলেবাস বা নিশ্চিত ফলাফলের নিশ্চয়তা নয়। পরীক্ষার আগে অফিসিয়াল সূত্রও যাচাই করুন।',
              'Lessons and questions are carefully made to support learners, but they are not an official syllabus of any government exam nor a guarantee of results. Verify with official sources before exams.'
            )}
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-stone-900">{t('৪. দায়বদ্ধতার সীমা', '4. Limitation of liability')}</h2>
          <p className="mt-2">
            {t(
              'ওয়েবসাইটটি "যেমন আছে তেমন" সেবা দেয়। সাময়িক বিঘ্ন, ত্রুটি বা তথ্যের অসঙ্গতির জন্য আমরা আইনগতভাবে দায়ী থাকব না, যদিও ত্রুটি জানালে দ্রুত ঠিক করার চেষ্টা করব।',
              'The website is provided "as is". We are not legally liable for temporary interruptions, errors or inconsistencies, though we fix reported problems quickly.'
            )}
          </p>
        </section>
        <section>
          <h2 className="text-xl font-bold text-stone-900">{t('৫. ভবিষ্যৎ পরিবর্তন', '5. Future changes')}</h2>
          <p className="mt-2">
            {t(
              'নতুন ফিচার যোগ হওয়ার সাথে সাথে শর্তাবলি হালনাগাদ হতে পারে। গুরুত্বপূর্ণ পরিবর্তন এই পেজে প্রকাশ করা হবে।',
              'These terms may be updated as new features arrive. Important changes will be published on this page.'
            )}
          </p>
        </section>
      </div>
    </div>
  );
}
