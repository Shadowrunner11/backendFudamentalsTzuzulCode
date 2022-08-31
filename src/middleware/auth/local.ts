/* import { Strategy } from 'passport-local';
import userController from '../../controllers/user.controller';


export const NewLocalStrategy = new Strategy(async (email: string, password: string, next) => {
  const { succes, username, message } = await userController
    .findByEmail({ email, password });

  if (!succes)
    return next(null, false, { message });
  return next(null, { username, message });

});
 */