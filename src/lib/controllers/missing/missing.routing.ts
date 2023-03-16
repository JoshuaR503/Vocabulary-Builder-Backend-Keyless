import { Router} from 'express';
import { findAll, create} from './missing-controller';

const missingRouter: Router = Router();

missingRouter.get('/missing', findAll);
missingRouter.post('/missing', create);

export default missingRouter;
