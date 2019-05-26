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
        this.assert = require('assert');

    }

    /*
    * Muss gemacht werden ohne das geht gar nix
    * Bsp.:schema={"id": Number, "name": String}
    * collectionName="Name" (existiert die COllection nicht wird sie angelegt)
    * */



    setSchema(schema, collectionName){
        let currentSchema;
        currentSchema = new this.mongoose.Schema(schema);
        this.post = this.mongoose.model(collectionName, currentSchema);
        console.log("Ich sehe klar und deutlich ein Schema vor mir.")
    }

    /*
    * zum Hochladen einzelner Json Objekte
    * Wenn mehrere zum hochladen bitte schleife verwenden
    * */
    postData(jsonObject) {
        this.post(jsonObject).save(function (err) {
            if (err) console.error(err);
        });
        console.log("Erfolgreich dem Mongo übergeben!")
    };

    /*
    * Ohne setSchema(schema) geht das nicht!!!
    *
    * */
    selectData(JsonObjekt){

        let query=this.post.find(JsonObjekt, null);
        let promise=query.exec();

        return promise.then(function (err, selected) {
                if(err)
                    console.log(err);
                else{

                     return resolve(selected);
                }

            }, null);

    }

    /* Datensätze werden hier aus der Datenbank gelöscht
    * Bitte eindeutige Übergabeparameter ansonsten werden alle Datenensätze mit dem Inhalt von Data gelöscht
    * */
    delData(data) {
        this.post.find(data, function (err,selected) {
            if (err) console.log(err);
        }).deleteOne().exec();
    }

    /*
    * Bitte übergabeparameter als JSON übergeben
    * Datenbank elemente werde hier aktualisiert/verändert
    * Bitte eindeutige Übergabeparameter ansonsten werden alle Datensätze die "alt" enthalten verändert
    */
    updateData(alt, neu){
    this.post.find(alt, function (err,selected) {
        if(err)
            console.log(err);
    }).updateOne(neu).exec();

    }
}
module.exports = DB;
