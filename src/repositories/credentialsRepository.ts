import { prismadata } from '../config/database';
import { CredentialSent, UserPartial } from "../types/loginTypes";
import Cryptr from "cryptr"
import { Users } from '@prisma/client';


export async function checkCredential(userId: number, credentialData: CredentialSent) {

    const credential = await prismadata.credentials.findMany({ where: { userId, title: credentialData.title } })

    return credential
}

export async function checkToken(token: string) {

    const user: Users | any = await prismadata.users.findFirst({ where: { token } })
console.log(user)
    return user
}

export async function createNewCredential(userId: number, credentialData: CredentialSent, encryptedPassword: string) {

    await prismadata.credentials.create({
        data: {
            url: credentialData.url,
            name: credentialData.name,
            credentialPassword: encryptedPassword,
            title: credentialData.title,
            userId
        }
    })
}

export async function getCredential(userId:number, id:number) {

    const credential: Credential | any = await prismadata.credentials.findMany({ where:{id:id, userId:userId}})

    return credential
}

export async function deleteThisCredential(userId:number, id:number) {

    const credential: Credential | any = await prismadata.credentials.delete({ where:{id:id}})

    return credential
}
const credentiaRepository = {
    checkCredential, checkToken, createNewCredential, getCredential,deleteThisCredential
}

export default credentiaRepository