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

function query(sql) {
  return new Promise((resolve, reject) => {
    pool.query(sql, (err, results, field) => {
      resolve(results);
    });
  });
}

module.exports = { pool, query }; //    { pool:pool, query:query }
