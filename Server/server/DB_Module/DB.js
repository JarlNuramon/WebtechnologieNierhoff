const log = require("../modules/Logger");
const Config = require("../config");

class DB {

    /*
    * database muss ein String sein darüber wird entschieden welche Datenbank du benutzt
    * sollte eine Datenbank nicht existieren und du willst da trotzdem was rein pushen wird die Datenbank erstellt
    * */
    constructor(database) {
        this.mongoose = require("mongoose");
        this.mongoose.connect("mongodb://" + Config.DBUser + ":" + Config.DBPass + "@" + Config.DBUrl + ":" + Config.DBPort + "/" + database, {useNewUrlParser: true});
        this.db = this.mongoose.connection;
        this.db.on('error', () => log.sendError("DB-Connection refused"));
        this.db.once('open', () => {

        });

    }

    /*
    * Muss gemacht werden ohne das geht gar nix
    * Bsp.:schema={"id": Number, "name": String}
    * collectionName="Name" (existiert die COllection nicht wird sie angelegt)
    * */
    setSchema(schema, collectionName) {
        let currentSchema;
        currentSchema = new this.mongoose.Schema(schema);
        this.post = this.mongoose.model(collectionName, currentSchema);

    }

    /*
    * zum Hochladen einzelner Json Objekte
    * Wenn mehrere zum hochladen bitte schleife verwenden
    * */
    postData(jsonObject) {
        this.post(jsonObject).save((err) => {
            if (err) log.sendError("Could not insert JSON into the DB");
        });

    };

    /*
    * Ohne setSchema(schema) geht das nicht!!!
    * */
    selectData(JsonObjekt) {

        let query = this.post.find(JsonObjekt, null);
        return query.exec();

    }

    /* Datensätze werden hier aus der Datenbank gelöscht
    * Bitte eindeutige Übergabeparameter ansonsten werden alle Datenensätze mit dem Inhalt von Data gelöscht
    * */
    delData(data) {
        this.post.find(data, (err, selected) => {
            if (err) log.sendError("Could not delete from DB");
        }).deleteOne().exec();
    }

    /*
    * Bitte übergabeparameter als JSON übergeben
    * Datenbank elemente werde hier aktualisiert/verändert
    * Bitte eindeutige Übergabeparameter ansonsten werden alle Datensätze die "alt" enthalten verändert
    * */
    updateData(alt, neu) {
        this.post.find(alt, (err, selected) => {
            if (err)
                log.sendError("Could Not Update data from DB")
        }).updateOne(neu).exec();

    }
}

module.exports = DB;
