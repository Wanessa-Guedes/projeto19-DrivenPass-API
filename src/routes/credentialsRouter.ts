import {Router} from "express";
import { getCredentials, getCredentialsById, insertCredential } from "../controllers/credentialsController.js";
import { validateIdParams } from "../middlewares/idParamsValidator.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { validateToken } from "../middlewares/tokenValidatorMiddleware.js";
import { credentialSchema } from "../schemas/credentialSchema.js";

const credentialsRouter = Router();

credentialsRouter.post("/credentials", schemaValidator(credentialSchema), validateToken, insertCredential);
credentialsRouter.get("/credentials", validateToken, getCredentials);
credentialsRouter.get("/credential/:id", validateToken, validateIdParams, getCredentialsById);
credentialsRouter.delete("/credential/:id");

export default credentialsRouter