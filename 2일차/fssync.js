/* fssync.js
동기식 = 블록킹 함수
*/
const fs = require("fs");
let data = fs.readFileSync("./template/test.txt", "utf-8");
console.log(data);
