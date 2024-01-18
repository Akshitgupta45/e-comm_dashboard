const mongoose = require("mongoose");
// creating Schema and model
const userSchema = new mongoose.Schema({
	name: String,
	email: String,
	password: String,
});

const User = mongoose.model("users", userSchema);
module.exports = User;
