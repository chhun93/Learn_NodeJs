console.log('1. process 시작.');
process.on('exit', function(code){
  // exit 이벤트 내에서는 비동기 하수 호출이 의미 없으므로 동기함수만 사용해야 한다.
  console.log('process 종료 직전에 처리할 작업.', code);
  // require('fs').writeFileSync('error.txt', '에러발생 ' + code + require('os').EOL, {flag: 'a'});
  // console.log('동기 방식으로 에러 로깅 완료.');

  require('fs').writeFile('error.txt', '에러발생 ' + code + require('os').EOL, {flag: 'a'}, function(){
    console.log('비동기 방식으로 에러 로깅 완료.');
  });
});
try{
  a();
}catch(err){
  console.error(err.message);
}
setTimeout(function(){
  console.debug('1초 후에 호출.');
}, 1000);
console.info('2. process 종료.');