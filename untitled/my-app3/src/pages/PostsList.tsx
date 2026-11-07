import { Link } from 'react-router';
import { POSTS } from '../data/posts.ts';

// Упражнение 5: список постов блога
function PostsList() {
    return (
        <div className="stack">
            <h1>Блог</h1>
            <ul className="cards">
                {POSTS.map((post) => (
                    <li key={post.id}>
                        {/* Ссылка на динамический маршрут /posts/:id */}
                        <Link to={`/posts/${post.id}`} className="card card--link">
                            <h2>{post.title}</h2>
                            <p className="muted">{new Date(post.date).toLocaleDateString('ru-RU')}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PostsList;
