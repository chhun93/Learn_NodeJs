console.log('m3 로딩 시작.');
console.log(__dirname);
console.log(__filename);
require('./m1');

// console.log('cache', require.cache);
console.log('main', require.main == module, require.main.filename);
console.log('parent', module.parent && module.parent.filename);
console.log('children', module.children[0] && module.children[0].filename);
console.log('m3 로딩 완료.');