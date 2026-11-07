import { NavLink, Outlet } from 'react-router';
import ThemeToggle from './ThemeToggle.tsx';

const LINKS = [
    { to: '/', label: 'Главная' },
    { to: '/posts', label: 'Блог' },
    { to: '/users', label: 'Пользователи' },
    { to: '/storage', label: 'localStorage' },
    { to: '/admin', label: 'Админка' },
    { to: '/about', label: 'О нас' },
];

// Общий каркас всех страниц. <Outlet /> — место, куда роутер подставит текущую страницу.
function Layout() {
    return (
        <div className="layout">
            <header className="header">
                <nav className="nav">
                    {LINKS.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            // end: «Главная» активна только на "/", а не на любом адресе
                            end={link.to === '/'}
                            // NavLink сам сообщает, совпадает ли его адрес с текущим
                            className={({ isActive }) => (isActive ? 'nav__link nav__link--active' : 'nav__link')}
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>
                <ThemeToggle />
            </header>

            <main className="main">
                <Outlet />
            </main>
        </div>
    );
}

export default Layout;
