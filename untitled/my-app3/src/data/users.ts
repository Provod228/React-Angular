// «База» пользователей в памяти (упражнения 6 и 8)

export type User = {
    id: number;
    name: string;
    email: string;
    city: string;
};

export const USERS: User[] = [
    { id: 1, name: 'Анна', email: 'anna@mail.ru', city: 'Москва' },
    { id: 2, name: 'Пётр', email: 'petr@mail.ru', city: 'Санкт-Петербург' },
    { id: 3, name: 'Мария', email: 'maria@mail.ru', city: 'Казань' },
    { id: 4, name: 'Игорь', email: 'igor@mail.ru', city: 'Москва' },
    { id: 5, name: 'Ольга', email: 'olga@mail.ru', city: 'Казань' },
];

// Список городов для фильтра — без повторов, по алфавиту
export const CITIES: string[] = [...new Set(USERS.map((u) => u.city))].sort((a, b) => a.localeCompare(b, 'ru'));

export function findUser(id: number): User | undefined {
    return USERS.find((user) => user.id === id);
}
