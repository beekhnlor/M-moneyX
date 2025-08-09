require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const { readdirSync } = require('fs')
const http = require('http')
const { Server } = require('socket.io')
const connected = require('./src/connectdb/connecting');
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
  console.log(`✅ Client connected: ${socket.id}`);

  socket.on('join', ({ userId, role }) => {
    if (role === 'admin') {
      adminSockets.add(socket.id);
      console.log(`Admin (Socket ID: ${socket.id}) has joined.`);
    } else {
      socket.join(userId.toString()); 
      console.log(`User ${userId} (Socket ID: ${socket.id}) has joined room: ${userId}`);
    }
  });

  socket.on('sendMessageFromUser', async ({ userId, message }) => { 
    console.log(`Message from User ${userId}: ${message}`);
    try {
        const sql = "INSERT INTO tb_message (conversation_id, sender_id, sender_role, message_text) VALUES (?, ?, 'user', ?)";
        await connected.query(sql, [userId, userId, message]);
        console.log(`[DB] Message from User ${userId} saved.`);

  
        adminSockets.forEach(adminSocketId => {
            io.to(adminSocketId).emit('newMessageFromServer', {
                from: userId.toString(),
                message: message,
                timestamp: new Date()
            });
        });
    } catch (error) {
        console.error("❌ [DB Error] Could not save message from user:", error);
    }
  });


  socket.on('sendMessageFromAdmin', async ({ adminId, targetUserId, message }) => { 
    console.log(`Admin ${adminId} is replying to User ${targetUserId}: ${message}`);
    try {
        const sql = "INSERT INTO tb_message (conversation_id, sender_id, sender_role, message_text) VALUES (?, ?, 'admin', ?)";
        await connected.query(sql, [targetUserId, adminId, message]);
        console.log(`[DB] Reply from Admin ${adminId} to User ${targetUserId} saved.`);

     
        io.to(targetUserId.toString()).emit('newMessageFromServer', {
            from: 'admin',
            message: message,
            timestamp: new Date()
        });
    } catch (error) {
        console.error("❌ [DB Error] Could not save message from admin:", error);
    }
  });

  
  socket.on('disconnect', () => {
    console.log(`❌ Client disconnected: ${socket.id}`);
    if (adminSockets.has(socket.id)) {
      adminSockets.delete(socket.id);
      console.log(`Admin (Socket ID: ${socket.id}) has left.`);
    }
  });
});


server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});