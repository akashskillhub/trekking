const { Router } = require("express")
const { fetchAllUsers, blockAccount, unblockAccount } = require("../controllers/admin.controller")
const router = Router()

router
    .get("/users", fetchAllUsers)
    .post("/block/:id", blockAccount)
    .post("/unblock/:id", unblockAccount)
module.exports = router