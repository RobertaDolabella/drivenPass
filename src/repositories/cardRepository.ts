import { prismadata } from '../config/database';
import { CardSent } from "../types/loginTypes";
import Cryptr from "cryptr"
import { Cards, Users } from '@prisma/client';


export async function checkCard(userId: number, cardData: CardSent) {

    const card = await prismadata.cards.findMany({ where: { userId, title: cardData.title } })

    return card
}

export async function checkToken(token: string) {

    const user: Users | any = await prismadata.users.findFirst({ where: { token } })

    return user
}

export async function createNewCard(userId: number, cardData: CardSent, encryptedPassword: string, encryptedCvv: string) {

    await prismadata.cards.create({
        data: {
            cardholderName: cardData.cardholderName,
            cardNumber:cardData.cardNumber,
            cvv:encryptedCvv,
            expiraationDate: cardData.expiraationDate,
            cardPassword: encryptedPassword,
            isVirual:cardData.isVirual,
            title: cardData.title,
            userId
        }
    })
}

export async function getCard(userId: number, id: number) {

    const card: Cards | any = await prismadata.cards.findMany({ where: { id: id, userId: userId } })

    return card
}

export async function deleteThisCard(userId: number, id: number) {

    const card: Cards | any = await prismadata.cards.delete({ where: { id: id } })

    return card
}
const credentiaRepository = {
    checkCard, checkToken, createNewCard, getCard, deleteThisCard
}

export default credentiaRepository