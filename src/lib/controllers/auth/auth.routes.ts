import { Router} from 'express';
import AuthenticationController from '../auth/auth-controller';

const authController: AuthenticationController = new AuthenticationController();
const authRouter: Router = Router();

authRouter.post('/auth', authController.login);
authRouter.post('/password-reset', authController.password);

export default authRouter;
