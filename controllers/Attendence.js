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

		// const attendence = await Attendence.create({
		// 	users_id: users_id,
		// 	clockin_id: clockin.id,
		// 	clockout_id: null,
		// 	statuses_id: null,
		// });

		return res.status(200).json({ data: "Berhasil menambah clock in anda" });
	} catch (error) {
		return res.status(500).json({ data: "Gagal menambah clock in anda", error });
	}
};

// update clockin
const UpdateClockin = async (req, res) => {
	const users_id = req.users_id;
	const { date, time } = req.body;
	const { clockin_id } = req.query;

	try {
		console.log("asass" + clockin_id);
		const find = await Clockin.findOne({
			where: {
				id: clockin_id,
			},
		});
		console.log(find);
		const update = await Clockin.update(
			{ date: date, time: time },
			{
				where: {
					id: find.id,
				},
			}
		);

		return res.status(200).json({ data: "Berhasil update clock in anda" });
	} catch (error) {
		return res.status(500).json({ data: "Gagal update clock in anda", error });
	}
};

// delete clockin
const DeleteClockin = async (req, res) => {
	const users_id = req.users_id;

	const { clockin_id } = req.query;

	try {
		const deleteClockin = await Clockin.destroy({
			where: {
				id: clockin_id,
			},
		});

		res.status(200).json({ data: "Berhasil menghapus clock in anda" });
	} catch (error) {
		res.status(500).json({ data: "Gagal menghapus clock in anda" });
	}
};

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

		// const attendence = await Attendence.create({
		// 	users_id: users_id,
		// 	clockin_id: clockout.id,
		// 	clockout_id: null,
		// 	statuses_id: null,
		// });

		return res.status(200).json({ data: "Berhasil menambah clock out anda" });
	} catch (error) {
		return res.status(500).json({ data: "Gagal menambah clock out anda", error });
	}
};

// update clockout
const UpdateClockout = async (req, res) => {
	const users_id = req.users_id;
	const { date, time } = req.body;
	const { clockout_id } = req.query;

	try {
		const find = await Clockout.findOne({
			where: {
				id: clockout_id,
			},
		});
		const update = await Clockout.update(
			{ date: date, time: time },
			{
				where: {
					id: find.id,
				},
			}
		);

		return res.status(200).json({ data: "Berhasil update clock out anda" });
	} catch (error) {
		return res.status(500).json({ data: "Gagal update clock out anda", error });
	}
};
// delete clockout
const DeleteClockout = async (req, res) => {
	const users_id = req.users_id;

	const { clockout_id } = req.query;

	try {
		const deleteClockout = await Clockout.destroy({
			where: {
				id: clockout_id,
			},
		});

		res.status(200).json({ data: "Berhasil menghapus clock out anda" });
	} catch (error) {
		res.status(500).json({ data: "Gagal menghapus clock out anda" });
	}
};

module.exports = {
	AddClockin,
	UpdateClockin,
	DeleteClockin,
	AddClockout,
	UpdateClockout,
	DeleteClockout,
};
