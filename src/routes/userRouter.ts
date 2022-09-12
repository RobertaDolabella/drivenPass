import { Router } from 'express';
import { signup, signin } from '../controllers/userController';
import { loginSchema } from '../schemas/loginSchema';
import { validateSchemaMiddleware } from '../middlewares/validateSchema';

const userRouter = Router();

userRouter.post('/signup',validateSchemaMiddleware(loginSchema), signup);
userRouter.post('/signin',validateSchemaMiddleware(loginSchema), signin);

export default userRouter;
