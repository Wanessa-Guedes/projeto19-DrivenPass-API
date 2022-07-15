import {prisma} from "../config/databse.js";
import { Credential } from "@prisma/client";

export type CreateCredentialData = Omit<Credential, "id" | "create_at"| "user_id" | "title">

async function insertCredential(){
    const credentials = await prisma.credential.insert({data: {}})
}


export const credentialRepository = {
    insertCredential
}