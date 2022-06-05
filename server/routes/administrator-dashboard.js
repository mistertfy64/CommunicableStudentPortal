var router = require("express").Router();
const bodyParser = require("body-parser");
const configuration = require("../configuration.js");
const cookieParser = require("cookie-parser");

const crypto = require("crypto");

const User = require("../models/User.js");
const users = require("../core/users.js");
const log = require("../core/log.js");

router.use(cookieParser());
let urlencodedParser = bodyParser.urlencoded({ extended: true });

router.get("/administrator-dashboard", async (request, response) => {
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
	response.render("pages/administrator/administrator-dashboard", {
		configuration: configuration.safeConfiguration,
	});
});

//TODO: MAKE THIS MORE STABLE
router.get("/administrator-dashboard/:action", async (request, response) => {
	let data;
	if (request.query.userToModify) {
		data = await User.safeFindUserByUserID(request.query.userToModify);
	}
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
		data: data,
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

		console.log(log.addMetadata("Creating users...", "info"));

		users.createUsers(options);
	}
);

router.post(
	"/administrator-dashboard/find-user",
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
		//TODO: Add find by username.

		let user = await User.safeFindUserByUserID(
			request.body["user-id-to-find"].toString()
		);
		response.redirect(
			`/administrator-dashboard/modify-user${
				user?.userID ? `?userToModify=${user.userID}` : ""
			}`
		);
	}
);

router.post(
	"/administrator-dashboard/modify-user",
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
		let userToModify = request.body["user-to-modify"];

		body["new-name"] &&
			(await User.changeNameForUserID(
				userToModify,
				body["new-name"].toString()
			));

		if (await User.safeFindUserByUserID(body["new-username"].toString())) {
			body["new-username"] &&
				(await User.changeUsernameForUserID(
					userToModify,
					body["new-username"].toString()
				));
		}

		if (await User.safeFindUserByUserID(body["new-user-id"].toString())) {
			body["new-user-id"] &&
				(await User.changeUserIDForUserID(
					userToModify,
					body["new-user-id"].toString()
				));
		}
		response.redirect(request.originalUrl)
	}

);

router.post(
	"/administrator-dashboard/view-api-key",
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

		console.log(log.addMetadata("Creating API key...", "info"));

		let key = crypto.randomBytes(24).toString("hex");

		let apiKey = {
			apiKey: key,
		};

		await User.createAPIKeyForUserID(currentUser.userID, key);

		response.render(`pages/administrator/view-api-key`, {
			configuration: configuration.safeConfiguration,
			apiKey: apiKey,
		});
	}
);

module.exports = router;
