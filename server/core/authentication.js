const bcrypt = require("bcrypt");
const User = require("../models/User.js");

async function authenticate(username, givenPassword){
    console.log(username);
    let user = await User.findOne({username: username})
    console.log(user);
    if (!user){
        return {successful: false};
    }
    let passwordResult = await bcrypt.compare(givenPassword, user.password);
    return {successful: passwordResult};
}

module.exports = { authenticate };