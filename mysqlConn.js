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
	query: (queryText,params,callback) => {
		return pool.query(queryText, params, callback);
	},
	insertIntoDatabse: (username, password, profession) => {
		return query('INSERT INTO users (username, password, profession) VALUES (?,?,?) ', 
		[username, password, profession],
		(error, results, fields) => {
			 });
	},
	deleteUser : (username) => {
		return query('DELETE FROM users WHERE username = ?', 
		username, 
		(error, results, fields) => {
		});
	},
	changePassword : (id, password) => {
		return query('UPDATE users SET password = ? WHERE id = ?',
		[password, id], (error, results, fields) => {
		});
	},
	changeProfession : (id, profession) => {
		return query('UPDATE users SET profession = ? WHERE id = ?',
		[profession, id],
		(error, results, fields) => {
		});
	}
}

