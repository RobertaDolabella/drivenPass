import { Router } from 'express';
import { getWifis, createWifis, deleteWifis,getWifi } from '../controllers/wifiController';
import { validateSchemaMiddleware } from '../middlewares/validateSchema';
import { wifiSchema } from '../schemas/wifiSchema';

const wifiRouter= Router();

wifiRouter.post('/wifis',validateSchemaMiddleware(wifiSchema), createWifis);
wifiRouter.get('/wifis/:id',getWifi);
wifiRouter.get('/wifis',getWifis);
wifiRouter.delete('/wifis/:id',deleteWifis);

export default wifiRouter;