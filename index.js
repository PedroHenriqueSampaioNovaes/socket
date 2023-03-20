const express = require('express');
const path = require('path');
const socketIO = require('socket.io');
const app = express();

app.use('/', express.static(path.join(__dirname, 'public')));

const server = app.listen(3000, () => console.log('Running'));

const io = socketIO(server);

const randoms = [];

/* io.on('connection', (socket) => {
  console.log('New connection');

  const random = Math.random();
  console.log(random);
  randoms.push(random);

  // socket.emit('hello', { msg: `Seja bem-vindo! ${random}` }); // envia uma msg
  
  // io.emit('hello', { msg: `Seja bem-vindo! ${randoms}` }); // o io gerencia todos os sockets (ou aba pra entender com mais facilidade), portanto todas as abas receberão a mensagem


  socket.on('hello_client_response', (data) => { // recebe uma msg
    console.log(data.msg);
  });
}); */

io.on('connection', (socket) => {
  console.log('New connection');

  socket.broadcast.emit('hello', { msg: `Chegou um novo usuário!` }); // Envia mensagem para todas as abas, menos para o atual
  socket.on('hello_client_response', (data) => {
    console.log(data.msg);
  });
});
