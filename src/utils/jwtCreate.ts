import { sign } from 'jsonwebtoken';

export const jwtCreate = (user_id: string, email: string) => {
  const { TOKEN_KEY = 'dev-secret-asdfghjkl' } = process.env;
  return sign({ user_id, email }, TOKEN_KEY, { expiresIn: '2h' });
};