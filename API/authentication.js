const { application } = require("express")
const express = require("express")
const router = express.Router()
const mongo = require('../connection/database')
const parse = require("body-parser")
const { default: mongoose } = require("mongoose")


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
        const checkUserExist = await mongo.collections.findOne({email:req.body.email})
        try {
            if(checkUserExist === null){
                await mongodb.collections.inserMany([data])
                res.send("sucess fully created the account")
            }else if(checkUserExist.email === req.body.email){
                res.send("the user already exists")
            }
        } catch (error) {
            res.send("some error occured")
        }
      console.log(data)
})




module.exports = router;