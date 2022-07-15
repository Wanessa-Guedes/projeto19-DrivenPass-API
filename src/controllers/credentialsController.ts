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