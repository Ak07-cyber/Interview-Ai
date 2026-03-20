import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

export const app=express();

app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true //generation of the token
}))
app.use(express.json());

//importing the router handler


//assigning the route handler to the routes






