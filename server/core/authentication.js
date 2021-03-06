const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { SHA3 } = require('sha3');

const User = require("../models/User.js");

const log = require("./log.js");

async function authenticate(username, givenPassword, options){
    let user = await User.findOne({username: username})
    if (!user){
        return {successful: false};
    }
    let passwordResult = await bcrypt.compare(givenPassword, user.password);
    return {successful: passwordResult};
}

async function generateSessionToken(){
    let d = Date.now();
    let r = crypto.randomBytes(16).toString("hex");
    return d.toString() + r.toString();
}

async function getIfSessionTokenIsValid(sessionToken){
    if (!sessionToken){
        return false;
    }
    let hash = new SHA3(512);
	hash.update(sessionToken.toString());
	let hashDigest = hash.digest("hex");
    let hashedSessionToken = hashDigest;
    let user = await User.findOne({sessionTokens: hashedSessionToken});
    return user ? await User.safeFindUserByUserID(user.userID) : false;
}


module.exports = { authenticate, generateSessionToken, getIfSessionTokenIsValid };