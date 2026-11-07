// Общие типы для todo-приложения (Work5_10 и его компоненты)

export type Priority = 'low' | 'medium' | 'high';

export type Todo = {
    id: number;
    text: string;
    done: boolean;
    priority: Priority;
    datetime: string; // ISO-строка даты добавления
};

export type SortBy = 'date' | 'alpha';
