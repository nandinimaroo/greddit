import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
const SubSchema = new mongoose.Schema(
    {
        name :{
            type: String,
            required: true,
        },
        desc :{
            type: String,
            required: true,
        },
        tags :{
            type: String,
            required: true,
        },
        banned :{
            type: String,
            required: true,
        },
        moderator:{
            type: String,
            required: true,
        }
    }
)


const Sub = mongoose.model("Sub",SubSchema);
export default Sub;