import { useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage.ts';
import { STORAGE_KEYS } from '../storageKeys.ts';

type Theme = 'light' | 'dark';

// Если пользователь ещё не выбирал — берём тему системы
function systemTheme(): Theme {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// Упражнение 2: тема с сохранением.
// «Без мигания» обеспечивает скрипт в index.html: он ставит data-theme
// ещё до загрузки React. Здесь мы только переключаем и сохраняем тему.
function ThemeToggle() {
    const [theme, setTheme] = useLocalStorage<Theme>(STORAGE_KEYS.theme, systemTheme);

    // Работа с document — побочный эффект, поэтому в useEffect
    useEffect(() => {
        document.documentElement.dataset.theme = theme;
    }, [theme]);

    return (
        <button
            className="theme-toggle"
            onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}
            aria-label="Переключить тему"
            title="Переключить тему"
        >
            {theme === 'light' ? '🌙' : '☀️'}
        </button>
    );
}

export default ThemeToggle;
