import { useEffect, useReducer } from 'react';
import { CartContext, CartDispatchContext } from './CartContext.ts';
import { cartReducer, type CartState } from './cartReducer.ts';

const STORAGE_KEY = 'app4:cart';

// Третий аргумент useReducer — ленивая инициализация (как useState(() => ...))
function loadCart(): CartState {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? (JSON.parse(saved) as CartState) : [];
    } catch {
        return [];
    }
}

// Упражнение 3: корзина на Context + useReducer
function CartProvider({ children }: { children: React.ReactNode }) {
    const [cart, dispatch] = useReducer(cartReducer, [], loadCart);

    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
        } catch (error) {
            console.warn('Не удалось сохранить корзину', error);
        }
    }, [cart]);

    // useMemo для value не нужен: cart и dispatch сами по себе стабильные ссылки
    return (
        <CartContext value={cart}>
            <CartDispatchContext value={dispatch}>{children}</CartDispatchContext>
        </CartContext>
    );
}

export default CartProvider;
