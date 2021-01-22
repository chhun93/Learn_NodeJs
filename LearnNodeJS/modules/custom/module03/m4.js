console.log('주로 코어모듈이 사용하는 전형적인 exports 패턴');
var someObj = {
  createServer: function(requestListener){
    // ......
    // 클라이언트의 요청 메세지가 도착하면
    // 요청 정보를 파싱.
    requestListener({}, {});
  }, // http 모듈
  readFile: function(filename, fn){
    // filename을 읽어서 fn의 인자값으로 호출
    fn('에러메세지', '파일내용');
  }, // fs 모듈
  join: function(p1, p2, p3){
    return p1 + '\\' + p2 + '\\' + p3;
  }  // path 모듈
};
module.exports = someObj;