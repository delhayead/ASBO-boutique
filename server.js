//jshint esversion:6

const express = require("express");

const app = express();
const port = 8080;
    

app.listen(port,function(){
    console.log(`Hello There, listening at http/localhost:${port}`)
});
app.use(express.static(__dirname + "/client"));


app.get('/', function(req,res){
    res.sendFile('index.html', {root: __dirname })
})

app.get('/Panier.html',function(req,res){
    res.sendFile('Panier.html',{root:__dirname})
})


app.get('/Feature',function(req,res){
    res.send("Feature not installed yet sorry, try to come here later :D")
})