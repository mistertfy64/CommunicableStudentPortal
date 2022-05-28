const mongoose = require("mongoose");
const _ = require("lodash");


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
	sessionTokensWithExpiryTime: [String],
	sessionTokens: [String],
});

UserSchema.statics.safeFindUserByUsername = function (username) {
	return this.findOne({ username: username }).select({sessionTokens: 0, sessionTokensWithExpiryTime: 0, password: 0});
};

UserSchema.statics.destroyAllSessionTokensForUserID = function (userID) {
	this.findOneAndUpdate(
		{ userID: userID },
		{ $set: { sessionTokens: [] }} ,((error, result) => {
		// error?
		if (error) {
			console.error("Unable to destroy session tokens");
			console.error(error.stack);
		}
	}));
};

UserSchema.statics.addSessionTokenForUserID = function (userID, token) {
	this.findOneAndUpdate(
		{ userID: userID },
		{ $push: { sessionTokens: token }},((error, result) => {
		// error?
		if (error) {
			console.error("Unable to generate a session id");
			console.error(`Error stack: ${error}`);
		}
	}));
};

module.exports = mongoose.model("User", UserSchema, "users");
