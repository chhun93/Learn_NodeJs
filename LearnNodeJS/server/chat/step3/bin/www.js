const http = require('http');
const app = require('../app');

// 1. http.Server 생성
var tcpServer = http.createServer(app);
// 2. 포트 오픈 서버 구동
tcpServer.listen(80, function(){
  console.log('HTTP 서버 구동.');
});