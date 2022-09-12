import { NextFunction, Request, Response } from 'express';
import {error} from "../types/loginTypes"

export function errorHandlerMiddleware(
  err: Error | {message:string,code:number},
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.message) {
    return res.send(err.message)
  }

  return res.sendStatus(401);
}

function errorTypeToStatusCode(errorType: string) {
  if (errorType === 'conflict') return 409;
  if (errorType === 'not_found') return 404;
  if (errorType === 'unauthorized') return 401;

  return 400;
}


