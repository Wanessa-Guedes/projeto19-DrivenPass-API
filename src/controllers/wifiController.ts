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

    res.sendStatus(201);

}

export async function getWifis(req: Request, res: Response) {
    //TODO: TESTAR AO INSERIR MAIS DE UM USUÁRIO
    const {userId, email} = res.locals.userInfo;

    const wifis = await wifiService.getAllWifis(userId)

    res.send({wifis}).status(200);
}

export async function getWifiById(req: Request, res: Response) {
      //TODO: TESTAR AO INSERIR MAIS DE UM USUÁRIO
        const {id} = res.locals.id;
        const {userId, email} = res.locals.userInfo;

        const wifi = await wifiService.getWifiById(id);

        checkUserAuthorization.checkUserId(wifi.user_id, userId)

        res.send({wifi}).status(200)
}

export async function deleteWifiById(req: Request, res: Response) {

    const {id} = res.locals.id;
    const {userId, email} = res.locals.userInfo;

    const wifi = await wifiService.getWifiById(id)

    const result = checkUserAuthorization.checkUserId(wifi.user_id, userId)

    if(result == "ok"){
        await wifiService.deleteWifiById(id)
    }

    res.sendStatus(200)
    
}