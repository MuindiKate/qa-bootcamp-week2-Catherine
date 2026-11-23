export {};
type Quantity = 50 | 100;
let quantity: Quantity = 100;
// quantity = 51; // error: only 50 or 100 allowed

type Metric = "cm" | "inch";
let unit: Metric = "cm";
console.log(quantity, unit);