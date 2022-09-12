import { prisma } from "@prisma/client";
import { string } from "joi";
import { prismadata } from '../config/database';
import { Ilogin } from "../types/loginTypes";


export async function checkEmail(email:string) {
    const isAvailable = await prismadata.users.findUnique({where:{email}})

    return isAvailable
    
}

export async function registerUser({email, password}:Ilogin) {

 const user =  await prismadata.users.create({data:{ email,password}})

}

export async function logInAnUser(token:string, email:string) {
    
    await prismadata.users.update({where:{
        email}, data:{token}
    })
}
