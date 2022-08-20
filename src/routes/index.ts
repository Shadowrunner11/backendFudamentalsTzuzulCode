import { Router } from 'express';
import loginApp from './login.routes';

const mainRouter = Router();

mainRouter.use('/v1', loginApp);

export default mainRouter;