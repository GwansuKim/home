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

let sql = "insert into customers set ?";
let data = {
  name: "han",
  email: "han@mail.com",
  phone: "010-0000-0006",
  address: "",
};

connection.query(sql, data, function (err, results) {
  if (err) {
    console.log(err);
  }
  console.log(results);
});

connection.query("select last_insert_id()", (err, results) => {
  console.log(results);
});

connection.end(); //DB접속종료
