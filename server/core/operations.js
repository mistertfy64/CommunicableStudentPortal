var router = require("express").Router();
const configuration = require("../configuration.js");
const User = require("../models/User.js");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { query } = require("express");

router.use(cookieParser());
let urlencodedParser = bodyParser.urlencoded({ extended: true });

router.post("/operations/:operation", urlencodedParser, async (request, response) => {
    let operation = request.params.operation;
    let query = request.query;
    switch (operation){
        case "changeUsername": {
            let result = await changeUsernameForSessionToken(request.cookies.sessionToken, request.body["new-username"]);
            if (result){
                console.log(`Success.`);
            } else {
                console.log(`Failed.`);
            }
            response.redirect("/student-dashboard");
            break;
        }
    }
});

async function changeUsernameForSessionToken(sessionToken, newUsername){
    if (!newUsername){
        return false;
    }
    if (!/[0-9A-Za-z_]{3,20}/.test(newUsername)){
        return false;
    }
    let usernameAlreadyExists = await User.safeFindUserByUsername(newUsername);
    if (usernameAlreadyExists){
        return false;
    }
    let currentUser = await User.safeFindUserBySessionToken(sessionToken);
    await User.changeUsernameForUserID(currentUser.userID, newUsername);
    return true;
}

module.exports = router;