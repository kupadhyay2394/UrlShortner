const {getUser}=require("../service/auth")
async function restrictToLoggedInUserOnly(req,res,next){
    const userId=req.cookies.uid;
    
    if(!userId){
        return res.redirect("/user/loginpage");
    }
    const user=getUser(userId);
    if(!user) return res.redirect('/user/loginpage');
    req.user=user;
    next();
}
async function getAuth(req,res,next){
    const userId=req.cookies.uid;
    
    
    const user=getUser(userId);
    
    req.user=user;
    next();
}
module.exports={restrictToLoggedInUserOnly, getAuth}