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
  }
});
app.listen(3000);
