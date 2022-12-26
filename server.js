const http = require("http");
let infoarr = [];
infoarr["kim"] = { name: "김관수", hobby: "게임" };
infoarr["park"] = { name: "박혁거세", hobby: "알까기" };
const { waitForDebugger } = require("inspector");
const server = http.createServer((req, res) => {
  const myurl = new URL("http://127.0.0.1:3000" + req.url);
  console.log(myurl.pathname);
  console.log(myurl.searchParams);
  if (myurl.pathname == "/") {
    res.end("main");
  } else if (myurl.pathname == "/info") {
    res.statusCode = 200;
    res.setHeader("content-type", "text/html");
    let userid = myurl.searchParams.get("userid");
    res.end(info(userid));
  } else if (myurl.pathname == "/boardReg") {
    res.write(boardReg());
    res.end();
  } else if (myurl.pathname == "/userReg") {
    res.write(userReg());
    res.end();
  } else if (myurl.pathname == "/userRegAction") {
    let userid = myurl.searchParams.get("userid");
    let username = myurl.searchParams.get("username");
    let pw = myurl.searchParams.get("pw");
    let tel = myurl.searchParams.get("tel");
    console.log(userid);
    console.log(username);
    console.log(pw);
    console.log(tel);
    res.end("complete");
    //res.end(info(myurl.searchParams.get("userid")));
  } else if (myurl.pathname == "/boardRegAction") {
    let title = myurl.searchParams.get("title");
    let content = myurl.searchParams.get("content");
    console.log(title);
    console.log(content);
    res.end(boardReg());
  } else {
    res.statusCode = 404;
    res.end();
  }
});

server.listen(3000, () => {
  console.log("server is running http://127.0.0.1:3000 ");
}); //서버 기동

function info(userid) {
  if (!userid || !infoarr[userid]) {
    return "no user";
  }
  let html = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>info</title>
</head>
<body>
  <h3>my info</h3>
  <div>id: ${userid ? userid : ""}</div>
  <div>이름 : ${infoarr[userid].name}</div>
  <div>취미 : ${infoarr[userid].hobby}</div>
</body>
</html>
    `;
  return html;
}

function boardReg() {
  let html = `<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>board</title>
  </head>
  <body>
    <h3>게시글 작성!!</h3>
    <form action="/boardRegAction">
      <div><input type="text" name="title" placeholder="제목입력"/></div>
      <div><textarea name="content">내용</textarea></div>
      <div>
      <button>등록</button>
      <button type="reset">취소</button>
      </div>
    </form>
  </body>
</html>
`;
  return html;
}

function userReg() {
  let html = `
  <!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>userReg</title>
  </head>
  <body>
    <form action="/userRegAction">
      <div><input name="userid" type="text" placeholder="ID" /></div>
      <div><input name="username" type="text" placeholder="Name" /></div>
      <div><input name="pw" type="password" placeholder="password" /></div>
      <div><input name="tel" type="tel" placeholder="tel" /></div>
      <div>
        <button type="submit">등록</button>
        <button type="reset">취소</button>
      </div>
    </form>
  </body>
</html>
`;
  return html;
}
