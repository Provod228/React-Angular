import { useState } from 'react';
import Field from '../components/Field.tsx';

type Review = {
    name: string;
    rating: number; // 0 — ещё не выбрано
    text: string;
};

type Errors = Partial<Record<keyof Review, string>>;
type Touched = Partial<Record<keyof Review, boolean>>;

const INITIAL: Review = { name: '', rating: 0, text: '' };
const MIN_TEXT = 10;

// Чистая функция: ошибки вычисляются из значений, а не хранятся в state
function validate({ name, rating, text }: Review): Errors {
    const errors: Errors = {};
    if (name.trim().length < 2) errors.name = 'Минимум 2 символа';
    if (rating < 1) errors.rating = 'Поставьте оценку';
    if (text.trim().length < MIN_TEXT) errors.text = `Минимум ${MIN_TEXT} символов`;
    return errors;
}

// Упражнение 5: форма отзыва
function ReviewForm() {
    const [form, setForm] = useState<Review>(INITIAL);
    const [touched, setTouched] = useState<Touched>({});
    const [hoverRating, setHoverRating] = useState(0); // подсветка звёзд при наведении
    const [sent, setSent] = useState<Review | null>(null);

    const errors = validate(form);
    const isValid = Object.keys(errors).length === 0;

    function update<K extends keyof Review>(key: K, value: Review[K]) {
        setForm((prev) => ({ ...prev, [key]: value }));
    }

    function touch(key: keyof Review) {
        setTouched((prev) => ({ ...prev, [key]: true }));
    }

    function reset() {
        setForm(INITIAL);
        setTouched({});
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!isValid) return; // кнопка и так неактивна, это страховка
        setSent(form);
        reset();
    }

    // Ошибку показываем, только если поле «тронуто»
    const errorFor = (key: keyof Review) => (touched[key] ? errors[key] : undefined);
    const shownRating = hoverRating || form.rating;

    return (
        <section className="card">
            <h2>⭐ Форма отзыва</h2>

            {sent && (
                <p className="success">
                    Спасибо, {sent.name}! Оценка: {'★'.repeat(sent.rating)}
                </p>
            )}

            <form className="form" onSubmit={handleSubmit} noValidate>
                <Field label="Имя" htmlFor="review-name" error={errorFor('name')}>
                    <input
                        id="review-name"
                        className="input"
                        value={form.name}
                        onChange={(e) => update('name', e.target.value)}
                        onBlur={() => touch('name')}
                    />
                </Field>

                <Field label="Оценка" error={errorFor('rating')}>
                    <div className="stars" onMouseLeave={() => setHoverRating(0)}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                type="button"
                                className={`star ${star <= shownRating ? 'star--on' : ''}`}
                                onClick={() => {
                                    update('rating', star);
                                    touch('rating');
                                }}
                                onMouseEnter={() => setHoverRating(star)}
                                aria-label={`Оценка ${star}`}
                            >
                                ★
                            </button>
                        ))}
                    </div>
                </Field>

                <Field label={`Отзыв (${form.text.trim().length}/${MIN_TEXT}+)`} htmlFor="review-text" error={errorFor('text')}>
                    <textarea
                        id="review-text"
                        className="input"
                        rows={4}
                        value={form.text}
                        onChange={(e) => update('text', e.target.value)}
                        onBlur={() => touch('text')}
                    />
                </Field>

                <div className="row">
                    <button className="btn" type="submit" disabled={!isValid}>
                        Отправить
                    </button>
                    <button className="btn btn--ghost" type="button" onClick={reset}>
                        Сбросить
                    </button>
                </div>
            </form>
        </section>
    );
}

export default ReviewForm;
