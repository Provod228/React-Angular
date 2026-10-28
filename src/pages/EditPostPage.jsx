import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { updatePost } from '../api/posts';
import PostForm from '../components/PostForm';
import { usePost } from '../hooks/usePosts';
import { postToFormValues } from '../schemas/postSchema';

function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: post, isLoading, isError } = usePost(id);

  const mutation = useMutation({
    mutationFn: (data) => updatePost(id, data),
    onSuccess: () => {
      // ['posts'] — префикс: инвалидирует и список, и ['posts', id]
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  async function handleSubmit(data) {
    await mutation.mutateAsync(data);
    navigate('/posts');
  }

  // PostForm рендерим ТОЛЬКО когда данные есть → defaultValues сразу правильные
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
      <h1>Редактирование поста #{id}</h1>
      <PostForm initialData={postToFormValues(post)} onSubmit={handleSubmit} />
    </div>
  );
}

export default EditPostPage;
