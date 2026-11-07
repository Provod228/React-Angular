// «База» постов в памяти (упражнение 5)

export type Post = {
    id: number;
    title: string;
    date: string;
    body: string;
};

export const POSTS: Post[] = [
    {
        id: 1,
        title: 'Зачем SPA нужен роутер',
        date: '2026-11-01',
        body: 'В SPA одна HTML-страница, но пользователю всё равно нужны адреса: закладки, кнопка «Назад», ссылки, которыми можно поделиться. Роутер связывает URL с компонентом без перезагрузки страницы.',
    },
    {
        id: 2,
        title: 'Link против <a>',
        date: '2026-11-03',
        body: 'Обычная ссылка перезагружает страницу и теряет всё состояние React. Link перехватывает клик и меняет URL через History API — перерисовывается только нужная часть.',
    },
    {
        id: 3,
        title: 'Layout и Outlet',
        date: '2026-11-05',
        body: 'Маршрут без path оборачивает дочерние маршруты общим каркасом. Outlet — место, куда подставляется текущая страница. Шапка и меню пишутся один раз.',
    },
];

export function findPost(id: number): Post | undefined {
    return POSTS.find((post) => post.id === id);
}
