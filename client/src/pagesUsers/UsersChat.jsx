import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const UsersChat = () => {
  
    const [socket, setSocket] = useState(null); 

    const [messages, setMessages] = useState([]); 

    const [currentMessage, setCurrentMessage] = useState(''); 
 
    const messagesEndRef = useRef(null); 

  
    const userInfo = {
        id: 'user123', 
        role: 'user'
    };


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    
    useEffect(scrollToBottom, [messages]); 


    useEffect(() => {
      
        const newSocket = io('http://localhost:8000'); 
        setSocket(newSocket);
        console.log("กำลังพยายามเชื่อมต่อ Socket...");


        newSocket.on('connect', () => {
            console.log(`เชื่อมต่อสำเร็จ! Socket ID: ${newSocket.id}`);
      
            newSocket.emit('join', { userId: userInfo.id, role: userInfo.role });
            console.log(`ส่งข้อมูล 'join' ไปยัง server: userId=${userInfo.id}`);
        });

      
        newSocket.on('newMessageFromServer', (data) => {
            console.log('ได้รับข้อความใหม่จาก Server:', data);
         
            setMessages(prevMessages => [...prevMessages, data]);
        });

        newSocket.on('connect_error', (err) => {
            console.error("การเชื่อมต่อล้มเหลว:", err.message);
        });

  
        return () => {
            console.log("กำลังตัดการเชื่อมต่อ Socket...");
            newSocket.close();
        };
    }, [userInfo.id]); 


    const handleSendMessage = (e) => {
        e.preventDefault(); 
      
        if (currentMessage.trim() && socket) {
            const messageData = {
                from: userInfo.id, 
                message: currentMessage,
                timestamp: new Date(),
            };
            
    
            setMessages(prevMessages => [...prevMessages, messageData]);

            socket.emit('sendMessageFromUser', {
                userId: userInfo.id,
                message: currentMessage
            });
            console.log("ส่งข้อความไปยัง server:", messageData.message);
     
            setCurrentMessage('');
        }
    };


    return (
        <div className="flex flex-col h-[85vh] max-w-2xl mx-auto my-4 border border-gray-300 rounded-lg shadow-lg bg-white">
        
            <header className="bg-gray-100 p-4 border-b border-gray-300">
                <h3 className="text-lg font-semibold text-center text-gray-800">M-MONEY Support</h3>
            </header>


            <main className="flex-1 overflow-y-auto p-6 bg-gray-50">
                <div className="flex flex-col space-y-4">
                    {messages.map((msg, index) => (
                        <div 
                            key={index} 
                          
                            className={`flex ${msg.from === userInfo.id ? 'justify-end' : 'justify-start'}`}
                        >
                            <div className="max-w-xs lg:max-w-md">
                                {msg.from !== userInfo.id && (
                                    <span className="text-xs text-gray-500 ml-2 capitalize">{msg.from}</span>
                                )}
                                <div className={`px-4 py-2 rounded-2xl break-words ${ 

                                    msg.from === userInfo.id 
                                    ? 'bg-blue-600 text-white rounded-br-lg' 
                                    : 'bg-gray-200 text-gray-800 rounded-bl-lg'
                                }`}>
                                    <p>{msg.message}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                   
                    <div ref={messagesEndRef} />
                </div>
            </main>

            <footer className="bg-white p-4 border-t border-gray-200">
                <form className="flex space-x-3" onSubmit={handleSendMessage}>
                    <input
                        type="text"
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoComplete="off"
                    />
                    <button 
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300 disabled:cursor-not-allowed"
                        disabled={!currentMessage.trim()}
                    >
                        Send
                    </button>
                </form>
            </footer>
        </div>
    );
};

export default UsersChat;