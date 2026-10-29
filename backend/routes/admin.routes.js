const { Router } = require("express")
const { fetchAllUsers } = require("../controllers/admin.controller")
const router = Router()

router
    .get("/users", fetchAllUsers)
module.exports = router