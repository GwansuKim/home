import { Router } from "express";
const route = Router();

route
  .get("/", (req, res) => {
    res.send("get");
  })
  .post("/", (req, res) => {
    res.send("post");
  })
  .put("/", (req, res) => {
    res.send("put");
  })
  .delete("/", (req, res) => {
    res.send("delete");
  });

export default route;
