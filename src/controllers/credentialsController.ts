import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

import { credentialsService } from "../services/credentialsService.js";
import { CreateCredentialData } from "../repositories/credentialRepository.js";

dotenv.config();

export async function insertCredential(req: Request, res: Response){
    //TODO: MIDDLEWARE PARA VERIFICAR SE FOI ENVIADO UM HEADER
    const authorization = req.headers.authorization;
    const token = authorization?.replace("Bearer ", "").trim();

    //ACHO QUE ISSO PODERIA IR PARA UM UTILS TALVEZ

    if(!token){
        throw {
            type: "unauthorized",
            message: "unauthorized"
        }
    }

    let error;
    const secretKey = process.env.JWT_SECRET;
    let userInfoToken;
    userInfoToken = jwt.verify(token, secretKey, function(err, decoded) {
        if (err){
            error = err;
        }
    }); 

    if(error){
        throw {
                type: "unauthorized", 
                message: "unauthorized"
        }
    } else {
        userInfoToken = jwt.verify(token, secretKey);
    }
    console.log(userInfoToken)
    // id -> email

    const credentialData: CreateCredentialData = req.body;

    const credentials = await credentialsService.insertCredential(credentialData)

    res.send(credentials).status(201);

}