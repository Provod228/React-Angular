import { Link, useSearchParams } from 'react-router';
import { CITIES, USERS } from '../data/users.ts';

// Упражнение 8: фильтр по городу через query-параметр ?city=Москва.
// Фильтр живёт в URL, а не в useState: ссылкой с фильтром можно поделиться,
// а «Назад» в браузере отменяет выбор фильтра.
function UsersList() {
    const [searchParams, setSearchParams] = useSearchParams();
    const city = searchParams.get('city'); // string | null

    // Отфильтрованный список — вычисляемый
    const visibleUsers = city ? USERS.filter((u) => u.city === city) : USERS;

    function selectCity(value: string) {
        // Пустая строка = «Все города» → убираем параметр из URL целиком
        setSearchParams(value ? { city: value } : {});
    }

    return (
        <div className="stack">
            <h1>Пользователи</h1>

            <label className="row">
                <span>Город:</span>
                <select className="input input--auto" value={city ?? ''} onChange={(e) => selectCity(e.target.value)}>
                    <option value="">Все города</option>
                    {CITIES.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
            </label>

            {visibleUsers.length === 0 ? (
                <p className="muted">В городе «{city}» никого нет.</p>
            ) : (
                <ul className="list">
                    {visibleUsers.map((user) => (
                        <li key={user.id}>
                            <Link to={`/users/${user.id}`}>{user.name}</Link>
                            <span className="muted"> — {user.city}</span>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default UsersList;
