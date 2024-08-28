const shortid=require('shortid');
const URL =require('../models/url');
const USER =require('../models/user');
const {v4:uuidv4}=require('uuid');
const {setUser}=require('../service/auth');
const cookieParser = require('cookie-parser');
async function handleGenrateNewShortUrl(req,res){
    const body=req.body;
    if(!body.url) return res.status(400).json({error:'url is required'})
        const shortID=shortid.generate();
        await URL.create({
            shortUrl:shortID,
            redirectUrl:body.url,
            createdBy:req.user._id,
            visitHistory:[],
        })
        return res.render('home',{id:shortID});

    
}

async function handleGetAnaltycs(req,res){
    
    const shortUrl=req.params.shortUrl;
    const result=await URL.findOne({ shortUrl},);
    console.log(shortUrl)
    return res.json(result.visitHistory.length);
}
async function handelUserSignUp(req,res){
    
    return res.render('register');

}
async function handelRegisterUser(req,res){
    const{userName,fullName, email,password}=req.body;
    const user=await USER.findOne({userName});
    if(user){
        return res.render('register');
    }
    await USER.create({
        userName,
        fullName,
        email,
        password
    })
    return res.redirect("/api/home")
}
async function handelloginUser(req,res){
    
    const {userName, password}=req.body;
    console.log(req.body);
    const user=await USER.findOne({userName, password});
    
    if(!user){
        return res.render('login', {
            error:"invalid"
        })
    }
   
    const sessionId=uuidv4();
    setUser(sessionId,user);
    res.cookie('uid',sessionId);
    
    return res.redirect('/api/home');

    
}

module.exports={handleGenrateNewShortUrl, handleGetAnaltycs,handelRegisterUser,handelUserSignUp,handelloginUser};