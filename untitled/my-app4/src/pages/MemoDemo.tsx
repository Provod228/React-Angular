import { memo, useCallback, useMemo, useState } from 'react';

type Task = {
    id: number;
    text: string;
    done: boolean;
};

function makeTasks(): Task[] {
    return Array.from({ length: 8 }, (_, i) => ({ id: i + 1, text: `Задача ${i + 1}`, done: false }));
}

type RowProps = {
    task: Task;
    onToggle: (id: number) => void;
};

// ---------- Обычная строка: перерисовывается при каждом рендере родителя ----------
function PlainRow({ task, onToggle }: RowProps) {
    console.log('%c[обычный] render', 'color:#ef4444', task.text);
    return (
        <li className="task-row">
            <label>
                <input type="checkbox" checked={task.done} onChange={() => onToggle(task.id)} /> {task.text}
            </label>
        </li>
    );
}

// ---------- memo-строка: перерисовывается, только если её пропсы изменились (по ===) ----------
const MemoRow = memo(function MemoRow({ task, onToggle }: RowProps) {
    console.log('%c[memo] render', 'color:#10b981', task.text);
    return (
        <li className="task-row">
            <label>
                <input type="checkbox" checked={task.done} onChange={() => onToggle(task.id)} /> {task.text}
            </label>
        </li>
    );
});

// Список без оптимизаций
function PlainList() {
    const [tasks, setTasks] = useState(makeTasks);
    const [clicks, setClicks] = useState(0);

    // Новая функция на каждый рендер — но PlainRow всё равно не memo, ему без разницы
    function toggle(id: number) {
        setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
    }

    return (
        <section className="card">
            <h2>Без оптимизации</h2>
            <button className="btn btn--ghost" onClick={() => setClicks((c) => c + 1)}>
                Посторонний счётчик: {clicks}
            </button>
            <ul className="task-list">
                {tasks.map((task) => (
                    <PlainRow key={task.id} task={task} onToggle={toggle} />
                ))}
            </ul>
        </section>
    );
}

// Список с «каскадом мемоизации»: memo + useCallback (+ useMemo для вычисления)
function MemoList() {
    const [tasks, setTasks] = useState(makeTasks);
    const [clicks, setClicks] = useState(0);
    const [hideDone, setHideDone] = useState(false);

    // useCallback: та же функция между рендерами → проп onToggle не меняется → memo срабатывает.
    // Без useCallback memo был бы бесполезен: новая функция = «изменившийся» проп.
    const toggle = useCallback((id: number) => {
        setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
    }, []);

    // useMemo: фильтрация пересчитывается только при изменении tasks или hideDone,
    // а не при нажатии постороннего счётчика.
    // (На 8 элементах это не нужно — тут для демонстрации; на тысячах уже имеет смысл.)
    const visibleTasks = useMemo(() => {
        console.log('%c[memo] пересчёт фильтрации', 'color:#6366f1');
        return hideDone ? tasks.filter((t) => !t.done) : tasks;
    }, [tasks, hideDone]);

    return (
        <section className="card">
            <h2>С memo + useCallback</h2>
            <div className="row">
                <button className="btn btn--ghost" onClick={() => setClicks((c) => c + 1)}>
                    Посторонний счётчик: {clicks}
                </button>
                <label className="row">
                    <input type="checkbox" checked={hideDone} onChange={(e) => setHideDone(e.target.checked)} />
                    Скрыть выполненные
                </label>
            </div>
            <ul className="task-list">
                {visibleTasks.map((task) => (
                    <MemoRow key={task.id} task={task} onToggle={toggle} />
                ))}
            </ul>
        </section>
    );
}

// Упражнение 6: сравнение двух списков
function MemoDemo() {
    return (
        <div className="stack">
            <h1>Оптимизация списка</h1>
            <p className="muted">
                Открой консоль (F12). Отметь задачу или нажми «Посторонний счётчик» в каждом списке:
                слева перерисовываются <b>все</b> строки, справа — только изменившаяся (или ни одной).
                В dev-режиме StrictMode рендерит дважды, поэтому строки в логе могут повторяться парами.
            </p>
            <div className="columns">
                <PlainList />
                <MemoList />
            </div>
        </div>
    );
}

export default MemoDemo;
