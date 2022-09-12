import { prismadata } from '../config/database';
import {  NoteSent } from "../types/loginTypes";
import Cryptr from "cryptr"
import { Notes, Users } from '@prisma/client';


export async function checkNote(userId: number, noteData: NoteSent) {

    const note = await prismadata.notes.findMany({ where: { userId, title: noteData.title } })

    return note
}

export async function checkToken(token: string) {

    const user: Users | any = await prismadata.users.findFirst({ where: { token } })

    return user
}

export async function createNewNote(userId: number, noteData: NoteSent) {

    await prismadata.notes.create({
        data: {
            title: noteData.title,
            note: noteData.note,
            userId
        }
    })
}

export async function getNote(userId:number, id:number) {

    const note: Notes | any = await prismadata.notes.findMany({ where:{userId:userId, id:id}})

    return note
}

export async function getNotes(userId:number, id:number) {

    const note: Notes | any = await prismadata.notes.findMany({ where:{userId:userId}})

    return note
}

export async function deleteThisNote(userId:number, id:number) {

    const note: Notes | any = await prismadata.notes.delete({ where:{id:id}})

    return note
}
const credentiaRepository = {
    checkNote, checkToken, createNewNote, getNotes,getNote, deleteThisNote
}

export default credentiaRepository