const { Router } = require("express")
const { fetchAllUsers, blockAccount, unblockAccount, readTrek, createTrek, updateTrek, deleteTrek } = require("../controllers/admin.controller")
const trekUpload = require("../utils/upload")
const router = Router()

router
    .get("/users", fetchAllUsers)
    .post("/block/:id", blockAccount)
    .post("/unblock/:id", unblockAccount)

    .get("/trek", readTrek)
    .post("/create-trek", trekUpload, createTrek)
    .put("/update-trek/:tid", updateTrek)
    .delete("/delete-trek/:tid", deleteTrek)
module.exports = router