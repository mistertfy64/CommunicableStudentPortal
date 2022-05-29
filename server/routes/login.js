var router = require("express").Router();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { SHA3 } = require('sha3');

const configuration = require("../configuration.js");

const authentication = require("../core/authentication.js");

const User = require("../models/User.js");

const bcrypt = require("bcrypt");

let jsonParser = bodyParser.json();
let urlencodedParser = bodyParser.urlencoded({ extended: true });

router.use(cookieParser());

router.get("/login", async (request, response) => {
	console.log(request.cookies);
	let userHasValidSessionToken =
		await authentication.getIfSessionTokenIsValid(
			request.cookies.sessionToken
		);
		console.log(userHasValidSessionToken, request.cookies.sessionToken);
		if (!userHasValidSessionToken) {
		response.render("pages/authentication/login", {
			configuration: configuration.safeConfiguration,
		});
	} else {
		response.send(
			`You're already logged in as ${userHasValidSessionToken.username}!`
		);
	}
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
	let sessionToken = await authentication.generateSessionToken();
	sessionToken = sessionToken.toString();
	let sessionTokenOptions = {
		maxAge: options.persistent
			? 1000 * 60 * 60 * 24 * 28
			: 1000 * 60 * 60 * 2,
	};
	if (options.destroyOtherSessions) {
		await User.destroyAllSessionTokensForUserID(user.userID);
	}
	response.cookie(
		"sessionToken",
		sessionToken.toString(),
		sessionTokenOptions
	);
	// let hashedSessionToken = await bcrypt.hash(sessionToken, 12);
	let hash = new SHA3(512);
	hash.update(sessionToken.toString())
	let hashDigest = hash.digest("hex");
	await User.addSessionTokenForUserID(user.userID, hashDigest);
	response.redirect("/");
});

module.exports = router;
