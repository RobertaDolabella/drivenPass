import Joi from "joi";
import { WifiSent} from "../types/loginTypes";

export const wifiSchema = Joi.object<WifiSent>({
  wifiName: Joi.string().required(),
  wifiPassword: Joi.string().required(),
  title:Joi.string().required(),
  });
  
