import jwt from "jsonwebtoken";
import { tokenblacklistModel } from "../models/blacklist.model.js";
import type { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";

export async function authmiddleware(req:Request,res:Response,next:NextFunction){

    const token=req.cookies.token;

    if(!token){
        return res.status(401).json({
            message:"token is not provided"
        })
    }
    const isTokenBlacklisted=await tokenblacklistModel.findOne({
        token
    })

    if(isTokenBlacklisted){//token has been revoked
        return res.status(401).json({
            message:"Token is revoked, please login is again"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET || " ") as { id: string, username: string };
        
        req.user = decoded;
        
        next();
    }catch(error){
        console.log("error occured in the middleware")  ;
        return res.status(401).json({
            message:"Invalid Token"
        })
    }

}
