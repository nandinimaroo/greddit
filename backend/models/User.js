import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
const UserSchema = new mongoose.Schema(
    {
        fname :{
            type: String,
            required: true,
        },
        lname :{
            type: String,
            required: true,
        },
        username :{
            type: String,
            required: true,
        },
        email :{
            type: String,
            required: true,
        },
        age :{
            type: String,
            required: true,
        },
        contact :{
            type: String,
            required: true,
        },
        password :{
            type: String,
            required: true,
        },
    }
)

UserSchema.methods.checkPassword=function(password){
    return bcrypt.compare(password,this.password);
};
UserSchema.methods.generateToken=function(){
    const payload ={
        user:{
            id:this._id
        }
    }
    const secret = process.env.SECRET_KEY;
    const token = jwt.sign(payload,secret,{expiresIn:360000});
    return token;
};
const User = mongoose.model("user",UserSchema);
export default User;