const router = require("express").Router()
const { registerUser, signinWithEmailAndPassword, signinWithOTP, signinWithGoogle, verifyOtp } = require("../controllers/auth.controller")
router
    .post("/register", registerUser)
    .post("/signin-email-pass", signinWithEmailAndPassword)
    .post("/signin-otp", signinWithOTP)
    .post("/signin-google", signinWithGoogle)
    .post("/verify-otp", verifyOtp)

module.exports = router
