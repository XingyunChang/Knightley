//imports required for express server
var createError = require('http-errors');
var path = require('path');

//imports required for express ever and user authentication
var express = require('express')
  , http = require('http')
  , passport = require('passport')
  , util = require('util')
  , LinkedInStrategy = require('passport-linkedin').Strategy;

//middleware 
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');



//file locations for various routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var linkedinAuth = require('./routes/linkedinAuth');


var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true//,
  //cookie: { secure: true }
}))

// Initialize Passport!  Also use passport.session() middleware, to support
// persistent login sessions (recommended).
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));


//routes 
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/linked', linkedinAuth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

var LINKEDIN_API_KEY = "860jdfnwzxfu4z";
var LINKEDIN_SECRET_KEY = "48T071Z7h7x4UjEN";

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

// Use the LinkedInStrategy within Passport.
//   Strategies in passport require a `verify` function, which accept
//   credentials (in this case, a token, tokenSecret, and LinkedIn profile), and
//   invoke a callback with a user object.
passport.use(new LinkedInStrategy({
    consumerKey: LINKEDIN_API_KEY,
    consumerSecret: LINKEDIN_SECRET_KEY,
    callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback"
  },
  function(token, tokenSecret, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {
      // To keep the example simple, the user's LinkedIn profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the LinkedIn account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

module.exports = app;
