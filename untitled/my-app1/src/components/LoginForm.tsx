import {useState} from "react";

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault(); // ОБЯЗАТЕЛЬНО — иначе браузер перезагрузит страницу
        // Тут обычно отправка на сервер
    }

    const isEmpty = email === '' || password === '';

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button disabled={isEmpty} onClick={() => alert('Клик!')}>Нажми</button>
        </form>
    );
}

export default LoginForm;