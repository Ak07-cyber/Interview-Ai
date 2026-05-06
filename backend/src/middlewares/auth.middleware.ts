import jwt from "jsonwebtoken";
import { tokenblacklistModel } from "../models/blacklist.model.js";
import type { NextFunction, Request, Response } from "express";

export async function authmiddleware(req:Request,res:Response,next:NextFunction){

    const token=req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"Token is not provided"
        })
    }

    const isTokenBlacklisted=await tokenblacklistModel.findOne({
        token
    })

    if(isTokenBlacklisted){//token has been revoked
        return res.status(401).json({
            message:"Token is revoked, please login again"
        })
    }

    try{
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET environment variable is required");
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { id: string, username: string };
        
        req.user = decoded;
        
        next();
    }catch(error){
        console.error("Error in auth middleware:", error);
        return res.status(401).json({
            message:"Invalid Token"
        })
    }

}
