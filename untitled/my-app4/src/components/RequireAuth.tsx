import { Navigate, Outlet, useLocation } from 'react-router';
import { useAuth } from '../context/auth/AuthContext.ts';

// Упражнение 2: защищённый маршрут на основе AuthContext.
// Не вошёл → на /login, а в state запоминаем, куда хотел попасть,
// чтобы после входа вернуть его туда же.
function RequireAuth() {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        return <Navigate to="/login" replace state={{ from: location.pathname }} />;
    }

    return <Outlet />;
}

export default RequireAuth;
