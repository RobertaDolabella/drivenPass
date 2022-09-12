import { Cards, prisma, Users } from "@prisma/client";
import { prismadata } from "../config/database";
import { CardSent } from "../types/loginTypes";
import dotenv from 'dotenv';
import Cryptr from "cryptr"
import {createNewCard, checkToken, getCard, deleteThisCard, checkCard} from "../repositories/cardRepository"
import dayjs from "dayjs";

export async function create(authorization: any, cardData: CardSent) {

    const token = authorization?.replace("Baerer ", "")

    console.log(cardData)
    const user: number | any = await checkToken(token)
    isTokenActivate(user)
    const userId = user.id
    await thereIsOtherCard(userId, cardData)

    const encryptedPassword: string = encryptPassword(cardData.cardPassword)
    const encryptedCvv: string = encryptCvv(cardData.cvv)
    checkDateFormat(cardData.expiraationDate)

    await createCard(userId, cardData, encryptedPassword,encryptedCvv)

}


export async function get(authorization: any, id: string) {

    const idCard: number = Number(id)
    const token = authorization?.replace("Baerer ", "")

    const user: number | any = await checkToken(token)
    isTokenActivate(user)
    const userId = user.id
    const card = await getCard(userId, idCard)

    thereIsACard(card)    

    return card

}


export async function deleteCard(authorization: any, id: string) {

    const idcard: number = Number(id)
    const token = authorization?.replace("Baerer ", "")

    const user: number | any = await checkToken(token)
    isTokenActivate(user)
    const userId = user.id
    const card = await getCard(userId, idcard)
    thereIsACard(card)    
    const deletecard = await deleteThisCard(userId, idcard)

    return card

}



export function isTokenActivate(user: Users | any) {
    console.log(user)
    if (user === null) throw { message: "The user may not be logged in or is not available", code: 404 }

}

export async function thereIsOtherCard(userId: number, cardData: CardSent) {

    const card: Cards | any = await checkCard(userId, cardData)

    isTheOnlyTitle(card)

    return
}
function isTheOnlyTitle(card: any) {

    if (card.length >= 1) throw { message: "This title has already been used, please choose a new title", code: 404 }
}


export function encryptPassword(password: string) {
    console.log(password)
    const cryptrcardPassword = new Cryptr("passwordCrypt")
    const encryptedcardPassword: string = cryptrcardPassword.encrypt(password)

    return encryptedcardPassword
}

export function encryptCvv(cvv: string) {

    const cryptrcardCvv = new Cryptr("passwordCrypt")
    const encryptedcardCvv: string = cryptrcardCvv.encrypt(cvv)

    return encryptedcardCvv
}

function checkDateFormat(date: string) {
const dateMonth: number = Number(dayjs().format("MM"))
const dateYear: number = Number(dayjs().format("YYYY"))
console.log(dateMonth, dateYear)

const month = Number(date.slice(0,2))
const year = Number(date.slice(3,5))
console.log(month, year)


if(typeof(month)==null || typeof(year)==null )throw { message: "Please, inform a valid date", code: 404 }
if(year<dateYear-2000)throw { message: "Your card expirated", code: 404 }
if(year===dateYear-2000 && month<dateMonth)throw { message: "Your card expirated", code: 404 }

}

export async function createCard(userId: number, cardData: CardSent, encryptedPassword: string, encryptedCvv: string) {
    console.log(userId, cardData, encryptedPassword)
    await createNewCard(userId, cardData, encryptedPassword, encryptedCvv)
}
function thereIsACard(card: any) {

    if (card.length < 1) throw { message: "There is no cards matching with this id for your user", code: 404 }
}

const card = {
    create, get,deleteCard
}

export default card