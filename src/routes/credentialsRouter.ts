import { Router } from 'express';
import { credentialsSchema } from '../schemas/credentialsSchema'
import { validateSchemaMiddleware } from '../middlewares/validateSchema';
import {createCredentials, getCredentials, deleteCredentials} from '../controllers/credentialsController'

const credentialRouter = Router();

credentialRouter.post('/credentials',validateSchemaMiddleware(credentialsSchema), createCredentials);
credentialRouter.get('/credentials/:id',getCredentials);
credentialRouter.delete('/credentials/:id',deleteCredentials);

export default credentialRouter;
