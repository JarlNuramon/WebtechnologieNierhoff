/*
TODO: Error Loggen
      Faild Login Loggen
      DB connection
      User Registration verifikation (mail verifikation)
      Nach Debug ausgaben suchen und entfernen
 */
const express = require('express')
const app = express()
//includes all component for the UserManagementSystem (Login, Changepass, usw.)
const UMS = require('./modules/UserManagementSystem')
//Server port
const port = 300
app.use(express.json())
//Set default header
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
//catch errors
app.use(function (error, req, res, next) {
    //Log Erros here
    //console.log("catch")
})

//connect UserManagementSystem with app
UMS(app)

//start server
app.listen(port, () => console.log("Server started on " + port))
