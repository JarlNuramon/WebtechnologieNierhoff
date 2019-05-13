/*
Diese Datei stellt folgende REST api's zur verfügung:

/api/user/login
    Input Parameter:
        name, pass
    Return:
        Wenn erfolgreich:
            Eins Session token das im Client als cookie gesetzt werden sollte
        Wenn fehlgeschlagen:
            Nope

/api/user/logout
    Input Parameter:
        name, token
    Return:
        Jep oder Nope

/api/user/register
    Input Parameter:
        name, pass
    Return:
        Jep oder Nope

/api/user/delete
    Input Parameter:
        name, pass
    Return:
        Jep oder Nope

/api/user/changepass
    Input Parameter:
        name, oldpass, newpass
    Return:
        Jep oder Nope

Die Input Parameter müssen als JSON formatiert seien z.B.:
{
    "name": "karl",
    "pass": "asd"
}
*/
const crypto = require('crypto')

const tokenLength = 300


/*
userData und logdinUsers sollen aus der DB kommen
 */
let userData = [//asd 123 a
    {name: 'karl', hash: 'KmoIWdlmleP89oiYHp+xwpYFwL+r+GJtKrVaQbQqGMk=', salt: 'lqh5lLRgguBR0sIQbVCa'},
    {name: 'hans', hash: 'gbQbUo0V5PxL6cIkXPiWNIOk6i1vJKd6gVESizZ0Zbw=', salt: '2OOqp9cWIIcJz4icUYy3'},
    {name: 'a', hash: 'hz0sJJVXD2oazgqQuNm5oFy3Ni3yrAJiqflny6pvjPI=', salt: 'pR6hLlTMbb7vZZZRrESn'}
]
let logdinUsers = []

module.exports = function(app) {
    app.post("/api/user/login", (req, res) => {
        let userName = validateLogin(req.body.name, req.body.pass)
        if (userName) {
            let token = generateToken(tokenLength)
            loginUser(userName, token)
            res.send(token)
        } else {
            res.send("Nope")
        }
        console.log(logdinUsers)
    })

    app.post("/api/user/logout", (req, res) => {
        res.set("Access-Control-Allow-Origin", '*')
        if (validateSession(req.body.name, req.body.token)) {
            logoutUser(req.body.name, req.body.token)
            res.send("Jep")
        } else {
            res.send("Nope")
        }
        //console.log(li)
    })

    app.post("/api/user/register", (req, res) => {
        res.set("Access-Control-Allow-Origin", '*')
        if (req.body.name !== undefined && req.body.pass !== undefined) {
            if (!registerUser(req.body.name, req.body.pass)) {
                res.send("User already exists")
            } else {
                res.send("Jep")
            }
        } else {
            res.send("Nope")
        }
        //console.log(userData)
    })

    app.post("/api/user/delete", (req, res) => {
        res.set("Access-Control-Allow-Origin", '*')
        if (req.body.name !== undefined && req.body.pass !== undefined) {
            if (deleteUser(req.body.name, req.body.pass)) {
                res.send("Jep")
            } else {
                res.send("Nope")
            }
        }
        //console.log(userData)
    })

    app.post("/api/user/changepass", (req, res) => {
        res.set("Access-Control-Allow-Origin", '*')
        if (req.body.name !== undefined && req.body.oldpass !== undefined && req.body.newpass !== undefined) {
            if (changePass(req.body.name, req.body.oldpass, req.body.newpass)) {
                res.send("Jep")
            } else {
                res.send("Nope")
            }
        }
        //console.log(userData)
    })
}

function validateLogin(userName, pass) {
    let user = userData.find((obj) => obj.name === userName)
    if(user === undefined) {return false}
    if(user.hash === crypto.createHash('sha256').update(user.salt + user.salt + user.salt + pass + user.salt).digest('base64')) {
        return user.name
    } else {
        return false
    }
}

function generateToken(length) {
    let charSet = 'BCDEFGHIJKALMNOPQ0RSTUVWYZabcdefghXijklmnopqrstuvwxyz123456789'
    let token = ""
    for (let i = 0; i < length; i++) {
        token += charSet.charAt(Math.floor(Math.random() * charSet.length))
    }
    return token
}

function loginUser(userName, token) {
    logdinUsers = logdinUsers.filter((obj) => obj.name !== userName)
    logdinUsers.push({name: userName, token: token})
}

function validateSession(userName, token) {
    return logdinUsers.find((obj) => obj.name === userName && obj.token === token) ? true : false
}

function logoutUser(userName, token) {
    logdinUsers = logdinUsers.filter((obj) => obj.name !== userName && obj.token !== token)
}

function generateHash(pass) {
    let salt = generateToken(20)
    return {hash: crypto.createHash('sha256').update(salt + salt + salt + pass + salt).digest('base64'), salt: salt}
}

function registerUser(userName, pass) {
    if(userData.find((obj) => obj.name === userName) === undefined) {
        let hash = generateHash(pass)
        userData.push({name: userName, hash: hash.hash, salt: hash.salt})
        return true
    } else {
        return false
    }
}

function deleteUser(userName, pass) {
    if(validateLogin(userName, pass) !== false) {
        userData = userData.filter((obj) => obj.name !== userName)
        return true
    } else {
        return false
    }
}

function changePass(userName, oldpass, newpass) {
    if(validateLogin(userName, oldpass)) {
        let hash = generateHash(newpass)
        let index = userData.findIndex((obj) => obj.name === userName)
        userData[index].hash = hash.hash
        userData[index].salt = hash.salt
        console.log("true")
        return true
    } else {
        console.log("false")
        return false
    }
}