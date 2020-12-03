var http = require("http");
var fs = require("fs");
var url = require("url");
var qs = require("querystring");
var template = require("./lib/template.js");

var app = http.createServer(function (request, response) {
  var requestUrl = request.url;
  var queryData = url.parse(requestUrl, true).query;
  var pathname = url.parse(requestUrl, true).pathname;

  if (pathname === "/") {
    if (queryData.id === undefined) {
      fs.readdir("./data", function (error, fileList) {
        var title = "WELCOME";
        var description = "HELLO NODE JS";
        var list = template.list(fileList);
        var html = template.html(
          title,
          list,
          `<h2>${title}</h2>${description}`,
          `<a href="/create">create</a>`
        );
        response.writeHead(200);
        response.end(html);
      });
    } else {
      fs.readdir("./data", function (error, fileList) {
        fs.readFile(
          `data/${queryData.id}`,
          "utf8",
          function (err, description) {
            var title = queryData.id;
            var list = template.list(fileList);
            var html = template.html(
              title,
              list,
              `<h2>${title}</h2>${description}`,
              `<a href="/create">create</a>
              <a href="/update?id=${title}">update</a>
              <form action="delete_process" method="POST">
                <input type="hidden" name="id" value="${title}">
                <input type="submit" value="delete">
              </form>
              `
            );
            response.writeHead(200);
            response.end(html);
          }
        );
      });
    }
  } else if (pathname === "/create") {
    fs.readdir("./data", function (error, fileList) {
      var title = "WEB-create";
      var list = template.list(fileList);
      var html = template.html(
        title,
        list,
        `<form action="/create_process"
        method="POST">
        <p><input type="text" name="title" placeholder="title"></p>
        <p><textarea name="description" placeholder="description"></textarea></p>
        <p><input type="submit"></p>
        </form>`,
        ``
      );
      response.writeHead(200);
      response.end(html);
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

      fs.writeFile(`data/${title}`, description, "utf8", function (error) {
        response.writeHead(302, { Location: `/?id=${title}` }); //302 : redirection page..
        response.end();
      });
    }); // 파일 만들어서 다운받기...
  } else if (pathname === "/update") {
    fs.readdir("./data", function (error, fileList) {
      fs.readFile(`data/${queryData.id}`, "utf8", function (err, description) {
        var title = queryData.id;
        var list = template.list(fileList);
        var html = template.html(
          title,
          list,
          `
            <form action="/update_process" method="POST">
            <input type="hidden" name="id" value=${title} >
            <p><input type="text" name="title" value="${title}"></p>
            <p><textarea name="description" >${description}</textarea></p>
            <p><input type="submit"></p>
            </form>
            `,
          `<a href="/create">create</a>
            <a href="/update?id=${title}">update</a>            
            `
        );
        response.writeHead(200);
        response.end(html);
      });
    });
  } else if (pathname === "/update_process") {
    var body = "";
    request.on("data", function (data) {
      body += data;
    });
    request.on("end", function () {
      var post = qs.parse(body);
      var id = post.id;
      var title = post.title;
      var description = post.description;

      fs.rename(`data/${id}`, `data/${title}`, function (error) {
        fs.writeFile(`data/${title}`, description, "utf8", function (error) {
          response.writeHead(302, { Location: `/?id=${title}` }); //302 : redirection page..
          response.end();
        });
      });
    });
  } else if (pathname === "/delete_process") {
    var body = "";
    request.on("data", function (data) {
      body += data;
    });
    request.on("end", function () {
      var post = qs.parse(body);
      var id = post.id;

      fs.unlink(`data/${id}`, function (error) {
        response.writeHead(302, { Location: `/` }); //302 : redirection page..
        response.end();
      });
    });
  } else {
    response.writeHead(404);
    response.end("Not found");
  }
});
app.listen(3000);
