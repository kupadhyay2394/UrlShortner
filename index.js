const express=require("express");
const app=express();
const URL = require('./models/url');
const {connectMongoDB}=require("./connect")
const urlRoutes=require("./routes/url");
//const shortid = require("shortid");

connectMongoDB("mongodb://127.0.0.1:27017/Urlshorner").then(()=>console.log("mongo Conected"));
const PORT=8001;
app.use(express.json());
app.use("/url",urlRoutes);
app.get("/:shortUrl",async (req,res)=>{
    const shortUrl=req.params.shortUrl;
    const entry = await URL.findOneAndUpdate({ shortUrl}, { $push: { visitHistory: { timestamp: Date.now() } } });
    // console.log(entry);
    return res.redirect(entry.redirectUrl);
})
app.listen(PORT,()=>console.log(`server startedat ${PORT}`));