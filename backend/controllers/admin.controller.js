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

const blockAccount = async (req, res) => {
    try {
        const { id } = req.params
        const q = 'UPDATE users SET isActive = false WHERE id = $1;'
        const values = [id]
        await db.query(q, values)
        return res.status(200).json({ message: "account block success" })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "unable to block users"
        });
    }
};

const unblockAccount = async (req, res) => {
    try {
        const { id } = req.params
        const q = 'UPDATE users SET isActive = true WHERE id = $1;'
        const values = [id]
        await db.query(q, values)
        return res.status(200).json({ message: "account unblock success" })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: "unable to unblock users"
        });
    }
};

module.exports = { fetchAllUsers, blockAccount, unblockAccount };