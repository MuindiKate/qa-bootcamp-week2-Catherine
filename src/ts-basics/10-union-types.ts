export {};
function kgToLbs(weight: number | string): number {
  if (typeof weight === "number") {
    return weight * 2.2; // narrowed to number
  }
  return parseInt(weight) * 2.2; // narrowed to string
}

console.log(kgToLbs(10));
console.log(kgToLbs("10kg"));