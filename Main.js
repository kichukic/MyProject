const logger = require("morgan")
const express = require("express");
const morgan = require("morgan");
const dotenv = require("dotenv").config()
const app = express();
const authroutes = require('./API/authenticators')

app.use(morgan("tiny"))
app.use('/',authroutes)

app.set("view engine","hbs")






app.listen(process.env.PORT,()=>{
console.log(`server is now listening on ${process.env.PORT}`)})