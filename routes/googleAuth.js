var passport = require('passport');
var express = require('express');
var router = express.Router();
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var config = require('./../_config');

/* GET home page. */
router.get('/', (req, res, next) => {
  //res.render('index', { title: 'Express' });
  res.json("Google");
});

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

passport.use(new GoogleStrategy({
    clientID: config.google.clientID,
    clientSecret:  config.google.clientSecret,
    callbackURL: config.google.callbackURL
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

module.exports = router;
