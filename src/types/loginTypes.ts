import { types } from "joi"
import { Cards, Credentials, Notes, Users, Wifis } from "@prisma/client"

export interface Ilogin{
    email: string,
    password: string
}

export interface token{
    authorization?: string
}

export interface error{
    message:string,
    code:number
}

export type UserPartial = Partial<Users> 
export type UsersSent = Omit<Users, 'id'> 
export type CredentialsPartial = Partial<Credentials>
export type CredentialSent = Omit<Credentials, 'id'| 'userId'> 
export type NoteSent = Omit<Notes, 'id'|'userId'>
export type CardSent = Omit<Cards, 'id'|'userId'>
export type WifiSent = Omit<Wifis, 'id'|'userId'>