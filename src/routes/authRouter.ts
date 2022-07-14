import {Router} from "express";

import { signIn, signUp } from "../controllers/authController.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { authSchema } from "../schemas/authSchema.js";

const authRouter = Router();

authRouter.post("/signup", schemaValidator(authSchema) ,signUp);
authRouter.post("/signin", schemaValidator(authSchema), signIn);

export default authRouter