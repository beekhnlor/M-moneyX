import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import useMoneyStore from '../store/money-store';
import { FiSend, FiArrowLeft } from 'react-icons/fi';
import { Plus, Loader2 } from 'lucide-react';

import cameraIcon from "../assets/icons/camera-icon.svg";
import galleryIcon from "../assets/icons/gallery-icon.svg";
import micIcon from "../assets/icons/mic-icon.svg";
import mapPinIcon from "../assets/icons/map-pin-icon.svg";
import folderIcon from "../assets/icons/folder-icon.svg";

const AdminChat = () => {
  const { user: adminUser } = useMoneyStore();
  const [socket, setSocket] = useState(null);
  const [chats, setChats] = useState({});
  const [conversations, setConversations] = useState([]);
  const [activeChatUserId, setActiveChatUserId] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [isAttachmentMenuOpen, setIsAttachmentMenuOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const messagesEndRef = useRef(null);
  const menuRef = useRef(null);
  const plusButtonRef = useRef(null);
  const cameraInputRef = useRef(null);
  const galleryInputRef = useRef(null);
  const documentInputRef = useRef(null);

  // Load conversations
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/chat/conversations');
        setConversations(response.data);
      } catch (error) {
        console.error('Failed to fetch conversations:', error);
      }
    };
    fetchConversations();
  }, []);

  // Connect socket
  useEffect(() => {
    if (!adminUser) return;
    const newSocket = io('http://localhost:8000');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      newSocket.emit('join', { role: 'admin', adminId: adminUser.id });
    });

    newSocket.on('newMessageFromServer', (data) => {
      const { from, message, timestamp, type } = data;
      if (from === 'admin') return;
      setChats((prev) => ({
        ...prev,
        [from]: [...(prev[from] || []), { from, message, timestamp, type }],
      }));
      setConversations((prev) => {
        const idx = prev.findIndex((c) => c.conversation_id.toString() === from.toString());
        const updatedConvo = {
          conversation_id: from,
          user_name: `User ${from}`,
          last_message: message,
          last_message_time: timestamp,
        };
        if (idx > -1) {
          const others = prev.filter((c) => c.conversation_id.toString() !== from.toString());
          return [updatedConvo, ...others];
        } else {
          return [updatedConvo, ...prev];
        }
      });
    });

    newSocket.on('connect_error', (err) =>
      console.error("Socket connection failed:", err.message)
    );

    return () => newSocket.close();
  }, [adminUser]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats, activeChatUserId]);

  // Handle click outside for attachment menu
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

  // Select chat
  const selectChat = async (userId) => {
    setActiveChatUserId(userId);
    if (!chats[userId]) {
      try {
        const response = await axios.get(`http://localhost:8000/api/chat/history/${userId}`);
        setChats((prev) => ({ ...prev, [userId]: response.data }));
      } catch (error) {
        console.error('Failed to load chat history for user', userId, error);
      }
    }
  };

  // Send reply
  const handleReply = (e, messageType = 'text') => {
    e.preventDefault();
    if (socket && replyMessage.trim() && activeChatUserId && adminUser) {
      const messageData = {
        adminId: adminUser.id,
        targetUserId: activeChatUserId,
        message: replyMessage,
        type: messageType,
      };
      socket.emit('sendMessageFromAdmin', messageData);
      const optimisticMessage = { from: 'admin', message: replyMessage, timestamp: new Date(), type: messageType };
      setChats((prev) => ({
        ...prev,
        [activeChatUserId]: [...(prev[activeChatUserId] || []), optimisticMessage],
      }));
      setReplyMessage('');
    }
  };

  const handleFileUpload = async (file) => {
    if (!file || !activeChatUserId || !adminUser) return;

    const token = localStorage.getItem("token");

    if (!token) {
      alert("No token found, please log in again.");
      return;
    }

    setIsUploading(true);
    setIsAttachmentMenuOpen(false);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const uploadUrl = "http://localhost:8000/api/chat/upload";
      const response = await axios.post(uploadUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "authorization": `Bearer ${token}`,
        },
      });
      
      const { fileUrl, fileType } = response.data; 
      
      const messageData = {
        adminId: adminUser.id,
        targetUserId: activeChatUserId,
        message: fileUrl,
        type: fileType,
      };
      socket.emit("sendMessageFromAdmin", messageData);
      const optimisticMessage = { from: 'admin', message: fileUrl, timestamp: new Date(), type: fileType };
      setChats((prev) => ({
        ...prev,
        [activeChatUserId]: [...(prev[activeChatUserId] || []), optimisticMessage],
      }));

    } catch (error) {
      console.error("File upload failed:", error);
      alert("File upload failed, please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  const onFileSelected = (event) => {
    const file = event.target.files[0];
    handleFileUpload(file);
    event.target.value = null;
  };

  const handleLocationClick = () => {
    setIsAttachmentMenuOpen(false); 
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
          
          const messageData = {
            adminId: adminUser.id,
            targetUserId: activeChatUserId,
            message: mapUrl,
            type: 'location',
          };
          socket.emit("sendMessageFromAdmin", messageData);
          const optimisticMessage = { from: 'admin', message: mapUrl, timestamp: new Date(), type: 'location' };
          setChats((prev) => ({
            ...prev,
            [activeChatUserId]: [...(prev[activeChatUserId] || []), optimisticMessage],
          }));

        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Could not get location. Please check permissions.");
        }
      );
    } else {
      alert("Your browser does not support geolocation.");
    }
  };
  
  const handleRecordAudioClick = () => {
      alert("Audio recording function is not yet available.");
      setIsAttachmentMenuOpen(false);
  }

  const activeChatMessages = activeChatUserId ? chats[activeChatUserId] || [] : [];

  const attachmentOptions = [
    { iconSrc: cameraIcon, label: "ຖ່າຍຮູບ", handler: () => cameraInputRef.current.click() },
    { iconSrc: galleryIcon, label: "ຮູບພາບ", handler: () => galleryInputRef.current.click() },
    { iconSrc: micIcon, label: "ບັນທຶກສຽງ", handler: handleRecordAudioClick },
    { iconSrc: mapPinIcon, label: "ແຜນທີ່", handler: handleLocationClick },
    { iconSrc: folderIcon, label: "ເອກະສານ", handler: () => documentInputRef.current.click() },
  ];

  const MessageContent = ({ message, type }) => {
    const isImage = type === 'image' || /\.(jpeg|jpg|gif|png|webp)$/i.test(message);
    const isMapLink = type === 'location' || /google\.com\/maps/i.test(message);

    if (isImage) {
      return (
        <img 
          src={message} 
          alt="Sent content" 
          className="max-w-xs rounded-lg cursor-pointer" 
        />
      );
    }
    if (isMapLink) {
        return (
            <a href={message} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                ເບິ່ງແຜນທີ່
            </a>
        );
    }
    if (type && type !== 'text' && !isImage && !isMapLink) {
        const fileName = message.split('/').pop();
        return (
             <a href={message} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                ດາວໂຫຼດ: {fileName}
            </a>
        )
    }

    return <p className="text-sm leading-relaxed">{message}</p>;
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Hidden file inputs */}
      <input type="file" accept="image/*" capture="environment" ref={cameraInputRef} onChange={onFileSelected} style={{ display: 'none' }} />
      <input type="file" accept="image/*" ref={galleryInputRef} onChange={onFileSelected} style={{ display: 'none' }} />
      <input type="file" accept=".pdf,.doc,.docx,.xls,.xlsx,.zip,.rar" ref={documentInputRef} onChange={onFileSelected} style={{ display: 'none' }} />

      {/* Sidebar (show on desktop OR mobile when no chat selected) */}
      <aside
        className={`${
          activeChatUserId ? 'hidden md:flex' : 'flex'
        } w-full md:w-[300px] bg-white border-r border-gray-200 flex-col shadow-lg`}
      >
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="ຄົ້ນຫາຜູ້ທົ່ວໄປ"
              className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 border border-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-300"
            />
            <svg
              className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
        </div>
        <div className="overflow-y-auto flex-1">
          {conversations.length > 0 ? (
            conversations.map((convo) => (
              <div
                key={convo.conversation_id}
                onClick={() => selectChat(convo.conversation_id)}
                className={`flex items-center space-x-3 p-3 cursor-pointer hover:bg-gray-50 transition border-b border-gray-100 ${
                  activeChatUserId == convo.conversation_id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-bold text-lg">
                  <svg
                    className="w-6 h-6 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-gray-800 text-sm">
                      {convo.user_name || `20 ${convo.conversation_id}`}
                    </p>
                    <span className="text-[10px] text-gray-500">
                      {convo.last_message_time
                        ? new Date(convo.last_message_time).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : ''}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate mt-0.5">{convo.last_message}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="p-4 text-gray-500 text-sm">No active chats.</p>
          )}
        </div>
      </aside>

      {/* Chat window */}
      <main
        className={`flex-1 flex flex-col bg-[#F7F8FC] ${
          !activeChatUserId ? 'hidden md:flex' : 'flex'
        }`}
      >
        {activeChatUserId ? (
          <>
            <header className="bg-white p-4 border-b border-gray-200 flex items-center justify-between shadow-sm">
              <div className="flex items-center space-x-3">
                {/* ปุ่มย้อนกลับสำหรับมือถือ */}
                <button
                  onClick={() => setActiveChatUserId(null)}
                  className="md:hidden mr-2 text-gray-600 hover:text-gray-900"
                >
                  <FiArrowLeft size={20} />
                </button>

                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-bold text-lg">
                  <svg
                    className="w-6 h-6 text-gray-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <h2 className="text-base font-semibold text-gray-800">
                    {conversations.find((c) => c.conversation_id == activeChatUserId)?.user_name ||
                      `20 ${activeChatUserId}`}
                  </h2>
                  <span className="text-xs text-gray-500">18/8/2025</span>
                </div>
              </div>
            </header>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-[#F9FAFB] to-[#F3F4F6]">
              <div className="flex flex-col space-y-4">
                {activeChatMessages.map((msg, index) => {
                  const isAdmin = msg.from === 'admin';
                  return (
                    <div
                      key={index}
                      className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className="max-w-[80%] sm:max-w-[70%] flex flex-col">
                        <div
                          className={`px-4 py-2 rounded-2xl break-words shadow-md transition ${
                            isAdmin
                              ? 'bg-gradient-to-r from-[#f32400] to-[#fc0000] text-white rounded-tr-none'
                              : 'bg-white text-gray-800 rounded-tl-none border border-gray-200'
                          }`}
                        >
                          <MessageContent message={msg.message} type={msg.type} />
                        </div>
                        <span
                          className={`text-[10px] mt-1 ${
                            isAdmin ? 'self-end text-purple-200' : 'self-start text-gray-400'
                          }`}
                        >
                          {new Date(msg.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>
            </div>

            {/* Attachment Menu */}
            {isAttachmentMenuOpen && (
              <div
                ref={menuRef}
              
                className="absolute bottom-20 left-4 md:left-[500px] bg-white p-4 rounded-lg shadow-lg border border-gray-200 flex flex-col gap-4 z-10"
              >
                {attachmentOptions.map((opt, index) => (
                  <button
                    key={index}
                    onClick={opt.handler} 
                    className="flex items-center gap-4 text-gray-700 hover:text-red-600 w-full text-left"
                  >
                    <img src={opt.iconSrc} alt={opt.label} className="w-6 h-6" />
                    <span className="font-medium">{opt.label}</span>
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <footer className="bg-white p-4 border-t border-gray-200 shadow-lg relative">
              <form className="flex items-center space-x-3" onSubmit={handleReply}>
                {/* ปุ่ม + */}
                <button
                  ref={plusButtonRef}
                  type="button"
                  className="p-2 text-gray-500 hover:text-red-600 transition"
                  onClick={() => setIsAttachmentMenuOpen(!isAttachmentMenuOpen)}
                >
                  <Plus size={24} />
                </button>

                <input
                  type="text"
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="ພິມຂໍ້ຄວາມ..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-50 text-sm"
                  disabled={isUploading}
                />

                <button
                  type="submit"
                  className="p-3 bg-gradient-to-r from-[#f11c00] to-[#f70000] text-white rounded-full shadow-md hover:shadow-lg hover:scale-105 transition disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed"
                  disabled={!replyMessage.trim() || isUploading}
                >
                  {isUploading ? <Loader2 className="animate-spin" size={18} /> : <FiSend size={18} />}
                </button>
              </form>
            </footer>
          </>
        ) : (
          <div className="hidden md:flex items-center justify-center h-full">
            <p className="text-xl text-gray-400">Select a conversation to start chatting</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminChat;