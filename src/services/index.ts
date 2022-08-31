import 'dotenv/config';
import Express from 'express';
import morgan from 'morgan';
import mainRouter from '../routes';
// import process from 'process';

//TODO colocar todo esto de las envs en configuraciono un YML mejor
// const { FRONT_END_URL: origin = /http:\/\/localhost:5173.*/ } = process.env;
const server = Express();


server.use(morgan('dev'));
server.use(Express.json());
server.use('/api', mainRouter);


export default server;