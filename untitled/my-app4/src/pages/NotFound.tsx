import { Link } from 'react-router';

function NotFound() {
    return (
        <div className="stack stack--center">
            <h1>404</h1>
            <p>Страница не найдена</p>
            <Link to="/">На главную</Link>
        </div>
    );
}

export default NotFound;
