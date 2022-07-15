import {prisma} from "../config/databse.js";
import { Note } from "@prisma/client";

export type CreateNoteData = Omit<Note, "id" | "create_at"| "user_id">

async function insertNote(noteData: CreateNoteData, userId: number){
    const note = await prisma.note.create({data: {...noteData, user_id: userId}});

    return note
}

async function checkUniqueTitle(noteData: CreateNoteData, userId: number) {
    const titleRegitered = await prisma.note.findFirst({where: {
        title: noteData.title, 
        user_id: userId
    }})

    return titleRegitered
} 

async function getAllNotes( userId: number) {
    const notes = await prisma.note.findMany({
        where:{
            user_id: userId
        }
    })

    return notes
} 

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

export const safeNotesRepository = {
    insertNote,
    checkUniqueTitle,
    getAllNotes
/*  getCredentialById,
    deleteCredentialById */
}