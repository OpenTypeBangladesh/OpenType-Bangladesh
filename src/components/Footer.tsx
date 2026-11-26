import { Heart, Mail } from 'lucide-react';
import type { PageId } from '@/components/Navbar';
import { NAV_ITEMS } from '@/components/Navbar';
import LogoMark from '@/components/LogoMark';
import { useI18n } from '@/lib/i18n';

export default function Footer({ onNavigate }: { onNavigate: (page: PageId) => void }) {
  const { t } = useI18n();

  return (
    <footer className="mt-16 bg-brand-green-800 text-brand-green-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <LogoMark size={36} />
              <span className="font-bold">OpenType Bangladesh</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-brand-green-100">
              {t(
                'সবার জন্য ফ্রি টাইপিং ও কম্পিউটার শিক্ষা। প্রতিবন্ধী ব্যবহারকারীদের কথা মাথায় রেখে তৈরি — শিখুন, অনুশীলন করুন, এগিয়ে যান।',
                'Free typing and computer education for everyone. Built with disabled users in mind — learn, practice, grow.'
              )}
            </p>
            <p className="mt-3 text-sm text-brand-green-200">
              {t('প্রতিষ্ঠাতা', 'Founder')}: <span className="font-semibold text-white">Biplob Sharma</span>
            </p>
          </div>

          <nav aria-label={t('ফুটার মেনু', 'Footer menu')}>
            <h3 className="text-sm font-bold uppercase tracking-wide text-brand-green-300">{t('সেকশন', 'Sections')}</h3>
            <ul className="mt-3 space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className="text-sm text-brand-green-100 transition hover:text-white"
                  >
                    {t(item.labelBn, item.labelEn)}
                  </button>
                </li>
              ))}
              <li>
                <button onClick={() => onNavigate('leaderboard')} className="text-sm text-brand-green-100 transition hover:text-white">
                  {t('লিডারবোর্ড', 'Leaderboard')}
                </button>
              </li>
            </ul>
          </nav>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-brand-green-300">{t('প্রতিষ্ঠান', 'Organization')}</h3>
            <ul className="mt-3 space-y-2">
              {(
                [
                  ['about', t('আমাদের সম্পর্কে', 'About Us')],
                  ['contact', t('যোগাযোগ', 'Contact Us')],
                  ['privacy', t('প্রাইভেসি পলিসি', 'Privacy Policy')],
                  ['terms', t('শর্তাবলি', 'Terms and Conditions')],
                ] as [PageId, string][]
              ).map(([id, label]) => (
                <li key={id}>
                  <button onClick={() => onNavigate(id)} className="text-sm text-brand-green-100 transition hover:text-white">
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wide text-brand-green-300">{t('যোগাযোগ', 'Contact')}</h3>
            <p className="mt-3 flex items-center gap-2 text-sm text-brand-green-100">
              <Mail size={16} /> hello@opentypebd.org
            </p>
            <p className="mt-4 flex items-center gap-2 text-sm text-brand-green-200">
              <Heart size={16} className="text-brand-red-400" /> {t('সম্পূর্ণ ফ্রি, সবার জন্য', 'Completely free, for everyone')}
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6 text-center text-xs text-brand-green-200">
          © {new Date().getFullYear()} OpenType Bangladesh — {t('শিক্ষার জন্য নির্মিত', 'built for learning')}.
        </div>
      </div>
    </footer>
  );
}
