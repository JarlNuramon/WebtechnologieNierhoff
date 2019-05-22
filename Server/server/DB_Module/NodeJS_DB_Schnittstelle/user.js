const express=require("express");
const app=express();
let DB=require("./DB").DB;
const port=666;
let d=new DB("test");
d.setSchema({
    'id': Number,
    'text': String
});
app.use(express.json());

app.get("/post", (req,res)=>{

    d.postData(req.body);
    res.send("ok")
});

app.post("/ll", (req, res)=>{

    d.selectData(req.body,function(err, selected){
        if(err)
            console.log(err);
        else
        res.send(selected);
    })

});

app.post("/", (req,res)=>{
    console.log("arsch lecken");
    console.log(req.body.name);
    res.send("ok");
});



app.listen(port, ()=> console.log("Server hört Port auf Port: "+port+" zu"));
