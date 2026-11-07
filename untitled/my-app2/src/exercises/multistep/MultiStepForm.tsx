import { useState } from 'react';
import { AddressStep, ConfirmStep, PersonalStep } from './Steps.tsx';
import { INITIAL_DATA, STEP_FIELDS, validate, type WizardData, type WizardErrors, type WizardField } from './types.ts';

const STEP_TITLES = ['Личное', 'Адрес', 'Подтверждение'];

// Упражнение 10: многошаговая форма. Всё состояние — здесь, на верхнем уровне.
function MultiStepForm() {
    const [data, setData] = useState<WizardData>(INITIAL_DATA);
    const [step, setStep] = useState(0);
    // Шаги, на которых пользователь уже нажимал «Далее» — для них показываем ошибки
    const [attempted, setAttempted] = useState<boolean[]>([false, false, false]);
    const [done, setDone] = useState(false);

    const allErrors = validate(data);

    // Ошибки только полей ТЕКУЩЕГО шага и только после попытки перейти дальше
    const stepFields = STEP_FIELDS[step];
    const visibleErrors: WizardErrors = {};
    if (attempted[step]) {
        for (const field of stepFields) {
            if (allErrors[field]) visibleErrors[field] = allErrors[field];
        }
    }
    const isStepValid = stepFields.every((field) => !allErrors[field]);

    function handleChange(field: WizardField, value: string) {
        setData((prev) => ({ ...prev, [field]: value }));
    }

    function handleNext() {
        setAttempted((prev) => prev.map((v, i) => (i === step ? true : v)));
        if (isStepValid) setStep((s) => s + 1);
    }

    function handleSubmit() {
        setDone(true);
    }

    function restart() {
        setData(INITIAL_DATA);
        setAttempted([false, false, false]);
        setStep(0);
        setDone(false);
    }

    if (done) {
        return (
            <section className="card">
                <h2>🧭 Многошаговая форма</h2>
                <p className="success">Готово! Данные {data.firstName} {data.lastName} отправлены.</p>
                <button className="btn" onClick={restart}>Заполнить заново</button>
            </section>
        );
    }

    const isLast = step === STEP_TITLES.length - 1;

    return (
        <section className="card">
            <h2>🧭 Многошаговая форма</h2>

            {/* Индикатор шагов */}
            <ol className="steps">
                {STEP_TITLES.map((title, i) => (
                    <li key={title} className={i === step ? 'steps__item steps__item--active' : 'steps__item'}>
                        {i + 1}. {title}
                    </li>
                ))}
            </ol>

            <div className="form">
                {step === 0 && <PersonalStep data={data} errors={visibleErrors} onChange={handleChange} />}
                {step === 1 && <AddressStep data={data} errors={visibleErrors} onChange={handleChange} />}
                {step === 2 && <ConfirmStep data={data} />}
            </div>

            <div className="row">
                <button className="btn btn--ghost" onClick={() => setStep((s) => s - 1)} disabled={step === 0}>
                    ← Назад
                </button>
                {isLast ? (
                    <button className="btn" onClick={handleSubmit}>Отправить</button>
                ) : (
                    <button className="btn" onClick={handleNext}>Далее →</button>
                )}
            </div>
        </section>
    );
}

export default MultiStepForm;
