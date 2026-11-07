import { useEffect, useState } from 'react';
import { findCity, getCurrentWeather, type CurrentWeather, type GeoPlace } from '../api/endpoints.ts';
import { getErrorMessage, isAbortError } from '../api/http.ts';

// id нужен, чтобы повторный поиск того же города тоже запускал запрос
type Request = { id: number; city: string };

type Result =
    | { id: number; place: GeoPlace; weather: CurrentWeather; error: null }
    | { id: number; place: null; weather: null; error: string };

// Упражнение 2: город → координаты → текущая погода
function Weather() {
    const [input, setInput] = useState('');                       // то, что печатает пользователь
    const [request, setRequest] = useState<Request | null>(null); // то, что отправили поиском
    const [result, setResult] = useState<Result | null>(null);

    // Загрузка — вычисляемая: запрос есть, а ответа на него ещё нет
    const loading = request !== null && result?.id !== request.id;

    // Запрос привязан к request, а не к input: идёт только по сабмиту формы
    useEffect(() => {
        if (request === null) return;

        const controller = new AbortController();
        const { id, city } = request;

        async function load() {
            try {
                // Два последовательных запроса: второй зависит от ответа первого
                const place = await findCity(city, controller.signal);
                if (!place) {
                    setResult({ id, place: null, weather: null, error: `Город «${city}» не найден` });
                    return;
                }
                const weather = await getCurrentWeather(place, controller.signal);
                setResult({ id, place, weather, error: null });
            } catch (err) {
                if (!isAbortError(err)) {
                    setResult({ id, place: null, weather: null, error: getErrorMessage(err) });
                }
            }
        }

        load();
        return () => controller.abort();
    }, [request]);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const city = input.trim();
        if (city) setRequest((prev) => ({ id: (prev?.id ?? 0) + 1, city }));
    }

    return (
        <section className="card">
            <h2>🌤 Погода</h2>

            <form className="row" onSubmit={handleSubmit}>
                <input
                    className="input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Например, Казань"
                />
                <button className="btn" type="submit" disabled={loading || !input.trim()}>
                    Узнать
                </button>
            </form>

            {loading && <p className="muted">Загрузка...</p>}
            {!loading && result?.error && <p className="error">{result.error}</p>}

            {!loading && result?.place && (
                <div className="weather">
                    <p className="weather__temp">{Math.round(result.weather.temperature_2m)}°C</p>
                    <p>
                        {result.place.name}
                        {result.place.admin1 && `, ${result.place.admin1}`}
                        {result.place.country && `, ${result.place.country}`}
                    </p>
                    <p className="muted">Ветер: {result.weather.wind_speed_10m} км/ч</p>
                </div>
            )}
        </section>
    );
}

export default Weather;
