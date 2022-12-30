const express = require("express");
const logger = require("morgan");
const parse = require("body-parser")
const path = require("path");
const mongodb = require("./connection/database")
const app = express()
const stableroute =require('./API/authentication');
const { mongo } = require("mongoose");
const pagepath = path.join(__dirname,"views");

app.use("/api",stableroute)
app.use("mongo",mongodb)
app.use(logger("tiny")) 
app.use(express.static(pagepath))
app.use(parse.urlencoded({extended:true}))
app.use(parse.json())


app.set("view engine","hbs")






app.listen(4001,((err,data)=>{
    if(err){
        console.log("error occure",err)
    }
    console.log(`successfully connected to servers`)
}))