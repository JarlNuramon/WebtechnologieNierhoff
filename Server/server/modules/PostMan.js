/*
Diese Datei stellt folgende REST api's zur verfügung:

    POST /api/post
        Input Parameter:
            title -> String
            link -> String
            text -> String
            post_date -> Date ("2019.12.11" seams to work (ask Metin for details))
            tags -> String Array
            author -> String (Name of the User)
            section -> String (ID of the Section)
            token -> String (Valid login token)
        Return:
            Jep or Nope

    GET /api/post/:postid
        Return:
            One Post as JSON
*/
const ff = require('./FunnyFunctions')
const logger = require('./Logger')
const PostDB = require('../DB_Module/DB_Connection_Storage').PostDB
const UserDB = require('../DB_Module/DB_Connection_Storage').UserDB

module.exports = app => {
    app.post("/api/post", (req, res) => {
        if(req.body.title !== undefined &&
            req.body.link !== undefined &&
            req.body.text !== undefined &&
            req.body.post_date !== undefined &&
            req.body.tags !== undefined &&
            req.body.author !== undefined && //Must be the User Name not the ID
            req.body.section !== undefined &&//Must be the ID not the Name
            req.body.token !== undefined) {
            ff.validateDozentSession(req.body.author, req.body.token).then(result => {
                if(result) {
                    if(isNaN(new Date(req.body.post_date).getTime())) {
                        res.send("Nope")
                        logger.sendDebug("[POSTMAN][POST /api/post] Trying to add Invalid Date.")
                    } else {
                        PostDB.postData({
                            title: req.body.title,
                            link: req.body.link,
                            text: req.body.text,
                            post_date: req.body.post_date,
                            tags: req.body.tags,
                            author_id: result._id,
                            section_id: req.body.section
                        })
                        res.send("Jep")
                        logger.sendDebug("[POSTMAN][POST /api/post] User " + result.name + " added a post.")
                    }
                } else {
                    res.send("Nope")
                    logger.sendDebug("[POSTMAN][POST /api/post] FAILD because Invalid user/token.")
                }
            })
        } else {
            logger.sendDebug("[POSTMAN][POST /api/post] called without required parameters.")
        }
    })

    app.get("/api/post/id/:postid", (req, res) => {
        if(req.params.postid !== undefined) {
            PostDB.selectData({_id: req.params.postid}).then(post => {
                if(post.length == 1) {
                    res.send(post[0])
                } else {
                    res.send("Nope")
                    logger.sendDebug('[POSTMAN][GET /api/post/id/:postid] FAILD to find post with id "' + req.params.postid + '".')
                }
            })
        } else {
            logger.sendDebug("[POSTMAN][GET /api/post/id/:postid] called without required parameter.")
        }
    })

    app.get("/api/post/search/:search", (req, res) => {
        if(req.params.search !== undefined) {
            PostDB.selectData({title: new RegExp(req.params.search, 'i')}).then(result => {
                res.send(result)
            })
        } else {
            logger.sendDebug("[POSTMAN][GET /api/post/search/:search] called without required parameter.")
        }
    })

    app.delete("/api/post", (req, res) => {
        if(req.body.postid !== undefined && req.body.user !== undefined && req.body.token !== undefined) {
            ff.validateAdminSession(req.body.user, req.body.token).then(adminUser => {
                if(adminUser) {
                    //User is admin
                    PostDB.selectData({_id: req.body.postid}).then(post => {
                        if(post.length == 1) {
                            //Post exists
                            PostDB.delData({_id: post[0]._id})
                            res.send("Jep")
                            logger.sendDebug('[POSTMAN][DELETE /api/post] Deleted post "' + req.body.postid + '".')
                        } else {
                            res.send("Nope")
                            logger.sendDebug("[POSTMAN][DELETE /api/post] FAILD Post with id: \"" + req.body.postid + "\" does not exists.")
                        }
                    })
                } else {
                    ff.validateDozentSession(req.body.user, req.body.token).then(dozentUser => {
                        if(dozentUser) {
                            //User is Dozent
                            PostDB.selectData({_id: req.body.postid}).then(post => {
                                if(post.length == 1) {
                                    //Post exists
                                    UserDB.selectData({name: req.body.user}).then(user => {
                                        if(user[0]._id.toString() === post[0].author_id.toString()) {
                                            //User is the author
                                            PostDB.delData({_id: post[0]._id})
                                            res.send("Jep")
                                            logger.sendDebug('[POSTMAN][DELETE /api/post] Deleted post "' + req.body.postid + '".')
                                        } else {
                                            res.send("Nope")
                                            logger.sendDebug('[POSTMAN][DELETE /api/post] FAILD User "' + req.body.user + '" is not the author.')
                                        }
                                    })
                                } else {
                                    res.send("Nope")
                                    logger.sendDebug("[POSTMAN][DELETE /api/post] FAILD Post with id: \"" + req.body.postid + "\" does not exists.")
                                }
                            })
                        } else {
                            res.send("Nope")
                            logger.sendDebug("[POSTMAN][DELETE /api/post] FAILD because Invalid user/token.")
                        }
                    })
                }
            })
        } else {
            logger.sendDebug("[POSTMAN][DELETE /api/post] called without required parameter.")
        }
    })

}