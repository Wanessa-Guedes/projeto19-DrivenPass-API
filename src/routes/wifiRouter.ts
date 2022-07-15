import {Router} from "express";
import { deleteCredentialById, getCredentials, getCredentialsById, insertCredential } from "../controllers/credentialsController.js";
import { deleteWifiById, getWifiById, getWifis, insertWifi } from "../controllers/wifiController.js";
import { validateIdParams } from "../middlewares/idParamsValidator.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { validateToken } from "../middlewares/tokenValidatorMiddleware.js";
import { credentialSchema } from "../schemas/credentialSchema.js";
import { wifiSchema } from "../schemas/wifiSchema.js";

const wifiRouter = Router();

wifiRouter.post("/wifi", schemaValidator(wifiSchema), validateToken, insertWifi);
wifiRouter.get("/wifi", validateToken, getWifis);
wifiRouter.get("/wifi/:id", validateToken, validateIdParams, getWifiById);
wifiRouter.delete("/wifi/:id", validateToken, validateIdParams, deleteWifiById);

export default wifiRouter