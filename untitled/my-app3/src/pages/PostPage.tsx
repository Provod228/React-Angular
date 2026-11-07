import { Link, useNavigate, useParams } from 'react-router';
import { findPost } from '../data/posts.ts';
import Breadcrumbs from '../components/Breadcrumbs.tsx';

// Упражнение 5: страница одного поста /posts/:id
function PostPage() {
    // Параметры из URL — всегда строки (и могут отсутствовать: string | undefined)
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const post = findPost(Number(id)); // Number(undefined) → NaN → пост не найдётся

    if (!post) {
        return (
            <div className="stack">
                <h1>Пост не найден</h1>
                <p className="muted">ID: {id}</p>
                <div>
                    <Link to="/posts">← К списку постов</Link>
                </div>
            </div>
        );
    }

    return (
        <article className="stack">
            <Breadcrumbs items={[{ label: 'Главная', to: '/' }, { label: 'Блог', to: '/posts' }, { label: post.title }]} />
            <h1>{post.title}</h1>
            <p className="muted">{new Date(post.date).toLocaleDateString('ru-RU')}</p>
            <p>{post.body}</p>
            <div>
                {/* navigate(-1) — как кнопка «Назад» в браузере */}
                <button className="btn btn--ghost" onClick={() => navigate(-1)}>← Назад</button>
            </div>
        </article>
    );
}

export default PostPage;
