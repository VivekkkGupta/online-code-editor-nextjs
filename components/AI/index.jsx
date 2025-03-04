"use client";

import React, { useState } from 'react';
import { SendHorizontal, X, Copy, Check } from 'lucide-react';
import generatePrompts from '@/api/OpenAI/open-ai-api';

function AI() {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([
        { text: "Hello, how can I help you?", sender: "AI" },
    ]);
    const [inputText, setInputText] = useState("");
    const [copyStatus, setCopyStatus] = useState({});
    const [responseLoading, setResponseLoading] = useState(false);

    const toggleChat = () => {
        setIsChatOpen(!isChatOpen);
    };

    const handleCopy = async (text, messageId) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopyStatus({ ...copyStatus, [messageId]: true });
            setTimeout(() => {
                setCopyStatus({ ...copyStatus, [messageId]: false });
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    // Function to render message content with code blocks
    const renderMessage = (message, index) => {
        if (message.sender === "AI") {
            // Check if the message contains code (looks for code between backticks)
            const codeMatch = message.text.match(/```(\w*)\n([\s\S]*?)```/);

            if (codeMatch) {
                const language = codeMatch[1] || 'javascript';
                const code = codeMatch[2].trim();

                return (
                    <div className="bg-gray-800 rounded-lg p-4 relative">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-gray-400">{language}</span>
                            <button
                                onClick={() => handleCopy(code, index)}
                                className="text-gray-400 hover:text-white transition-colors"
                            >
                                {copyStatus[index] ? (
                                    <Check size={18} />
                                ) : (
                                    <Copy size={18} />
                                )}
                            </button>
                        </div>
                        <pre className="overflow-x-auto">
                            <code className="text-sm font-mono">
                                {code}
                            </code>
                        </pre>
                    </div>
                );
            }
        }



        return (
            <span className={`inline-block p-2 rounded-lg ${message.sender === "User" ? "bg-blue-500" : "bg-gray-700"
                }`}>
                {message.text}
            </span>
        );
    };

    const sendMessage = async () => {
        if (inputText.trim() !== "") {
            setMessages([...messages, { text: inputText, sender: "User" }]);
            setInputText("");
            setResponseLoading(true)
            const AiResult = await generatePrompts(inputText);
            setMessages(prevMessages => [...prevMessages, { text: AiResult, sender: "AI" }]);
            setResponseLoading(false)
        }
    };

    return (
        <>
            <div className="absolute bottom-10 right-10">
                {isChatOpen && (
                    <div className="backdrop-blur-xl absolute flex flex-col justify-between bottom-15 right-0 border rounded shadow-md p-4 w-[500px]" style={{ height: '70vh' }}>
                        <div className="flex justify-between pb-2 border-b shadow-2xl">
                            <h2 className='text-xl font-bolder'>
                                AI Chat
                            </h2>
                            <button className="text-gray-600 cursor-pointer hover:text-white" onClick={toggleChat}>
                                <X size={20} />
                            </button>
                        </div>
                        <div className="overflow-y-scroll h-[80%] mb-4 scrollbar-hide">
                            {messages.map((message, index) => (
                                <div key={index} className={`mb-4 ${message.sender === "User" ? "text-right" : "text-left"
                                    }`}>
                                    {renderMessage(message, index)}
                                </div>
                            ))}
                            {
                                responseLoading && (
                                    <div className="flex items-start gap-2 animate-pulse">
                                        <div className="bg-gray-700 rounded-lg p-4 w-3/4">
                                            <div className="flex justify-between items-center mb-2">
                                                <div className="h-4 bg-gray-600 rounded w-16"></div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="h-4 bg-gray-600 rounded w-full"></div>
                                                <div className="h-4 bg-gray-600 rounded w-5/6"></div>
                                                <div className="h-4 bg-gray-600 rounded w-4/6"></div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
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
                            <button
                                className="bg-blue-500 text-white rounded p-2 cursor-pointer"
                                onClick={sendMessage}
                            >
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