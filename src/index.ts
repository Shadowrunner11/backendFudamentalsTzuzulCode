import server from './services';
import 'dotenv/config';

const PORT = Number(process.env);

server.listen(PORT,'0.0.0.0', ()=>{
  // eslint-disable-next-line no-console
  console.log('Listening at http://localhost:'+PORT);
});