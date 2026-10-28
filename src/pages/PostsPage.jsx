import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDeletePost, usePosts } from '../hooks/usePosts';

function PostsPage() {
  const navigate = useNavigate();
  const { data, isLoading, isError, error, refetch, isFetching } = usePosts();
  const deleteMutation = useDeletePost();
  const [search, setSearch] = useState('');

  // доп. задание 1: поиск по заголовку на клиенте
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!data) return [];
    return q ? data.filter((post) => post.title.toLowerCase().includes(q)) : data;
  }, [data, search]);

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) {
    return (
      <div>
        <p className="error">Ошибка: {error.message}</p>
        <button onClick={() => refetch()}>Повторить</button>
      </div>
    );
  }

  return (
    <div>
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <h1>Посты</h1>
        <button onClick={() => navigate('/posts/new')}>Создать пост</button>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Поиск по заголовку"
        style={{ width: '100%', boxSizing: 'border-box', marginBottom: 12 }}
      />

      {isFetching && <p className="muted">Обновление...</p>}
      {filtered.length === 0 && <p className="muted">Ничего не найдено</p>}

      {filtered.map((post) => (
        <div key={post.id} className="card">
          <Link to={`/posts/${post.id}`}>
            <strong>{post.title}</strong>
          </Link>
          <p className="muted">{post.body.slice(0, 100)}...</p>
          <div className="row">
            <button onClick={() => navigate(`/posts/${post.id}/edit`)}>
              Редактировать
            </button>
            <button
              onClick={() => deleteMutation.mutate(post.id)}
              disabled={deleteMutation.isPending}
            >
              Удалить
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostsPage;
