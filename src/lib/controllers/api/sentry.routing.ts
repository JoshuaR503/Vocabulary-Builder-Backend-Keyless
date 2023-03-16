import { Router} from 'express';
import { issuesReport, deleteIssue } from './sentry.controller';
import { upperMiddleware } from '../../middlewares';

const router: Router = Router();

router.get('/issues', upperMiddleware,  issuesReport);
router.delete('/issues/:issue_id', upperMiddleware, deleteIssue);

export default router;
