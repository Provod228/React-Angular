import { Fragment } from 'react';
import { Link } from 'react-router';

export type Crumb = {
    label: string;
    to?: string; // у последней «крошки» ссылки нет — это текущая страница
};

// Упражнение 6: хлебные крошки «Главная / Пользователи / Анна»
function Breadcrumbs({ items }: { items: Crumb[] }) {
    return (
        <nav className="breadcrumbs" aria-label="Хлебные крошки">
            {items.map((item, i) => (
                <Fragment key={item.label}>
                    {i > 0 && <span className="breadcrumbs__sep">/</span>}
                    {item.to ? <Link to={item.to}>{item.label}</Link> : <span>{item.label}</span>}
                </Fragment>
            ))}
        </nav>
    );
}

export default Breadcrumbs;
