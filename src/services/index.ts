import Express from 'express';
import morgan from 'morgan';
import mainRouter from '../routes';
import cors from 'cors';

const server = Express();

const corsOptions = {
  origin: /http:\/\/localhost:5173.*/
};

server.use(cors(corsOptions));
server.use(morgan('dev'));
server.use(Express.json());
server.use('/api', mainRouter);


export default server;