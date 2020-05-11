const mysql = require('mysql');
const pool = mysql.createConnection({
	host     : '52.14.216.107',
	port	 : '3306',
	user     : 'helloworld',
	password : 'helloworld',
	database : 'likeness'
});


module.exports = {
	query: (queryText,params,callback)=>{
		return pool.query(queryText, params, callback);
	}
}


// // Sanity Check
// pool.query('SELECT 1+1 AS solution', function(error, results, fields){
// 	if (error) throw error;
// 	console.log('The solution is: ', results[0].solution);
// })