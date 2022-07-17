import {prisma} from "../config/databse.js";
import { Card } from "@prisma/client";

export type CreateCardData = Omit<Card, "id" | "create_at"| "user_id">

async function insertCard(cardData: CreateCardData, userId: number){
    const card = await prisma.card.create({data: {...cardData, user_id: userId}});

    return card
}

async function checkUniqueTitle(cardData: CreateCardData, userId: number) {
    const titleRegitered = await prisma.card.findFirst({where: {
        title: {
            contains: cardData.title, 
            mode: 'insensitive'
        },
        user_id: userId
    }})

    return titleRegitered
}

async function getAllCards( userId: number) {
    const cards = await prisma.card.findMany({
        where:{
            user_id: userId
        }
    })

    return cards
}

async function getCardById(cardId: number) {
    const card = await prisma.card.findUnique({where:
        {id: cardId}
    })

    return card
}

async function deleteCardById(cardId: number) {
    const card = await prisma.card.delete({where:{
        id: cardId
    }})

    return card
}

export const cardRepository = {
    insertCard,
    checkUniqueTitle,
    getAllCards,
    getCardById,
    deleteCardById
}