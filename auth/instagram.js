var passport = require('passport');
var InstagramStrategy = require('passport-instagram').Strategy;

//imports config page and init to serialize/deseralize passport
//allows us to store API and and Secret Key elsewhere
var config = require('../_config');
var init = require('./init');

var enterUser = require("./enterUser");

// passport.use(new InstagramStrategy({
//     clientID: config.instagram.clientID,
//     clientSecret: config.instagram.clientSecret,
//     callbackURL: config.instagram.callbackURL
//   },
//   (accessToken, refreshToken, profile, done) => {
//     return enterUser(profile, done);
//   }
// ));

//serialize user into session
init();

module.exports = passport;