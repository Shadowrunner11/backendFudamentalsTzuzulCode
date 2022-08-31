import 'dotenv/config';
import { Router } from 'express';
import jwt from 'jsonwebtoken';
import userController from '../controllers/user.controller';
const userApp = Router();

//TODO crear flujo co codigos de respuesta apropiados, temporalmente se envia payload
userApp.post('/login', async (req, res) => {
  const { email, password } = req.body;
  //TODO: pasar logica a un middleare, se ve horrible aqui
  if (!email || !password)
    return res.json({ succes: false, message: 'credenciales invalidas' });

  const { response, id } = await userController.login({ email, password });

  if (!response.succes)
    return res.json(response);

  const { TOKEN_KEY = 'dev-secret-asdfghjkl' } = process.env;
  const token = jwt.sign({ user_id: id, email }, TOKEN_KEY, { expiresIn: '2h' });

  res.json({ response, phpssid: token }); //para confundir a la gente :v
});

userApp.post('/register', async (req, res) => {
  const { body } = req;
  const response = await userController.register(body);
  res.json(response);
});

export default userApp;