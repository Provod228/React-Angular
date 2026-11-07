import { Link, useNavigate, useParams } from 'react-router';
import { findUser } from '../data/users.ts';
import Breadcrumbs from '../components/Breadcrumbs.tsx';

// Профиль /users/:id с хлебными крошками (упражнение 6)
function UserProfile() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const user = findUser(Number(id));

    if (!user) {
        return (
            <div className="stack">
                <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Пользователи', to: '/users' }, { label: 'Не найден' }]} />
                <h1>Пользователь не найден</h1>
                <p className="muted">ID: {id}</p>
                <div>
                    <button className="btn" onClick={() => navigate('/users')}>К списку</button>
                </div>
            </div>
        );
    }

    return (
        <div className="stack">
            {/* Последняя «крошка» — имя из данных, найденных по id из URL */}
            <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Пользователи', to: '/users' }, { label: user.name }]} />

            <h1>{user.name}</h1>
            <p>Email: {user.email}</p>
            <p>
                Город: <Link to={`/users?city=${encodeURIComponent(user.city)}`}>{user.city}</Link>
            </p>
            <div className="row">
                <button className="btn btn--ghost" onClick={() => navigate(-1)}>← Назад</button>
                <Link to="/users">Все пользователи</Link>
            </div>
        </div>
    );
}

export default UserProfile;
