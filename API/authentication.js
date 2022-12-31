const { application } = require("express")
const express = require("express")
const router = express.Router()
const mongo = require('../connection/database')
const parse = require("body-parser")


router.use(parse.urlencoded({extended:true}))
router.use(parse.json())



router.get('/signup',(req,res)=>{
    res.render('login')
})

router.post('/signup',async(req,res)=>{
        const data = {
            username: req.body.username,
            email:req.body.email,
            password:req.body.password
        }
        console.log(data)

        const checkUserExists = await mongo.collection.findOne({email:req.body.email})
        try {
            if(checkUserExists === null){
                await mongo.collection.insertMany([data])
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


router.post('/login',async(req,res)=>{
    const data = {
        email : req.body.email,
        password: req.body.password
    }
    console.log(data)
    const checkloginData = await mongo.collection.findOne({email:req.body.email})
    try {
        if(checkloginData.email === req.body.email && checkloginData.password === req.body.password){
            res.send("login sucessfull")
        }
    } catch (error) {
        res.send("error login")
    }
})



module.exports = router;
