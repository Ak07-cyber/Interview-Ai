require("dotenv").config();
import {app} from "../src/app.js";
import { dbConnect } from "./config/database.js";

//starting a db connection using the db conneciton funtion and makng the server to listen on the port 
dbConnect();

app.listen(3000,()=>{
    console.log("server is listening on the port 3000");
});