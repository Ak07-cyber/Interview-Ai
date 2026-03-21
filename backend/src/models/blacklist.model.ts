import mongoose,{Schema} from "mongoose";

interface blacklist{
    token:string
}

const blacklistTokenSchema:Schema<blacklist> =new mongoose.Schema({
    token:{
        type:String,
        required:[true,"token is required to be added in the blacklist"]
    }},{
        timestamps:true
    }
)

export const tokenblacklistModel=mongoose.model("blacklistTokens",blacklistTokenSchema);