var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource!!!");
});

router.post("/login", function (req, res) {
  req.session.email = req.body.email; //post 파라미터
  req.session.is_logined = true;
  req.session.save((err) => {
    if (err) throw err;
    res.redirect("/");
  });
});

router.post("/logout", (req, res, next) => {
  req.session.destroy(); //destroy() 함수를 사용해서 세션 삭제
  res.redirect("/login.html"); //로그인 페이지로 이동
});

module.exports = router;
