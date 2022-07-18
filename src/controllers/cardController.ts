import { Request, Response } from "express";
import dotenv from "dotenv";

import { checkUserAuthorization } from "../utils/checkUserAuthorizationById.js";
import { CreateCardData } from "../repositories/cardRepository.js";
import { cardService } from "../services/cardServices.js";

dotenv.config();

export async function insertCard(req: Request, res: Response){
    
    const userId = res.locals.userInfo.userId;

    const type: string = req.body.type;

    if(type.toLowerCase() == "débito"){
        req.body.type = "debito"
    }
    if(type.toLowerCase() == "crédito"){
        req.body.type = "credito"
    }
    if(type.toLowerCase() == "ambos"){
        req.body.type = "ambos"
    }

    const cardData: CreateCardData = req.body;

    const cards = await cardService.insertCard(cardData, userId);

    res.sendStatus(201);

}

export async function getCards(req: Request, res: Response) {
    //TODO: TESTAR AO INSERIR MAIS DE UM USUÁRIO
    const userId = res.locals.userInfo.userId;

    const cards = await cardService.getAllCards(userId)

    res.send({cards}).status(200);
}

export async function getCardsById(req: Request, res: Response) {
      //TODO: TESTAR AO INSERIR MAIS DE UM USUÁRIO
        const {id} = res.locals.id;
        const userId = res.locals.userInfo.userId;

        const card = await cardService.getCardById(id);

        checkUserAuthorization.checkUserId(card.user_id, userId)

        res.send({card}).status(200)
}

export async function deleteCardById(req: Request, res: Response) {

    const {id} = res.locals.id;
    const userId = res.locals.userInfo.userId;

    const card = await cardService.getCardById(id)

    const result = checkUserAuthorization.checkUserId(card.user_id, userId)

    if(result == "ok"){
        await cardService.deleteCardById(id)
    }

    res.sendStatus(200)
    
} 