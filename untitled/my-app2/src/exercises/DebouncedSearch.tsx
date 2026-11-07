import { useEffect, useState } from 'react';
import { searchPosts, type SearchPost } from '../api/endpoints.ts';
import { getErrorMessage, isAbortError } from '../api/http.ts';

const DEBOUNCE_MS = 500;

// Ответ помечаем строкой поиска, для которой он пришёл
type Result =
    | { query: string; posts: SearchPost[]; error: null }
    | { query: string; posts: null; error: string };

// Упражнение 4: поиск, запрос уходит через 500 мс после последнего ввода
function DebouncedSearch() {
    const [query, setQuery] = useState('');                   // меняется на каждый символ
    const [debouncedQuery, setDebouncedQuery] = useState(''); // меняется после паузы
    const [result, setResult] = useState<Result | null>(null);

    // Эффект 1: debounce.
    // Каждый новый символ → cleanup отменяет прошлый таймер → ставим новый.
    // Таймер «доживёт» до конца, только если 500 мс никто не печатал.
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedQuery(query.trim()), DEBOUNCE_MS);
        return () => clearTimeout(timer);
    }, [query]);

    // Эффект 2: запрос — только по debouncedQuery
    useEffect(() => {
        if (!debouncedQuery) return; // пустой поиск — не ходим на сервер

        const controller = new AbortController();

        searchPosts(debouncedQuery, controller.signal)
            .then((data) => setResult({ query: debouncedQuery, posts: data.posts, error: null }))
            .catch((err: unknown) => {
                if (!isAbortError(err)) {
                    setResult({ query: debouncedQuery, posts: null, error: getErrorMessage(err) });
                }
            });

        return () => controller.abort();
    }, [debouncedQuery]);

    // Всё ниже — вычисляемое, без отдельных state
    const isTyping = query.trim() !== debouncedQuery;           // debounce ещё не сработал
    const loading = debouncedQuery !== '' && result?.query !== debouncedQuery;
    const current = !loading && debouncedQuery ? result : null; // ответ для текущего запроса

    return (
        <section className="card">
            <h2>🔍 Поиск с debounce</h2>

            <input
                className="input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск постов (на английском, например love)"
            />

            {isTyping && <p className="muted">Печатает...</p>}
            {!isTyping && loading && <p className="muted">Поиск...</p>}
            {!isTyping && current?.error && <p className="error">Ошибка: {current.error}</p>}

            {!isTyping && current?.posts && (
                current.posts.length === 0 ? (
                    <p className="muted">Ничего не найдено</p>
                ) : (
                    <ul className="list">
                        {current.posts.map((post) => (
                            <li key={post.id}>{post.title}</li>
                        ))}
                    </ul>
                )
            )}
        </section>
    );
}

export default DebouncedSearch;
