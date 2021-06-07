const express = require('express');
const path = require('path');
require('dotenv').config();

// DB config

require('./database/config').dbConnection();


// Express App
const app = express();


app.use(express.json());



// Node Server
const server = require('http').createServer(app);
// io を受け取れるようにする
module.exports.io = require('socket.io')(server);
// socket.js を使用
require('./socket/socket');




// Path public
const publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));



// My Router
app.use('/api/login', require('./routes/auth'));


server.listen(process.env.PORT, (err) => {

  if (err) throw new Error(err);

  console.log('Server running http://localhost:3000/', process.env.PORT);
});