class DB {
    /*
    * database muss ein String sein darüber wird entschieden welche Datenbank du benutzt
    * sollte eine Datenbank nicht existieren und du willst da trotzdem was rein pushen wird die Datenbank erstellt
    * */
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
    /*
    Muss gemacht werden ohne das geht gar nix
    Bsp.:
    {"id": Number, "name": String}
    */
    setSchema(schema){
        let currentSchema;
        currentSchema = new this.mongoose.Schema(schema);
        this.post = this.mongoose.model('posts', currentSchema);
        console.log("Ich sehe klar und deutlich ein Schema vor mir.")
    }
    /*
    zum Hochladen einzelner Json Objekte
    Wenn mehrere zum hochladen bitte schleife verwenden
    */
    postData(jsonObject) {
        this.post(jsonObject).save(function (err) {
            if (err) console.error(err);
        });
        console.log("Erfolgreich dem Mongo übergeben!")
    };

    /*
    Ohne setSchema(schema) geht das nicht!!!
    x muss eine function sein
    */
    selectData(JsonObjekt, methode){

            this.post.find(JsonObjekt, methode);



    }
}
module.exports.DB = DB;
