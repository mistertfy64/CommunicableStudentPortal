const User = require("../models/User.js");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const fs = require("fs");

const log = require("./log.js");

async function createUsers(options) {
	let amount = options.amount;
	let usernameType = options.usernameType;
	let userIDType = options.userIDType;
	let startingUsername = options.startingUsername;
	let startingUserID = options.startingUserID;

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

	if (usersWithWantedUsernames || usersWithWantedUserIDs) {
		return;
	}

	for (let i = 0; i < amount; i++) {
		console.log(log.addMetadata(`Creating user ${i + 1} of ${amount}`, "info"));

		let username = "";
		let userID = "";

		if (usernameType === "ascending") {
			username = (startingUsername + i).toString();
		} else {
			username = crypto.randomBytes(12).toString("base64");
		}

		if (userIDType === "ascending") {
			userID = (startingUserID + i).toString();
		} else {
			userID = crypto.randomBytes(12).toString("base64");
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
