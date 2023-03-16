import { Router} from 'express';
import { search } from './search.controller';

const publicSearchRouter: Router = Router();

publicSearchRouter.get('/search/:lang',  search);

export default publicSearchRouter;
