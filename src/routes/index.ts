import { Router } from 'express';
import userApp from './user.routes';

const mainRouter = Router();

mainRouter.use('/v1', userApp);

export default mainRouter;