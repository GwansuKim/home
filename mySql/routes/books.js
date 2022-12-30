var express = require("express");
var router = express.Router();
const pool = require("../test/pool");

//전체조회
router.get("/", (req, res, next) => {
  sql = "SELECT * FROM books";
  pool.query(sql, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    res.json(results);
  });
});

//단건조회
router.get("/:id", (req, res, next) => {
  sql = "SELECT * FROM books where no=?";
  pool.query(sql, req.params.id, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    res.json(results);
  });
});

//등록
router.post("/", (req, res, next) => {
  sql = "insert into books set ?";
  pool.query(sql, req.body, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    res.json(results);
  });
});

//수정
router.put("/:id", (req, res, next) => {
  sql = "update books set ? where no=?";
  let data = [req.body, req.params.id];
  pool.query(sql, data, function (err, results, fields) {
    if (err) {
      console.log(err);

      res.send();
    }
  });
});

//삭제
router.delete("/:id", (req, res, next) => {
  sql = "delete from books where no=?";
  pool.query(sql, req.params.id, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    res.json(results);
  });
});

module.exports = router;
