import server from './services';
import 'dotenv/config';

const { PORT } = process.env;

server.listen(Number(PORT),'0.0.0.0', ()=>{
  // eslint-disable-next-line no-console
  console.log('Listening at http://localhost:'+PORT);
});