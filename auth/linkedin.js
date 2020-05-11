
//TODO: RESET LINKEDIN API AND SECRET KEY before end of project. 

//imports passport and passport linkedin oath2 for linkedin authentication
var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;


//imports config page and init to serialize/deseralize passport
//allows us to store API and and Secret Key elsewhere
var config = require('../_config');
var init = require('./init');

var enterUser = require("./enterUser");
  
passport.use(new LinkedInStrategy({
  clientID: config.linkedin.clientID,
  clientSecret: config.linkedin.clientSecret,
  callbackURL: config.linkedin.callbackURL,
  scope: 'r_liteprofile',
  }, 
  function(accessToken, refreshToken, profile, done) {
    enterUser(profile);
    return done(null, profile);
  }));

  //serialize user into session
  init();

module.exports = passport;