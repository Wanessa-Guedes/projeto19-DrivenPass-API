import {Router} from "express";
import { deleteCardById, getCards, getCardsById, insertCard } from "../controllers/cardController.js";
import { validateIdParams } from "../middlewares/idParamsValidator.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import { validateToken } from "../middlewares/tokenValidatorMiddleware.js";
import { cardSchema } from "../schemas/cardSchema.js";

const cardsRouter = Router();

cardsRouter.post("/cards", schemaValidator(cardSchema), validateToken, insertCard);
cardsRouter.get("/cards", validateToken, getCards);
cardsRouter.get("/cards/:id", validateToken, validateIdParams,getCardsById);
cardsRouter.delete("/cards/:id", validateToken, validateIdParams, deleteCardById);

export default cardsRouter