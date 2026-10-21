import {User} from "./User.tsx";
import {JSX} from "react";

export function sum(a: number, b: number): number {
    return a + b;
}

export function getUser(): User {
    return new User("Ваня", "ts@f.d", "1234")
}

export function listUsers(): User[] {
    return [
        { name: "Аня", email: "t@bk.ru", password: "1234"},
        { name: "Борис", email: "i@bk.ru", password: "4321"},
    ];
}

export function printListUsers(listUser: User[]): JSX.Element[] {
    let items = [];
    for (const user of listUser) {
        items.push(
            <div key={user.email}>
                Пользователь: {user.name}, Почта: {user.email}, Пароль: {user.password}
            </div>
        );
    }
    return items;
}