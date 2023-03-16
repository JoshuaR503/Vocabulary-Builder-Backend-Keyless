import { Router} from 'express';
import WordController from './word.controller';

import { 
    commonMiddleware, 
    upperMiddleware 
} from '../../middlewares';

const controller: WordController = new WordController;
const wordsRouter: Router = Router();

// Routes without middleware.
wordsRouter.get('/word/count', controller.countAll);
wordsRouter.get('/word/count/category', controller.countPerCategory);
wordsRouter.get('/word/count/level', controller.countPerLevel);

// Routes with middleware.
wordsRouter.get('/word', commonMiddleware, controller.findAll);
wordsRouter.get('/word/:id', commonMiddleware, controller.findOne);

wordsRouter.post('/word', commonMiddleware, controller.create);

wordsRouter.put('/word/:id', commonMiddleware, controller.update);
wordsRouter.put('/word/:id/audio', commonMiddleware, controller.updateAudio);

wordsRouter.delete('/word/:id', upperMiddleware, controller.delete);

// This is not meant to be used in production!!!
// wordsRouter.delete('/word', upperMiddleware, controller.deleteMany);

export default wordsRouter;
