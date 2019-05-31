/*
TODO: Error Loggen
    User Registration verifikation (mail verifikation)
    Nach Debug ausgaben suchen und entfernen
*/

const express = require('express')
const app = express()

//Includs Server configuration
const Config = require('./config')

//Includs the error and debug logger
const Logger = require('./modules/Logger')

//includes all component for the UserManagementSystem (Login, Changepass, usw.)
const UMS = require('./modules/UserManagementSystem')
//include the PostManager API
const PostMan = require("./modules/PostMan")

app.use(express.json())

//Set default header
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

//catch errors
app.use(function (error, req, res, next) {
    //Log Erros here
    //console.log("catch")
    Logger.sendError("Error in Server Main.\nError:\n" + error)
})

//connect UserManagementSystem with app
UMS(app)
//connect PostManager with app
PostMan(app)

//start server
app.listen(Config.PORT, () => console.log("Server started on " + Config.PORT))
