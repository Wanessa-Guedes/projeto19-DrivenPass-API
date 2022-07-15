import {Router} from "express";

import { getNotes, getNotesById, insertNote } from "../controllers/safeNotesController.js";

import { validateIdParams } from "../middlewares/idParamsValidator.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { validateToken } from "../middlewares/tokenValidatorMiddleware.js";
import { safeNotesSchema } from "../schemas/safeNotesSchema.js";


const safeNotesRouter = Router();

safeNotesRouter.post("/notes", schemaValidator(safeNotesSchema), validateToken, insertNote);
safeNotesRouter.get("/notes", validateToken, getNotes);
safeNotesRouter.get("/notes/:id", validateToken, validateIdParams, getNotesById);
/*safeNotesRouter.delete("/notes/:id", validateToken, validateIdParams, deleteCredentialById); */

export default safeNotesRouter