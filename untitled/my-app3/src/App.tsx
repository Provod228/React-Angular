import { Route, Routes } from 'react-router';
import './App.css';
import Layout from './components/Layout.tsx';
import RequireAdmin from './components/RequireAdmin.tsx';
import Home from './pages/Home.tsx';
import About from './pages/About.tsx';
import PostsList from './pages/PostsList.tsx';
import PostPage from './pages/PostPage.tsx';
import UsersList from './pages/UsersList.tsx';
import UserProfile from './pages/UserProfile.tsx';
import StoragePage from './pages/StoragePage.tsx';
import Admin from './pages/Admin.tsx';
import NotFound from './pages/NotFound.tsx';

function App() {
    return (
        <Routes>
            {/* Layout-маршрут без path: не добавляет сегмент к URL, а оборачивает все страницы */}
            <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />

                {/* Упражнение 5: блог */}
                <Route path="/posts" element={<PostsList />} />
                <Route path="/posts/:id" element={<PostPage />} />

                {/* Упражнения 6 и 8: крошки и ?city= */}
                <Route path="/users" element={<UsersList />} />
                <Route path="/users/:id" element={<UserProfile />} />

                {/* Упражнения 1, 3, 4 (тема — в шапке) */}
                <Route path="/storage" element={<StoragePage />} />

                {/* Упражнение 7: всё внутри RequireAdmin доступно только админу */}
                <Route element={<RequireAdmin />}>
                    <Route path="/admin" element={<Admin />} />
                </Route>

                {/* Всё, что не совпало, — 404 */}
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;
