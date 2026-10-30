const router = require("express").Router()
const { rateLimit } = require("express-rate-limit")

const { registerUser, signinWithEmailAndPassword, signinWithOTP, signinWithGoogle, verifyOtp, signout } = require("../controllers/auth.controller")
const loginLimiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    limit: 10
})
router
    .post("/register", registerUser)
    .post("/signin-email-pass", signinWithEmailAndPassword)
    .post("/signin-otp", loginLimiter, signinWithOTP)
    .post("/signin-google", signinWithGoogle)
    .post("/verify-otp", verifyOtp)
    .post("/signout", signout)

module.exports = router
