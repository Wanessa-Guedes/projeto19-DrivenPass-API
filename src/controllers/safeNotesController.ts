import { Request, Response } from "express";
import dotenv from "dotenv";
import { CreateNoteData } from "../repositories/safeNotesRepository.js";
import { safeNotesService } from "../services/safeNotesService.js";
import { checkUserAuthorization } from "../utils/checkUserAuthorizationById.js";

dotenv.config();

export async function insertNote(req: Request, res: Response){
    
    const userId = res.locals.userInfo.userId;

    const noteData: CreateNoteData = req.body;

    const note = await safeNotesService.insertNote(noteData, userId);

    res.sendStatus(201);

}

export async function getNotes(req: Request, res: Response) {
    //TODO: TESTAR AO INSERIR MAIS DE UM USUÁRIO
    const userId = res.locals.userInfo.userId;

    const notes = await safeNotesService.getAllNotes(userId)

    res.send({notes}).status(200);
}

export async function getNotesById(req: Request, res: Response) {
      //TODO: TESTAR AO INSERIR MAIS DE UM USUÁRIO
        const {id} = res.locals.id;
        const userId = res.locals.userInfo.userId;

        const note = await safeNotesService.getNoteById(id);

        checkUserAuthorization.checkUserId(note.user_id, userId)

        res.send({note}).status(200)
}

export async function deleteNoteById(req: Request, res: Response) {

    const {id} = res.locals.id;
    const userId = res.locals.userInfo.userId;

    const note = await safeNotesService.getNoteById(id)

    const result = checkUserAuthorization.checkUserId(note.user_id, userId)

    if(result == "ok"){
        await safeNotesService.deletenoteById(id)
    }

    res.sendStatus(200)
    
}