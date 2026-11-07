import { Link } from 'react-router';
import { useCart, useCartDispatch } from '../context/cart/CartContext.ts';
import { getCartTotal } from '../context/cart/cartReducer.ts';
import { formatPrice } from '../data/products.ts';

// Упражнение 3: корзина — количество, удаление, итог
function Cart() {
    const cart = useCart();
    const dispatch = useCartDispatch();
    const total = getCartTotal(cart); // производное значение

    if (cart.length === 0) {
        return (
            <div className="stack">
                <h1>Корзина</h1>
                <p className="muted">Корзина пуста.</p>
                <div>
                    <Link to="/shop" className="btn">В магазин</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="stack">
            <h1>Корзина</h1>

            <ul className="cart">
                {cart.map(({ product, qty }) => (
                    <li key={product.id} className="cart__row">
                        <span className="cart__title">{product.emoji} {product.title}</span>

                        <div className="qty">
                            <button
                                className="icon-btn"
                                onClick={() => dispatch({ type: 'DECREMENT', productId: product.id })}
                                aria-label="Уменьшить"
                            >
                                −
                            </button>
                            <span className="qty__value">{qty}</span>
                            <button
                                className="icon-btn"
                                onClick={() => dispatch({ type: 'INCREMENT', productId: product.id })}
                                aria-label="Увеличить"
                            >
                                +
                            </button>
                        </div>

                        <span className="cart__sum">{formatPrice(product.price * qty)}</span>

                        <button
                            className="icon-btn icon-btn--danger"
                            onClick={() => dispatch({ type: 'REMOVE', productId: product.id })}
                            aria-label="Удалить"
                        >
                            ✕
                        </button>
                    </li>
                ))}
            </ul>

            <div className="cart__footer">
                <button className="btn btn--ghost" onClick={() => dispatch({ type: 'CLEAR' })}>Очистить</button>
                <p className="cart__total">Итого: {formatPrice(total)}</p>
            </div>
        </div>
    );
}

export default Cart;
