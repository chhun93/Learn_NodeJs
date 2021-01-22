console.log('범용성이 필요한 확장모듈이 주로 사용하는 패턴(connect의 미들웨어)');
const fs = require('fs');
const os = require('os');
function logger(options){
  if(options && options.target == 'file'){
    var logfile = fs.createWriteStream(options.filename || 'logger.txt', {flags: 'a'});
  }
  return {
    log: function(msg){
      if(logfile){
        logfile.write(msg + os.EOL);
      }else{
        console.log(msg);
      }
    },
    debug: function(){},
    // ...
  };
}

module.exports = logger;