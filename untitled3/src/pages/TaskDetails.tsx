import {Link, useParams, useNavigate} from 'react-router-dom';
import type {TasksProps} from "../types.tsx";


function TaskDetails({tasks, setTasks}: TasksProps) {
    const {taskId} = useParams();
    const navigate = useNavigate();
    const task = tasks.find((t) => t.id === taskId);

    // Обработка несуществующего id
    if (!task) {
        return (
            <div>
                <h1>Задача не найдена</h1>
                <p>ID: {taskId}</p>
                <button onClick={() => navigate('/tasks')}>К списку</button>
            </div>
        );
    }

    const toggleDone = () => {
        setTasks(tasks.map((t) => (t.id === task.id ? { ...t, done: !t.done } : t)));
    };

    const remove = () => {
        if (!confirm(`Удалить задачу «${task.title}»?`)) return;
        setTasks(tasks.filter((t) => t.id !== task.id));
        navigate('/tasks');
    };

    return (
        <div>
            <h1>{task.title}</h1>
            <p>{task.description || 'Без описания'}</p>
            <p>Создана: {new Date(task.createdAt).toLocaleString('ru-RU')}</p>
            <p>Статус: {task.done ? '✅ Выполнена' : '⏳ В работе'}</p>

            <button onClick={toggleDone}>
                {task.done ? 'Вернуть в работу' : 'Отметить выполненной'}
            </button>
            {' '}
            <button onClick={remove}>Удалить</button>

            {/* Кнопка «Назад» — navigate(-1) как кнопка браузера */}
            <button onClick={() => navigate(-1)}>← Назад</button>
            {' '}
            <Link to="/tasks">Все задачи</Link>
        </div>
    );
}

export default TaskDetails;