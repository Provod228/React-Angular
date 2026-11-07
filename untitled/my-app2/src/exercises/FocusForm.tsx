import { useRef, useState } from 'react';
import Field from '../components/Field.tsx';

type Contact = {
    name: string;
    email: string;
    phone: string;
};

type FieldName = keyof Contact;

// Порядок полей на экране — по нему ищем «первое» невалидное
const FIELD_ORDER: FieldName[] = ['name', 'email', 'phone'];

const LABELS: Record<FieldName, string> = {
    name: 'Имя',
    email: 'Email',
    phone: 'Телефон (+7XXXXXXXXXX)',
};

function validate({ name, email, phone }: Contact): Partial<Record<FieldName, string>> {
    const errors: Partial<Record<FieldName, string>> = {};
    if (name.trim().length < 2) errors.name = 'Минимум 2 символа';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Некорректный email';
    if (!/^\+7\d{10}$/.test(phone)) errors.phone = 'Формат +7XXXXXXXXXX';
    return errors;
}

// Упражнение 7: после неудачного сабмита фокус на первое невалидное поле.
// Кнопка специально НЕ блокируется — иначе неудачного сабмита не будет.
function FocusForm() {
    const [form, setForm] = useState<Contact>({ name: '', email: '', phone: '' });
    const [submitted, setSubmitted] = useState(false);
    const [success, setSuccess] = useState(false);

    // Один ref-объект на все поля: { name: <input>, email: <input>, ... }
    // Вместо document.querySelector — прямые ссылки на DOM-элементы.
    const inputRefs = useRef<Partial<Record<FieldName, HTMLInputElement | null>>>({});

    const errors = validate(form);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const name = e.target.name as FieldName;
        setForm((prev) => ({ ...prev, [name]: e.target.value }));
        setSuccess(false);
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmitted(true);

        const firstInvalid = FIELD_ORDER.find((field) => errors[field]);
        if (firstInvalid) {
            inputRefs.current[firstInvalid]?.focus();
            return;
        }

        setSuccess(true);
    }

    return (
        <section className="card">
            <h2>🎯 Фокус на ошибке</h2>

            {success && <p className="success">Форма отправлена!</p>}

            <form className="form" onSubmit={handleSubmit} noValidate>
                {FIELD_ORDER.map((field) => (
                    <Field
                        key={field}
                        label={LABELS[field]}
                        htmlFor={`focus-${field}`}
                        error={submitted ? errors[field] : undefined}
                    >
                        <input
                            id={`focus-${field}`}
                            name={field}
                            className={`input ${submitted && errors[field] ? 'input--error' : ''}`}
                            value={form[field]}
                            onChange={handleChange}
                            // callback-ref: React передаёт DOM-элемент при монтировании и null при удалении
                            ref={(el) => {
                                inputRefs.current[field] = el;
                            }}
                        />
                    </Field>
                ))}

                <button className="btn" type="submit">Отправить</button>
            </form>
        </section>
    );
}

export default FocusForm;
