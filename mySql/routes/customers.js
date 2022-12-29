var express = require("express");
var router = express.Router();
const pool = require("../test/pool");

//전체조회
router.get("/", (req, res, next) => {
  sql = "SELECT * FROM customers";
  pool.query(sql, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    res.json(results);
  });
});
/* router.get("/:id", (req, res, next) => {
  sql = "select * from customers where id=?";
  let data = 1;
  pool.query(sql, (err, data, results, fields) => {
    if (err) {
      console.log(err);
    }
    res.json(results);
  });
}); */

router.post("/", (req, res, next) => {
  sql = "insert into customers set ?";
  pool.query(sql, req.body, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    res.json(results);
  });
});

router.put("/:id", (req, res, next) => {
  sql = "update customers set ? where id=?";
  let data = [req.body, req.params.id];
  pool.query(sql, data, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    res.json(results);
  });
});

router.delete("/:id", (req, res, next) => {
  sql = "delete from customers where id=?";
  pool.query(sql, req.params.id, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    res.json(results);
  });
});

router.get("/:id", (req, res, next) => {
  sql = "SELECT * FROM customers where id=?";
  pool.query(sql, req.params.id, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    res.json(results[0]);
  });
});

module.exports = router;
