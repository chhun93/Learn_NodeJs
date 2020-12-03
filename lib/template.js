var template = {
  html: function (title, list, body, control) {
    return `
  <!doctype html>
  <html>
  <head>
    <title>WEB2 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    ${control}
    ${body}
  </body>
  </html>
  `;
  },
  list: function (fileList) {
    var list = "<ol>";
    for (var i in fileList)
      list += `<li><a href="/?id=${fileList[i]}">${fileList[i]}</a></li>`;
    list += "</ol>";

    return list;
  },
};

module.exports = template;
