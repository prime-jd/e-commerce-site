import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const UserSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    refreshToken : {
        type : String
    }   
}, {timestamps : true})

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (err) {
      next(err);
    }
  });
  
        
UserSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
    
}
UserSchema.methods.generateAccessToken= function(){
   return jwt.sign(
    {
        id : this._id,
        name : this.name,
        email : this.email,
    },
     process.env.ACCESS_TOKEN_SECRET, 
     {expiresIn : process.env.ACCESS_TOKEN_EXPIRY}) 
}

UserSchema.methods.generateRefreshToken= function(){
    return jwt.sign({id : this._id},
         process.env.REFRESH_TOKEN_SECRET,
          {expiresIn : process.env.REFRESH_TOKEN_EXPIRY})
}

export const User = mongoose.model("User", UserSchema);