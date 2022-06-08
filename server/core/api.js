var router = require("express").Router();
const configuration = require("../configuration.js");
const url = require("url");
const User = require("../models/User.js");

router.get("/api/users/:userID", async (request, response) => {
	if (!request.headers["x-api-key"]) {
		response.status(400).send("Error 400");
		return;
	}
	let apiKey = request.headers["x-api-key"];
	//FIXME: Consider data validation.

	if (!checkIfAPIKeyIsValid(apiKey)) {
		response.status(400).send("Error 400");
        return;
	}

	let userCalling = await User.safeFindUserByAPIKey(apiKey);

	if (!userCalling) {
		response.status(400).send("Error 400");
		return;
	}

	if (
		!(
			userCalling.membership.isAdministrator ||
			userCalling.membership.isSuperAdministrator
		)
	) {
		response.status(400).send("Error 400");
		return;
	}

	let safe = request.query.safe;

	if (!(safe === "true" || safe === "false")) {
		response.status(400).send("Error 400");
		return;
	}

	if (safe === "true") {
		let data = await User.safeFindUserByUserID(request.params.userID);
		response.status(200).json(data);
		return;
	} else {
		let data = await User.findOne({ userID: userID });
		response.status(200).json(data);
		return;
	}
});

function checkIfAPIKeyIsValid(apiKey) {
	return /[0-9a-f]{48}/g.test(apiKey);
}
module.exports = router;
