import { useState } from 'react';
import type { Priority } from './types.ts';

type TodoFormProps = {
    onAdd: (data: { text: string; priority: Priority }) => void;
};

// Форма добавления задачи.
// Принимает onAdd — колбэк от родителя.
function TodoForm({ onAdd }: TodoFormProps) {
    const [text, setText] = useState('');
    const [priority, setPriority] = useState<Priority>('medium');

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const trimmed = text.trim();
        if (!trimmed) return;

        // Вызываем колбэк родителя, передавая ему данные
        onAdd({ text: trimmed, priority });

        // Сбрасываем форму
        setText('');
        setPriority('medium');
    }

    return (
        <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', gap: 8, marginBottom: 16 }}
        >
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Что нужно сделать?"
                style={{ flex: 1, padding: 10, borderRadius: 8, border: '1px solid #ddd' }}
            />

            {/* Select приоритета */}
            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                style={{ padding: 10, borderRadius: 8, border: '1px solid #ddd' }}
            >
                <option value="low">Низкий</option>
                <option value="medium">Средний</option>
                <option value="high">Высокий</option>
            </select>

            <button
                type="submit"
                style={{
                    padding: '10px 20px',
                    background: '#3b82f6',
                    color: 'white',
                    border: 'none',
                    borderRadius: 8,
                    cursor: 'pointer',
                    fontWeight: 600,
                }}
            >
                Добавить
            </button>
        </form>
    );
}

export default TodoForm;
