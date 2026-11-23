export {};
let employee: {
  readonly id: number;
  name: string;
  retire: (date: Date) => void;
} = {
  id: 1,
  name: "Kat",
  retire: (date: Date) => {
    console.log(date);
  },
};
// employee.id = 2; // error: id is read-only
console.log(employee.name);
employee.retire(new Date());