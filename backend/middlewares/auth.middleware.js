const adminProtected = async (req, res, next) => {
    try {
        const allCookies = req.cookies
        if (!allCookies?.auth) {
            return res.status(401).json({ message: "no cookie found" })
        }
        next()
    } catch (error) {
        console.log(error)
        res.status(401).json({ message: "unable to verify account" })
    }
}

module.exports = adminProtected