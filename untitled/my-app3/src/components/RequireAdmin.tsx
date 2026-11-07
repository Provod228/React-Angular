import { Navigate, Outlet } from 'react-router';
import { IS_ADMIN } from '../auth.ts';

// Упражнение 7: защищённый маршрут.
// Оборачивает дочерние маршруты: нет прав — редирект, есть — рисуем их через <Outlet />.
function RequireAdmin() {
    if (!IS_ADMIN) {
        // replace: /admin не останется в истории, и «Назад» не вернёт на редирект.
        // state — способ передать на главную, почему нас туда отправили.
        return <Navigate to="/" replace state={{ deniedFrom: '/admin' }} />;
    }

    return <Outlet />;
}

export default RequireAdmin;
