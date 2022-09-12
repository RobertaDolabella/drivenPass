import { Request, Response } from 'express';
import { CredentialSent, token, UserPartial } from '../types/loginTypes';
import { create ,get, deleteCredential} from '../services/credentialsService';
import { any, string } from 'joi';
import { Users } from '@prisma/client';


export  async function createCredentials(req: Request, res: Response) {
  
  const credentialData: CredentialSent = req.body
  const {authorization}:any = req.headers 

 await create(authorization, credentialData)

  res.send("deu certo")
}

export async function getCredentials(req: Request, res: Response) {
const id:string = req.params.id
  const {authorization}:any = req.headers 


  const credential = await get(authorization, id)
  res.send(credential)
}

export async function deleteCredentials(req: Request, res: Response) {
  const id:string = req.params.id
    const {authorization}:any = req.headers 
  
  
    const credential = await deleteCredential(authorization, id)

    res.send("credential deleted")
  }

const credentials={
  createCredentials, getCredentials,deleteCredentials
}

export default credentials;