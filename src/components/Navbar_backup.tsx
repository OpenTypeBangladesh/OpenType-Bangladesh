import { useState } from 'react';
import { BookOpen, Monitor, GraduationCap, Menu, X, Type, Briefcase, Languages } from 'lucide-react';
import LogoMark from '@/components/LogoMark';
import { useI18n } from '@/lib/i18n';

export type PageId =
  | 'home'
  | 'lessons'
  | 'test'
  | 'computer'
  | 'education'
  | 'jobprep'
  | 'leaderboard'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'terms';

export const NAV_ITEMS: { id: PageId; labelBn: string; labelEn: string; icon: typeof Type }[] = [
  { id: 'home', labelBn: 'হোম', labelEn: 'Home', icon: Type },
  { id: 'lessons', labelBn: 'টাইপিং একাডেমি', labelEn: 'Typing Academy', icon: BookOpen },
  { id: 'test', labelBn: 'টাইপিং টেস্ট', labelEn: 'Typing Test', icon: Monitor },
  { id: 'computer', labelBn: 'কম্পিউটার একাডেমি', labelEn: 'Computer Academy', icon: Monitor },
  { id: 'education', labelBn: 'শিক্ষা একাডেমি', labelEn: 'Education Academy', icon: GraduationCap },
  { id: 'jobprep', labelBn: 'চাকরির প্রস্তুতি', labelEn: 'Job Preparation', icon: Briefcase },
];

interface Props {
  page: PageId;
  onNavigate: (page: PageId) => void;
}

export default function Navbar({ page, onNavigate }: Props) {
  const { t, lang, setLang } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);

  const go = (id: PageId) => {
    onNavigate(id);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-brand-green-700 text-white shadow-md shadow-brand-green-900/20">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4">
        <button onClick={() => go('home')} className="flex items-center gap-2.5" aria-label="OpenType Bangladesh হোম">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white p-1">
            <LogoMark size={32} />
          </span>
          <span className="text-left leading-tight">
            <span className="block font-bold">OpenType</span>
            <span className="block text-xs font-bold text-brand-red-300">Bangladesh</span>
          </span>
        </button>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label={t('প্রধান মেনু', 'Main menu')}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              aria-current={page === item.id ? 'page' : undefined}
              title={t(item.labelBn, item.labelEn)}
              className={`rounded-xl px-2.5 py-2 text-[13px] font-semibold transition xl:px-3 ${
                page === item.id ? 'bg-white text-brand-green-800' : 'text-brand-green-50 hover:bg-white/10'
              }`}
            >
              {t(item.labelBn, item.labelEn)}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
            aria-label={t('ভাষা পরিবর্তন করুন', 'Switch language')}
            className="flex items-center gap-1.5 rounded-full border-2 border-white/30 px-3 py-1.5 text-sm font-bold text-white transition hover:border-brand-red-300 hover:bg-white/10"
          >
            <Languages size={16} />
            {lang === 'bn' ? 'EN' : 'বাং'}
          </button>
          <button
            className="rounded-xl p-2 text-white hover:bg-white/10 lg:hidden"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-label={t('মেনু খুলুন', 'Open menu')}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav className="border-t border-white/10 bg-brand-green-700 px-4 pb-4 pt-2 lg:hidden" aria-label={t('মোবাইল মেনু', 'Mobile menu')}>
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              aria-current={page === item.id ? 'page' : undefined}
              className={`mb-1 flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-semibold ${
                page === item.id ? 'bg-white text-brand-green-800' : 'text-brand-green-50 hover:bg-white/10'
              }`}
            >
              <item.icon size={18} />
              {t(item.labelBn, item.labelEn)}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
