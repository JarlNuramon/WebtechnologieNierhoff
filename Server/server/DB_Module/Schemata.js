let mongoose = require("mongoose");

class Schemata {

    static post_schemas = {
        title: String,
        link: String,
        text: String,
        post_date: {
            type: Date, default: Date.now
        },
        tags: [],

        author: String,
        author_id: mongoose.Schema.Types.ObjectId,

        section_id: mongoose.Schema.Types.ObjectId,
        section: String
    };

    static sections = {
        name: String,
        revelant_tags: [String],
        professors_ID: [mongoose.Schema.Types.ObjectId],
        parent_id: mongoose.Schema.Types.ObjectId
    };

    static thread_posts = {
        title: String,
        post_date: {
            type: Date, default: Date.now
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
    }
}

module.exports = Schemata;