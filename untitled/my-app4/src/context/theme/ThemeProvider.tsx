import { useCallback, useEffect, useMemo } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage.ts';
import { THEME_STORAGE_KEY, ThemeContext, type Theme } from './ThemeContext.ts';

function systemTheme(): Theme {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Упражнение 1: тема через Context + localStorage
function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useLocalStorage<Theme>(THEME_STORAGE_KEY, systemTheme);

    // Применяем тему к <html> — побочный эффект
    useEffect(() => {
        document.documentElement.dataset.theme = theme;
    }, [theme]);

    // setTheme стабилен → toggleTheme тоже стабилен
    const toggleTheme = useCallback(() => {
        setTheme((t) => (t === 'light' ? 'dark' : 'light'));
    }, [setTheme]);

    // Главная ловушка Context: value={{ theme, toggleTheme }} создавал бы НОВЫЙ объект
    // на каждый рендер провайдера → перерисовка всех потребителей.
    // useMemo отдаёт тот же объект, пока theme не изменилась.
    const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

    // React 19: контекст можно рендерить как провайдер напрямую.
    // Старая запись <ThemeContext.Provider value={...}> тоже работает.
    return <ThemeContext value={value}>{children}</ThemeContext>;
}

export default ThemeProvider;
