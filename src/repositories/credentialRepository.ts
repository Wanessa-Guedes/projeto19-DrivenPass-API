import {prisma} from "../config/databse.js";
import { Credential } from "@prisma/client";

export type CreateCredentialData = Omit<Credential, "id" | "create_at"| "user_id">

async function insertCredential(credentialData: CreateCredentialData, userId: number){
    const credentials = await prisma.credential.create({data: {...credentialData, user_id: userId}});

    return credentials
}

async function checkUniqueTitle(credentialData: CreateCredentialData, userId: number) {
    const titleRegitered = await prisma.credential.findFirst({where: {
        title: credentialData.title, 
        user_id: userId
    }})

    return titleRegitered
}


export const credentialRepository = {
    insertCredential,
    checkUniqueTitle
}