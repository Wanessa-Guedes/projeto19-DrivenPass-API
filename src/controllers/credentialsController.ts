import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

import { credentialsService } from "../services/credentialsService.js";
import { CreateCredentialData } from "../repositories/credentialRepository.js";

dotenv.config();

export async function insertCredential(req: Request, res: Response){
    
    const {userId, email} = res.locals.userInfo;

    const credentialData: CreateCredentialData = req.body;

    const credentials = await credentialsService.insertCredential(credentialData, userId);

    console.log(credentials)

    res.sendStatus(201);

}

export async function getCredentials(req: Request, res: Response) {
    //TODO: TESTAR AO INSERIR MAIS DE UM USUÁRIO
    const {userId, email} = res.locals.userInfo;

    const credentials = await credentialsService.getAllCredentials(userId)

    res.send({credentials}).status(200);
}

export async function getCredentialsById(req: Request, res: Response) {
      //TODO: TESTAR AO INSERIR MAIS DE UM USUÁRIO
        const {userId, email} = res.locals.userInfo;
        const {id} = res.locals.credentialId;

        const credential = await credentialsService.getCredentialById(id, userId)

        res.send({credential}).status(200)
}