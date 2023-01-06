var express = require("express");
var router = express.Router();
const pool = require("./pool");

router.get("/", function (req, res, next) {
  res.render("passwordlookup");
});

router.post("/", (req, res, next) => {
  let sql =
    "SELECT *, date_format(birthdate, '%Y-%m-%d') birthday FROM memberlist where username=?";
  pool.query(sql, req.body.username, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    if (results.length > 0) {
      if (results[0].birthday == req.body.birthdate) {
        res.json(results);
      } else {
        res.send(`
          <script>
          alert("생년월일을 확인해주세요");
          location.href = "/passwordlookup";
          </script>
        `);
      }
    } else {
      res.send(`
          <script>
          alert("존재하지 않는 계정입니다");
          location.href = "/passwordlookup";
          </script>
        `);
    }
  });
});

module.exports = router;
