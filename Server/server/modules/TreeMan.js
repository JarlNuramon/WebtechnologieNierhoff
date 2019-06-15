/*
Diese Datei stellt folgende REST api's zur verfügung:

    POST /api/tree
        Input Parameter:
            name -> String //name of the tree
            user -> String //dozent or higer
            token -> String

        Return:
            Jep or Nope

        Tip:
            Tree name must be unique
            If you are trying to add a tree with the same name twice you will get an error at the second time
            because it already exists

    POST /api/treenode
        Input Parameter:
            title -> String
            parent_id -> ObjectID
            tree_name -> String
            video_id -> ObjectID
            user -> String //dozent or higer
            token -> String

        Return:
            Jep or Nope

    GET /api/trees
        Return:
            Array with all Tree id's and names

    GET /api/tree/:tree
        Return:
            Tree or Nope

        Tip:
            :tree can be name or id

    GET /api/treenodes/:treename
        Return:
            Array of TreeNodes

 */
const Logger = require("./Logger")
const ff = require("./FunnyFunctions")
const TreeDB = require("../DB_Module/DB_Connection_Storage").TreeDB
const TreeNodesDB = require("../DB_Module/DB_Connection_Storage").TreeNodesDB

module.exports = app => {
    app.post("/api/tree", (req, res) => {
        if(req.body.user !== undefined && req.body.token !== undefined && req.body.name !== undefined) {
            ff.validateDozentSession(req.body.user, req.body.token).then(user => {
                if(user) {
                    TreeDB.selectData({name: req.body.name}).then(trees => {
                        if(trees.length === 0) {
                            TreeDB.postData({name: req.body.name})
                            res.send("Jep")
                            Logger.sendDebug('[TREEMAN][POST /api/tree] User: "' + req.body.user + '" created Tree: "' + req.body.name + '".')
                        } else {
                            res.send("Nope")
                            Logger.sendDebug('[TREEMAN][POST /api/tree] FAILD Tree: "' + req.body.name + '" already exists.')
                        }
                    })
                } else {
                    res.send("Nope")
                    Logger.sendDebug("[TREEMAN][POST /api/tree] FAILD because Invalid user/token.")
                }
            })
        } else {
            Logger.sendDebug("[TREEMAN][POST /api/tree] called without required parameters.")
        }
    })

    app.post("/api/treenode", (req, res) => {
        if(req.body.title !== undefined && req.body.parent_id !== undefined && req.body.tree_name !== undefined && req.body.video_id !== undefined && req.body.user !== undefined && req.body.token !== undefined) {
            ff.validateDozentSession(req.body.user, req.body.token).then(user => {
                if(user) {
                    if((ff.checkObjectIdFormat(req.body.parent_id) || req.body.parent_id === null) && (ff.checkObjectIdFormat(req.body.video_id) && req.body.video_id !== null)) {
                        TreeDB.selectData({name: req.body.tree_name}).then(tree => {
                            if(tree.length === 1) {
                                TreeNodesDB.postData({title: req.body.title, parent_id: req.body.parent_id, tree_name: req.body.tree_name, video_id: req.body.video_id})
                                res.send("Jep")
                            } else {
                                res.send("Nope")
                                Logger.sendDebug("[TREEMAN][POST /api/treenode] FAILD tree dose not exists.")
                            }
                        })
                    } else {
                        res.send("Nope")
                        Logger.sendDebug("[TREEMAN][POST /api/treenode] FAILD parent_id or video_id are not valid.")
                    }
                } else {
                    res.send("Nope")
                    Logger.sendDebug("[TREEMAN][POST /api/treenode] FAILD because Invalid user/token.")
                }
            })
        } else {
            Logger.sendDebug("[TREEMAN][POST /api/treenode] called without required parameters.")
        }
    })

    app.get("/api/trees", (req, res) => {
        TreeDB.selectData({}).then(trees => {
            let result = []
            trees.forEach(ele => {
                result.push({_id: ele._id, name: ele.name })
            })
            res.send(result)
        })
    })

    app.get("/api/tree/:tree", (req, res) => {
        if(req.params.tree !== undefined) {
            if(ff.checkObjectIdFormat(req.params.tree)) {
                TreeDB.selectData({_id: req.params.tree}).then(tree => {
                    if (tree.length === 1) {
                        res.send(tree[0])
                    } else {
                        res.send("Nope")
                        Logger.sendDebug("[TREEMAN][GET /api/tree/:treeid] FAILD tree was not found.")
                    }
                })
            } else {
                TreeDB.selectData({name: req.params.tree}).then(tree => {
                    if(tree.length === 1) {
                        res.send(tree[0])
                    } else {
                        res.send("Nope")
                        Logger.sendDebug("[TREEMAN][GET /api/tree/:treeid] FAILD tree was not found.")
                    }
                })
            }
        } else {
            Logger.sendDebug("[TREEMAN][GET /api/tree/:treeid] called without required parameters.")
        }
    })

    app.get("/api/treenodes/:treename", (req, res) => {
        if(req.params.treename !== undefined) {
            TreeNodesDB.selectData({tree_name: req.params.treename}).then(treeNodes => {
                res.send(treeNodes)
            })
        } else {
            Logger.sendDebug("[TREEMAN][GET /api/treenodes/:treename] called without required parameters.")
        }
    })
}