const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const ejs = require("ejs")


const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));

app.get("/",(res,req)=>{
    req.render(__dirname+"/templates/index.ejs");
});
app.post("/",(req,res)=>{
    const cityname=req.body.cityname;
    https.get("https://api.openweathermap.org/data/2.5/weather?q="+cityname+",india&appid=c19b24608a9fe48cc229a33ba240d803&units=metric",(respond)=>{
        respond.on("data",(data)=>{
            console.log(JSON.parse(data));
            // const description = JSON.parse(data).weather[0].description;
            // const temp = JSON.parse(data).main.temp;
            // const icon = JSON.parse(data).weather[0].icon;
            // const Imageurl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            // res.write("<h1>In "+cityname+"</h1>")
            // res.write("<h3>Temperature:"+temp+" degree celsius</h3>")
            // res.write("<h3>Seems like "+description+" outside</h3>")
            // res.write("<img style='background-color:black;' src="+Imageurl+">")
            res.render(__dirname+"/templates/info.ejs",{"Data":JSON.parse(data)});
        });
    });
});
app.listen(process.env.PORT || 3000,()=>{
    console.log("Server started")
});