import { useEffect, useState } from 'react';
import { STORAGE_KEYS } from '../storageKeys.ts';

const SAVE_DELAY_MS = 500;

function readDraft(): string {
    try {
        return localStorage.getItem(STORAGE_KEYS.draft) ?? '';
    } catch {
        return '';
    }
}

// Упражнение 3: черновик автосохраняется через 500 мс после последнего ввода.
// useLocalStorage тут не подходит — он пишет на каждый символ, а нам нужен debounce.
function NoteDraft() {
    // Ленивая инициализация: читаем черновик один раз
    const [text, setText] = useState(readDraft);
    // То, что уже лежит в localStorage. Нужно только для статуса «сохранено / нет».
    const [savedText, setSavedText] = useState(readDraft);

    // Каждый символ → cleanup отменяет прошлый таймер → ставим новый.
    // Запись произойдёт, только когда пользователь замолчит на 500 мс.
    useEffect(() => {
        const timer = setTimeout(() => {
            try {
                localStorage.setItem(STORAGE_KEYS.draft, text); // строка — JSON не нужен
                setSavedText(text);
            } catch (error) {
                console.warn('Не удалось сохранить черновик', error);
            }
        }, SAVE_DELAY_MS);

        return () => clearTimeout(timer);
    }, [text]);

    const isSaved = text === savedText; // вычисляемое, не state

    return (
        <section className="card">
            <h2>3. Черновик заметки</h2>
            <textarea
                className="input"
                rows={5}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Начни писать — текст сохранится сам"
            />
            <p className={isSaved ? 'muted' : 'muted muted--pending'}>
                {isSaved ? '✓ Сохранено' : 'Сохраняю…'}
            </p>
        </section>
    );
}

export default NoteDraft;
