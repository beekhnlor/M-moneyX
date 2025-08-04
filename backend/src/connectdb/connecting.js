require('dotenv').config()
const { createPool } = require('mysql2/promise')
const connected = createPool({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE,
})

module.exports = connected