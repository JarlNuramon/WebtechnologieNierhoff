/*
Diese Datei stellt folgende REST api's zur verfügung:

    POST /api/favorite
        Input Parameter:
            post_id -> ObjectID
            user -> String
            token -> String

        Return:
            Jep or Nope

    GET /api/favorite
        Input Parameter:
            user -> String
            token -> String

        Return:
            Array of favorite posts or Nope

    DELETE /api/favorite
        Input Parameter:
            post_id -> ObjectID
            user -> String
            token -> String

        Return:
            Jep or Nope

*/
const ff = require('./FunnyFunctions')
const logger = require('./Logger')
const FavoriteDB = require('../DB_Module/DB_Connection_Storage').FavoriteDB
const PostDB = require('../DB_Module/DB_Connection_Storage').PostDB

module.exports = app => {
    app.post("/api/favorite", (req, res) => {
        if(req.body.post_id !== undefined && req.body.user !== undefined && req.body.token !== undefined) {
            ff.validateSession(req.body.user, req.body.token).then(user => {
                if(user) {
                    if(ff.checkObjectIdFormat(req.body.post_id)) {
                        FavoriteDB.selectData({user: user.name}).then(favs => {
                            if(favs.length == 1) {
                                let newFavs = JSON.parse(JSON.stringify(favs[0]))
                                newFavs.fav.push(req.body.post_id)
                                FavoriteDB.updateData(favs[0], newFavs)
                                res.send("Jep")
                            } else {
                                FavoriteDB.postData({user: user.name, fav: [req.body.post_id]})
                                res.send("Jep")
                            }
                        })
                    } else {
                        res.send("Nope")
                        logger.sendDebug("[FAVMAN][POST /api/favorite] FAILD invalid post_id.")
                    }
                } else {
                    res.send("Nope")
                    logger.sendDebug("[FAVMAN][POST /api/favorite] FAILD because Invalid user/token.")
                }
            })
        } else {
            logger.sendDebug("[FAVMAN][POST /api/favorite] called without required parameters.")
        }
    })

    app.post("/api/favorite", (req, res) => {
        if(req.body.user !== undefined && req.body.token !== undefined) {
            ff.validateSession(req.body.user, req.body.token).then(user => {
                if(user) {
                    FavoriteDB.selectData({user: req.body.user}).then(favs => {
                        if(favs.length == 1) {
                            PostDB.selectData({_id: favs[0].fav}).then(post => {
                                res.send(post)
                            })
                        } else {
                            res.send([])
                        }
                    })
                } else {
                    res.send("Nope")
                    logger.sendDebug("[FAVMAN][GET /api/favorite] FAILD because Invalid user/token.")
                }
            })
        } else {
            logger.sendDebug("[FAVMAN][GET /api/favorite] called without required parameters.")
        }
    })

    app.delete("/api/favorite", (req, res) => {
        if(req.body.post_id !== undefined && req.body.user !== undefined && req.body.token) {
            ff.validateSession(req.body.user, req.body.token).then(user => {
                if(user) {
                    if(ff.checkObjectIdFormat(req.body.post_id)) {
                        FavoriteDB.selectData({user: user.name}).then(fav => {
                            if (fav.length == 1) {
                                let newFav = JSON.parse(JSON.stringify(fav[0]))
                                let index = newFav.fav.indexOf(req.body.post_id)
                                if (index !== -1) {
                                    newFav.fav.splice(index, 1)
                                    FavoriteDB.updateData(fav[0], newFav)
                                    res.send("Jep")
                                } else {
                                    res.send("Nope")
                                    logger.sendDebug("[FAVMAN][DELETE /api/favorite] FAILD because there is nothing to delete.")
                                }

                            } else {
                                res.send("Nope")
                                logger.sendDebug("[FAVMAN][DELETE /api/favorite] FAILD because there is nothing to delete.")
                            }
                        })
                    } else {
                        res.send("Nope")
                        logger.sendDebug("[FAVMAN][DELETE /api/favorite] FAILD because Invalid post_id.")
                    }
                } else {
                    res.send("Nope")
                    logger.sendDebug("[FAVMAN][DELETE /api/favorite] FAILD because Invalid user/token.")
                }
            })
        } else {
            logger.sendDebug("[FAVMAN][DELETE /api/favorite] called without required parameters.")
        }
    })
}