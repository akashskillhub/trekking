const db = require("../db")
const bcrypt = require('bcryptjs')
const sendEmail = require("../utils/email")
const { OAuth2Client } = require("google-auth-library")

const { differenceInSeconds } = require("date-fns")
const config = require("../config")
const sendSMS = require("../utils/sms")
const registerTemplate = require("../email-templates/registerTemplate")
const otpTemplate = require("../email-templates/otpTemplate")

const jwt = require("jsonwebtoken")
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        // node validation
        const query = `SELECT * FROM users WHERE email = $1`
        const email_val = [email]
        const { rows } = await db.query(query, email_val)

        if (rows.length > 0) {
            return res.status(401).json({ message: "email already registerd with us" })
        }


        const hash = await bcrypt.hash(password, 10)

        const q = "INSERT INTO users (name,email,password) VALUES ($1,$2,$3)"
        const value = [name, email, hash]
        await db.query(q, value)
        await sendEmail({
            to: email,
            subject: 'welcome to treking fest',
            message: registerTemplate({ name })
        })
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
        const token = jwt.sign({ id: user.id, role: user.role }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRY })
        res.cookie("auth", token, { maxAge: config.COOKIE_EXPIRY })
        res.json({
            message: "login success", result: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "something went wrong" })
    }
}
const signinWithOTP = async (req, res) => {
    try {
        const { email } = req.body
        const q = `SELECT * FROM users WHERE email = $1`
        const value = [email]
        const { rows } = await db.query(q, value)

        if (rows.length === 0) {
            return res.status(401).json({ message: "invalid email" })
        }
        const otp = Math.floor(1000 + (Math.random() * 999))
        const string_otp = otp.toString()
        const hashOtp = await bcrypt.hash(string_otp, 10)
        const query = "UPDATE users SET otp = $1 , otpSendOn = $2  WHERE id = $3"
        const updateValue = [hashOtp, new Date(), rows[0].id]
        await db.query(query, updateValue)
        await sendEmail({
            to: email,
            subject: "your login otp",
            message: otpTemplate({ name: rows[0].name, otp, min: 1 })
        })
        if (rows[0].mobile) {
            // sendSMS({ message: `your otp is ${otp}`, mobile: rows[0].mobile })
            console.log('sms send success')
        } else {
            console.log("sms not send")
        }

        res.json({ message: "otp send success" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "something went wrong" })
    }
}
const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body
        const q = `SELECT * FROM users WHERE email = $1`
        const value = [email]
        const { rows } = await db.query(q, value)

        if (rows.length === 0) {
            return res.status(401).json({ message: "invalid email" })
        }
        const [user] = rows
        console.log(user)
        const seconds = differenceInSeconds(new Date(), new Date(user.otpsendon))
        if (seconds > config.OTP_EXPIRY_SECONDS) {
            await db.query("UPDATE users SET otp = $1  WHERE id = $2;", ["", user.id])
            return res.status(401).json({ message: "otp expired" })
        }

        const verify = await bcrypt.compare(otp, user.otp)
        if (!verify) {
            return res.status(401).json({ message: "invalid OTP" })
        }
        await db.query("UPDATE users SET otp = $1  WHERE id = $2;", ["", user.id])
        const token = jwt.sign({ id: user.id, role: user.role }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRY })
        res.cookie("auth", token, { maxAge: config.COOKIE_EXPIRY })
        res.json({
            message: "login success", result: {
                id: user.id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                role: user.role
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "something went wrong" })
    }
}
const signinWithGoogle = async (req, res) => {
    try {
        const { clientId, credential } = req.body
        const client = new OAuth2Client({ client_id: config.GOOGLE_CLIENT_ID })
        const data = await client.verifyIdToken({ idToken: credential })
        if (!data) {
            return res.status(401).json({ message: "invalid token" })
        }

        const { payload } = data
        const { name, picture, email } = payload

        const query = `SELECT * FROM users WHERE email = $1`
        const email_val = [email]
        const { rows } = await db.query(query, email_val)
        const [user] = rows
        if (rows.length > 0) {
            // email already present so LOGIN LOGIC
            const token = jwt.sign({ id: user.id, role: user.role }, config.JWT_SECRET, { expiresIn: config.JWT_EXPIRY })
            res.cookie("auth", token, { maxAge: config.COOKIE_EXPIRY })
            res.json({
                message: "login success", result: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    mobile: user.mobile,
                    role: user.role
                }
            })
        } else {
            // email Not Found so Register LOGIC
            const q = "INSERT INTO users (name,email,avatar) VALUES ($1,$2,$3)"
            const value = [name, email, picture]
            await db.query(q, value)
            await sendEmail({
                to: email,
                subject: 'welcome to treking fest From Google Registration',
                message: 'welcome to trekkers fest'
            })
            res.json({ message: "register success" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "something went wrong" })
    }
}
const signout = async (req, res) => {
    try {
        res.clearCookie("auth")
        res.json({ message: "signout success" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "something went wrong" })
    }
}

module.exports = {
    registerUser,
    signinWithEmailAndPassword,
    signinWithGoogle,
    signinWithOTP,
    verifyOtp,
    signout
}
