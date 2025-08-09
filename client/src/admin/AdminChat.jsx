// AdminDashboard.js
import { io } from "socket.io-client";
import { useEffect, useState } from "react"; 

const AdminChat = () => {
  const [socket, setSocket] = useState(null);
  const [chats, setChats] = useState({}); 

  useEffect(() => {
    const newSocket = io("http://localhost:8000");
    setSocket(newSocket);


    newSocket.emit('join', { role: 'admin' });


    newSocket.on('newMessageFromServer', (data) => {
      const { from, message, timestamp } = data;

    
      if (from === 'admin') return;

      console.log(`ได้รับข้อความจาก ${from}: ${message}`);
      
    
      setChats(prevChats => {
        const userChatHistory = prevChats[from] || [];
        return {
          ...prevChats,
          [from]: [...userChatHistory, { from, message, timestamp }]
        };
      });
    });

    return () => newSocket.close();
  }, []);

  const handleReply = (targetUserId, text) => {
    if (socket && text && targetUserId) {
      const messageData = {
        targetUserId: targetUserId,
        message: text
      };
    
      socket.emit('sendMessageFromAdmin', messageData);
      
 
      setChats(prevChats => {
          const userChatHistory = prevChats[targetUserId] || [];
          return {
              ...prevChats,
              [targetUserId]: [...userChatHistory, { from: 'admin', message: text, timestamp: new Date() }]
          };
      });
    }
  };
  return (
    <div>
      <h1>Admin Chat Dashboard</h1>
      {Object.keys(chats).map(userId => (
        <div key={userId} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
          <h2>Chat with {userId}</h2>
          <div>
            {chats[userId].map((msg, index) => (
              <p key={index}><strong>{msg.from}:</strong> {msg.message}</p>
            ))}
          </div>
          <input type="text" placeholder={`Reply to ${userId}`} onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleReply(userId, e.target.value);
              e.target.value = '';
            }
          }}/>
        </div>
      ))}
    </div>
  );
};

export default AdminChat;