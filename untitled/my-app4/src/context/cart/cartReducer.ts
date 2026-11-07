import type { Product } from '../../data/products.ts';

export type CartItem = {
    product: Product;
    qty: number;
};

export type CartState = CartItem[];

// Дискриминированное объединение: по полю type TS знает, какой у действия payload
export type CartAction =
    | { type: 'ADD'; product: Product }
    | { type: 'INCREMENT'; productId: number }
    | { type: 'DECREMENT'; productId: number }
    | { type: 'REMOVE'; productId: number }
    | { type: 'CLEAR' };

// Чистая функция: (старое состояние, действие) → новое состояние.
// Никаких запросов, setState и мутаций — её легко тестировать отдельно от React.
export function cartReducer(state: CartState, action: CartAction): CartState {
    switch (action.type) {
        case 'ADD': {
            const existing = state.find((item) => item.product.id === action.product.id);
            if (existing) {
                // Товар уже в корзине — увеличиваем количество
                return state.map((item) =>
                    item.product.id === action.product.id ? { ...item, qty: item.qty + 1 } : item,
                );
            }
            return [...state, { product: action.product, qty: 1 }];
        }

        case 'INCREMENT':
            return state.map((item) =>
                item.product.id === action.productId ? { ...item, qty: item.qty + 1 } : item,
            );

        case 'DECREMENT':
            return state
                .map((item) => (item.product.id === action.productId ? { ...item, qty: item.qty - 1 } : item))
                .filter((item) => item.qty > 0); // дошли до нуля — убираем из корзины

        case 'REMOVE':
            return state.filter((item) => item.product.id !== action.productId);

        case 'CLEAR':
            return [];

        default: {
            // Если добавить новый тип действия и забыть его обработать — TS подсветит здесь ошибку
            const unknownAction: never = action;
            throw new Error(`Неизвестное действие: ${JSON.stringify(unknownAction)}`);
        }
    }
}

// Производные значения — считаются из состояния, не хранятся в нём
export function getCartCount(state: CartState): number {
    return state.reduce((sum, item) => sum + item.qty, 0);
}

export function getCartTotal(state: CartState): number {
    return state.reduce((sum, item) => sum + item.product.price * item.qty, 0);
}
