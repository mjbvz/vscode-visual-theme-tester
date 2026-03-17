// Example JavaScript file for testing Command Palette
function calculateSum(a, b) {
    return a + b;
}

function formatUserName(firstName, lastName) {
    return `${firstName} ${lastName}`;
}

const data = {
    users: [
        { id: 1, name: "John Doe", email: "john@example.com" },
        { id: 2, name: "Jane Smith", email: "jane@example.com" }
    ]
};

// This function needs formatting
function processData(input){const result=input.map(item=>{return{...item,formatted:true}});return result;}

export { calculateSum, formatUserName, data };