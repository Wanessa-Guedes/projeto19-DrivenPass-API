import Cryptr from "cryptr";
import { CreateCredentialData, credentialRepository } from "../repositories/credentialRepository.js"
import { CreateWifiData, wifiRepository } from "../repositories/wifiRepository.js";

const cryptr = new Cryptr(process.env.CRYPT_SECRET_KEY);

async function insertWifi(wifiData: CreateWifiData, userId: number) {

    const password = wifiData.password;
    
    const wifi = await wifiRepository.insertWifi({...wifiData, password: cryptr.encrypt(password)}, userId)

    return wifi
    
}

async function getAllWifis(userId: number){
    let wifis = await wifiRepository.getAllWifis(userId);

    wifis = wifis.map(wifi => {
        return {...wifi, password: cryptr.decrypt(wifi.password)}
    })    

    return wifis
}

async function getWifiById(wifiId: number) {
    let wifi = await wifiRepository.getWifiById(wifiId)

    if(!wifi){
        throw{
            type: "not_found",
            message: "Wifi data not found"
        }
    }

    wifi = {...wifi, password: cryptr.decrypt(wifi.password)}

    return wifi
}

async function deleteWifiById(credentialId: number) {
    
    const wifi = await wifiRepository.deleteWifiById(credentialId);

    if(!wifi){
        throw{
            type: "not_found",
            message: "Wifi data not found"
        }
    }
} 


export const wifiService = {
    insertWifi,
    getAllWifis,
    getWifiById,
    deleteWifiById
}