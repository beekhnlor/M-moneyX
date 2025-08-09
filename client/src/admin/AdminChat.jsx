// src/admin/AdminChat.jsx
import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import useMoneyStore from '../store/money-store';
import { FiSend } from 'react-icons/fi';

const AdminChat = () => {
  const { user: adminUser } = useMoneyStore();
  const [socket, setSocket] = useState(null);
  const [chats, setChats] = useState({});
  const [conversations, setConversations] = useState([]);
  const [activeChatUserId, setActiveChatUserId] = useState(null);
  const [replyMessage, setReplyMessage] = useState('');
  const messagesEndRef = useRef(null);

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
      const { from, message, timestamp } = data;
      if (from === 'admin') return;
      setChats((prev) => ({
        ...prev,
        [from]: [...(prev[from] || []), { from, message, timestamp }],
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

    return () => newSocket.close();
  }, [adminUser]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chats, activeChatUserId]);

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
  const handleReply = (e) => {
    e.preventDefault();
    if (socket && replyMessage.trim() && activeChatUserId && adminUser) {
      const messageData = {
        adminId: adminUser.id,
        targetUserId: activeChatUserId,
        message: replyMessage,
      };
      socket.emit('sendMessageFromAdmin', messageData);
      const optimisticMessage = { from: 'admin', message: replyMessage, timestamp: new Date() };
      setChats((prev) => ({
        ...prev,
        [activeChatUserId]: [...(prev[activeChatUserId] || []), optimisticMessage],
      }));
      setReplyMessage('');
    }
  };

  const activeChatMessages = activeChatUserId ? chats[activeChatUserId] || [] : [];

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <aside className="w-1/3 lg:w-1/4 bg-white border-r border-gray-200 flex flex-col">
        <header className="p-4 border-b border-gray-200 bg-gradient-to-r from-blue-500 to-indigo-500">
          <h1 className="text-lg font-bold text-white">Conversations</h1>
        </header>
        <div className="overflow-y-auto flex-1">
          {conversations.length > 0 ? (
            conversations.map((convo) => (
              <div
                key={convo.conversation_id}
                onClick={() => selectChat(convo.conversation_id)}
                className={`flex items-center space-x-3 p-4 cursor-pointer hover:bg-gray-50 border-l-4 transition ${
                  activeChatUserId == convo.conversation_id
                    ? 'bg-blue-50 border-blue-500'
                    : 'border-transparent'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
                  {convo.user_name?.[0] || 'U'}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-gray-700">{convo.user_name}</p>
                  <p className="text-sm text-gray-500 truncate">{convo.last_message}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="p-4 text-gray-500">No active chats.</p>
          )}
        </div>
      </aside>

      {/* Chat window */}
      <main className="flex-1 flex flex-col">
        {activeChatUserId ? (
          <>
            <header className="bg-white p-4 border-b border-gray-200 flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                {conversations.find((c) => c.conversation_id == activeChatUserId)?.user_name?.[0] || 'U'}
              </div>
              <h2 className="text-lg font-semibold">
                {conversations.find((c) => c.conversation_id == activeChatUserId)?.user_name ||
                  `User ID: ${activeChatUserId}`}
              </h2>
            </header>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
              <div className="flex flex-col space-y-4">
                {activeChatMessages.map((msg, index) => {
                  const isAdmin = msg.from === 'admin';
                  return (
                    <div key={index} className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}>
                      <div className="max-w-md flex flex-col">
                        <div
                          className={`px-4 py-2 rounded-2xl break-words shadow-sm ${
                            isAdmin
                              ? 'bg-purple-600 text-white rounded-br-none'
                              : 'bg-white rounded-bl-none border'
                          }`}
                        >
                          <p>{msg.message}</p>
                        </div>
                        <span className="text-[10px] text-gray-400 mt-1 self-end">
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

            {/* Input */}
            <footer className="bg-white p-4 border-t border-gray-200">
              <form className="flex items-center space-x-3" onSubmit={handleReply}>
                <input
                  type="text"
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder="Type your reply..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="submit"
                  className="p-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition disabled:bg-purple-300 disabled:cursor-not-allowed"
                  disabled={!replyMessage.trim()}
                >
                  <FiSend size={18} />
                </button>
              </form>
            </footer>
          </>
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-xl text-gray-400">Select a conversation to start chatting</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminChat;
