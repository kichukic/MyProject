const express = require('express')
const router = express.Router()

router.get("/login",(req,res)=>{
   res.render("../views/pages/login.hbs")
   
})

module.exports = router