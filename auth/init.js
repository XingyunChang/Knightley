var passport = require('passport');

module.exports = () => {
    // Passport session setup.
    //   To support persistent login sessions, Passport needs to be able to
    //   serialize users into and deserialize users out of the session.  Typically,
    //   this will be as simple as storing the user ID when serializing, and finding
    //   the user by ID when deserializing.  However, since this example does not
    //   have a database of user records, the complete profile is
    //   serialized and deserialized.
    passport.serializeUser((user, done) => {
        done(null, user);
  });
  
    passport.deserializeUser((obj, done) => {
        done(null, obj);
});

}
