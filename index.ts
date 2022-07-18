import express, { json } from "express";
import "express-async-errors";
import dotenv from "dotenv";

import router from "./src/routes/index.js"; 
import { errorHanddlingMiddleware}  from "./src/middlewares/errorHandlingMiddleware.js";

dotenv.config();

const app = express();
app.use(json());
app.use(router);
app.use(errorHanddlingMiddleware);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is up and running on port ${PORT}`)
})