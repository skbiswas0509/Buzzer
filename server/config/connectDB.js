import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

if(!process.env.MONGODB_URI){
    throw new Error(
        "PLease provide mongodb_uri in the .env file"
    )
}

async function connectDB(){
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("connect DB")
    } catch (error) {
        console.log("MongoDB connection Error, error")
        process.exit(1)
    }
}

export default connectDB;