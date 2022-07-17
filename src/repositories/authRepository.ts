import { Users } from "@prisma/client";
import {prisma} from "../config/databse.js";

export type CreateUserData = Omit<Users, "id" | "create_at">

async function createUser(createUserData: CreateUserData) {
    await prisma.users.create({data: createUserData})
}

async function emailsRegistered(email: string) {
    const isEmailRegistered = await prisma.users.findUnique({where: {email}})

    return isEmailRegistered
}

async function startSession(token: string, userId: number) {

    await prisma.session.create({data: {token, user_id: userId}})

}

async function isValidSession(token: string, userId: number) {
    const session = await prisma.session.findFirst({where: {token, user_id: userId}})
    if(!session){
        throw{
            type: "unauthorized", 
            message: "Not a valid session"
        }
    }

    return session
}

async function finishSession(sessionId: number) {
    const session = await prisma.session.update({where: {id: sessionId},
    data:{is_on: false}})

    return session
}

export const authRepository = {
    createUser,
    emailsRegistered,
    startSession,
    isValidSession,
    finishSession
}