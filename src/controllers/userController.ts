import { Request, Response } from 'express';
import { Ilogin, UserPartial, UsersSent } from '../types/loginTypes';
import { registerUsers, isEmailAvailable, isAnExistingEmail, isEmailUnavailable, isPasswordCorrect, createAToken, updatingUser } from '../services/userService';
import { any } from 'joi';
import { Users } from '@prisma/client';
export async function signup(req: Request, res: Response) {
  const { email, password }: Ilogin = req.body


  const isAvailable: any = await isAnExistingEmail(email)

  isEmailAvailable(isAvailable)
  await registerUsers({ email, password })

  res.sendStatus(201)
}


export async function signin(req: Request, res: Response) {

  const userData: UsersSent = req.body

  const userInfo: any = await isAnExistingEmail(userData.email)

  isEmailUnavailable(userInfo)
  isPasswordCorrect(userData, userInfo)
  const token = createAToken(userInfo)
  updatingUser(token, userData.email)
  res.send(token).status(201)
}