var express = require('express');
var passportLinkedin = require('../auth/linkedin');
var passportGoogle = require('../auth/google');
var router = express.Router();

const mysqlDb = require('./../mysqlConn')

/* GET home page. */
router.get('/', function(req, res, next) {
	// console.log(mysqlDb.query('SELECT * FROM templates'))
	res.render('login');
});

router.get('/create', function(req, res, next) {
		res.render('create_account');	
	
	});

router.post('/creating', function(req, res, next) {
		var username = req.body.username;
		var password = req.body.password;
		var profession = req.body.profession;
		
		console.log(username);
		console.log(password);
		
		mysqlDb.query('INSERT INTO users (username, password, profession) VALUES (?,?,?) ', [username, password, profession] ,function(error, results, fields) {
			console.log('success')
		});
		
	
		res.cookie('name', username);
		console.log("======Cookie======");
		console.log(req.cookies.name)
		res.redirect('/select');
	
	});

router.get('/confirm', function(req, res, next) {
	// var username = req.body.username;
	// var password = req.body.password;
	res.render('index', {title: req.cookies.name});


});

router.get('/select', function(req, res, next) {
	// var username = req.body.username;
	// var password = req.body.password;
	mysqlDb.query('SELECT * FROM templates AS id', function(error, results, fields) {
		// template0 = results[0].id;
		// template1 = results[1];
		// template2 = results[2];
		
		templates = {}
		// templates_array = JSON.stringify(results)
		// console.log(templates_array)
		// for (var i = 0; i < templates_array ; i++) {
		// 	console.log(templates_array[i])
		// 	templates[i] = templates_array[i]
		// }
		
		
		Object.keys(results).forEach(function(key) {
			var row = results[key];
			templates[row.id] = row;
		});
		
		// var one = '1'
		// templates = {
			
		// }
		
		// var objs = [];
		// for (var i = 0;i < results.length; i++) {
		// 	objs.push({username: rows[i].username});
		// }
		// connection.end();
		
		// res.send(results);
		
		// res.send(templates)
		
		res.render('show', thisone = templates)
	})
	// res.render('index', {title: req.cookies.name});


});

router.get('/checking', function(req, res, next) {
	// var username = req.body.username;
	// var password = req.body.password;
	mysqlDb.query('SELECT * FROM users', function(error, results, fields) {
		res.send(results);
		
	})

});

// The request will be redirected to LinkedIn for authentication, so this
// function will not be called. LinkedIn will
// redirect the user back to this application at /auth/linkedin/callback
router.get('/auth/linkedin', passportLinkedin.authenticate('linkedin'),);

//	Passport authenticates users via linkedin. If authentication fails, user
//	will be directed to login page. Otherwise, it will direct user to login page.
router.get('/auth/linkedin/callback',
  passportLinkedin.authenticate('linkedin', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/account');
  });


//	 Request directed to google for authentication. 
router.get('/auth/google', passportGoogle.authenticate('google', { scope: ['profile'] }));

//	Controls redirect after authentication. Succesfull requests go to account page
//	unsuccessful requests go to login page
router.get('/auth/google/callback', 
passportGoogle.authenticate('google', { failureRedirect: '/' }),
	function(req, res) {
		res.redirect('/account');
	});



// router.post('/auth', function(req, res, next) {
// 	var username = req.body.username;
// 	var password = req.body.password;
	
	
// });

module.exports = router;
