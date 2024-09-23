const mongoose = require("mongoose");
const connectDB = async () => {
	try {
		await mongoose.connect("mongodb://127.0.0.1:27017/emwork-reexam");
		console.log("DB connected");
	} catch (error) {
		console.error(error.message);
	}
};

module.exports = connectDB;
