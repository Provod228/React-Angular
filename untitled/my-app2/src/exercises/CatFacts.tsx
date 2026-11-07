import { useEffect, useState } from 'react';
import { getRandomCatFact, type CatFact } from '../api/endpoints.ts';
import { getErrorMessage, isAbortError } from '../api/http.ts';

// Результат запроса помечаем ключом запроса, на который он пришёл
type Result =
    | { key: number; fact: CatFact; error: null }
    | { key: number; fact: null; error: string };

// Упражнение 1: случайный факт о кошках + кнопка «Ещё»
function CatFacts() {
    // Счётчик-«триггер»: кнопка «Ещё» увеличивает его,
    // а эффект зависит от него и перезапускается.
    const [reloadKey, setReloadKey] = useState(0);
    const [result, setResult] = useState<Result | null>(null);

    // loading НЕ храним в state, а вычисляем:
    // «ответ на текущий запрос ещё не пришёл» = загрузка.
    // Так в теле эффекта не нужен синхронный setLoading(true).
    const loading = result?.key !== reloadKey;

    useEffect(() => {
        const controller = new AbortController();

        getRandomCatFact(controller.signal)
            .then((fact) => setResult({ key: reloadKey, fact, error: null }))
            .catch((err: unknown) => {
                if (!isAbortError(err)) {
                    setResult({ key: reloadKey, fact: null, error: getErrorMessage(err) });
                }
            });

        return () => controller.abort();
    }, [reloadKey]);

    return (
        <section className="card">
            <h2>🐱 Факты о кошках</h2>

            {loading && <p className="muted">Загрузка...</p>}
            {!loading && result?.error && <p className="error">Ошибка: {result.error}</p>}
            {!loading && result?.fact && <p className="fact">«{result.fact.fact}»</p>}

            <button
                className="btn"
                onClick={() => setReloadKey((k) => k + 1)}
                disabled={loading}
            >
                {result?.error ? 'Повторить' : 'Ещё'}
            </button>
        </section>
    );
}

export default CatFacts;
