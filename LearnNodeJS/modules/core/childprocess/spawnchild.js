const path = require('path');
var filename = path.basename(__filename);
console.log(filename, '실행');

// 2. Child <- Parent
process.stdin.on('data', function(data){
  // 3. Child -> Parent
  process.stdout.write(data);
});