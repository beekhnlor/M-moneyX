require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { readdirSync } = require('fs')

const http = require('http')
const { Server } = require('socket.io')

const port = process.env.PORT
const app = express()

const server = http.createServer(app)

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(morgan('dev'))
app.use(cors({
    origin:process.env.ORIGIN,
    methods:['GET','PUT','POST','DELETE'],
    allowedHeaders:['Content-Type','Authorization']
}))

readdirSync('./src/routes').map((e)=>app.use('/api',require('./src/routes/'+e)))


const io = new Server(server, {
    cors: {
      origin: process.env.ORIGIN, 
      methods: ["GET", "POST"]
    }
});

const adminSockets = new Set(); 

io.on('connection', (socket) => {
  console.log(`มี Client เชื่อมต่อเข้ามา: ${socket.id}`);

  socket.on('join', ({ userId, role }) => {
    if (role === 'admin') {
      adminSockets.add(socket.id);
      console.log(`Admin (${socket.id}) ได้เข้าร่วม`);
    } else {

      socket.join(userId);
      console.log(`User ${userId} (${socket.id}) ได้เข้าร่วมห้อง: ${userId}`);
    }
  });

  socket.on('sendMessageFromUser', ({ userId, message }) => {
    console.log(`ข้อความจาก User ${userId}: ${message}`);

    adminSockets.forEach(adminSocketId => {
      io.to(adminSocketId).emit('newMessageFromServer', {
        from: userId,
        message: message,
        timestamp: new Date()
      });
    });
  });

  socket.on('sendMessageFromAdmin', ({ targetUserId, message }) => {
    console.log(`Admin (${socket.id}) ส่งข้อความไปหา ${targetUserId}: ${message}`);

    io.to(targetUserId).emit('newMessageFromServer', {
      from: 'admin',
      message: message,
      timestamp: new Date()
    });
  });

  socket.on('disconnect', () => {
    console.log(`ตัดการเชื่อมต่อ: ${socket.id}`);

    if (adminSockets.has(socket.id)) {
      adminSockets.delete(socket.id);
      console.log(`Admin (${socket.id}) ออกจากระบบ`);
    }
  });
});

server.listen(port,()=>console.log(`Server is running on port ${port}`))