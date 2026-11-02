const db = require("../db")

const publicReadTrek = async (req, res) => {
    try {
        const q = `SELECT * FROM trek`;
        const { rows } = await db.query(q)
        return res.status(200).json({ message: "trek read success", result: rows })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "unable to fetch treks"
        })
    }
}

module.exports = { publicReadTrek }