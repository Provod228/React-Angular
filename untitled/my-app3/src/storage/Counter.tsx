import { useLocalStorage } from '../hooks/useLocalStorage.ts';
import { STORAGE_KEYS } from '../storageKeys.ts';

// Упражнение 1: счётчик, который переживает перезагрузку страницы.
// Отличие от обычного счётчика — одна строка: useLocalStorage вместо useState.
function Counter() {
    const [count, setCount] = useLocalStorage(STORAGE_KEYS.counter, 0);

    return (
        <section className="card">
            <h2>1. Счётчик с сохранением</h2>
            <p className="big-number">{count}</p>
            <div className="row">
                <button className="btn" onClick={() => setCount((c) => c - 1)}>−1</button>
                <button className="btn" onClick={() => setCount((c) => c + 1)}>+1</button>
            </div>
            <p className="muted">Нажми несколько раз и перезагрузи страницу (F5).</p>
        </section>
    );
}

export default Counter;
