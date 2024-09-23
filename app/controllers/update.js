const Test = require("../models/testModel");
exports.list = async (req, res) => {
	try {
		const testId = req.params.id;
		const test = await Test.findById(testId); // Find the test by ID
		if (!test) {
			return res.status(404).send("Test not found");
		}
		res.render("update", { test });
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ error: error.message });
	}
};
