import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router';
import { useAuth } from '../context/auth/AuthContext.ts';

type FromState = { from?: string } | null;

function Login() {
    const { user, login } = useAuth();
    const navigate = useNavigate();
    const from = (useLocation().state as FromState)?.from ?? '/profile';
    const [name, setName] = useState('');

    // Уже вошёл — на странице входа делать нечего
    if (user) return <Navigate to={from} replace />;

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const trimmed = name.trim();
        if (!trimmed) return;
        login(trimmed);
        navigate(from, { replace: true }); // возвращаем туда, куда он шёл
    }

    return (
        <div className="stack narrow">
            <h1>Вход</h1>
            {from !== '/profile' && <p className="alert">Чтобы открыть {from}, нужно войти.</p>}
            <form className="stack" onSubmit={handleSubmit}>
                <input
                    className="input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Имя"
                    autoFocus
                />
                <button className="btn" type="submit" disabled={!name.trim()}>Войти</button>
            </form>
            <p className="muted">Пароль не нужен — вход учебный.</p>
        </div>
    );
}

export default Login;
