import { useState } from 'react';

/**
 * Упражнение 5: возвращает предыдущее значение (до последнего изменения).
 *
 * Вариант из урока (useRef + useEffect, ref.current читается во время рендера)
 * новый линтер React запрещает: правило react-hooks/refs — «не читай ref во время рендера».
 * Поэтому здесь способ из официальной документации — «хранить информацию из прошлых рендеров» в state:
 * если значение изменилось, обновляем state прямо во время рендера.
 * React сразу перерисует компонент с новыми данными, до показа на экране.
 */
export function usePrevious<T>(value: T): T | undefined {
    const [current, setCurrent] = useState(value);
    const [previous, setPrevious] = useState<T | undefined>(undefined);

    // Условие обязательно: без него setState в рендере зациклил бы компонент
    if (!Object.is(value, current)) {
        setPrevious(current);
        setCurrent(value);
    }

    return previous;
}
