const mysql = require('mysql');
const pool = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'password',
	database : 'likeness'
});

module.exports = {
	query: (queryText,params,callback)=>{
		return pool.query(queryText, params, callback);
	}
}
// pool.query('SELECT created_at FROM templates AS solution', function(error, results, fields){
// 	if (error) throw error;
// 	console.log('The solution is: ', results[0]);
// })