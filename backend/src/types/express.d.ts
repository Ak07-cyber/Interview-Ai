//rewriting the types of the REQUEST so that we can add items in the req
import express from "express";

declare global{
    namespace Express{
        interface Request{
            user?:{
                id:string,
                username:string
            }
        }
    }
}