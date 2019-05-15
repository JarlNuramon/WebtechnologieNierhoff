class DB {
    constructor(database) {
        this.mongoose=require("mongoose");
        this.mongoose.connect('mongodb://localhost:27017/'+database, {useNewUrlParser: true});
        this.db = this.mongoose.connection;
        this.db.on('error', console.error.bind(console, 'connection error:'));
        this.db.once('open', function () {
            //Wenn es funktioniert
            console.log("Datenbank verbunden");

        });
    }

    setSchema(schema){
        let currentSchema;
        currentSchema = new this.mongoose.Schema(schema);
        this.post = this.mongoose.model('posts', currentSchema);
        console.log("Ich sehe klar und deutlich ein Schema vor mir.")
    }
    postData(jsonObject) {
        this.post(jsonObject).save(function (err) {
            if (err) return console.error(err);
        });
        console.log("Erfolgreich dem Mongo übergeben!")
    };

    selectData(){
        //Ohne setSchema(schema) geht das nicht!!!
        return this.post.find;
    }
}
module.exports.DB = DB;
