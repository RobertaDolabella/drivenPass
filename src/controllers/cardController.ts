import { Request, Response } from 'express';
import { CardSent } from '../types/loginTypes';
import { create, get, deleteCard } from '../services/cardService';



export  async function createCards(req: Request, res: Response) {
  
  const cardData: CardSent = req.body
  const {authorization}:any = req.headers 

 await create(authorization, cardData)

 res.sendStatus(201)
}

export async function getCard(req: Request, res: Response) {
const id:string = req.params.id
  const {authorization}:any = req.headers 


  const card = await get(authorization, id)
  res.send(card).status(200)
}

export async function deleteCards(req: Request, res: Response) {
  const id:string = req.params.id
    const {authorization}:any = req.headers 
  
  
 await deleteCard(authorization, id)

    res.send("card deleted").status(200)
  }

const Card ={
  createCards, getCard
  ,deleteCards

}

export default Card
;
