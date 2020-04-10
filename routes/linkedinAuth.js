
//RESET LINKEDIN API AND SECRET KEY before end of project. 

//imports passport and passport linkedin oath2 for linkedin authentication
var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

//imports express and router to set up routes for site
var express = require('express');
var router = express.Router();

//imports config page
//allows us to store API and and Secret Key elsewhere
var config = require('./../_config');

/* GET home page. */
router.get('/', (req, res, next) => {
  //res.render('index', { title: 'Express' });
  res.json("LinkedIn");
});

router.get('/account', ensureAuthenticated, function(req, res){
    res.json("account page");
    //res.render('account', { user: req.user });
  });
  
router.get('/login', function(req, res){
    res.json("Login or failure page");5
    //res.render('login', { user: req.user });
});

  // GET /auth/linkedin
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in LinkedIn authentication will involve
//   redirecting the user to linkedin.com.  After authorization, LinkedIn will
//   redirect the user back to this application at /auth/linkedin/callback
router.get('/auth/linkedin',
    passport.authenticate('linkedin'),
    function(req, res){
  // The request will be redirected to LinkedIn for authentication, so this
  // function will not be called.
});

// GET /auth/linkedin/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
router.get('/auth/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/login');
  }
  
  // Passport session setup.
  //   To support persistent login sessions, Passport needs to be able to
  //   serialize users into and deserialize users out of the session.  Typically,
  //   this will be as simple as storing the user ID when serializing, and finding
  //   the user by ID when deserializing.  However, since this example does not
  //   have a database of user records, the complete LinkedIn profile is
  //   serialized and deserialized.
  passport.serializeUser(function(user, done) {
      done(null, user);
    });
    
  passport.deserializeUser(function(obj, done) {
      done(null, obj);
  });
  
  passport.use(new LinkedInStrategy({
    clientID: config.linkedin.clientID,
    clientSecret: config.linkedin.clientSecret,
    callbackURL: config.linkedin.callbackURL,
    scope: ['r_emailaddress', 'r_liteprofile'],
    state: true
  }, function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      // To keep the example simple, the user's LinkedIn profile is returned to
      // represent the logged-in user. In a typical application, you would want
      // to associate the LinkedIn account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }));

module.exports = router;