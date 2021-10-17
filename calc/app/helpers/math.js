export function summery(num1, num2) {
    return num1 + num2;
}

export function difference(num1, num2) {
    return num1 - num2;
}

export function division(num1, num2) {
    return num1 / num2;
}

export function product(num1, num2) {
    return num1 * num2;
}

export function root(num) {
    console.log(num);
    return Math.sqrt(num);
}

export function percent(num) {
    return num / 100;
}

export function equal(num1, num2, calc) {
    return calc(num1, num2);
}
