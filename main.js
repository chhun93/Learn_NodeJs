var http = require("http");
var fs = require("fs");
var url = require("url");

var app = http.createServer(function (request, response) {
  var requestUrl = request.url;
  var queryData = url.parse(requestUrl, true).query;
  var pathname = url.parse(requestUrl, true).pathname;

  if (pathname === "/") {
    if (queryData.id === undefined) {
      fs.readdir("./data", function (error, fileList) {
        var title = "WELCOME";
        var description = "HELLO NODE JS";

        var list = "<ol>";
        for (const i in fileList)
          list += `<li><a href="/?id=${fileList[i]}">${fileList[i]}</a></li>`;
        list += "</ol>";

        var template = `
      <!doctype html>
      <html>
      <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
      </head>
      <body>
        <h1><a href="/">WEB</a></h1>
        ${list}
        <h2>${title}</h2>
        <p>${description}</p>
      </body>
      </html>
      `;
        response.writeHead(200);
        response.end(template);
      });
    } else {
      fs.readFile(`data/${queryData.id}`, "utf8", function (err, description) {
        fs.readdir("./data", function (error, fileList) {
          var title = queryData.id;

          var list = "<ol>";
          for (const i in fileList)
            list += `<li><a href="/?id=${fileList[i]}">${fileList[i]}</a></li>`;
          list += "</ol>";

          var template = `
        <!doctype html>
        <html>
        <head>
          <title>WEB1 - ${title}</title>
          <meta charset="utf-8">
        </head>
        <body>
          <h1><a href="/">WEB</a></h1>
          ${list}
          <h2>${title}</h2>
          <p>${description}</p>
        </body>
        </html>
        `;
          response.writeHead(200);
          response.end(template);
        });
      });
    }
  }
});
app.listen(3000);
