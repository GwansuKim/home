/* work.js */
const http = require("http");
let todoList = [
  { content: "test1", completed: false },
  { content: "test2", completed: true },
  { content: "test3", completed: false },
  { content: "test4", completed: false },
];

const server = http.createServer((req, res) => {
  const myurl = new URL("http://127.0.0.1:3000" + req.url);
  for (let i = 1; i <= todoList.length; i++) {
    if (myurl.pathname == "/todolist") {
      res.end(JSON.stringify(todoList));
    } else if (myurl.searchParams.get("no") == i) {
      res.end(JSON.stringify(todoList[i - 1]));
    }
  }
});
server.listen(3000, () => {
  console.log("server running http://127.0.01:3000");
});

//http://127.0.0.1:3000/todo?no=1 =>todolist[0] 출력
