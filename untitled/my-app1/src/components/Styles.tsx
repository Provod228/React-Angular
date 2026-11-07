import {useState} from "react";

type Theme = 'light' | 'dark'

function Styles() {
    const [theme, setTheme] = useState<Theme>('light');

    function toggleTheme(): void {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'))
    }


    const isDark = theme === 'dark';

    return (
        <div
            style={{
                backgroundColor: isDark ? '#1e1e1e' : '#ffffff',
                color: isDark ? '#ffffff' : '#000000',
                minHeight: '100vh',
                padding: 20,
            }}>
            <h1 style={{ color: isDark ? '#ffd166' : '#1d4ed8' }}>
                Текущая тема: {theme}
            </h1>
            <button onClick={toggleTheme}>
                Тема {theme}
            </button>
        </div>
    );
}

export default Styles;