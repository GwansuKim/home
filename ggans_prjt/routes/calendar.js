var express = require("express");
var router = express.Router();
const pool = require("./pool");

router.get("/", function (req, res, next) {
  res.render("calendar");
});

module.exports = router;
