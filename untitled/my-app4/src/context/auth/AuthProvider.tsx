import { useCallback, useMemo } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage.ts';
import { AuthContext, type User } from './AuthContext.ts';

// Упражнение 2: авторизация через Context.
// Вход «фейковый» (без сервера и пароля) — важна сама схема:
// user / login() / logout() доступны любому компоненту без пропсов.
// С DRF здесь будет запрос за JWT, а в state — данные пользователя.
function AuthProvider({ children }: { children: React.ReactNode }) {
    // Сохраняем пользователя, чтобы вход переживал перезагрузку страницы
    const [user, setUser] = useLocalStorage<User | null>('app4:user', null);

    const login = useCallback((name: string) => setUser({ name }), [setUser]);
    const logout = useCallback(() => setUser(null), [setUser]);

    const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

    return <AuthContext value={value}>{children}</AuthContext>;
}

export default AuthProvider;
