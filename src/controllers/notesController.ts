import { Request, Response } from 'express';
import { NoteSent } from '../types/loginTypes';
import {create, get, getAll, deleteNote} from "../services/noteService"



export  async function createNotes(req: Request, res: Response) {
  
  const noteData: NoteSent = req.body
  const {authorization}:any = req.headers 

 await create(authorization, noteData)

  res.sendStatus(201)
}

export async function getNote(req: Request, res: Response) {
  const id:string|any = req.params.id
    const {authorization}:any = req.headers 
  
    const note = await getAll(authorization, id)
  
    res.send(note).status(200)
  }

export async function getNotes(req: Request, res: Response) {
const id:string|any = req.params.id
  const {authorization}:any = req.headers 

  const note = await get(authorization, id)

  res.send(note).status(200)
}

export async function deleteNotes(req: Request, res: Response) {
  const id:string = req.params.id
    const {authorization}:any = req.headers 
  
  
    const credential = await deleteNote(authorization, id)

    res.send("note deleted").status(200)
  }


const notes = {
    createNotes,getNotes,getNote, deleteNotes
}

export default notes;

