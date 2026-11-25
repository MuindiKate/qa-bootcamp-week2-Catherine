export {};
function kgToLbs(weight: number | string): number {
  if (typeof weight === "number") {
    return weight * 2.2;
  }
  const parsed = parseInt(weight);
  if (isNaN(parsed)) {
    throw new Error(`Invalid weight: "${weight}"`);
  }
  return parsed * 2.2;
}

console.log(kgToLbs(10));
console.log(kgToLbs("10kg"));
try {
  kgToLbs("abc");
} catch (e) {
  console.log((e as Error).message); // Invalid weight: "abc"
}