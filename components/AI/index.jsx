"use client";

import React, { useState } from "react";
import { SendHorizontal, X } from "lucide-react";
import { Button } from "../ui/button";
import ChatgptSvg from "@/public/Chatgpt-svg";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import generatePrompts from "@/api/OpenAI/open-ai-api-call";
import RenderMessage from "./RenderMessage";

function AI() {
    // State management
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [inputText, setInputText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [copyStatus, setCopyStatus] = useState({});
    const [messages, setMessages] = useState([
        {
            text: "Hello, I am your AI Assistant, I can help you to generate code by your text input",
            sender: "AI",
        },
    ]);

    // Chat toggle handler
    const toggleChat = () => setIsChatOpen(!isChatOpen);

    // Message sending handler
    const sendMessage = async () => {
        if (inputText.trim() === "") return;

        try {
            setIsLoading(true);
            // Add user message
            setMessages(prev => [...prev, { text: inputText, sender: "User" }]);
            setInputText(""); // Clear input

            // Get AI response
            const aiResponse = await generatePrompts(inputText);
            setMessages(prev => [...prev, { text: aiResponse, sender: "AI" }]);
        } catch (error) {
            console.error("Failed to get AI response:", error);
            setMessages(prev => [...prev, {
                text: "Sorry, I encountered an error. Please try again.",
                sender: "AI"
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="absolute bottom-10 right-10 z-10">
            {isChatOpen && (
                <Card className="flex flex-col justify-between bg-background/40 backdrop-blur-sm absolute right-10 bottom-10 w-[30rem] h-[70vh] border shadow-lg">
                    {/* Header */}
                    <CardHeader className="">
                        <div className="flex justify-between items-center">
                            <CardTitle className={`text-3xl`}>Chat with AI</CardTitle>
                            <Button variant="ghost" size="icon" onClick={toggleChat}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                        <CardDescription>Model: OpenAI GPT-4</CardDescription>
                    </CardHeader>

                    {/* Messages */}
                    <CardContent className="flex-1 overflow-hidden">
                        <div className="h-full overflow-y-auto space-y-2 p-2">
                            {messages.map((message, index) => (
                                <RenderMessage
                                    key={index}
                                    message={message}
                                    index={index}
                                    copyStatus={copyStatus}
                                    setCopyStatus={setCopyStatus}
                                />
                            ))}
                            {isLoading && (
                                <div className="flex items-center space-x-2">
                                    <div className="animate-pulse">Thinking...</div>
                                </div>
                            )}
                        </div>
                    </CardContent>

                    {/* Input */}
                    <CardFooter className="">
                        <div className="flex w-full gap-2">
                            <Input
                                placeholder="Type your message..."
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                                disabled={isLoading}
                            />
                            <Button
                                onClick={sendMessage}
                                disabled={isLoading}
                                variant="default"
                            >
                                <SendHorizontal className="h-4 w-4" />
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            )}

            {/* Toggle Button */}
            <Button onClick={toggleChat} variant="default" className="gap-2">
                <ChatgptSvg />
                <span>AI Chat</span>
            </Button>
        </div>
    );
}

export default AI;
