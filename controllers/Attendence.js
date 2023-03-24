const Attendence = require("../models/Attendence");
const Clockin = require("../models/Clockin");
const Clockout = require("../models/Clockout");

// add clockin
const AddClockin = async (req, res) => {
	// verify jwt
	const users_id = req.users_id;

	const { date, time } = req.body;
	// const clockinTimeLimit = "08:00:00"
	// verify input
	if (
		(date === null || date === undefined || date === "") &&
		(time === null || time === undefined || time === "")
	) {
		return res.status(400).json({ data: "Input salah" });
	}

	try {
		// if (time > clockinTimeLimit){
		//     const status = 'datang terlambat'
		// }

		const clockin = await Clockin.create({
			date: date,
			time: time,
			statuses_id: 1,
			users_id: users_id,
		});

		const attendence = await Attendence.create({
			users_id: users_id,
			clockin_id: clockin.id,
			clockout_id: null,
			statuses_id: null,
		});

		return res.status(200).json({ data: "Berhasil menambah attendence" });
	} catch (error) {
		return res.status(500).json({ data: "Gagal menambah attendence", error });
	}
};

// update clockin

// delete clockin

// --------------------------------

// add clockout
const AddClockout = async (req, res) => {
	// verify jwt
	const users_id = req.users_id;

	const { date, time } = req.body;
	// const clockoutTimeLimit = "08:00:00"
	// verify input
	if (
		(date === null || date === undefined || date === "") &&
		(time === null || time === undefined || time === "")
	) {
		return res.status(400).json({ data: "Input salah" });
	}

	try {
		// if (time > clockinTimeLimit){
		//     const status = 'datang terlambat'
		// }

		const clockout = await Clockout.create({
			date: date,
			time: time,
			statuses_id: 1,
			users_id: users_id,
		});

		const attendence = await Attendence.create({
			users_id: users_id,
			clockin_id: clockout.id,
			clockout_id: null,
			statuses_id: null,
		});

		return res.status(200).json({ data: "Berhasil menambah attendence" });
	} catch (error) {
		return res.status(500).json({ data: "Gagal menambah attendence", error });
	}
};

// update clockout

// delete clockout

module.exports = { AddClockin, AddClockout };
