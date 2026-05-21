import { createContext, useContext, useState, type ReactNode } from 'react';

interface ThemeContextType {
  themeColor: string;
  setThemeColor: (color: string) => void;
  themeGradient: string;
  setThemeGradient: (gradient: string) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  themeColor: '#FF4B4B',
  setThemeColor: () => {},
  themeGradient: 'linear-gradient(135deg, #FF4B4B, #CC3333)',
  setThemeGradient: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeColor, setThemeColor] = useState('#FF4B4B');
  const [themeGradient, setThemeGradient] = useState('linear-gradient(135deg, #FF4B4B, #CC3333)');

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor, themeGradient, setThemeGradient }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
