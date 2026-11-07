// Страница за RequireAdmin — попасть сюда можно, только если IS_ADMIN === true
function Admin() {
    return (
        <div className="stack">
            <h1>Админка</h1>
            <p>Доступ разрешён: в <code>src/auth.ts</code> стоит <code>IS_ADMIN = true</code>.</p>
        </div>
    );
}

export default Admin;
