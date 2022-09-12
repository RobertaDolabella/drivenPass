import { Request, Response } from 'express';
import { WifiSent } from '../types/loginTypes';
import { create ,get, deleteWifi, getAll} from '../services/wifiService';



export  async function createWifis(req: Request, res: Response) {
  
  const wifiData: WifiSent = req.body
  const {authorization}:any = req.headers 

 await create(authorization, wifiData)

  res.sendStatus(201)
}

export async function getWifi(req: Request, res: Response) {
const id:string = req.params.id
  const {authorization}:any = req.headers 


  const wifi = await get(authorization, id)
  res.send(wifi).status(200)
}

export async function getWifis(req: Request, res: Response) {

    const {authorization}:any = req.headers 
  
    const wifi = await getAll(authorization)
  
    res.send(wifi).status(200)
  }

export async function deleteWifis(req: Request, res: Response) {
  const id:string = req.params.id
    const {authorization}:any = req.headers 
  
  
    const wifi = await deleteWifi(authorization, id)

    res.send("wifi deleted").status(200)
  }

const wifis={
  createWifis, getWifis,deleteWifis, getWifi
}

export default wifis;
