const mongoose=require("mongoose");
async function connectMongoDB(url){
    return mongoose.connect(url);
}
async function connectMongoDB(USER){
    return mongoose.connect(USER)
}
module.exports={connectMongoDB,};