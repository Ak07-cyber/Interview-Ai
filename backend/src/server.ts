import dotenv from "dotenv";

dotenv.config();
import {app} from "./app.js";
import { dbConnect } from "./config/database.js";

dbConnect();

const PORT = parseInt(process.env.PORT || "3000");
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});