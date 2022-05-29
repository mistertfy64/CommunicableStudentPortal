var router = require("express").Router();
const configuration = require("../configuration.js");
const cookieParser = require("cookie-parser");

const User = require("../models/User.js");

router.use(cookieParser());

router.get("/administrator-dashboard", async (request, response) => {
    let sessionToken = request.cookies.sessionToken;
    let currentUser = await User.safeFindUserBySessionToken(sessionToken);
    if (!currentUser){
        response.redirect("/");
    }
    if (!(currentUser.membership.isSuperAdministrator || currentUser.membership.isAdministrator)){
        response.redirect("/");
    }
    response.render("pages/administrator/administrator-dashboard", {configuration: configuration.safeConfiguration}); 
});

router.get("/administrator-dashboard/:action", async (request, response) => {
    let sessionToken = request.cookies.sessionToken;
    let currentUser = await User.safeFindUserBySessionToken(sessionToken);
    if (!currentUser){
        response.redirect("/");
    }
    if (!(currentUser.membership.isSuperAdministrator || currentUser.membership.isAdministrator)){
        response.redirect("/");
    }
    response.render(`pages/administrator/administrator-dashboard/${request.params.action}`, {configuration: configuration.safeConfiguration}); 
});


module.exports = router;