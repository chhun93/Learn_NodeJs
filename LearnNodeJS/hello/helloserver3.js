const http = require('http');
const fs = require('fs');
const path = require('path');
const hello = require('./hellonode');

// var httpServer = new http.Server();
// httpServer.addListener('request', function(req, res){});

// request (event) listener
function myListener(req, res){
  console.log(req.method, req.url, req.httpVersion);
  // console.log(req.headers);

  var filename = path.join(__dirname, req.url.substring(1));
  // 동기 방식의 함수 호출
  // try{
  //   var data = fs.readFileSync(filename);
  //   res.writeHead(200);
  //   res.end(data);
  // }catch(err){
  //   res.writeHead(404);
  //   res.end('<h1>' + filename + ' Not Found!</h1>');
  // }

  // 비동기 방식의 함수 호출
  // fs.readFile(filename, function(err, data){
  //   if(err){
  //     res.writeHead(404);
  //     res.end('<h1>' + hello.hi('Node') + filename + ' Not Found !!!!!!!!</h1>');
  //   }else{
  //     res.writeHead(200);
  //     res.end(data);
  //   }
  // });

  // 스트림 방식
  var fileStream = fs.createReadStream(filename, {highWaterMark: 1024*1024*2});
  fileStream.on('open', function(){
    res.writeHead(200);
  });
  fileStream.on('error', function(){
    res.writeHead(404).end('<h1>' + hello.hi('Node') + filename + ' Not Found !!!!!!!!</h1>');
  });
  fileStream.on('close', function(){
    res.end();
  });
  fileStream.pipe(res);
  // fileStream.on('data', function(data){
  //   console.log(data.length);
  //   res.write(data);
  // });
}

// var httpServer = http.createServer(myListener);
var httpServer = new http.Server();
httpServer.addListener('request', myListener);

httpServer.on('listening', function(){
  console.log('서버 구동 완료', port);
});
httpServer.on('error', function(err){
  console.log('서버 구동 실패', err.message);
  httpServer.listen(++port);
});

var port = process.argv[2] || 8009;
httpServer.listen(port);