import { useState, type FormEvent } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import type { TasksProps } from '../types.tsx';

function TasksList({ tasks, setTasks }: TasksProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    // Фильтр живёт в URL: /tasks?filter=active
    const [searchParams, setSearchParams] = useSearchParams();
    const filter = searchParams.get('filter') ?? 'all';

    const visible = tasks.filter((t) => {
        if (filter === 'active') return !t.done;
        if (filter === 'done') return t.done;
        return true;
    });

    const addTask = (e: FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return; // title обязателен

        setTasks([
            ...tasks,
            {
                id: crypto.randomUUID(),
                title: title.trim(),
                description: description.trim(),
                done: false,
                createdAt: new Date().toISOString(),
            },
        ]);
        setTitle('');
        setDescription('');
    };

    const toggleDone = (id: string) => {
        setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
    };

    const remove = (id: string, taskTitle: string) => {
        if (!confirm(`Удалить задачу «${taskTitle}»?`)) return;
        setTasks(tasks.filter((t) => t.id !== id));
    };

    const changeFilter = (value: string) => {
        if (value === 'all') setSearchParams({});
        else setSearchParams({ filter: value });
    };

    return (
        <div>
            <h1>Задачи</h1>

            <form onSubmit={addTask}>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Название *"
                    required
                />{' '}
                <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Описание"
                />{' '}
                <button type="submit">Добавить</button>
            </form>

            <p>
                <button onClick={() => changeFilter('all')} disabled={filter === 'all'}>Все</button>{' '}
                <button onClick={() => changeFilter('active')} disabled={filter === 'active'}>Активные</button>{' '}
                <button onClick={() => changeFilter('done')} disabled={filter === 'done'}>Выполненные</button>
            </p>

            {visible.length === 0 ? (
                <p>Пусто</p>
            ) : (
                <ul>
                    {visible.map((task) => (
                        <li key={task.id}>
                            <input
                                type="checkbox"
                                checked={task.done}
                                onChange={() => toggleDone(task.id)}
                            />{' '}
                            <Link
                                to={`/tasks/${task.id}`}
                                style={{ textDecoration: task.done ? 'line-through' : 'none' }}
                            >
                                {task.title}
                            </Link>{' '}
                            <button onClick={() => remove(task.id, task.title)}>✕</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TasksList;