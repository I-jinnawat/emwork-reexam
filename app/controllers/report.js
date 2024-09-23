const Test = require("../models/testModel");

exports.list = async (req, res) => {
	try {
		const { page = 1, name = "" } = req.query;
		let { date } = req.query;

		if (!date) {
			const currentDate = new Date();
			date = currentDate.toISOString().split("T")[0];
		}

		const startDate = new Date(date);
		const endDate = new Date(date);
		endDate.setDate(startDate.getDate() + 1);

		const query = {
			createdAt: {
				$gte: startDate,
				$lt: endDate,
			},
		};

		if (name) {
			query.$or = [
				{ firstName: { $regex: name, $options: "i" } },
				{ lastName: { $regex: name, $options: "i" } },
			];
		}

		const tests = await Test.find(query).exec();

		const passedCount = await Test.countDocuments({
			...query,
			status: "ผ่านการทดสอบ",
		});
		const failedCount = await Test.countDocuments({
			...query,
			status: "ไม่ผ่านการทดสอบ",
		});

		res.render("report", {
			tests,
			passedCount,
			failedCount,
			name,
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ error: error.message });
	}
};
