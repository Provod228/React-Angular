import Field from '../../components/Field.tsx';
import type { StepProps, WizardData, WizardField } from './types.ts';

// Одно текстовое поле шага — чтобы не повторять разметку
function TextField({ field, label, data, errors, onChange }: StepProps & { field: WizardField; label: string }) {
    return (
        <Field label={label} htmlFor={`wizard-${field}`} error={errors[field]}>
            <input
                id={`wizard-${field}`}
                className="input"
                value={data[field]}
                onChange={(e) => onChange(field, e.target.value)}
            />
        </Field>
    );
}

// Шаги НЕ хранят своё состояние — всё приходит сверху.
// Поэтому при «Назад» введённые данные не теряются.

export function PersonalStep(props: StepProps) {
    return (
        <>
            <TextField {...props} field="firstName" label="Имя" />
            <TextField {...props} field="lastName" label="Фамилия" />
            <TextField {...props} field="email" label="Email" />
        </>
    );
}

export function AddressStep(props: StepProps) {
    return (
        <>
            <TextField {...props} field="city" label="Город" />
            <TextField {...props} field="street" label="Улица и дом" />
            <TextField {...props} field="zip" label="Индекс" />
        </>
    );
}

export function ConfirmStep({ data }: { data: WizardData }) {
    return (
        <dl className="summary">
            <dt>Имя</dt>
            <dd>{data.firstName} {data.lastName}</dd>
            <dt>Email</dt>
            <dd>{data.email}</dd>
            <dt>Адрес</dt>
            <dd>{data.zip}, {data.city}, {data.street}</dd>
        </dl>
    );
}
