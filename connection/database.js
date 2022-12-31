const mongoose =require("mongoose");
let url = 'mongodb://localhost:27017/IOT'

mongoose.connect(url).then(()=>{
    console.log("connected to mongo database")
}).catch(()=>{
    console.log("error connecting to mongo database")
})

// creating a model

const signup_schema = mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

// const login_Schema = mongoose.Schema({
//     email:{
//         type:String,
//         required:true
//     },
//     password:{
//         type:String,
//         required:true
//     }
// })

const collection = new mongoose.model("signUPData",signup_schema)
//const login = new mongoose.model("login_data",login_Schema)


module.exports =  collection