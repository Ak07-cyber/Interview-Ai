/// <reference path="./types/express.d.ts" />
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

export const app=express();

// Security headers
app.use(helmet());

app.use(cookieParser());
app.use(cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    credentials:true
}))
app.use(express.json());

// Rate limiting for auth routes (prevent brute-force)
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20,
    message: { message: "Too many attempts, please try again later" },
    standardHeaders: true,
    legacyHeaders: false,
});

//importing the router handler
import { authRouter } from "./routes/auth.routes.js";
import {interviewRouter} from "./routes/interview.route.js";


//assigning the route handler to the routes
app.use("/api/auth", authLimiter, authRouter);
app.use("/api/interview",interviewRouter);
