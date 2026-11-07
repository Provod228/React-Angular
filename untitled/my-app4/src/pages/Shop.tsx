import { useMemo, useState } from 'react';
import ProductCard from '../components/ProductCard.tsx';
import { PRODUCTS } from '../data/products.ts';
import { useDebounce } from '../hooks/useDebounce.ts';

// Каталог с поиском через useDebounce (упражнение 4) и кнопками «В корзину» (упражнение 3)
function Shop() {
    const [query, setQuery] = useState('');
    const debouncedQuery = useDebounce(query.trim().toLowerCase(), 500);

    // Пока debounce не сработал — пользователь «печатает»
    const isTyping = query.trim().toLowerCase() !== debouncedQuery;

    // Фильтруем только по debouncedQuery: на каждый символ ничего не пересчитывается.
    // С API здесь был бы запрос на сервер — именно ради этого debounce и нужен.
    const visibleProducts = useMemo(
        () => PRODUCTS.filter((p) => p.title.toLowerCase().includes(debouncedQuery)),
        [debouncedQuery],
    );

    return (
        <div className="stack">
            <h1>Магазин</h1>

            <input
                className="input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Поиск товаров, например «чехол»"
            />
            <p className="muted status">{isTyping ? 'Печатает...' : `Найдено: ${visibleProducts.length}`}</p>

            {visibleProducts.length === 0 ? (
                <p className="muted">Ничего не найдено</p>
            ) : (
                <ul className="products">
                    {visibleProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </ul>
            )}
        </div>
    );
}

export default Shop;
