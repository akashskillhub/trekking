const { Router } = require("express")
const { publicReadTrek } = require("../controllers/public.controller")
const router = Router()

router
    .get("/treks", publicReadTrek)
module.exports = router