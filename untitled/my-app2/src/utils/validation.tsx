// Выносим валидацию отдельно: чистая функция, легко тестировать.

type DataType = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
    age: number,
    agree: boolean,
}

export function validateForm({ name, email, password, confirmPassword, age, agree } : DataType) {
    const errors = {};

    // Имя: 2+ символа, только буквы и пробелы
    if (!name.trim()) {
        errors.name = 'Введите имя';
    } else if (name.trim().length < 2) {
        errors.name = 'Минимум 2 символа';
    } else if (!/^[a-zA-Zа-яА-ЯёЁ\s]+$/.test(name)) {
        errors.name = 'Только буквы и пробелы';
    }

    // Email: простой regex
    if (!email.trim()) {
        errors.email = 'Введите email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.email = 'Некорректный email';
    }

    // Пароль: 6+ символов, хотя бы одна цифра и одна буква
    if (!password) {
        errors.password = 'Введите пароль';
    } else if (password.length < 6) {
        errors.password = 'Минимум 6 символов';
    } else if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
        errors.password = 'Должен содержать буквы и цифры';
    }

    // Подтверждение пароля
    if (confirmPassword !== password) {
        errors.confirmPassword = 'Пароли не совпадают';
    }

    // Возраст: 18–120
    if (!age) {
        errors.age = 'Введите возраст';
    } else if (Number(age) < 18) {
        errors.age = 'Только с 18 лет';
    } else if (Number(age) > 120) {
        errors.age = 'Слишком большой возраст';
    }

    // Согласие
    if (!agree) {
        errors.agree = 'Нужно согласие';
    }

    return errors;
}