import express, { json } from "express";
import "express-async-errors";


import router from "./routes/index.js"; 
import { errorHanddlingMiddleware}  from "./middlewares/errorHandlingMiddleware.js";

const app = express();
app.use(json());
app.use(router);
app.use(errorHanddlingMiddleware);

export default app;


