class Schemata {
    static PostSchema =
        {
            title: String,
            link: String,
            text: String,
            post_date: {
                type: Date, default: Date.now
            },
            tags: [],

            author: String,
            author_id: ObjectId,

            section_id: ObjectId,
            section: String
        };
    static Section = {
        name: String,
        revelant_tags: [String],
        professors_ID: [ObjectId],
        parent_id: ObjectId
    };
    static Thread_Post = {
        title: String,
        post_date: Date,
        tags: [String],
        author: String,
        author_id: ObjectId
    };
}
module.exports=Schemata;