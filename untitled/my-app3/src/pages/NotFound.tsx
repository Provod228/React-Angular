import { Link, useLocation } from 'react-router';

function NotFound() {
    const { pathname } = useLocation();

    return (
        <div className="stack stack--center">
            <h1>404</h1>
            <p>Страница <code>{pathname}</code> не найдена</p>
            <Link to="/">На главную</Link>
        </div>
    );
}

export default NotFound;
