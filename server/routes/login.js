var router = require("express").Router();
const bodyParser = require("body-parser");

const configuration = require("../configuration.js");

const authentication = require("../core/authentication.js");

const User = require("../models/User.js");

const bcrypt = require("bcrypt");

let jsonParser = bodyParser.json();
let urlencodedParser = bodyParser.urlencoded({ extended: true });

router.get("/login", (request, response) => {
	response.render("pages/authentication/login", {
		configuration: configuration.safeConfiguration,
	});
});

router.post("/login", urlencodedParser, async (request, response) => {
	let credentials = request.body;
	let options = {
		persistent:
			credentials.options === "persistent" ||
			credentials.options?.indexOf("persistent") > -1,
		destroyOtherSessions:
			credentials.options === "destroy-other-sessions" ||
			credentials.options?.indexOf("destroy-other-sessions") > -1,
	};
	let user = await User.safeFindUserByUsername(credentials.username);
	let result = await authentication.authenticate(
		credentials.username,
		credentials.password,
		options
	);
	if (!result.successful) {
		// failed
		console.log("Failed.");
		return;
	}
	// success
	let sessionToken = authentication.generateSessionToken().toString();
	let sessionTokenOptions = {
		maxAge: options.persistent
			? 1000 * 60 * 60 * 24 * 28
			: 1000 * 60 * 60 * 2,
	};
	if (options.destroyOtherSessions) { await User.destroyAllSessionTokensForUserID(user.userID);}
	response.cookie(
		"sessionToken",
		sessionToken.toString(),
		sessionTokenOptions
	);
	let hashedSessionToken = await bcrypt.hash(sessionToken, 12);
	await User.addSessionTokenForUserID(user.userID, hashedSessionToken);
});

module.exports = router;
