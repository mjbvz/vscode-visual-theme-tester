// This file has intentional TypeScript errors to create Problems badges
interface User {
  name: string;
  age: number;
}

function createUser(data: any): User {
  // Error: missing return statement
  const user = {
    name: data.name,
    age: data.age,
    invalid: true  // Error: not assignable to User type
  };
}

// Error: cannot find name 'undefinedVariable'
console.log(undefinedVariable);

// Error: argument of type 'string' is not assignable to parameter of type 'number'
const result = createUser("invalid");