import { Users } from "@prisma/client";
import {prisma} from "../config/databse.js";

export type CreateUserData = Omit<Users, "id" | "create_at">

async function createUser(createUserData: CreateUserData) {
    await prisma.users.create({data: createUserData})
}

async function emailsRegistered(email: string) {
    const isEmailRegistered = prisma.users.findUnique({where: {email}})

    return isEmailRegistered
}


export const authRepository = {
    createUser,
    emailsRegistered
}