import { memo } from 'react';
import { useCartDispatch } from '../context/cart/CartContext.ts';
import { formatPrice, type Product } from '../data/products.ts';

// Карточка подписана ТОЛЬКО на dispatch, а не на содержимое корзины.
// dispatch не меняется → при добавлении товара карточки не перерисовываются.
// memo: не перерисовываются и при вводе в поиск, если product тот же объект.
const ProductCard = memo(function ProductCard({ product }: { product: Product }) {
    const dispatch = useCartDispatch();

    return (
        <li className="card product">
            <span className="product__emoji">{product.emoji}</span>
            <h3 className="product__title">{product.title}</h3>
            <p className="product__price">{formatPrice(product.price)}</p>
            <button className="btn" onClick={() => dispatch({ type: 'ADD', product })}>
                В корзину
            </button>
        </li>
    );
});

export default ProductCard;
