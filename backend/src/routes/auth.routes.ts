import { Router } from "express";
import { registerUserController,LoginUserController,getMeController,logoutUserController } from "../controllers/auth.controller.js";

export const authRouter=Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register",registerUserController);

/**
 * @route POST /api/auth/login
 * @description  login user with email and password
 * @access Public
 */
authRouter.post("/login",LoginUserController);

/**
 * @route POST /api/auth/logout
 * @description clearing the token from user cookies and addding the token in the blacklist
 * @access Public
 */
authRouter.get("/logout",logoutUserController);

/**
 * @route POST /api/auth/get-me
 * @description gets the current logged in user details
 * @access private
 */
authRouter.get("/get-me",getMeController);

