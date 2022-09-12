import { Notes, prisma, Users, Wifis } from "@prisma/client";
import { WifiSent } from "../types/loginTypes";
import dotenv from 'dotenv';
import Cryptr from "cryptr"
import { checkWifi, checkToken, createNewWifi, deleteThisWifi, getWifis, getWifi } from "../repositories/wifiRepository"
import { createNotes} from "../controllers/notesController";
import { AnyRecord } from "dns";

export async function create(authorization: any, wifiData: WifiSent) {

    const token = authorization?.replace("Baerer ", "")

    console.log(wifiData)
    const user: number | any = await checkToken(token)
    isTokenActivate(user)
    const userId = user.id
    await thereIsOtherWifi(userId, wifiData)
    const encryptedPassword: string = encryptPassword(wifiData.wifiPassword)
    await createWifi(userId, wifiData, encryptedPassword)

}


export async function get(authorization: any, id: string) {

    const idWifi: number|any = Number(id)
    const token = authorization?.replace("Baerer ", "")

    const user: number | any = await checkToken(token)
    isTokenActivate(user)
    const userId = user.id
    const Wifi:Wifis|any = await getWifi(userId, idWifi)
    thereIsAWifi(Wifi)    
    return Wifi

}
export async function getAll(authorization: any) {

    const token = authorization?.replace("Baerer ", "")

    const user: number | any = await checkToken(token)
    isTokenActivate(user)
    const userId = user.id
    const wifi:Wifis|AnyRecord = await getWifis(userId)
    thereIsAWifi(wifi)    
    return wifi

}

export async function deleteWifi(authorization: any, id: string) {

    const idWifi: number = Number(id)
    const token = authorization?.replace("Baerer ", "")

    const user: number | any = await checkToken(token)
    isTokenActivate(user)
    const userId = user.id
    const Wifi = await getWifi(userId, idWifi)
    thereIsAWifi(Wifi)    
   await deleteThisWifi(userId, idWifi)

    return 

}



export function isTokenActivate(user: Users | any) {
    console.log(user)
    if (user === null) throw { message: "The user may not be logged in or is not available", code: 404 }

}

export async function thereIsOtherWifi(userId: number, wifiData: WifiSent) {

    const wifi: Wifis | any = await checkWifi(userId, wifiData)

    isTheOnlyTitle(wifi)

    return
}
function isTheOnlyTitle(credential: any) {

    if (credential.length >= 1) throw { message: "This title has already been used, please choose a new title", code: 404 }
}

export function encryptPassword(password: string) {

    const cryptrcardPassword = new Cryptr("passwordCrypt")
    const encryptedcardPassword: string = cryptrcardPassword.encrypt(password)

    return encryptedcardPassword
}


export async function createWifi(userId: number, wifiData: WifiSent, encryptedPassword:string) {
    console.log(userId, wifiData)
    await createNewWifi(userId, wifiData, encryptedPassword)
}
function thereIsAWifi(credential: any) {

    if (credential.length < 1) throw { message: "There is no credentials matching with this id for your user", code: 404 }
}


const wifis = {
    create, get, getAll, deleteWifi

}

export default wifis