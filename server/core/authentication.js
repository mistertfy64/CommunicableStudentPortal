const bcrypt = require("bcrypt");
const crypto = require("crypto");

const User = require("../models/User.js");

async function authenticate(username, givenPassword, options){
    console.log(username);
    let user = await User.findOne({username: username})
    console.log(user);
    if (!user){
        return {successful: false};
    }
    let passwordResult = await bcrypt.compare(givenPassword, user.password);
    return {successful: passwordResult};
}

async function generateSessionToken(){
    let d = Date.now();
    let r = crypto.randomBytes(32).toString();
    return d.toString() + r.toString();
}

module.exports = { authenticate, generateSessionToken };