const { application } = require("express")
const express = require("express")
const router = express.Router()
const mongo = require('../connection/database')
const parse = require("body-parser")
const bcrypt =require("bcrypt")
const saltrounds = 10;
//const mypass = req.body.password


router.use(parse.urlencoded({extended:true}))
router.use(parse.json())



router.get('/signup',(req,res)=>{
    res.render('login')
})



router.post('/signup',async(req,res)=>{
   const {username, email, password} = req.body
        const checkUserExists = await mongo.collection.findOne({email})
        console.log(checkUserExists)


        try {
            if(checkUserExists === null){
                const hash =await bcrypt.hash(password,10)
                console.log(hash)
                await mongo.collection.insertMany([{username: username,email:email,password:hash}])
                res.send("data entered succes fully ")
            }else if(checkUserExists.email == req.body.email){
                res.send("user with email already exists")
            }
        } catch (error) {
            res.send("some error occured")
        }

     
})

router.get('/login',(req,res)=>{
    res.render('login')
})


// router.post('/login',async(req,res)=>{
//   const {email,password} = req.body
//     console.log(data)
//     const checkloginData = await mongo.collection.findOne({email:email})
//     try {
//         if(checkloginData.email === req.body.email && checkloginData.password === req.body.password){
//             res.send("login sucessfull")
//         }
//     } catch (error) {
//         res.send("error login")
//     }
// })

router.post('/login',async(req,res)=>{
      const {email,password} = req.body
      console.log(email,password)
        const checkloginData = await mongo.collection.findOne({email:email})
        const passmatch = await bcrypt.compare(password,checkloginData.password)
       // console.log(checkloginData)
       try {
        if(email== checkloginData.email && passmatch === true){
            res.send("sucess login")
        }else if(email !== checkloginData.email){
            res.send ("no user exists with this email: " + email)
        }
       } catch (error) {
        res.send("some error occured whilw login")
       }
    })

module.exports = router;


