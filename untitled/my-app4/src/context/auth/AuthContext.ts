import { createContext, useContext } from 'react';

export type User = {
    name: string;
};

export type AuthContextValue = {
    user: User | null; // null — не вошёл
    login: (name: string) => void;
    logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function useAuth(): AuthContextValue {
    const ctx = useContext(AuthContext);
    if (ctx === null) {
        throw new Error('useAuth нужно вызывать внутри <AuthProvider>');
    }
    return ctx;
}
