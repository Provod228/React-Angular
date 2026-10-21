import { Routes, Route, NavLink, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import Tasks from './pages/Tasks.tsx';
import NotFound from './pages/NotFound';
import TaskDetails from "./pages/TaskDetails.tsx";
import {useLocalStorage} from "./hooks/useLocalStorage.tsx";

const demoTasks = [
    {
        "id": "3f1c9a2e-7b4d-4e8a-9c21-5d6f0a1b2c3d",
        "title": "Починить кран",
        "description": "На кухне капает кран, купить новую прокладку",
        "done": false,
        "createdAt": "2026-10-19T10:00:00.000Z"
    },
    {
        "id": "8a7b6c5d-4e3f-4a2b-8c1d-0e9f8a7b6c5d",
        "title": "Сделать домашку по React",
        "description": "Приложение «Мои задачи» с роутингом и localStorage",
        "done": false,
        "createdAt": "2026-10-20T15:30:00.000Z"
    },
    {
        "id": "c2d4e6f8-1a3b-4c5d-9e7f-2b4d6f8a0c1e",
        "title": "Купить продукты",
        "description": "",
        "done": true,
        "createdAt": "2026-10-21T09:15:00.000Z"
    }
]

function Layout() {
    // Стиль для NavLink — функция от isActive
    const linkStyle = ({ isActive }) => ({
        fontWeight: isActive ? 'bold' : 'normal',
        color: isActive ? '#3b82f6' : '#374151',
        textDecoration: 'none',
        padding: '8px 12px',
    });

    return (
        <div>
            <nav style={{ display: 'flex', gap: 4, padding: 12, borderBottom: '1px solid #ddd' }}>
                <NavLink to="/" style={linkStyle}>Главная</NavLink>
                <NavLink to="/tasks" style={linkStyle}>Задачи</NavLink>
            </nav>

            <main style={{ maxWidth: 700, margin: '0 auto', padding: 20 }}>
                <Outlet />
            </main>
        </div>
    );
}

function App() {
    const [tasks, setTasks] = useLocalStorage('tasks-app:v1', demoTasks);
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<Home tasks={tasks} setTasks={setTasks}/>} />
                <Route path="/tasks" element={<Tasks tasks={tasks} setTasks={setTasks} />} />
                <Route path="/tasks/:taskId" element={<TaskDetails tasks={tasks} setTasks={setTasks} />} />
            </Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;