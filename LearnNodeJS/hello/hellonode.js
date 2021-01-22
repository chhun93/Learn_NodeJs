function hello(name){
  return 'Hello ' + name;
}
var result = hello('Node');
console.log(result);

// return modlue.exports;
module.exports = {
  hi: hello
};