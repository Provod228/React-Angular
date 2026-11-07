// Хорошая практика: вся работа с API в одном месте.
// Компоненты не должны знать про URL и структуру ответа.

const BASE = 'https://jsonplaceholder.typicode.com';

// Обёртка над fetch с проверкой res.ok и парсингом JSON.
// Экономит кучу boilerplate в каждом запросе.
export async function apiFetch(path, options = {}) {
    const res = await fetch(`${BASE}${path}`, options);
    if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    return res.json();
}

export function getUsers(signal) {
    return apiFetch('/users', { signal });
}

export function getUserById(id, signal) {
    return apiFetch(`/users/${id}`, { signal });
}