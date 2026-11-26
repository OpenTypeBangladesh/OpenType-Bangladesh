import { Target, Heart, Users, ShieldCheck, Accessibility } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

export default function AboutPage() {
  const { t } = useI18n();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-stone-900">{t('আমাদের সম্পর্কে', 'About Us')}</h1>

      <div className="mt-6 card p-6">
        <p className="leading-relaxed text-stone-700">
          {t(
            'OpenType Bangladesh একটি ফ্রি অনলাইন শিক্ষা প্ল্যাটফর্ম — যেখানে বাংলা ও ইংরেজি টাইপিং, কম্পিউটার শিক্ষা, সাধারণ শিক্ষা এবং বাংলাদেশের চাকরির পরীক্ষার প্রস্তুতি এক জায়গায় পাওয়া যায়। আমাদের লক্ষ্য সহজ: যে কোনো মানুষ, যেখান থেকেই, বিনা খরচে ডিজিটাল দক্ষতা অর্জন করতে পারবেন।',
            'OpenType Bangladesh is a free online learning platform where Bangla and English typing, computer education, general education and Bangladesh job exam preparation live in one place. Our goal is simple: anyone, from anywhere, can build digital skills at zero cost.'
          )}
        </p>
        <p className="mt-4 leading-relaxed text-stone-700">
          {t(
            'প্রথম সংস্করণটি সম্পূর্ণ ফ্রি। ভবিষ্যতে ধাপে ধাপে নতুন ফিচার যোগ হবে, তবে শিক্ষার্থীদের জন্য মূল পাঠগুলো চিরকাল ফ্রি থাকবে — এটাই আমাদের প্রতিশ্রুতি।',
            'This first version is completely free. New features will arrive over time, but the core lessons will stay free for learners — that is our promise.'
          )}
        </p>
      </div>

      <div className="card mt-6 border-brand-green-200 p-6">
        <h2 className="flex items-center gap-2 text-xl font-bold text-stone-900">
          <Users size={22} className="text-brand-green-700" /> {t('প্রতিষ্ঠাতা', 'Founder')}
        </h2>
        <p className="mt-3 font-semibold text-stone-900">Biplob Sharma</p>
        <p className="mt-2 leading-relaxed text-stone-600">
          {t(
            'Biplob Sharma, একজন শিক্ষাপ্রেমী, প্ল্যাটফর্মটি প্রতিষ্ঠা করেছেন এই বিশ্বাসে যে টাইপিং ও কম্পিউটার দক্ষতা সবার মৌলিক অধিকার — শহর বা গ্রাম, সুবিধাসম্পন্ন বা সুবিধাবঞ্চিত, সবার জন্য সমান সুযোগ হওয়া উচিত।',
            'Biplob Sharma, an education advocate, founded this platform on the belief that typing and computer skills are a basic right — equally available to everyone, urban or rural, privileged or not.'
          )}
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {[
          {
            icon: Target,
            title: t('আমাদের লক্ষ্য', 'Our goal'),
            desc: t(
              'প্রতিটি শিক্ষার্থীর হাতে চাকরিযোগ্য ডিজিটাল দক্ষতা পৌঁছে দেওয়া — ফ্রি, সহজ ভাষায়, বাংলা-ইংরেজি দুই ভাষায়।',
              'Put job-ready digital skills in every learner\u2019s hands — free, in plain language, in both Bangla and English.'
            ),
          },
          {
            icon: Heart,
            title: t('ফ্রি-প্রথম দর্শন', 'Free-first philosophy'),
            desc: t(
              'কোনো পেইড সাবস্ক্রিপশন নেই, কোনো লুকানো ধাপ নেই। শেখা কখনো বিক্রির পণ্য নয়।',
              'No paid subscriptions, no hidden steps. Learning is never a product to sell.'
            ),
          },
          {
            icon: Accessibility,
            title: t('সবার জন্য উন্মুক্ত', 'Open to everyone'),
            desc: t(
              'প্রতিবন্ধী ব্যবহারকারীদের জন্য প্রবেশগম্যতার বিশেষ ব্যবস্থা — বড় লেখা, উচ্চ বৈসাদৃশ্য, ডিসলেক্সিয়া-বান্ধব মোড।',
              'Dedicated accessibility options for disabled users — large text, high contrast, dyslexia-friendly mode.'
            ),
          },
          {
            icon: ShieldCheck,
            title: t('স্বচ্ছতা', 'Transparency'),
            desc: t(
              'যা কাজ করে তাই দেখানো হয়। এই সংস্করণে টাইপিং ফলাফল ও যোগাযোগ ফরম সত্যিই ডেটাবেসে সেভ হয়; অ্যাকাউন্ট ও সার্টিফিকেট ভবিষ্যতের পরিকল্পনা।',
              'We show what actually works. In this version typing results and the contact form genuinely save to a database; accounts and certificates are future plans.'
            ),
          },
        ].map((item) => (
          <div key={item.title} className="card p-5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green-50 text-brand-green-700">
              <item.icon size={20} />
            </span>
            <h3 className="mt-3 font-bold text-stone-900">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-stone-600">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
