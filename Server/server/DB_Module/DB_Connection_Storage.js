/*
    This File stores all the DBConnections so they only exists once
 */
const Config = require('../config.js')
const Schemata = require('../DB_Module/Schemata')

const DB = require('../DB_Module/DB')

const  UserDB = new DB(Config.DBNAME)
UserDB.setSchema(Schemata.users, 'users')

const LoginDB = new DB(Config.DBNAME)
LoginDB.setSchema(Schemata.logdin_users, 'logdin_users')

const PostDB = new DB(Config.DBNAME)
PostDB.setSchema(Schemata.post_schemas, "post_schemas")

module.exports = {
    UserDB,
    LoginDB,
    PostDB
}