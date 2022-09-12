import { Router } from 'express';
import userRouter from './userRouter';
import credentialRouter from './credentialsRouter'
import notesRouter from './notesRouter';
import cardRouter from './cardRouter';
import wifiRouter from './wifiRouter';

const router = Router();
router.use(userRouter);
router.use(credentialRouter)
router.use(notesRouter)
router.use(cardRouter)
router.use(wifiRouter)

export default router;
