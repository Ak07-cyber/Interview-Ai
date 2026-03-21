import mongoose from "mongoose";

interface user{
    username:string,
    email:string,
    password:string
}

const userSchema = new mongoose.Schema<user>({
    username:{
        type:String,
        required:true,
        unique:[true,"username is already Taken"],
        match:[/.+\@.+\..+/,"please provide a valid email"]
    },
    email:{
        type:String,
        required:[true,"email is requried"],
        unique:[true,"email already taken"]
    },
    password:{
        type:String,
        required:[true,"Password is required"]
    }
})

export const userModel=mongoose.model("users",userSchema);