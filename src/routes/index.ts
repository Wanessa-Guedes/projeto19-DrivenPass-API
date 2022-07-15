import { Router } from "express";

import authRouter from "./authRouter.js";
import cardsRouter from "./cardsRouter.js";
import credentialsRouter from "./credentialsRouter.js";
import safeNotesRouter from "./safeNotesRouter.js";
import wifiRouter from "./wifiRouter.js";

const router = Router();
router.use(authRouter)
router.use(credentialsRouter)
router.use(safeNotesRouter)
router.use(cardsRouter)
router.use(wifiRouter)

export default router;