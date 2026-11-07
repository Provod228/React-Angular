export type Product = {
    id: number;
    title: string;
    price: number; // в рублях
    emoji: string;
};

export const PRODUCTS: Product[] = [
    { id: 1, title: 'Чехол для Switch', price: 1490, emoji: '🎮' },
    { id: 2, title: 'Чехол для PS5', price: 2290, emoji: '🕹️' },
    { id: 3, title: 'Наклейки на геймпад', price: 390, emoji: '✨' },
    { id: 4, title: 'Подставка для консоли', price: 1890, emoji: '🧱' },
    { id: 5, title: 'Кабель USB-C, 2 м', price: 590, emoji: '🔌' },
    { id: 6, title: 'Защитное стекло', price: 490, emoji: '🛡️' },
    { id: 7, title: 'Сумка для ноутбука', price: 3490, emoji: '💼' },
    { id: 8, title: 'Коврик для мыши', price: 790, emoji: '🖱️' },
];

export function formatPrice(rub: number): string {
    return `${rub.toLocaleString('ru-RU')} ₽`;
}
