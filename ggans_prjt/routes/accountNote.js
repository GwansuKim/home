var express = require("express");
var router = express.Router();
const pool = require("./pool");

router.get("/:id", function (req, res, next) {
  sql =
    "Select *, date_format(buydate, '%Y-%m-%d') dt from accountnote where username=? and concat(year(buydate),date_format(buydate, '%m'),dayofmonth(buydate))=?";
  let data = [req.session.username, req.params.id];
  pool.query(sql, data, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    res.render("accountNote", { session: req.session, results });
    //res.send(req.params.id);
  });
});

//단건조회
router.get("/:page/:id", (req, res, next) => {
  sql =
    "Select *, date_format(buydate, '%Y-%m-%d') dt from accountnote where username=? and concat(year(buydate),date_format(buydate, '%m'),dayofmonth(buydate))=? and no=?";
  let data = [req.session.username, req.params.page, req.params.id];
  pool.query(sql, data, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    res.json(results);
  });
});

//등록
router.post("/:page", (req, res, next) => {
  sql = "insert into accountnote set ?";
  let data = {
    username: req.session.username,
    buydate: req.body.buydate,
    wherebuy: req.body.wherebuy,
    item: req.body.item,
    category: req.body.category,
    price: req.body.price,
  };
  pool.query(sql, data, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    res.json(results);
  });
});

//수정
router.put("/:page/:id", (req, res, next) => {
  sql = "update accountnote set ? where no=?";
  let data = [req.body, req.params.id];
  pool.query(sql, data, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    res.send(results);
  });
});

//삭제
router.delete("/:page/:id", (req, res, next) => {
  sql = "delete from accountnote where no=?";
  pool.query(sql, req.params.id, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    res.json(results);
  });
});
module.exports = router;
