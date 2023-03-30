const { QueryTypes } = require("sequelize");
const Conn = require("../configs/DB");

var currentDate = new Date();
var day = currentDate.getDate();
var month = currentDate.getMonth() + 1; // Add 1 to get the month in the range 1-12
var year = currentDate.getFullYear();

var date = `${year}-${month}-${day}`;

// first load
const Report = async (req, res) => {
	const users_id = req.users_id;
	const { page, limit } = req.query;

	const limits = limit ? parseInt(limit) : 10;
	const offsets = page ? (page - 1 < 0 ? 0 : (page - 1) * limits) : 0;
	try {
		const getTotalData = await Conn.query(
			"SELECT COUNT(u.id) as totaluser " +
				"FROM users u " +
				"LEFT JOIN clockin ci ON ci.users_id = u.id AND ci.date = '" +
				date +
				"' LEFT JOIN clockout co ON co.users_id = u.id AND co.date = '" +
				date +
				"' WHERE (ci.date = co.date OR ci.date IS null OR co.date IS null) AND (u.deletedAt IS null AND ci.deletedAt IS null AND co.deletedAt IS null)",
			{
				type: QueryTypes.SELECT,
			}
		);

		const totalPages = Math.ceil(getTotalData[0].totaluser / limits);
		const currentPage = Math.ceil(offsets / limits) + 1;
		// get data pagination

		const getData = await Conn.query(
			"SELECT u.id, u.name, ci.date as date, ci.time as clockin, s.name as clockin_status, co.time as clockout, so.name as clockout_status" +
				" FROM users u" +
				" LEFT JOIN clockin ci ON ci.users_id = u.id AND ci.date = '" +
				date +
				"'" +
				" LEFT JOIN clockout co ON co.users_id = u.id AND co.date = '" +
				date +
				"'" +
				" LEFT JOIN statuses s ON ci.statuses_id = s.id" +
				" LEFT JOIN statuses so ON co.statuses_id = so.id" +
				" WHERE (ci.date = co.date OR ci.date IS null OR co.date IS null) AND (u.deletedAt IS null AND ci.deletedAt IS null AND co.deletedAt IS null)" +
				" LIMIT " +
				limits +
				" OFFSET " +
				offsets,
			{
				type: QueryTypes.SELECT,
			}
		);

		const valData = await checkDuplication(getData);
		return res
			.status(200)
			.json({ data: { users: valData, total_pages: totalPages, current_page: currentPage } });
	} catch (error) {
		return res.status(500).json({ data: "Tidak dapat mengambil data", error });
	}
};

const ReportFilter = async (req, res) => {
	let { dateAwal, dateAkhir, name, classroom } = req.body;
	const users_id = req.users_id;

	const { page, limit } = req.query;

	const limits = limit ? parseInt(limit) : 10;
	const offsets = page ? (page - 1 < 0 ? 0 : (page - 1) * limits) : 0;
	// const totalPages = Math.ceil(getTotalData[0].totaluser / limits);
	const currentPage = Math.ceil(offsets / limits) + 1;

	const fixQuery =
		"SELECT u.id, u.name, ci.date as date, ci.time as clockin, s.name as clockin_status, co.time as clockout, so.name as clockout_status FROM users u ";
	var condQuery;

	if (dateAwal === null || dateAwal === undefined || dateAwal === "") {
		dateAwal = undefined;
	} else if (dateAkhir === null || dateAkhir === undefined || dateAkhir === "") {
		dateAkhir = dateAwal;
	} else if (
		(dateAwal === null || dateAwal === undefined || dateAwal === "") &&
		(dateAkhir === null || dateAkhir === undefined || dateAkhir === "")
	) {
		dateAwal = undefined;
		dateAkhir = undefined;
	}

	try {
		console.log("asdada");
		if (
			dateAwal !== undefined &&
			dateAwal === dateAkhir &&
			name === undefined &&
			classroom === undefined
		) {
			console.log(1);
			// pake dateawal aja
			condQuery =
				" LEFT JOIN clockin ci ON ci.users_id = u.id AND ci.date = '" +
				dateAwal +
				"' LEFT JOIN clockout co ON co.users_id = u.id AND co.date = '" +
				dateAwal +
				"' LEFT JOIN statuses s ON ci.statuses_id = s.id" +
				" LEFT JOIN statuses so ON co.statuses_id = so.id" +
				" WHERE (ci.date = co.date OR ci.date IS null OR co.date IS null) AND (u.deletedAt IS null AND ci.deletedAt IS null AND co.deletedAt IS null)";

			// const getData = await Conn.query(fixQuery + condQuery, { type: QueryTypes.SELECT });
			// console.log(getData);
			// return
			// return res.status(200).json({ data: getData });
		} else if (
			dateAwal !== undefined &&
			dateAwal !== dateAkhir &&
			name === undefined &&
			classroom === undefined
		) {
			console.log(2);
			condQuery =
				" LEFT JOIN clockin ci ON ci.users_id = u.id AND ci.date BETWEEN '" +
				dateAwal +
				"' AND '" +
				dateAkhir +
				"' LEFT JOIN clockout co ON co.users_id = u.id AND co.date BETWEEN '" +
				dateAwal +
				"' AND '" +
				dateAkhir +
				"' LEFT JOIN statuses s ON ci.statuses_id = s.id" +
				" LEFT JOIN statuses so ON co.statuses_id = so.id" +
				" WHERE (ci.date = co.date OR ci.date IS null OR co.date IS null) AND (u.deletedAt IS null AND ci.deletedAt IS null AND co.deletedAt IS null)";

			// const getData = await Conn.query(fixQuery + condQuery, { type: QueryTypes.SELECT });
			// console.log(getData);
			// return res.status(200).json({ data: getData });
		} else if (
			dateAwal !== undefined &&
			dateAwal === dateAkhir &&
			name === undefined &&
			classroom !== undefined
		) {
			console.log(3);
			condQuery =
				" LEFT JOIN clockin ci ON ci.users_id = u.id AND ci.date = '" +
				dateAwal +
				"' LEFT JOIN clockout co ON co.users_id = u.id AND co.date = '" +
				dateAwal +
				"' LEFT JOIN statuses s ON ci.statuses_id = s.id" +
				" LEFT JOIN statuses so ON co.statuses_id = so.id" +
				" WHERE (ci.date = co.date OR ci.date IS null OR co.date IS null) AND (u.deletedAt IS null AND ci.deletedAt IS null AND co.deletedAt IS null) " +
				"AND u.classroom = '" +
				classroom +
				"'";

			// const getData = await Conn.query(fixQuery + condQuery, { type: QueryTypes.SELECT });
			// console.log(getData);
			// return res.status(200).json({ data: getData });
		} else if (
			dateAwal !== undefined &&
			dateAwal !== dateAkhir &&
			name === undefined &&
			classroom !== undefined
		) {
			console.log(4);
			condQuery =
				" LEFT JOIN clockin ci ON ci.users_id = u.id AND ci.date BETWEEN '" +
				dateAwal +
				"' AND '" +
				dateAkhir +
				"' LEFT JOIN clockout co ON co.users_id = u.id AND co.date BETWEEN '" +
				dateAwal +
				"' AND '" +
				dateAkhir +
				"' LEFT JOIN statuses s ON ci.statuses_id = s.id" +
				" LEFT JOIN statuses so ON co.statuses_id = so.id" +
				" WHERE (ci.date = co.date OR ci.date IS null OR co.date IS null) AND (u.deletedAt IS null AND ci.deletedAt IS null AND co.deletedAt IS null) " +
				"AND u.classroom = '" +
				classroom +
				"'";

			// const getData = await Conn.query(fixQuery + condQuery, { type: QueryTypes.SELECT });
			// console.log(getData);
			// return res.status(200).json({ data: getData });
		} else if (
			dateAwal !== undefined &&
			dateAwal !== dateAkhir &&
			name !== undefined &&
			classroom !== undefined
		) {
			console.log(5);
			condQuery =
				" LEFT JOIN clockin ci ON ci.users_id = u.id AND ci.date BETWEEN '" +
				dateAwal +
				"' AND '" +
				dateAkhir +
				"' LEFT JOIN clockout co ON co.users_id = u.id AND co.date BETWEEN '" +
				dateAwal +
				"' AND '" +
				dateAkhir +
				"' LEFT JOIN statuses s ON ci.statuses_id = s.id" +
				" LEFT JOIN statuses so ON co.statuses_id = so.id" +
				" WHERE (ci.date = co.date OR ci.date IS null OR co.date IS null) AND (u.deletedAt IS null AND ci.deletedAt IS null AND co.deletedAt IS null)" +
				" AND u.classroom = '" +
				classroom +
				"' AND u.name = '" +
				name +
				"'";

			// const getData = await Conn.query(fixQuery + condQuery, { type: QueryTypes.SELECT });
			// console.log(getData);
			// return res.status(200).json({ data: getData });
		} else if (
			dateAwal === undefined &&
			dateAwal === dateAkhir &&
			name !== undefined &&
			classroom === undefined
		) {
			console.log(6);
			dateAwal = date;
			dateAkhir = date;
			// pake dateawal aja
			condQuery =
				" LEFT JOIN clockin ci ON ci.users_id = u.id AND ci.date = '" +
				dateAwal +
				"' LEFT JOIN clockout co ON co.users_id = u.id AND co.date = '" +
				dateAwal +
				"' LEFT JOIN statuses s ON ci.statuses_id = s.id" +
				" LEFT JOIN statuses so ON co.statuses_id = so.id" +
				" WHERE (ci.date = co.date OR ci.date IS null OR co.date IS null) AND (u.deletedAt IS null AND ci.deletedAt IS null AND co.deletedAt IS null) " +
				"AND u.name = '" +
				name +
				"'";

			// const getData = await Conn.query(fixQuery + condQuery, { type: QueryTypes.SELECT });
			// console.log(getData);
			// // return
			// return res.status(200).json({ data: getData });
		} else if (
			dateAwal !== undefined &&
			dateAwal !== dateAkhir &&
			name !== undefined &&
			classroom === undefined
		) {
			console.log(7);
			condQuery =
				" LEFT JOIN clockin ci ON ci.users_id = u.id AND ci.date BETWEEN '" +
				dateAwal +
				"' AND '" +
				dateAkhir +
				"' LEFT JOIN clockout co ON co.users_id = u.id AND co.date BETWEEN '" +
				dateAwal +
				"' AND '" +
				dateAkhir +
				"' LEFT JOIN statuses s ON ci.statuses_id = s.id" +
				" LEFT JOIN statuses so ON co.statuses_id = so.id" +
				" WHERE (ci.date = co.date OR ci.date IS null OR co.date IS null) AND (u.deletedAt IS null AND ci.deletedAt IS null AND co.deletedAt IS null)" +
				" AND u.name = '" +
				name +
				"'";

			// const getData = await Conn.query(fixQuery + condQuery, { type: QueryTypes.SELECT });
			// console.log(getData);
			// return res.status(200).json({ data: getData });
		} else if (dateAwal === undefined && name === undefined && classroom !== undefined) {
			console.log(8);
			dateAwal = date;
			dateAkhir = date;
			condQuery =
				" LEFT JOIN clockin ci ON ci.users_id = u.id AND ci.date BETWEEN '" +
				dateAwal +
				"' AND '" +
				dateAkhir +
				"' LEFT JOIN clockout co ON co.users_id = u.id AND co.date BETWEEN '" +
				dateAwal +
				"' AND '" +
				dateAkhir +
				"' LEFT JOIN statuses s ON ci.statuses_id = s.id" +
				" LEFT JOIN statuses so ON co.statuses_id = so.id" +
				" WHERE (ci.date = co.date OR ci.date IS null OR co.date IS null) AND (u.deletedAt IS null AND ci.deletedAt IS null AND co.deletedAt IS null) " +
				"AND u.classroom = '" +
				classroom +
				"'";

			// const getData = await Conn.query(fixQuery + condQuery, { type: QueryTypes.SELECT });
			// console.log(getData);
			// return res.status(200).json({ data: getData });
		} else if (dateAwal !== undefined && name !== undefined && classroom === undefined) {
			console.log(9);

			// pake dateawal aja
			condQuery =
				" LEFT JOIN clockin ci ON ci.users_id = u.id AND ci.date = '" +
				dateAwal +
				"' LEFT JOIN clockout co ON co.users_id = u.id AND co.date = '" +
				dateAwal +
				"' LEFT JOIN statuses s ON ci.statuses_id = s.id" +
				" LEFT JOIN statuses so ON co.statuses_id = so.id" +
				" WHERE (ci.date = co.date OR ci.date IS null OR co.date IS null) AND (u.deletedAt IS null AND ci.deletedAt IS null AND co.deletedAt IS null) " +
				"AND u.name = '" +
				name +
				"'";

			// const getData = await Conn.query(fixQuery + condQuery, { type: QueryTypes.SELECT });
			// console.log(getData);
			// // return
			// return res.status(200).json({ data: getData });
		} else {
			condQuery =
				" LEFT JOIN clockin ci ON ci.users_id = u.id AND ci.date = '" +
				date +
				"'" +
				" LEFT JOIN clockout co ON co.users_id = u.id AND co.date = '" +
				date +
				"'" +
				" LEFT JOIN statuses s ON ci.statuses_id = s.id" +
				" LEFT JOIN statuses so ON co.statuses_id = so.id" +
				" WHERE (ci.date = co.date OR ci.date IS null OR co.date IS null) AND (u.deletedAt IS null AND ci.deletedAt IS null AND co.deletedAt IS null)";
		}
		const pagination = ` LIMIT ${limits} OFFSET ${offsets}`;
		const query = fixQuery + condQuery + pagination;
		// console.log(query);
		const getData = await Conn.query(query, { type: QueryTypes.SELECT });
		const valData = await checkDuplication(getData);
		// console.log(valData);
		return res.status(200).json({ data: valData, current_page: currentPage });
	} catch (error) {
		return res.status(500).json({ data: "Tidak dapat mengambil data", error });
	}
};

const checkDuplication = async (queryResult) => {
	console.log(queryResult);
	console.log("--------------------------------------------");
	const dataArray = [];
	const uniqueData = {};
	queryResult.forEach((data) => {
		if (uniqueData[data.id] == null || data.clockin < uniqueData[data.id].clockin) {
			uniqueData[data.id] = data;
		} else if (uniqueData[data.id] == null || data.clockout > uniqueData[data.id].clockout) {
			uniqueData[data.id] = data;
		} else {
			dataArray.push(data);
		}
	});
	// console.log(Object.values(uniqueData));
	return Object.values(uniqueData);
};

module.exports = { Report, ReportFilter };
