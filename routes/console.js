const express= require('express');
const router=express.Router();
router.get("/",async(req,res)=>{
    const shortUrl=req.params.shortUrl;
    const entry = await URL.findOneAndUpdate({ shortUrl}, { $push: { visitHistory: { timestamp: Date.now() } } });
    // console.log(entry);
    return res.redirect(entry.redirectUrl);
})
module.exports=router;