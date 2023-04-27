import mongoose from "mongoose";
import env from 'dotenv';
env.config();
export default async function connectDB() {
    
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB");
    }
    catch (err) {
        console.error("Error in connecting db:", err);
    }
}

