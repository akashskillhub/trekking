const { Pool } = require("pg")
const config = require("./config")

const db = new Pool({
    connectionString: config.DATABASE_URL
})

// OR

// const db = new Pool({
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     database: process.env.DB_DATABASE,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT,
// })

module.exports = db