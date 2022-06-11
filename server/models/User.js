const mongoose = require("mongoose");
const _ = require("lodash");
const { SHA3 } = require("sha3");
const log = require("../core/log.js");
const bcrypt = require("bcrypt");


const UserSchema = new mongoose.Schema({
	name: String,
	username: String,
	userID: String,
	password: String,
	personalEmail: String,
	professionalEmail: String,
	membership: {
		isSuperAdministrator: Boolean,
		isAdministrator: Boolean,
		isNormalUser: Boolean,
	},
	statistics: Object,
	sessionTokensWithExpiryTime: [String],
	sessionTokens: [String],
	apiKey: String,
});

UserSchema.statics.safeFindUserByUsername = function (username) {
	return this.findOne({ username: username }).select({
		sessionTokens: 0,
		sessionTokensWithExpiryTime: 0,
		password: 0,
		apiKey: 0,
	});
};

UserSchema.statics.safeFindUserByUserID = function (userID) {
	return this.findOne({ userID: userID }).select({
		sessionTokens: 0,
		sessionTokensWithExpiryTime: 0,
		password: 0,
		apiKey: 0,
	});
};

UserSchema.statics.destroyAllSessionTokensForUserID = function (userID) {
	this.findOneAndUpdate(
		{ userID: userID },
		{ $set: { sessionTokens: [] } },
		(error, result) => {
			// error?
			if (error) {
				console.error("Unable to destroy session tokens");
				console.error(error.stack);
			}
		}
	);
};

UserSchema.statics.addSessionTokenForUserID = function (userID, token) {
	this.findOneAndUpdate(
		{ userID: userID },
		{ $push: { sessionTokens: token } },
		(error, result) => {
			// error?
			if (error) {
				console.error("Unable to generate a session id");
				console.error(`Error stack: ${error}`);
			}
		}
	);
};

UserSchema.statics.safeFindUserBySessionToken = function (token) {
	if (!token) {
		console.error(log.addMetadata(`Token is undefined`, "error"));
		return;
	}

	let hash = new SHA3(512);
	hash.update(token.toString());
	let hashDigest = hash.digest("hex");
	return this.findOne({ sessionTokens: { $all: [hashDigest] } }).select({
		sessionTokens: 0,
		sessionTokensWithExpiryTime: 0,
		password: 0,
		apiKey: 0,
	});
};

UserSchema.statics.findUserBySessionToken = function (token) {
	if (!token) {
		console.error(log.addMetadata(`Token is undefined`, "error"));
		return;
	}

	let hash = new SHA3(512);
	hash.update(token.toString());
	let hashDigest = hash.digest("hex");
	return this.findOne({ sessionTokens: { $all: [hashDigest] } });
};

UserSchema.statics.createAPIKeyForUserID = function (userID, key) {
	let hash = new SHA3(512);
	hash.update(key.toString());
	let hashDigest = hash.digest("hex");
	return this.findOneAndUpdate(
		{ userID: userID },
		{ $set: { apiKey: hashDigest } },
		(error, result) => {
			// error?
			if (error) {
				console.log(log.addMetadata(error.stack,"error"));
			}
		}
	);
};

UserSchema.statics.safeFindUserByAPIKey = function (apiKey) {
	if (!apiKey) {
		console.error(log.addMetadata(`API key is undefined.`, "error"));
		return;
	}

	let hash = new SHA3(512);
	hash.update(apiKey.toString());
	let hashDigest = hash.digest("hex");
	return this.findOne({ apiKey: hashDigest }).select({
		sessionTokens: 0,
		sessionTokensWithExpiryTime: 0,
		password: 0,
		apiKey: 0,
	});
};

UserSchema.statics.findUserByAPIKey = function (apiKey) {
	if (!apiKey) {
		console.error(log.addMetadata(`API key is undefined.`, "error"));
		return;
	}

	let hash = new SHA3(512);
	hash.update(apiKey.toString());
	let hashDigest = hash.digest("hex");
	return this.findOne({ apiKey: hashDigest });
};

// ===========================================

UserSchema.statics.changeUsernameForUserID = function (userID, newUsername) {
	// FIXME: This does not check for a user with already existing username.
	// Therefore, when calling this, make sure to have some duplicate username checking.
	this.findOneAndUpdate(
		{ userID: userID },
		{ $set: { username: newUsername } },
		(error, result) => {
			// error?
			if (error) {
				console.error("Unable to change username");
				console.error(`Error stack: ${error}`);
			}
		}
	);
};

UserSchema.statics.changeNameForUserID = function (userID, newName) {
	this.findOneAndUpdate(
		{ userID: userID },
		{ $set: { name: newName } },
		(error, result) => {
			// error?
			if (error) {
				console.error("Unable to change name");
				console.error(`Error stack: ${error}`);
			}
		}
	);
};

UserSchema.statics.changeUserIDForUserID = function (userID, newUserID) {
	// FIXME: This does not check for a user with already existing username.
	// Therefore, when calling this, make sure to have some duplicate username checking.
	this.findOneAndUpdate(
		{ userID: userID },
		{ $set: { userID: newUserID } },
		(error, result) => {
			// error?
			if (error) {
				console.error("Unable to change user ID");
				console.error(`Error stack: ${error}`);
			}
		}
	);
};

// =======================================================

UserSchema.statics.changeStatValueForUserID = async function (userID, key, value) {
	let user = await this.findOne({userID: userID});
	user.statistics[key] = value;
	await user.markModified(`statistics`);
	await user.save();
};

UserSchema.statics.addStatWithValueForUserID = async function (userID, key, value) {
	let user = await this.findOne({userID: userID});
	user.statistics[key] = value;
	await user.markModified(`statistics`);
	await user.save();
};

UserSchema.statics.deleteStatForUserID = async function (userID, key, value) {
	if (!key || key == "") { return; }
	// FIXME: DANGEROUS
	let user = await this.findOne({userID: userID});
	delete user.statistics[key];
	await user.markModified(`statistics`);
	await user.save();
};

// =============================================================================
UserSchema.statics.changePasswordForUserID = async function (userID, newPlaintextPassword) {
	// FIXME: DANGEROUS, does not validate password.
	let hashedPassword = await bcrypt.hash(newPlaintextPassword, 12);
	await this.findOneAndUpdate({userID: userID}, {$set: {password: hashedPassword}});
};
// =============================================================================

UserSchema.statics.getStatValueForLeaderboards = async function (stat) {
	// await this.findOneAndUpdate({userID: userID}, {$set: {password: hashedPassword}});
	let data = await this.find({[`statistics.${stat}`]: {$ne: null}}).select({
		sessionTokens: 0,
		sessionTokensWithExpiryTime: 0,
		password: 0,
		apiKey: 0,
	});
	return data;
};
module.exports = mongoose.model("User", UserSchema, "users");
