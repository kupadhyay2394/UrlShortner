const express=require("express");
const app=express();
const path=require("path");
const URL = require('./models/url');
const {connectMongoDB}=require("./connect")
const urlRoutes=require("./routes/url");
const staticRoutes=require("./routes/static");
const consoleRoute=require("./routes/console")
//const shortid = require("shortid");

connectMongoDB("mongodb://127.0.0.1:27017/Urlshorner").then(()=>console.log("mongo Conected"));
const PORT=8001;
app.set("view engine","ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({extended:false }));
app.use("/api/home",staticRoutes)
app.use("/api/url",urlRoutes);
app.get("/url/test", async(req,res)=>{
    const allurl=await URL.find({});
    return res.render('dB',
        {urls:allurl,}
    )
});



app.get("/:shortUrl",consoleRoute)
app.listen(PORT,()=>console.log(`server startedat ${PORT}`));