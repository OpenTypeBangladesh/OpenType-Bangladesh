import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

export interface AccessibilitySettings {
  largeText: boolean;
  underlineLinks: boolean;
  dyslexiaFriendly: boolean;
  highContrast: boolean;
  reduceMotion: boolean;
  screenReaderFriendly: boolean;
}

const defaultSettings: AccessibilitySettings = {
  largeText: false,
  underlineLinks: false,
  dyslexiaFriendly: false,
  highContrast: false,
  reduceMotion: false,
  screenReaderFriendly: false,
};

interface AccessibilityContextValue {
  settings: AccessibilitySettings;
  toggle: (key: keyof AccessibilitySettings) => void;
  reset: () => void;
}

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

const STORAGE_KEY = 'opentype-a11y';

function loadSettings(): AccessibilitySettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return { ...defaultSettings, ...JSON.parse(raw) };
  } catch {
    // corrupted storage falls back to defaults
  }
  return defaultSettings;
}

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(loadSettings);

  useEffect(() => {
    const body = document.body;
    body.classList.toggle('a11y-large-text', settings.largeText);
    body.classList.toggle('a11y-underline', settings.underlineLinks);
    body.classList.toggle('a11y-dyslexia', settings.dyslexiaFriendly);
    body.classList.toggle('a11y-high-contrast', settings.highContrast);
    if (settings.reduceMotion) {
      const style = document.createElement('style');
      style.id = 'a11y-reduce-motion';
      style.textContent = '*, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }';
      document.head.appendChild(style);
    } else {
      document.getElementById('a11y-reduce-motion')?.remove();
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  const toggle = useCallback((key: keyof AccessibilitySettings) => {
    setSettings((s) => ({ ...s, [key]: !s[key] }));
  }, []);

  const reset = useCallback(() => setSettings(defaultSettings), []);

  return (
    <AccessibilityContext.Provider value={{ settings, toggle, reset }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error('useAccessibility must be used within AccessibilityProvider');
  return ctx;
}
