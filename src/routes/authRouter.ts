import {Router} from "express";

import { logOut, signIn, signUp } from "../controllers/authController.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { validateToken } from "../middlewares/tokenValidatorMiddleware.js";
import { authSchema } from "../schemas/authSchema.js";

const authRouter = Router();

authRouter.post("/signup", schemaValidator(authSchema) ,signUp);
authRouter.post("/signin", schemaValidator(authSchema), signIn);
authRouter.patch("/logout", validateToken, logOut)

export default authRouter