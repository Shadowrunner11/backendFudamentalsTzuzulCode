import 'dotenv/config';
import Express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mainRouter from '../routes';
// import process from 'process';

//TODO colocar todo esto de las envs en configuraciono un YML mejor
// const { FRONT_END_URL: origin = /http:\/\/localhost:5173.*/ } = process.env;
const origin = /https:\/\/shadowrunner11.github.io\/tzuzulCodeReact\.*/;
const server = Express();

const corsOptions = {
  origin,
};

server.use(cors(corsOptions));
server.use(morgan('dev'));
server.use(Express.json());
server.use('/api', mainRouter);


export default server;