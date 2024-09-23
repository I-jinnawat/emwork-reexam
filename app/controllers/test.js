const Test = require("../models/testModel");
exports.list = async (req, res) => {
	try {
		res.render("test", {
			physicalTestStatus: "รอพิจารณา",
			theoryTestStatus: "รอพิจารณา",
			overallTestStatus: "รอพิจารณา",
		});
	} catch (error) {
		console.error(error.message);
		res.status(500).json({ error: error.message });
	}
};

exports.create = async (req, res) => {
	const {
		firstName,
		lastName,
		colorBlindness,
		farSighted,
		astigmatism,
		responseTime,
		roadSigns,
		roadLines,
		rightOfWay,
		practiceTest,
	} = req.body;

	let physicalTestPassed =
		[colorBlindness, farSighted, astigmatism, responseTime].filter(Boolean)
			.length >= 3;
	let theoryScore =
		parseInt(roadSigns) + parseInt(roadLines) + parseInt(rightOfWay);
	let theoryTestPassed = theoryScore / 150 >= 0.8;

	let status;
	if (physicalTestPassed && theoryTestPassed && practiceTest === "pass") {
		status = "ผ่านการทดสอบ";
	} else {
		status = "ไม่ผ่านการทดสอบ";
	}

	const newTest = await Test.create({
		firstName,
		lastName,
		testDate: new Date(),
		physicalTest: {
			passedColorBlindness: !!colorBlindness,
			passedFarSighted: !!farSighted,
			passedAstigmatism: !!astigmatism,
			passedResponseTime: !!responseTime,
		},
		theoryTest: {
			roadSigns: parseInt(roadSigns),
			roadLines: parseInt(roadLines),
			rightOfWay: parseInt(rightOfWay),
		},
		practiceTest: {
			passed: practiceTest === "pass",
		},
		status,
	});

	res.redirect("/report");
};

exports.update = async (req, res) => {
	try {
		const testId = req.params.id;
		const {
			firstName,
			lastName,
			colorBlindness,
			farSighted,
			astigmatism,
			responseTime,
			roadSigns,
			roadLines,
			rightOfWay,
			practiceTest,
			testDate,
		} = req.body;

		let physicalTestPassed =
			[colorBlindness, farSighted, astigmatism, responseTime].filter(Boolean)
				.length >= 3;
		let theoryScore =
			parseInt(roadSigns) + parseInt(roadLines) + parseInt(rightOfWay);
		let theoryTestPassed = theoryScore / 150 >= 0.8;

		let status;
		if (physicalTestPassed && theoryTestPassed && practiceTest === "pass") {
			status = "ผ่านการทดสอบ";
		} else {
			status = "ไม่ผ่านการทดสอบ";
		}

		const newTest = await Test.findByIdAndUpdate(testId, {
			firstName,
			lastName,
			testDate,
			physicalTest: {
				passedColorBlindness: !!colorBlindness,
				passedFarSighted: !!farSighted,
				passedAstigmatism: !!astigmatism,
				passedResponseTime: !!responseTime,
			},
			theoryTest: {
				roadSigns: parseInt(roadSigns),
				roadLines: parseInt(roadLines),
				rightOfWay: parseInt(rightOfWay),
			},
			practiceTest: {
				passed: practiceTest === "pass",
			},
			status,
		});

		res.redirect("/report");
	} catch (error) {
		console.error(error);
		res.status(400).json({ error: error.message });
	}
};

exports.remove = async (req, res) => {
	try {
		const { id } = req.params;
		const deletedTransaction = await Test.findByIdAndDelete(id);

		if (!deletedTransaction) {
			return res.status(404).json({ message: "Test not found" });
		}
		res.redirect("/report");
	} catch (error) {
		console.error(error);
		res.status(404).json({ error: error.message });
	}
};
