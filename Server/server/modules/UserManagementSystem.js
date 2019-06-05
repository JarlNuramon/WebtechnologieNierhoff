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

/api/user/promote
    Input Parameter:
        promoteUser, user, token //user must be of group "dozent" or "admin"
    Return:
        Jep oder Nope

/api/user/demote
    Input Parameter:
        demoteUser, user, token  //user must be of group "dozent" or "admin"
    Return:
        Jep oder Nope

/api/user/makeadmin
    Input Parameter:
        newAdminUser, user, token  //user must be of group "admin"
    Return:
        Jep oder Nope

/api/user/unadmin
    Input Parameter:
        unAdminUser, user, token  //user must be of group "admin"
    Return:
        Jep oder Nope

Die Input Parameter müssen als JSON formatiert seien z.B.:
{
    "name": "karl",
    "pass": "asd"
}
*/
const Config = require('../config.js')
const crypto = require('crypto')
const logger = require('./Logger')
const ff = require('./FunnyFunctions')

const UserDB = require('../DB_Module/DB_Connection_Storage').UserDB
const LoginDB = require('../DB_Module/DB_Connection_Storage').LoginDB

module.exports = app => {

    app.post("/api/user/login", (req, res) => {
        if (req.body.name !== undefined && req.body.pass !== undefined) {
            validateLogin(req.body.name, req.body.pass).then(userName => {
                if(userName) {
                    let token = generateToken(Config.TOKEN_LENGTH)
                    loginUser(userName, token)
                    res.send(token)
                    logger.sendDebug('[UMS][POST /api/user/login] Login form User: "' + req.body.name + '".')
                } else {
                    res.send("Nope")
                    logger.sendDebug('[UMS][POST /api/user/login] Login FAILD with Username: "' + req.body.name + '".')
                }
            })
        } else {
            logger.sendDebug("[UMS][POST /api/user/login] called without required parameters: name, pass")
        }
    })

    app.post("/api/user/logout", (req, res) => {
        if (req.body.name !== undefined && req.body.token !== undefined) {
            validateSession(req.body.name, req.body.token).then(valid => {
                if(valid) {
                    logoutUser(req.body.name, req.body.token)
                    res.send("Jep")
                    logger.sendDebug('[UMS][POST /api/user/logout] Logout from User: "' + req.body.name + '".')
                } else {
                    res.send("Nope")
                    logger.sendDebug('[UMS][POST /api/user/logout] Logout FAILD with Username: "' + req.body.name + '".')
                }
            })
        } else {
            logger.sendDebug('[UMS][POST /api/user/logout] called without required parameters: name, token.')
        }
    })

    app.post("/api/user/register", (req, res) => {
        if (req.body.name !== undefined && req.body.pass !== undefined) {
            registerUser(req.body.name, req.body.pass, 'student').then(data => {
                if(data) {
                    res.send("Jep")
                    logger.sendDebug('[UMS][POST /api/user/register] Registration done for User: "' + req.body.name + "'.")
                } else {
                    res.send("User already exists")
                    logger.sendDebug('[UMS][POST /api/user/register] Registration FAILD for Username: "' + req.body.name + "'.")
                }
            })
        } else {
            logger.sendDebug("[UMS][POST /api/user/register] called without required parameters: name, pass")
        }
    })

    app.post("/api/user/delete", (req, res) => {
        if (req.body.name !== undefined && req.body.pass !== undefined) {
            deleteUser(req.body.name, req.body.pass).then(data => {
                if(data) {
                    res.send("Jep")
                    logger.sendDebug("[UMS][POST /api/user/delete] Deletet User: " + req.body.name)
                } else {
                    res.send("Nope")
                    logger.sendDebug('[UMS][POST /api/user/delete] FAILD to Delete User: "' + req.body.name + "'.")
                }
            })
        } else {
            logger.sendDebug("[UMS][POST /api/user/delete] called without required parameters: name, pass")
        }
    })

    app.post("/api/user/changepass", (req, res) => {
        if (req.body.name !== undefined && req.body.oldpass !== undefined && req.body.newpass !== undefined) {
            changePass(req.body.name, req.body.oldpass, req.body.newpass).then(valid => {
                if(valid) {
                    res.send("Jep")
                    logger.sendDebug('[UMS][POST /api/user/changepass] Changed pass from User: "' + req.body.name + '".')
                } else {
                    res.send("Nope")
                    logger.sendDebug('[UMS][POST /api/user/changepass] FAILD to change pass from User: "' + req.body.name + "'.")
                }
            })
        } else {
            logger.sendDebug("[UMS][POST /api/user/changepass] called without required parameters: name, oldpass, newpass.")
        }
    })

    app.post("/api/user/promote", (req, res) => {
        if(req.body.promoteUser !== undefined && req.body.user !== undefined && req.body.token !== undefined) {
            ff.validateDozentSession(req.body.user, req.body.token).then(result => {
                if(result) {
                    UserDB.selectData({name: req.body.promoteUser}).then(result => {
                        if(result.length == 1) {
                            let newUser = JSON.parse(JSON.stringify(result[0]))
                            newUser.group = "dozent"
                            UserDB.updateData(result[0], newUser)
                            res.send("Jep")
                            logger.sendDebug('[UMS][POST /api/user/promote] User "' + req.body.promoteUser + '" was promoted to dozent by "' + req.body.user + '".')
                        } else {
                            res.send("Nope")
                            logger.sendDebug("[UMS][POST /api/user/promote] FAILD because promoteUser dose not exists.")
                        }
                    })
                } else {
                    res.send("Nope")
                    logger.sendDebug("[UMS][POST /api/user/promote] FAILD because Invalid user/token.")
                }
            })
        } else {
            logger.sendDebug("[UMS][POST /api/user/promote] called without required parameters.")
        }
    })
    app.get("/api/user", (req, res) => {
        if(req.body.user !== undefined && req.body.token !== undefined) {
            logger.sendDebug('[UMS][POST /api/user/promote] User "' + req.body.user + '" wanted to see all Users!"');
            ff.validateAdminSession(req.body.user, req.body.token).then(result => {
                if(result) {
                    UserDB.selectData({}).then(result => {
                        let hilf = undefined;
                        let i = 0;
                        result.forEach((element) => {
                            if (i > 0) {
                                hilf = hilf.concat([{
                                    _id: element._id,
                                    name: element.name,
                                    group: element.group,
                                    __v: element.__v
                                }])
                            } else {
                                hilf = [{
                                    _id: element._id,
                                    name: element.name,
                                    group: element.group,
                                    __v: element.__v
                                }];
                                i++;
                            }
                        });

                        res.send(hilf);

                    });
                }
                else {

                }
            });
        }
        else
            {
            console.log(req.body);
            res.send("meeh")
        }});
    app.post("/api/user/demote", (req, res) => {
        if(req.body.demoteUser !== undefined && req.body.user !== undefined && req.body.token !== undefined) {
            ff.validateDozentSession(req.body.user, req.body.token).then(result => {
                if(result) {
                    UserDB.selectData({name: req.body.demoteUser}).then(result => {
                        if(result.length == 1) {
                            let newUser = JSON.parse(JSON.stringify(result[0]))
                            newUser.group = "student"
                            UserDB.updateData(result[0], newUser)
                            res.send("Jep")
                            logger.sendDebug('[UMS][POST /api/user/demote] User "' + req.body.demoteUser + '" was demoted by "' + req.body.user + '".')
                        } else {
                            res.send("Nope")
                            logger.sendDebug("[UMS][POST /api/user/demote] FAILD because demoteUser dose not exists.")
                        }
                    })
                } else {
                    res.send("Nope")
                    logger.sendDebug("[UMS][POST /api/user/demote] FAILD because Invalid user/token.")
                }
            })
        } else {
            logger.sendDebug("[UMS][POST /api/user/demote] called without required parameters.")
        }
    })

    app.post("/api/user/makeadmin", (req, res) => {
        if(req.body.newAdminUser !== undefined && req.body.user !== undefined && req.body.token !== undefined) {
            ff.validateAdminSession(req.body.user, req.body.token).then(result => {
                if(result) {
                    UserDB.selectData({name: req.body.newAdminUser}).then(result => {
                        if(result.length == 1) {
                            let newUser = JSON.parse(JSON.stringify(result[0]))
                            newUser.group = "admin"
                            UserDB.updateData(result[0], newUser)
                            res.send("Jep")
                            logger.sendDebug('[UMS][POST /api/user/makeadmin] User "' + req.body.newAdminUser + '" was promoted to admin by "' + req.body.user + '".')
                        } else {
                            res.send("Nope")
                            logger.sendDebug("[UMS][POST /api/user/makeadmin] FAILD because newAdminUser dose not exists.")
                        }
                    })
                } else {
                    res.send("Nope")
                    logger.sendDebug("[UMS][POST /api/user/makeadmin] FAILD because Invalid user/token.")
                }
            })
        } else {
            logger.sendDebug("[UMS][POST /api/user/makeadmin] called without required parameters.")
        }
    })

    app.post("/api/user/unadmin", (req, res) => {
        if(req.body.unAdminUser !== undefined && req.body.user !== undefined && req.body.token !== undefined) {
            ff.validateAdminSession(req.body.user, req.body.token).then(result => {
                if(result) {
                    UserDB.selectData({name: req.body.unAdminUser}).then(result => {
                        if(result.length == 1) {
                            let newUser = JSON.parse(JSON.stringify(result[0]))
                            newUser.group = "dozent"
                            UserDB.updateData(result[0], newUser)
                            res.send("Jep")
                            logger.sendDebug('[UMS][POST /api/user/unadmin] User "' + req.body.unAdminUser + '" was demoted to dozent by "' + req.body.user + '".')
                        } else {
                            res.send("Nope")
                            logger.sendDebug("[UMS][POST /api/user/unadmin] FAILD because unAdminUser dose not exists.")
                        }
                    })
                } else {
                    res.send("Nope")
                    logger.sendDebug("[UMS][POST /api/user/unadmin] FAILD because Invalid user/token.")
                }
            })
        } else {
            logger.sendDebug("[UMS][POST /api/user/unadmin] called without required parameters.")
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
    let salt = generateToken(Config.SALT_LENGTH)
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