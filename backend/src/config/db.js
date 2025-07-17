// 
import mongoose from "mongoose"


export const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB connected successfully")
    }catch(err){
        console.log("Error connecting", err);
        process.exit(1) // exit with failure
    }
}