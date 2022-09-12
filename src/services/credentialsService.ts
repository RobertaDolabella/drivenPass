import { prisma, Users } from "@prisma/client";
import { prismadata } from "../config/database";
import { CredentialSent, token, UserPartial, UsersSent } from "../types/loginTypes";
import dotenv from 'dotenv';
import Cryptr from "cryptr"
import jwt from "jsonwebtoken"
import { checkToken, checkCredential, createNewCredential, getCredential, deleteThisCredential } from "../repositories/credentialsRepository";


export async function create(authorization: any, credentialData: CredentialSent) {

    const token = authorization?.replace("Baerer ", "")

    console.log(credentialData)
    const user: number | any = await checkToken(token)
    isTokenActivate(user)
    const userId = user.id
    await thereIsOtherCredential(userId, credentialData)

    const encryptedPassword: string = encryptPassword(credentialData.credentialPassword)

    await createCredential(userId, credentialData, encryptedPassword)

}


export async function get(authorization: any, id: string) {

    const idCredential: number = Number(id)
    const token = authorization?.replace("Baerer ", "")

    const user: number | any = await checkToken(token)
    isTokenActivate(user)
    const userId = user.id
    const credential = await getCredential(userId, idCredential)

    thereIsACredential(credential)    

    return credential

}


export async function deleteCredential(authorization: any, id: string) {

    const idCredential: number = Number(id)
    const token = authorization?.replace("Baerer ", "")

    const user: number | any = await checkToken(token)
    isTokenActivate(user)
    const userId = user.id
    const credential = await getCredential(userId, idCredential)
    thereIsACredential(credential)    
    const deletecredential = await deleteThisCredential(userId, idCredential)



    return credential

}



export function isTokenActivate(user: Users | any) {
    console.log(user)
    if (user === null) throw { message: "The user may not be logged in or is not available", code: 404 }

}

export async function thereIsOtherCredential(userId: number, credentialData: CredentialSent) {

    const credential: Credential | any = await checkCredential(userId, credentialData)

    isTheOnlyTitle(credential)

    return
}
function isTheOnlyTitle(credential: any) {

    if (credential.length >= 1) throw { message: "This title has already been used, please choose a new title", code: 404 }
}


export function encryptPassword(password: string) {
    console.log(password)
    const cryptrCredentialPassword = new Cryptr("passwordCrypt")
    const encryptedCredentialPassword: string = cryptrCredentialPassword.encrypt(password)

    return encryptedCredentialPassword
}

export async function createCredential(userId: number, credentialData: CredentialSent, encryptedPassword: string) {
    console.log(userId, credentialData, encryptedPassword)
    await createNewCredential(userId, credentialData, encryptedPassword)
}
function thereIsACredential(credential: any) {

    if (credential.length < 1) throw { message: "There is no credentials matching with this id for your user", code: 404 }
}

const credential = {
    create, get,deleteCredential
}

export default credential