const mysqlDb = require('./../mysqlConn');

module.exports = function(profile, cb) {
    process.nextTick(function () {
        var username = profile.displayName;
        var password = profile.provider;
        var profession = "null";

        mysqlDb.query('INSERT INTO users (username, password, profession) VALUES (?,?,?) ', [username, password, profession] ,function(error, results, fields) {
        });

        cb(null, profile);
        return profile;
    })

}

