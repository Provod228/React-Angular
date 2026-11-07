import { apiFetch } from './http.ts';

// ---------- Упражнение 1: факты о кошках ----------

export type CatFact = {
    fact: string;
    length: number;
};

export function getRandomCatFact(signal?: AbortSignal) {
    return apiFetch<CatFact>('https://catfact.ninja/fact', { signal });
}

// ---------- Упражнение 2: погода (Open-Meteo, без ключа) ----------

export type GeoPlace = {
    name: string;
    country?: string;
    admin1?: string; // регион
    latitude: number;
    longitude: number;
};

type GeoResponse = {
    results?: GeoPlace[]; // если город не найден — поля results нет вовсе
};

export type CurrentWeather = {
    time: string;
    temperature_2m: number;
    wind_speed_10m: number;
};

type ForecastResponse = {
    current: CurrentWeather;
};

// Город → координаты. Возвращает null, если ничего не найдено.
export async function findCity(name: string, signal?: AbortSignal): Promise<GeoPlace | null> {
    const params = new URLSearchParams({ name, count: '1', language: 'ru' });
    const data = await apiFetch<GeoResponse>(
        `https://geocoding-api.open-meteo.com/v1/search?${params}`,
        { signal },
    );
    return data.results?.[0] ?? null;
}

// Координаты → текущая погода
export async function getCurrentWeather(place: GeoPlace, signal?: AbortSignal): Promise<CurrentWeather> {
    const params = new URLSearchParams({
        latitude: String(place.latitude),
        longitude: String(place.longitude),
        current: 'temperature_2m,wind_speed_10m',
        timezone: 'auto',
    });
    const data = await apiFetch<ForecastResponse>(
        `https://api.open-meteo.com/v1/forecast?${params}`,
        { signal },
    );
    return data.current;
}

// ---------- Упражнение 3: пагинация постов ----------

export type Post = {
    id: number;
    userId: number;
    title: string;
    body: string;
};

export type PostsPage = {
    posts: Post[];
    total: number | null; // общее число постов из заголовка X-Total-Count
};

// Здесь нужен заголовок ответа, поэтому без apiFetch
export async function getPostsPage(page: number, limit: number, signal?: AbortSignal): Promise<PostsPage> {
    const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`,
        { signal },
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);

    const totalHeader = res.headers.get('x-total-count');
    const posts = (await res.json()) as Post[];
    return { posts, total: totalHeader ? Number(totalHeader) : null };
}

// ---------- Упражнение 4: поиск постов ----------

export type SearchPost = {
    id: number;
    title: string;
    body: string;
};

type SearchResponse = {
    posts: SearchPost[];
    total: number;
};

// У jsonplaceholder нет нормального поиска, поэтому берём dummyjson
export function searchPosts(query: string, signal?: AbortSignal) {
    const params = new URLSearchParams({ q: query, limit: '10' });
    return apiFetch<SearchResponse>(`https://dummyjson.com/posts/search?${params}`, { signal });
}
