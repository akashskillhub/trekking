const db = require("../db");

const fetchAllUsers = async (req, res) => {
    try {
        const q = 'SELECT * FROM users;'
        const { rows } = await db.query(q)
        return res.status(200).json({
            message: "fetch success",
            result: rows
        });
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "unable to fetch users"
        });
    }
};

module.exports = { fetchAllUsers };