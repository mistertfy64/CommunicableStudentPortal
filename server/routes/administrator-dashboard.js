var router = require("express").Router();
const bodyParser = require("body-parser");
const configuration = require("../configuration.js");
const cookieParser = require("cookie-parser");

const User = require("../models/User.js");
const users = require("../core/users.js");

router.use(cookieParser());
let urlencodedParser = bodyParser.urlencoded({ extended: true });

router.get("/administrator-dashboard", async (request, response) => {
	let sessionToken = request.cookies.sessionToken;
	let currentUser = await User.safeFindUserBySessionToken(sessionToken);
	if (!currentUser) {
		response.redirect("/");
	}
	if (
		!(
			currentUser.membership.isSuperAdministrator ||
			currentUser.membership.isAdministrator
		)
	) {
		response.redirect("/");
	}
	response.render("pages/administrator/administrator-dashboard", {
		configuration: configuration.safeConfiguration,
	});
});

router.get("/administrator-dashboard/:action", async (request, response) => {
	let sessionToken = request.cookies.sessionToken;
	let currentUser = await User.safeFindUserBySessionToken(sessionToken);
	if (!currentUser) {
		response.redirect("/");
		return;
	}
	if (
		!(
			currentUser.membership.isSuperAdministrator ||
			currentUser.membership.isAdministrator
		)
	) {
		response.redirect("/");
		return;
	}
	response.render(`pages/administrator/${request.params.action}`, {
		configuration: configuration.safeConfiguration,
	});
});

router.post(
	"/administrator-dashboard/create-user",
	urlencodedParser,
	async (request, response) => {
		let sessionToken = request.cookies.sessionToken;
		let currentUser = await User.safeFindUserBySessionToken(sessionToken);
		if (!currentUser) {
			response.redirect("/");
			return;
		}
		if (
			!(
				currentUser.membership.isSuperAdministrator ||
				currentUser.membership.isAdministrator
			)
		) {
			response.redirect("/");
			return;
		}

		let body = request.body;
		let options = {
			amount: body[`number-of-users`],
			usernameType: body[`username-option`],
			userIDType: body[`user-id-option`],
			startingUsername: body[`username-start-value`],
			startingUserID: body[`user-id-start-value`],
		};

		console.log("Creating users...");
		console.log(options)

        users.createUsers(options);
	}
);

module.exports = router;
