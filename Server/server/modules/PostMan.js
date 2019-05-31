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
                    logger.sendDebug("User " + result.name + " added a post.")
                } else {
                    res.send("Nope")
                    logger.sendDebug("Post post FAILD. Invalid token/user.")
                }
            })
        } else {
            logger.sendDebug("POST API /api/post called without required parameters")
        }
    })

    app.get("/api/post/:postid", (req, res) => {
        if(req.params.postid !== undefined) {
            PostDB.selectData({_id: req.params.postid}).then(post => {
                if(post.length == 1) {
                    res.send(post[0])
                } else {
                    res.send("Nope")
                    logger.sendDebug("FAILD to find post with id " + req.params.postid)
                }
            })
        } else {
            logger.sendDebug("GET API /api/post/:postid called without required parameter")
        }
    })
}