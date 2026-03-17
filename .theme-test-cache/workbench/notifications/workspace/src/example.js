// Example JavaScript file
function greetUser(name) {
    console.log(`Hello, ${name}!`);
}

// Call the function
greetUser("World");

// Some example code to work with
const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
    { id: 3, name: "Charlie" }
];

function findUserById(id) {
    return users.find(user => user.id === id);
}