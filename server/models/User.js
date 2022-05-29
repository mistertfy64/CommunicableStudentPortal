const mongoose = require("mongoose");
const _ = require("lodash");
const { SHA3 }= require("sha3");

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

UserSchema.statics.safeFindUserByUserID = function (userID) {
	return this.findOne({ userID: userID }).select({sessionTokens: 0, sessionTokensWithExpiryTime: 0, password: 0});
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

UserSchema.statics.safeFindUserBySessionToken = function(token){
	let hash = new SHA3(512);
	hash.update(token.toString())
	let hashDigest = hash.digest("hex");
	return this.findOne({sessionTokens: {$all:[hashDigest]}}).select({sessionTokens: 0, sessionTokensWithExpiryTime: 0, password: 0});
}


UserSchema.statics.findUserBySessionToken = function(token){
	let hash = new SHA3(512);
	hash.update(token.toString())
	let hashDigest = hash.digest("hex");
	return this.findOne({sessionTokens:{$all:[hashDigest]}});
}

module.exports = mongoose.model("User", UserSchema, "users");
