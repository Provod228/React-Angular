import { useEffect, useState } from 'react';

// Упражнение 4: значение, которое «догоняет» исходное через delay мс после последнего изменения.
// Generic: работает с любым типом — строкой поиска, числом, объектом фильтров.
export function useDebounce<T>(value: T, delay = 500): T {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebounced(value), delay);
        return () => clearTimeout(timer); // новое значение → старый таймер отменяется
    }, [value, delay]);

    return debounced;
}
