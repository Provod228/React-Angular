import TodoItem from './TodoItem';
import type { Todo } from './types.ts';

type TodoListProps = {
    todos: Todo[];
    onToggle: (id: number) => void;
    onDelete: (id: number) => void;
    onEdit: (id: number, newText: string) => void;
};

function TodoList({ todos, onToggle, onDelete, onEdit }: TodoListProps) {
    // Обработка пустого состояния
    if (todos.length === 0) {
        return (
            <p style={{ textAlign: 'center', color: '#999', padding: 40 }}>
                Здесь пусто 🎉
            </p>
        );
    }

    return (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </ul>
    );
}

export default TodoList;
