import { Link } from 'react-router';

function Home() {
    return (
        <div className="stack">
            <h1>Части 9–10</h1>
            <ol className="list">
                <li><b>Тема через Context</b> — кнопка 🌙/☀️ в шапке, сохраняется в localStorage.</li>
                <li><b>Авторизация через Context</b> — <Link to="/login">вход</Link>, выход в шапке, <Link to="/profile">профиль</Link> только после входа.</li>
                <li><b>Корзина на Context + useReducer</b> — добавляй в <Link to="/shop">магазине</Link>, меняй количество в <Link to="/cart">корзине</Link>.</li>
                <li><b>useDebounce</b> — поиск в <Link to="/shop">магазине</Link> с «Печатает...».</li>
                <li><b>usePrevious</b> — <Link to="/hooks">демо</Link>.</li>
                <li><b>Оптимизация списка</b> — <Link to="/memo">сравнение</Link> с memo и без (смотри консоль).</li>
            </ol>
        </div>
    );
}

export default Home;
