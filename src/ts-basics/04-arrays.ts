export {};
let numbers: number[] = [1, 2, 3];
// numbers.push("4"); // error: string is not a number
numbers.forEach((n) => console.log(n.toFixed(1)));