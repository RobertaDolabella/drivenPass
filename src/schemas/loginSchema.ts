import Joi from 'joi';
import { Ilogin } from '../types/loginTypes';

export const loginSchema= Joi.object<Ilogin>({
  email: Joi.string().required(),
  password: Joi.string().min(10).required()
});
