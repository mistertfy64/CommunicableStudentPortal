var router = require("express").Router();
const configuration = require("../configuration.js");
const url = require("url");
const User = require("../models/User.js");
const bodyParser = require("body-parser");

let urlencodedParser = bodyParser.urlencoded({ extended: true });

router.get("/api/users/:userID", urlencodedParser, async (request, response) => {
	if (!request.headers["x-api-key"]) {
		response.status(400).json({"responseCode":400,"message":"Bad Request"});
		return;
	}
	let apiKey = request.headers["x-api-key"];
	//FIXME: Consider data validation.

	if (!checkIfAPIKeyIsValid(apiKey)) {
		response.status(400).json({"responseCode":400,"message":"Bad Request"});
		return;
	}

	if (!checkIfUserIsAdministrator(apiKey)) {
		response.status(400).json({"responseCode":400,"message":"Bad Request"});
		return;
	}

	let safetyLevel = request.body.safetyLevel;

	if (!(safetyLevel == 1 || safetyLevel === 0 || safetyLevel === "0")) {
		response.status(400).json({"responseCode":400,"message":"Bad Request"});
		return;
	}

	if (safetyLevel == 1) {
		let data = await User.safeFindUserByUserID(request.params.userID);
		response.status(200).json(data);
		return;
	} else {
		let data = await User.findOne({ userID: userID });
		response.status(200).json(data);
		return;
	}
});

router.put("/api/users/:userID/statistics/:key", urlencodedParser, async (request, response) => {
	if (!request.headers["x-api-key"]) {
		response.status(400).json({"responseCode":400,"message":"Bad Request"});
		return;
	}
	let apiKey = request.headers["x-api-key"];
	//FIXME: Consider data validation.

	if (!checkIfAPIKeyIsValid(apiKey)) {
		response.status(400).json({"responseCode":400,"message":"Bad Request"});
		return;
	}

	if (!checkIfUserIsAdministrator(apiKey)) {
		response.status(400).json({"responseCode":400,"message":"Bad Request"});
		return;
	}


	let newValue = request.body.value;
	let data = await User.safeFindUserByUserID(request.params.userID);
	let key = request.params.key;

	if (!data){
		response.status(404).json({"responseCode":404,"message":"Not Found"});
	}
	
	if (data.statistics[key]){
		User.changeStatValueForUserID(data.userID, key, newValue);
		response.status(200).json({"success": true});
	} else {
		User.changeStatValueForUserID(data.userID, key, newValue);
		response.status(201).json({"success": true});
	}





});




async function checkIfUserExists(apiKey) {
	userCalling = await User.safeFindUserByAPIKey(apiKey);
	if (!userCalling) {
		return;
	}
	return userCalling;
}

async function checkIfUserIsAdministrator(apiKey) {
	let userCalling = await checkIfUserExists(apiKey);
	if (!userCalling) {
		return false;
	}

	if (
		!(
			userCalling.membership.isAdministrator ||
			userCalling.membership.isSuperAdministrator
		)
	) {
		return false;
	}
	return true;
}

function checkIfAPIKeyIsValid(apiKey) {
	return /[0-9a-f]{48}/g.test(apiKey);
}
module.exports = router;
