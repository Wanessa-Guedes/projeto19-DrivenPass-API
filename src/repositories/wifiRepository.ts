import {prisma} from "../config/databse.js";
import { Credential, Wifi } from "@prisma/client";

export type CreateWifiData = Omit<Wifi, "id" | "create_at"| "user_id">

async function insertWifi(wifiData: CreateWifiData, userId: number){
    const wifis = await prisma.wifi.create({data: {...wifiData, user_id: userId}});

    return wifis
}

async function checkUniqueTitle(wifiData: CreateWifiData, userId: number) {
    const titleRegitered = await prisma.wifi.findFirst({where: {
        title: wifiData.title, 
        user_id: userId
    }})

    return titleRegitered
}

/* async function getAllCredentials( userId: number) {
    const credentials = await prisma.credential.findMany({
        where:{
            user_id: userId
        }
    })

    return credentials
} */

/* async function getCredentialById(credentialId: number) {
    const credential = await prisma.credential.findUnique({where:
        {id: credentialId}
    })

    return credential
} */

/* async function deleteCredentialById(credentialId: number) {
    const credential = await prisma.credential.delete({where:{
        id: credentialId
    }})

    return credential
} */

export const wifiRepository = {
    insertWifi,
    checkUniqueTitle,
/*     getAllCredentials,
    getCredentialById,
    deleteCredentialById */
}