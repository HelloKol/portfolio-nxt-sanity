import { createContext, useState, useEffect, useContext } from 'react';

interface ThemeContextProps {
  theme: string;
  setTheme: (val: string) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: ``,
  setTheme: () => {},
  toggleTheme: () => {}
});

type ThemeProviderProps = {
  children: React.ReactNode | React.ReactNode[];
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const value = useThemeProvider();

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

const getTheme = () => {
  if (typeof window !== 'undefined') {
    const theme = localStorage.getItem('theme');
    if (!theme) {
      localStorage.setItem('theme', 'light-theme');
      return 'light-theme';
    } else {
      return theme;
    }
  }
  return '';
};

const useThemeProvider = () => {
  const [theme, setTheme] = useState('');

  useEffect(() => {
    setTheme(getTheme());
  }, []);

  function toggleTheme() {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'dark-theme' ? 'light-theme' : 'dark-theme';
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newTheme);
      }
      return newTheme;
    });
  }

  return {
    theme,
    setTheme,
    toggleTheme
  };
};

const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) throw new Error('Something went wrong with the Music manager Context');

  return context;
};

export default useTheme;
