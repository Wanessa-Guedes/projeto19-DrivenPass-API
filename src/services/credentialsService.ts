import Cryptr from "cryptr";
import { CreateCredentialData, credentialRepository } from "../repositories/credentialRepository.js"

const cryptr = new Cryptr(process.env.CRYPT_SECRET_KEY);

async function insertCredential(credentialData: CreateCredentialData, userId: number) {

    const isTitleRegitered = await credentialRepository.checkUniqueTitle(credentialData, userId);
    if(isTitleRegitered){
        throw {
            type: "conflict",
            message: "Title already registered"
        }
    }

    const password = credentialData.password;
    
    const credentials = await credentialRepository.insertCredential({...credentialData, password: cryptr.encrypt(password)}, userId)

    return credentials
    
}

async function getAllCredentials(userId: number){
    let credentials = await credentialRepository.getAllCredentials(userId);

    credentials = credentials.map(credential => {
        return {...credential, password: cryptr.decrypt(credential.password)}
    })    

    return credentials
}

async function getCredentialById(credentialId: number, userId: number) {
    let credential = await credentialRepository.getCredentialById(credentialId, userId)

    if(!credential){
        throw{
            type: "not_found",
            message: "Credential not found"
        }
    }

    credential = {...credential, password: cryptr.decrypt(credential.password)}

    return credential
}

export const credentialsService = {
    insertCredential,
    getAllCredentials,
    getCredentialById
}