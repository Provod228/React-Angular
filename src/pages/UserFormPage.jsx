import { useState } from 'react';
import UserForm from '../components/UserForm';

// Часть 11: страница-обёртка, имитирует отправку на сервер
function UserFormPage() {
  const [created, setCreated] = useState(null);

  async function handleSubmit(data) {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // «сервер думает»
    console.log('Валидные данные:', data);
    setCreated(data);
  }

  return (
    <div>
      <h1>Часть 11: создание пользователя</h1>
      <UserForm onSubmit={handleSubmit} />

      {created && (
        <div className="card" style={{ marginTop: 20 }}>
          <strong>Создан пользователь (данные после Zod):</strong>
          {/* age здесь уже number, а не строка — заслуга z.coerce.number() */}
          <pre>{JSON.stringify(created, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default UserFormPage;
