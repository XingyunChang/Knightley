var express = require('express');
var passportLinkedin = require('../auth/linkedin');
var passportGoogle = require('../auth/google');
var passportFacebook = require('../auth/facebook');
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
	var username = req.body.username;
	// var password = req.body.password;
	mysqlDb.query('SELECT * FROM templates AS id', function(error, results, fields) {
		obj = {print: results, username: username}
		res.render('show', obj)
	})
});

router.get('/select/:id', function(req, res, next) {
	var temp_id = req.params.id;
	mysqlDb.query('SELECT * FROM templates WHERE id=?', [temp_id], function(error, results, fields) {
		// obj = {print: results}
		res.json(results)
		// res.render('single', obj)
	})
	
})

// Router for Debug Only
router.get('/checking', function(req, res, next) {
	// var username = req.body.username;
	// var password = req.body.password;
	mysqlDb.query('SELECT * FROM users', function(error, results, fields) {
		console.log(results)
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

router.get('/auth/facebook', passportFacebook.authenticate('facebook'));

router.get('/auth/facebook/callback', 
	passportFacebook.authenticate('facebook', { failureRedirect: '/' }),
	function(req, res) {
		res.redirect('/account');
	});


// router.post('/auth', function(req, res, next) {
// 	var username = req.body.username;
// 	var password = req.body.password;
	
	
// });

module.exports = router;
