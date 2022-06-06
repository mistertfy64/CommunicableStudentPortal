var router = require("express").Router();
const configuration = require("../configuration.js");
const User = require("../models/User.js");

router.get("/chat", async (request, response) => {
    
    let sessionToken = request.cookies.sessionToken;
	let currentUser = await User.safeFindUserBySessionToken(sessionToken);
	if (!currentUser) {
		response.redirect("/");
		return;
	}

    response.render("pages/chat", {configuration: configuration.safeConfiguration}); 

});

module.exports = router;