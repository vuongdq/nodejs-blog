var bcrypt = require("bcrypt");
var config= require("config");


function hash_password(password) {
    var saltRound = config.get("salt");
    var salt = bcrypt.genSaltSync(saltRound);
    var hash = bcrypt.hashSync(password,salt);
    return hash;
}
module.exports = {
    hash_password: hash_password
}