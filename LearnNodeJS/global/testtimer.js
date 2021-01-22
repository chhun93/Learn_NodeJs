function print(msg){
  console.log(msg);
}
print('1. start');
setImmediate(print, '5. setImmediate');
setTimeout(print, 0, '4. setTimeout');
process.nextTick(print, '3. nextTick');

// etInterval(print, 800, 'setInterval');

print('2. finish');