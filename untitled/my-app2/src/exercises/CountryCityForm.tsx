import { useState } from 'react';
import Field from '../components/Field.tsx';

type Country = 'RU' | 'KZ' | 'US';

// У каждой страны своё правило проверки города
const COUNTRIES: Record<Country, { label: string; hint: string; validate: (city: string) => string | undefined }> = {
    RU: {
        label: 'Россия',
        hint: 'Кириллица, например «Нижний Новгород»',
        validate: (city) =>
            /^[А-ЯЁ][а-яё]+([ -][А-ЯЁа-яё][а-яё]+)*$/.test(city)
                ? undefined
                : 'Кириллица, с заглавной буквы',
    },
    KZ: {
        label: 'Казахстан',
        hint: 'Один из: Алматы, Астана, Шымкент, Караганда',
        validate: (city) =>
            ['Алматы', 'Астана', 'Шымкент', 'Караганда'].includes(city)
                ? undefined
                : 'Выберите город из списка поддерживаемых',
    },
    US: {
        label: 'США',
        hint: 'Латиница и код штата: «Austin, TX»',
        validate: (city) =>
            /^[A-Z][a-zA-Z .'-]+, [A-Z]{2}$/.test(city)
                ? undefined
                : 'Формат «City, ST» латиницей',
    },
};

// Упражнение 6: валидация города зависит от выбранной страны
function CountryCityForm() {
    const [country, setCountry] = useState<Country>('RU');
    const [city, setCity] = useState('');
    const [touched, setTouched] = useState(false);
    const [saved, setSaved] = useState<string | null>(null);

    // Ошибка вычисляется из ОБОИХ полей: сменил страну — ошибка пересчиталась сама,
    // никаких эффектов для «синхронизации» не нужно
    const trimmed = city.trim();
    const cityError = !trimmed ? 'Введите город' : COUNTRIES[country].validate(trimmed);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setTouched(true);
        if (cityError) return;
        setSaved(`${trimmed} (${COUNTRIES[country].label})`);
    }

    return (
        <section className="card">
            <h2>🌍 Страна и город</h2>

            {saved && <p className="success">Сохранено: {saved}</p>}

            <form className="form" onSubmit={handleSubmit} noValidate>
                <Field label="Страна" htmlFor="country">
                    <select
                        id="country"
                        className="input"
                        value={country}
                        onChange={(e) => setCountry(e.target.value as Country)}
                    >
                        {(Object.keys(COUNTRIES) as Country[]).map((code) => (
                            <option key={code} value={code}>{COUNTRIES[code].label}</option>
                        ))}
                    </select>
                </Field>

                <Field label="Город" htmlFor="city" error={touched ? cityError : undefined}>
                    <input
                        id="city"
                        className="input"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        onBlur={() => setTouched(true)}
                        placeholder={COUNTRIES[country].hint}
                    />
                </Field>

                <p className="muted">{COUNTRIES[country].hint}</p>

                <button className="btn" type="submit">Сохранить</button>
            </form>
        </section>
    );
}

export default CountryCityForm;
