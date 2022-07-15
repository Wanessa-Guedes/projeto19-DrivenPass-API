import { CreateCredentialData, credentialRepository } from "../repositories/credentialRepository.js"


async function insertCredential(credentialData: CreateCredentialData) {

    const credentials = await credentialRepository.insertCredential(credentialData)

    return credentials
    
}


export const credentialsService = {
    insertCredential
}