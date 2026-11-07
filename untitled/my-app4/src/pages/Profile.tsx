import { useAuth } from '../context/auth/AuthContext.ts';

// Защищённая страница: сюда пускает только RequireAuth
function Profile() {
    // user точно не null — RequireAuth выше это гарантирует,
    // но TS этого не знает, поэтому ?. оставляем
    const { user, logout } = useAuth();

    return (
        <div className="stack">
            <h1>Профиль</h1>
            <p>Привет, <b>{user?.name}</b>! Эта страница доступна только после входа.</p>
            <div>
                <button className="btn btn--ghost" onClick={logout}>Выйти</button>
            </div>
        </div>
    );
}

export default Profile;
