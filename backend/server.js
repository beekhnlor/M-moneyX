require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const port = process.env.PORT
const  { readdirSync } = require('fs')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))

readdirSync('./src/routes').map((e)=>app.use('/api',require('./src/routes/'+e)))

app.listen(port,()=>console.log(`Server is running on port ${port}`))














