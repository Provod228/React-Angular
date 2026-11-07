import { createContext, useContext } from 'react';

export type Theme = 'light' | 'dark';

// Тот же ключ читает скрипт в index.html, чтобы применить тему до загрузки React
export const THEME_STORAGE_KEY = 'app4:theme';

export type ThemeContextValue = {
    theme: Theme;
    toggleTheme: () => void;
};

// null по умолчанию: «провайдера выше нет». Хук ниже превращает это в понятную ошибку.
export const ThemeContext = createContext<ThemeContextValue | null>(null);

export function useTheme(): ThemeContextValue {
    const ctx = useContext(ThemeContext);
    if (ctx === null) {
        throw new Error('useTheme нужно вызывать внутри <ThemeProvider>');
    }
    return ctx; // после проверки TS знает: тут уже не null
}
