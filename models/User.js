const mongoose = require("mongoose");

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
    }
});

module.exports = mongoose.model("User", UserSchema, "users");
