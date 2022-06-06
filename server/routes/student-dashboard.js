var router = require("express").Router();
const configuration = require("../configuration.js");
const cookieParser = require("cookie-parser");
const User = require("../models/User.js");

router.use(cookieParser());

router.get("/student-dashboard", async (request, response) => {
    let data = await User.safeFindUserBySessionToken(request.cookies.sessionToken);
    if (!data){
        response.redirect("/");
        return;
    }
    if (data.membership.isSuperAdministrator || data.membership.isAdministrator){
        response.redirect("/administrator-dashboard");
        return;
    }
    response.render("pages/user/student-dashboard", {configuration: configuration.safeConfiguration, data: data}); 
});

module.exports = router;