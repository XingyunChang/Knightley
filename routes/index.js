var express = require('express');
var passportLinkedin = require('../auth/linkedin');
var passportGoogle = require('../auth/google');
var passportFacebook = require('../auth/facebook');
var router = express.Router();

const mysqlDb = require('./../mysqlConn')

/* GET home page. */
router.get('/', (req, res, next) => {
	// console.log(mysqlDb.query('SELECT * FROM templates'))
	res.render('login', {title:''});
});

router.post('/auth', (req, res , next) => {
	var username = req.body.username;
	var password = req.body.password;

	mysqlDb.query('SELECT * FROM users WHERE username = ? and password = ?',
	 [username, password],
	 (error, results, fields) => {
		if (results.length > 0) {
			res.json(results);
		} else {
			res.render('login', {title:'Incorrect Username and/or Password!'});
		}		
		console.log('success')
	});
})



router.get('/create', (req, res, next) => {
		res.render('create_account', {message:''});
	});

router.post('/creating', (req, res, next) => {
		var username = req.body.username;
		var password = req.body.password;
		var profession = req.body.profession;
		
		console.log(username);
		console.log(password);
		
		mysqlDb.query('SELECT * FROM users WHERE username = ?',
		 [username],
		 (error, results, fields) => {
			if (results.length > 0) {
				res.send('Sorry, username is taken');
				res.end();
			} else {
				mysqlDb.insert(username, password, profession);				
				res.cookie('name', username);
				console.log("======Cookie======");
				console.log(req.cookies.name)
				res.redirect('/select');
			}
		});
	
	});

router.get('/confirm', (req, res, next) => {
	res.render('index', {title: req.cookies.name});
});

router.get('/select', (req, res, next) => {
	var username = req.body.username;
	mysqlDb.query('SELECT * FROM templates AS id', (error, results, fields) => {
		obj = {print: results, username: username}
		res.render('show', obj)
	})
});

router.get('/select/:id', (req, res, next) => {
	var temp_id = req.params.id;
	mysqlDb.query('SELECT * FROM templates WHERE id=?', [temp_id], (error, results, fields) => {
		res.json(results)
	})
	
})

// Router for Debug Only
router.get('/checking', (req, res, next) => {
	mysqlDb.query('SELECT * FROM users', (error, results, fields) => {
		console.log(results);
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
	passportLinkedin.authenticate('linkedin', { failureRedirect: '/failure' }),
		(req, res) => {
			res.redirect('/account');
		});

//test failure page
router.get('/failure', (req, res, next) => {
	res.json('Failure Page');
});

//	 Request directed to google for authentication. 
router.get('/auth/google', passportGoogle.authenticate('google', { scope: ['profile'] }));

//	Controls redirect after authentication. Succesfull requests go to account page
//	unsuccessful requests go to login page
router.get('/auth/google/callback', 
	passportGoogle.authenticate('google', { failureRedirect: '/failure' }),
		(req, res) => {
			res.redirect('/account');
		});

router.get('/auth/facebook', passportFacebook.authenticate('facebook'));

router.get('/auth/facebook/callback', 
	passportFacebook.authenticate('facebook', { failureRedirect: '/' }),
		(req, res) => {
			res.redirect('/account');
		});


module.exports = router;
