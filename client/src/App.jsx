// src/ChatWidget.js

import React, { useState, useEffect, useRef } from 'react';

// URL ของ API ที่คุณรันไว้
const API_URL = 'http://localhost:8000/api/chat';

// ไอคอน SVG สำหรับปุ่ม (แทนการใช้ Emoji หรือตัวอักษร)
const ChatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
);


const ChatWidget = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: 'ສະບາຍດີ! ມີຫຍັງໃຫ້ຊ່ວຍບໍ່?', sender: 'bot' }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const chatLogRef = useRef(null);

    useEffect(() => {
        if (chatLogRef.current) {
            chatLogRef.current.scrollTop = chatLogRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSendMessage = async () => {
        const userMessage = inputValue.trim();
        if (!userMessage) return;

        const newUserMessage = { id: Date.now(), text: userMessage, sender: 'user' };
        setMessages(prev => [...prev, newUserMessage]);
        setInputValue('');
        setIsTyping(true);

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: userMessage }),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            const newBotMessage = { id: Date.now() + 1, text: data.reply, sender: 'bot' };
            setMessages(prev => [...prev, newBotMessage]);
        } catch (error) {
            console.error('Error:', error);
            const errorMessage = { id: Date.now() + 1, text: 'Sorry, I am having trouble connecting.', sender: 'bot' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    return (
        <div className="fixed bottom-5 right-5 z-50">
            {/* Chat Box */}
            <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
                <div className="w-80 sm:w-96 h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col">
                    {/* Header */}
                    <div className="bg-blue-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
                        <h3 className="font-bold text-lg">M-MoneyX Service</h3>
                        <button onClick={() => setIsOpen(false)} className="text-2xl font-bold hover:opacity-75">−</button>
                    </div>

                    {/* Messages */}
                    <div ref={chatLogRef} className="flex-1 p-4 overflow-y-auto bg-gray-100 space-y-4">
                        {messages.map(msg => (
                            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-xs md:max-w-md px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-lg' : 'bg-gray-200 text-gray-800 rounded-bl-lg'}`}>
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-gray-200 text-gray-800 rounded-2xl rounded-bl-lg px-4 py-3">
                                    <div className="flex items-center space-x-1">
                                        <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-0"></span>
                                        <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                                        <span className="h-2 w-2 bg-gray-400 rounded-full animate-bounce delay-300"></span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <div className="p-4 bg-white border-t border-gray-200 flex items-center">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="พิมพ์ข้อความ..."
                            className="flex-1 w-full border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button onClick={handleSendMessage} className="ml-3 bg-blue-600 text-white rounded-full h-10 w-10 flex items-center justify-center hover:bg-blue-700 transition-colors">
                            <SendIcon />
                        </button>
                    </div>
                </div>
            </div>

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full h-16 w-16 flex items-center justify-center shadow-lg hover:bg-blue-700 transition-all duration-300"
                style={{ transform: isOpen ? 'scale(0)' : 'scale(1)' }}
            >
                <ChatIcon />
            </button>
        </div>
    );
};

export default ChatWidget;