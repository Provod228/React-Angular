import {type JSX, useState} from "react";

function TodoListProduct(): JSX.Element {
    // ---- Состояние ----
    // Массив задач. Каждая задача — объект { id, text, done }
    const [todos, setTodos] = useState([
        {id: 1, text: 'Картошка', count: 10, done: false},
        {id: 2, text: 'Лук', count: 20, done: false},
    ]);

    // Значение инпута (controlled component)
    const [inputValue, setInputValue] = useState('');
    const [inputCount, setInputCount] = useState(0);

    // ---- Обработчики ----

    // Добавить задачу
    function handleAdd() {
        const trimmed = inputValue.trim();
        const countValue = inputCount.valueOf();
        if (!trimmed) return; // не добавляем пустые

        const newTodo = {
            id: Date.now(), // простой способ получить уникальный id
            text: trimmed,
            count: countValue,
            done: false,
        };

        // ✅ Создаём НОВЫЙ массив, не мутируем
        setTodos((prev) => [...prev, newTodo]);
        setInputValue('');
        setInputCount(0);
    }

    // Переключить done
    function handleToggle(id: number) {
        // ✅ map создаёт новый массив
        setTodos((prev) =>
            prev.map((todo) =>
                todo.id === id ? {...todo, done: !todo.done} : todo
            )
        );
    }

    // Удалить задачу
    function handleDelete(id: number) {
        // ✅ filter создаёт новый массив
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
    }

    function handleSubmit() {
        return inputCount <= 0;
    }

    // ---- Подсчёты ----
    const doneCount = todos.filter((t) => t.done).length;
    const activeCount = todos.length - doneCount;

    return (
        <div style={{maxWidth: 500, margin: '40px auto', padding: 20}}>
            <h1>📝 Список прод.</h1>

            {/* Форма добавления. Enter в инпуте тоже сработает благодаря form + onSubmit */}
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleAdd();
                }}
                style={{display: 'flex', gap: 8, marginBottom: 16}}
            >
                <input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Что нужно купить?"
                    style={{flex: 1, padding: 10, borderRadius: 8, border: '1px solid #ddd'}}
                />

                <input
                    value={inputCount}
                    onChange={(e) => setInputCount(Number(e.target.value))}
                    placeholder="Количество?"
                    style={{flex: 1, padding: 10, borderRadius: 8, border: '1px solid #ddd'}}
                />

                <button type="submit" disabled={handleSubmit()} style={{padding: '10px 20px'}}>
                    Добавить
                </button>
            </form>

            {/* Статистика */}
            <p style={{color: '#666', fontSize: 14}}>
                Всего: {todos.length} | Активных: {activeCount} | Выполнено: {doneCount}
            </p>

            {/* Пустое состояние */}
            {todos.length === 0 && (
                <p style={{textAlign: 'center', color: '#999', padding: 40}}>
                    Задач пока нет. Добавь первую!
                </p>
            )}

            {/* Список */}
            <ul style={{listStyle: 'none', padding: 0}}>
                {todos.map((todo) => (
                    <li
                        key={todo.id}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            padding: '12px 0',
                            borderBottom: '1px solid #eee',
                        }}
                    >
                        {/* Чекбокс переключает done */}
                        <input
                            type="checkbox"
                            checked={todo.done}
                            onChange={() => handleToggle(todo.id)}
                        />

                        {/* Текст: если done — зачёркнут */}
                        <span
                            style={{
                                flex: 1,
                                textDecoration: todo.done ? 'line-through' : 'none',
                                color: todo.done ? '#999' : '#ffffff',
                            }}
                        >
                          {todo.text}
                        </span>

                        <span
                            style={{
                                flex: 1,
                                textDecoration: todo.done ? 'line-through' : 'none',
                                color: todo.done ? '#999' : '#ffffff',
                            }}
                        >
                          {todo.count}
                        </span>

                        {/* Кнопка удаления */}
                        <button
                            onClick={() => handleDelete(todo.id)}
                            style={{
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: 18,
                                color: '#ef4444',
                            }}
                        >
                            ✕
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoListProduct;