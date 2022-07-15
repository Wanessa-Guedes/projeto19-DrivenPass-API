import { Request, Response } from "express";
import dotenv from "dotenv";

import { credentialsService } from "../services/credentialsService.js";
import { CreateCredentialData } from "../repositories/credentialRepository.js";
import { checkUserAuthorization } from "../utils/checkUserAuthorizationById.js";
import { CreateCardData } from "../repositories/cardRepository.js";
import { cardService } from "../services/cardServices.js";

dotenv.config();

export async function insertCard(req: Request, res: Response){
    
    const {userId, email} = res.locals.userInfo;

    const type: string = req.body.type;

    if(type == "débito"){
        req.body.type = "debito"
    }
    if(type == "crédito"){
        req.body.type = "credito"
    }

    const cardData: CreateCardData = req.body;

    const cards = await cardService.insertCard(cardData, userId);

    console.log(cards)

    res.sendStatus(201);

}

export async function getCards(req: Request, res: Response) {
    //TODO: TESTAR AO INSERIR MAIS DE UM USUÁRIO
    const {userId, email} = res.locals.userInfo;

    const cards = await cardService.getAllCards(userId)

    res.send({cards}).status(200);
}

export async function getCardsById(req: Request, res: Response) {
      //TODO: TESTAR AO INSERIR MAIS DE UM USUÁRIO
        const {id} = res.locals.id;
        const {userId, email} = res.locals.userInfo;

        const card = await cardService.getCardById(id);

        checkUserAuthorization.checkUserId(card.user_id, userId)

        res.send({card}).status(200)
}

export async function deleteCardById(req: Request, res: Response) {

    const {id} = res.locals.id;
    const {userId, email} = res.locals.userInfo;

    const card = await cardService.getCardById(id)

    const result = checkUserAuthorization.checkUserId(card.user_id, userId)

    if(result == "ok"){
        await cardService.deleteCardById(id)
    }

    res.sendStatus(200)
    
} 