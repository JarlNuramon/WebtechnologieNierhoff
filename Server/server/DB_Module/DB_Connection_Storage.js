/*
    This File stores all the DBConnections so they only exists once
 */
const Config = require('../config.js')
const Schemata = require('../DB_Module/Schemata')

const DB = require('../DB_Module/DB')

const UserDB = new DB(Config.DBNAME)
UserDB.setSchema(Schemata.users, 'users')

const LoginDB = new DB(Config.DBNAME)
LoginDB.setSchema(Schemata.logdin_users, 'logdin_users')

const PostDB = new DB(Config.DBNAME)
PostDB.setSchema(Schemata.post_schemas, "post_schemas")

const SectionDB = new DB(Config.DBNAME)
SectionDB.setSchema(Schemata.sections, 'sections')

const FavoriteDB = new DB(Config.DBNAME)
FavoriteDB.setSchema(Schemata.favorites, 'favorites')

const filteredDataDB = new DB(Config.DBNAME)
filteredDataDB.setSchema(Schemata.silter, 'silter');

const TreeDB = new DB(Config.DBNAME)
TreeDB.setSchema(Schemata.trees, 'trees')

const TreeNodesDB = new DB(Config.DBNAME)
TreeNodesDB.setSchema(Schemata.tree_nodes, 'tree_nodes')

module.exports = {
    UserDB,
    LoginDB,
    PostDB,
    SectionDB,
    FavoriteDB,
    filteredDataDB,
    TreeDB,
    TreeNodesDB
}