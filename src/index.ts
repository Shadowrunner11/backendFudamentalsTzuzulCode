import server from './services';

const PORT = 3000;

server.listen(PORT,'0.0.0.0', ()=>{
    // eslint-disable-next-line no-console
    console.log('Listening at http://localhost:'+PORT);
});