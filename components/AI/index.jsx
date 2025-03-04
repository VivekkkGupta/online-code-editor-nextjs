"use client";

import React, { useState } from 'react';
import { SendHorizontal, X } from 'lucide-react';

function AI() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hello, how can I help you?", sender: "AI" },
        { text: "Hi, I have a question.", sender: "User" },
    ]);
    const [inputText, setInputText] = useState("");

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    const sendMessage = () => {
        if (inputText.trim() !== "") {
            setMessages([...messages, { text: inputText, sender: "User" }]);
            // Simulate AI response (replace with actual AI logic)
            setTimeout(() => {
                setMessages(prevMessages => [...prevMessages, { text: "That's a good question!", sender: "AI" }]);
            }, 1000); // Simulate delay
            setInputText("");
        }
    };

    return (
        <>
            <div className="absolute bottom-10 right-10">
                {isChatOpen && (
                    <div className="backdrop-blur-xl absolute flex flex-col justify-between bottom-15 right-0 border rounded shadow-md p-4 w-120" style={{ height: '70vh' }}>
                        <div className="flex justify-between pb-2 border-b shadow-2xl">
                            <h2 className='text-xl font-bolder'>
                                AI Chat
                            </h2>
                            <button className="text-gray-600 cursor-pointer hover:text-white" onClick={toggleChat}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className="overflow-y-scroll h-[80%] mb-4" style={{
                            "&::webkitScrollbar": { display: "none" },
                            "msOverflowStyle": "none",
                            "scrollbarWidth": "none",
                        }}>
                            {messages.map((message, index) => (
                                <div key={index} className={`mb-2 ${message.sender === "User" ? "text-right" : "text-left"}`}>
                                    <span className={`inline-block p-2 rounded-lg ${message.sender === "User" ? "bg-blue-500" : "bg-gray-700"}`}>
                                        {message.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center">
                            <input
                                type="text"
                                placeholder="Type your message..."
                                className="border rounded w-full p-2 mr-2"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        sendMessage();
                                    }
                                }}
                            />
                            <button className="bg-blue-500 text-white rounded p-2 cursor-pointer" onClick={sendMessage}>
                                <SendHorizontal size={25} />
                            </button>
                        </div>
                    </div>
                )}
                <button
                    className="px-4 py-2 border-2 rounded-full text-xl cursor-pointer transition-colors duration-200"
                    onClick={toggleChat}
                    aria-label="Open AI Chat"
                >
                    AI Chat
                </button>
            </div>
        </>
    );
}

export default AI;