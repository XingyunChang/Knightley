
//TODO: RESET LINKEDIN API AND SECRET KEY before end of project. 

//imports passport and passport linkedin oath2 for linkedin authentication
var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;


//imports config page and init to serialize/deseralize passport
//allows us to store API and and Secret Key elsewhere
var config = require('../_config');
var init = require('./init');

const mysqlDb = require('./../mysqlConn')

  
passport.use(new LinkedInStrategy({
  clientID: config.linkedin.clientID,
  clientSecret: config.linkedin.clientSecret,
  callbackURL: config.linkedin.callbackURL,
  scope: 'r_liteprofile',
  }, function(accessToken, refreshToken, profile, done) {
    console.log(profile.firstName);
    // asynchronous verification, for effect...
    process.nextTick(function () {
      var username = profile.displayName
      var password = profile.provider;
      var profession = "null";

      //need to check to see if user is already in the databse.
      //if so, just return user profile, else insert user into database and
      //return profile

      //works for case where we have a new user
      mysqlDb.query('INSERT INTO users (username, password, profession) VALUES (?,?,?) ', [username, password, profession] ,function(error, results, fields) {
      });

      return done(null, profile);
    });
  }));

  //serialize user into session
  init();

module.exports = passport;