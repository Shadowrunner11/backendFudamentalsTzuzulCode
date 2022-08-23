import { Router } from 'express';

const loginApp = Router();

loginApp.post('/login', async (req, res)=>{
  const { email, password } = req.body;
  res.json({ message: 'succes' });
});

loginApp.get('/login', async (req, res)=>{
  res.json({ message: 'succes' });
});

export default loginApp;