const express= require('express');
const {handelRegisterUser,handelUserSignUp,handelloginUser}=require("../controler/url")
const router=express.Router();
router.post("/",handelRegisterUser);
router.get("/signup",handelUserSignUp);
router.get("/loginpage",(req,res)=>{
    return res.render('login');
})
router.post("/login",handelloginUser);


module.exports=router;
