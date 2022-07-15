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

async function getNoteById(noteId: number) {
    const note = await prisma.note.findUnique({where:
        {id: noteId}
    })

    return note
}

async function deleteNoteById(noteId: number) {
    const note = await prisma.note.delete({where:{
        id: noteId
    }})

    return note
}

export const safeNotesRepository = {
    insertNote,
    checkUniqueTitle,
    getAllNotes,
    getNoteById,
    deleteNoteById
}