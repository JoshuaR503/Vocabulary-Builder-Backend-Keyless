import { Router} from 'express';
import { 
    findAll,
    findAllWithLevel, 
    findAllWithCategory,
    findRandomized
} from './word.controller';

const router: Router = Router();

router.get('/public', findAll);
router.get('/public/random', findRandomized);
router.get('/level/:level', findAllWithLevel);
router.get('/category/:category', findAllWithCategory);

export default router;
