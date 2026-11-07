import { useState } from 'react';
import { usePrevious } from '../hooks/usePrevious.ts';

// Упражнение 5: демонстрация usePrevious
function HooksDemo() {
    const [count, setCount] = useState(0);
    const [name, setName] = useState('');

    const prevCount = usePrevious(count);
    const prevName = usePrevious(name);

    // Пример пользы: направление изменения
    const trend = prevCount === undefined ? '' : count > prevCount ? '↑ выросло' : count < prevCount ? '↓ уменьшилось' : '';

    return (
        <div className="stack">
            <h1>usePrevious</h1>

            <section className="card">
                <h2>Счётчик</h2>
                <p className="big-number">{count}</p>
                <p className="muted">
                    Было: {prevCount ?? '—'} {trend && <b>{trend}</b>}
                </p>
                <div className="row">
                    <button className="btn" onClick={() => setCount((c) => c - 1)}>−1</button>
                    <button className="btn" onClick={() => setCount((c) => c + 1)}>+1</button>
                    <button className="btn" onClick={() => setCount((c) => c + 10)}>+10</button>
                </div>
            </section>

            <section className="card">
                <h2>Текст</h2>
                <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Печатай" />
                <p className="muted">Сейчас: «{name}», до последнего изменения: «{prevName ?? ''}»</p>
            </section>
        </div>
    );
}

export default HooksDemo;
