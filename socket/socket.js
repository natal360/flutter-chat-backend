// index.js から　io を受け取る
const { io } = require('../index');

// Sockets
io.on('connection', client => {
  console.log('Client connect');

  client.on('disconnect', () => {
    console.log('Client disconnect');
    
  });

  // // キー値 'message' 値の受け取り
  // client.on('message', ( payload ) => {
  //   console.log('Message', payload);
  //   // 受信時にサーバー側から値を送信
  //   io.emit('message', {admin: 'No message' });
  // })


});