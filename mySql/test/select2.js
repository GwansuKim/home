let pool = require("./pool");

sql = "SELECT * FROM customers";
pool.query(sql, function (err, results, fields) {
  console.log(results);
});
