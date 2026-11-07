import { Link, NavLink, Outlet } from 'react-router';
import { useAuth } from '../context/auth/AuthContext.ts';
import { useCart } from '../context/cart/CartContext.ts';
import { getCartCount } from '../context/cart/cartReducer.ts';
import { useTheme } from '../context/theme/ThemeContext.ts';

const LINKS = [
    { to: '/', label: 'Главная' },
    { to: '/shop', label: 'Магазин' },
    { to: '/profile', label: 'Профиль' },
    { to: '/hooks', label: 'usePrevious' },
    { to: '/memo', label: 'memo' },
];

const navClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'nav__link nav__link--active' : 'nav__link';

// Шапка достаёт тему, пользователя и корзину из контекстов —
// App ничего не передаёт ей пропсами. Это и есть отказ от prop drilling.
function Layout() {
    const { theme, toggleTheme } = useTheme();
    const { user, logout } = useAuth();
    const cartCount = getCartCount(useCart());

    return (
        <div className="layout">
            <header className="header">
                <nav className="nav">
                    {LINKS.map((link) => (
                        <NavLink key={link.to} to={link.to} end={link.to === '/'} className={navClass}>
                            {link.label}
                        </NavLink>
                    ))}
                    <NavLink to="/cart" className={navClass}>
                        Корзина{cartCount > 0 && <span className="badge">{cartCount}</span>}
                    </NavLink>
                </nav>

                <div className="row">
                    {user ? (
                        <>
                            <span className="muted">{user.name}</span>
                            <button className="btn btn--ghost btn--small" onClick={logout}>Выйти</button>
                        </>
                    ) : (
                        <Link to="/login" className="btn btn--small">Войти</Link>
                    )}
                    <button className="icon-btn" onClick={toggleTheme} aria-label="Переключить тему">
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>
                </div>
            </header>

            <main className="main">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
