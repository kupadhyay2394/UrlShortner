const express= require('express');

const {handleGenrateNewShortUrl,handleGetAnaltycs}=require("../controler/url");
const router=express.Router();
router.post('/',handleGenrateNewShortUrl);
router.get('/analytics/:shortUrl',handleGetAnaltycs);

module.exports=router;