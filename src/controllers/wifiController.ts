import { Request, Response } from "express";
import dotenv from "dotenv";

import { credentialsService } from "../services/credentialsService.js";
import { CreateCredentialData } from "../repositories/credentialRepository.js";
import { checkUserAuthorization } from "../utils/checkUserAuthorizationById.js";
import { CreateWifiData } from "../repositories/wifiRepository.js";
import { wifiService } from "../services/wifiServices.js";

dotenv.config();

export async function insertWifi(req: Request, res: Response){
    
    const {userId, email} = res.locals.userInfo;

    const wifiData: CreateWifiData = req.body;

    const wifi = await wifiService.insertWifi(wifiData, userId);

    console.log(wifi)

    res.sendStatus(201);

}

/* export async function getCredentials(req: Request, res: Response) {
    //TODO: TESTAR AO INSERIR MAIS DE UM USUÁRIO
    const {userId, email} = res.locals.userInfo;

    const credentials = await credentialsService.getAllCredentials(userId)

    res.send({credentials}).status(200);
} */

/* export async function getCredentialsById(req: Request, res: Response) {
      //TODO: TESTAR AO INSERIR MAIS DE UM USUÁRIO
        const {id} = res.locals.id;
        const {userId, email} = res.locals.userInfo;

        const credential = await credentialsService.getCredentialById(id);

        checkUserAuthorization.checkUserId(credential.user_id, userId)

        res.send({credential}).status(200)
} */

/* export async function deleteCredentialById(req: Request, res: Response) {

    const {id} = res.locals.id;
    const {userId, email} = res.locals.userInfo;

    const credential = await credentialsService.getCredentialById(id)

    const result = checkUserAuthorization.checkUserId(credential.user_id, userId)

    if(result == "ok"){
        await credentialsService.deleteCredentialById(id)
    }

    res.sendStatus(200)
    
} */