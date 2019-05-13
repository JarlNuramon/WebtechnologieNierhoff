let mongoose=require("mongoose");
const express=require("express");
const app=express();
const port=666;
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    //Wenn es funktioniert
    console.log("1.21 GIGAWATT!!!!!")
});

/*
app.get("/mr", function(req, res){
    db.findById(JSON.stringify(req.body.id), function (err, SelectedInfos) {
        res.send(SelectedInfos);
    });

});
*/
let postSchema= new mongoose.Schema({
    title: String,
    link: String,
    text: String,
    post_date: String,
    tags: [String],

    author: String,
    author_id:Number,

    section_id: Number,
    section: String
});
let post=new mongoose.model('post', postSchema);

app.post("/mr", (req, res)=> {
    console.log(JSON.stringify(req.body.title));
    let getNewPost=new post({
        title: req.body.title,
        link: req.body.link,
        text: req.body.text,
        post_date: Date,
        tags: req.body.tags,

        author: req.body.author,
        author_id:req.body.id,

        section_id: req.body.section_id,
        section: req.body.section
    });
    getNewPost.save(function (err) {
        if (err) return console.error(err);
    });
    console.log("Es funzt");
    res.send("OK");
});
app.listen(port,()=> console.log("Server hört Port auf Port: "+port+" zu"));
