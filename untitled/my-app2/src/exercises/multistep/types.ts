// Данные всей многошаговой формы — один объект на верхнем уровне
export type WizardData = {
    // Шаг 1: личное
    firstName: string;
    lastName: string;
    email: string;
    // Шаг 2: адрес
    city: string;
    street: string;
    zip: string;
};

export type WizardField = keyof WizardData;
export type WizardErrors = Partial<Record<WizardField, string>>;

export const INITIAL_DATA: WizardData = {
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    street: '',
    zip: '',
};

// Пропсы, общие для шагов с полями: данные + ошибки вниз, изменения — колбэком вверх
export type StepProps = {
    data: WizardData;
    errors: WizardErrors;
    onChange: (field: WizardField, value: string) => void;
};

// Какие поля проверяет каждый шаг (шаг 3 — подтверждение, полей нет)
export const STEP_FIELDS: WizardField[][] = [
    ['firstName', 'lastName', 'email'],
    ['city', 'street', 'zip'],
    [],
];

export function validate(data: WizardData): WizardErrors {
    const errors: WizardErrors = {};
    if (data.firstName.trim().length < 2) errors.firstName = 'Минимум 2 символа';
    if (data.lastName.trim().length < 2) errors.lastName = 'Минимум 2 символа';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Некорректный email';
    if (data.city.trim().length < 2) errors.city = 'Введите город';
    if (data.street.trim().length < 3) errors.street = 'Введите улицу и дом';
    if (!/^\d{6}$/.test(data.zip)) errors.zip = 'Индекс — 6 цифр';
    return errors;
}
