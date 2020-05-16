var express = require('express');
var passportLinkedin = require('../auth/linkedin');
var passportGoogle = require('../auth/google');
var passportFacebook = require('../auth/facebook');
var passportInstagram = require("../auth/instagram")
var router = express.Router();

const mysqlDb = require('./../mysqlConn')

/* GET home page. */
router.get('/', (req, res, next) => {
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
	});
})



router.get('/create', (req, res, next) => {
		res.render('create_account', {message:''});
	});

router.post('/creating', (req, res, next) => {
		var username = req.body.username;
		var password = req.body.password;
		var profession = req.body.profession;

		if (isvalidEntry(username, password)) {
			mysqlDb.query('SELECT * FROM users WHERE username = ?',
			[username],
			(error, results, fields) => {
				if (results.length > 0) {
					userNameMessage = "Sorry, username is already in use. Choose another";
					res.render('create_account', {message: userNameMessage})
					//res.end();
				} else {
					mysqlDb.insertIntoDatabse(username, password, profession);				
					res.cookie('name', username);
					res.redirect('/select');
				}
			});
		} else {
			errorMessage = "Username and password must be greater than 5 characters";
			res.render("create_account", {message : errorMessage});
		}
	
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

// // Router for Debug Only
// router.get('/checking', (req, res, next) => {
// 	mysqlDb.query('SELECT * FROM users', (error, results, fields) => {
// 		res.send(results);
// 	})

// });

//test failure page. Delete in production
router.get('/failure', (req, res, next) => {
	res.json('Failure Page');
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


//Request directed to google for authentication. 
router.get('/auth/google', passportGoogle.authenticate('google', { scope: ['profile'] }));

//Controls redirect after authentication. Succesfull requests go to account page
//unsuccessful requests go to login page
router.get('/auth/google/callback', 
	passportGoogle.authenticate('google', { failureRedirect: '/failure' }),
		(req, res) => {
			res.redirect('/account');
		});

router.get('/auth/facebook', passportFacebook.authenticate('facebook'));

router.get('/auth/facebook/callback', 
	passportFacebook.authenticate('facebook', { failureRedirect: '/failure' }),
		(req, res) => {
			res.redirect('/account');
		});

// router.get('/auth/instagram',
// passportInstagram.authenticate('instagram'));

// router.get('/auth/instagram/callback', 
// passportInstagram.authenticate('instagram', { failureRedirect: '/failure' }),
//   (req, res) => {
//     res.redirect('/account');
//   });

function isvalidEntry(username, password) {
	var valid = true;
	if (username.length < 5 || password.length < 5) {
		valid = false;
	}
	return valid
}
module.exports = router;