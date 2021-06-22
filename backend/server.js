const express = require('express')
// importing dotenv
require('dotenv').config()
const app = express()
// creating and setting up socket io 
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const port = process.env.PORT || 5000

// importing mongoose 
const mongoose = require('mongoose');

// importing users routes
const usersRouter = require('./routes/users')

// importing path for production build
const path = require('path')

mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true});


// creating and opening mongodb connection
const database = mongoose.connection
database.once('open', () => console.log('Connection to database!'))


// setting data to use json objects
app.use(express.json())

// setting users routes
app.use('/api/users', usersRouter)


// creating users object to house all connections and their IDs
let users = {}

// Socket io function 
io.on('connection', socket => {
  // console.log('Hello from Server. Socket ID: ' + socket.id)
  

  // updating the connected users list
  socket.on('userJoin', (username) => {
    users[socket.id] = username;
    socket.join(username);
    socket.join('General Chat');
    console.log('User Object after connection: ', users);
    io.emit('userList', [...new Set(Object.values(users))]);
  });

  // receiving new messages from chatpage
  socket.on('newMessage', newMessage => {
    io.to(newMessage.room).emit('newMessage', {name: newMessage.name, message: newMessage.message, isPrivate: newMessage.isPrivate});
  })

  // joining a chat room
  socket.on('roomEntered', ({ oldRoom, newRoom}) => {
    socket.leave(oldRoom);
    // io.to(oldRoom).emit('newMessage', {
    //   name: 'Notice ',
    //   message: `${users[socket.id]} just left "${oldRoom}"`,
    // });
    io.to(oldRoom)
    // io.to(newRoom).emit('newMessage', {
    //   name: 'Notice ',
    //   message: `${users[socket.id]} just joined "${newRoom}"`,
    // });
    io.to(newRoom)
    socket.join(newRoom);
  });

  // taking out all users who have discounted from the server
  socket.on('disconnect', () => {
    delete users[socket.id]
    io.emit('userList', [...new Set(Object.values(users))]);
    console.log('Users after disconnection : ', users)
  })
})


app.use(express.static(path.join(__dirname, '../frontend/build')))
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../frontend/build/index.html')))


server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})