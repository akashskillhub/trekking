const jwt = require("jsonwebtoken")
const config = require("../config")
const adminProtected = async (req, res, next) => {
    try {
        const allCookies = req.cookies
        if (!allCookies?.auth) {
            return res.status(401).json({ message: "no cookie found" })
        }
        const token = allCookies.auth
        const verify = await jwt.verify(token, config.JWT_SECRET)
        if (!verify) {
            return res.status(401).json({ message: "invalid token" })
        }
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({ message: "unable to verify account" })
    }
}

module.exports = adminProtected