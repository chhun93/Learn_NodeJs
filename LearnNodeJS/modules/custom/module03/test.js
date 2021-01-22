var m1 = require('./m1'); // return object
console.log(typeof m1, m1.name, m1.type); 
var m2 = require('./m2'); // return function
console.log(typeof m2, m2());
var m3 = require('./m3');
var kim = m3({kor: 100, eng: 90});
var lee = m3({kor: 80, eng: 70});
console.log(kim.sum(), kim.avg());
console.log(lee.sum(), lee.avg());

var http = require('./m4');
http.createServer(function(req, res){
  // req로부터 요청정보를 분석
  // res로 응답
});

var fs = require('./m4');
fs.readFile('hello.html', function(err, data){
  if(err){
    console.error(err);
  }else{
    console.log(data);
  }
});

var path = require('./m4');
var filename = path.join(__dirname, 'hello', 'hello.html');
console.log(filename);

// var logger = require('./m5')({target: 'file', filename: 'output.txt'});
// var logger = require('./m5')({target: 'file'});
var logger = require('./m5')();
logger.log('작업시작.');
logger.log('작업중...');
logger.log('작업종료.');