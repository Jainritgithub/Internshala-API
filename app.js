require('dotenv').config({path: "./.env"})
const express = require('express')
const app = express()

//dbConnection
require("./models/database").connectDatabase();


//logger
const logger =  require('morgan')
app.use(logger('tiny'))


// body parser
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//Routes
app.use('/', require('./routes/indexRoutes'))


//error handling
const errorHandeler = require('./utils/errorHandeler')
const { generatedErrors } = require('./middlewares/errors')
app.all('*', (req, res, next)=>{
    next(new errorHandeler(`Requested URL Not Found ${req.url}`, 404))
})
app.use(generatedErrors)



// server
app.listen(process.env.PORT, console.log(`Server is running on port ${process.env.PORT}`))