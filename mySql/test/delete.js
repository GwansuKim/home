const mysql = require("mysql"); //mysql 모듈 로드
/* const sql = require('.sql.js'); */

//mysqul 접속 정보
const conn = {
  host: "localhost",
  port: "3306",
  user: "dev01",
  password: "1234",
  database: "dev",
};

let connection = mysql.createConnection(conn); //DB커넥션 생성
connection.connect(); //DB 접속

let sql = "delete from customers where id=?";
let data = 4;

connection.query(sql, data, function (err, results, fields) {
  if (err) {
    console.log(err);
  }
  console.log(results);
});

connection.end(); //DB접속종료
