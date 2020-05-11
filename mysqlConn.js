const mysql = require('mysql');
const pool = mysql.createConnection({
	host     : '52.14.216.107',
	port	 : '3306',
	user     : 'helloworld',
	password : 'helloworld',
	database : 'likeness'
});

function query(queryText, params, callback) {
	return pool.query(queryText, params, callback);
}

module.exports = {
	query: (queryText,params,callback)=>{
		return pool.query(queryText, params, callback);
	},
	insert: (username, password, profession) => {
		return query('INSERT INTO users (username, password, profession) VALUES (?,?,?) ', 
		[username, password, profession],
		(error, results, fields) => {
			 });
	}
}




// // Sanity Check
// pool.query('SELECT 1+1 AS solution', function(error, results, fields){
// 	if (error) throw error;
// 	console.log('The solution is: ', results[0].solution);
// })