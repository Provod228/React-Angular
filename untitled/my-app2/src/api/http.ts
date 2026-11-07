// Общая обёртка над fetch: проверка res.ok + разбор JSON.
// fetch НЕ бросает ошибку на 404/500, поэтому проверяем статус сами.
export async function apiFetch<T>(url: string, init?: RequestInit): Promise<T> {
    const res = await fetch(url, init);
    if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    return res.json() as Promise<T>;
}

// Отменённый через AbortController запрос тоже «падает» — такие ошибки игнорируем
export function isAbortError(err: unknown): boolean {
    return err instanceof DOMException && err.name === 'AbortError';
}

// В catch приходит unknown — достаём из него текст ошибки
export function getErrorMessage(err: unknown): string {
    return err instanceof Error ? err.message : 'Неизвестная ошибка';
}
