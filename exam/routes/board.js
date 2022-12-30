var express = require("express");
var router = express.Router();
const pool = require("./pool");

//전체조회
router.get("/", (req, res, next) => {
  sql = "SELECT * FROM board";
  pool.query(sql, function (err, result, fields) {
    if (err) {
      console.log(err);
    }
    res.json(result);
  });
});

//등록
router.post("/", (req, res, next) => {
  sql = "insert into board set ?";
  pool.query(sql, req.body, function (err, result, fields) {
    if (err) {
      console.log(err);
    }

    let resultData = {};
    if (result.affectedRows > 0) {
      resultData.result = true;
      resultData.data = req.body;
    } else {
      resultData.result = false;
    }
    res.send(resultData);
  });
});

//수정
router.put("/:id", (req, res, next) => {
  sql = "update board set ? where no=?";
  let data = [req.body, req.params.id];
  pool.query(sql, data, function (err, result, fields) {
    if (err) {
      console.log(err);
    }
    let resultData = {};
    if (result.changedRows > 0) {
      resultData.result = true;
      resultData.data = req.body;
    } else {
      resultData.result = false;
    }
    res.send(resultData);
  });
});

//삭제
router.delete("/:id", (req, res, next) => {
  sql = "delete from board where no=?";
  let del_no = req.params.id;
  pool.query(sql, del_no, function (err, result, fields) {
    if (err) {
      console.log(err);
    }
    let resultData = "{result: " + del_no + "}";
    res.send(resultData);
  });
});

module.exports = router;
