import { useLocalStorage } from './hooks/useLocalStorage';
import TodoForm from './components/TodoForm';
import TodoItem from './components/TodoItem';

const STORAGE_KEY = 'todos-v1';

function App() {
  // 🔑 Главное: состояние живёт в localStorage автоматически
  const [todos, setTodos] = useLocalStorage(STORAGE_KEY, []);

  function addTodo(text) {
    const newTodo = {
      id: crypto.randomUUID(), // современный способ уникального id
      text,
      done: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  }

  function toggleTodo(id) {
    setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t))
    );
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  }

  function clearAll() {
    if (confirm('Удалить все задачи?')) {
      setTodos([]); // хук сам очистит localStorage
    }
  }

  const doneCount = todos.filter((t) => t.done).length;

  return (
      <div style={{ maxWidth: 500, margin: '40px auto', padding: 20 }}>
        <h1>📝 Todo (сохраняется)</h1>

        <TodoForm onAdd={addTodo} />

        <p style={{ color: '#666', fontSize: 14 }}>
          Всего: {todos.length} | Выполнено: {doneCount}
        </p>

        {todos.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#999', padding: 40 }}>
              Задач пока нет. Добавь первую — она переживёт перезагрузку!
            </p>
        ) : (
            <>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        onToggle={toggleTodo}
                        onDelete={deleteTodo}
                    />
                ))}
              </ul>
              <button onClick={clearAll} style={{ marginTop: 16, color: '#ef4444' }}>
                Очистить всё
              </button>
            </>
        )}
      </div>
  );
}

export default App;