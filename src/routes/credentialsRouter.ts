import {Router} from "express";

const credentialsRouter = Router();

credentialsRouter.post("/credentials");
credentialsRouter.get("/credentials");
credentialsRouter.get("/credential/:id");
credentialsRouter.delete("/credential/:id");

export default credentialsRouter