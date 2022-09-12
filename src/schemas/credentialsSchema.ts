import Joi from 'joi';
import { CredentialSent } from '../types/loginTypes';

export const credentialsSchema= Joi.object<CredentialSent>({
    url: Joi.required(),
  name: Joi.string().required(),
  credentialPassword:Joi.string().min(10).required(),
  title:Joi.string().required().max(50),

});
