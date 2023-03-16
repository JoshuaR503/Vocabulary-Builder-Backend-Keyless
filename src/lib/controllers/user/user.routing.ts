import { Router} from 'express';
import UsersController from './user-controller';
import { upperMiddleware } from '../../middlewares';

const userController: UsersController = new UsersController;
const userRouter: Router = Router();

// Routes with middleware
userRouter.get('/user', upperMiddleware, userController.findAll);
userRouter.get('/user/count', upperMiddleware, userController.countAll);
userRouter.get('/user/:id', upperMiddleware, userController.findOne);

userRouter.post('/user', upperMiddleware, userController.create);

userRouter.put('/user/:id', upperMiddleware, userController.update);

userRouter.delete('/user/:id', upperMiddleware, userController.delete);
// This is not meant to be used in production!!!
// userRouter.delete('/user/delete', middleware, userController.deleteMany);

export default userRouter;
