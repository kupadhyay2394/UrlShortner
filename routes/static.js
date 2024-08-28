const express= require('express');
const URL = require('../models/url');
const USER=require('../models/user');

const router=express.Router();
router.get("/",async(req,res)=>{
    if(!req.user) return res.redirect('/api/user/login');
    const allUrls=await URL.find({ createdBy:req.user._id});
    return res.render("home",{urls:allUrls});
})

module.exports=router;
