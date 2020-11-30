var http = require("http");
var fs = require("fs");
var url = require("url");
const { brotliDecompressSync } = require("zlib");

function templateHtml(title, list, body) {
  return `
<!doctype html>
<html>
<head>
  <title>WEB1 - ${title}</title>
  <meta charset="utf-8">
</head>
<body>
  <h1><a href="/">WEB</a></h1>
  ${list}
  <a href="/create">create</a>
  ${body}
</body>
</html>
`;
}

function templateList(fileList) {
  var list = "<ol>";
  for (var i in fileList)
    list += `<li><a href="/?id=${fileList[i]}">${fileList[i]}</a></li>`;
  list += "</ol>";

  return list;
}

var app = http.createServer(function (request, response) {
  var requestUrl = request.url;
  var queryData = url.parse(requestUrl, true).query;
  var pathname = url.parse(requestUrl, true).pathname;
  var qs = require('querystring');

  if (pathname === "/") {
    if (queryData.id === undefined) {
      fs.readdir("./data", function (error, fileList) {
        var title = "WELCOME";
        var description = "HELLO NODE JS";
        var list = templateList(fileList);
        var template = templateHtml(
          title,
          list,
          `<h2>${title}</h2>${description}`
        );
        response.writeHead(200);
        response.end(template);
      });
    } else {
      fs.readdir("./data", function (error, fileList) {
        fs.readFile(
          `data/${queryData.id}`,
          "utf8",
          function (err, description) {
            var title = queryData.id;
            var list = templateList(fileList);
            var template = templateHtml(
              title,
              list,
              `<h2>${title}</h2>${description}`
            );
            response.writeHead(200);
            response.end(template);
          }
        );
      });
    }
  } else if (pathname === "/create") {
    fs.readdir("./data", function (error, fileList) {
      var title = "WEB-create";
      var list = templateList(fileList);
      var template = templateHtml(
        title,
        list,
        `<form action="http://localhost:3000/create_process"
        method="POST">
        <p><input type="text" name="title" placeholder="title"></p>
        <p><textarea name="description" placeholder="description"></textarea></p>
        <p><input type="submit"></p>
        </form>`
      );
      response.writeHead(200);
      response.end(template);
    });
  } else if (pathname === "/create_process") {
    var body = "";
    request.on("data", function (data) {
      body += data;
    });
    request.on("end", function () {
      var post = qs.parse(body);
      var title = post.title;
      var description = post.description;

      console.log(title, description);
    });
    response.writeHead(200);
    response.end("success");
  } else {
    response.writeHead(404);
    response.end("Not found");
  }
});
app.listen(3000);
