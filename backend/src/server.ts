import cluster from "cluster";
import os from "os";
import dotenv from "dotenv";

dotenv.config();
import {app} from "./app.js";
import { dbConnect } from "./config/database.js";

const numCPUs = os.cpus().length;

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
        console.log(`the worker started ${i}` );
    }

    cluster.on("exit", (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died. Restarting...`);
        cluster.fork();
    });
} else {
    //starting a db connection using the db conneciton funtion and makng the server to listen on the port 
    dbConnect();

    app.listen(3000,()=>{
        console.log(`server is listening on the port 3000 by worker ${process.pid}`);
    });
}