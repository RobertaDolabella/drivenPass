import { prismadata } from '../config/database';
import { WifiSent } from "../types/loginTypes";
import Cryptr from "cryptr"
import { Users, Wifis } from '@prisma/client';
import wifis from '../controllers/wifiController';


export async function checkWifi(userId: number, wifiData: WifiSent) {

    const wifi = await prismadata.wifis.findMany({ where: { userId, title: wifiData.title } })

    return wifi
}

export async function checkToken(token: string) {

    const user: Users | any = await prismadata.users.findFirst({ where: { token } })

    return user
}

export async function createNewWifi(userId: number, wifiData: WifiSent, encryptedPassword: string) {

    await prismadata.wifis.create({
        data: {
            wifiName: wifiData.wifiName,
            wifiPassword: encryptedPassword,
            title: wifiData.title,
            userId
        }
    })
}

export async function getWifi(userId:number, id:number) {

    const wifi: Wifis | any = await prismadata.wifis.findMany({ where:{id:id, userId:userId}})

    return wifi
}

export async function getWifis(userId:number) {

    const wifis: Wifis | any = await prismadata.wifis.findMany({ where:{userId:userId}})

    return wifis
}
export async function deleteThisWifi(userId:number, id:number) {

    const wifi: Wifis | any = await prismadata.wifis.delete({ where:{id:id}})

    return wifi
}
const wifiRepository = {
    checkWifi, checkToken, createNewWifi, getWifi,deleteThisWifi, getWifis
}

export default wifiRepository