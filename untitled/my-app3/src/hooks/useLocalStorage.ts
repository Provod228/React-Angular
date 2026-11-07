import { useEffect, useState } from 'react';

// Как у useState: начальное значение или функция, которая его вычисляет
type Initial<T> = T | (() => T);

function resolveInitial<T>(initial: Initial<T>): T {
    return typeof initial === 'function' ? (initial as () => T)() : initial;
}

/**
 * useState, который сам синхронизируется с localStorage.
 * Возвращает [значение, сеттер] — пользоваться так же, как useState.
 */
export function useLocalStorage<T>(key: string, initialValue: Initial<T>) {
    // Ленивая инициализация: localStorage читаем один раз, ДО первого рендера.
    // Поэтому компонент сразу рисуется с сохранёнными данными — без «мигания».
    const [value, setValue] = useState<T>(() => {
        try {
            const saved = localStorage.getItem(key);
            return saved !== null ? (JSON.parse(saved) as T) : resolveInitial(initialValue);
        } catch (error) {
            // Битый JSON, недоступный localStorage (приватный режим) и т.п.
            console.warn(`useLocalStorage: не удалось прочитать "${key}"`, error);
            return resolveInitial(initialValue);
        }
    });

    // Сохраняем при каждом изменении
    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            // QuotaExceededError или приватный режим
            console.warn(`useLocalStorage: не удалось сохранить "${key}"`, error);
        }
    }, [key, value]);

    // as const — чтобы TS вывел кортеж [T, setter], а не массив (T | setter)[]
    return [value, setValue] as const;
}
