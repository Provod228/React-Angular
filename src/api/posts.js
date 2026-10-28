const BASE = 'https://jsonplaceholder.typicode.com';


async function handleResponse(res) {
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const error = new Error(body.message ?? `HTTP ${res.status}`);
    error.status = res.status;
    error.field = body.field;
    throw error;
  }
  return res.json();
}


function fakeServerValidation(data) {
  if (data.title?.toLowerCase().includes('спам')) {
    const error = new Error('Сервер: заголовок содержит запрещённое слово');
    error.field = 'title';
    throw error;
  }
}

export async function getPosts() {
  const res = await fetch(`${BASE}/posts?_limit=10`);
  return handleResponse(res);
}

export async function getPost(id) {
  const res = await fetch(`${BASE}/posts/${id}`);
  const post = await handleResponse(res);
  if (!post || !post.id) throw new Error('Пост не найден');
  return post;
}

export async function createPost(data) {
  fakeServerValidation(data);
  const res = await fetch(`${BASE}/posts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return handleResponse(res);
}

export async function updatePost(id, data) {
  fakeServerValidation(data);
  const res = await fetch(`${BASE}/posts/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, id }),
  });
  return handleResponse(res);
}

export async function deletePost(id) {
  const res = await fetch(`${BASE}/posts/${id}`, { method: 'DELETE' });
  return handleResponse(res);
}

