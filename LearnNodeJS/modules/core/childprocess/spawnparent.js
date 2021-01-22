const { spawn } = require('child_process');

// node.exe spawnchild.js
var child = spawn('node.exe', ['spawnchild.js'], {
  // stdio: 자식 프로세스의 표준 입출력 장치를 지정[stdin, stdout, stderr]

  // stdio: ['inherit', 'inherit', 'inherit']
  // stdio: 'inherit' // 부모의 표준 입출력 장치를 자식과 공유

  // stdio: 'ignore' // 사용안함

  // 'pipe'(기본값): 자식 프로세스의 표준 입출력 장치를 
  // 생성된 ChildProcess 객체의 stdin, stdout, stderr 속성으로 pipe 연결
  stdio: 'pipe'
});

child = spawn('cmd.exe');
child.stdin.write('dir\r\n');

cilld = spawn('java', ['HelloJava']);

// 4. Parent <- Child
child.stdout.on('data', function(data){
  console.log('from child: ' + data);
});

// 1. Parent -> Child
child.stdin.write('hello');

