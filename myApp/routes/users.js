var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/login", function (req, res) {
  req.session.email = req.query.email;
  req.session.is_logined = true;
  req.session.save((err) => {
    if (err) throw err;
    res.send("login ok");
  });
});

module.exports = router;
