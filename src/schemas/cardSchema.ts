import Joi from "joi";
import { CardSent} from "../types/loginTypes";

export const cardSchema = Joi.object<CardSent>({
  cardholderName: Joi.string().required(),
  cardNumber: Joi.string().length(19).required(),
  cvv: Joi.string().max(4).required(),
  expiraationDate: Joi.string().length(5).required(),
  cardPassword: Joi.string().length(4).required(),
  isVirual: Joi.boolean().required(),
  title:Joi.string().required(),
  });
  
