import { useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDeletePost, usePost } from '../hooks/usePosts';

function PostDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: post, isLoading, isError } = usePost(id);
  const deleteMutation = useDeletePost();

  function handleDelete() {
    deleteMutation.mutate(post.id, {
      onSuccess: () => {
        navigate('/posts');
        // данные удалённого поста больше не нужны в кэше
        queryClient.removeQueries({ queryKey: ['posts', id] });
      },
    });
  }

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) {
    return (
      <div>
        <p className="error">Пост не найден</p>
        <Link to="/posts">← К списку</Link>
      </div>
    );
  }

  return (
    <div>
      <Link to="/posts">← К списку</Link>
      <h1>{post.title}</h1>
      <p className="muted">Пост #{post.id}, автор #{post.userId}</p>
      <p>{post.body}</p>

      <div className="row">
        <button onClick={() => navigate(`/posts/${id}/edit`)}>Редактировать</button>
        <button onClick={handleDelete} disabled={deleteMutation.isPending}>
          {deleteMutation.isPending ? 'Удаление...' : 'Удалить'}
        </button>
      </div>
    </div>
  );
}

export default PostDetailPage;
