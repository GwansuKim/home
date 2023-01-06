var express = require("express");
var router = express.Router();
const pool = require("./pool");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("logIn");
});

router.post("/login", (req, res, next) => {
  let sql = "SELECT * FROM memberlist where username=?";
  pool.query(sql, req.body.username, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    if (results.length > 0) {
      if (results[0].password == req.body.password) {
        req.session.username = results[0].username;
        res.redirect("/calendar");
        //res.send(req.session.username);
      } else {
        res.send(`
          <script>
          alert("비밀번호가 틀렸습니다");
          location.href="/"
          </script>
        `);
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
  sql = "SELECT * FROM memberlist where username=?";
  pool.query(sql, req.body.username, function (err, results, fields) {
    if (err) {
      console.log(err);
    }
    for (let i = 0; i < results.length; i++) {
      if (results[i].username == req.body.username) {
        res.send(`
      <script>
      alert("이미 존재하는 ID입니다");
      location.href="/"
      </script>
      `);
      }
      return;
    }
    sql = "insert into memberlist set ?";
    pool.query(sql, req.body, function (err, results, fields) {
      if (err) {
        console.log(err);
      }
      res.send(
        `
          <script>
          alert("회원 정보가 등록되었습니다!");
          location.href="/"
          </script>
          `
      );
    });
  });
});

router.get("/logout", (req, res, next) => {
  if (req.session.username) {
    req.session.destroy(function (err) {
      if (err) {
        throw err;
      }
      res.redirect("/");
    });
  } else {
    res.redirect("/");
  }
});

module.exports = router;
