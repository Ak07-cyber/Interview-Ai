import mongoose from "mongoose";

const blacklistTokenSchema = new mongoose.Schema({
    token:{
        type:String,
        required:[true,"token is required to be added in the blacklist"]
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires:86400 // Auto-delete after 24 hours (matches JWT expiry)
    }
},{
    timestamps:true
})

export const tokenblacklistModel=mongoose.model("blacklistTokens",blacklistTokenSchema);