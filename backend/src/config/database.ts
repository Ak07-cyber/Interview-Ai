import mongoose from "mongoose";

export async function dbConnect(){
    if (!process.env.MONGO_URL) {
        throw new Error("MONGO_URL environment variable is required");
    }
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected");
    }catch(error){
        console.error("Error while connecting to the database: ",error);
        process.exit(1);
    }
}
 