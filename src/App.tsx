import { useState } from 'react';
import LoginPage from '@/pages/auth/LoginPage';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AccessibilityPanel from '@/components/AccessibilityPanel';
import type { PageId } from '@/components/Navbar';
import { AccessibilityProvider } from '@/lib/accessibility';
import { I18nProvider } from '@/lib/i18n';
import HomePage from '@/pages/HomePage';
import LessonsPage from '@/pages/LessonsPage';
import TestPage from '@/pages/TestPage';
import ComputerPage from '@/pages/ComputerPage';
import EducationPage from '@/pages/EducationPage';
import JobPrepPage from '@/pages/JobPrepPage';
import LeaderboardPage from '@/pages/LeaderboardPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import PrivacyPage from '@/pages/PrivacyPage';
import TermsPage from '@/pages/TermsPage';

function Shell() {
  const [page, setPage] = useState<PageId>('home');
const [showLogin, setShowLogin] = useState(false);
  const navigate = (p: PageId) => {
    setPage(p);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="flex min-h-screen flex-col">
      {showLogin ? (
  <LoginPage />
) : (
  <>
<Navbar
  page={page}
  onNavigate={navigate}
  onLogin={() => setShowLogin(true)}
/>
      <main className="flex-1">
        {page === 'home' && <HomePage onNavigate={navigate} />}
        {page === 'lessons' && <LessonsPage />}
        {page === 'test' && <TestPage />}
        {page === 'computer' && <ComputerPage />}
        {page === 'education' && <EducationPage />}
        {page === 'jobprep' && <JobPrepPage />}
        {page === 'leaderboard' && <LeaderboardPage />}
        {page === 'about' && <AboutPage />}
        {page === 'contact' && <ContactPage />}
        {page === 'privacy' && <PrivacyPage />}
        {page === 'terms' && <TermsPage />}
      </main>
      <Footer onNavigate={navigate} />
          <AccessibilityPanel />
      </>
    )}
    </div>
  );
}
export default function App() {
  return (
    <I18nProvider>
      <AccessibilityProvider>
        <Shell />
      </AccessibilityProvider>
    </I18nProvider>
  );
}
