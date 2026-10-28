import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../api/posts';
import PostForm from '../components/PostForm';

function NewPostPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  async function handleSubmit(data) {
    // mutateAsync возвращает Promise и пробрасывает ошибку в PostForm
    await mutation.mutateAsync(data);
    navigate('/posts');
  }

  return (
    <div>
      <h1>Новый пост</h1>
      <PostForm onSubmit={handleSubmit} submitLabel="Создать" />
    </div>
  );
}

export default NewPostPage;
