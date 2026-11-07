import {useState} from 'react';
import type {Priority, Todo} from './types.ts';

type TodoItemProps = {
    todo: Todo;
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    onEdit: (id: number, newText: string) => void;
};

// Цвет левой полоски по приоритету
const priorityColors: Record<Priority, string> = {
    low: '#10b981',
    medium: '#f59e0b',
    high: '#ef4444',
};

// Один элемент списка
function TodoItem({todo, onToggle, onDelete, onEdit}: TodoItemProps) {
    // Локальное состояние редактирования — НЕ нужно родителю
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);

    // Задание 9: пустое название сохранить нельзя (производное значение, не state)
    const isEditEmpty = editText.trim() === '';

    function handleSave() {
        if (isEditEmpty) return; // остаёмся в режиме редактирования
        onEdit(todo.id, editText.trim());
        setIsEditing(false);
    }

    function handleCancel() {
        setEditText(todo.text); // откатываем изменения
        setIsEditing(false);
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === 'Enter') handleSave();
        if (e.key === 'Escape') handleCancel();
    }

    return (
        <li
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '12px 12px 12px 8px',
                borderBottom: '1px solid #eee',
                borderLeft: `4px solid ${priorityColors[todo.priority]}`,
            }}
        >
            <input
                type="checkbox"
                checked={todo.done}
                onChange={() => onToggle(todo.id)}
            />

            {/* Условный рендер: редактируем или показываем текст */}
            {isEditing ? (
                <div style={{flex: 1, display: 'flex', flexDirection: 'column', gap: 4}}>
                    <input
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                        style={{
                            padding: 6,
                            borderRadius: 6,
                            border: `1px solid ${isEditEmpty ? '#ef4444' : '#ddd'}`,
                        }}
                    />
                    {isEditEmpty && (
                        <span style={{color: '#ef4444', fontSize: 12}}>
                            Название не может быть пустым
                        </span>
                    )}
                </div>
            ) : (
                <span
                    onDoubleClick={() => setIsEditing(true)}
                    style={{
                        flex: 1,
                        cursor: 'pointer',
                        textDecoration: todo.done ? 'line-through' : 'none',
                        color: todo.done ? '#999' : '#e5e7eb',
                    }}
                >
                    {todo.text}
                </span>
            )}

            <span style={{color: '#999', fontSize: 12}}>
                {new Date(todo.datetime).toLocaleString('ru-RU')}
            </span>

            {/* Кнопки: показать в режиме редактирования, иначе — удалить */}
            {isEditing ? (
                <>
                    <button
                        onClick={handleSave}
                        disabled={isEditEmpty}
                        style={{cursor: isEditEmpty ? 'not-allowed' : 'pointer', opacity: isEditEmpty ? 0.5 : 1}}
                    >
                        💾
                    </button>
                    <button onClick={handleCancel} style={{cursor: 'pointer'}}>
                        ✖️
                    </button>
                </>
            ) : (
                <button
                    onClick={() => onDelete(todo.id)}
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
            )}
        </li>
    );
}

export default TodoItem;
