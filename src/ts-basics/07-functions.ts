export {};
function calculateTax(income: number, taxYear = 2022): number {
  if (taxYear < 2022) {
    return income * 1.2;
  }
  return income * 1.3;
}

console.log(calculateTax(10_000));       // uses default 2022
console.log(calculateTax(10_000, 2021)); // passes a tax year