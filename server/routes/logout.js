var router = require("express").Router();
const cookieParser = require("cookie-parser");
const configuration = require("../configuration.js");

router.use(cookieParser());

router.get("/logout", (request, response) => {
    response.cookie(
		"sessionToken",
		""
	);
    response.redirect("/")
});

module.exports = router;