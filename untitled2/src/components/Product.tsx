// components/Product.tsx
type ProductProps = {
    title: string;
    price: number;
    discount?: number;
};

function Product({ title, price, discount = 0 }: ProductProps) {
    // Считаем цену со скидкой внутри компонента
    const finalPrice = price * (1 - discount / 100);

    return (
        <div
            style={{
                border: '1px solid #ddd',
                borderRadius: 8,
                padding: 16,
                marginBottom: 12,
            }}
        >
            <h3 style={{ margin: '0 0 8px' }}>{title}</h3>

            <p style={{ margin: 0 }}>
                Цена: <strong>{finalPrice.toFixed(2)} ₽</strong>

                {discount > 0 && (
                    <>
                        {' '}
                        <s style={{ color: '#888' }}>{price.toFixed(2)} ₽</s>{' '}
                        <span style={{ color: '#ef4444', fontWeight: 'bold' }}>
              Скидка: {discount}%
            </span>
                    </>
                )}
            </p>
        </div>
    );
}

export default Product;