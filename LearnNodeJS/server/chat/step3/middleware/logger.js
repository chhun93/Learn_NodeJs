const fs = require('fs');
const os = require('os');
function logger(options){
  if(options && options.target == 'file'){
    var logfile = fs.createWriteStream(options.filename || 'chat_log.txt', {flags: 'a'});
  }
  return function(req, res){
    if(logfile){
      logfile.write(`[${Date()}] ${res.statusCode} ${req.url}`);
      logfile.write(os.EOL);
    }else{
      console.log(`[${Date()}] ${res.statusCode} ${req.url}`);
    }
  };
}

module.exports = logger;