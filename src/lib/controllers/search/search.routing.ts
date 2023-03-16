import { Router} from 'express';
import { searchGlobal, searchCollection } from './search-controller';
import { commonMiddleware } from '../../middlewares';

const searchRouter: Router = Router();

searchRouter.get('/search', commonMiddleware, searchGlobal);
searchRouter.get('/search/:collection', commonMiddleware, searchCollection);

export default searchRouter;
