const http = require("http");
const cookie = require("cookie");

http
  .createServer((req, res) => {
    let fircookie;
    if (req.headers.cookie) {
      fircookie = cookie.parse(req.headers.cookie);
      console.log(fircookie.username);
      console.log(fircookie.cookiename);
    }
    res.writeHead(200, {
      "Set-Cookie": [
        "cookiename=value",
        `username=kim; Max-Age=${2 * 60}; HttpOnly; Path=/user`,
      ],
    });
    res.end("hello");
  })
  //메소드 체인(.으로 계속 이어서 함수 나열)
  .listen(3000, () => {
    console.log("server running http://localhost:3000");
  });
