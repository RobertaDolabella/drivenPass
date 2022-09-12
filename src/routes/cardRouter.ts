import { Router } from 'express';
import { cardSchema } from '../schemas/cardSchema';
import { validateSchemaMiddleware } from '../middlewares/validateSchema';
import { createCards, getCard, deleteCards } from '../controllers/cardController';

const cardRouter= Router();

cardRouter.post('/cards',validateSchemaMiddleware(cardSchema), createCards);
cardRouter.get('/cards/:id',getCard);
cardRouter.delete('/cards/:id',deleteCards);

export default cardRouter;