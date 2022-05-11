const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
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
    }
});

const UserModel = mongoose.model("UserModel", UserSchema, "users");

module.exports = {UserModel: UserModel};
