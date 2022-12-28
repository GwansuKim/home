import { Router } from "express";
const route = Router();

route
  .get("/", (req, res) => {
    //?writer=kim
    console.log("writer: ", req.query.writer);
    console.log("wdt: ", req.query.wdt);
    res.send("board get");
  })
  .post("/", (req, res) => {
    console.log("writer: ", req.body.writer);
    console.log("contents: ", req.body.contents);
    res.send("board post");
  })
  .put("/", (req, res) => {
    res.send("board put");
  })
  .delete("/:boardno", (req, res) => {
    console.log("boardno", req.params.boardno);
    res.send("board delete");
  });

export default route;
