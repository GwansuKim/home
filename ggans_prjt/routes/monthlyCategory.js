var express = require("express");
var router = express.Router();
const pool = require("./pool");

router.get("/:id", function (req, res, next) {
  sql =
    "Select sum(price) price, category, count(buydate) buydate from accountnote where username=? and concat(year(buydate), month(buydate))=? group by category";
  let data = [req.session.username, req.params.id];
  pool.query(sql, data, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    res.render("monthlycategory", { session: req.session, results });
    //res.send(req.params.id);
  });
});

module.exports = router;
