const fs = require('fs');
const path = require('path');
const url = require('url');
const mime = require('mime');
const logger = require('./logger');

function staticServer(req, res, next){
  if(req.url == '/'){
    req.url = '/index.html';
  }

  var parseUrl = url.parse(req.url, true);
  var pathname = parseUrl.pathname;

  var filename = path.join(base, pathname);
  var mimeType = mime.getType(filename); // mime@2

  fs.stat(filename, function(err, status){
    if(err){
      next();
    }else if(status.isDirectory()){
      res.writeHead(403, {'Content-Type': 'text/html;charset=utf-8'});
      res.end(`<h1>디렉토리 접근 권한 없음.</h1>`);
    }else if(status.isFile()){
      res.writeHead(200, {'Content-Type': mimeType + ';charset=utf-8'});
      fs.createReadStream(filename).pipe(res);
    }
  });
}

var base;
function setBase(dir){
  base = dir;
  return staticServer;
}

module.exports = setBase;

