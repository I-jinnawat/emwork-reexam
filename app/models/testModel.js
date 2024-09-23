const mongoose = require("mongoose");
const testSchema = new mongoose.Schema(
	{
		firstName: String,
		lastName: String,
		testDate: Date,
		physicalTest: {
			passedColorBlindness: Boolean,
			passedFarSighted: Boolean,
			passedAstigmatism: Boolean,
			passedResponseTime: Boolean,
		},
		theoryTest: {
			roadSigns: Number,
			roadLines: Number,
			rightOfWay: Number,
		},
		practiceTest: {
			passed: Boolean,
		},
		status: String,
	},
	{
		timestamps: true,
	}
);

const Test = mongoose.model("Test", testSchema);

module.exports = Test;
