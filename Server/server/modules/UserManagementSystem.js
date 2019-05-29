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

const DB = require('../DB_Module/DB')
const Schemata = require('../DB_Module/Schemata')
const crypto = require('crypto')

const  UserDB = new DB('Pidvid')
UserDB.setSchema(Schemata.users, 'users')

const LoginDB = new DB('Pidvid')
LoginDB.setSchema(Schemata.logdin_users, 'logdin_users')

const tokenLength = 300
const saltLength = 40

module.exports = function(app) {

    app.post("/api/user/login", (req, res) => {
        if (req.body.name !== undefined && req.body.pass !== undefined) {
            validateLogin(req.body.name, req.body.pass).then(userName => {
                if(userName) {
                    let token = generateToken(tokenLength)
                    loginUser(userName, token)
                    res.send(token)
                } else {
                    res.send("Nope")
                }
            })
        }
    })

    app.post("/api/user/logout", (req, res) => {
        if (req.body.name !== undefined && req.body.token !== undefined) {
            validateSession(req.body.name, req.body.token).then(valid => {
                if(valid) {
                    logoutUser(req.body.name, req.body.token)
                    res.send("Jep")
                } else {
                    res.send("Nope")
                }
            })
        }
    })

    app.post("/api/user/register", (req, res) => {
        if (req.body.name !== undefined && req.body.pass !== undefined) {
            registerUser(req.body.name, req.body.pass, 'student').then(data => {
                if(data) {
                    res.send("Jep")
                } else {
                    res.send("User already exists")
                }
            })
        } else {
            res.send("Nope")
        }
    })

    app.post("/api/user/delete", (req, res) => {
        if (req.body.name !== undefined && req.body.pass !== undefined) {
            deleteUser(req.body.name, req.body.pass).then(data => {
                if(data) {
                    res.send("Jep")
                } else {
                    res.send("Nope")
                }
            })
        }
    })

    app.post("/api/user/changepass", (req, res) => {
        if (req.body.name !== undefined && req.body.oldpass !== undefined && req.body.newpass !== undefined) {
            changePass(req.body.name, req.body.oldpass, req.body.newpass).then(valid => {
                if(valid) {
                    res.send("Jep")
                } else {
                    res.send("Nope")
                }
            })
        }
    })
}

function validateLogin(userName, pass) {
    return UserDB.selectData({name: userName}).then(data => {
        if(data.length == 1) {
            if (data[0].hash === crypto.createHash('sha256').update(data[0].salt + data[0].salt + data[0].salt + pass + data[0].salt).digest('base64')) {
                return data[0].name
            } else {
                return false
            }
        } else {
            return false
        }
    })
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
    LoginDB.delData({name: userName})
    LoginDB.postData({name: userName, token: token})
}

function validateSession(userName, token) {
    return LoginDB.selectData({name: userName, token: token}). then(user => {
        if(user.length == 1) {
            return true
        } else {
            return false
        }
    })
}

function logoutUser(userName, token) {
    LoginDB.delData({name: userName, token: token})
}

function generateHash(pass) {
    let salt = generateToken(saltLength)
    return {hash: crypto.createHash('sha256').update(salt + salt + salt + pass + salt).digest('base64'), salt: salt}
}

function registerUser(userName, pass, group) {
    return UserDB.selectData({name: userName}).then(data => {
        if(data.length == 0) {
            let hash = generateHash(pass)
            UserDB.postData({name: userName, hash: hash.hash, salt: hash.salt, group: group})
            return true
        } else {
            return false
        }
    })
}

function deleteUser(userName, pass) {
    return validateLogin(userName, pass).then(data => {
        if(data) {
            UserDB.delData({name: userName})
            return true
        } else {
            return false
        }
    })
}

function changePass(userName, oldpass, newpass) {
    return validateLogin(userName, oldpass).then(user => {
        if(user) {
            let newHash = generateHash(newpass)
            return UserDB.selectData({name: user}).then(data => {
                if(data.length == 1) {
                    let oldUser = data[0]
                    let newUser = JSON.parse(JSON.stringify(oldUser))
                    newUser.hash = newHash.hash
                    newUser.salt = newHash.salt
                    UserDB.updateData(oldUser, newUser)
                    return true
                } else {
                    return false
                }
            })
        } else {
            return false
        }
    })
}