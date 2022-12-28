import express from "express";
import boardRouter from "./routes/board.js";
import customerRouter from "./routes/customer.js";
const app = express();
const port = 3000;

app.use("/static", express.static("public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/login", (req, res) => {
  console.log(req.query.uemail);
  res.send("로그인 되었습니다.");
});

app.get("/", (req, res) => {
  res.send("hello world!!!");
});
/* app.get("/customer", (req, res) => {
  res.send("get");
});
app.post("/customer", (req, res) => {
  res.send("post");
}); */
app.use("/customer", customerRouter);

/* app
  .get((req, res) => {
    res.send("board get");
  })
  .post((req, res) => {
    res.send("board post");
  })
  .put((req, res) => {
    res.send("board put");
  })
  .delete((req, res) => {
    res.send("board delete");
  }); */
app.use("/board", boardRouter);

app.get("/ab[0-9]cd", (req, res) => {
  res.send("정규표현식");
});

app.use(function (err, req, res, next) {
  res.status(500).json({ code: res.statusCode, msg: err.message });
});

app.get(
  "/example",
  (req, res, next) => {
    throw new Error("에러발생");
    console.log("첫 번째 콜백");
    next();
  },
  (req, res) => {
    res.send("두 번째 콜백");
  }
);

app.listen(port, () => {
  console.log(`server runing http://localhost:${port}`);
});
