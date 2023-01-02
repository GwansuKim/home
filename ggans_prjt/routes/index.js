var express = require("express");
var router = express.Router();
const pool = require("./pool");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("logIn");
});

router.post("/login", (req, res, next) => {
  sql = "SELECT * FROM accountnote where username=?";
  pool.query(sql, req.body.username, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    if (results.length > 0) {
      console.log(results[0].password);
      console.log(req.body.password);
      console.log(results[0].password == req.body.password);
      if (results[0].password == req.body.password) {
        res.redirect("/calendar");
      } else {
        res.send(`
          <script>
          alert("비밀번호가 틀렸습니다");
          location.href="/"
          </script>
        `);
        // res.redirect("/");
      }
    } else {
      res.send(`
          <script>
          alert("존재하지 않는 계정입니다");
          location.href="/"
          </script>
        `);
    }
  });
});

router.post("/signUp", (req, res, next) => {
  sql = "insert into accountnote set ?";
  pool.query(sql, req.body, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    res.send(`
          <script>
          alert("회원 정보가 등록되었습니다!");
          location.href="/"
          </script>
        `);
  });
});

module.exports = router;
