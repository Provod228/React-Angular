let num: number;
let str: string;
let bool: boolean;
let bigint: bigint;
let symbol: symbol;
let Null: null;
let Undefined: undefined;


function processValue(value: unknown) {
    if ( typeof value === 'string' ) {
        return value.toUpperCase();
    }
    else if (typeof value === "number") {
        return value*2;
    }
    else {
        return undefined;
    }
}


function sumMatrix(m: number[][]): number {
    let sum: number = 0;
    for (let i = 0; i < m.length; i++) {
        for (let j = 0; j < m[i].length; j++) {
            sum += m[i][j];
        }
    }
    return sum;
}

let mm: number[][] = [[1, 2, 3], [1, 2, 3], [1, 2, 3]]

console.log(sumMatrix(mm));

function tupleFun(tup: [string, number, boolean]): string {
    return `Имя = ${tup[0]}, возраст = ${tup[1]}, статус = ${tup[2]}`;
}

console.log(tupleFun(["Алоха", 44, true]));

class Book {
    title: string;
    author: string;
    year: number;
    readonly isbn: string;
    genre?: string;
}

function createUser(name: string, age: number, email?: string): { name: string; age: number; email: string } {
    return {
        name,
        age,
        email: email ?? "не указан",
    };
}

function max(nums: number[]): number {
    let num: number = nums[0];
    for (let i = 1; i < nums.length; i++) {
        if (num < nums[i]) {
            num = nums[i];
        }
    }
    return num;
}

console.log(max([3, 7, 2]))

function sum(a: number, b: number): number {
    return a + b;
}




type Status = 'active' | 'blocked';

interface User {
    readonly id: number;
    name?: string;
    email?: string;
    status: Status;
}


function getUser(): User {
    let user: User = {id: 123, name: "Hi", email: "ret@bk.ru", status: 'active'};
    return user;
}

let users: User[] = [
    {id: 1, name: "Hi", email: "ret@asdabk.ru", status: 'active'},
    {id: 12, name: "Hidd", email: "ret@adsabk.ru", status: 'blocked'},
    {id: 123, name: "Hiss", email: "ret@bkads.ru", status: 'active'},
]


function getLength(value: unknown): number {
    if (typeof value === 'string') {
        return value.length;
    }

    if (Array.isArray(value)) {
        return value.length;
    }
    return 0;
}

interface Person { name: string; age: number };
interface Job { company: string; salary: number };

// interface Employee extends Person {};
// interface Employee extends Job {};


type Employee = Person & Job;



function filterActive(users: User[]): User[] {
    let users_active: User[] = [];
    for (let i = 0; i < users.length; i++) {
        if (users[i].status === 'active') {
            users_active.push(users[i])
        }
    }
    return users_active;
}

console.log(filterActive(users));


function blockUser(user: User): User {
    user.status = 'blocked';
    return user;
}

// [
// [0,1,0],
// [0,0,1],
// [1,0,0]
// ]