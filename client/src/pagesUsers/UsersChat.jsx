// // src/pagesUsers/UsersChat.js

// import React, { useState, useEffect, useRef } from 'react';
// import { io } from 'socket.io-client';
// import axios from 'axios';
// import useMoneyStore from '../store/money-store';
// import { FiSend } from 'react-icons/fi';

// const UsersChat = () => {
//     const [socket, setSocket] = useState(null);
//     const [messages, setMessages] = useState([]);
//     const [currentMessage, setCurrentMessage] = useState('');
//     const [isLoadingHistory, setIsLoadingHistory] = useState(true);
//     const messagesEndRef = useRef(null);

//     const { user } = useMoneyStore();
//     const userInfo = {
//         id: user?.id,
//         role: user?.role,
//     };

//     useEffect(() => {
//         const fetchChatHistory = async () => {
//             if (userInfo.id) {
//                 setIsLoadingHistory(true);
//                 try {
//                     const response = await axios.get(`http://localhost:8000/api/chat/history/${userInfo.id}`);
//                     setMessages(response.data);
//                 } catch (error) {
//                     console.error("Failed to load chat history:", error);
//                 } finally {
//                     setIsLoadingHistory(false);
//                 }
//             }
//         };
//         fetchChatHistory();
//     }, [userInfo.id]);

//     useEffect(() => {
//         if (userInfo.id) {
//             const newSocket = io('http://localhost:8000');
//             setSocket(newSocket);

//             newSocket.on('connect', () => {
//                 newSocket.emit('join', { userId: userInfo.id, role: userInfo.role });
//             });

//             newSocket.on('newMessageFromServer', (data) => {
//                 setMessages(prev => [...prev, data]);
//             });

//             newSocket.on('connect_error', (err) => {
//                 console.error("Socket connection failed:", err.message);
//             });

//             return () => newSocket.close();
//         }
//     }, [userInfo.id]);

//     const scrollToBottom = () => {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     };
//     useEffect(scrollToBottom, [messages]);

//     const handleSendMessage = (e) => {
//         e.preventDefault();
//         if (currentMessage.trim() && socket && userInfo.id) {
//             const messageData = { from: userInfo.id.toString(), message: currentMessage, timestamp: new Date() };
//             setMessages(prev => [...prev, messageData]);
//             socket.emit('sendMessageFromUser', { userId: userInfo.id, message: currentMessage });
//             setCurrentMessage('');
//         }
//     };

//     return (
//         <div className="flex flex-col h-screen w-full bg-white overflow-hidden">
//             {/* Header */}
//             <header className="bg-gradient-to-r from-blue-500 to-indigo-500 p-4 shadow-md">
//                 <h3 className="text-lg font-semibold text-center text-white">💬 M-MONEY Support</h3>
//             </header>

//             {/* Chat Messages */}
//             <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
//                 {isLoadingHistory ? (
//                     <div className="flex justify-center items-center h-full text-gray-500">Loading chat history...</div>
//                 ) : (
//                     <div className="flex flex-col space-y-4">
//                         {messages.map((msg, index) => {
//                             const isUser = msg.from === userInfo.id.toString();
//                             return (
//                                 <div
//                                     key={index}
//                                     className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
//                                 >
//                                     <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
//                                         {!isUser && (
//                                             <span className="text-xs text-gray-500 mb-1">
//                                                 {msg.from === 'admin' ? 'Admin' : 'User'}
//                                             </span>
//                                         )}
//                                         <div
//                                             className={`px-4 py-2 rounded-2xl max-w-xs md:max-w-md break-words shadow-sm ${
//                                                 isUser
//                                                     ? 'bg-blue-600 text-white rounded-br-none'
//                                                     : 'bg-white text-gray-800 rounded-bl-none border'
//                                             }`}
//                                         >
//                                             <p>{msg.message}</p>
//                                         </div>
//                                         <span className="text-[10px] text-gray-400 mt-1">
//                                             {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                                         </span>
//                                     </div>
//                                 </div>
//                             );
//                         })}
//                         <div ref={messagesEndRef} />
//                     </div>
//                 )}
//             </main>

//             {/* Input */}
//             <footer className="bg-white p-3 border-t border-gray-200 flex-shrink-0">
//                 <form className="flex items-center space-x-3" onSubmit={handleSendMessage}>
//                     <input
//                         type="text"
//                         value={currentMessage}
//                         onChange={(e) => setCurrentMessage(e.target.value)}
//                         placeholder="Type a message..."
//                         className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         autoComplete="off"
//                     />
//                     <button
//                         type="submit"
//                         className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition disabled:bg-blue-300 disabled:cursor-not-allowed"
//                         disabled={!currentMessage.trim()}
//                     >
//                         <FiSend size={18} />
//                     </button>
//                 </form>
//             </footer>
//         </div>
//     );
// };

// export default UsersChat;
// src/pagesUsers/UsersChat.js
import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import useMoneyStore from "../store/money-store";
import logoImage from "../assets/logo-circle.jpeg";

import { SendHorizontal, Plus } from "lucide-react";


import cameraIcon from "../assets/icons/camera-icon.svg"; 
import galleryIcon from "../assets/icons/gallery-icon.svg"; 
import micIcon from "../assets/icons/mic-icon.svg";       
import mapPinIcon from "../assets/icons/map-pin-icon.svg";  
import folderIcon from "../assets/icons/folder-icon.svg";   

const UsersChat = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [isLoadingHistory, setIsLoadingHistory] = useState(true);
  const [isAttachmentMenuOpen, setIsAttachmentMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const plusButtonRef = useRef(null);

  const messagesEndRef = useRef(null);

  const { user } = useMoneyStore();
  const userInfo = {
    id: user?.id,
    role: user?.role,
  };

  useEffect(() => {
    const fetchChatHistory = async () => {
      if (userInfo.id) {
        setIsLoadingHistory(true);
        try {
          const response = await axios.get(
            `http://localhost:8000/api/chat/history/${userInfo.id}`
          );
          setMessages(response.data);
        } catch (error) {
          console.error("Failed to load chat history:", error);
        } finally {
          setIsLoadingHistory(false);
        }
      }
    };
    fetchChatHistory();
  }, [userInfo.id]);

  useEffect(() => {
    if (userInfo.id) {
      const newSocket = io("http://localhost:8000");
      setSocket(newSocket);
      newSocket.on("connect", () =>
        newSocket.emit("join", { userId: userInfo.id, role: userInfo.role })
      );
      newSocket.on("newMessageFromServer", (data) =>
        setMessages((prev) => [...prev, data])
      );
      newSocket.on("connect_error", (err) =>
        console.error("Socket connection failed:", err.message)
      );
      return () => newSocket.close();
    }
  }, [userInfo.id, userInfo.role]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [messages]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        plusButtonRef.current &&
        !plusButtonRef.current.contains(event.target)
      ) {
        setIsAttachmentMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (currentMessage.trim() && socket && userInfo.id) {
      const messageData = {
        from: userInfo.id.toString(),
        to: "admin",
        message: currentMessage,
        timestamp: new Date(),
      };
      socket.emit("sendMessageFromUser", {
        userId: userInfo.id,
        message: currentMessage,
      });
      setMessages((prev) => [...prev, messageData]);
      setCurrentMessage("");
    }
  };

  const groupMessagesByDate = (messages) => {
    return messages.reduce((acc, msg) => {
      const date = new Date(msg.timestamp).toLocaleDateString("en-GB");
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(msg);
      return acc;
    }, {});
  };

  const groupedMessages = groupMessagesByDate(messages);

  const attachmentOptions = [
    { iconSrc: cameraIcon, label: "ຖ່າຍຮູບ" },
    { iconSrc: galleryIcon, label: "ຮູບພາບ" },
    { iconSrc: micIcon, label: "ບັນທຶກສຽງ" },
    { iconSrc: mapPinIcon, label: "ແຜນທີ່" },
    { iconSrc: folderIcon, label: "ເອກະສານ" },
  ];
 

  return (
    <div className="relative flex flex-col h-[calc(100vh-6rem)] w-full bg-white overflow-hidden max-w-4xl mx-auto border rounded-lg shadow-lg">
      <header className="flex flex-col items-center p-3 border-b bg-white flex-shrink-0">
        <img src={logoImage} alt="M-Money Logo" className="h-12 w-12 mb-1" />
        <h3 className="text-md font-semibold text-gray-800">M-Moneny</h3>
      </header>

      <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
        
        {isLoadingHistory ? (
           <div className="flex justify-center items-center h-full text-gray-500">
            ກຳລັງໂຫຼດປະຫວັດການສົນທະນາ...
          </div>
        ) : (
          <div className="flex flex-col space-y-4">
             {Object.entries(groupedMessages).map(([date, msgs]) => (
              <React.Fragment key={date}>
                <div className="text-center text-xs text-gray-500 my-3">
                  {date}
                </div>
                {msgs.map((msg, index) => {
                  const isUser = msg.from === userInfo.id.toString();
                  const time = new Date(msg.timestamp).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  });

                  return (
                    <div
                      key={index}
                      className={`flex w-full ${
                        isUser ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`flex items-end gap-2 ${
                          isUser ? "flex-row-reverse" : "flex-row"
                        }`}
                      >
                        <div
                          className={`px-4 py-2 rounded-xl max-w-xs md:max-w-md break-words shadow ${
                            isUser
                              ? "bg-red-500 text-white rounded-br-none"
                              : "bg-gray-200 text-gray-900 rounded-bl-none"
                          }`}
                        >
                          <p className="text-sm">{msg.message}</p>
                        </div>
                        <span className="text-[10px] text-gray-400 mb-1">
                          {time}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
            <div ref={messagesEndRef} />
          </div>
        )}
      </main>

      {isAttachmentMenuOpen && (
        <div
          ref={menuRef}
          className="absolute bottom-[60px] left-4 bg-white p-4 rounded-lg shadow-lg border border-gray-200 flex flex-col gap-4"
        >
          {attachmentOptions.map((opt, index) => (
            <button
              key={index}
              className="flex items-center gap-4 text-gray-700 hover:text-red-600 w-full text-left"
            >
          
              <img src={opt.iconSrc} alt={opt.label} className="w-6 h-6" />
         
              <span className="font-medium">{opt.label}</span>
            </button>
          ))}
        </div>
      )}

      <footer className="bg-gray-100 p-2 flex-shrink-0">
        <form
          className="flex items-center space-x-2"
          onSubmit={handleSendMessage}
        >
          <button
            ref={plusButtonRef}
            type="button"
            className="p-2 text-gray-600 hover:text-red-600"
            onClick={() => setIsAttachmentMenuOpen(!isAttachmentMenuOpen)}
          >
            <Plus size={24} />
          </button>
          <input
            type="text"
            value={currentMessage}
            onChange={(e) => setCurrentMessage(e.target.value)}
            placeholder="ພິມຂໍ້ຄວາມນີ້"
            className="flex-1 px-4 py-2 bg-gray-100 focus:outline-none"
            autoComplete="off"
          />
          <button
            type="submit"
            className="p-2 text-red-500 hover:text-red-600 disabled:text-gray-300"
            disabled={!currentMessage.trim()}
          >
            <SendHorizontal size={24} />
          </button>
        </form>
      </footer>
    </div>
  );
};

export default UsersChat;