import { Navigate, NavLink, Route, Routes } from 'react-router-dom';
import PostsPage from './pages/PostsPage';
import NewPostPage from './pages/NewPostPage';
import EditPostPage from './pages/EditPostPage';
import PostDetailPage from './pages/PostDetailPage';
import UserFormPage from './pages/UserFormPage';
import Part12Page from './pages/Part12Page';

function App() {
  return (
    <>
      <nav>
        <NavLink to="/posts">Блог (задание 2)</NavLink>
        <NavLink to="/user-form">Часть 11: UserForm</NavLink>
        <NavLink to="/part12">Часть 12: посты</NavLink>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/posts" replace />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/new" element={<NewPostPage />} />
          <Route path="/posts/:id" element={<PostDetailPage />} />
          <Route path="/posts/:id/edit" element={<EditPostPage />} />

          <Route path="/user-form" element={<UserFormPage />} />
          <Route path="/part12" element={<Part12Page />} />
          <Route path="*" element={<p>Страница не найдена</p>} />
        </Routes>
      </div>
    </>
  );
}


export default App;
