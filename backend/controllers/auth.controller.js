const db = require("../db")
const bcrypt = require('bcryptjs')
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        // node validation

        const hash = await bcrypt.hash(password, 10)

        const q = "INSERT INTO users (name,email,password) VALUES ($1,$2,$3)"
        const value = [name, email, hash]
        await db.query(q, value)

        res.json({ message: "register success" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "something went wrong" })
    }
}

module.exports = { registerUser }
