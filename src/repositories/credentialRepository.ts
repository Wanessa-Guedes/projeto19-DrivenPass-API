import {prisma} from "../config/databse.js";
import { Credential } from "@prisma/client";

export type CreateCredentialData = Omit<Credential, "id" | "create_at"| "user_id">

async function insertCredential(credentialData: CreateCredentialData, userId: number){
    const credentials = await prisma.credential.create({data: {...credentialData, user_id: userId}});

    return credentials
}

async function checkUniqueTitle(credentialData: CreateCredentialData, userId: number) {
    const titleRegitered = await prisma.credential.findFirst({where: {
        title: {
            contains: credentialData.title, 
            mode: 'insensitive'
        }, 
        user_id: userId
    }})

    return titleRegitered
}

async function getAllCredentials( userId: number) {
    const credentials = await prisma.credential.findMany({
        where:{
            user_id: userId
        }
    })

    return credentials
}

async function getCredentialById(credentialId: number) {
    const credential = await prisma.credential.findUnique({where:
        {id: credentialId}
    })

    return credential
}

async function deleteCredentialById(credentialId: number) {
    const credential = await prisma.credential.delete({where:{
        id: credentialId
    }})

    return credential
}

export const credentialRepository = {
    insertCredential,
    checkUniqueTitle,
    getAllCredentials,
    getCredentialById,
    deleteCredentialById
}