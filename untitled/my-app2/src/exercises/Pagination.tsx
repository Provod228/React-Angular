import { useEffect, useState } from 'react';
import { getPostsPage, type Post } from '../api/endpoints.ts';
import { getErrorMessage, isAbortError } from '../api/http.ts';

const LIMIT = 10;

// Ответ помечаем номером страницы, для которой он пришёл
type Result =
    | { page: number; posts: Post[]; total: number | null; error: null }
    | { page: number; posts: null; total: null; error: string };

// Упражнение 3: постраничный список постов
function Pagination() {
    const [page, setPage] = useState(1);
    const [result, setResult] = useState<Result | null>(null);

    // Загрузка — вычисляемая: ответа для текущей страницы ещё нет
    const loading = result?.page !== page;

    // page в зависимостях: сменили страницу → новый запрос,
    // а cleanup отменяет предыдущий (защита от race condition при быстрых кликах)
    useEffect(() => {
        const controller = new AbortController();

        getPostsPage(page, LIMIT, controller.signal)
            .then(({ posts, total }) => setResult({ page, posts, total, error: null }))
            .catch((err: unknown) => {
                if (!isAbortError(err)) {
                    setResult({ page, posts: null, total: null, error: getErrorMessage(err) });
                }
            });

        return () => controller.abort();
    }, [page]);

    // Общее число страниц запоминаем из последнего успешного ответа
    const total = result?.total ?? null;
    const totalPages = total !== null ? Math.ceil(total / LIMIT) : null;
    const hasPrev = page > 1;
    // Если сервер не прислал total — считаем, что страница не последняя, пока она полная
    const hasNext = totalPages !== null ? page < totalPages : (result?.posts?.length ?? 0) === LIMIT;

    return (
        <section className="card">
            <h2>📄 Пагинация постов</h2>

            <div className="row row--center">
                <button className="btn" onClick={() => setPage((p) => p - 1)} disabled={!hasPrev || loading}>
                    ← Назад
                </button>
                <span>
                    Страница {page}
                    {totalPages !== null && ` из ${totalPages}`}
                </span>
                <button className="btn" onClick={() => setPage((p) => p + 1)} disabled={!hasNext || loading}>
                    Вперёд →
                </button>
            </div>

            {loading && <p className="muted">Загрузка...</p>}
            {!loading && result?.error && <p className="error">Ошибка: {result.error}</p>}

            {!loading && result?.posts && (
                <ol className="list" start={(page - 1) * LIMIT + 1}>
                    {result.posts.map((post) => (
                        <li key={post.id}>{post.title}</li>
                    ))}
                </ol>
            )}
        </section>
    );
}

export default Pagination;
