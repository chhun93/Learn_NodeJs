const url = require('url');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

// 채팅 화면으로 이동
function chat(req, res, next){
  var nickname = req.session.nickname;
  res.render('chat', {title: '채팅방', nickname});

  // if(!nickname){
  //   res.writeHead(303, {Location: '/'});
  //   res.end();
  // }else{
    // var filename = path.join(views, 'chat.ejs');
    // ejs.renderFile(filename, {title: '채팅방', nickname}, function(err, data){
    //   if(err){
    //     next(err);
    //   }else{
    //     res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    //     res.end(data);
    //   }
    // });
    // fs.readFile(filename, function(err, data){
    //   res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
    //   data = data.toString().replace('<%=nickname%>', nickname);
    //   res.end(data);
    // });
  // }
}


// 로그인
function login(req, res){
  var nickname = url.parse(req.url, true).query.username;
  if(nickname && nickname.trim() != ''){
    // TODO: session에 nickname 정보를 저장한다.
    req.session.nickname = nickname;
    res.writeHead(303, {Location: '/chat'});
  }else{
    res.writeHead(303, {Location: '/'});
  }
  res.end();
}

// 로그아웃
function logout(req, res){
  // TODO: session을 삭제한다.
  req.session.destroy();
  res.writeHead(303, {Location: '/'});
  res.end();
}


function router(req, res, next){
  var pathname = url.parse(req.url).pathname;
  switch(pathname){
    case '/chat':
      chat(req, res, next);
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