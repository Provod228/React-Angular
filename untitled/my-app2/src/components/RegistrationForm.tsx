import { useRef, useState } from 'react';
import { validateForm } from '../utils/validation';

function RegistrationForm({ onSuccess }) {
    // ---- Одно состояние на всю форму ----
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        age: '',
        agree: false,
    });

    // ---- Какие поля пользователь уже "трогал" ----
    // Ошибки показываем только для тронутых полей — это лучший UX.
    const [touched, setTouched] = useState({});

    // ---- Показ пароля ----
    const [showPassword, setShowPassword] = useState(false);

    // ---- Ref на первое поле для автофокуса ----
    const nameRef = useRef(null);

    // ---- Вычисляем ошибки на каждом рендере ----
    // НЕ храним ошибки в state — они производные от form
    const errors = validateForm(form);
    const isValid = Object.keys(errors).length === 0;

    // ---- Обработчики ----

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    }

    function handleBlur(e) {
        // Помечаем поле как "тронутое" — теперь его ошибки можно показывать
        setTouched((prev) => ({ ...prev, [e.target.name]: true }));
    }

    function handleSubmit(e) {
        e.preventDefault();

        // Помечаем ВСЕ поля тронутыми — чтобы показать все ошибки
        const allTouched = Object.keys(form).reduce(
            (acc, key) => ({ ...acc, [key]: true }),
            {}
        );
        setTouched(allTouched);

        if (!isValid) {
            // Фокусируем первое невалидное поле
            const firstErrorField = Object.keys(errors)[0];
            document.querySelector(`[name="${firstErrorField}"]`)?.focus();
            return;
        }

        // Всё валидно — отправляем
        onSuccess?.(form);

        // Сброс формы
        setForm({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            age: '',
            agree: false,
        });
        setTouched({});
        setShowPassword(false);

        // Возвращаем фокус на первое поле
        nameRef.current?.focus();
    }

    // ---- Хелпер для рендера поля ошибки ----
    function renderError(field) {
        if (!touched[field] || !errors[field]) return null;
        return (
            <p style={{ color: '#ef4444', fontSize: 13, margin: '4px 0 0' }}>
                {errors[field]}
            </p>
        );
    }

    // ---- Стили полей ----
    const fieldStyle = (field) => ({
        width: '100%',
        padding: 10,
        borderRadius: 8,
        border: `1px solid ${
            touched[field] && errors[field] ? '#ef4444' : '#ddd'
        }`,
        fontSize: 14,
    });

    return (
        <form
            onSubmit={handleSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
            noValidate // отключаем браузерную валидацию — у нас своя
        >
            <div>
                <label htmlFor="name">Имя</label>
                <input
                    id="name"
                    name="name"
                    ref={nameRef}
                    autoFocus
                    value={form.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={fieldStyle('name')}
                />
                {renderError('name')}
            </div>

            <div>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={fieldStyle('email')}
                />
                {renderError('email')}
            </div>

            <div>
                <label htmlFor="password">Пароль</label>
                <div style={{ display: 'flex', gap: 6 }}>
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={form.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={fieldStyle('password')}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        style={{ padding: '0 12px', cursor: 'pointer' }}
                    >
                        {showPassword ? '🙈' : '👁️'}
                    </button>
                </div>
                {renderError('password')}
            </div>

            <div>
                <label htmlFor="confirmPassword">Повтор пароля</label>
                <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={fieldStyle('confirmPassword')}
                />
                {renderError('confirmPassword')}
            </div>

            <div>
                <label htmlFor="age">Возраст</label>
                <input
                    id="age"
                    name="age"
                    type="number"
                    value={form.age}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    style={fieldStyle('age')}
                />
                {renderError('age')}
            </div>

            <div>
                <label style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <input
                        name="agree"
                        type="checkbox"
                        checked={form.agree}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    Согласен с условиями
                </label>
                {renderError('agree')}
            </div>

            <button
                type="submit"
                disabled={!isValid}
                style={{
                    padding: 12,
                    background: isValid ? '#3b82f6' : '#9ca3af',
                    color: 'white',
                    border: 'none',
                    borderRadius: 8,
                    fontSize: 15,
                    fontWeight: 600,
                    cursor: isValid ? 'pointer' : 'not-allowed',
                }}
            >
                Зарегистрироваться
            </button>
        </form>
    );
}

export default RegistrationForm;