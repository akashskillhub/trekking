const express = require("express")
require("dotenv").config({ path: "./.env" })
const cors = require('cors')
const config = require("./config")
const adminProtected = require("./middlewares/auth.middleware")

const app = express()

app.use(express.json())
app.use(cors({ origin: config.CORS_ORIGIN, credentials: true }))

app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/admin", adminProtected, require("./routes/admin.routes"))

app.listen(process.env.PORT, () => {
    console.log(`mode: ${config.ENV}`)
    console.log(`server running on http://localhost:${process.env.PORT}`)
})

module.exports = app;
