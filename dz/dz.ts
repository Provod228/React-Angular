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
    for (let i = 1; i <= nums.length; i++) {
        if (num < nums[i]) {
            num = nums[i];
        }
    }
    return num;
}

