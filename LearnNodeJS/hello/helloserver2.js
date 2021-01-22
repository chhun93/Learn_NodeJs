const nodeStatic = require('node-static');
var file = new nodeStatic.Server('./');
require('http').createServer(function(req, res){
  file.serve(req, res);
}).listen(2345);

// C:\Users\student\AppData\Roaming\npm