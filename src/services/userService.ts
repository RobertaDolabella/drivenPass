import { prisma} from "@prisma/client";
import { prismadata } from "../config/database";
import { Ilogin, UserPartial } from "../types/loginTypes";
import dotenv from 'dotenv';
import  Cryptr from "cryptr"
import { checkEmail, logInAnUser, registerUser } from "../repositories/userRepository";
import { any, func, object, string } from "joi";
import jwt from "jsonwebtoken"


export async function isAnExistingEmail(email:string){

    const isAvailvable:any =  await checkEmail(email)

    return isAvailvable
}

export function isEmailAvailable(isAvailable:any){
    if(isAvailable!==null) throw {message: "This user already exist", code:400}
}

export async function registerUsers(userData:Ilogin){

   let {email, password} = userData
 
if(password.length<=10) throw {message: "This password is not valid", code: 401}

const encryptedSecutrityCode:string = criptPassword(password)

password = encryptedSecutrityCode
   
        registerUser({email, password}) 
}


function criptPassword(password:string){
    const cryptrPassword = new Cryptr ("passwordCrypt")
    const encryptedSecutrityCode: string = cryptrPassword.encrypt(password)

    return encryptedSecutrityCode
}

export function isEmailUnavailable(isAvailable:any){
    if(isAvailable===null) throw {message: "This user doens't exist", code:400}
}
export  function isPasswordCorrect(userData:Ilogin, userInfo:any) {

    const cryptrPassword = new Cryptr ("passwordCrypt")
    const decryptepassword: string = cryptrPassword.decrypt(userInfo.password)  
    
    if(decryptepassword!==userData.password) throw {message: "This password is not correct", code: 404}
}

export function createAToken(userInfo:any){

const token =  jwt.sign({id:userInfo.id}, "secretKey")

return token
}

export function updatingUser(token:string, email:string){

     logInAnUser(token, email)

}

const userServie = {
    registerUsers, isEmailAvailable,isAnExistingEmail,isEmailUnavailable,isPasswordCorrect,createAToken
}

export default userServie ;