// src/pagesUsers/UsersChat.js

import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import axios from 'axios';
import useMoneyStore from '../store/money-store';
import { FiSend } from 'react-icons/fi';

const UsersChat = () => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState('');
    const [isLoadingHistory, setIsLoadingHistory] = useState(true);
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
                    const response = await axios.get(`http://localhost:8000/api/chat/history/${userInfo.id}`);
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
            const newSocket = io('http://localhost:8000');
            setSocket(newSocket);

            newSocket.on('connect', () => {
                newSocket.emit('join', { userId: userInfo.id, role: userInfo.role });
            });

            newSocket.on('newMessageFromServer', (data) => {
                setMessages(prev => [...prev, data]);
            });

            newSocket.on('connect_error', (err) => {
                console.error("Socket connection failed:", err.message);
            });

            return () => newSocket.close();
        }
    }, [userInfo.id]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (currentMessage.trim() && socket && userInfo.id) {
            const messageData = { from: userInfo.id.toString(), message: currentMessage, timestamp: new Date() };
            setMessages(prev => [...prev, messageData]);
            socket.emit('sendMessageFromUser', { userId: userInfo.id, message: currentMessage });
            setCurrentMessage('');
        }
    };

    return (
        <div className="flex flex-col h-screen w-full bg-white overflow-hidden">
            {/* Header */}
            <header className="bg-gradient-to-r from-blue-500 to-indigo-500 p-4 shadow-md">
                <h3 className="text-lg font-semibold text-center text-white">💬 M-MONEY Support</h3>
            </header>

            {/* Chat Messages */}
            <main className="flex-1 overflow-y-auto p-4 bg-gray-50">
                {isLoadingHistory ? (
                    <div className="flex justify-center items-center h-full text-gray-500">Loading chat history...</div>
                ) : (
                    <div className="flex flex-col space-y-4">
                        {messages.map((msg, index) => {
                            const isUser = msg.from === userInfo.id.toString();
                            return (
                                <div
                                    key={index}
                                    className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                                        {!isUser && (
                                            <span className="text-xs text-gray-500 mb-1">
                                                {msg.from === 'admin' ? 'Admin' : 'User'}
                                            </span>
                                        )}
                                        <div
                                            className={`px-4 py-2 rounded-2xl max-w-xs md:max-w-md break-words shadow-sm ${
                                                isUser
                                                    ? 'bg-blue-600 text-white rounded-br-none'
                                                    : 'bg-white text-gray-800 rounded-bl-none border'
                                            }`}
                                        >
                                            <p>{msg.message}</p>
                                        </div>
                                        <span className="text-[10px] text-gray-400 mt-1">
                                            {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                        <div ref={messagesEndRef} />
                    </div>
                )}
            </main>

            {/* Input */}
            <footer className="bg-white p-3 border-t border-gray-200 flex-shrink-0">
                <form className="flex items-center space-x-3" onSubmit={handleSendMessage}>
                    <input
                        type="text"
                        value={currentMessage}
                        onChange={(e) => setCurrentMessage(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoComplete="off"
                    />
                    <button
                        type="submit"
                        className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition disabled:bg-blue-300 disabled:cursor-not-allowed"
                        disabled={!currentMessage.trim()}
                    >
                        <FiSend size={18} />
                    </button>
                </form>
            </footer>
        </div>
    );
};

export default UsersChat;
