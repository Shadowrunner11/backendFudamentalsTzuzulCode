import 'dotenv/config';
import { Router } from 'express';

import userController from '../controllers/user.controller';
import { jwtCreate } from '../utils/jwtCreate';
const userApp = Router();

userApp.options('/login', (_, res) => {
  /*  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', 'true'); */
  res.sendStatus(200);
});

userApp.options('/register', (_, res) => {
  /* res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', 'true'); */
  res.sendStatus(200);
});

//TODO crear flujo co codigos de respuesta apropiados, temporalmente se envia payload
userApp.post('/login', async (req, res) => {
  const { email, password } = req.body;
  //TODO: pasar logica a un middleare, se ve horrible aqui
  if (!email || !password)
    return res.sendStatus(200).json({ succes: false, message: 'credenciales invalidas' });

  const { response, id } = await userController.login({ email, password });

  if (!response.success || !id)
    return res.json({ ...response });

  const token = jwtCreate(id, email);

  res.sendStatus(200).json({ ...response, phpssid: token }); //para confundir a la gente :v
});

userApp.post('/register', async (req, res) => {
  const { body } = req;
  const { response, id } = await userController.register(body);

  if (!response.success || !id)
    return res.json({ ...response });

  const token = jwtCreate(id, body.email);
  res.sendStatus(200).json({ ...response, token });
});

export default userApp;