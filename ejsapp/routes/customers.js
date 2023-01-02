var express = require("express");
var router = express.Router();
const pool = require("./pool");

router.get("/", (req, res) => {
  let sql = "select * from customers";
  pool.query(sql, (err, result, fields) => {
    res.render("customers", { list: result });
  });
});

module.exports = router;
