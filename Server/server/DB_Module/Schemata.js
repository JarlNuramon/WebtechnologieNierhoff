let mongoose = require("mongoose");

class Schemata {

    static post_schemas = {
        title: String,
        link: String,
        text: String,
        post_date: {
            type: String, default: new Date().toLocaleString()
        },
        tags: [String],
        author_id: mongoose.Schema.Types.ObjectId,
        section_id: mongoose.Schema.Types.ObjectId
    };

    static sections = {
        name: String,
        relevant_tags: [String],
        dozent_id: [mongoose.Schema.Types.ObjectId],
        parent_id: mongoose.Schema.Types.ObjectId
    };

    static thread_posts = {
        title: String,
        post_date: {
            type: String, default: new Date().toLocaleString()
        },
        tags: [String],
        author: String,
        author_id: mongoose.Schema.Types.ObjectId
    };

    static users = {
        name: String,
        hash: String,
        salt: String,
        group: String
    };

    static logdin_users = {
        name: String,
        token: String
    };
    static favorites = {
        user: String,
        fav: [mongoose.Schema.Types.ObjectId]
    };
    static silter = {
        Fachbereich: [],
        Fach: [],
        Kurs: []
    };
    static trees = {
        name: String
    };
    static tree_nodes = {
        title: String,
        parent_id: mongoose.Schema.Types.ObjectId,
        tree_name: String,
        video_id: mongoose.Schema.Types.ObjectId
    };
}

module.exports = Schemata;