const shortid=require('shortid');
const URL =require('../models/url');
async function handleGenrateNewShortUrl(req,res){
    const body=req.body;
    if(!body.url) return res.status(400).json({error:'url is required'})
        const shortID=shortid.generate();
        await URL.create({
            shortUrl:shortID,
            redirectUrl:body.url,
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

module.exports={handleGenrateNewShortUrl, handleGetAnaltycs,};