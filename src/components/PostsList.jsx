import { useQuery } from '@tanstack/react-query';
import { getPosts } from '../api/posts';


function PostsList() {
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: ['posts'],
    queryFn: getPosts,
  });

  if (isLoading) return <p>Загрузка постов...</p>;
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
      {isFetching && <p className="muted">Обновление...</p>}

      <ul>
        {data.map((post) => (
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p className="muted">{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostsList;
