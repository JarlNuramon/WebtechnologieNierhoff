/*
    This File contains a collection of useful Functions
*/
const UserDB = require('../DB_Module/DB_Connection_Storage').UserDB
const LoginDB = require('../DB_Module/DB_Connection_Storage').LoginDB


module.exports = {

    /*
        returns String with time like "2019-05-31 12:54:55"
     */
    timestamp() {
        function pad(n) {
            return n < 10 ? "0" + n : n
        }

        let d = new Date()
        return d.getFullYear() + "-" +
            pad(d.getMonth() + 1) + "-" +
            pad(d.getDate()) + " " +
            pad(d.getHours()) + ":" +
            pad(d.getMinutes()) + ":" +
            pad(d.getSeconds())
    },

    /*
        if this user/token has a session the user is returned
        else it returns false
     */
    validateSession(userName, token) {
        return LoginDB.selectData({name: userName, token: token}).then(user => {
            if (user.length == 1) {
                return UserDB.selectData({name: user[0].name}).then(result => {
                    if(result.length == 1) {
                        return result[0]
                    } else {
                        return false
                    }
                })
            } else {
                return false
            }
        })
    },

    /*
        if this user/token has a session and the user belongs to the group "dozent" the user is returned
        else it returns false
     */
    validateDozentSession(userName, token) {
        return this.validateSession(userName, token).then(result => {
            if (result) {
                return UserDB.selectData({name: result.name}).then(user => {
                    if(user.length == 1) {
                        if(user[0].group === "dozent") {
                            return user[0]
                        } else {
                            return false
                        }
                    }
                })
            } else {
                return false
            }
        })
    }
}
