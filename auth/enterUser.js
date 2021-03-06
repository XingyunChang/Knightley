const mysqlDb = require('./../mysqlConn');

module.exports = (profile, cb) => {
    process.nextTick(() => {
        var username = profile.displayName;
        var password = profile.provider;
        var profession = "null";

        mysqlDb.insertIntoDatabse(username, password, profession);

        cb(null, profile);
        return profile;
    })

}

