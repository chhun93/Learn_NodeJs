const url = require('url');
const fs = require('fs');
const path = require('path');

const views = path.join(__dirname, '..', 'views');

// 채팅 화면으로 이동
function chat(req, res){
  // res.writeHead(303, {Location: '/chat.html'});
  // res.end();

  // /chat?username=%EA%B9%80%EC%B2%A0%EC%88%98
  // TODO: session에서 nickname을 꺼낸다.
  var nickname = url.parse(req.url, true).query.username;
  var filename = path.join(views, 'chat.html');
  fs.readFile(filename, function(err, data){
    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    data = data.toString().replace('<%=nickname%>', nickname);
    res.end(data);
  });
}


// 로그인
function login(req, res){
  var nickname = url.parse(req.url, true).query.username;
  if(nickname && nickname.trim() != ''){
    // TODO: session에 nickname 정보를 저장한다.

    res.writeHead(303, {Location: '/chat'});
  }else{
    res.writeHead(303, {Location: '/'});
  }
  res.end();
}

// 로그아웃
function logout(req, res){
  // TODO: session을 삭제한다.
  
  res.writeHead(303, {Location: '/'});
  res.end();
}


function router(req, res, next){
  var pathname = url.parse(req.url).pathname;
  switch(pathname){
    case '/chat':
      chat(req, res);
      break;
    case '/login':
      login(req, res);
      break;
    case '/logout':
      logout(req, res);
      break;
    default:
      next();
  }
}

module.exports = router;