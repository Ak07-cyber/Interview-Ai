import type { Request, Response } from "express";
import { userModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { tokenblacklistModel } from "../models/blacklist.model.js";

/**
 * @name registerUserController
 * @description registers a new User, expects Username, email and password in the request body
 * @access Public
*/
export async function registerUserController(req:Request,res:Response){
    const {username,email,password}=req.body;

    if(!username ||!email ||!password){
        return res.status(400).json({
            message:"please provide username, email and password"
        })
    }

    try{
        //checking if the user already exits with provided email or the username
        const isUserAlreadyExists=await userModel.findOne({
            $or:[{username},{email}]
        })

        if(isUserAlreadyExists){//user already exits
            return res.status(400).json({
                message:"Account already exits with this Username or email"
            })
        }

        //user with the email or password doesnt exists hence creation of the user
        //hashing the password
        const hashedPassword=await bcrypt.hash(password,10);

        const User=await userModel.create({
            username,
            email,
            password:hashedPassword
        })

        res.status(201).json({
            message:"user registered Successfully",
            User:{
                id:User._id,
                username:User.username,
                email:User.email
            }
        })
    }catch(error){
        console.log();
        return res.status(500).json({
            message:"Internal Server error try again later"
        })
    }

}


/**
 * @name LoginUserController
 * @description  Logins a existing User, expects  email and password in the request body
 * @access Public
 */
export async function LoginUserController(req:Request,res:Response){

    const {email,password}=req.body;

    if(!email || !password){
        return res.status(400).json({
            message:"Please provide email and password"
        })
    }

    try{
        const User=await userModel.findOne({
            email
        })

        if(!User){
            return res.status(400).json({
                message:"no user exist with email, please Register"
            })
        }

        //comparing the password
        const isPasswordValid=await bcrypt.compare(password,User.password);

        if(!isPasswordValid){//password didnt match
            return res.status(400).json({
                message:"Invalid email or Password"
            })
        }

        //every check is passed providing the jwt token
        const token=jwt.sign(
            {id:User._id,username:User.username},
            process.env.JWT_SECRET as string,
            {expiresIn:"1d"}
        )

        res.cookie("token",token)
        return res.status(200).json({
            message:"Login Successfully",
            User:{
                id: User._id,
                username: User.username,
                email: User.email
        }
        })

    }catch(error){
        console.log("error while login: ",error);
        res.status(500).json({
            message:"Internal server error"
        })
    }
}

/**
 * @name logoutUserController
 * @description clears the token from the user cookie and add the token in blacklist
 * @access Public
 */
export async function logoutUserController(req:Request,res:Response){
    const token=req.cookies.token;

    if(token){//adding the token in the blacklist model
        await tokenblacklistModel.create({
            token
        })
    }

    res.clearCookie(token);

    res.status(200).json({
        message:"User logout Successfully"  
    })
}


/**
 * @name getMeController
 * @description gets the current logged in user details from the database 
 * @access Private
 */

export async function getMeController(req:Request,res:Response){
    if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const user=await userModel.findById(req.user.id);

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
        message:"User details fetched Successfully",
        user:{
            id:user._id,
            email:user.email,
            username:user.username
        }
    })
}

module.exports={
    registerUserController
}