import {Router} from "express";
import { deleteCredentialById, getCredentials, getCredentialsById, insertCredential } from "../controllers/credentialsController.js";
import { insertWifi } from "../controllers/wifiController.js";
import { validateIdParams } from "../middlewares/idParamsValidator.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { validateToken } from "../middlewares/tokenValidatorMiddleware.js";
import { credentialSchema } from "../schemas/credentialSchema.js";
import { wifiSchema } from "../schemas/wifiSchema.js";

const wifiRouter = Router();

wifiRouter.post("/wifi", schemaValidator(wifiSchema), validateToken, insertWifi);
/* credentialsRouter.get("/credentials", validateToken, getCredentials);
credentialsRouter.get("/credentials/:id", validateToken, validateIdParams, getCredentialsById);
credentialsRouter.delete("/credentials/:id", validateToken, validateIdParams, deleteCredentialById); */

export default wifiRouter