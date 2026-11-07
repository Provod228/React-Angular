# 3 задачи на отработку Дня 13 (TypeScript с React)

**Общее время:** ~45–60 минут. Задачи идут от простого к сложному, каждая — с **сравнением JS ↔ TS** прямо в условиях.

---

## Задача 1. Типизация компонента с пропсами (12–15 мин)

### Условие

Даны два компонента на JS. Переведи их на TypeScript **без изменения поведения**.

**JS-версия:**

```jsx
function UserCard({ user, onEdit, onDelete, isSelected }) {
  return (
    <div className={isSelected ? 'card card--selected' : 'card'}>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      <p>Возраст: {user.age}</p>
      <button onClick={() => onEdit(user.id)}>Редактировать</button>
      <button onClick={() => onDelete(user.id)}>Удалить</button>
    </div>
  );
}

function Avatar({ name, size, color }) {
  const firstLetter = name[0].toUpperCase();
  return (
    <div
      style={{
        width: size,
        height: size,
        background: color,
        borderRadius: '50%',
      }}
    >
      {firstLetter}
    </div>
  );
}
```

### Требования

1. **Для `UserCard`:**
   - Опиши `interface User` с полями `id`, `name`, `email`, `age`
   - Опиши `interface UserCardProps`
   - `isSelected` — **опциональный** boolean (по умолчанию `false`)
   - `onEdit` и `onDelete` принимают `id: number` и ничего не возвращают

2. **Для `Avatar`:**
   - `size` — число, **опциональный**, по умолчанию `48`
   - `color` — строка, **опциональный**, по умолчанию `'#6366f1'`

3. **Проверь в редакторе:** передай в `UserCard` объект без поля `email` — должна быть ошибка; передай в `Avatar` `size="big"` (строку) — должна быть ошибка.

### 💡 Подсказка

- Опциональный пропс — `?` после имени: `isSelected?: boolean`
- Значение по умолчанию — прямо в деструктуризации: `isSelected = false`
- Функция-пропс: `onEdit: (id: number) => void`
- Для `Avatar` используй `number` для `size` — иначе стили `width: "48px"` сработают, но `48` без `px` — стандарт в React.

### Что тренируешь

- `interface` для пропсов
- Опциональные пропсы + значения по умолчанию
- Типизация функций-пропсов
- Разница: в JS `user.nmae` — молча `undefined`, в TS — ошибка в редакторе

---

## Задача 2. Типизация хуков и событий (15–20 мин)

### Условие

Дана форма логина на JS. Переведи на TypeScript и **добавь корректные типы событий**.

**JS-версия:**

```jsx
import { useState, useRef } from 'react';

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const emailRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    setError(null);

    try {
      await onLogin({ email, password });
      setStatus('success');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handleKeyDown(e) {
    if (e.key === 'Escape') {
      setEmail('');
      setPassword('');
      emailRef.current?.focus();
    }
  }

  return (
    <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
      <input ref={emailRef} type="email" value={email} onChange={handleEmailChange} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Вход...' : 'Войти'}
      </button>
    </form>
  );
}
```

### Требования

1. **`status`** — только четыре значения: `'idle' | 'loading' | 'success' | 'error'`. Опиши `type Status` и типизируй `useState`.
   - Проверь: `setStatus('loding')` (опечатка) — должна быть ошибка в редакторе

2. **`error`** — `string | null`. Обрати внимание: в `catch (err)` поле `err.message` в TS **недоступно напрямую** — `err` имеет тип `unknown`.
   - Подсказка: используй проверку `err instanceof Error` или `catch (err: any)` (менее правильно, но допустимо)

3. **`emailRef`** — типизируй как `useRef<HTMLInputElement>(null)`
   - Проверь: `emailRef.current?.focus()` должен быть доступен

4. **События:**
   - `handleSubmit` — `React.FormEvent<HTMLFormElement>`
   - `handleEmailChange` — `React.ChangeEvent<HTMLInputElement>`
   - `handleKeyDown` — `React.KeyboardEvent<HTMLFormElement>` (обработчик на форме, не на инпуте!)

5. **Пропсы:**
   - `onLogin: (data: { email: string; password: string }) => Promise<void>`

### 💡 Подсказка

- Union-тип: `type Status = 'idle' | 'loading' | 'success' | 'error';` затем `useState<Status>('idle')`
- `useState<string | null>(null)` для `error`
- В `catch` TS не даёт `err.message`, потому что `err` может быть чем угодно (строка, объект, `null`). Проверка: `err instanceof Error ? err.message : 'Unknown error'`
- `handleKeyDown` висит на `<form>`, поэтому `React.KeyboardEvent<HTMLFormElement>` — а не `HTMLInputElement`

### Что тренируешь

- Union-типы для статусов (в JS легко опечататься — в TS нет)
- `useRef` с конкретным HTML-элементом
- Типы событий: `FormEvent`, `ChangeEvent`, `KeyboardEvent` — с правильными generic-параметрами
- Работа с `unknown` в `catch` (важное отличие от JS)

---

## Задача 3. Типизация reducer + Zod-схемы (18–25 мин)

### Условие

Дано приложение «корзина» на JS. Переведи на TypeScript, используя **discriminated union** для actions и **`z.infer`** для типа товара.

**JS-версия:**

```jsx
import { useReducer } from 'react';
import { z } from 'zod';

const productSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  price: z.coerce.number().positive(),
  quantity: z.coerce.number().int().positive(),
});

const initialState = {
  items: [],
  total: 0,
};

function cartReducer(state, action) {
  switch (action.type) {
    case 'add':
      return {
        ...state,
        items: [...state.items, action.product],
        total: state.total + action.product.price * action.product.quantity,
      };
    case 'remove':
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.id),
        total: state.items
          .filter((item) => item.id !== action.id)
          .reduce((sum, item) => sum + item.price * item.quantity, 0),
      };
    case 'clear':
      return initialState;
    default:
      return state;
  }
}

function Cart() {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  function addProduct(product) {
    dispatch({ type: 'add', product });
  }

  function removeProduct(id) {
    dispatch({ type: 'remove', id });
  }

  function clearCart() {
    dispatch({ type: 'clear' });
  }

  return (
    <div>
      <p>Товаров: {state.items.length}</p>
      <p>Итого: {state.total} ₽</p>
      <button onClick={() => addProduct({ id: crypto.randomUUID(), name: 'Книга', price: 500, quantity: 1 })}>
        Добавить
      </button>
      <button onClick={clearCart}>Очистить</button>
    </div>
  );
}
```

### Требования

1. **Тип товара из Zod:**
   ```tsx
   type Product = z.infer<typeof productSchema>;
   ```
   Проверь: `const p: Product = { id: 1, name: 'Книга', price: 500, quantity: 1 };` — должна быть ошибка (`id` — строка, не число).

2. **Состояние:**
   ```tsx
   interface CartState {
     items: Product[];
     total: number;
   }
   ```

3. **Actions — discriminated union:**
   ```tsx
   type CartAction =
     | { type: 'add'; product: Product }
     | { type: 'remove'; id: string }
     | { type: 'clear' };
   ```

4. **Reducer:**
   ```tsx
   function cartReducer(state: CartState, action: CartAction): CartState
   ```
   - Проверь: если в `dispatch` передать `{ type: 'add' }` без `product` — TS должен ругаться
   - Проверь: если в `case 'add'` обратиться к `action.id` (которого там нет) — ошибка

5. **`useReducer`:**
   ```tsx
   const [state, dispatch] = useReducer(cartReducer, initialState);
   ```
   - Проверь: `state.items[0].name` — редактор подсказывает `name: string`

6. **Хелперы:**
   - `addProduct(product: Product): void`
   - `removeProduct(id: string): void`

### 💡 Подсказка

- Discriminated union — это когда у каждого варианта есть общее поле-дискриминатор (`type`), и TS **сужает** тип по `switch (action.type)`:
  - В `case 'add'` — `action.product` доступен, `action.id` — нет
  - В `case 'remove'` — `action.id` доступен, `action.product` — нет
- `z.infer<typeof productSchema>` — извлекает TS-тип из схемы. Если изменишь схему (например, `price: z.string()`), тип обновится автоматически, а все места, где `price` использовался как число, **сломаются с ошибкой** — это и есть сила TS.
- В `default` case TS проверяет, что все варианты обработаны. Если забыл `case 'clear'` — ошибка «not all code paths return a value».

---

##  Сводная таблица: что в JS «прощает» TS

| Что | JS | TS |
|-----|-----|-----|
| Опечатка в пропсе | Молча `undefined` | Ошибка в редакторе |
| `setStatus('loding')` | Работает, `switch` не найдёт case | Ошибка: not assignable to `Status` |
| `dispatch({ type: 'add' })` без `product` | Упадёт в reducer | Ошибка в месте вызова |
| `err.message` в `catch` | Работает (но может упасть) | Ошибка: `err` — `unknown` |
| `product.price` — строка вместо числа | Сложение даст конкатенацию | Ошибка: not assignable |
| Забытый `case` в reducer | Молча вернёт `undefined` | Ошибка: not all code paths return |
| Привязка `useRef<HTMLInputElement>` к `<div>` | Тишина | Ошибка в редакторе |

---

## ✅ Чек-лист самопроверки после задач

- [ ] Могу описать `interface` для пропсов и не забываю `?` у опциональных
- [ ] Знаю, что `useState` выводит тип из начального значения, а для `null`/union нужен явный generic
- [ ] Умею типизировать `useRef<HTMLInputElement>(null)` и знаю, зачем `?.` при обращении к `current`
- [ ] Пишу discriminated union для `useReducer` и проверяю, что все actions обработаны
- [ ] Правильно выбираю тип события: `ChangeEvent<HTMLInputElement>`, `FormEvent<HTMLFormElement>`, `KeyboardEvent<HTMLFormElement>`
- [ ] Умею работать с `unknown` в `catch` через `instanceof Error`
- [ ] Использую `z.infer<typeof schema>` вместо ручного дублирования типа
- [ ] Понимаю, что при изменении Zod-схемы все места, где тип использовался неверно, сломаются **на этапе компиляции**, а не в рантайме

Если все три задачи решены и чек-лист закрыт — **День 13 отработан**. Можно переходить к Дню 14 (финальный проект + деплой).