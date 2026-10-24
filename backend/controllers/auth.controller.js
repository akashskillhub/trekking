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

const signinWithEmailAndPassword = async (req, res) => {
    try {
        const { email, password } = req.body
        const q = `SELECT * FROM users WHERE email = $1`
        const value = [email]
        const { rows } = await db.query(q, value)

        if (rows.length === 0) {
            return res.status(401).json({ message: "invalid email" })
        }
        const user = rows[0]
        const verify = await bcrypt.compare(password, user.password)
        if (!verify) {
            return res.status(401).json({ message: "invalid password" })
        }
        if (!user.isactive) {
            return res.status(401).json({ message: "account blocked by admin" })
        }

        res.json({ message: "login success", result: { id: user.id, email: user.email, name: user.name } })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "something went wrong" })
    }
}
const signinWithOTP = async (req, res) => {
    try {
        res.json({ message: "login success" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "something went wrong" })
    }
}
const signinWithGoogle = async (req, res) => {
    try {
        res.json({ message: "login success" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "something went wrong" })
    }
}

module.exports = {
    registerUser,
    signinWithEmailAndPassword,
    signinWithGoogle,
    signinWithOTP
}
