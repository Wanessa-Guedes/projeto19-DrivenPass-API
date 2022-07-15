import Cryptr from "cryptr";
import { CreateCredentialData, credentialRepository } from "../repositories/credentialRepository.js"
import { CreateWifiData, wifiRepository } from "../repositories/wifiRepository.js";

const cryptr = new Cryptr(process.env.CRYPT_SECRET_KEY);

async function insertWifi(wifiData: CreateWifiData, userId: number) {

    const isTitleRegitered = await wifiRepository.checkUniqueTitle(wifiData, userId);
    if(isTitleRegitered){
        throw {
            type: "conflict",
            message: "Title already registered"
        }
    }

    const password = wifiData.password;
    
    const wifi = await wifiRepository.insertWifi({...wifiData, password: cryptr.encrypt(password)}, userId)

    return wifi
    
}

/* async function getAllCredentials(userId: number){
    let credentials = await credentialRepository.getAllCredentials(userId);

    credentials = credentials.map(credential => {
        return {...credential, password: cryptr.decrypt(credential.password)}
    })    

    return credentials
} */

/* async function getCredentialById(credentialId: number) {
    let credential = await credentialRepository.getCredentialById(credentialId)

    if(!credential){
        throw{
            type: "not_found",
            message: "Credential not found"
        }
    }

    credential = {...credential, password: cryptr.decrypt(credential.password)}

    return credential
} */

/* async function deleteCredentialById(credentialId: number) {
    
    const credential = await credentialRepository.deleteCredentialById(credentialId);

    if(!credential){
        throw{
            type: "not_found",
            message: "Credential not found"
        }
    }
} */


export const wifiService = {
    insertWifi,
/*     getAllCredentials,
    getCredentialById,
    deleteCredentialById */
}