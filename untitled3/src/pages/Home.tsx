import {useNavigate} from 'react-router-dom';
import type {TasksProps} from "../types.tsx";


function Home({ tasks}: TasksProps) {
    const navigate = useNavigate();

    const total = tasks.length;
    const done = tasks.filter((t) => t.done).length;
    const active = total - done;

    return (
        <div>
            <h1>Главная</h1>
            <p>Добро пожаловать в «Мои задачи»!</p>

            <ul>
                <li>Всего задач: {total}</li>
                <li>Выполнено: {done}</li>
                <li>Активно: {active}</li>
            </ul>

            <button onClick={() => navigate('/tasks')}>Перейти к задачам →</button>
        </div>
    );
}

export default Home;