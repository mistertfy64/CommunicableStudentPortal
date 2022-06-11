const User = require("../models/User.js");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const fs = require("fs");

const log = require("./log.js");

async function createUsers(options) {

	console.log(options);
	
	let amount = options.amount;
	let usernameType = options.usernameType;
	let userIDType = options.userIDType;
	let startingUsername = options.startingUsername;
	let startingUserID = options.startingUserID;

	console.log(options.startingUsername);

	let createdUsers = {};
	let usersWithWantedUserIDs;
	let usersWithWantedUsernames;

	if (usernameType === "ascending") {
		usersWithWantedUsernames = await User.find({
			username: {
				$gte: startingUsername,
				$lte: startingUsername + amount,
			},
		});
	}
	if (userIDType === "ascending") {
		usersWithWantedUserIDs = await User.find({
			userID: { $gte: startingUsername, $lte: startingUsername + amount },
		});
	}

	if (usersWithWantedUsernames?.length > 0 || usersWithWantedUserIDs?.length > 0) {
		return;
	}

	for (let i = 0; i < amount; i++) {
		console.log(
			log.addMetadata(`Creating user ${i + 1} of ${amount}`, "info")
		);

		let username = "";
		let userID = "";

		if (usernameType === "ascending") {
			username = (parseInt(startingUsername) + i).toString();
			console.log(username);
		} else {
			username = crypto.randomBytes(12).toString("base64");
			let userWithUsername = await User.safeFindUserByUsername(username);
			while (userWithUsername || username.indexOf("+") > -1 || username.indexOf("/") > -1 || username.indexOf("=") > -1) {
				username = crypto.randomBytes(12).toString("base64");
			}
		}

		if (userIDType === "ascending") {
			userID = (parseInt(startingUserID) + i).toString();
			console.log(userID);
		} else {
			userID = crypto.randomBytes(12).toString("base64");
			let userWithUserID = await User.safeFindUserByUserID(userID);
			while (userWithUserID || userID.indexOf("+") > -1 || userID.indexOf("/") > -1 || userID.indexOf("=") > -1) {
				userID = crypto.randomBytes(12).toString("base64");
			}
		}

		let password = crypto.randomBytes(16).toString("base64");

		createdUsers[`${userID.toString()}`] = {
			username: username,
			userID: userID,
			password: password,
		};

		let hashedPassword = await bcrypt.hashSync(password, 12);

		let dataToSave = new User({
			name: "",
			username: username,
			userID: userID,
			password: hashedPassword,
			personalEmail: "",
			professionalEmail: "",
			membership: {
				isSuperAdministrator: false,
				isAdministrator: false,
				isNormalUser: true,
			},
		});

		try {
			await dataToSave.save();
		} catch (error) {
			console.error(error.stack);
		}
	}

	fs.writeFile(
		`users-${Date.now().toString()}.json`,
		JSON.stringify(createdUsers, null, 4),
		(error, result) => {
			if (error) {
				console.error(error);
			}
		}
	);
	console.log(log.addMetadata("User creation process complete.", "info"));
}

module.exports = { createUsers };
