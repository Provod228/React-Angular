import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deletePost, getPost, getPosts } from '../api/posts';


export function usePosts() {
  return useQuery({ queryKey: ['posts'], queryFn: getPosts });
}

export function usePost(id) {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: () => getPost(id),
    retry: false,
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,

    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['posts'], exact: true });
      const previous = queryClient.getQueryData(['posts']);
      queryClient.setQueryData(['posts'], (old = []) =>
        old.filter((post) => post.id !== id)
      );
      return { previous };
    },

    onError: (err, id, context) => {
      queryClient.setQueryData(['posts'], context.previous);
      alert(`Не удалось удалить: ${err.message}`);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'], exact: true });
    },
  });
}
