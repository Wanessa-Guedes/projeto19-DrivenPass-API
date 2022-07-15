import Cryptr from "cryptr";
import { credentialRepository } from "../repositories/credentialRepository.js"
import { CreateNoteData, safeNotesRepository } from "../repositories/safeNotesRepository.js";

const cryptr = new Cryptr(process.env.CRYPT_SECRET_KEY);

async function insertNote(noteData: CreateNoteData, userId: number) {

    const isTitleRegitered = await safeNotesRepository.checkUniqueTitle(noteData, userId);
    if(isTitleRegitered){
        throw {
            type: "conflict",
            message: "Title already registered"
        }
    }

    const note = await safeNotesRepository.insertNote(noteData, userId)

    return note
    
}

async function getAllNotes(userId: number){
    const notes = await safeNotesRepository.getAllNotes(userId);

    return notes
}

async function getNoteById(noteId: number) {
    const note = await safeNotesRepository.getNoteById(noteId)

    if(!note){
        throw{
            type: "not_found",
            message: "Safe Note not found"
        }
    }

    return note
}
/*
async function deleteCredentialById(credentialId: number) {
    
    const credential = await credentialRepository.deleteCredentialById(credentialId);

    if(!credential){
        throw{
            type: "not_found",
            message: "Credential not found"
        }
    }
} */


export const safeNotesService = {
        insertNote,
        getAllNotes,
        getNoteById
/*     deleteCredentialById */
}