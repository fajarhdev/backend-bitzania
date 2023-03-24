const { QueryTypes } = require("../configs/DB");
const Conn = require("../configs/DB");

// make query for reporting
const report = (req, res) => {
	const { dateAwal, dateAkhir } = req.body;

	try {
		const [getData, _] = Conn.query("", { type: QueryTypes.SELECT });

		return res.status(200).json({ data: getData });
	} catch (error) {
		return res.status(500).json({ data: "Tidak dapat mengambil data", error });
	}
};
