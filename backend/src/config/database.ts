import mongoose from "mongoose";

export async function dbConnect(){
    try{
        await mongoose.connect(process.env.MONGO_URL || " "); //this might me undefined if the env has empty field
        console.log("Database connected");
    }catch(error){
        console.log("error while connecting to the database: ",error);
    }
}
 