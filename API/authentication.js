const express = require("express")
const router = express.Router()
const mongo = require('../connection/database')



router.get('/',(req,res)=>{
    res.render('login')
})

router.post('/signup',(req,res)=>{
        const data = {
            username: req.body.username,
            email:req.body.email,
            password:req.body.password
        }
        console.log(data)
})




module.exports = router;