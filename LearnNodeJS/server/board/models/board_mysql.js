var mysql = require('mysql');

var pool = mysql.createPool({
  connectionLimit: 10,
  host: '106.246.114.67',
  port: 3406,
	user: 'board',
	password: 'Board123',
	database: 'board'
});

var sql = {
		list: 'SELECT _id, title, writer, view, regdate FROM board ORDER BY _id DESC',
		show: 'SELECT * FROM board WHERE _id=?',
		incView: 'UPDATE board SET view=view+1 WHERE _id=?',
		create: 'INSERT INTO board SET ?',
		remove: 'DELETE FROM board WHERE _id=?'
};

module.exports = {
	// 게시물 목록 조회
	list: function(cb){
		pool.query(sql.list, function(err, result){
      if(err){
        console.error(err);
        cb([]);
      }else{
        cb(result);
      }
    });
	},
	// 게시물 상세 조회
	show: function(no, cb){
		pool.query(sql.show, [no], function(err, result){
      pool.query(sql.incView, [no]);
      cb(result);
    });
	},
	// 게시물 등록
	create: function(article, cb){
		article.regdate = require('date-format').asString('yyyy-MM-dd hh:mm:ss', new Date());
		pool.query(sql.create, article, function(err, result){
      cb(result.insertId);
    });
	},
	// 게시물 삭제
	remove: function(no, cb){
		pool.query(sql.remove, [no], cb);
	}
};














