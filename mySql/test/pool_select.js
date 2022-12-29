const mysql = require("mysql"); //mysql 모듈 로드
/* const sql = require('.sql.js'); */

//mysqul 접속 정보
const conn = {
  host: "localhost",
  port: "3306",
  user: "dev01",
  password: "1234",
  database: "dev",
  connectionLimit: 10,
};

let pool = mysql.createPool(conn); //DB커넥션 생성
//pool.getConnection(); //DB 접속

let sql = "SELECT * FROM customers";

pool.query(sql, function (err, results, fields) {
  console.log(results);
});

//pool.release();
