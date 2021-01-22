var assert = require('assert');
const { O_TRUNC } = require('constants');
var upper = require('./upper');

var success = 0;
var fail = 0;
console.log('테스트 시작.');

/*
var result = upper.sync('hello', 2);
if(result == 'L'){
  console.log('1. 통과');
  success++;
}else{
  console.log('1. 실패');
  fail++;
}

var result = upper.sync('hello', 5);
if(result == null){
  console.log('2. 통과');
  success++;
}else{
  console.log('2. 실패');
  fail++;
}
*/

/* 독립적인 테스트를 위해서 작성해야 하는 코드가 너무 많다.
try{
  var result = upper.sync('hello', 5);
  assert.strictEqual(result, null);
  console.log('4. 통과.');
  success++;
}catch(err){
  console.log('4. 실패.');
  fail++;
}

try{
  var result = upper.sync('hello', 2);
  assert.strictEqual(result, 'L');
  console.log('3. 통과.');
  success++;
}catch(err){
  console.log('3. 실패.');
  fail++;
}
*/

/* 비동기 함수 테스트(순차적인 테스트가 필요할 경우 코드가 복잡해진다.)
upper.async('hello', 5, function(result){
  try{
    assert.strictEqual(result, null);
    console.log('1. 통과.');
    success++;
  }catch(err){
    console.log('1. 실패.');
    fail++;
  }

  upper.async('hello', 2, function(result){
    try{
      assert.strictEqual(result, 'L');
      console.log('2. 통과.');
      success++;
    }catch(err){
      console.log('2. 실패.');
      fail++;
    }

    upper.async('hello', 0, function(result){
      try{
        assert.strictEqual(result, 'H');
        console.log('3. 통과.');
        success++;
      }catch(err){
        console.log('3. 실패.');
        fail++;
      }

      console.log('테스트 종료.');
      console.log('success', success);
      console.log('fail', fail);
    });
  });
});
*/


// console.log('테스트 종료.');
// console.log('success', success);
// console.log('fail', fail);



