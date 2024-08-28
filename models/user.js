const mongoose=require('mongoose');
const bcrypt = require('bcrypt');

const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:true
    },
    // accesToken:{
    //     type:String,
    //     required:true
    // },
    // refreshToken:{
    //     type:String,
    //     required:true
    // }

})
userSchema.methods.isPasswordCorrect = async function(password) {
    return bcrypt.compare(password, this.password);
  };

const USER=mongoose.model("USER",userSchema);
module.exports=USER;
