const express=require("express");
const app=express();
const path=require("path");
const URL = require('./models/url');
const USER=require('./models/user');
const {connectMongoDB}=require("./connect")
const urlRoutes=require("./routes/url");
const userRoutes=require("./routes/user");
const staticRoutes=require("./routes/static");
const cookieParser=require("cookie-parser");
const {restrictToLoggedInUserOnly,getAuth}=require("./middleware/auth");
const { start } = require("repl");

//const shortid = require("shortid");

connectMongoDB("mongodb://127.0.0.1:27017/Urlshorner").then(()=>console.log("mongo Conected"));
const PORT=8001;


app.set("view engine","ejs");
app.set("views", path.resolve("./views"));



app.use(express.json());
app.use(express.urlencoded({extended:false }));
app.use(cookieParser());




app.use("/api/user",userRoutes)
app.use("/api/home",getAuth,staticRoutes);
app.use("/api/url",restrictToLoggedInUserOnly,urlRoutes);
app.get("/url/test", async(req,res)=>{
    const allurl=await URL.find({});
    return res.render('dB',
        {urls:allurl,}
    )
});



// app.get("/:shortUrl",async(req,res)=>{
//     const shortUrl=req.params.shortUrl;
//     const entry = await URL.findOneAndUpdate({ shortUrl}, { $push: { visitHistory: { timestamp: Date.now() } } });
//     console.log(entry);
//     return res.redirect(entry.redirectUrl);
// })
app.listen(PORT,()=>console.log(`server startedat ${PORT}`));