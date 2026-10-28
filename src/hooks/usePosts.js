import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deletePost, getPost, getPosts } from '../api/posts';

// Доп. задание 6: хуки-обёртки над useQuery
export function usePosts() {
  return useQuery({ queryKey: ['posts'], queryFn: getPosts });
}

export function usePost(id) {
  return useQuery({
    queryKey: ['posts', id], // id используется в queryFn → обязан быть в ключе
    queryFn: () => getPost(id),
    retry: false, // доп. задание 5: 404 — не повод повторять запрос
  });
}

// Удаление с оптимистичным обновлением списка
export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,

    onMutate: async (id) => {
      // 1. отменяем летящие запросы списка, чтобы они не перезаписали наш кэш
      await queryClient.cancelQueries({ queryKey: ['posts'], exact: true });
      // 2. снимок «до»
      const previous = queryClient.getQueryData(['posts']);
      // 3. сразу убираем пост — как будто сервер уже ответил «ок»
      queryClient.setQueryData(['posts'], (old = []) =>
        old.filter((post) => post.id !== id)
      );
      // 4. это станет context в onError/onSettled
      return { previous };
    },

    onError: (err, id, context) => {
      // запрос упал → возвращаем снимок
      queryClient.setQueryData(['posts'], context.previous);
      alert(`Не удалось удалить: ${err.message}`);
    },

    onSettled: () => {
      // в любом случае синхронизируемся с сервером.
      // exact: true — только список, детали удалённого поста не трогаем
      queryClient.invalidateQueries({ queryKey: ['posts'], exact: true });
    },
  });
}
