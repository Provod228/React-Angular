import { createContext, useContext } from 'react';
import type { CartAction, CartState } from './cartReducer.ts';

// Паттерн «два контекста»: данные отдельно, dispatch отдельно.
// dispatch от useReducer никогда не меняется, поэтому компоненты,
// которые только меняют корзину (кнопка «В корзину»), не перерисовываются,
// когда меняется её содержимое.
export const CartContext = createContext<CartState | null>(null);
export const CartDispatchContext = createContext<React.Dispatch<CartAction> | null>(null);

export function useCart(): CartState {
    const ctx = useContext(CartContext);
    if (ctx === null) {
        throw new Error('useCart нужно вызывать внутри <CartProvider>');
    }
    return ctx;
}

export function useCartDispatch(): React.Dispatch<CartAction> {
    const ctx = useContext(CartDispatchContext);
    if (ctx === null) {
        throw new Error('useCartDispatch нужно вызывать внутри <CartProvider>');
    }
    return ctx;
}
