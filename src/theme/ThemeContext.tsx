import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { IPodTheme, themes, defaultThemeKey } from './colors';

interface ThemeContextValue {
  theme: IPodTheme;
  themeKey: string;
  setThemeKey: (key: string) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeKey, setThemeKeyState] = useState(defaultThemeKey);

  const setThemeKey = useCallback((key: string) => {
    if (themes[key]) {
      setThemeKeyState(key);
    }
  }, []);

  const theme = themes[themeKey] ?? themes[defaultThemeKey];

  return (
    <ThemeContext.Provider value={{ theme, themeKey, setThemeKey }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return ctx;
}
