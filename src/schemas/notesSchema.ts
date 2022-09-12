import Joi from "joi";
import { NoteSent } from "../types/loginTypes";

export const noteSchema = Joi.object<NoteSent>({
    title: Joi.string().max(50).required(),
    note: Joi.string().max(1000).required()
  });
  
 