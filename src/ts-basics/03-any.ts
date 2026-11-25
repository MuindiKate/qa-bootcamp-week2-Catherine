export {};
let level: any;
level = 1;
level = "a"; // allowed, but we lose type safety
console.log(level);

function render(document: any) {
  console.log(document);
}
render("hello");