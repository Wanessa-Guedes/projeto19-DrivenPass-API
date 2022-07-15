import Cryptr from "cryptr";
import { cardRepository, CreateCardData } from "../repositories/cardRepository.js";
import { credentialRepository } from "../repositories/credentialRepository.js"

const cryptr = new Cryptr(process.env.CRYPT_SECRET_KEY);

async function insertCard(cardData: CreateCardData, userId: number) {

    const isTitleRegitered = await cardRepository.checkUniqueTitle(cardData, userId);
    if(isTitleRegitered){
        throw {
            type: "conflict",
            message: "Title already registered"
        }
    }

    const password = cardData.password;
    
    const cards = await cardRepository.insertCard({...cardData, password: cryptr.encrypt(password)}, userId)

    return cards
    
}

async function getAllCards(userId: number){
    let cards = await cardRepository.getAllCards(userId);

    cards = cards.map(card => {
        return {...card, password: cryptr.decrypt(card.password)}
    })    

    return cards
}

async function getCardById(cardId: number) {
    let card = await cardRepository.getCardById(cardId)

    if(!card){
        throw{
            type: "not_found",
            message: "Card not found"
        }
    }

    card = {...card, password: cryptr.decrypt(card.password)}

    return card
}

async function deleteCardById(cardId: number) {
    
    const card = await cardRepository.deleteCardById(cardId);

    if(!card){
        throw{
            type: "not_found",
            message: "Card not found"
        }
    }
}


export const cardService = {
    insertCard,
    getAllCards,
    getCardById,
    deleteCardById
}