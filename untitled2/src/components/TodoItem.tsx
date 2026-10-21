function TodoItem({ todo, onToggle, onDelete }) {
    return (
        <li
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 0',
                borderBottom: '1px solid #eee',
            }}
        >
            <input
                type="checkbox"
                checked={todo.done}
                onChange={() => onToggle(todo.id)}
            />
            <span
                style={{
                    flex: 1,
                    textDecoration: todo.done ? 'line-through' : 'none',
                    color: todo.done ? '#999' : '#1e293b',
                }}
            >
        {todo.text}
      </span>
            <button
                onClick={() => onDelete(todo.id)}
                style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}
            >
                ✕
            </button>
        </li>
    );
}

export default TodoItem;