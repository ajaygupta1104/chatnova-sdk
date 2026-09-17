// Built dist folder ko test karne ke liye
const { useChat } = require('./dist/index.js'); // ya jo bhi aapki main entry file ka export hai

console.log("SDK Import Successful!");
console.log("Exported functions/hooks:", { useChat });