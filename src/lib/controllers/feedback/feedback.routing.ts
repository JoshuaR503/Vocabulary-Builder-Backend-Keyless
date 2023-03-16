import { Router} from 'express';
import { findAll, findOne, create, deleteOne,} from './feedback.controller';
import { upperMiddleware, rateLimitMiddleware } from '../../middlewares';

const router: Router = Router();

// Routes without permission middleware.
router.post('/feedback', rateLimitMiddleware, create);

// Routes with middleware.
router.get('/feedback', upperMiddleware, findAll);
router.get('/feedback/:id', upperMiddleware, findOne);
router.delete('/feedback/:id', upperMiddleware, deleteOne);

export default router;
