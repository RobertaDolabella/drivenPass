import { Notes, prisma, Users } from "@prisma/client";
import { CredentialSent, NoteSent, token, UserPartial, UsersSent } from "../types/loginTypes";
import dotenv from 'dotenv';
import Cryptr from "cryptr"
import { checkNote, checkToken, createNewNote, deleteThisNote, getNotes, getNote } from "../repositories/noteRepository";
import { createNotes} from "../controllers/notesController";
import { AnyRecord } from "dns";

export async function create(authorization: any, noteData: NoteSent) {

    const token = authorization?.replace("Baerer ", "")

    console.log(noteData)
    const user: number | any = await checkToken(token)
    isTokenActivate(user)
    const userId = user.id
    await thereIsOtherNote(userId, noteData)

    await createNote(userId, noteData)

}


export async function get(authorization: any, id: string) {

    const idNote: number|any = Number(id)
    const token = authorization?.replace("Baerer ", "")

    const user: number | any = await checkToken(token)
    isTokenActivate(user)
    const userId = user.id
    const note:Notes|any = await getNote(userId, idNote)
    thereIsANote(note)    
    return note

}
export async function getAll(authorization: any, id: string) {

    const idNote: number|any = Number(id)
    const token = authorization?.replace("Baerer ", "")

    const user: number | any = await checkToken(token)
    isTokenActivate(user)
    const userId = user.id
    const note:Notes|AnyRecord = await getNotes(userId, idNote)
    thereIsANote(note)    
    return note

}

export async function deleteNote(authorization: any, id: string) {

    const idNote: number = Number(id)
    const token = authorization?.replace("Baerer ", "")

    const user: number | any = await checkToken(token)
    isTokenActivate(user)
    const userId = user.id
    const note = await getNotes(userId, idNote)
    thereIsANote(note)    
   await deleteThisNote(userId, idNote)

    return 

}



export function isTokenActivate(user: Users | any) {
    console.log(user)
    if (user === null) throw { message: "The user may not be logged in or is not available", code: 404 }

}

export async function thereIsOtherNote(userId: number, noteData: NoteSent) {

    const credential: Credential | any = await checkNote(userId, noteData)

    isTheOnlyTitle(credential)

    return
}
function isTheOnlyTitle(credential: any) {

    if (credential.length >= 1) throw { message: "This title has already been used, please choose a new title", code: 404 }
}



export async function createNote(userId: number, noteData: NoteSent) {
    console.log(userId, noteData)
    await createNewNote(userId, noteData)
}
function thereIsANote(credential: any) {

    if (credential.length < 1) throw { message: "There is no credentials matching with this id for your user", code: 404 }
}


const notes = {
    create, get, getAll, deleteNote

}

export default notes