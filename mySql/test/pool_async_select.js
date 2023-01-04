const mysql = require("./pool"); //mysql 모듈 로드

let sql1 = "SELECT * FROM customers";
let sql2 = "select * from board";

async function get() {
  let result1 = await mysql.query(sql1);
  let result2 = await mysql.query(sql2, result);
}
