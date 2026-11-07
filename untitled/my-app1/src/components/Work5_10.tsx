import { useState } from 'react';
import TodoForm from "./TodoForm.tsx";
import Filters from "./Filters.tsx";
import TodoList from "./TodoList.tsx";
import ProgressBar from "./ProgressBar.tsx";
import type { Priority, SortBy, Todo } from "./types.ts";


function Work5_10() {
    // ---- Состояние ----
    const [todos, setTodos] = useState<Todo[]>([
        { id: 1, text: 'Изучить useState', done: true, priority: 'high', datetime: "2026-11-05T11:29:56.730Z" },
        { id: 2, text: 'Разобраться со списками', done: false, priority: 'medium', datetime: "2026-11-05T11:30:56.730Z" },
        { id: 3, text: 'Сделать todo', done: false, priority: 'low', datetime: "2026-11-05T11:31:56.730Z" },
    ]);
    const [statusFilter, setStatusFilter] = useState('all');     // 'all' | 'active' | 'done'
    const [priorityFilter, setPriorityFilter] = useState('all'); // 'all' | 'low' | 'medium' | 'high'
    const [sortBy, setSortBy] = useState<SortBy>('date');
    const [search, setSearch] = useState('');


    // ---- Колбэки для детей ----

    function addTodo({ text, priority }: { text: string; priority: Priority }) {
        const newTodo: Todo = {
            id: Date.now(),
            text,
            priority,
            datetime: new Date().toISOString(),
            done: false,
        };
        setTodos((prev) => [...prev, newTodo]);
    }

    function toggleTodo(id: number) {
        setTodos((prev) =>
            prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
        );
    }

    function deleteTodo(id: number) {
        setTodos((prev) => prev.filter((t) => t.id !== id));
    }

    function editTodo(id: number, newText: string) {
        setTodos((prev) =>
            prev.map((t) => (t.id === id ? { ...t, text: newText } : t))
        );
    }

    // ---- Задание 10: массовые операции ----

    function markAllDone() {
        setTodos((prev) => prev.map((t) => ({ ...t, done: true })));
    }

    function deleteDone() {
        setTodos((prev) => prev.filter((t) => !t.done));
    }

    function clearAll() {
        setTodos([]);
    }

    // ---- Вычисляемые данные ----

    // Подсчёты (пересчитываются при каждом рендере — это нормально для маленьких списков)
    const counts = {
        all: todos.length,
        active: todos.filter((t) => !t.done).length,
        done: todos.filter((t) => t.done).length,
        low: todos.filter((t) => t.priority === 'low').length,
        medium: todos.filter((t) => t.priority === 'medium').length,
        high: todos.filter((t) => t.priority === 'high').length,
    };

    // Задание 7: строка поиска в нижнем регистре — для регистронезависимого сравнения
    const searchQuery = search.trim().toLowerCase();

    // Фильтрация по статусу, приоритету и поиску, затем сортировка.
    // filter возвращает новый массив, поэтому sort не мутирует состояние todos.
    const visibleTodos = todos
        .filter((t) => {
            // 1. Подходит ли по статусу?
            let matchesStatus = true;                     // для 'all' подходит любая
            if (statusFilter === 'active') matchesStatus = !t.done;
            if (statusFilter === 'done') matchesStatus = t.done;

            // 2. Подходит ли по приоритету?
            const matchesPriority = priorityFilter === 'all' || t.priority === priorityFilter;

            // 3. Содержит ли текст строку поиска? (пустой поиск подходит всем)
            const matchesSearch = t.text.toLowerCase().includes(searchQuery);

            // Показываем, только если подходит по ВСЕМ условиям
            return matchesStatus && matchesPriority && matchesSearch;
        })
        .sort((a, b) => {
            if (sortBy === 'alpha') {
                return a.text.localeCompare(b.text, 'ru');
            }
            // ISO-строки лексикографически упорядочены по времени
            return a.datetime.localeCompare(b.datetime);
        });


    const statusOptions = [
        { key: 'all', label: 'Все', count: counts.all },
        { key: 'active', label: 'Активные', count: counts.active },
        { key: 'done', label: 'Выполненные', count: counts.done },
    ];

    const priorityOptions = [
        { key: 'all', label: 'Любой приоритет', count: counts.all },
        { key: 'low', label: 'Низкий', count: counts.low },
        { key: 'medium', label: 'Средний', count: counts.medium },
        { key: 'high', label: 'Высокий', count: counts.high },
    ];

    const bulkButtonStyle = {
        padding: '8px 14px',
        border: '1px solid #ddd',
        borderRadius: 8,
        background: 'white',
        color: '#374151',
        cursor: 'pointer',
    };

    return (
        <div style={{ maxWidth: 560, margin: '40px auto', padding: 20 }}>
            <h1>📝 Todo List</h1>

            <TodoForm onAdd={addTodo} />

            {/* Задание 8: прогресс-бар */}
            <ProgressBar done={counts.done} total={counts.all} />

            {/* Задание 7: поиск */}
            <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="🔍 Поиск по задачам"
                style={{ width: '100%', padding: 10, borderRadius: 8, border: '1px solid #ddd', marginBottom: 16 }}
            />

            <Filters options={statusOptions} current={statusFilter} onChange={setStatusFilter} />

            <Filters options={priorityOptions} current={priorityFilter} onChange={setPriorityFilter} />

            <div style={{ display: 'flex', gap: 8, marginBottom: 16, alignItems: 'center' }}>
                <span style={{ color: '#666', fontSize: 14 }}>Сортировка:</span>

                <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortBy)}
                >
                    <option value="date">По дате</option>
                    <option value="alpha">По алфавиту</option>
                </select>
            </div>

            {/* Задание 10: массовые операции. Кнопки неактивны, когда делать нечего */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                <button onClick={markAllDone} disabled={counts.active === 0} style={bulkButtonStyle}>
                    Отметить все
                </button>
                <button onClick={deleteDone} disabled={counts.done === 0} style={bulkButtonStyle}>
                    Удалить выполненные
                </button>
                <button onClick={clearAll} disabled={counts.all === 0} style={bulkButtonStyle}>
                    Очистить всё
                </button>
            </div>

            {/* Условный рендер: если фильтр "done" и задач нет — особое сообщение */}
            {statusFilter === 'done' && visibleTodos.length === 0 && counts.all > 0 && (
                <p style={{ color: '#f59e0b', fontStyle: 'italic' }}>
                    Пока нет выполненных задач. Отметь что-нибудь ✅
                </p>
            )}

            <TodoList
                todos={visibleTodos}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
            />
        </div>
    );
}

export default Work5_10;
