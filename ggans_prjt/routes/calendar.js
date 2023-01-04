var express = require("express");
var router = express.Router();
const pool = require("./pool");

router.get("/", function (req, res, next) {
  sql = "select username, buydate, price from accountnote where username=?";
  pool.query(sql, req.session.username, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    res.render("calendar", { session: req.session, results });
    //res.send(req.session);
    //res.send(results);
  });
});

router.get("/re", function (req, res, next) {
  sql =
    "select sum(price) title, date_format(buydate, '%Y-%m-%d') start from accountnote where username=? group by buydate";
  pool.query(sql, req.session.username, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    console.log(results);
    res.send(results);
  });
});

module.exports = router;
