var express = require('express');
var router = express.Router();

const mysqlDb = require('./../mysqlConn');

router.get('/', ensureAuthenticated, (req, res) => {
    var username = req.user.displayName;
    var password = req.user.provider;

    mysqlDb.query('SELECT * FROM users WHERE username = ? and password = ?',
     [username, password],
     (error, results, fields) => {
       res.json(results);
    });
});


// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    res.redirect('/');
  }

module.exports = router;
