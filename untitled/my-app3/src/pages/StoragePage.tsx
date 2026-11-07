import { useState } from 'react';
import Counter from '../storage/Counter.tsx';
import NoteDraft from '../storage/NoteDraft.tsx';
import { STORAGE_KEYS } from '../storageKeys.ts';

// Страница упражнений Части 7 (1, 3, 4). Тема (упражнение 2) — переключатель в шапке.
function StoragePage() {
    // Ключ для «перемонтирования»: состояние счётчика и черновика живёт внутри них,
    // поэтому после очистки localStorage их нужно создать заново —
    // тогда ленивая инициализация прочитает уже пустое хранилище.
    const [resetKey, setResetKey] = useState(0);

    // Упражнение 4: очистка с подтверждением
    function handleReset() {
        if (!confirm('Сбросить счётчик и черновик?')) return;

        try {
            localStorage.removeItem(STORAGE_KEYS.counter);
            localStorage.removeItem(STORAGE_KEYS.draft);
        } catch (error) {
            console.warn('Не удалось очистить хранилище', error);
        }
        // Тему не трогаем: это настройка, а не данные
        setResetKey((k) => k + 1);
    }

    return (
        <div className="stack">
            <h1>localStorage</h1>

            {/* Смена key у обёртки = React удалит старые компоненты и создаст новые */}
            <div className="stack" key={resetKey}>
                <Counter />
                <NoteDraft />
            </div>

            <section className="card">
                <h2>4. Очистка с подтверждением</h2>
                <div>
                    <button className="btn btn--danger" onClick={handleReset}>Сбросить всё</button>
                </div>
            </section>
        </div>
    );
}

export default StoragePage;
