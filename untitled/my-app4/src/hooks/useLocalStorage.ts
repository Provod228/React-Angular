import { useEffect, useState } from 'react';

type Initial<T> = T | (() => T);

function resolveInitial<T>(initial: Initial<T>): T {
    return typeof initial === 'function' ? (initial as () => T)() : initial;
}

// useState, который синхронизируется с localStorage (из Части 7)
export function useLocalStorage<T>(key: string, initialValue: Initial<T>) {
    const [value, setValue] = useState<T>(() => {
        try {
            const saved = localStorage.getItem(key);
            return saved !== null ? (JSON.parse(saved) as T) : resolveInitial(initialValue);
        } catch {
            return resolveInitial(initialValue);
        }
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.warn(`useLocalStorage: не удалось сохранить "${key}"`, error);
        }
    }, [key, value]);

    return [value, setValue] as const;
}
