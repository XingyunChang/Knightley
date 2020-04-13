
//TODO: RESET LINKEDIN API AND SECRET KEY before end of project. 

//imports passport and passport linkedin oath2 for linkedin authentication
var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;


//imports config page and init to serialize/deseralize passport
//allows us to store API and and Secret Key elsewhere
var config = require('../_config');
var init = require('./init');

  
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

  //serialize user into session
  init();

module.exports = passport;