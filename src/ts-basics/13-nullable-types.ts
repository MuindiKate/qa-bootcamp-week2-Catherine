export {};
function greet(name: string | null | undefined) {
  if (name) {
    console.log(name.toUpperCase());
  } else {
    console.log("Hola!");
  }
}

greet("kat");
greet(null);
greet(undefined);
greet(""); // empty string treated as no name, prints "Hola!"