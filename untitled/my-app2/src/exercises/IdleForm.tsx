import { useCallback, useEffect, useRef, useState } from 'react';

const IDLE_MS = 30_000;

// Упражнение 9: подсказка «Всё ещё с нами?» после 30 с бездействия в форме
function IdleForm() {
    const [message, setMessage] = useState('');
    const [isIdle, setIsIdle] = useState(false);

    // id таймера храним в ref, а не в state:
    // он нужен только для clearTimeout и не влияет на то, что видно на экране,
    // поэтому его смена не должна вызывать ререндер.
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Любая активность: сбрасываем старый таймер и заводим новый.
    // useCallback с [] — функция стабильна (ref и сеттер не меняются),
    // поэтому её можно безопасно указать в зависимостях эффекта.
    const restartTimer = useCallback(() => {
        if (timerRef.current) clearTimeout(timerRef.current);
        setIsIdle(false);
        timerRef.current = setTimeout(() => setIsIdle(true), IDLE_MS);
    }, []);

    // Запускаем таймер при монтировании, чистим при размонтировании
    // (переключился на другую вкладку упражнений — таймер не должен остаться висеть).
    // isIdle и так false при старте, поэтому здесь только заводим таймер, без setState.
    useEffect(() => {
        timerRef.current = setTimeout(() => setIsIdle(true), IDLE_MS);
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, []);

    return (
        <section className="card">
            <h2>⏱ Таймер неактивности</h2>
            <p className="muted">Ничего не делай в форме 30 секунд.</p>

            {/* Слушаем активность на всей форме сразу — события всплывают от полей */}
            <form
                className="form"
                onInput={restartTimer}
                onKeyDown={restartTimer}
                onPointerDown={restartTimer}
                onFocus={restartTimer}
                onSubmit={(e) => e.preventDefault()}
            >
                <input className="input" placeholder="Тема" />
                <textarea
                    className="input"
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Сообщение"
                />
            </form>

            {isIdle && (
                <div className="hint">
                    Всё ещё с нами? 👀
                    <button className="btn" type="button" onClick={restartTimer}>Да!</button>
                </div>
            )}
        </section>
    );
}

export default IdleForm;
