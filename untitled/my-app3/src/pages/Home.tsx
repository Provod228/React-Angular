import { Link, useLocation } from 'react-router';

// state, который передаёт RequireAdmin при редиректе
type DeniedState = { deniedFrom?: string } | null;

function Home() {
    // location.state имеет тип unknown — приводим к ожидаемой форме
    const state = useLocation().state as DeniedState;

    return (
        <div className="stack">
            <h1>Главная</h1>

            {state?.deniedFrom && (
                <p className="alert">
                    Нет доступа к <code>{state.deniedFrom}</code> — вас перенаправили на главную.
                </p>
            )}

            <p>Упражнения Частей 7–8. Разделы:</p>
            <ul className="list">
                <li><Link to="/posts">Блог</Link> — маршруты <code>/posts</code> и <code>/posts/:id</code></li>
                <li><Link to="/users">Пользователи</Link> — хлебные крошки и фильтр <code>?city=</code></li>
                <li><Link to="/users?city=Москва">Пользователи из Москвы</Link> — та же страница, фильтр из URL</li>
                <li><Link to="/storage">localStorage</Link> — счётчик, черновик, сброс</li>
                <li><Link to="/admin">Админка</Link> — защищённый маршрут</li>
                <li><Link to="/random-page">Несуществующая страница</Link> — 404</li>
            </ul>
            <p className="muted">Тема переключается кнопкой в шапке и сохраняется.</p>
        </div>
    );
}

export default Home;
