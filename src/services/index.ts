import Express from 'express';
import morgan from 'morgan';
import mainRouter from '../routes';
const server =  Express();

server.get('/',(_, res)=>{
  res.json({ message:'Hola mundo' });
});

server.use(morgan('dev'));
server.use(Express.json());
server.use('/api', mainRouter);


export default server;