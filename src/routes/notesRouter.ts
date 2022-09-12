import { Router } from 'express';
import { noteSchema } from '../schemas/notesSchema';
import { validateSchemaMiddleware } from '../middlewares/validateSchema';
import {createNotes, getNote, getNotes, deleteNotes} from '../controllers/notesController'
const notesRouter = Router();

notesRouter.post('/notes',validateSchemaMiddleware(noteSchema), createNotes);
notesRouter.get('/notes',getNote);
notesRouter.get('/notes/:id',getNotes);
notesRouter.delete('/notes/:id',deleteNotes);

export default notesRouter;