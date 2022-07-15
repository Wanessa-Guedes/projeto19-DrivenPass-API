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


export const credentialsService = {
    insertCredential
}