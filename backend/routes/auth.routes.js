const router = require("express").Router()
const { registerUser, signinWithEmailAndPassword, signinWithOTP, signinWithGoogle } = require("../controllers/auth.controller")
router
    .post("/register", registerUser)
    .post("/signin-email-pass", signinWithEmailAndPassword)
    .post("/signin-otp", signinWithOTP)
    .post("/signin-google", signinWithGoogle)

module.exports = router
